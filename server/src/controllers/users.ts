import { Request, Response } from 'express'

export interface IUsersControllers {
  userUm(req: Request, res: Response): void
  userDois(req: Request, res: Response): void
  userTres(req: Request, res: Response): void
}

class usersControllers implements IUsersControllers {
  userUm(req: Request, res: Response) {
    res.send({ message: 'USER UM' })
  }

  userDois(req: Request, res: Response) {
    res.send({ message: 'USER DOIS' })
  }

  userTres(req: Request, res: Response) {
    res.send({ message: 'USER TRÊS' })
  }
}

export default new usersControllers()
