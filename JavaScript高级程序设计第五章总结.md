#  第五章 引用类型
##  5.2 Array
* 因为数组最后一项的索引始终是`length-1`,因此下一个新项的位置就是`length`
* 利用`length属性`可以方便地在数组末尾添加新项：
```js
    var a = [1,2,3,4];
    a[a.length] = 5;
    a[a.length] = 6; // [1,2,3,4,5,6]
```
            

## 5.1 检测数组
* 无法用 `typeof` 检测数组    
例子：  `typeof array // "object"`
* 第一种方法： 
`array instanceof Array // 返回true 或 false `      
    * instanceof ： 通过判断这个对象的原型链上是否会找到对应的原型(所以可以用来判断自定义实例化对象)
    * instanceof只能用来判断对象类型(可以用来判断 正则 和 日期 )，不能判断原始类型，且所有对象类型instanceof Object都是true
    * 可能造成问题：如果网页包含多个框架(例如iframe会创建包含另外一个文档的内联框架)，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的Array构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。
    * 也就是说 instanceof仅仅检查Array.prototype是否在 检测的对象 的`[[Prototype]]`链上。当跨框架(例如iframe),它将失败，因为用于实例的Array构造函数可能与用于测试的Array构造函数不同。
* 第二种方法： `Object.prototype.toString.call(arr)  // [object Array]` 适合 ES3浏览器并跨框架使用
    * 除了Object类型的对象外（也就是[object Object]）,其他类型直接使用toString方法时，会直接返回都是内容的字符串。例如： 
    ```js
        var a = [1,2,3];
        var b = {};
        a.toString(); // "1,2,3"
        b.toString(); // "[object Object]"
        Object.prototype.toString.call(a); // [object Array]
        Object.prototype.toString.call(b); // [object Object]
    ```
    * 所以我们需要使用 call 或者apply 方法来改变toString方法的执行上下文
    * 这种方法对于所有基本数据类型都能直接进行判断，即便是null和undefined  
    * 原始类型：
    ```js
        Object.prototype.toString.call('s'); //          [object String]    字符串检测
        Object.prototype.toString.call(1); //            [object Number]    数字检测
        Object.prototype.toString.call(Symbol(1)); //    [object Symbol]    Symbol类型检测
        Object.prototype.toString.call(null); //         [object null]      null类型检测
        Object.prototype.toString.call(undefined); //    [object undefined] undefined类型检测    
    ```        
    * 引用类型：
    ```js
        Object.prototype.toString.call(function(){}); // [object function]  function类型检测
        Object.prototype.toString.call([1,2,3]); //      [object Array] 数组类型检测
        Object.prototype.toString.call({}); //           [object Object] 对象类型检测
        var date = new Date();
        Object.prototype.toString.call(date); //         [object Date] 日期对象类型检测
        Object.prototype.toString.call(/[0-9]/ig); //    [object RegExp] 正则对象类型加测
    ```

    * 缺点：不能精确判断自定义对象，对于自定义对象只会返回`[object Object] `
    ```js
        function f(name) {
            this.name = name;
        }
        var f1 = new f('martin');
        console.log(Object.prototype.toString.call(f1)); // [object Object]
    ```
* 第三种方法：` Array.isArray(arr); // true  ES5中新增的方法`
    * 可以用来检测自定义的实例化对象 以及 检测iframe
    * 当不存在`Array.isArray()`方法时，可以用`Object.prototype.toString.call()`方法
    ```js
        if(!Array.isArray()) {
            Array.isArray = function(arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };
        }
    ```

## 5.2.5 重排序方法
* `sort()`方法 // 在原数组基础上进行修改，返回值是经过排序后的数组  

    sort方法在默认情况下，是以升序排列数组项。为了实现排序，sort()方法会调用每个数组项的toString()的方法，然后比较得到的字符串来确定排序，也就是说 即使数组每一项都是数值，sort()方法比较的也是字符串
    例如： `[0,1,5,10,15].sort()  =>// 0,1,10,15,5`  因为调用的是toString方法，在ASCII码中'10' < '5'。
    因此sort方法可以接收一个比较函数作为参数，在比较参数中， 
    * 如果第一个参数应该位于第二个之前，则返回一个负数。
    * 如果两个参数相等，则返回0.
    * 如果第一个参数应该位于第二个之后，则返回一个正数。
    ```js
        //  升序算法 [5,4,2,6,7]
        function compare(value1,value2) {
            if(value1 > value2) {
                return 1;
            }else if(value 1 < value2) {
                retrun -1;
            }else {
                return 0;
            }
        } 
    ```
        这个算法可以演变为: //对于降序同理
    ```js
        function compare(value1,value2) {
            retrun value1 -value2 ;
            // return a - b;
        }
    ```

## 5.2.5 操作方法
* `concat()`方法：返回新数组   
这个方法会先创建当前数组的一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组.
* `concat()`方法没有传递参数时候，相当于复制当前数组并返回一个新的数组.
* 如果传递给`concat()`方法的是**一或多个数组**，则该方法会将这项数组的**每一项**都添加到结果数组中，如果传递  
的值不是数组，这些值则会被简单地添加到结果数组的末尾.
```js
var a = [1,2,3];
var b = a.concat('a',['b','c']);
console.log(a); // 1,2,3
console.log(b); // 1,2,3,'a','b','c'
```
```js
var a = [1,2,3];
var b = a.concat('a',{"d":"e","f":"g"});
console.log(a); // 1,2,3
console.log(b); // 1,2,3,'a',{"d":"e","f":"g"}
```

### slice()、substring()、substr()的区别
slice()方法值得注意的点:    
`str/arr.slice(beginIndex[, endIndex])`  

```
* 返回一个索引和另一个索引之间的字符串
* 若`beginIndex`为负数， 则将该值加上字符串长度后再进行计算（如果加上字符串的长度后还是负数， 则从0开始截取）
* 有任意参数大于length长度时，则被视为是length长度
* 如果结束位置小于起始位置，则返回空数组
* 当`beginIndex`==='endIndex'时，返回空数组

```
```js
    var a = [1,2,3,4,5];
    var b = a.slice(-8); 
    var c = a.slice(0,100); 
    var d = a.slice(3,1);
    var e = a.slice(100);
    var f = a.slice(1,1)
    console.log(b);  // [1,2,3,4,5]
    console.log(c);  // [1,2,3,4,5]
    console.log(d);  // []
    console.log(e);  // []
    console.log(f);  // []
```

`substring()`方法值得注意的点：
`str.substring(indexStart,[indexEnd])`
```
* 返回一个索引和另一个索引之间的字符串
* 如果任一参数小于0或是NaN，它被视为0（即不支持负数参数）// 与`slice()`的主要区别
* 如果indexStart大于indexEnd,那么实际效果两个参数会交换，即：str.substring(1,0) == str.substring(0,1)
```
```js
var a = "abcdefghijk";
console.log(a.substring(3,1)); // bc
```


`substr()`方法值得注意的点：
`str.substr(start,[length])`
```
* `substr()`会从`start`获取长度为`length`字符（如果截取到字符串的末尾， 则会停止截取）// 与`substring()和slice方法的主要区别`
* 若`start`为负数， 则将该值加上字符串长度后再进行计算（如果加上字符串的长度后还是负数， 则从0开始截取）(与slice一致)
* 如果`start`为正的并且大于或等于字符串的长度，则`substr()`返回一个空字符串
```

### splice()方法
主要用途：向数组的中部插入项。可用于删除、插入、替换
> array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```
* 第一项参数为 起始位置  第二项参数为要删除的项的数目  第三项参数为要插入的项
* splice()方法始终会返回一个被删除项的数组，如果没有删除任何项，则返回一个空数组(会修改原数组)
```
```js
var a = [1,2,3,4,5];
var b = a.splice(2,1,1,2);
console.log(a); // [1,2,1,2,4,5]
console.log(b); // [3]
```

### 位置方法 indexOf()和lastIndexOf()方法 
ES5新添加方法,数组实例（Array.prototype）
```
* 接收两个参数： 要查找的项  和 查找起点位置的索引(可选的)
* indexOf()方法从数组开头向后查找，lastIndexOf()方法则从数组末尾开始向前查找
* 返回查找项在数组中的位置，没找到则返回-1,在查找时，使用全等操作符即需要严格相等
```

### 数组的迭代方法
每个迭代方法都接收两个参数:在 每一项上运行的函数  和 运行该函数的作用域对象--影响this的值(可选)  
传入这些方法的函数会接收三个参数：数组项的值val、该项在数组中的位置index和数组本身array
> 以下迭代方法都不会修改原数组
* every(): 如果该函数对每一项都返回true，则返回true
* some(): 如果该函数对任意一项返回true，则返回true
* filter(): 过滤函数；返回该函数会返回true的项组成的数组,  
（当且仅当返回Boolean(val)为false时，即0、null、undefined、false）时，则会过滤
```js
var a = [1,2,4,7,8];
var b = a.filter(item => {
    return item%2 == 0;
})
console.log(b);  // [2,4,8]
```
```js
var a = [1,2,4,7,8];
var c = 1;
var b = a.filter(item => {
    return c-- ;
})
console.log(b);  // [1,4,7,8]
```
* map():返回每次函数调用的结果组成的数组
```js
var a = [1,2,4,6,8];
var b = a.map(item => {
    return ++item;
})
console.log(b)  // [2,3,5,7,9]
```
* forEach(): `这个方法没有返回结果`
```js
var a = [1,2,3,4,5];
var b = []
a.forEach(item => {
    b.push(item*2);
})
console.log(b);  // [2,4,6,8,10]
```

### 数组的缩小方法（？）
> ES5 新增了两个缩小数组的方法：`reduce()`和`reduceRight()`.这两个方法都会迭代数组的所有项，然后构建一个最终返回的值
* 这两个**方法**都接收**两个参数**：一个在每一项上调用的callback函数 和 initialValue作为第一次调用callback函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。在没有初始值的空数组上调用reduce将报错
* callback函数接收**4个参数**： 前一个值prev，当前值cur，当前项的索引index和数组对象array。
* callback函数**返回**的任何值都会作为第一个参数(prev)。第一次迭代时，第一个参数是数组的第一项，  
第二个参数是数组的第二项。index也从1开始(因为cur从数组第一项开始了)
* reduceRight()作用类似，只不过遍历反向相反。
```js
// ES5 数组reduce用法
var values = [1,2,3,4,5];
var sum = values.reduce((prev, cur, index, array) => {
    // console.log(index);  // 1, 2, 3, 4, 5
    console.log(prev);  // 1, 3, 6, 10
    return prev + cur;   
})
console.log(sum);  // 15
```


## 5.3 Date类型
通过`new Date()`创建日期对象
* Date.parse()接收一个表示日期的字符串参数，并返回相应日期的毫秒数
* ES5添加了Date.now()方法，返回表示调用这个方法时的日期和时间的毫秒数，可用于**节流函数**
```js
// 节流函数， 一个需要频繁触发的函数，在规定时间内只生效一次
function throttle(fn, delay) {
    var lastTime = 0;
    return function() {
        var nowTime = Date.now();
        if(nowTime - lastTime > delay) {
            // 当超过了delay规定的时间，则触发函数
            fn.call(this);
            // 并将记录的时间给上一次lastTime
            lastTime = nowTime;
        }
    }
}
```

Date类型重写了toLocaleString()、toString()和valueOf()方法
* toLocaleString()方法 返回xxxx/xx/xx 上午/下午 xx:xx:xx
* toString()方法 返回 字符串的new Data()形式
* valueOf()方法 返回 日期的毫秒表示

### 日期/时间组件方法
* getTime() 返回表示日期的毫秒数；与valueOf()方法返回的值相同
* getFullYear() 取得4位数的年份 2020
* getMonth() 返回日期中的月份，其中0表示一月，11表示十二月（即需加1才是正常的月份）(0-11)
* getDate() 返回日期月份中的天数 (1到31)
* getDay() 返回日期中星期的星期几 (其中0表示星期日)
* getHours() 返回日期中的小时数 (0-23)
* getMinutes() 返回日期中的分钟数(0-59)
* getSeconds() 返回日期中的秒数(0-59)

## 5.4.2 RegExp实例方法
* exec()方法：该方法时专门为**捕获组**而设计的。exec()接收一个参数，即要应用模式的字符串`RegExp.exec(str)`,  
返回数组是Array的实例，但是包含两个额外的属性：`index`和`input`。
* index表示匹配项在字符串中的位置，input表示应用正则表达式的字符串
* 数组第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串（如果模式中没有捕获组，则该数组只包含一项）
* 对于exec()方法，在设置全局标志g的情况下，才会在字符串中继续查找新匹配项，否则则始终是第一个匹配项
```js
var s = "aasdasa fd a adadvb";
var pattern = /as/ig;
var text = "mom and dad and baby";
var pattern2 = /mom (and dad (and baby)?)?/ig
var matches = pattern.exec(s);
var matches2 = pattern2.exec(text);
// 无捕获组
console.log(matches);  //["as", index: 1, input: "aasdasa fd a adadvb", groups: undefined]
// 有捕获组
console.log(matches2);//["mom and dad and baby", "and dad and baby", "and baby", index: 0, input: "mom and dad and baby", groups: undefined]
```

* test()方法 接受一个字符串参数。返回true或false `RegExp.test(str)`
* toLocaleString() 和 toString()方法 以字面量形式显示其字符串表示
* valueof()方法返回正则表达式本身 即返回的是Reg这个对象


### 函数属性和方法
* length: 表示函数希望接受的命名参数的个数
* prototype： 对于ECMAScript中的引用类型来说，prototype是保存它们所以实例方法的真正所在（例如toString()和valueOf()方法等）,在ES5中，prototype属性不可枚举，所以用for-in无法发现
* apply() 和 call()方法 这两个方法都接收两个参数：1.运行函数的作用域 2.参数数组，arguments对象等(区别仅在于接收参数的方式不同)。
* apply()方法 第二个参数传入方式为参数数组。
* call()方法 传递给函数的参数必须一个个列举出来
* bind()方法 返回一个原函数的拷贝，并拥有指定的this值和初始参数，传参方式与call相同，需要将参数一个个列出来。
* 除了能够传递参数外，它们真正强大的地方是能够扩充函数的作用域,并通过这样的方法使得 对象不需要与方法有任何耦合关系。
```js
window.color = 'red';
var o = { color: 'blue'};
function sayColor() {
    alert(this.color);
}
sayColor(); // red
sayColor.call(this); // red
sayColor.call(window); // red
sayColor.call(o); // blue
```

## 5.6 基本包装类型
为了便于操作基本类型值，ES提供了三个基本包装类型：`Boolean`、`Number`和`String`。每当读取一个基本类型值时，  
后台就会创建一个对应的基本包装类型的对象
```js
var s1 = "some text";
var s2 = s1.substring(2); // "me text"
```
> 上面代码可以转换为
1. 创建String类型的一个实例；
2. 在实例上调用指定的方法；
3. 销毁这个实例
```js
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;
```
>引用类型与基本包装类型的主要区别就是`对象的生存期`
* 引用类型：使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。
* 基本包装类型： 自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁，所以  
我们不能再运行时为基本类型值添加属性和方法。

## 5.6.1 Boolean类型
>Boolean实例重写了valueOf()方法和toString()方法
* valueOf()方法,返回基本类型值true或false
* toString()方法，返回字符串"true"和"false"

>基本类型和引用类型的布尔值
* 在布尔表达式中使用Boolean对象会出现问题。布尔表达式中的所有对象都会转换为true，  
其中也包含new Boolean(false)创建出来的Boolean对象。
```js
var falseObject = new Boolean(false);
var result = falseObject && true;
console.log(falseObject);  //Boolean {false}
console.log(result);  // true
var falseValue = false;
var res = falseValue && true;
console.log(res);   // false
```
* `typeof`操作符对基本类型返回`"boolean"`,而对引用类型返回`"object"`
* `instanceof`操作符测试Boolean对象会返回`true`，  
而测试基本类型的布尔值则返回`false`(因为Boolean对象是Boolean类型的实例)

## 5.6.2 Number类型
* valueOf()方法：返回对象表示的基本类型的数值
* toLocaleString()方法：返回字符串形式的数值
* toString()方法：除了可以返回字符串形式的数值以外，还可以向toString()方法传递一个表示基数(进制)的参数，  
然后返回对应的几进制的字符串形式
```js
var num = 10;
console.log(num.toString(2));  // 1010
console.log(num.toString(8)); // 12
```
>Number类型还提供了一些用于将数值格式化为字符串的方法
* `toFixed()`方法： 按照指定的小数位返回数值的字符串表示。即保留几位小数，并且有四舍五入的特性
* toExponential()方法： 返回以指数表示法(也称e表示法)表示的数值的字符串形式("1.0e+1"),  
接收一个参数，同样也是指定输入结果中的小数位数
```js
var num = 10;
console.log(num.toExponential(1)); // "1.0e+1"
console.log(num.toExponential(2)); // "1.00e+1"
```
* toPrecision()方法： 接收一个参数，表示数值的所有位数（不包括指数部分）,  
会根据处理的数值决定是调用toFixed()方法还是toExponential()
```js
var num = 99;
console.log(num.toPrecision(1)); // "1e+2"
console.log(num.toPrecision(2)); // "99"
console.log(num.toPrecision(3)); // "99.0"
```

## 5.6.3 String类型
> 字符方法通过charAt()、charCodeAt()方法和方括号表示法s[0]来访问字符串中的特定字符
* charAt()方法：以单字符 字符串的形式返回给定位置的那个字符
* charCodeAt()方法：以　字符编码（ASCII码）字符串的形式返回给定位置的字符

> 字符串操作方法：(concat()、slice()、substring()、substr()等)、  
字符串位置方法：(indexOf()、lastIndexOf()、trim())
* trim()方法： `ES5`定义的方法，这个方法会创建一个字符串的`副本`,删除前置和后缀的所有空格，然后返回结果

> 字符串大小写转换方法：(toLowerCase()转换成小写、toUpperCase()转换成大写)

> 字符串的模式匹配方法
* match()方法：`str.match(pattern)` 只接受一个参数，要么是一个正则表达式，要么是一个RegExp对象，   
本质与调用`RegExp.exec()`方法相同,所以有`捕获组`时，则数组有多项值。    
```js
var text = "cat,bat,sat,fat";
var pattern = /.at/;
var matches = text.match(pattern);
var reg = pattern.exec(text);
// str.match(pattern): ["cat", index: 0, input: "cat,bat,sat,fat", groups: undefined]
console.log(matches);
// pattern.exec(str): ["cat", index: 0, input: "cat,bat,sat,fat", groups: undefined]
console.log(reg);
```
* search()方法： 只接受一个参数，要么是一个正则表达式，要么是一个RegExp对象。返回字符串中第一个匹配项的`索引`，  
如果没有找到匹配项，则返回-1
* replace()方法： 接受两个参数： 第一个参数可以是一个`RegExp`对象或者一个`字符串`，  
第二个参数可以是一个`字符串`或者一个`函数`。  
如果第一个参数是字符串，那么只会替换第一个子字符串。  
只有通过正则表达式并且指定全局g标志，才能替换所有字符串。
* split()方法： 这个方法可以基于指定的分隔符将一个字符串分割成多个字符串，并将结果放在一个新数组中，  
split()的分隔符可以是`字符串`，也可以是一个`RegExp对象`.  
split()方法可以接收`可选的第二个参数`，用于指定`数组的大小`，以便确保返回的数组不会超过既定大小。
```js
var colorText = "red,blue,green,yellow";
var colors1 = colorText.split(",");  // ["red", "blue", "green", "yellow"]
var colors2 = colorText.split(",", 2); // ["red", "blue"]
//[^\,]+表示匹配除 逗号 以外的字符一或多次，即用(red,blue,green,yellow)作为分隔符
var colors3 = colorText.split(/[^\,]+/);  // ["", ",", ",", ",", ""]
```

## 5.7.1 Global对象
> URI编码方法`encodeURI()`和`encodeURIComponent()`方法  
可以对URI(Uniform Resource Identifiers,通用资源标识符)进行编码。  
它们用特殊的UTF-8编码替换所有无效的字符，从而让浏览器能够接受和理解。
* encodeURI()主要用于整个URI，并且不会对本身属于URI的特殊字符进行编码，例如冒号，正斜杠，问号、井号等
* 而encodeURIComponent()主要用于对URI中的某一段进行编码。 它会对它发现的任何非标准字符进行编码。  
所以通常用于附加在现有URI后面的字符串
```js
// URI编码方法
var uri = 'http://www.wrox.com/illegal value.htm#start';
console.log(encodeURI(uri)); // http://www.wrox.com/illegal%20value.htm#start
console.log(encodeURIComponent(uri)); // http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start
```

## Math对象
> 舍入方法，Math.floor(),Math.ceil(),Math.round()
* Math.floor()方法:向下取整
* Math.ceil()方法：向上取整
* Math.round()方法： 四舍五入
> 随机方法：random()
大多数情况可以通过一个函数来计算 `范围` 的值
```js
function selsectFrom(lowerValue, upperValue) {
    var choices = upperValue - lowerValue + 1; // 含最大值、含最小值
    var choices2 = upperValue - lowerValue; // 含最小值、不含最大值
    return Math.floor(Math.random()*choices )+ lowerValue;
}
var num = selsectFrom(2,10); // 即随机一个2-10之间的一个数值(包括2和10)
```
