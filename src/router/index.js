import Vue from 'vue'
import VueRouter from 'vue-router'
const Annual = r => require(['../views/Annual/index'], r)
const SpecialSale = r => require(['../views/SpecialSale/index'], r)
const GoodsCategory = r => require(['../views/GoodsCategory/index'], r)
const Coupons = r => require(['../views/Coupons/index'], r)
const Announcement = r => require(['../views/Announcement/index'], r)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/annual-lanch'
  },
  {
    path: '/annual-lanch',
    name: 'Annual',
    component: Annual
  },
  {
    path: '/special-sale',
    name: 'SpecialSale',
    component: SpecialSale
  },

  {
    path: '/goods-category',
    name: 'GoodsCategory',
    component: GoodsCategory
  },

  {
    path: '/coupons',
    name: 'Coupons',
    component: Coupons
  },

  {
    path: '/announcement',
    name: 'Announcement',
    component: Announcement
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  if (to.path) {
    // eslint-disable-next-line no-undef
    _hmt.push(['_trackPageview', '/#' + to.fullPath])
  }
  next()
})

// router.afterEach((to, from, next) => {
//   setTimeout(()=>{
//     var _hmt = _hmt || []
//     (function() {
//       //每次执行前，先移除上次插入的代码
//       document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
//       var hm = document.createElement("script")
//       hm.src = "https://hm.baidu.com/hm.js?xxxx"
//       hm.id = "baidu_tj"
//       var s = document.getElementsByTagName("script")[0]
//       s.parentNode.insertBefore(hm, s)
//     })()
//   },0)
// })
export default router
