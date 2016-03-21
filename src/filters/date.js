// 将服务端返回的data的date字段，由时间戳转为日期
export function transTimestampToDate (obj, field) {
  for (var index in obj) {
    for (var key in obj[index]) {
      if (key === field) {
        obj[index][key] = trans_timestamp_to_date(obj[index][key])
        continue
      }
    }
  }
  return obj
}

function trans_timestamp_to_date (timestamp) {
  let date_obj = new Date(timestamp)
  let year = date_obj.getFullYear()
  let month = date_obj.getMonth() + 1
  let day = date_obj.getDate()
  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
}
