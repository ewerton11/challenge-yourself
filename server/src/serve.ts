import express from 'express'
import users from './routers/users'

const app = express()
const port = 3333

app.use('/users', users.router)

app.listen(port, () =>
  console.log(`servidor rodando em http://localhost:${port}`)
)
