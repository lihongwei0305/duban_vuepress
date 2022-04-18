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
