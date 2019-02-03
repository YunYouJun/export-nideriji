const fs  = require('fs')
const { log, success, error } = require('./chalk')

function writeNiderijiJson(data) {
  fs.mkdirSync('./logs', { recursive: true }, (err) => {
    if (err) throw err;
  })
  fs.writeFile('./logs/nideriji.json', JSON.stringify(data), (err) => {
    if (err) throw err
    log(success('Export your diary successfully!'))
  })
}

function writeOnediaryJson(data) {
  fs.mkdirSync('./logs/1diary', { recursive: true }, (err) => {
    if (err) throw err;
  })
  fs.writeFile('./logs/1diary/source.json', JSON.stringify(data), (err) => {
    if (err) throw err
    log(success('Convert into 1diary successfully!'))
  })
}

module.exports = {
  writeNiderijiJson,
  writeOnediaryJson
}