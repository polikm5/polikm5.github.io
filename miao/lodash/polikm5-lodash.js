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

  /**
   * @descripttion: 创建一个深比较的方法来比较对象和source对象，如果给定的对象拥有相同的属性则返回true否则为false
   * @name: 
   * @param {obj} source
   * @return {boolean}
   */
  function matches(source) {
    return function(obj) {
      for(let key in source) {
        if(!(key in obj) || !isEqual(source[key],obj[key])) {
          return false
        }
      }
      return true
    }
  }

    /**
   * @descripttion: 创建一个深比较的方法来比较对象和source对象，如果给定的对象拥有相同的属性则返回true否则为false
   * @name: 
   * @param {obj} source
   * @return {boolean}
   */
  function matchesOnce(source) {
    return function(obj) {
      for(let key in source) {
        if(!obj[key] || !isEqual(source[key],obj[key])) {
          return false
        }
        return true
      }
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


  /**
   * @descripttion: 类似sortedIndex，除了它接受一个iteratee调用每一个数组元素，返回结果和value值比较来计算排序
   * @param {*} arr
   * @param {*} value
   * @param {*} iteratee
   * @return {*}返回value值应该在数组arr中插入的索引位置index
   */

  
  function sortedIndexBy(arr,value,iteratee) {
    iteratee = handleIteratee(iteratee)
    let val = iteratee(value)
    for(let i = 0; i < arr.length; i++) {
      if(iteratee(arr[i]) >= val) {
        return i
      }
    }
    return arr.length
  }


  /**
   * @descripttion: 类似indexOf，除了它是在已经排序的数组arr上执行二进制检索
   * @param {*} arr
   * @param {*} value
   * @return {*}
   */
  // 找下边界
  function sortedIndexOf(arr,value) {
    let left = 0
    let right = arr.length - 1
    while(left < right) {
      let mid = (left + right) >> 1
      if(arr[mid] < value) {
        left = mid + 1
      }else{
        right = mid
      }
    }
    if(arr[left] == value) {
      return left
    }
    return -1
  }

  /**
   * @descripttion: 类似于sortedIndex，除了它返回value值在array中尽可能大的索引位置
   * @param {*} arr
   * @param {*} value
   * @return {*}返回 value值 应该在数组array中插入的索引位置 index。
   */
    // 找上边界 + 1
  function sortedLastIndex(arr,value) {
    let left = 0
    let right = arr.length - 1
    while(left < right) {
      let mid = (left + right) >> 1
      if(arr[mid] <= value) {
        left = mid + 1
      }else {
        right = mid
      }
    }
    // 原本 left与val相等的位置在left-1 但是这是需要value在arr中尽可能大的索引位置
    return left
  }

  /**
   * @descripttion: 类似于sortedLastIndex,除了它接受一个iteratee，调用每一个数组元素，返回结果和value值比较来计算排序
   * @param {*} arr
   * @param {*} value
   * @param {*} iteratee
   * @return {*}返回 value值 应该在数组array中插入的索引位置 index
   */
  function sortedLastIndexBy(arr,value,iteratee) {
    iteratee = handleIteratee(iteratee)
    let iterArr = arr.map((item) => iteratee(item))
    let iterVal = iteratee(value)
    return sortedLastIndex(iterArr,iterVal)
  }


  /**
   * @descripttion: 这个方法类似lastIndexOf，除了它是在已经排序的数组array上执行二进制检索。
   * @param {*} arr
   * @param {*} value
   * @return {*}返回匹配值的索引位置，否则返回 -1
   */
  function sortedLastIndexOf(arr,value) {
    let left = 0
    let right = arr.length - 1
    while(left < right) {
      let mid = (left + right) >> 1
      if(arr[mid] <= value) {
        left = mid + 1
      }else {
        right = mid
      }
    }
    return left - 1
  }

  /**
   * @descripttion: 去掉重复元素
   * @param {*} arr
   * @return {*}返回新数组
   */
  function sortedUniq(arr) {
    return uniq(arr)
  }

  /**
   * @descripttion: 跟sortedUniq函数一样，除了arr的每个元素都要通过iteratee迭代后在判断
   * @param {*} arr
   * @param {*} iteratee
   * @return {*}返回新数组
   */
  function sortedUniqBy(arr,iteratee) {
    iteratee = handleIteratee(iteratee)
    let res = [arr[0]]
    for(let i = 1; i < arr.length; i++) {
      if(iteratee(arr[i]) == iteratee(arr[i - 1])) {
        continue
      }else {
        res.push(arr[i])
      }
    }
    return res
  }

  /**
   * @descripttion: 获取除了array数组第一个元素以外的全部元素
   * @param {*}
   * @return {*}返回 array 数组的切片（除了array数组第一个元素以外的全部元素）。
   */
  function tail(arr) {
    return arr.slice(1)
  }

  /**
   * @descripttion: 创建一个数组切片，从array数组的起始元素开始提取n个元素。
   * @param {*} arr
   * @param {*} n
   * @return {*}返回 array 数组的切片（从起始元素开始n个元素）。
   */
  function take(arr,n=1) {
    return arr.slice(0,n)
  }

  /**
   * @descripttion: 创建一个数组切片，从array数组的最后一个元素开始提取n个元素
   * @param {*} arr
   * @param {*} n
   * @return {*}返回 array 数组的切片（从结尾元素开始n个元素）。
   */
  function takeRight(arr,n=1) {
    return arr.slice(arr.length - n >= 0 ? arr.length - n : 0)
  }

  /**
   * @descripttion: 从array数组的最后一个元素开始提取元素，直到 predicate 返回假值,predicate 会传入三个参数： (value, index, array)。
   * @param {*} arr
   * @param {*} predicate
   * @return {*}
   */
  function takeRightWhile(arr,predicate) {
    let iteratee = handleIteratee(predicate)
    let res = []
    for(let i = arr.length - 1; i >= 0; i--) {
      if(iteratee(arr[i],i,arr) == true) {
        res.unshift(arr[i])
      }else {
        return res
      }
    }
    return res
  }

  /**
   * @descripttion: 从array数组的起始元素开始提取元素，，直到 predicate 返回假值。predicate 会传入三个参数： (value, index, array)。
   * @param {*} arr
   * @param {*} predicate
   * @return {*}返回 array 数组的切片。
   */
  function takeWhile(arr,predicate) {
    let iteratee = handleIteratee(predicate)
    let res = []
    for(let i = 0; i < arr.length; i++) {
      if(iteratee(arr[i],i,arr)) {
        res.push(arr[i])
      }else {
        return res
      }
    }
    return res
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
    let res = []
    let iteratee = handleIteratee(preciate)
    for(let i = 0; i < arr.length; i++) {
      if(iteratee(arr[i])) {
        res.push(arr[i])
      }
    }
    return res
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
        for(let j = fromIndex; j < propB.length; j++) {
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


  /**
   * @descripttion: 和find函数类似 除了它从从右往左迭代每个集合中的元素
   * @param {Array|Object} collection
   * @param {Function} predicate
   * @param {*} fromIndex
   * @return {*}返回匹配的元素，否则返回undefined
   */
  function findLast(collection,predicate,fromIndex=collection.length-1) {
    iteratee = handleIteratee(predicate)
    for(let i = fromIndex; i >= 0; i--) {
      if(iteratee(collection[i])) {
        return collection[i]
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

  /**
   * @descripttion: 将值转变为有限数字
   * @param {*} value
   * @return {*}返回转变的数字
   */
  function toFinite(value) {
    if(value !== value) {
      return 0
    }
    if(value === Infinity) {
      return Number.MAX_VALUE
    }else if(value === -Infinity) {
      return -Number.MAX_VALUE
    }else {
      return Number(value)
    }
  }

  /**
   * @descripttion: 将value转变为整数
   * @param {*} value
   * @return {*}返回转变的数字
   */
  function toInteger(value) {
    let num = toFinite(value)
    return Math.floor(num)
  }

  /**
   * @descripttion: 转变value为用作类数组对象的长度整数
   * @param {*} value
   * @return {*}返回转变后的数字
   */
  function toLength(value) {
    let temp = Math.pow(2,32) - 1
    if(value > temp) {
      return temp
    }else {
      return toInteger(value)
    }
  }

  /**
   * @descripttion: 将value变成一个数字
   * @param {*} value
   * @return {*}返回转变后的数字
   */
  function toNumber(value) {
    return Number(value)
  }

  /**
   * @descripttion: 分配来源对象的可枚举属性到目标对象上。 来源对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。
   * @param {*} object
   * @param {array} sources
   * @return {*}返回 object.(改变原对象)
   */
  function assign(object,...sources) {
    for(let obj of sources) {
      for(let item in obj) {
        if(obj.hasOwnProperty(item)) {
          object[item] = obj[item]
        }
      }
    }
    return object
  }

  /**
   * @descripttion: 将value转变为一个安全整形
   * @param {*} value
   * @return {*}返回转变的数字
   */
  function toSafeInteger(value) {
    if(value === Infinity) {
      return Number.MAX_SAFE_INTEGER
    }else {
      return toInteger(value)
    }
  }

  /**
   * @descripttion: 加两个数字
   * @param {*} auged 被加数
   * @param {*} addend  加数
   * @return {*}  返回总数
   */
  function add(auged,addend) {
    while(addend !== 0) {
      let temp = auged ^ addend
      addend = (auged & addend) << 1
      auged = temp
    }
    return auged
  }

  /**
   * @descripttion: 除两个数
   * @param {*} dividend
   * @param {*} divisor
   * @return {*} 返回商
   */
  function divide(dividend, divisor) {
    return dividend / divisor
  }

  /**
   * @descripttion: 将数字向下取整到precision位数
   * @param {*} number
   * @param {*} precision
   * @return {*}
   */
  function floor(number,precision = 0) {
    if(precision == 0) {
      return Math.floor(number)
    }
    let temp = Math.floor(number * (10 ** precision)) / 10 ** precision
    return temp
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

  /**
   * @descripttion: 计算数组的平均值
   * @param {*} arr
   * @return {*}返回平均值
   */
  function mean(arr) {
    return arr.reduce((item,cur,idx) => {
      return (item * idx + cur)  / (idx + 1)
    })
  }

  /**
   * @descripttion: 和mean函数一样除了它接受一个iteratee函数以外
   * @param {*} arr
   * @param {*} iteratee
   * @return {*}  返回平均值
   */
  function meanBy(arr,iteratee) {
    iteratee = handleIteratee(iteratee)
    let sum = 0
    for(let i = 0; i < arr.length; i++) {
      sum += iteratee(arr[i])
    }
    return sum / arr.length
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

  /**
   * @descripttion: 乘两个数
   * @param {*} multiplier
   * @param {*} multiplicand
   * @return {*}返回产生的值
   */
  function multiply(multiplier,multiplicand) {
    return multiplier * multiplicand
  }

  /**
   * @descripttion: 根据precision精度四舍五入number
   * @param {*} number
   * @param {*} precision
   * @return {*}
   */
  function round(number, precision=0) {
    if(precision == 0) {
      return Math.round(number)
    }
    let temp = Math.round(number * (10 ** precision)) / 10 ** precision
    return temp
  }

  /**
   * @descripttion: 两个值相减
   * @param {*} minuend
   * @param {*} subtrahend
   * @return {*}
   */
  function subtract(minuend,subtrahend) {
    return minuend - subtrahend
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

  /**
   * @descripttion: 返回限制在 lower 和 upper 之间的值
   * @param {*} number
   * @param {*} lower
   * @param {*} upper
   * @return {*}返回被限制的值。
   */
  function clamp(number,lower,upper) {
    if(number < lower) {
      return lower
    }else if(number > upper) {
      return upper
    }else {
      return number
    }
  }

  /**
   * @descripttion: 检查 n 是否在 start 与 end 之间，但不包括 end。 如果 end 没有指定，那么 start 设置为0然后将start原有值赋给end。 如果 start 大于 end，那么参数会交换以便支持负范围。
   * @param {*} number
   * @param {*} start
   * @param {*} end
   * @return {*}如果number在范围内 ，那么返回true，否则返回 false
   */
  function inRange(number, start=0, end) {
    if(end == undefined) {
      end = start
      start = 0
    }
    if(start > end) {
      [start,end] = [end,start]
    }
    if(number >= start && number < end) {
      return true
    }
    return false
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

  /**
   * @descripttion: 这个函数和union函数一样除了它接受一个comparator用来调用每个数组的元素用来对比
   * @param {array} values
   * @return {*}
   */
  function unionWith(...values) {
    let comparator = values.pop()
    let objects = values.shift()
    let other = values.shift()
    let len = objects.length + other.length
    for(let oth in other) {
      for(let obj in objects) {
        if(comparator(objects[obj],other[oth])) {
          delete other[oth]
          len--
        }
      }
    }
    return objects.concat(other).slice(0,len)
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
  
  /**
   * @descripttion: 和uniq函数一样，除了它接受一个comparator用来调用并比较数组中的每个元素
   * @param {*} arr
   * @param {*} comparator
   * @return {*}返回新的数组
   */
  function uniqWith(arr,comparator) {
    let res = []
    let map = new Array(arr.length).fill(true)
    for(let i = 0; i < arr.length; i++) {
      for(let j = i + 1; j < arr.length;j++) {
        if(map[i] && map[j] &&comparator(arr[i],arr[j])) {
          map[j] = false
        }
      }
    }
    for(let i = 0; i < map.length; i++) {
      if(map[i]) {
        res.push(arr[i])
      }
    }
    return res
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

  /**
   * @descripttion: 和fromPairs函数一样除了它接受两个数组，一个是属性，另一个是对应的属性值
   * @param {Array} props
   * @param {Array} values
   * @return {*}
   */
  function zipObject(props=[],values=[]) {
    let res = {}
    for(let i = 0; i < props.length; i++) {
      res[props[i]] = values[i]
    }
    return res
  }


  /**
   * @descripttion: 函数和zipObject一样除了它能够支持路径属性以外
   * @param {Array} props
   * @param {Array} values
   * @return {*}
   */
  function zipObjectDeep(props=[],values=[]) {
    let obj = {} 
    for(let i = 0; i < props.length; i++) {
      let temp = obj
      let path = props[i] 
      let paths = path.split(".")
      let ind
      for(let j = 0; j < paths.length;j++) {
        let pos = paths[j].indexOf("[")
        if(pos !== -1) {
          ind = paths[j][pos + 1]
        }
        if(j == paths.length - 1) { 
          let t = {}
          t[paths[j][0]] = values[i]
          temp[ind] = t
          break
        }
        if( paths[j][0] in temp && paths[j][0] !== "[" && paths[j][0] !== "]" && paths[j][0] !== ".") {
          temp = temp[paths[j][0]]
        }else if(i == 0){
          if( pos == -1) {
            temp[paths[j][0]] = {}
            temp = temp[paths[j][0]]
          }else {
            let item = paths[j].slice(0,pos)
            ind = paths[j][pos + 1]
            temp[item] = []
            temp = temp[item]
          }
        }
      }
    }
    return obj
  }

  /**
   * @descripttion: 和zip函数一样除了它能接受一个iteratee函数指定分组的值应该如何被组合
   * @param {array} values
   * @return {*} 返回分组元素的新数组
   */
  function zipWith(...values) {
    let iteratee = handleIteratee(values.pop())
    let arr = zip(...values)
    let res = []
    for(let i = 0; i < arr.length; i++) {
      res.push(iteratee.call(null,...arr[i]))
    }
    return res
  }
  function unzip(arr) {
    return zip(...arr)
  }


  /**
   * @descripttion: 和unzip函数一样除了它接受一个迭代函数 表明一个重新组合的值应该怎么被组合起来
   * @param {*} arr
   * @param {*} iteratee
   * @return {*}返回新的重新组合的数组
   */
  function unzipWith(arr,iteratee) {
    let res = []
    for(let i = 0; i < arr[0].length; i++) {
      let temp = []
      for(let item of arr) {
        temp.push(item[i])
      }
      res.push(iteratee(...temp))
    }
    return res
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

  /**
   * @descripttion: 和xor函数一样除了它接受一个iteratee迭代函数用来调用数组中的每个元素并对比
   * @param {array} values
   * @return {*}
   */
  function xorBy(...values) {
    let iteratee = handleIteratee(values.pop())
    let res = []
    for(let i = 0; i < values.length; i++) {
      res.push(handleSet(values[i],iteratee,false))
    }
    res = handleSet(flattenDeep(res),iteratee,true)
    return res
    function handleSet(arr,iteratee,isFin) {
      let arrMap = new Map()
      let res = []
      for(let i = 0; i < arr.length; i++) {
        let iterVal = iteratee(arr[i])
        let val = arrMap.get(iterVal)
        if(isFin == false) {
          val === undefined ? arrMap.set(iterVal,arr[i]) : null
        }else if(isFin == true) {
          val === undefined ? arrMap.set(iterVal,arr[i]) : arrMap.set(iterVal,null)
        }
      }
      for(let [key,value] of arrMap) {
        if(value !== null) {
          res.push(value)
        }
      }
      return res
    }
  }

  /**
   * @descripttion: 和xor函数一样除了它接受一个comparator来对比数组中的每个元素
   * @param {array} values
   * @return {*}
   */
  function xorWith(...values) {
    let comparator = values.pop()
    let objects = values.shift()
    let others = values.shift()
    let res = []
    let len = objects.length + others.length
    let map = new Array(len).fill(true)
    for(let i = 0; i < objects.length; i++) {
      for(let j = 0; j < others.length; j++) {
        if(comparator(objects[i],others[j])) {
          map[i] = false
          map[j + objects.length] = false
        }
      }
    }
    let temp = objects.concat(others)
    for(let i = 0; i < temp.length; i++) {
      if(map[i]) {
        res.push(temp[i])
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

  /**
   * @descripttion: 和forEacn函数类似除了它迭代元素的顺序是从右往左
   * @param {*} collection
   * @param {*} iteratee
   * @return {*}
   */
  function forEachRight(collection,iteratee) {
    iteratee = handleIteratee(iteratee)
    for(let i = collection.length - 1; i >= 0; i--) {
      iteratee(collection[i])
    }
    return collection
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

  /**
   * @descripttion: 检查value是否在collection集合中。如果collection是字符串，那就检查是否有value的子串
   * @param {*} collection
   * @param {*} value
   * @param {*} fromIndex
   * @return {*}
   */
  function includes(collection,value,fromIndex=0) {
    if(typeof collection == "object") {
      for(let item in collection) {
        if(fromIndex <= 0) {
          if(collection[item] === value) {
            return true
          }
        }
        fromIndex--
      }
    }
    if(typeof collection == "string") {
      if(collection.indexOf(value) !== -1) {
        return true
      }
    }
    return false
  }


  /**
   * @descripttion: 集合中的元素都调用path中的方法，返回调用后的结果，额外的参数都给每次调用的函数
   * @param {*} collection
   * @param {*} path
   * @param {array} args
   * @return {*}
   */
  function  invokeMap(collection,path,...args) {
    for(let i = 0; i < collection.length; i++) {
      let item = collection[i]
      if(typeof path === "string") {
        if(args.length !== 0) {
          item[path](...args)
        }else {
          item[path]()
        }
      }
      if(typeof path === "function") {
        collection[i] = path.call(collection[i],...args)
      }
    }
    return collection
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
      for(let i = 0; i < collection.length; i++) {
        res.push(iteratee(collection[i],i,collection))
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
   * @descripttion: 压缩 collection（集合）为一个值，通过 iteratee（迭代函数）遍历 collection（集合）中的每个元素，每次返回的值会作为下一次迭代使用(注：作为iteratee（迭代函数）的第一个参数使用)。 如果没有提供 accumulator，则 collection（集合）中的第一个元素作为初始值
   * @name: 
   * @param {Array|Object} collection
   * @param {Function} iteratee
   * @param {*} accmulator:The initial value.
   * @return {the accumulated value.}
   */  
  function reduce(collection,iteratee,accmulator) {
    let collectionType = checkType(collection)
    iteratee = handleIteratee(iteratee)
    let res
    if(collectionType == "[object Array]") {
      res = 0
      // 说明初始值为undefined
      if(accmulator != undefined) {
        res = iteratee(res,accmulator)
      }
      for(let i = 0; i < collection.length; i++) {
        res = iteratee(res,collection[i],i)
      }
    }
    if(collectionType == "[object Object]") {
      let temp = []
      for(let key in collection) {
        temp.push(key)
      }
      if(accmulator != undefined) {
        for(let i = 0; i < temp.length; i++) {
          res = iteratee(accmulator,collection[temp[i]],temp[i])
        }
      }else {
        res = collection[temp[0]]
      }
    }
    return res
  }

  /**
   * @descripttion: 和reduce方法一样除了它的通过迭代函数遍历collection的顺序是从右往前
   * @param {Array|Object} collection
   * @param {Function} iteratee
   * @param {*} accmulator:The initial value.
   * @return {the accumulated value.}
   */
  function reduceRight(collection,iteratee,accmulator) {
    let collectionType = checkType(collection)
    iteratee = handleIteratee(iteratee)
    let accmulatorType = checkType(accmulator)
    let res
    if(collectionType == "[object Array]") {
      res = 0
      // 说明初始值为undefined
      if(accmulator != undefined) {
        if(accmulatorType == "[object Array]") {
          res = []
          res = iteratee(res,accmulator)
        }
      }
      for(let i = collection.length - 1; i >= 0; i--) {
        res = iteratee(res,collection[i],i)
      }
    }
    if(collectionType == "[object Object]") {
      let temp = []
      for(let key in collection) {
        temp.push(key)
      }
      if(accmulator != undefined) {
        for(let i = temp.length - 1; i >= 0; i--) {
          res = iteratee(accmulator,collection[temp[i]],temp[i])
        }
      }else {
        res = collection[temp[temp.lenth - 1]]
      }
    }
    return res
  }

  /**
   * @descripttion: 返回集合元素中断言匹配为假的值
   * @param {Array|Object} collection
   * @param {Function} predicate
   * @return {Array} Returns the new filtered array.
   */
  function reject(collection,predicate) {
    let iteratee = handleIteratee(predicate)
    let res =[]
    for(let item of collection) {
      if(iteratee(item) == false) {
        res.push(item)
      }
    }
    return res
  }

  /**
   * @descripttion: 从collection集合中随机返回一个元素
   * @param {Array|Object} collection
   * @return {*}Returns the random element.
   */
  function sample(collection) {
    return collection[Math.floor(Math.random() * collection.length)]
  }

  /**
   * @descripttion: 从collection集合中随机获取n个元素（不挑选重复数）
   * @param {*} collection
   * @param {*} n
   * @return {*}
   */
  function sampleSize(collection,n=1) {
    let res = []
    while(n !== res.length && collection.length !== 0) {
      let ind = Math.floor(Math.random() * collection.length)
      res.push(...collection.splice(ind,1))
    }
    return res
  }
  /**
   * @descripttion: 创建一个随机打乱后的数组
   * @param {Array|Object} collection
   * @return {Array} Returns the new shuffled array.
   */
  function shuffle(collection) {
    let res = []
    let i = 0
    while(i < collection.length) {
      let random = Math.floor(Math.random() * collection.length)
      if(res[random] == undefined) {
        res[random] = collection[i]
        i++
      }
    }
    return res
  }

  /**
   * @descripttion: 获取集合中的长度，包含类数组，可枚举对象
   * @param {Array|Object|string} collection
   * @return {number}Returns the collection size.
   */
  function size(collection) {
    let res = 0
    let collectionType = checkType(collection)
    if(collectionType == "[object Array]" || collectionType == "[object String]") {
      res = collection.length
      return res
    }
    if(collectionType == "[object Object]") {
      for(let key in collection) {
        res++
      }
      return res
    }
  }

  /**
   * @descripttion: Returns true if any element passes the predicate check, else false.
   * @param {Array|Object} collection
   * @param {Function} predicate
   * @return {boolean}  Returns true if any element passes the predicate check, else false.
   */
  function some(collection,predicate) {
    let iteratee = handleIteratee(predicate)
    for(let item of collection) {
      if(iteratee(item)) {
        return true
      }
    }
    return false
  }

  /**
   * @descripttion: 创建一个数组，以iteratee处理的结果升序排序
   * @param {*} collection
   * @param {*} iteratee
   * @return {*}
   */
  function sortBy(collection,iteratee) {
    
  }




  /**
   * @descripttion: 创建一个新数组，每个collection中的元素通过迭代函数升序排序
   * @param {Array|Object} collection
   * @param {...(Function|Function[])} iteratee
   * @return {Array}Returns the new sorted array. 
   */
  function sortBy(collection,iteratee) {
    
  }

  /**
   * @descripttion: 推迟调用func，直到当前堆栈清理完毕。调用时，任何附加的参数会传给func
   * @param {Function} func
   * @param {...*} args
   * @return {number}  Returns the timer id.
   */
  function defer(func,...args) {
    var id = setTimeout(func,1,...args)
    return id - 1
  }

  /**
   * @descripttion: 推迟调用func，直到当前堆栈清理完毕。调用时，任何附加的参数会传给func
   * @param {Function} func
   * @param {number} wait
   * @param {...*} args
   * @return {number} Returns the timer id.
   */
  function delay(func,wait,...args) {
    var id = setTimeout(func,wait,...args)
    return id - 1
  }

  /**
   * @descripttion: 如果value不是一个数组那么将value变为数组
   * @param {*} value 
   * @return {*}
   */
  function castArray(value) {
    if(!isArray(value)) {
      if(arguments.length !== 0) {
        return [value]
      }else {
        return []
      }
    }
    return value
  }

  /**
   * @descripttion: 通过调用断言source的属性与 object 的相应属性值，检查 object是否符合 source
   * @param {*} object
   * @param {*} source
   * @return {*}如果 object 符合，返回 true，否则 false
   */
  function conformsTo(object,source) {
    let keys = Object.keys(source)
    for(let key of keys) {
      if(key in object) {
        if(source[key](object[key])){
          return true
        }else {
          return false
        }
      }
    }
  }

  /**
   * @descripttion: 执行SameValueZero 比较两者的值，来确定它们是否相等。
   * @param {*} value
   * @param {*} other
   * @return {*}如果两个值相等返回 true ，否则返回 false 。
   */
  function eq(value,other) {
    if(value !== value && other !== other) {
      return true
    }
    if(value === other) {
      return true
    }else {
      return false
    }
  }

  /**
   * @descripttion: 检查 value是否大于 other
   * @param {*} value
   * @param {*} other
   * @return {*}如果value 大于 other 返回 true，否则返回 false。
   */
  function gt(value,other) {
    if(value > other) {
      return true
    }else {
      return false
    }
  }

    /**
   * @descripttion: 检查 value是否大于等于 other
   * @param {*} value
   * @param {*} other
   * @return {*}如果value 大于 other 返回 true，否则返回 false。
   */
  function gte(value,other) {
    if(value >= other) {
      return true
    }else {
      return false
    }
  }
  /**
   * @descripttion: 判断是否是arguments对象
   * @param {*} value
   * @return {boolean} Returns true if value is an arguments object, else false.
   */
  function isArguments(value) {
    return checkType(value) === "[object Arguments]"
  }

  /**
   * @descripttion: 判断是否是数组
   * @param {*} value
   * @return {boolean} Returns true if value is an array, else false.
   */
  function isArray(value) {
    return checkType(value) === "[object Array]"
  }

  /**
   * @descripttion: 判断是否是ArrayBuffer对象
   * @param {*} value
   * @return {boolean}Returns true if value is an array buffer, else false.
   */
  function isArrayBuffer(value) {
    return checkType(value) === "[object ArrayBuffer]"
  }

  /**
   * @descripttion: 判断是否是isArrayLike对象
   * @param {*} value
   * @return {boolean}Returns true if value is array-like, else false.
   */
  function isArrayLike(value) {
    let type = checkType(value) 
    if(type == "[object Number]" || type == "[object Function]") {
      return false
    }
    if(value.length >= 0 && value.length <= Number.MAX_SAFE_INTEGER) {
      return true
    }
  }


  /**
   * @descripttion: 方法与isArrayLike一样 除了还要判断值是否是对象以外
   * @param {*} value
   * @return {boolean}Returns true if value is an array-like object, else false.
   */
  function isArrayLikeObject(value) {
    let type = typeof value
    if(type == "object" && value.length >= 0 && value.length <= Number.MAX_SAFE_INTEGER) {
      return true
    }else {
      return false
    }
  }

  /**
   * @descripttion: 判断是否是boolean对象
   * @param {*} value
   * @return {boolean}Returns true if value is a boolean, else false.
   */
  function isBoolean(value) {
    return checkType(value) === "[object Boolean]"
  }

  /**
   * @descripttion: 判断是否是日期对象
   * @param {*} value
   * @return {boolean}  Returns true if value is a date object, else false.
   */
  function isDate(value) {
    return checkType(value) === "[object Date]"
  }

  /**
   * @descripttion: 判断是否是HTML对象
   * @param {*} value
   * @return {boolean}Returns true if value is a DOM element, else false.
   */
  function isElement(value) {
    return checkType(value) === "[object HTMLBodyElement]"
  }

  /**
   * @descripttion: 
   * @param {*} value
   * @return {boolean} Returns true if value is empty, else false.
   */
  function isEmpty(value) {
    let type = checkType(value)
    let temp = []
    if(type === "[object Array]") {
      if(value.length > 0 ) {
        return false
      }
    }
    if(type === "[object Object]") {
      for(let item in value) {
        temp.push(item)
      }
      if(temp.length > 0) {
        return false
      }
    }
    return true
  }

  /**
   * @descripttion: 与isEqual一样除了要用customizer对比每一个值以外
   * @param {*} value
   * @param {*} other
   * @param {Function} customizer
   * @return {boolean} Returns true if the values are equivalent, else false.
   */
  function isEqualWith(value,other,customizer) {
    if(customizer !== undefined) {
      for(let i = 0; i < value.length; i++) {
        if(customizer(value[i],other[i]) === false) {
          return false
        }
      }
      return true
    }else {
      return isEqual(value,other)
    }
  }


  /**
   * @descripttion: 判断是否是错误类型的对象
   * @param {*} value
   * @return {boolean}  Returns true if value is an error object, else false.
   */
  function isError(value) {
    return checkType(value) === "[object Error]"
  }

  /**
   * @descripttion: 判断是否是有限的原始数字
   * @param {*} value
   * @return {boolean} Returns true if value is a finite number, else false.
   */
  function isFinite(value) {
    let type = checkType(value)
    if(type === "[object Number]") {
      if(value === Infinity || value === -Infinity) {
        return false
      }
      return true
    }
    return false
  }

  /**
   * @descripttion: 是否是函数
   * @param {*} value
   * @return {boolean}Returns true if value is a function, else false.
   */
  function isFunction(value) {
    return checkType(value) === "[object Function]"
  }

  /**
   * @descripttion: 判断是否是整型
   * @param {*} value
   * @return {*}
   */ 
  function isInteger(value) {
    return Math.floor(value) === value && isFinite(value)
  }

  /**
   * @descripttion: 判断值是否可以作为类数组的长度
   * @param {*} value
   * @return {boolean} Returns true if value is a valid length, else false.
   */
  function isLength(value) {
    return isInteger(value)
  }

  /**
   * @descripttion: 判断是否是map对象
   * @param {*} value
   * @return {boolean}Returns true if value is a map, else false.
   */
  function isMap(value) {
    return checkType(value) === "[object Map]"
  }

  /**
   * @descripttion: 深对比object和source 判断obj中是否包含相等的属性和值
   * @param {Object} object
   * @param {Object} source
   * @return {boolean} Returns true if object is a match, else false
   */
  function isMatch(object,source) {
    let compare = matches(source)
    return compare(object)
  }

  /**
   * @descripttion: 和match方法一样，除了object和source的每个参数都要通过迭代函数判断
   * @param {Object} object
   * @param {Object} source
   * @param {Function} customizer
   * @return {boolean}Returns true if object is a match, else false.
   */
  function isMatchWith(object,source,customizer) {
    if(customizer !== undefined) {
      for(let item in object) {
        if(customizer(object[item],source[item]) === false) {
          return false
        }
      }
      return true
    }else {
      return isMathc(object,source)
    }
  }

  /**
   * @descripttion: 判断该值是否为NaN
   * @param {*} value
   * @return {boolean} Returns true if value is NaN, else false.
   */
  function isNaN(value) {
    if(typeof value === "object") {
      return value.valueOf() !== value.valueOf()
    }
    return value !== value
  }

  /**
   * @descripttion: 检查 value 是否是一个原生函数。
   * @param {*} value
   * @return {*}如果 value 是一个 原生函数，那么返回 true，否则返回 false。
   */
  function isNative(value) {
    
  }
  /**
   * @descripttion: 判断该值是否为null或undefined
   * @param {*} value
   * @return {boolean}Returns true if value is nullish, else false.
   */
  function isNil(value) {
    return value === null || value === undefined
  }

  /**
   * @descripttion: 判断该值是否为null
   * @param {*} value
   * @return {boolean} Returns true if value is null, else false.
   */
  function isNull(value) {
    return value === null
  }

  /**
   * @descripttion: 判断是否为原始数字类型
   * @param {*} value
   * @return {boolean}Returns true if value is a number, else false.
   */
  function isNumber(value) {
    return checkType(value) === "[object Number]"
  }

  /**
   * @descripttion: 判断是否为对象类型包含 函数、数组、对象、正则、new出来的基本类型 不包括null
   * @param {*} value
   * @return {boolean}Returns true if value is an object, else false.
   */
  function isObject(value) {
    let type = checkType(value)
    if(value === null) {
      return false
    }
    if(typeof value === "object") {
      return true
    }
    if(type === "[object Function]") {
      return true
    }
    return false
  }

  /**
   * @descripttion: 判断value是否为object-like，即不为null并且typeof的值为'object'
   * @param {*} value
   * @return {*}
   */
  function isObjectLike(value) {
    if(value === null) {
      return false
    }
    if(typeof value === 'object') {
      return true
    }
    return false
  }

  /**
   * @descripttion: 判断value是否为plain 对象，plain对象仅为Object构造器构造或者prototype为null
   * @param {*} value
   * @return {boolean}Returns true if value is a plain object, else false.
   */
  function isPlainObject(value) {
    if(value === null || value === undefined) return false
    let proto = Object.getPrototypeOf(value)
    return proto === Object.prototype || proto === null
  }

  /**
   * @descripttion: 判断value是否为正则对象
   * @param {*} value
   * @return {boolean} Returns true if value is a regexp, else false.
   */
  function isRegExp(value) {
    return checkType(value) === "[object RegExp]"
  }

  /**
   * @descripttion: 判断value是否为安全的整型
   * @param {*} value
   * @return {boolean}Returns true if value is a safe integer, else false.
   */
  function isSafeInteger(value) {
    let type = checkType(value)
    if(value === Infinity || value === -Infinity) {
      return false
    }
    if(type === "[object Number]" && Math.floor(value) === value) {
      return true
    }
    return false
  }


  /**
   * @descripttion: 判断value是否为Set对象
   * @param {*} value
   * @return {boolean} Returns true if value is a set, else false.
   */
  function isSet(value) {
    return checkType(value) === "[object Set]"
  }

  /**
   * @descripttion: 判断value是否为原始string类型
   * @param {*} value
   * @return {boolean}Returns true if value is a string, else false.
   */
  function isString(value) {
    return checkType(value) === "[object String]"
  }

  /**
   * @descripttion: 判断value是否为symbol类型
   * @param {*} value
   * @return {boolean}Returns true if value is a symbol, else false.
   */
  function isSymbol(value) {
    return checkType(value) === "[object Symbol]"
  }

  /**
   * @descripttion: 判断value是否为typed array
   * @param {*} value
   * @return {boolean}  Returns true if value is a typed array, else false.
   */
  function isTypedArray(value) {
    return checkType(value) === "[object Uint8Array]"
  }


  /**
   * @descripttion: 判断value是否为undefined
   * @param {*} value
   * @return {boolean}  Returns true if value is undefined, else false.
   */
  function isUndefined(value) {
    return checkType(value) === "[object Undefined]"
  }

  /**
   * @descripttion: 判断value是否为weakMap类型
   * @param {*} value
   * @return {boolean}Returns true if value is a weak map, else false.
   */
  function isWeakMap(value) {
    return checkType(value) === "[object WeakMap]"
  }

    /**
   * @descripttion: 判断value是否为weakSet类型
   * @param {*} value
   * @return {boolean}Returns true if value is a weak set, else false.
   */
  function isWeakSet(value) {
    return checkType(value) === "[object WeakSet]"
  }

  /**
   * @descripttion: 判断value是否小于other
   * @param {*} value
   * @param {*} other
   * @return {*}如果value 小于 other 返回 true，否则返回 false。
   */
  function lt(value,other) {
    return value < other
  }

    /**
   * @descripttion: 判断value是否小于等于other
   * @param {*} value
   * @param {*} other
   * @return {*}如果value 小于等于 other 返回 true，否则返回 false。
   */
  function lte(value,other) {
    return value <= other
  }
  /**
   * @descripttion: 向上取整数字，precision表示取整的小数位
   * @param {number} number
   * @param {number} precision
   * @return {number} Returns the rounded up number.
   */
  function ceil(number,precision = 0) {
    let collection = number.toString().split(".")
    let digits = collection[1]
    let num = collection[0]
    if(precision == 0) {
      if(Math.floor(number) !== number) {
        return Math.floor(number) + 1
      }else {
        return number
      }
    }else if(precision > 0){
      for(let i = precision; i < digits.length; i++) {
        if(digits[i] > 0) {
          digits = "0".repeat(precision - 1) +(digits[precision - 1] == "0" ? "1" : (Number(digits[precision - 1]) + 1).toString())
          collection[1] = digits
          break
        }
      }
      return Number(collection.join("."))
    }else{
      precision = num.length + precision
      let res = ""
      for(let i = 0; i < num.length; i++) {
        if(i < precision - 1) {
          res += num[i]
        }else {
          if(digits !== undefined) {
            for(let i = 0; i <digits.legth;i++) {
              
            }
          }
          if(num[i] > 0) {
            res += (num[precision - 1] == "0" ? "1" : (Number(num[precision - 1]) + 1).toString())+"0".repeat(num.length - precision) 
            break
          }
        }
      }
      collection[0] = res
      return Number(collection.join("."))
    }
  }

  /**
   * @descripttion: 分配source对象的可枚举属性到目标对象上。应用规则是从左到右，下一个属性会覆盖上一个对象的属性
   * @param {Object} object
   * @param {...Object} sources
   * @return {*}Returns object.
   */
  function assignIn(object,...sources) {
    for(let item of sources) {
      let val = item
      // 以数组的形式返回属性名
      let props = Object.getOwnPropertyNames(val)
      for(let prop of props) {
        object[prop] = val[prop]
      }
      // 以对象的形式返回Prototype上面的属性 最后一个属性为constructor
      let prototypeProps = Object.getPrototypeOf(val)
      for(let i in prototypeProps) {
        object[i] = prototypeProps[i]
      }
    }
    return object
  }

  function at(object, paths) {
    return paths.map((item) => {
      return get(object,item)
    })
    
  }
  /**
   * @descripttion: 分配source对象的可枚举对象到目标对象所有为undefined的属性上，一旦设置了相同属性的值，后序的将被忽略掉
   * @param {Object} object
   * @param {...Object} sources
   * @return {Object}Returns object.
   */
  function defaults(object,...sources) {
    // 此时sources是数组 所以用for...of遍历sources
    for(let obj of sources) {
      // 返回的是对象 所以使用for...in
      for(let item in obj) {
        if(object[item] == undefined) {
          object[item] = obj[item]
        }
        if(typeof object[item] == "object") {
          defaults(object[item],obj[item])
        }
      }
    }
    return object
  }

  /**
   * @descripttion: 和defaults函数一样除了它递归分配默认的属性  改变原对象
   * @param {*} object
   * @param {*} sources
   * @return {*}返回对象
   */
  function defaultsDeep(object,...sources) {
    return defaults(object,...sources)
  }
  /**
   * @descripttion: 和find函数一样，除了断言函数匹配到第一个为true时直接返回
   * @param {*} object
   * @param {Function} predicate
   * @return {*}Returns the key of the matched element, else undefined.
   */
  function findKey(object,predicate) {
    let iteratee = handleIteratee(predicate)
    for(let obj in object) {
      if(iteratee(object[obj]) == true) {
        return obj
      }
    }
  }

  /**
   * @descripttion: 从右往左遍历寻找符合断言函数的值 返回key
   * @param {*} object
   * @param {*} predicate
   * @return {*}返回符合的key
   */
  function findLastKey(object,predicate) {
    let iteratee = handleIteratee(predicate)
    let keys = Object.keys(object)
    for(let i = keys.length - 1; i >= 0; i--) {
      if(iteratee(object[keys[i]])) {
        return keys[i]
      }
    }
  }
  /**
   * @descripttion: 迭代对象中的每个拥有的和继承的可枚举的属性名
   * @param {Object} object
   * @param {Function} iteratee
   * @return {Object}Returns object.
   */
  function forIn(object,iteratee) {
    iteratee = handleIteratee(iteratee)
    // 自身属性
    let propOwn = Object.getOwnPropertyNames(object)
    // prototype的属性
    let propInherit = Object.getOwnPropertyNames(Object.getPrototypeOf(object))
    let props = propOwn.concat(propInherit.slice(1))
    for(let i = 0; i < props.length; i++) {
      iteratee(object[props[i]],props[i],object)
    }
    return object
  }

  /**
   * @descripttion: 和forIn函数一样 除了迭代顺序是从右往左以外
   * @param {Object} object
   * @param {Function} iteratee
   * @return {Object}Returns object.
   */
  function forInRight(object,iteratee) {
    iteratee = handleIteratee(iteratee)
    // 自身属性
    let propOwn = Object.getOwnPropertyNames(object)
    // prototype的属性
    let propInherit = Object.getOwnPropertyNames(Object.getPrototypeOf(object))
    let props = propOwn.concat(propInherit.slice(1))
    for(let i = props.length - 1; i >= 0 ; i--) {
      iteratee(object[props[i]],props[i],object)
    }
    return object
  }

    /**
   * @descripttion: 只迭代自身的属性，不包含prototype继承的属性
   * @param {Object} object
   * @param {Function} iteratee
   * @return {Object}Returns object.
   */
  function forOwn(object,iteratee) {
    iteratee = handleIteratee(iteratee)
    let props = Object.getOwnPropertyNames(object)
    for(let prop of props) {
      iteratee(object[prop],prop,object)
    }
    return object
  }

      /**
   * @descripttion: 跟forOwn函数一样，除了迭代顺序是从右往走以外
   * @param {Object} object
   * @param {Function} iteratee
   * @return {Object}Returns object.
   */
  function forOwnRight(object,iteratee) {
    iteratee = handleIteratee(iteratee)
    let props = Object.getOwnPropertyNames(object)
    for(let i = props.length - 1;i >= 0; i--) {
      let prop = props[i]
      iteratee(object[prop],prop,object)
    }
    return object
  }

  /**
   * @descripttion: 从object中枚举属性并将函数属性名字存储到一个数组中
   * @param {Object} object
   * @return {Array} Returns the function names.
   */
  function functions(object) {
    return  Object.getOwnPropertyNames(object)
  }

  /**
   * @descripttion: 和functions一样 除了还需要遍历到prototype继承的方法以外
   * @param {Object} object
   * @return {Array}Returns the function names.
   */
  function functionsIn(object) {
    let arr = []
    let propOwn = Object.getOwnPropertyNames(object)
    let propInherit = Object.getOwnPropertyNames(Object.getPrototypeOf(object))
    return propOwn.concat(propInherit.slice(1))
  }

  /**
   * @descripttion: 获取object路径下的值，如果值  为undefined，那么用defaultValue来替换返回值
   * @param {*} object
   * @param {Array|string} path
   * @param {*} defaultValue ：he value returned for undefined resolved values.
   * @return {*}Returns the resolved value.
   */
  function get(object,path,defaultValue) {
    let obj = object
    let pos = path.lastIndexOf(".")
    let method
    if(pos !== -1) {
      method = path.slice(pos + 1)
      path = path.slice(0,pos)
    }
    for(let i = 0; i < path.length;i++) {
      if(path[i] !== "[" && path[i] !== "]" && path[i] !== ".") {
        let item = obj[path[i]]
        if(item !== undefined) {
          obj = item
        }else {
          return defaultValue
        }
      }
    }
    if(pos !== -1 && obj[method] !== undefined ) {
      return obj[method]
    }else if(pos == -1){
      return obj
    }else {
      return defaultValue
    }
  }

  /**
   * @descripttion: 检测路径是对象的直接属性，不包含继承的属性
   * @param {Object} object
   * @param {Array|string} path
   * @return {boolean}  Returns true if path exists, else false.
   */
  function has(object,path) {
    let obj = object
    for(let i = 0; i < path.length; i++) {
      if(path[i] !== "[" && path[i] !== "]" && path[i] !== ".") {
        if(obj.hasOwnProperty(path[i])){
          let item = obj[path[i]]
          if(item === undefined && !(path[i] in obj)) {
            return false
          }
          if(typeof item == "object"){
            obj = item
          }
        }else {
          return false
        }
      }
    }
    return true
  }

  /**
   * @descripttion: 检测路径是对象的直接属性和包含继承的属性
   * @param {Object} object
   * @param {Array|string} path
   * @return {boolean}  Returns true if path exists, else false.
   */
  function hasIn(object,path) {
    let obj = object
    for(let i = 0; i < path.length; i++) {
      if(path[i] !== "[" && path[i] !== "]" && path[i] !== ".") {
        let item = obj[path[i]]
        if(item === undefined && !(path[i] in obj)) {
          return false
        }
        if(typeof item == "object"){
          obj = item
        }
      }
    }
    return true
  }

  /**
   * @descripttion: 创建一个由object的键值对倒转的对象，如果有重复的值，后面的值会覆盖前面的值
   * @param {*} object
   * @return {Object}  Returns the new inverted object.
   */
  function invert(object) {
    let obj = {}
    for(let item in object) {
      obj[object[item]] = item
    }
    return obj
  }

  /**
   * @descripttion: 和invert函数一样除了倒转的值需要以数组存储，并且有相同的key时放进同一个数组中。倒转后的key值需要传进迭代函数得到返回的值
   * @param {Object} object
   * @param {Function} iteratee
   * @return {Object}Returns the new inverted object.
   */
  function invertBy(object,iteratee) {
    let obj = {}
    for(let item in object) {
      let val = object[item]
      obj[val] == undefined ? obj[val] = [item] : obj[val].push(item)
    }
    if(iteratee === undefined) {
      return obj
    }
    let iterObj = {}
    for(let item in obj) {
      let val = obj[item]
      item = iteratee(item)
      iterObj[item] = val
    }
    return iterObj 
  }

  /**
   * @descripttion: 调用object下的path的方法
   * @param {Object} object
   * @param {Array|string} path
   * @param {...*} args
   * @return {*}Returns the result of the invoked method.
   */
  function invoke(object,path,...args) {
    let obj = object 
    let pos = path.lastIndexOf(".")
    let method = path.slice(pos + 1)
    path = path.slice(0,pos)
    for(let i = 0; i < path.length; i++) {
      if(path[i] !== "[" && path[i] !== "]" && path[i] !== ".") {
        if(obj.hasOwnProperty(path[i])){
          let item = obj[path[i]]
          if(typeof item == "object"){
            obj = item
          }
        }
      }
    }
    return obj[method](...args)
  }

  /**
   * @descripttion: 创建一个数组，数组内容为对象自身可枚举的属性名
   * @param {Object} object
   * @return {Array} Returns the array of property names.
   */
  function keys(object) {
    let res = []
    let type = checkType(object)
    if(type === "[object Object]") {
      for(let item in object) {
        if(object.hasOwnProperty(item)) {
          res.push(item)
        }
      }
    }else if(object["length"] !== undefined) {
      for(let i = 0; i < object.length; i++) {
        res.push(i.toString())
      }
    }
    return res
  }

    /**
   * @descripttion: 创建一个数组，数组内容为对象自身可枚举的属性名和继承的属性
   * @param {Object} object
   * @return {Array} Returns the array of property names.
   */
  function keysIn(object) {
    let res = []
    let type = checkType(object)
    if(type === "[object Object]") {
      for(let item in object) {
        res.push(item)
      }
    }else if(object["length"] !== undefined) {
      for(let i = 0; i < object.length; i++) {
        res.push(i.toString())
      }
    }
    return res
  }

  /**
   * @descripttion: 创建一个与object相同值的对象，key值通过迭代函数迭代object自身的可枚举属性
   * @param {Object} object
   * @param {Function} iteratee
   * @return {Object}  Returns the new mapped object.
   */
  function mapKeys(object,iteratee) {
    let obj = {}
    iteratee = handleIteratee(iteratee)
    for(let item in object) {
      let val = object[item]
      let newKey = iteratee(val,item,object)
      obj[newKey] = val
    }
    return obj
  }

    /**
   * @descripttion: 创建一个与object相同key的对象，val值通过迭代函数迭代object自身的可枚举属性
   * @param {Object} object
   * @param {Function} iteratee
   * @return {Object}  Returns the new mapped object.
   */
  function mapValues(object,iteratee) {
    let obj = {}
    iteratee = handleIteratee(iteratee)
    for(let item in object) {
      let val = object[item]
      let newVal = iteratee(val)
      obj[item] = newVal
    }
    return obj
  }

  /**
   * @descripttion: 递归合并sources来源对象自身和继承的可枚举属性到object目标对象
   * @param {Object} object
   * @param {...Object} sources
   * @return {Object} Returns object.
   */
  function merge(object,sources) {
    let objProp = Object.getOwnPropertyNames(object)
    let sourceProp = Object.getOwnPropertyNames(object)
    if(objProp[0] == sourceProp[0]) {
      let source = sources[sourceProp[0]]
      let obj = object[objProp[0]]
      for(let i = 0; i < source.length; i++) {
        let keys = Object.getOwnPropertyNames(source[i])
        for(let j = 0; j < keys.length; j++) {
          obj[i][keys[j]] = source[i][keys[j]]
        }
      }
      return object
    }else {
      object[sourceProp[0]] = sources[sourceProp[0]]
      return object
    }
  }

  /**
   * @descripttion: 该方法类似_.merge，除了它接受一个 customizer，调用以产生目标对象和来源对象属性的合并值。
   * @param {*} object
   * @param {*} sources
   * @param {*} customizer
   * @return {*}返回object
   */
  function mergeWith(object, ...sources) {
    let customizer = sources.pop()
    let keys = Object.keys(object)
    let other = sources[0]
    keys.forEach((item) => {
      object[item] = customizer(object[item],other[item])
    })
    return object
  }
  /**
   * @descripttion: 这个对象由忽略属性之外的object自身和继承的可枚举属性组成
   * @param {*} object
   * @param {array} paths
   * @return {*}
   */
  function omit(object, ...paths) {
    paths = flattenDepth(paths,1)
    for(let deleteKey of paths) {
      console.log(deleteKey)
      if(deleteKey in object) {
        delete object[deleteKey]
      }
    }
    return object
  }

  /**
   * @descripttion: 这个方法创建一个对象，这个对象忽略predicate判断不是真值的属性，右object自身和继承的可枚举属性组成
   * @param {Object} object
   * @param {Function} predicate
   * @return {Object} return new Object
   */
  function omitBy(object,predicate) {
    let iteratee = handleIteratee(predicate) 
    for(let item in object) {
      if(iteratee(object[item],item) == true) {
        delete object[item]
      }
    }
    return object
  }

  /**
   * @descripttion: 创建一个从object中选中属性的对象
   * @param {Object} object
   * @param {*} props
   * @return {*} return new object
   */
  function pick(object,...props) {
    let obj = {}
    props = flattenDepth(props,1)
    for(let item of props) {
      if(item in object) {
        obj[item] = object[item]
      }
    }
    return obj
  }


  /**
   * @descripttion: 创建一个对象，这个对象由object中经过predicate断言函数判断为真值的属性组成
   * @param {*} object
   * @param {*} predicate
   * @return {*}
   */
  function pickBy(object,predicate) {
    let obj = {}
    let iteratee = handleIteratee(predicate)
    for(let item in object) {
      if(iteratee(object[item],item)) {
        obj[item] = object[item]
      }
    }
    return obj
  }

  /**
   * @descripttion: 和get函数一样 除了如果解析到的值是函数，那么就绑定this到当前的函数并返回执行后的结果
   * @param {*} object
   * @param {*} path
   * @param {*} defaultValue
   * @return {*} Returns the resolved value.
   */
  function result(object,path,defaultValue) {
    let res = get(object,path,defaultValue)
    let type = checkType(res)
    if(type === "[object Function]") {
      return res.bind(null)()
    }
    return res
  }

  /**
   * @descripttion: 设置object的路径的属性值。如果一部分的路径不存在 则创建它
   * @param {Object} object
   * @param {Array|string} path
   * @param {*} value
   * @return {*}Returns object.
   */
  function set(object,path,value) {
    let obj = object
    let pos = path.lastIndexOf(".")
    let method
    let flag = true
    if(pos !== -1) {
      method = path.slice(pos + 1)
      path = path.slice(0,pos)
    }
    if(flag) {
      for(let i = 0; i < path.length;i++) {
        if(path[i] !== "[" && path[i] !== "]" && path[i] !== ".") {
          let item = obj[path[i]]
          if(item !== undefined) {
            obj = item
          }else {
            flag = false
            break
          }
        }
      }
    }else {
    }

  }

  /**
   * @descripttion: 创建一个object对象自身可枚举属性的键值对数组
   * @param {*} object
   * @return {*}
   */
  function toPairs(object) {
    let res = []
    for(let item in object) {
      if(object.hasOwnProperty(item)) {
        res.push([item,object[item]])
      }
    }
    return res
  }

    /**
   * @descripttion: 创建一个object对象自身和继承可枚举属性的键值对数组
   * @param {*} object
   * @return {*}
   */
  function toPairsIn(object) {
    let res = []
    for(let item in object) {
      res.push([item,object[item]])
    }
    return res
  }

  /**
   * @descripttion: _.reduce的替代方法;此方法将转换object对象为一个新的accumulator对象，结果来自iteratee处理自身可枚举的属性。 每次调用可能会改变 accumulator 对象
   * @param {*} object
   * @param {*} iteratee
   * @return {*}返回叠加后的值。
   */
  function transform(object,iteratee,accumulator) {
    iteratee = handleIteratee(iteratee)
    let keys = Object.keys(object)
    let initVal = accumulator == undefined ? {} : accumulator
      for(let i = 0; i < keys.length; i++) {
        if(iteratee(initVal,object[keys[i]],keys[i],object) === false) {
          break
        }
      }
    return initVal
  }

  /**
   * @descripttion: 移除object对象 path 路径上的属性。会改变源对象
   * @param {*} object
   * @param {*} path
   * @return {*}如果移除成功，那么返回 true ，否则返回 false。
   */
  function unset(object,path) {
    let obj = object
    let pos = path.lastIndexOf(".")
    let method
    if(pos !== -1) {
      method = path.slice(pos + 1)
      path = path.slice(0,pos)
    }else {
      method = path.slice(path.length - 1 )
      path = path.slice(0,-1)
    }
    for(let i = 0; i < path.length;i++) {
      if(path[i] !== "[" && path[i] !== "]" && path[i] !== ".") {
        let item = obj[path[i]]
        if(item !== undefined) {
            obj = item
        }else {
          return false
        }
      }
    }
    if(obj[method] !== undefined ) {
      delete obj[method]
      return true
    }else {
      return false
    }
  }
  /**
   * @descripttion: 创建object中自身可枚举的属性的属性值
   * @param {*} object
   * @return {*}
   */
  function values(object) {
    let type = checkType(object)
    let res = []
    if(type === "[object Object]") {
      for(let item in object) {
        if(object.hasOwnProperty(item)) {
          res.push(object[item])
        }
      }
    }else {
      return object.split("")
    }
    return res
  }


  /**
   * @descripttion: 创建object中自身和继承可枚举的属性的属性值
   * @param {*} object
   * @return {*}
   */
  function valuesIn(object) {
    let type = checkType(object)
    let res = []
    if(type === "[object Object]") {
      for(let item in object) {
        res.push(object[item])
      }
    }else {
      return object.split("")
    }
    return res
  }

  /**
   * @descripttion: 驼峰式写法
   * @param {*} string
   * @return {*}返回驼峰式字符串
   */
  function camelCase(string="") {
    let str = ""
    let isHead = true
    let firstLetter = true
    for(let i = 0;i < string.length; i++) {
      let asci = string[i].charCodeAt()
      if( (asci >= 65 && asci <= 90) || (asci <= 122 && asci >= 97)) {
        if(firstLetter && !isHead) {
          str += string[i].toUpperCase()
          firstLetter = false
        }else {
          str += string[i].toLowerCase()
        }
      }else if(str.length !== 0 && isHead) {
        isHead = false
        firstLetter = true
      }
    }
    return str
  }

  /**
   * @descripttion: 转换字符串string首字母为大写，剩下为小写。
   * @param {*} string
   * @return {*}返回大写开头的字符串。
   */
  function capitalize(string="" ) {
    return string.slice(0,1).toUpperCase() + string.slice(1).toLowerCase()
  }


  /**
   * @descripttion: 检查字符串string是否以给定的target字符串结尾。
   * @param {*} string
   * @param {*} target
   * @param {*} position
   * @return {*}如果字符串string以target字符串结尾，那么返回 true，否则返回 false。
   */
  function endsWith(string="",target,position = string.length) {
    return target === string.slice(position.length - target.length,position)
  }
  /**
   * @descripttion: 转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。
   * @param {*} string
   * @return {string}返回转义后的字符串。
   */
  function escape(string) {
    let str = ""
    for(let i = 0; i < string.length; i++) {
      if(string[i] == "&") {
        str += "&amp;"
      }else if(string[i] == "<") {
        str += "&lt;"
      }else if(string[i] == ">") {
        str += "&gt;"
      }else if(string[i] == "'") {
        str += "&#39;"
      }else if(string[i] == '"') {
        str += "&quot;"
      }else if(string[i] == "`") {
        str += "&#96;"
      }else {
        str += string[i]
      }
    }
    return str
  }

  /**
   * @descripttion: 转义 RegExp 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", ", ", 和 "|" in .
   * @param {*} string
   * @return {*}返回转义后的字符串。
   */
  function escapeRegExp(string = "") {
    let reg = /[\^\$\.\*\+\,\?\,\(\)\[\]\{\}\|]/g
    return string.replace(reg,match => `\\${match}`)
  }


  /**
   * @descripttion: 转换字符串string为kebab case.
   * @param {*} string
   * @return {*}返回转换后的字符串。
   */
  function kebabCase(string="") {
    let str = ""
    let isHead = true
    for(let i = 0; i < string.length; i++) {
      let asci = string[i].charCodeAt()
      if((asci >= 65 && asci <= 90) || (asci <= 122 && asci >= 97)) {
        if(i!== 0 && i !== string.length - 1 && (string[i + 1].charCodeAt() >= 65 && string[i + 1].charCodeAt() <= 90)) {
          if(((string[i + 1].charCodeAt() >= 65 && string[i + 1].charCodeAt() <= 90) && (asci >= 65 && asci <= 90))
            || ((string[i + 1].charCodeAt() >= 97 && string[i + 1].charCodeAt() <= 122) && (asci <= 122 && asci >= 97))) {
            str += string[i].toLowerCase()
          }else {
            str +=  string[i].toLowerCase() + "-" + string[i + 1].toLowerCase()
            i++
          }
        }else {
          str += string[i].toLowerCase()
        }
      }else if(str.length !== 0 && isHead) {
        str += "-"
        isHead = false
      }
    }
    return str
  }


  /**
   * @descripttion: 转换字符串string以空格分开单词，并转换为小写。
   * @param {*} string
   * @return {*}返回转换后的字符串。
   */
  function lowerCase(string="") {
    let str = ""
    let isHead = true
    for(let i = 0; i < string.length; i++) {
      let asci = string[i].charCodeAt()
      if((asci >= 65 && asci <= 90) || (asci <= 122 && asci >= 97)) {
        if(i!== 0 && i !== string.length - 1 && (string[i + 1].charCodeAt() >= 65 && string[i + 1].charCodeAt() <= 90)) {
          if(((string[i + 1].charCodeAt() >= 65 && string[i + 1].charCodeAt() <= 90) && (asci >= 65 && asci <= 90))
            || ((string[i + 1].charCodeAt() >= 97 && string[i + 1].charCodeAt() <= 122) && (asci <= 122 && asci >= 97))) {
            str += string[i].toLowerCase()
          }else {
            str +=  string[i].toLowerCase() + " " + string[i + 1].toLowerCase()
            i++
          }
        }else {
          str += string[i].toLowerCase()
        }
      }else if(str.length !== 0 && isHead) {
        str += " "
        isHead = false
      }
    }
    return str
  }

  /**
   * @descripttion: 转换字符串string的首字母为小写。
   * @param {*} string
   * @return {*}返回转换后的字符串。
   */
  function lowerFirst(string="") {
    return string.slice(0,1).toLowerCase() + string.slice(1)
  }
  /**
   * @descripttion: 如果string字符串长度小于length则从左侧和右侧填充字符，如果没法平均分配，则阶段超出的长度
   * @param {*} string
   * @param {*} length
   * @param {*} chars
   * @return {*}
   */
  function pad(string="",length = 0, chars=" ") {
    let str = ""
    let restLen = length - string.length
    if(restLen == 0) return string
    let leftLen = Math.floor(restLen / 2)
    let rightLen = restLen - leftLen
    let leftTimes = Math.ceil((leftLen / chars.length) + 1)
    let rightTimes = Math.ceil((rightLen /chars.length) + 1)
    let rightStr = chars.repeat(rightTimes)
    if(rightStr.length > rightLen) {
      rightStr = rightStr.slice(0,rightLen)
    } 
    str += chars.repeat(leftTimes)
    if(str.length > leftLen) {
      str = str.slice(0,leftLen)
    }
    str = str + string +  rightStr
    return str
  }

  /**
   * @descripttion: 如果string字符串长度小于length 则在右侧填充字符。如果超出length长度则截断超出的部分
   * @param {*} string
   * @param {*} length
   * @param {*} chars
   * @return {*}
   */
  function padEnd(string="",length = 0, chars=" ") {
    let str = ""
    let restLen = length - string.length
    if(restLen == 0) return string
    let rightTimes = Math.ceil((restLen / chars.length) + 1)
    str = string + chars.repeat(rightTimes)
    if(str.length > string.length) {
      str = str.slice(0,length)
    }
    return str
  }

/**
  * @descripttion: 如果string字符串长度小于length 则在左侧填充字符。如果超出length长度则截断超出的部分
  * @param {*} string
  * @param {*} length
  * @param {*} chars
  * @return {*}
  */
  function padStart(string="",length = 0, chars=" ") {
    let str = ""
    let restLen = length - string.length
    if(restLen == 0) return string
    let leftTimes = Math.ceil((restLen / chars.length) + 1)
    str = chars.repeat(leftTimes)
    if(str.length > restLen) {
      str = str.slice(0,restLen)
    }
    str += string
    return str
  }


  /**
   * @descripttion: 重复n次字符串
   * @param {*} string
   * @param {*} n
   * @return {*}
   */
  function repeat(string="",n = 1) {
    let str = ""
    for(let i = 0; i < n; i++) {
      str += string
    }
    return str
  }

  /**
   * @descripttion: 换string字符串中的 HTML 实体 &amp;, &lt;, &gt;, &quot;, &#39;, 和 &#96; 为对应的字符。
   * @param {*} string
   * @return {*}
   */
  function unescape(string="") {
    let str = string
    if(string.indexOf("&amp;")) {
      str = str.replace("&amp;","&")
    }
    if(string.indexOf("&lt;")) {
      str = str.replace("&lt;","<")
    }
    if(string.indexOf("&gt;")) {
      str = str.replace("&gt;",">")
    }
    if(string.indexOf("&#39;")) {
      str = str.replace("&#39;","'")
    }
    if(string.indexOf("&quot;")) {
      str = str.replace("&quot;",'"')
    }
    if(string.indexOf("&#96;")) {
      str = str.replace("&#96;","`")
    }
    return str
  }

  function bindAll(object, methodNames) {

  }







  /**
   * @descripttion: 创建一个包含从 start 到 end，但不包含 end 本身范围数字的数组。 
   *              如果 start 是负数，而 end 或 step 没有指定，那么 step 从 -1 为开始。
   *               如果 end 没有指定，start 设置为 0。 如果 end 小于 start ，会创建一个空数组，除非指定了 step。
   * @param {*} start
   * @param {*} end
   * @param {*} step
   * @return {*}
   */
  function range(start=0, end,step=1) {
    let res = []
    if(end == undefined && start > 0) {
      end = start 
      start = 0
    }
    if(end == undefined && start < 0) {
      end = start
      start = 0
      if(step > 0){
        step = -step
      }
    }
    if(end < 0) {
      for(let i = start; i > end; i += step) {
        res.push(i)
      }
      return res
    }
    if(step == 0) {
      let j = end - start 
      while(j > 0) {
        res.push(start)
        j--
      }
      return res
    }
    for(let i = start; i < end; i += step) {
      res.push(i)
    }
    return res
  }

  function times(n, iteratee) {
    iteratee = handleIteratee(iteratee)
    let res = []
    let i = 0
    while(i < n) {
      res.push(iteratee(i))
      i++
    }
    return res
  } 
  var idCounter = 2
  function uniqueId(prefix='') {
    var id = ++idCounter
    return (prefix == null ? "" : prefix) + id
  }

  /**
   * @descripttion: 方法类似clone函数，除了它会递归拷贝value
   * @param {*} value
   * @return {*}
   */
  function cloneDeep(value) {
    return _cloneDeep(value)

    function _cloneDeep(obj) {
      if(obj == null) {
        return null
      }
      if(checkType(obj) === "[object RegExp]") {
        return obj
      }
      if(typeof obj === "object") {
        let newObj = Array.isArray(obj) ? [] : {}
        let keys = Object.keys(obj)
        keys.forEach((key) => {
          newObj[key] = _cloneDeep(obj[key])
        })
        return newObj
      }else{
        return obj
      }
    }
    // else {
    //   return value
    // }
  }

  /**
   * @descripttion: 返回首个提供的参数
   * @param {*} value
   * @return {*}
   */
  function identity(...value) {
    return value[0]
  }

    /**
   * @descripttion: 创建一个返回给定对象的path的值的函数
   * @param {*} value
   * @return {*}
   */
  function property(path) {
    if(!Array.isArray(path)) {
      path = path.split(".")
    } 
    return function(obj) {
      for(let i = 0; i < path.length; i++) {
        obj = obj[path[i]]
      }
      return obj
    }
  }

  /**
   * @descripttion: 创建一个针对断言函数 func 结果取反的函数。 func 断言函数被调用的时候，this 绑定到创建的函数，并传入对应参数。
   * @param {Function} predicate
   * @return {Function}返回一个新的取反函数。
   */
  function negate(predicate) {
    return function(val) {
      return !predicate(val)
    }
  } 

  /**
   * @descripttion: 创建一个只能调用 func 一次的函数。 重复调用返回第一次调用的结果。 func 调用时， this 绑定到创建的函数，并传入对应参数
   * @param {Function} func
   * @return {Function} 返回新的受限函数。
   */
  function once(func) {
    return function(...args) {
      return func.bind(null,...args)()
    }
  }

  /**
   * @descripttion: 创建一个函数，调用func时，this绑定到创建的新函数，把参数作为数组传入
   * @param {Function} func
   * @param {*} start
   * @return {Function}返回新的函数。
   */
  function spread(func,start=0) {
    return function(args) {
      return func.apply(null,args)
    }
  }


  /**
   * @descripttion: 柯里化函数
   * @param {*} func
   * @param {*} args
   * @return {*}
   */
  function curry(func,args) {
    let len = func.length
    args = args || []
    return function() {
      let subArgs = args.slice()
      for(let i = 0; i < arguments.length; i++) {
        subArgs.push(arguments[i])
      }
      if(subArgs.length >= len) {
        return func.apply(this,subArgs)
      }else {
        return curry.call(this,func,subArgs)
      }
    }
  }


  /**
   * @descripttion: 创建一个会缓存func结果的函数，如果提供了resolver，就用resolver的返回值作为key缓存函数的结果
   * @param {*} func
   * @param {*} resolver
   * @return {*}
   */
  function memoize(func,resolver) {
    let map = new Map()
    return function(args) {
      let val = map.get(args)
      if(val === undefined) {
        let res = func.call(this,args)
        map.set(args,res)
        return res
      }else {
        return val
      }
    }
  }

  /**
   * @descripttion: 创建一个返回value的函数
   * @param {*} value
   * @return {Function} 返回新的常量函数
   */
  function constant(value) {
    return function() {
      return value
    }
  }

  /**
   * @descripttion: 这个方法创建的函数返回给定path在object上的值
   * @param {*} object
   * @return {Function} 返回新的函数
   */
  function propertyOf(object) {
    return function(str) {
      return get(object,str)
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
    reduce,
    reduceRight,
    reject,
    sample,
    shuffle,
    size,
    some,
    sortBy,
    defer,
    delay,
    isArguments,
    isArray,
    isArrayBuffer,
    isArrayLike,
    isArrayLikeObject,
    isBoolean,
    isDate,
    isElement,
    isEmpty,
    isEqualWith,
    isError,
    isFinite,
    isFunction,
    isInteger,
    isLength,
    isMap,
    isMatch,
    matchesOnce,
    isMatchWith,
    isNaN,
    isNil,
    isNull,
    isNumber,
    isObject,
    isObjectLike,
    isPlainObject,
    isRegExp,
    isSafeInteger,
    isSet,
    isString,
    isSymbol,
    isTypedArray,
    isUndefined,
    isWeakMap,
    isWeakSet,
    ceil,
    assignIn,
    defaults,
    findKey,
    forIn,
    forInRight,
    forOwn,
    forOwnRight,
    functions,
    functionsIn,
    get,
    has,
    hasIn,
    invert,
    invertBy,
    invoke,
    keys,
    keysIn,
    mapKeys,
    mapValues,
    merge,
    omit,
    omitBy,
    pick,
    pickBy,
    result,
    set,
    toPairs,
    toPairsIn,
    values,
    escape,
    pad,
    padEnd,
    padStart,
    repeat,
    unescape,
    range,
    times,
    uniqueId,
    cloneDeep,
    identity,
    property,
    negate,
    once,
    spread,
    curry,
    memoize,
    constant,
    propertyOf,
    bindAll,
    sortBy,
    sortedIndexBy,
    sortedIndexOf,
    sortedLastIndex,
    sortedLastIndexBy,
    sortedLastIndexOf,
    sortedUniq,
    sortedUniqBy,
    tail,
    take,
    takeRight,
    takeRightWhile,
    takeWhile,
    unionWith,
    uniqWith,
    xorBy,
    xorWith,
    unzipWith,
    zipObject,
    zipObjectDeep,
    zipWith,
    findLast,
    forEachRight,
    includes,
    invokeMap,
    sampleSize,
    castArray,
    conformsTo,
    eq,
    gt,
    gte,
    isNative,
    lt,
    lte,
    toFinite,
    toInteger,
    toLength,
    toNumber,
    assign,
    toSafeInteger,
    add,
    divide,
    floor,
    mean,
    meanBy,
    multiply,
    round,
    subtract,
    clamp,
    inRange,
    at,
    defaultsDeep,
    findLastKey,
    mergeWith,
    transform,
    unset,
    valuesIn,
    camelCase,
    capitalize,
    endsWith,
    escapeRegExp,
    kebabCase,
    lowerCase,
    lowerFirst,
  }

}()
