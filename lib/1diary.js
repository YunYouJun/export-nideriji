const fs = require('fs')
const dayjs = require('dayjs')
const uuidv5 = require('uuid/v5')
const MY_NAMESPACE = '6a153f4d-79e3-4372-a174-497b0bba818f'

const utils = require('./utils')

function convert() {
  fs.readFile('./logs/nideriji.json', (err, data) => {
    if (err) throw err
    let nideriji = JSON.parse(data.toString())
    let oneDiaries = convertNiderijiToOnediary(nideriji)
    utils.writeOnediaryJson(oneDiaries)
  })
}

function convertNiderijiToOnediary(nideriji) {
  let oneDiaries = []
  for (let i = 0; i < nideriji.length; i++) {
    const diary = nideriji[i]
    let day = dayjs(diary.createdtime)
    let oneDiary = initOnediary()
    oneDiary.uuid = uuidv5(day.valueOf().toString(), MY_NAMESPACE)
    oneDiary.title = diary.title
    oneDiary.content = diary.content
    oneDiary.weather = diary.weather
    oneDiary.createTime = day.valueOf()
    oneDiary.recordTime = day.valueOf()
    oneDiary.year = day.year()
    oneDiary.monthOfYear = day.month() + 1
    oneDiary.dayOfMonth = day.day()
    oneDiary.updateTime = dayjs(diary.ts).valueOf() // 13位时间戳
    oneDiaries.push(oneDiary)
  }
  return oneDiaries
}

function initOnediary() {
  return {
    address: '',
    city: '',
    color: '#F8F8F8',
    content: '',
    contentType: 0,
    createTime: 0,
    dayOfMonth: 0,
    deleted: false,
    device: '',
    historyTime: 0,
    images: '',
    isForce: false,
    isHidden: false,
    isSynced: false,
    latitude: null,
    localImages: '',
    longitude: null,
    monthOfYear: 1,
    recordTime: 0,
    tag: '',
    temperature: '',
    title: '',
    top: 0,
    type: '',
    updateTime: 0,
    uuid: '',
    weather: '',
    year: 0
  }
}

convert()
