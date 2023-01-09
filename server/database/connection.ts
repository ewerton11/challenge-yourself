import * as mysql from 'mysql2'

class DBConnection {
  public connection: mysql.Connection

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'challenge',
    })
  }

  connect() {
    this.connection.connect((error) => {
      if (error) throw error
      console.log('Connected to MySQL!')
    })
  }
}

export default DBConnection
