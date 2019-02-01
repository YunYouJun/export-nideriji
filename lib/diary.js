function getDiaryById(id) {
  console.log(global.$axios.defaults.headers)
  return global.$axios.get(`/diary/${id}/`)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

function getDiaryByMonth(year, month) {
  return global.$axios.get(`/diary/${year}/${month}/`)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

function getDiaryByPrev(id) {
  return global.$axios.get(`/diary/prev/${id}/`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

function getDiaryByNext(id) {
  return global.$axios.get(`/diary/next/${id}/`)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  getDiaryById,
  getDiaryByMonth,
  getDiaryByNext,
  getDiaryByPrev
}