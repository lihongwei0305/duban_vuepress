const navbar = [
    {
        text: '前端',
        children: [
            {text: 'Html', link: '/guide/html.md', activeMatch: '^/guide/html'},
            {text: 'Css', link: '/guide/css.md', activeMatch: '^/guide/css'},
            {text: 'Js', link: '/guide/js.md', activeMatch: '^/guide/js'},
            {
                text: '框架',
                children: [
                    {text: 'Vue', link: '/guide/vue.md', activeMatch: '^/guide/vue'},
                    {text: 'React', link: '/guide/react.md', activeMatch: '^/guide/react'},
                ]

            }
        ]
    },
    {text: '后端', link: '/algorithm/'},
    {text: '计算机', link: '/guide/computers.md',activeMatch: '^/guide/computers'},
]
module.exports = navbar


