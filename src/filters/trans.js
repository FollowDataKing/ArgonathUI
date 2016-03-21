// 从服务器获得的数据转换成chart能用的格式
export function transToChartData (data, type, fields) {
  console.warn(fields)
  let result = {}
  for (let index in data) {
    for (let key in data[index]) {
      if (fields.indexOf(key) !== -1) {
        if (result[key]) {
          result[key].push(data[index][key])
        } else {
          result[key] = []
          result[key].push(data[index][key])
        }
      }
    }
  }
  let trans_result = []
  for (let key in result) {
    let foo = {}
    foo['name'] = key
    foo['type'] = type
    foo['data'] = result[key]
    trans_result.push(foo)
  }
  console.warn(trans_result)
  return trans_result
}

export function transToChartXAxis (data, field) {
  let x_axis = []
  for (let index in data) {
    for (let key in data[index]) {
      if (key === field) {
        x_axis.push(data[index][key])
      }
    }
  }
  console.warn(x_axis)
  return x_axis
}
