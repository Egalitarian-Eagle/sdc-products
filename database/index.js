const Pool = require('pg').Pool

const pool = new Pool({
  user: 'alan_fong',
  host: 'localhost',
  database: 'productinfo',
  password: 'password',
  port: 5432,
})

module.exports = pool;