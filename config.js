const { join } = require('path')

const config = {
  port: 5000,
  host: 'http://localhost:3030',
  url: '//localhost:5000',
  entry: join(__dirname, 'browser.js'),
  staticPath: join(__dirname, '.')
}

if (process.env.NODE_ENV === 'production') {
  config.port = process.env.PORT
  config.host = 'https://api.devacademygrads.co.nz'
  config.url = '//pietgeursen.github.io/grad-app'
}

module.exports = config
