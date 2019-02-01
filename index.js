// global
require('dotenv').config()
const fs = require('fs')
const chalk = require('chalk')
const axios = require('./lib/axios')

const login = require('./lib/login')
const diary = require('./lib/diary')

global.$axios = axios

// console
const log = console.log
const info = chalk.blue
const success = chalk.green
const warning = chalk.orange
const error = chalk.red

log(info('Start exporting...'))

let nideriji = []
let total = 5
let count = 0

login()
  .then(res => {
    if (res) {
      log(success('Login success.'))
      loopGetPrevDiary(process.env.DIARY_ID, total)
    } else {
      log(error('Login false!'))
    }
  })

function loopGetPrevDiary(id, total = 9999) {
  diary.getDiaryByPrev(id)
    .then(res => {
      if (res.data.diary && count < total) {
        count++
        nideriji.push(res.data.diary)
        log(success(`Get ${count} diary: ${res.data.diary.id}`))
        loopGetPrevDiary(res.data.diary.id, total)
      } else {
        log(info('Stop getting diary.'))
        log(info(`Convert ${count} diary into json file.`))
        writeJson(nideriji)
      }
    })
    .catch(err => {
      console.log(err)
      log(error('Get diary fail!'))
    })
}

function writeJson(data) {
  fs.writeFile('./logs/nideriji.json', JSON.stringify(data), (err) => {
    if (err) throw err
    log(success('Export successfully!'))
  })
}