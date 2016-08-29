const cuke = require('cuke-tap')
const path = require('path')

const features = path.join(__dirname, 'home.feature')
const steps = require('./steps')

cuke({
  steps: steps,
  features: features
})
