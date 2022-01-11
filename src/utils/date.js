const defaultValues = {
  days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', `Jum'at`, 'Sabtu'],
  month: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
}

export const getDate = (dateStr = '', withDay = false) => {
  if (!dateStr) return ''
  const arrDate = dateStr.split('T')
  console.log(arrDate, '<< arrDate')
  const date = new Date(new Date(dateStr).getTime() - new Date(dateStr).getTimezoneOffset() * 60000)
  
  // return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`
  
  if (!withDay) {
    return ` ${date.getUTCDate()} ${defaultValues.month[date.getUTCMonth()]}  ${date.getUTCFullYear()}`
  }
  
  return `${defaultValues.days[date.getUTCDay()]}, ${date.getUTCDate()} ${defaultValues.month[date.getUTCMonth()]}  ${date.getUTCFullYear()}`
}