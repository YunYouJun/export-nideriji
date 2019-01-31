// global
require('dotenv').config()

const axios = require('axios')
const querystring = require('querystring')

console.log('Start exporting...')
console.log(process.env.EMAIL)
console.log(process.env.PASSWORD)

// default config
axios.defaults.baseURL = 'https://ohshenghuo.com/api'

// login
const csrfmiddlewaretoken = 'ZcJkWtMdfyjBNKxp3ms0i8REkTJcSKw4'

let loginForm = {
  csrfmiddlewaretoken,
  email: process.env.EMAIL,
  password: process.env.PASSWORD
}

loginForm = querystring.stringify(loginForm, null, null, {
  encodeURIComponent: function (val) {
    return val
  }
})

let token = ''

axios.post('/login/', loginForm)
  .then(res => {
    console.log(res.data.token)
    token = res.data.token
    getDiaryById()
  })
  .catch(err => console.log(err))

function getDiaryById(id) {
  axios.defaults.headers = {
    Cookie: 'csrftoken=' + csrfmiddlewaretoken + '; ' + 'token=' + token,
    auth: 'token ' + token
  }
  
  axios.get('/diary/8808906/')
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
}
