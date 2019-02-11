const querystring = require('querystring')
const { log, info, success, error } = require('./chalk')
const { csrfmiddlewaretoken } = require('../config')

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

function setHeaderToken(token) {
  global.$axios.defaults.headers.common['auth'] = 'token ' + token
}

function login() {
  return global.$axios.post('/login/', loginForm)
    .then(res => {
      if (res.data.token) {
        log(success('Login success.'))
        setHeaderToken(res.data.token)
        return true
      } else {
        log(error('Login false!'))
        return false
      }
    })
    .catch(err => {
      log(error(err))
      return false
    })
}

module.exports = login
