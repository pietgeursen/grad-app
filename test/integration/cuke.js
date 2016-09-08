const cuke = require('cuke-tap')
const steps = require('./steps.js')
const features = require('./features/features.js')

cuke({
  steps: steps,
  features: features
})
