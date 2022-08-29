# Ac-Vite

## 创建项目

- monoRepo 是将所有的模块统一的放在一个主干分支中管理
- MultiRepo 将项目分化成多个模块，并针对每一个模块单独的开辟一个 Repo 来进行管理

## Lerna

- Lerna 是一个管理多个 Npm 模块的工具，优化维护多包的工作流，解决多个包互相依赖，且发布需要手动维护多个包的问题

- lerna bootstrap 安装依赖
- lerna clean 删除各个包下 node_modules
- lerna init 创建新的 lerna 库
- lerna list 查看本地包列表
- lerna exec 在每个包目录下执行任意命令
- lerna run 执行每个包 package.json 中的脚本命令
- lerna link 链接互相引用的库
- lerna create 新建 package

## yarn workspace

- yarn workspace 允许我们使用 monorepo 的形式来管理项目
- 在安装 node_modules 的时候它不会安装到每个子项目的 node_modules 里面，而是直接安装到根目录下面，这样每个子项目都可以读取到根目录的 node_modules
- 整个项目只有根目录下面会有一份 yarn.lock 文件，子项目也会被 Link 到 node_modules 里面，这样就允许我们可以直接用 import 导入对应的项目

## 区别

- 依赖管理和安装包和链接包用 yarn 命令
- 初始化和发布包用 lerna 管理

## Vite

- vite 服务器需要在返回 main.js 文件内容的时候，把内容进行替换
