const Sequelize = require('sequelize')
const config = {
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: 'zzy123456.',
  database: 'bank',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
const sequelize = new Sequelize(config)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
module.exports = { sequelize }
