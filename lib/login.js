const querystring = require("querystring");
const { log, info, success, error } = require("./chalk");

let loginForm = {
  csrfmiddlewaretoken:
    process.env.CSRF_MIDDLEWARE_TOKEN || "YYCRw31cBrt3MW8cS6BbWsaESks1n0s1",
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};

loginForm = querystring.stringify(loginForm, null, null, {
  encodeURIComponent: function (val) {
    return val;
  },
});

function setHeaderToken(token) {
  global.$axios.defaults.headers.common["auth"] = "token " + token;
}

function login() {
  return global.$axios
    .post("/login/", loginForm)
    .then((res) => {
      if (res.data.token) {
        log(success("Login success."));
        setHeaderToken(res.data.token);
        return true;
      } else {
        log(error("Login false!"));
        return false;
      }
    })
    .catch((err) => {
      log(error(err));
      return false;
    });
}

module.exports = login;
