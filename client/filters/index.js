export function ts2date (timestamp) {
  let date_obj = new Date(timestamp)
  let year = date_obj.getFullYear()
  let month = date_obj.getMonth() + 1
  let day = date_obj.getDate()
  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
}
