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
