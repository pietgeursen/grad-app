module.exports = [
  makeFeatureArray('./hello.js'),
  makeFeatureArray('./viewGrads.js'),
  makeFeatureArray('./viewGrad.js')
  //makeFeatureArray('./login.js')
]
function makeFeatureArray (fileName) {
  const source = require(fileName)
  return [fileName, source]
}
