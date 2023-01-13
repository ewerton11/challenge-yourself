import express from 'express'
import bodyParser from 'body-parser'
import usersRouters from './routers/usersRouters'

const app = express()

app.use(bodyParser.json())

app.use('/', usersRouters.router)

export default app
