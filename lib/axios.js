// default config
const axios = require('axios')
axios.defaults.baseURL = 'https://ohshenghuo.com/api'
axios.defaults.retry = 2
axios.defaults.retryDelay = 1000
axios.defaults.shouldRetry = (error) => true

axios.interceptors.response.use(undefined, (err) => {
  let config = err.config;
  // 判断是否配置了重试
  if(!config || !config.retry) return Promise.reject(err)

  if(!config.shouldRetry || typeof config.shouldRetry != 'function') {
     return Promise.reject(err)
  }

  // 判断是否满足重试条件
  if(!config.shouldRetry(err)) {
    return Promise.reject(err)
  }

  // 设置重置次数，默认为0
  config.__retryCount = config.__retryCount || 0;

  // 判断是否超过了重试次数
  if(config.__retryCount >= config.retry) {
      return Promise.reject(err)
  }

  // 重试次数自增
  config.__retryCount += 1

  // 延时处理
  let backoff = new Promise(function(resolve) {
      setTimeout(function() {
          resolve();
      }, config.retryDelay || 1)
  })

  // 重新发起axios请求
  return backoff.then(function() {
      return axios(config)
  })
})

module.exports = axios