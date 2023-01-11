import * as mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'challenge-yourself',
})

connection.connect((error) => {
  if (error) throw error
  console.log('Connected to MySQL!')
})

export default connection
