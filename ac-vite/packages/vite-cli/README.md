# `vite-cli`

- 返回静态文件，静态里有 `import 'vue'`，浏览器不认识，不能发起请求，浏览器规定只能 `/ ./ ../`
- vue -> `/@modules/vue`，浏览器就能发请求了
- 把这一种路径变成一个硬盘的文件都绝对路径，然后读出来给浏览器

## App.vue

- App.vue 需要返回一段脚本
