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

  function concat(arr,...values) {
    let res = [...arr]
    for(let i = 0; i < values.length; i++) {
      if(Array.isArray(values[i])) {
        res.push(...values[i])
      }else {
        res.push(values[i])
      }
    }
    return res
  }

  function difference(arr,...values) {
    let res = []
    let val = []
    for(let i = 0; i < values.length; i++) {
      val.push(...values[i])
    }
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < val.length; j++) {
        if(arr[i] == val[j]) {
          break
        }
        if(j == val.length - 1){
          res.push(arr[i])
        }
      }
    }
    return res
  }

  function differenceBy(arr,values,iterat) {
    let res = []
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < values.length; j++) {
        if(iterat(arr[i]) == iterat(values[j])) {
          break
        }
        if(j == values.length - 1) {
          res.push(arr[i])
        } 
      }
    }
    return res
  }

  function differenceWith(arr,values,comparator) {
    let result = []
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < values.length; j++) {
        if(comparator(arr[i],values[j])) {
          break
        }
        if(j == values.length - 1) {
          result.push(arr[i])
        }
      }
    }
    return result
  }

  function drop(arr,n = 1) {
    let res = [...arr]
    if(res.length < n) {
      return []
    }
    while(n > 0) {
        res.shift()
        n--
    }
    return res
  }

  function dropRight(arr, n = 1) {
    let res = [...arr]
    if(res.length < n) {
      return []
    }
    while(n > 0) {
      res.pop()
      n--
    }
    return res
  }

  function fill(arr, value, start = 0, end = arr.length) {
    for(let i = start; i < end; i++) {
      arr[i] = value
    }
    return arr
  }
  
  function findIndex(arr,preciate,fromIndex = 0) {
    let type = Object.prototype.toString.call(preciate)
    for(let i = fromIndex; i < arr.length; i++) {
      if(type == "[object Function]") {
        if(preciate(arr[i])) {
          return i
        }
      }
      if(type == "[object Object]") {
        let objA = arr[i]
        let propA = Object.getOwnPropertyNames(objA)
        let propB = Object.getOwnPropertyNames(preciate)
        for(let i = 0; i < propA.length; i++) {
          let propName = propA[i]
          if(objA[propName] != preciate[propName]){
            break
          }
          if(i == propA.length - 1) {
            return i
          }
        }
      }
      if(type == "[object Array]") {
        let item = arr[i]
        if(item[preciate[0]] == preciate[1]) {
          return i
        }
      }
      if(type == "[object String]") {
        let item = arr[i]
        if(item[preciate] == true) {
          return i
        }
      }
    }
  }

  function findLastIndex(arr,preciate,fromIndex = arr.length - 1) {
    let type = Object.prototype.toString.call(preciate)
    for(let i = fromIndex; i >= 0; i--) {
      if(type == "[object Function]") {
        if(preciate(arr[i])) {
          return i
        }
      }
      if(type == "[object Object]") {
        let objA = arr[i]
        let propA = Object.getOwnPropertyNames(objA)
        let propB = Object.getOwnPropertyNames(preciate)
        for(let j = 0; j < propA.length; j++) {
          let propName = propA[j]
          if(objA[propName] != preciate[propName]){
            break
          }
          if(j == propA.length - 1) {
            return i
          }
        }
      }
      if(type == "[object Array]") {
        let item = arr[i]
        if(item[preciate[0]] == preciate[1]) {
          return i
        }
      }
      if(type == "[object String]") {
        let item = arr[i]
        if(item[preciate] == true) {
          return i
        }
      }
    }
  }

  function flatten(arr) {
    let res = []
    for(let i = 0; i < arr.length; i++) {
      if(Array.isArray(arr[i])) {
        res.push(...arr[i])
      }else {
        res.push(arr[i])
      }
    }
    return res
  }

  function flattenDeep(arr) {
    let res = []
    function deep(arr) {
      if(typeof arr != "object") {
        res.push(arr)
        return
      }
      for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
          deep(arr[i])
        }else {
          res.push(arr[i])
        }
      }
      return res
    }
    deep(arr)
    return res
  }

  function flattenDepth(arr,depth = 1) {
    let res = []
    function deep(arr,depth) {
      if(depth == -1 || typeof arr != "object" ) {
        res.push(arr)
        return
      }
      for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
          deep(arr[i], depth - 1)
        }else {
          res.push(arr[i])
        }
      }
      return res
    }
    deep(arr,depth)
    return res
  }

  function fromPairs(pairs) {
    let res = {}
    for(let i = 0; i < pairs.length; i++) {
      let val = pairs[i]
      res[val[0]] = val[1]
    }
    return res
  }

  function head(arr) {
    return arr[0]
  }

  function indexOf(arr,val,fromIndex = 0) {
    let result = -1
    if(fromIndex >= 0) {
      for(let i = fromIndex; i < arr.length; i++) {
        if(arr[i] === val) {
          result = i
          break
        }
      }
    }else {
      for(let i = (arr.length + fromIndex); i >= 0; i--) {
        if(arr[i] === val) {
          result = i
          break
        }
      }
    }
    return result
  }

  function initial(arr) {
    return arr.slice(0,arr.length - 1)
  }

  function join(arr,separator = ",") {
    let str = ""
    for(let i = 0; i < arr.length; i++) {
      str += arr[i]
      if(i !== arr.length - 1) {
        str +=  separator
      }
    }
    return str
  }

  function last(arr) {
    if(arr.length == 0){
      return []
    }
    return arr[arr.length - 1]
  }

  function lastIndexOf(arr,val, fromIndex = arr.length - 1) {
    let result = -1
    for(let i = fromIndex; i >= 0; i--) {
      if(arr[i] === val) {
        result = i
        break
      }
    }
    return result
  }
  return {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    differenceWith,
    drop,
    dropRight,
    fill,
    findIndex,
    findLastIndex,
    flatten,
    flattenDeep,
    flattenDepth,
    fromPairs,
    head,
    indexOf,
    initial,
    join,
    last,
    lastIndexOf
  }
}()
