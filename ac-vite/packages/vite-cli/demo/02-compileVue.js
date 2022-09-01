const dedent = require('dedent')
const appVue = `
<template>
  <div>Hello Vite</div>
</template>

<script>
export default {
  name: 'App',
  setup() {
    return {}
  }
}
</script>
`
const path = require('path')
const fs = require('fs')

const { parse, compileTemplate } = require('@vue/compiler-sfc')
const { descriptor } = parse(appVue)
const defaultExportRegexp = /export default/

let targetCode = ``
// 脚本
if (descriptor.script) {
  let scriptContent = descriptor.script.content
  scriptContent = scriptContent.replace(defaultExportRegexp, `const _sfc_main=`)
  targetCode += scriptContent
}
// 模版
if (descriptor.template) {
  targetCode += dedent`
    import { openBlock, createElementBlock } from '@/modules/vue'
    function _sfc_render() {
      return (openBlock(),
      createElementBlock("h1", null, "App")
      )
    }
  `
  targetCode += `\n_sfc_main.render=_sfc_render`
  targetCode += `\nexport default _sfc_main`
}

console.log('targetCode >>> ', targetCode)
