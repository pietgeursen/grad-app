const path = require('path')
const fs = require('fs')
const featureSource = fs.readFileSync(path.join(__dirname, 'hello.feature'), 'utf8')
const cuke = require('cuke-tap')

const features = path.join(__dirname, 'hello.feature')
const steps = require('./hello.steps')

cuke({
  steps: steps,
  features: [[features, featureSource]]
})
