# 第六章 面向对象的程序设计

## 6.1.1 属性类型
> 属性描述符有两种主要形式：  `数据描述符` 和 `存取描述符`
* 数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。
* 存取描述符是由`getter`函数 和 `setter`函数所描述的属性。  
一个描述符只能是这两者其中之一；不能同时是两者

> 这两种描述符都是对象，它们**共享**以下可选键值  
(默认值是指使用`Object.defindProperty()`定义**属性**时的默认值)
* `configurable`: 当且仅当该属性的`configurable`键值为true时，该属性的描述符才能够被改变，  
同时该属性也能从对应的对象上被删除。 默认为false
* `enumerable`: 当且仅当该属性的`enumerable`键值为true时，  
该属性才会出现在对象的枚举属性中（`for...in` 或`Object.keys()方法`），默认为false。

> 数据描述符还具有以下可选键值：（数据属性）
* `value`: 该属性对应的值。可以是任何有效地JavaScript值（数值，对象，函数等）。默认为`undefined`
* `writable`: 当且仅当该属性的`writable`键值为`true`时，`value`的值才能被`赋值运算符`改变。默认为false

> 存取描述符还具有以下可选键值：（访问器属性）
* `get`: 属性的getter函数，如果没有getter，则为`undefined`。当访问该属性时，会调用此函数。  
执行时不传入任何参数，但是会传入`this`对象。该函数的返回值会被用作属性的值。默认为`undefined`.
* `set`: 属性的setter函数，如果没有setter，则为`undefined`。当属性值被修改时，会调用此函数。  
该方法接收一个参数（也就是被赋予的新值），会传入赋值时的`this`对象。默认为`undefined`

> 对于直接在对象上定义的属性，它们的`Configurable`,`Enumerable`,`Writable`都设置为true，而`value`则被设置为指定的值
```js
var person = {
  name: "Nicholas" // 此时它的`Configurable`,`Enumerable`,`Writable`都设置为true，而`value`则被设置为"Nicholas"
}
```
> 要修改属性默认的特性，则需要使用ES5中的defineProperty()方法。这个方法接收三个参数：属性所在的对象、属性的名字 和 一个描述符对象。描述符对象属性必须是configurable、enumerable、writable和value
* 而在调用Object.defineProperty()方法时，如果不指定，则configurable、enumberable和writable的默认值都为false
```js
var person = {};
Object.defineProperty(person, "name", {}) // 此时configurable、enumberable和writable的默认值都为false
```

> 访问器属性： 访问器属性不包含数据值；它们包含一对getter和setter函数（两个函数都不是必需的）。  
在读取访问器属性时，会调用getter函数，这个函数负责返回有效的值；在写入访问器属性时，  
会调用setter函数并传入新值，这个函数决定如何处理数据
* 访问器不能直接定义，必须使用Object.defineProperty()来定义
```js
var book = {
  _year: 2004,   //  _year前面的下划线是一种常用的记号，用于表示只能通过对象方法访问的属性
  edition: 1
};
Object.defineProperty(book, "year", {
  get: function() {
    return this._year;
  },
  set: function(newValue) {
    if(newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  }
});
console.log(book.year);  // 2004
book.year = 2005;
console.log(book.year); // 2005
console.log(book.edition); // 2
```

> 由于为对象定义多个属性的可能性很大，所以ES5又定义了一个`Object.defineProperties()`方法。
* 利用这个方法可以通过描述符一次定义多个属性。  
这个方法接收两个对象参数：1.添加和修改其属性的`对象` 2.第二个对象的属性与与第一个对象中要添加或修改的属性一一对应
```js
var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2004
  },
  edition: {
    value: 1
  },
  year: {
    get: function() {
      return this._year;
    },
    set: function(newValue) {
      if(newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
})
```
> 读取属性的特性（Object.getOwnPropertyDescriptor()）
* 使用ES5 的`Object.getOwnPropertyDescriptor()`方法,可以取得给定属性的描述符。
* 这个方法接收两个参数：1.属性所在的对象 2.要读取的描述符的属性名称。
* 返回值是一个对象，如果是访问器属性，这个对象的属性有configurable、enumerable、get和set；  
如果是数据属性，这个对象有configurable、enumerable、writable和value
```js
// {configurable: true,enumerable: true,value: 2004,writable: true}
var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
```


## 6.2.3 原型模式
> hasOwnProperty()方法可以检测一个属性是否存在对象实例中，存在则返回true
* 每个函数都有prototype属性， 而实例则通过__proto__来查找原型
```js
function Person() {}
Person.prototype.name = 'aaa';
Person.prototype.age = 29;
Person.prototype.sayName = function() {
  console.log(this.name)
};
var person1 = new Person();
var person2 = new Person();
// 该属性存在于原型中
console.log(person1.hasOwnProperty('name')); // false
// 在实例中添加了一个age属性
person1.age = 30;
console.log(person1.hasOwnProperty('age));  // true
```

> 单独使用in操作符时，可以通过对象访问给定属性并返回true或false，无论该属性存在于`实例中还是原型中`。
```js
function Person() {}
Person.prototype.name = 'aaa';
Person.prototype.age = 29;
Person.prototype.sayName = function() {
  console.log(this.name)
};
var person1 = new Person();
var person2 = new Person(); 
console.log(person1.hasOwnProperty('name)); // false 
console.log('name' in person1);  // true
```

> for...in语句以任意顺序遍历一个对象的除Symbol以外的可枚举属性
```js
Object.prototype.age = '111'
var o = {
    toString: function() {
        return "改写了toString"
    },
    a:1,
    b:2
};
o.name = "aaa"
for( var prop in o) {
    console.log(prop);  // toString  a  b  name  age
}
```

> 要取得对象上所有可枚举的实例属性，可以使用ES5中的`Object.keys()方法`
* Object.key()方法，这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的`字符串数组`
```js
Object.prototype.age = '111';
Object.prototype.name = 'bbb';
var o = {
    toString: function() {
        return "改写了toString"
    },
    a:1,
    b:2
};
o.name = "aaa"
// for( var prop in o) {
//     console.log(prop);  // toString  a  b  name  age
// }
console.log(Object.keys(o)) // ["toString", "a", "b", "name"]
console.log(Object.keys(Object.prototype)); // ["age", "name"]
```

> 可以通过`Object.getOwnPropertyNames()`方法来得到所有实例属性，无论它是否可枚举
```js
Object.prototype.age = '111';
Object.prototype.name = 'bbb';
var o = {
    toString: function() {
        return "改写了toString"
    },
    a:1,
    b:2
};
o.name = "aaa";
//  ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString", "age", "name"]
console.log(Object.getOwnPropertyNames(Object.prototype))
```


> 原型的动态性
* 由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来  
--即使是先创建了实例后修改原型也是如此
```js
var friend = new Person();
Person.prototype.sayHi = function() {
  console.log('hi);
};
friend.sayHi(); // 'hi'
```
* 但是如果是重写整个原型对象，那么情况就不一样了。我们知道，调用构造函数时 会为实例添加一个指向`最初原型`的[[Prototype]]指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。  
**实例中的指针仅指向原型，而不指向构造函数**
```js
function Person(){}
Person.prototype.name = "aaa"
var friend = new Person();
// 重写了整个原型对象
Person.prototype = {
  constructor: Person,
  name: '123',
  age: '29',
  sayName: function() {
    console.log(this.name);
  }
};
//  Error   friend指向的原型中不包含以该名字命名的属性
friend.sayName();
//  aaa  原来的原型对象依然存在  实例引用的仍然是最初的原型
console.log(friend.name) 
```

> 原型对象的问题
* 对于不同的实例来说，原型中的**引用类型值的属性也会被共享**
```js
function Person(){
}
// 重写了整个原型对象
Person.prototype = {
  constructor: Person,
  name: '123',
  age: '29',
  friends: ["1","2","3"],
  sayName: function() {
    console.log(this.name);
  }
};
var Person1 = new Person();
var Person2 = new Person();
Person1.age = 1;
Person1.friends.shift();
// 1  '29'
console.log(Person1.age,Person2.age)
// ["2", "3"]   ["2", "3"]
console.log(Person1.friends,Person2.friends)
```


> 组合使用构造函数模式和原型模式
* 创建自定义最常见的方式，就是组合使用构造函数模式与原型模式。其中，**构造函数模式** 用于 定义实例属性  
而**原型模式** 用于 定义方法 和 共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用。
```js
// 组合使用构造函数模式和原型模式

// 构造函数模式
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["1","2","3"];
}

// 原型模式
Person.prototype = {
    constructor: Person,
    sayName: function() {
        console.log(this.name);
    }
}
var person1 = new Person("N", 29, "S");
var person2 = new Person("G", 27, "D");
person1.friends.push("4");
// ["1","2","3","4"]  ["1","2","3"] 
console.log(person1.friends, person2.friends);
// false
console.log(person1.friends === person2.friends); 
// true
console.log(person1.sayName === person2.sayName);
```

## 继承

> 原型链继承（问题：包含引用类型值的原型  并且 在创建子类型的实例时，不能向超类型的构造函数中传递参数（在不影响所有对象实例的情况下））
```js
// 原型链

// 父类函数
function SuperType() {
    this.property = true;
}
// 父类方法
SuperType.prototype.getSuperValue = function() {
    return this.property;
}
// 子类函数
function SubType() {
    this.subproperty = false;
}
// 继承了SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
    return this.subproperty;
};
var instance = new SubType();
console.log(instance.getSuperValue()); // true
// SubType.prototype
// 其中父类中的property在Subtype.prototype中  因为property是一个实例属性 在 SubType.prototype = new SuperType();
// instance.__proto__  与 SubType.prototype相等
console.log(instance.__proto__)
console.log(SubType.prototype)
// SuperType.prototype
// SubType.prototype.__proto__ 与 SuperType.prototype相等
console.log(SubType.prototype.__proto__)
console.log(SuperType.prototype)
```

> 确定原型和实例的关系
* 使用instanceof 由于原型链的关系，我们可以说instance是Object、SuperType或SubType中任何一个类型的实例
```js
console.log(instance instanceof Object) // true
console.log(instance instanceof SuperType) // true
console.log(instance instanceof SubType) // true
```
* 使用isPrototypeOf()方法  测试一个对象是否存在于另一个对象的原型链上
```js
console.log(Object.prototype.isPrototypeOf(instanceof)) // true
console.log(SuperType.prototype.isPrototypeOf(instanceof)) // true
console.log(SubType.prototype.isPrototypeOf(instanceof)) // true
```
* isPrototypeOf()与instanceof运算符不同。在表达式“object instanceof AFunction”中，  
object的原型链是针对“AFunction.prototype”进行检查的，而不是针对AFunction本身

> 因为通过new 实例给子类的原型会产生包含引用类型值带来的问题 所以 引入了 叫 **借用构造函数**
* 基本思想： 在子类型构造函数内部调用超类型构造函数(问题：无法函数复用，并且在超类型的原型中定义的方法在子类型中是不可见的)
```js
// 继承 借用构造函数
function SuperType() {
    this.colors = ["1","2","3"];
}
function SubType() {
    SuperType.call(this);
}
var instance1 = new SubType();
instance1.colors.push("4");
var instance2 = new SubType();
// ["1","2","3","4"]
console.log(instance1)
// ["1","2","3"]
console.log(instance2)
```
> 组合继承：指将原型链和借用构造函数的技术组合到一起
* 基本思路是：使用原型链实现对**原型属性和方法**的继承，而通过借用构造函数来实现对**实例属性**的继承
```js
// 组合继承  使用原型链和借用构造函数的技术
function SuperType(name) {
    this.name = name;
    this.colors = ["1","2","3","4"]
}
SuperType.prototype.sayName = function() {
    console.log(this.name)
}
function SubType(name, age) {
    // 继承属性  第二次调用SuperType构造函数
    SuperType.call(this,name);
    this.age = age;
}
// 继承方法  第一次调用SuperType构造函数
SubType.prototype = new SuperType(); 
SubType.prototype.sayAge = function() {
    console.log(this.age);
};
var instance1 = new SubType("N",29);
instance1.colors.push("5");
// ["1", "2", "3", "4", "5"]
console.log(instance1.colors);
// N
instance1.sayName();
// 29
instance1.sayAge();
var instance2 = new SubType("G",27);
// ["1", "2", "3", "4"]
console.log(instance2.colors);
// G
instance2.sayName();
// 27
instance2.sayAge();
```
* 组合继承问题： 第一次调用SuperType构造函数时，SubType.prototype会得到两个属性：name和colors，它们都是SuperType的实例属性，只不过现在位于SubType的原型中。  
当调用SubType构造函数时，又会调用一次（第二次）SuperType构造函数，这一次又在新对象上创建了实例属性name和colors。  
于是，这两个属性就屏蔽了原型中的两个同名属性。也就是说又两组name和colors属性：一组在instance实例上，一租在SubType.prototype上。
```js
// SubType {name: "N", colors: Array(5), age: 29}
console.log(instance1)
// SuperType {name: undefined, colors: Array(4), sayAge: ƒ}
console.log(instance1.__proto__) // 等同于SubType.prototype
```

> 寄生组合式继承：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法
* 基本思路： 不必为了指定子类型的原型 而调用 超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。  
本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型
```js
// 寄生组合式继承
// 本质上，object()对传入其中的对象执行了一次浅复制
function object(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
function inheritPrototype(subType, superType) {
    // 创建超类型原型的一个副本
    var prototype = object(superType.prototype);
    // 给创建的副本添加constructor属性,从而弥补因为重写原型而失去的constructor属性
    prototype.constructor = subType;
    // 将新创建的对象赋值给子类型的原型
    subType.prototype = prototype;
}
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
    console.log(this.name);
};
function SubType(name, age) {
    SuperType.call(this,name);
    this.age = age;
}
inheritPrototype(SubType, SuperType)
SubType.prototype.sayAge = function() {
    console.log(this.age);
}
var instance1 = new SubType("G",18);
// SubType {name: "G", colors: Array(3), age: 18}
console.log(instance1)
// SuperType {constructor: ƒ, sayAge: ƒ}
console.log(instance1.__proto__)
// {sayName: ƒ, constructor: ƒ}
console.log(instance1.__proto__.__proto__)
```
* 这个例子的高效率体现在它只调用了一次SuperType构造函数，并且因此避免了在SubType.prototype上面创建不需要的、多余的属性。与此同时，原型链还能保持不变；因此还能正常使用instanceof和isPrototypeOf()
