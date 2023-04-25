const {
  DB_STRING
} = process.env

module.exports = {
  database: DB_STRING || 'sqlite::memory:',
}