function getDiaryById(id) {
  return global.$axios.get(`/diary/${id}/`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

function getDiaryByMonth(year, month) {
  return global.$axios.get(`/diary/${year}/${month}/`)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
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
      return res
    })
    .catch(err => {
      return err
    })
}

module.exports = {
  getDiaryById,
  getDiaryByMonth,
  getDiaryByNext,
  getDiaryByPrev
}