const Pool = require('pg').Pool

const pool = new Pool({
  user: 'ubuntu',
  host: '3.141.16.72',
  database: 'productinfo',
  password: 'password',
  port: 5432,
})

module.exports = pool;