module.exports = (date) => {
  const now = new Date()
  const passDate = new Date(new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000)
  let delta = Math.abs(now - passDate) / 1000
  let timestamp = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minutes: 60,
    second: 1
  }
  let diffTimestamp = {}
  let result = ''
  Object.keys(timestamp).forEach(key => {
    const diffTime = Math.floor(delta / timestamp[key])
    if (!result && diffTime) {
      result = `${diffTime} ${key !== 'month' && key !== 'minutes' ? key[0] : key.substr(0, 3)} ago`
    }
    diffTimestamp[key] = diffTime
    delta -= diffTimestamp[key] * timestamp[key]
  })
  if (!result) result = 'now'
  return result
}