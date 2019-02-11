require('dotenv').config()
const fs = require('fs')
const axios = require('../lib/axios')
const login = require('../lib/login')
const { log, info, success, error } = require('../lib/chalk')
const querystring = require('querystring')

global.$axios = axios

log(info('Start importing...'))

login()
  .then(res => {
    if (res) {
      batchWriteDiary()
    }
  })

function writeDiary(diary, i) {
  let diaryForm = {
    date: diary.createddate,
    mood: diary.mood,
    title: diary.title,
    content: diary.content,
    weather: diary.weather
  }
  return global.$axios.post('/write/', querystring.stringify(diaryForm))
    .then(res => {
      if (res.data.diary) {
        log(success(`第 ${i+1} 篇导入成功。 原 ID: ${diary.id}，导入后 ID: ${res.data.diary.id}`))
      }
    })
    .catch(err => {
      log(error(err))
      log(error(`第 ${i+1} 篇导入失败。 ID: ${diary.id}`))
    })
}

function batchWriteDiary() {
  fs.readFile('./logs/nideriji.json', (err, data) => {
    if (err) {
      log(error('请确保您已导出你的日记 nideriji.json 文件，并位于 logs 目录下。'))
      throw err
    } else {
      log(success('读取成功。'))
      log(info('准备导入...'))
    }
    let nideriji = JSON.parse(data.toString())
    for (let i = 0; i < nideriji.length; i++) {
      const diary = nideriji[i]
      writeDiary(diary, i)
    }
  })
}
