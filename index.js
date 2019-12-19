// global
require('dotenv').config()
const { log, info, success, error} = require('./lib/chalk')
const axios = require('./lib/axios')
const login = require('./lib/login')
const diary = require('./lib/diary')
const utils = require('./lib/utils')

global.$axios = axios

log(info('Start exporting...'))

let nideriji = []
let count = 0

login()
  .then(res => {
    if (res) {
      diary.getLatestDiary()
        .then(res => {
          count++
          nideriji.push(res.data.diary)
          log(success(`Get ${count} diary: ${res.data.diary.id}`))
          if (!process.env.TOTAL) {
            loopGetPrevDiary(res.data.diary.id)
          } else {
            loopGetPrevDiary(res.data.diary.id, process.env.TOTAL)
          }
        })
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
        utils.writeNiderijiJson(nideriji)
      }
    })
    .catch(err => {
      console.log(err)
      log(error('Get diary fail!'))
    })
}
