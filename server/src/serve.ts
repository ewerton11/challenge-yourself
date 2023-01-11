import express from 'express'
import bodyParser from 'body-parser'
import usersRouters from './routers/usersRouters'

const app = express()
const port = 3333

app.use(bodyParser.json())

app.use('/', usersRouters.router)

app.listen(port, () =>
  console.log(`servidor rodando em http://localhost:${port}`)
)
