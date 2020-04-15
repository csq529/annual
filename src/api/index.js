// const baseUrl = 'http://47.95.208.196:8088' // 测试
const baseUrl = 'https://kszx.council.com.cn/' // 正式
const api = {
  ANNUALLAUNCH: baseUrl + '/auction/activity/getActivityTypeList',
  CAREGORYREGION: baseUrl + '/auction/activity/getPinleiZhuanqu',
  GUESSLICK: baseUrl + '/auction/activity/getUserLike',
  HOTSALE: baseUrl + '/auction/activity/getHopPaipin',
  SPECIALSESSION: baseUrl + '/auction/activity/getActivityZhuanChangList',
  FUN: baseUrl + '/auction/activity/getPaipinModuleFenlei',
  GETDETAILS: baseUrl + '/auction/activity/getPaipinListByfenlei',
  GETCOUPON: baseUrl + '/coupon/putUserCoupon'
}

export { api }
