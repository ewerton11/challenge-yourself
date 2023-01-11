import { Router } from 'express'

import usersControllers, {
  IUsersControllers,
} from '../controllers/usersControllers'

interface IUsers {
  userRoutes(): void
}

class Users implements IUsers {
  public router: Router
  private controllers: IUsersControllers

  constructor() {
    this.router = Router()
    this.controllers = usersControllers

    this.userRoutes()
  }

  userRoutes() {
    this.router.post('/register', this.controllers.userRegister)
    this.router.get('/testedois', this.controllers.userDois)
    this.router.get('/testetres', this.controllers.userTres)
  }
}

export default new Users()
