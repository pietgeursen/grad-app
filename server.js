const vas = require('vas')

const service = require('./services')
const config = require('./config')

var Knex = require('knex')
var knexConfig = require('./knexfile')[process.env.NODE_ENV || 'development']
var knex = Knex(knexConfig)

config.knex = knex

vas.listen(service, config, {
  port: config.port,
  onListen: (err, s, ws) => console.log('we up', err)
})
