var polikm5 = function() {

  // 处理传进来的iteratee
  // qhmnb
  function handleIteratee(iteratee) {
    let type = checkType(iteratee)
    if(type == "[object Function]") {
      return iteratee
    }
    if(type == "[object String]") {
      let splited = iteratee.split(".")
      if(splited.length == 1) {
        return val => val[iteratee]
        }
      return val => splited.reduce((ret, cur) => ret[cur],val)
    }
    if(type == "[object Array]") {
      // 返回相等
      return val => val[iteratee[0]] === iteratee[1]
    }
    if(type == "[object Object]") {
      let f = matches.bind(null,iteratee)()
      return val => f(val)
    }
    if(type == "[object RegExp]") {
      return val => iteratee.test(val)
    }
  }

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

  function differenceBy(arr,values,preciate = null) {
    let res = []
    let type = Object.prototype.toString.call(preciate)
    if(type == "[object Array]") {
      console.log(arguments)
      let temp = [].slice.call(arguments)
      temp.shift()
      values = flattenDeep(temp)
      preciate = null
      console.log(values)
    }
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < values.length; j++) {
        if(preciate != null && type == "[object Function]") {
          if(preciate(arr[i]) !== preciate(values[j])) {
            if(j == values.length - 1) {
              res.push(arr[i])
            }
          }else {
            break
          }
        }
        if(preciate != null && type == "[object String]") {
          let item = arr[i]
          let valueItem = values[j]
          if(item[preciate] !== valueItem[preciate]) {
            if(j == values.length - 1) {
              res.push(arr[i])
            }
          }else {
            break
          }
        }
        if(preciate == null) {
          if(arr[i] !== values[j]) {
            if(j == values.length - 1) {
              res.push(arr[i])
            }
          }else {
            break
          }
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
    if(fromIndex < 0) {
      fromIndex = fromIndex % (arr.length - 1)
      if(fromIndex !== 0) {
        fromIndex += arr.length
      }
    }
    for(let i = fromIndex; i < arr.length; i++) {
      if(arr[i] === val) {
        result = i
        break
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

  function reverse(arr) {
    let i = 0
    let j = arr.length - 1
    while(i < j) {
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
      i++
      j--
    }
    return arr
  }

  function sortedIndex(arr,val) {
    if(val >= arr[arr.length - 1]) return arr.length
    if(val <= arr[0]) return 0
    for(let i = 0; i < arr.length - 1; i++) {
      if((val >= arr[i] && val <= arr[i + 1])) {
        return i + 1
      }
    }
  }

  function every(arr,predicate) {
    let type = Object.prototype.toString.call(predicate)
    for(let i = 0; i < arr.length; i++) {
      if(type == "[object Function]") {
        if(predicate(arr[i]) == false) {
          return false
        }
      }
      if(type == "[object Object]") {
        let objA = arr[i]
        let propA = Object.getOwnPropertyNames(objA)
        let propB = Object.getOwnPropertyNames(predicate)
        for(let j = 0; j < propB.length; j++) {
          let propName = propB[j]
          if(objA[propName] != predicate[propName]){
            return false
          }
        }
      }
      if(type == "[object Array]") {
        let item = arr[i]
        if(item[predicate[0]] !== predicate[1]) {
          return false
        }
      }
      if(type == "[object String]") {
        let item = arr[i]
        if(item[predicate] != true) {
          return false
        }
      }
    }
    return true
  }

  function filter(arr,preciate) {
    let type = Object.prototype.toString.call(preciate)
    for(let i = 0; i < arr.length; i++) {
      if(type == "[object Function]") {
        if(preciate(arr[i])) {
          return [arr[i]]
        }
      }
      if(type == "[object Object]") {
        let objA = arr[i]
        let propA = Object.getOwnPropertyNames(objA)
        let propB = Object.getOwnPropertyNames(preciate)
        for(let j = 0; j < propB.length; j++) {
          let propName = propB[j]
          if(objA[propName] != preciate[propName]){
            break
          }
          if(j == propB.length - 1) {
            return [arr[i]]
          }
        }
      }
      if(type == "[object Array]") {
        let item = arr[i]
        if(item[preciate[0]] == preciate[1]) {
          return [arr[i]]
        }
      }
      if(type == "[object String]") {
        let item = arr[i]
        if(item[preciate] == true) {
          return [arr[i]]
        }
      }
    }
  }

  function find(arr, preciate, fromIndex = 0) {
    let type = Object.prototype.toString.call(preciate)
    for(let i = 0; i < arr.length; i++) {
      if(type == "[object Function]") {
        if(preciate(arr[i])) {
          return arr[i]
        }
      }
      if(type == "[object Object]") {
        let objA = arr[i]
        let propA = Object.getOwnPropertyNames(objA)
        let propB = Object.getOwnPropertyNames(preciate)
        for(let j = 0; j < propB.length; j++) {
          let propName = propB[j]
          if(objA[propName] != preciate[propName]){
            break
          }
          if(j == propB.length - 1) {
            return arr[i]
          }
        }
      }
      if(type == "[object Array]") {
        let item = arr[i]
        if(item[preciate[0]] == preciate[1]) {
          return arr[i]
        }
      }
      if(type == "[object String]") {
        let item = arr[i]
        if(item[preciate] == true) {
          return arr[i]
        }
      }
    }
  }

  function toArray(value) {
    let val = typeof value
    let res = []
    if(val == "object") {
      for(let key in value) {
        res.push(value[key])
      }
    }else if(val == "string") {
      res.push(...value.split(""))
    }
    return res
  }

  function max(arr) {
    if(arr.length == 0) {
      return undefined
    }
    let res = arr[0]
    for(let i = 1; i < arr.length; i++) {
      res = res > arr[i] ? res : arr[i]
    }
    return res
  }

  function maxBy(arr,iteratee) {
    let val = typeof iteratee
    let max = -Infinity
    let res
    for(let i = 0; i < arr.length; i++) {
      if(val == "function") {
        let number = iteratee(arr[i])
        if(number > max) {
          max = number
          res = arr[i]
        }
      }
      if(val == "string") {
        let item = arr[i]
        let number = item[iteratee]
        if(number > max) {
          max = number
          res = arr[i]
        }
      }
    }
    return res
  }

  function min(arr) {
    if(arr.length == 0) {
      return undefined
    }
    let res = arr[0]
    for(let i = 1; i < arr.length; i++) {
      res = res > arr[i] ? arr[i] : res
    }
    return res
  }

  function minBy(arr,iteratee) {
    let val = typeof iteratee
    let min = Infinity
    let res
    for(let i = 0; i < arr.length; i++) {
      if(val == "function") {
        let number = iteratee(arr[i])
        if(number < min) {
          min = number
          res = arr[i]
        }
      }
      if(val == "string") {
        let item = arr[i]
        let number = item[iteratee]
        if(number < min) {
          min = number
          res = arr[i]
        }
      }
    }
    return res
  }

  function sum(arr) {
    let res = 0
    for(let i = 0; i < arr.length; i++) {
      res += arr[i]
    }
    return res
  }

  function sumBy(arr,iteratee) {
    let val = typeof iteratee
    let res = 0
    for(let i = 0; i < arr.length; i++) {
      if(val == "function") {
        let number = iteratee(arr[i])
        res += number
      }
      if(val == "string") {
        let item = arr[i]
        let number = item[iteratee]
        res += number
      }
    }
    return res
  }


  function checkType(val) {
    return Object.prototype.toString.call(val)
  }

  function dropRightWhile(arr,predicate) {
    let type = checkType(predicate)
    let res = []
    for(let i = 0; i < arr.length; i++) {
      if(type == "[object Function]") {
        if(predicate(arr[i]) == false) {
          res.push(arr[i])
        }
      }
      if(type == "[object Object]") {
        let item = arr[i]
        let propA = Object.getOwnPropertyNames(item)
        let propB = Object.getOwnPropertyNames(predicate)
        for(let j = 0; j < propB.length; j++) {
          let propName = propB[j]
          if(item[propName] !== predicate[propName]) {
            res.push(item)
          }
            break
        }
      }
      if(type == "[object Array]") {
        let item = arr[i]
        if(item[predicate[0]] !== predicate[1]){
          res.push(arr[i])
        }
      }
      if(type == "[object String]") {
        let item = arr[i]
        if(predicate in item) {
          res.push(arr[i])
        }
      }
    }
    return res
  }

  function dropWhile(arr,predicate) {
    let type = checkType(predicate)
    let res = []
    for(let i = 0; i < arr.length; i++) {
      let item = arr[i]
      if(type == "[object Function]") {
        if(predicate(arr[i]) == false) {
          res.push(...arr.slice(i))
          break
        }
        continue
      }
      if(type == "[object Object]") {
        let propA = Object.getOwnPropertyNames(item)
        let propB = Object.getOwnPropertyNames(predicate)
        for(let j = 0; j < propB.length; j++) {
          let propName = propB[j]
          if(item[propName] !== predicate[propName]) {
            res.push(item)
          }
            break
        }
      }
      if(type == "[object Array]") {
        if(item[predicate[0]] !== predicate[1]){
          res.push(arr[i])
        }
      }
      if(type == "[object String]") {
        let propA = Object.getOwnPropertyNames(item)
        for(let i = 0; i < propA.length; i++){
          if(propA[i] !== predicate) {
            res.push(item)
          }
          break
        }
      }
    }
    return res
  }

  function intersection(...arrs) {
    let res = []
    let firstArr = arrs[0]
    for(let i = 0; i < firstArr.length; i++) {
      for(let j = 1; j < arrs.length; j++) {
        if(!arrs[j].includes(firstArr[i])) {
          break
        }
        if(j == arrs.length - 1) {
          res.push(firstArr[i])
        }
      }
    }
    return res
    
  }

  function intersectionBy(arr,...iteratee) {
    let res = []
    let firstArr = arr
    let otherArr
    let predicate
    for(let i = 0; i < iteratee.length; i++) {
      if(Array.isArray(iteratee[i])) {
        otherArr = iteratee[i]
      }else {
        predicate = iteratee[i]
      }
    }
    let type = checkType(predicate)
    for(let i = 0; i < firstArr.length; i++) {
      for(let j = 0; j < otherArr.length; j++) {   
        if(type == "[object Function]") {
          if(predicate(firstArr[i]) === predicate(otherArr[j])) {
            res.push(firstArr[i])
          }
        }
        if(type == "[object String]") {
          let item = arr[i]
          let itemB = otherArr[j]
          let propA = item[predicate]
          let propB = itemB[predicate]
          if(propA === propB) {
            res.push(item)
            break
          }
        }
      }
    }
    return res
  }
  
  function intersectionWith(arr,arrs,comparator) {
    let res = []
    for(let i = 0; i < arr.length; i++) {
      let itemA = arr[i]
      for(let j = 0; j < arrs.length; j++) {
        let itemB = arrs[j]
        if(comparator(itemA,itemB) && !res.includes(itemA)) {
          res.push(itemA)
        }
      }
    }
    return res
  }

  function isEqual(x,y) {
    // 判断string,number,boolean
    if(x === y) {
      return true
    }
    // 判断NaN
    if(x !== x && y !== y) {
      return true
    }
    if(x === null || y === null || typeof x !== 'object' || typeof y !== 'object') {
      return false
    }
    // 只枚举自身属性
    if(Object.keys(x).length !== Object.keys(y).length) {
      return false
    }
    for(let key in x) {
      if(!(key in y) || !isEqual(x[key],y[key])) {
        return false
      }
    }
    return true
  }

  function nth(arr,n) {
    if(n < 0) {
      n = n + arr.length
    }
    return arr[n]
  }

  function remove(arr,predicate) {
    let res = []
    for(let i = 0; i < arr.length; i++) {
      if(predicate(arr[i])) {
        res.push(arr[i])
        arr.splice(i,1)
        i--
      }
    }
    return res
  }

  function pull(arr,...values) {
    remove(arr,(item) => values.includes(item))
    return arr
  }

  function pullAll(arr,values) {
    remove(arr, item => values.includes(item))
    return arr
  }

  function pullAllBy(arr,values,iteratee) {
    let type = checkType(iteratee)
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < values.length; j++) {
        let itemA = arr[i]
        let itemB = values[j]
        if(itemA && itemB &&itemA[iteratee] && itemB[iteratee] && itemA[iteratee] === itemB[iteratee]) {
          arr.splice(i,1)
          i--
        }
      }
    }
    return arr
  }

  function pullAllWith(arr,values,compactor) {
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < values.length; j++) {
        let itemA = arr[i]
        let itemB = values[j]
        if(compactor(itemA,itemB)) {
          arr.splice(i,1)
          i--
        }
      }
    }
    return arr
  }

  function union(...arrs) {
    return [...new Set(flattenDeep([...arrs]))]
  }

  function unionBy(arrs,...iteratee) {
    let arr = iteratee[0]
    iteratee = iteratee[1]
    let type = checkType(iteratee)
    let res = [...arrs]
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < res.length; j++) {
        if(type == "[object Function]") {
          if(iteratee(arr[i]) == iteratee(res[j])) {
            break
          }
          if(j == res.length - 1) {
            res.push(arr[i])
          }
        }
        if(type == "[object String]") {
          let itemRes = res[j]
          let itemArr = arr[i]
          if(itemRes[iteratee] === itemArr[iteratee]) {
            break
          }
          if(j == res.length - 1) {
            res.push(arr[i])
          }
        }
      }
    }
    return res
  }

  function uniq(arr) {
    return [...new Set(arr)]
  }

  function uniqBy(arr,iteratee) {
    let type = checkType(iteratee)
    let res = [arr[0]]
    let rest = arr.slice(1)
    return unionBy(res,rest,iteratee)
  }
  
  function zip(...arrs) {
    let res = []
    for(let j = 0; j < arrs[0].length; j++) {
      let temp = []
      for(let i = 0; i < arrs.length; i++) {
        temp.push(arrs[i][j])
      }
      res.push(temp)
    }
    return res
  }

  function unzip(arr) {
    return zip(...arr)
  }

  function without(arr,...values) {
    let res = []
    for(let i = 0; i < arr.length; i++) {
      if(!values.includes(arr[i])) {
        res.push(arr[i])
      }
    }
    return res
  }

  function xor(...arrs) {
    let arr = flattenDeep(arrs)
    let res = []
    let map = new Map()
    for(let i = 0; i < arr.length; i++) {
      let val = map.get(arr[i])
      map.set(arr[i],val == undefined ? 0 : 1)
    }
    for(let i = 0; i < arr.length; i++) {
      let val = map.get(arr[i])
      if(val == 0) {
        res.push(arr[i])
      }
    }
    return res
  }

  function countBy(collection, iteratee) {
    let type = checkType(iteratee)
    let res = {}
    for(let item of collection) {
      if(type == "[object Function]") {
        let afterItem = iteratee(item)
        let val = res[afterItem]
        res[afterItem] = val == undefined ? 1 : val + 1
      }
      if(type == "[object String]") {
        let afterItem = item[iteratee]
        let val = res[afterItem]
        res[afterItem] = val == undefined ? 1 : val + 1
      }
    }
    return res
  }

  function flatMap(collection, iteratee) {
    let res = []
    for(let item of collection) {
      res.push(iteratee(item))
    }
    return flattenDeep(res)
  }

  function flatMapDeep(collection, iteratee) {
    let res = []
    for(let item of collection) {
      res.push(iteratee(item))
    }
    return flattenDeep(res)
  }

  function flatMapDepth(collection,iteratee, depth = 1) {
    let res = []
    for(let item of collection) {
      res.push(iteratee(item))
    }
    return flattenDepth(res,depth)
  }

  function forEach(collection, iteratee) {
    let type = checkType(collection)
    let res = type == "[object Array]" ? [] : {}
    for(let item in collection) {
      if(type == "[object Array]") {
        iteratee(collection[item],item,collection)
        res.push(collection[item])
      }
      if(type == "[object Object]") {
        iteratee(collection[item],item,collection)
        res[item] = collection[item]
      }
    }
    return res
  }

  function groupBy(collection,iteratee) {
    let type = checkType(iteratee)
    let res = {}
    let afterItem
    for(let item of collection) {
      if(type == "[object Function]") {
        afterItem = iteratee(item)
      }
      if(type == "[object String]") {
        afterItem = item[iteratee]
      }
      let val = res[afterItem]
      val == undefined ? res[afterItem] = [item] : res[afterItem].push(item)
    }
    return res
  }

  function keyBy(collection, iteratee) {
    let type = checkType(iteratee)
    let res = {}
    let afterItem
    for(let item of collection) {
      if(type == "[object Function]") {
        afterItem = iteratee(item)
      }
      if(type == "[object String]"){
        afterItem = item[iteratee]
      }
      res[afterItem] = item
    }
    return res
  }


  /**
   * @descripttion: 创建一个数组，值是iteratee(迭代函数)遍历集合中的每一个元素返回的结果。
   * @name: 
   * @param {*} collection
   * @param {*} iteratee
   * @return {new Array}
   */
  function map(collection, iteratee) {
    let res = []
    let collectionType = checkType(collection)
      iteratee = handleIteratee(iteratee)
    if(collectionType == "[object Array]") {
      for(let item of collection) {
        res.push(iteratee(item))
      }
    }
    if(collectionType == "[object Object]") {
      for(let item in collection) {
        res.push(iteratee(collection[item]))
      }
    }
    return res
  }


  /**
   * @descripttion: 将数组分成两组，第一组是由断言函数返回为真值的元素，第二组返回为false的元素
   * @name: 
   * @param {(Array|Object)} collection
   * @param {Function} predicate
   * @return {new Array}
   */
  function partition(collection,predicate) {
    let res = []
    let tempT = []
    let tempF = []
    let iteratee = handleIteratee(predicate)
    console.log(iteratee)
    for(let item of collection) {
      if(iteratee(item) == true) {
        tempT.push(item)
      }else if(iteratee(item) == false){
        tempF.push(item)
      }
    }
    res.push(tempT)
    res.push(tempF)
    return res
  }

  /**
   * @descripttion: 创建一个深比较的方法来比较对象和source对象，如果给定的对象拥有相同的属性则返回true否则为false
   * @name: 
   * @param {obj} source
   * @return {boolean}
   */
  function matches(source) {
    return function(obj) {
      for(let key in source) {
        if(!obj[key] || !isEqual(source[key],obj[key])) {
          return false
        }else {
          return true
        }
      }
    }
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
    lastIndexOf,
    reverse,
    sortedIndex,
    every,
    filter,
    find,
    toArray,
    max,
    maxBy,
    min,
    minBy,
    sum,
    sumBy,
    checkType,
    dropRightWhile,
    dropWhile,
    intersection,
    intersectionBy,
    intersectionWith,
    isEqual,
    nth,
    remove,
    pull,
    pullAll,
    pullAllBy,
    pullAllWith,
    union,
    unionBy,
    uniq,
    uniqBy,
    zip,
    unzip,
    without,
    xor,
    countBy,
    flatMap,
    flatMapDeep,
    flatMapDepth,
    forEach,
    groupBy,
    keyBy,
    map,
    partition,
    matches,
  }
}()
