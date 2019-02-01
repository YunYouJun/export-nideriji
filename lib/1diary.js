const fs = require('fs')
const dayjs = require('dayjs')

fs.readFile('./logs/nideriji.json', (err, data) => {
  if (err) throw err
  let nideriji = JSON.parse(data.toString())
  convertNiderijiToOnediary(nideriji)
})

let oneDiaries = []

function convertNiderijiToOnediary(nideriji) {
  // nideriji.length
  for (let i = 0; i < 1; i++) {
    const diary = nideriji[i]
    let day = dayjs(diary.createdtime)
    let oneDiary = initOnediary()
    oneDiary.title = diary.title
    oneDiary.content = diary.content
    oneDiary.year = day.year()
    oneDiary.monthOfYear = day.month() + 1
    oneDiary.dayOfMonth = day.day()
    oneDiary.updateTime = dayjs(diary.ts).valueOf() // 13位时间戳
    console.log(day)
    console.log(oneDiary.year)
    console.log(oneDiary.monthOfYear)
    console.log(oneDiary.dayOfMonth)
    // oneDiaries.push()
  }
}

function initOnediary() {
  return {
    address: '',
    city: '',
    color: '#F8F8F8',
    content: '今天的街上有好多鸡。',
    contentType: 0,
    createTime: 1548739905930,
    dayOfMonth: 29,
    deleted: false,
    device: 'MIX 2',
    historyTime: 0,
    images: '',
    isForce: false,
    isHidden: false,
    isSynced: false,
    latitude: null,
    localImages: '',
    longitude: null,
    monthOfYear: 1,
    recordTime: 1548739905930,
    tag: '',
    temperature: '',
    title: '🐔',
    top: 0,
    type: '',
    updateTime: 0,
    uuid: '9473c7c3-c788-4f41-bae0-53940f246713',
    weather: '多云',
    year: 2019
  }
}

// {
//   'deleteddate': 'None',
//   'status': '0',
//   'mood': '',
//   'title': '豆沙包',
//   'space': 'boy',
//   'ts': '2019-01-24 10:44:52+00:00',
//   'content': '今天张奶奶送来的是豆沙包，以及不会用微波炉，让我帮忙热几个。',
//   'date_word': '8天前',
//   'weather': '',
//   'user': '177636',
//   'createddate': '2019-01-24',
//   'createdtime': '2019-01-24 10:06:03+00:00',
//   'id': '9268109',
//   'weekday': '星期四'
// }