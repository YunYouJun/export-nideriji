const querystring = require('querystring')
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

function setHeaderToken(csrftoken, token) {
  global.$axios.defaults.headers = {
    'Cookie': 'csrftoken=' + csrftoken + '; ' + 'token=' + token,
    'auth': 'token ' + token
  }
}

function login() {
  return global.$axios.post('/login/', loginForm)
    .then(res => {
      if (res.data.token) {
        setHeaderToken(csrfmiddlewaretoken, res.data.token)
        return true
      } else {
        return false
      }
    })
    .catch(err => {
      return false
    })
}

module.exports = login
