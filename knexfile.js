module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/super-spork_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/super-spork_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
