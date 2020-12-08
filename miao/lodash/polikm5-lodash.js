var polikm5 = function() {
  function chunk(arr,size) {
    let temp = []
    let res = []
    for(let i = 0; i < arr.length; i++) {
      temp.push(arr[i])
      if(temp.length == size) {
        res.push(temp)
        temp = []
      }
    }
    if(temp.length > 0) {
      res.push(temp)
    }
    return res
  }

  function compact(arr) {
    let res = []
    for(let i = 0; i < arr.length; i++) {
      if(arr[i]) {
        res.push(arr[i])
      }
    }
    return res
  }

  function concat(arr,values) {
    let res = [...arr]
    let len = arguments.length
    if(len == 1) {
      return res
    }
    for(let i = 1; i < arguments.length; i++) {
      if(Array.isArray(arguments[i])) {
        res.push(...arguments[i])
      }else {
        res.push(arguments[i])
      }
    }
    return res
  }

  function difference(arr,values) {
    let res = []
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < values.length; j++) {
        if(arr[i] == values[j]) {
          break
        }
        if(j == values.length - 1){
          res.push(arr[i])
        }
      }
    }
    return res
  }
  return {
    chunk,
    compact,
    concat,
    difference
  }
}()
