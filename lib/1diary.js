const fs = require("fs");
const dayjs = require("dayjs");
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
const { v5: uuidv5 } = require("uuid");
const MY_NAMESPACE = "6a153f4d-79e3-4372-a174-497b0bba818f";

const utils = require("./utils");

function convert() {
  fs.readFile("./logs/nideriji.json", (err, data) => {
    if (err) throw err;
    let nideriji = JSON.parse(data.toString());
    let oneDiaries = convertNiderijiToOnediary(nideriji);
    utils.writeOnediaryJson(oneDiaries);
  });
}

function convertNiderijiToOnediary(nideriji) {
  let oneDiaries = [];
  for (let i = 0; i < nideriji.length; i++) {
    const diary = nideriji[i];

    // fix: 转换非今日日记的问题
    let created_date_str = diary.createddate;
    let created_time_str = diary.createdtime
      ? dayjs.utc(diary.createdtime).local().format('HH:mm:ss')
      : "00:00:00"; // 截取时间部分
    let day = dayjs(created_date_str + ' ' +  created_time_str);

    let oneDiary = initOnediary();
    oneDiary.uuid = uuidv5(day.valueOf().toString(), MY_NAMESPACE);
    oneDiary.title = diary.title;
    oneDiary.content = diary.content;
    oneDiary.weather = toWeather(diary.weather);
    oneDiary.createTime = day.valueOf();
    oneDiary.recordTime = day.valueOf();
    oneDiary.year = day.year();
    oneDiary.monthOfYear = day.month() + 1;
    oneDiary.dayOfMonth = day.date();
    oneDiary.updateTime = dayjs.utc(diary.ts).local().valueOf(); // 13位时间戳
    if (diary.mood) {
      oneDiary.m = toMood(diary.mood);
    }
    oneDiaries.push(oneDiary);
  }
  return oneDiaries;
}

function initOnediary() {
  return {
    address: "",
    city: "",
    color: "#F8F8F8",
    content: "",
    contentType: 0,
    createTime: 0,
    dayOfMonth: 0,
    deleted: false,
    device: "",
    historyTime: 0,
    images: "",
    isForce: false,
    isHidden: false,
    isSynced: false,
    latitude: null,
    localImages: "",
    longitude: null,
    monthOfYear: 1,
    recordTime: 0,
    tag: "",
    temperature: "",
    title: "",
    top: 0,
    type: "",
    updateTime: 0,
    uuid: "",
    weather: "",
    year: 0,
  };
}

function toWeather(w) {
  switch (w) {
    case 'lightning-rainy':
      return '雷阵雨'
      break
    case 'pouring':
      return '雨'
      break
    case 'snowy':
      return '雪'
      break
    case 'cloudy':
      return '阴' //我觉得更符合阴，也可以改成多云，这里自便
      break
    case 'sunny':
      return '晴'
      break
    case 'rainy':
      return '雨'
      break
    case 'fog':
      return '大雾'
      break
    case 'windy':
      return '大风'
      break
    case 'hail':
      return '冰雹'
      break
    default:
      return w;
  }
}

function toMood(m) {
  switch (m) {
    case "excited":
      return 1;
      break;
    case "tongue":
      return 8;
      break;
    case "cool":
      return 5;
      break;
    case "devil":
      return 5;
      break;
    case "happy":
      return 7;
      break;
    case "poop":
      return 15;
      break;
    case "neutral":
      return 16;
      break;
    case "sad":
      return 3;
      break;
    case "dead":
      return 15;
      break;
    default:
      return 0;
  }
}

convert();
