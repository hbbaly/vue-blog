/**
 * Page meta message operate
 */
function getMeta (vm) {
  const {
    meta
  } = vm.$options
  return typeof meta === 'function'
    ? meta.call(vm)
    : meta
}

const serverMetaMixin = {
  created () {
    const meta = getMeta(this)
    if (meta) {
      let metaTags = []
      
      meta.forEach(item => {
        metaTags.push(`<meta name="${item.name}" content="${item.content}"/>`)
      })

      this.$ssrContext.meta = metaTags.join('\r\n')
    }
  }
}

const clientMetaMixin = {
  mounted () {
    // const title = getMeta(this)
    // if (title) {
    //   document.title = title
    // }
  }
}

// 可以通过 `webpack.DefinePlugin` 注入 `VUE_ENV`
export default process.env.VUE_ENV === 'server'
  ? serverMetaMixin
  : clientMetaMixin
