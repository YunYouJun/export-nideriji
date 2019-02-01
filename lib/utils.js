const fs  = require('fs')
const { log, success, error } = require('./chalk')

function writeNiderijiJson(data) {
  fs.writeFile('./logs/nideriji.json', JSON.stringify(data), (err) => {
    if (err) throw err
    log(success('Export your diary successfully!'))
  })
}

function writeOnediaryJson(data) {
  fs.writeFile('./logs/source.json', JSON.stringify(data), (err) => {
    if (err) throw err
    log(success('Convert into 1diary successfully!'))
  })
}

module.exports = {
  writeNiderijiJson,
  writeOnediaryJson
}