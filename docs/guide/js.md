## Object

### defineProperty
- 

- 修改属性的默认特性
    - [[Configurable]]: 表示属性是否可以通过delete 删除并重新定义，是否可以修改它的特 性，以及是否可以把它改为访问器属性。
    - [Enumerable]]：表示属性是否可以通过for-in 循环返回。
    - [[Writable]]：表示属性的值是否可以被修改。
    - [[Value]]：包含属性实际的值。
    - [[Get]]：获取函数，在读取属性时调用。默认值为undefined。
    - [[Set]]：设置函数，在写入属性时调用。默认值为undefined。
- 调用该方法时时，configurable、enumerable 和writable 的值如果不 指定，则都默认为false

```js
let person = {}
Object.defineProperty(person, 'name', {
    Configurable: false,
    Enumerable: false,
    Writable: false,
    Value: 'zhangsan'
})
```

### defineProperties

- 在一个对象上同时定义多个属性

### getOwnPropertyDescriptor

- 可以取得指定属性的属性描述符

### getOwnPropertyDescriptors

- 这个方法实际上会在每个自有属性上调用Object.getOwnPropertyDescriptor()并在一个新对象中返回它们。

### asOwnProperty

- 方法用于确定某个属性是在实例上还是在原型对象上

### 对象解构

```js
//解构赋值的同时定义默认值
let {name, job = 'Software engineer'} = person;

//如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号中：
let personName, personAge;
let person = {
    name: 'Matt',
    age: 27
};
({name: personName, age: personAge} = person);
console.log(personName, personAge); // Matt, 27
```

```js
// 嵌套解构
// 解构对于引用嵌套的属性或赋值目标没有限制。为此，可以通过解构来复制对象属性：
let person = {
    name: 'Matt',
    age: 27,
    job: {
        title: 'Software engineer'
    }
};
let personCopy = {};
({
    name: personCopy.name,
    age: personCopy.age,
    job: personCopy.job
} = person);
```

### 工厂模式

```text
工厂模式是一种众所周知的设计模式，广泛应用于软件工程领域，用于抽象创建特定对象的过程。
```

## 集合引用类型

### Map

```text
使用对象属性最为key，再使用key做引用值
```

- Api
    - get()
    - set() 方法返回映射实例，因此可以把多个操作连缀起来
    - has()
    - delete()
    - clear()

### WeakMap

### Set

### WeakSet

::: tip weak：弱引用，会被垃圾回收机制回收
:::

## JS高级

### 下载 txt 文件

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<input type="file">

<script>
    let input = document.querySelector('input')
    input.addEventListener('input', function (e) {
        let file = e.target.files[0]
        let fileReader = new FileReader()
        // 将 File 装成 ArrayBuffer
        fileReader.readAsArrayBuffer(file)
        // fileReader.readAsBinaryString(file) 已废弃
        // fileReader.readAsText(file)

        fileReader.onload = async (res) => {  // 加载完毕
            let arrayBuffer = res.target.result
            // 将获取到的 二进制数组 转出 Blob, (\ufeff 表示 utf-8格式,防止乱码)
            let blob = new Blob(["\ufeff", arrayBuffer], {type: 'text/plain'})
            let url = window.URL.createObjectURL(blob)
            //createObjectURL 也可以传入 File 对象, File对象是特殊类型的Blob
            // let url = window.URL.createObjectURL(file) 
            let a = document.createElement('a')
            a.href = url
            // a.href = window.URL.createObjectURL(file)
            a.download = file.name
            a.click()
            //释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象
            window.URL.revokeObjectURL(url);
        }
    });
</script>
</body>
</html>
```

::: tip 提示

1. Blob表示一个不可变、原始数据的类文件对象,它的数据可以按文本或二进制的格式进行读取
2. File对象是特殊类型的Blob
3. URL.revokeObjectURL() 静态方法用来释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
   :::

### 交集 差集 并集

```js
  let arr1 = [
    {id: 1, name: 'a'},
    {id: 2, name: 'b'},
    {id: 3, name: 'c'},
    {id: 4, name: 'd'},
]
let arr2 = [
    {id: 1, name: 'a'},
    {id: 2, name: 'b'},
    {id: 13, name: 'c3'},
    {id: 14, name: 'd4'},
]
// ES6写法
// arr1 与 arr2 的交集
let arr3 = arr1.filter(v => arr2.some(y => v.id === y.id))
// arr1 与 arr2 的差集
let arr4 = arr1.filter(v => !arr2.some(y => v.id === y.id))
// arr1 与 arr2 的并集
let arr5 = arr1.concat(arr2.filter(v => !arr1.some(y => v.id === y.id)))
```

::: tip 提示 并集 : arr1 拼接 arr2 与 arr1 的差集
:::

### 去重

```js
let arr = [1, 1, 2, 2, 3, 3,]
// 1.
let a = Array.from(new Set(arr))
// 2. 
let b = [...new Set(arr)]
// 3.   
let c = arr.reduce((p, c) => {
    return p.includes(c) ? p : [...p, c]
}, [])


```

```js
// 数组对象去重
let arr1 = [
    {id: 1, name: 'a'},
    {id: 1, name: 'c'},
    {id: 2, name: 'd'},
    {id: 3, name: 'e'},
    {id: 3, name: 'f'},
]

let obj = {}
let e = arr1.reduce((p, c) => {
    obj[c.id] ? '' : obj[c.id] = p.push(c)
    return p
}, [])
```

### 异步变同步

```js
function fn() {
    let timer;
    return new Promise((resolve) => {
        console.log(1);
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            resolve();
        }, 300);
    });
}

async function fn1() {
    await fn();
    console.log(2);
}

fn1()


```

## JS操作DOM

### JS拖拽

````text
拖拽的实现原理：通过事件mousedown（事件的触发） →mousemove（事件的控制） →mouseup（事件的清除），拖拽的过程就是mousemove阶段；
问题产生的原因：因为mousemove 的间隔性触发，当两次mousemove事件触发的间隔中，鼠标移动距离出了element的范围，就会产生鼠标脱离element范围，拖拽就停止，
解决方法： 将mousemove事件挂在docment，而不是对应的element，此时鼠标滑动只要不出docment范围就不会触发上述情况。


````

## JS库

### 函数库

- [XEUtils](https://x-extends.gitee.io/xe-utils/#/)
- [Lodash](https://www.lodashjs.com/)

### 代码编辑器库

- [codemirror6](https://codemirror.net/6/docs/ref/)

### Excel工具库

- [Luckysheet](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/)
- [xlsx](https://github.com/SheetJS/sheetjs)

### 日期库

- [Luxon](https://moment.github.io/luxon/#/?id=luxon)
