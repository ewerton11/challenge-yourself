import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import DBConnection from '../../database/connection'
import { RowDataPacket } from 'mysql2'

export interface IUsersControllers {
  userRegister(req: Request, res: Response): void
  userLogin(req: Request, res: Response): void
}

interface IReqBody {
  user: string
  email: string
  password: string
}

class usersControllers implements IUsersControllers {
  userRegister(req: Request, res: Response) {
    try {
      const { user, email, password } = req.body as IReqBody

      const checkEmail = 'SELECT email FROM users WHERE email = ?'

      DBConnection.query(checkEmail, email, async (error, row: []) => {
        if (error) throw error

        if (!user || !email || !password) {
          res.status(400).send({ message: 'Invalid name, email or password' })
          return
        }

        if (row.length > 0) {
          res.status(400).send({ message: 'Email already registered' })
          return
        }

        const queryRegisterUser = 'INSERT INTO users SET ?'

        const hashPassword = await bcrypt.hash(password, 10)
        const registerUser = { user, email, hashPassword }

        DBConnection.query(queryRegisterUser, registerUser, (error) => {
          if (error) throw error

          res.status(201).send({ message: 'Successfully registered' })
          return
        })
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Internal server error' })
    }
  }

  async userLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body as IReqBody

      const queryUserValidation = 'SELECT * FROM users WHERE email = ?'
      //  AND hashPassword = ?

      const userValidation = [email]

      DBConnection.query(
        queryUserValidation,
        userValidation,
        async (error, row: RowDataPacket[]) => {
          if (error) throw error

          if (!email || !password) {
            res.status(400).send({ message: 'Invalid email or password' })
            return
          }

          if (row.length === 0) {
            res.status(400).send({ message: 'Invalid email' })
            return
          }

          const hashPassword = row[0].hashPassword
          const isMatch = await bcrypt.compare(password, hashPassword)

          if (isMatch) {
            const payload = { id: row[0].id, email: row[0].email }

            const token = jwt.sign(payload, 'secret', { expiresIn: '1d' })

            res.status(200).send({ email, token })
            return
          }

          res.status(400).send({ message: 'Invalid password' })
          return
        }
      )
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: 'Internal server error' })
    }
  }
}

export default new usersControllers()
