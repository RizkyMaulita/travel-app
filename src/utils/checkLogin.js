module.exports = () => {
  if (localStorage.getItem('token')) {
    return true
  }
  return false
}