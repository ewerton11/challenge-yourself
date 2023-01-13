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
    this.router.post('/login', this.controllers.userLogin)
    //adicionar alteração de nome ou senha
  }
}

export default new Users()
