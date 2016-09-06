const vas = require('vas')
const level = (process.env.NODE_ENV === 'test') ? require('level-mem') : require('level-party')

const sub = require('subleveldown')
const Tickets = require('ticket-auth')
const Stack = require('stack')

const service = require('./services')
const config = require('./config')

config.db = level(config.dbPath)
console.log(config.db)
const ticketsDb = sub(config.db, 'tickets', { valueEncoding: 'json' })
const tickets = config.tickets = Tickets(ticketsDb)

vas.listen(service, config, {
  port: config.port,
  onListen: (err, s, ws) => console.log('we up', err)
})
