import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
// 移动端屏幕适配
import './common/rem.js'

// 公共样式
import './assets/css/reset.styl'
// swiper
import './assets/css/swiper.min.css'
import './assets/css/swiper-reset.styl'

// 公共接口
import { api } from './api'

import infiniteScroll from 'vue-infinite-scroll'
import Cube from 'cube-ui'

Vue.use(infiniteScroll)

Vue.use(Cube)
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// eslint-disable-next-line no-undef
// var _hmt = _hmt || []
// window._hmt = _hmt // 必须把_hmt挂载到window下，否则找不到
// (function() {
//   var hm = document.createElement("script")
//   hm.src = "https://hm.baidu.com/hm.js?0b298f7e3d2a2cc6021c6e811ee5878d"
//   var s = document.getElementsByTagName("script")[0]
//   s.parentNode.insertBefore(hm, s)
// })()
