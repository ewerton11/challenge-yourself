import { Request, Response } from 'express'

import DBConnection from '../../database/connection'

export interface IUsersControllers {
  userRegister(req: Request, res: Response): void
  userDois(req: Request, res: Response): void
  userTres(req: Request, res: Response): void
}

interface ReqBody {
  first_name: string
  email: string
  password: string
}

class usersControllers implements IUsersControllers {
  userRegister(req: Request, res: Response) {
    try {
      const { first_name, email, password } = req.body as ReqBody

      const checkEmail = 'SELECT email FROM users WHERE email = ?'

      DBConnection.query(checkEmail, email, (err, results: []) => {
        if (err) throw err

        if (!first_name || !email || !password) {
          return res
            .status(400)
            .send({ message: 'Invalid name, email or password' })
        }

        if (results.length > 0) {
          return res.status(400).send({ message: 'Email already registered' })
        }

        const registerUser = 'INSERT INTO users SET ?'

        DBConnection.query(
          registerUser,
          { first_name, email, password },
          (err) => {
            if (err) throw err

            return res.status(200).send({ message: 'Successfully registered' })
          }
        )
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Internal server error' })
    }
  }

  userDois(req: Request, res: Response) {
    res.send({ message: 'USER DOIS' })
  }

  userTres(req: Request, res: Response) {
    res.send({ message: 'USER TRÊS' })
  }
}

export default new usersControllers()
