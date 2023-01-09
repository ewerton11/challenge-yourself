import { Router } from 'express'

import usersControllers, { IUsersControllers } from '../controllers/users'

interface IUsers {
  usersRouters(): void
}

class Users implements IUsers {
  private router: Router
  controllers: IUsersControllers

  constructor() {
    this.router = Router()
    this.controllers = usersControllers

    this.usersRouters()
  }

  usersRouters() {
    this.router.get('/', this.controllers.userUm)
    this.router.get('/testedois', this.controllers.userDois)
    this.router.get('/testetres', this.controllers.userTres)
  }
}

export default new Users()
