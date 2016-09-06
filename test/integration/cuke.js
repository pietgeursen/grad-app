const path = require('path')
const fs = require('fs')
const helloFeatureSource = fs.readFileSync(path.join(__dirname, 'hello.feature'), 'utf8')
const viewGradsFeatureSource = fs.readFileSync(path.join(__dirname, 'viewGrads.feature'), 'utf8')
const loginFeatureSource = fs.readFileSync(path.join(__dirname, 'login.feature'), 'utf8')
const cuke = require('cuke-tap')

const helloFeatures = path.join(__dirname, 'hello.feature')
const viewGradFeatures = path.join(__dirname, 'viewGrads.feature')
const loginFeatures = path.join(__dirname, 'login.feature')
const steps = require('./steps.js')

cuke({
  steps: steps,
  features: [
    [viewGradFeatures, viewGradsFeatureSource],
    [helloFeatures, helloFeatureSource],
    [loginFeatures, loginFeatureSource]
  ]
})
