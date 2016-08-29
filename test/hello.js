const cuke = require('cuke-tap')
const path = require('path')

const features = path.join(__dirname, 'hello.feature')
const steps = require('./hello.steps')

cuke({
  steps: steps,
  features: features
})
