const {navbar} = require('./configs/index')
module.exports = {
    title: '度半半半',
    description: '我的个人网站',
    port: 8998,
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', {rel: 'icon', href: 'https://vuejs.org/images/logo.png'}], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/duban_vuepress_preview/', // 这是部署到github相关的配置
    markdown: {
        code: {

            lineNumbers: false // 代码块显示行号
        },
    },
    themeConfig: {
        logo: 'https://vuejs.org/images/logo.png',
        navbar,

        sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
    },
    bundler: '@vuepress/bundler-vite',

};
