<template>
  <div class="coupons-wrapper">
    <!-- <div class="go-back">
      <div class="arrow-wrapper" @click="goBack">
        <img class="arrow" src="../../assets/img/arrow-left.png" alt="">
        <span>返回</span>
      </div>
      <div class="page-title">新人专享</div>
    </div> -->

    <div class="header-wrapper">
      <div class="header-img">
        <img src="../../assets/img/coupons-header.png" alt="">
      </div>
      <div class="header-bg"></div>
    </div>

    <div class="coupons-list-wrapper">
      <ul class="coupons-list" v-if="isCanGet">
        <li class="coupons-item" v-for="(item, index) in couponList" :key="index">
          <img :src="item.img" alt="">
          <div class="num"> X {{item.num}}</div>
        </li>
      </ul>

      <ul class="coupons-list" v-else>
        <li class="coupons-item" v-for="(item, index) in couponListUsed" :key="index">
          <img :src="item.img" alt="">
          <div class="num"> X 1</div>
        </li>
      </ul>
    </div>

    <div class="see-more" @click="getCoupon">
      <img src="../../assets/img/more-mine.png" v-if="isLinQu" alt="">
      <img src="../../assets/img/more.png" v-else alt="">
    </div>

    <div class="rules-wrapper">
      <img src="../../assets/img/rules.png" alt="">
      <p class="rules-text">1、活动时间：2019年12月21日至2020年1月15日。</p>
      <p class="rules-text">2、活动规则：</p>
      <p class="rules-text rulse-content">1）活动仅限雅昌拍卖图录APP进入的新用户参与，下单后即视为老用户，老用户不能领取新人好礼。</p>
      <p class="rules-text rulse-content">2）活动期间，用户完成注册登录后，即可领取新人礼包。同一用户活动期间仅可参与一次，同一微信或手机号，均视为同一用户。礼包数量有限，先到先得，发完即止。</p>
      <p class="rules-text">3、礼包使用规则：</p>
      <p class="rules-text rulse-content">1）礼包内含多张优惠券，自领取日生效，过期未使用自动失效，优惠券具体面额及其有效期以实际到账为准。</p>
      <p class="rules-text rulse-content">2）礼包内所有卡券均不可用于提现、转账或其他用途。卡券有效期过期后发生交易退款，已使用的金额不予退还。</p>
      <p class="rules-text rulse-content">3）礼包中优惠券在全平台（匡时在线APP、收藏在线小程序、收藏在线公众号）均可使用。</p>
      <p class="rules-text rulse-content">4）优惠券为满减券。订单价款总额满足对应满减优惠券使用限额才能使用。</p>
      <p class="rules-text rulse-content">5）红包中优惠券的具体使用规则及有效期信息可点击页面“查看已领优惠券”去往我的优惠券中查看，或在客户端内“我的卡券”页面查看；如遇发放延迟，请您耐心等待。</p>
      <p class="rules-text rulse-content">6）优惠券仅限单笔订单使用，不可叠加，若申请退款，优惠券不予退还。</p>
      <p class="rules-text" style="margin-top: .2rem">其他说明</p>
      <p class="rules-text rulse-content">1）活动过程中，凡以不正当手段（作弊、恶意套现、虚假交易、扰乱系统、实施网络攻击等）参与本次活动的用户，iCouncil有权终止其参与活动，并取消其获券资格。</p>
      <p class="rules-text rulse-content">2）活动中有任何疑问，即日起可联系iCouncil官方客服：400-630-6768咨询反馈。</p>
      <p class="rules-text rulse-content">3）北京收藏在线拍卖有限公司保留在法律规定范围内对上述规则进行解释的权利。</p>
    </div>
    <!-- <cube-loading :size="28" v-if="showLoading"></cube-loading> -->
  </div>
</template>

<script>
import { utils } from '../../untils'
import http from '@/api/public'

export default {
  data () {
    return {
      isCanGet: true,
      isLinQu: true,
      couponList: [
        {
          img: require('../../assets/img/500-coupons.png'),
          num: 1
        },
        {
          img: require('../../assets/img/150-coupons.png'),
          num: 2
        },
        {
          img: require('../../assets/img/100-coupons.png'),
          num: 2
        }
      ],
      couponListUsed: [
        {
          img: require('../../assets/img/500-coupons-used.png'),
          num: 1
        },
        {
          img: require('../../assets/img/150-coupon-used.png'),
          num: 2
        },
        {
          img: require('../../assets/img/100-coipon-used.png'),
          num: 2
        }
      ]
    }
  },

  methods: {
    getCoupon () {
      let params = {
        key: this.$route.query.userid
      }
      http.fetchPost(this.$api.GETCOUPON, params).then(res => {
        if (res.data.code === '0') {
          this.isCanGet = false
          utils.setStore('isGet', false)
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },

  created () {
    let isGet = utils.getStore('isGet')
    console.log('isGet:', isGet)
    // this.isCanGet = utils.getStore('isGet')
    // console.log('isCanGet:', this.isCanGet)
  }
}
</script>

<style scoped lang="stylus">
.coupons-wrapper {
  width: 100%
  background: #D83123;
  .go-back {
    font-size: .3rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    padding: 0 .16rem
    display: flex;
    align-items: center;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    .arrow-wrapper {
      display: flex;
      align-items: center
    }
    .arrow-left {
      width: .32rem;
      height: .32rem;
      display: block;
      vertical-align: center;
    }
    span {
      color: #1296db;
    }
    .page-title {
      margin-left: 2.3rem;
      font-weight: 700
    }
  }
  .header-wrapper {
    padding-top: 0.57rem;
    position: relative;
    .header-img {
      width: 6.46rem;
      height: 3.67rem;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .header-bg {
      position: absolute;
      top: 2.8rem;
      left: 0;
      width: 7rem;
      height: 2.38rem;
      background: url('../../assets/img/coupons-bg.png') no-repeat center center;
      background-size: 100%;
    }
  }
  .coupons-list-wrapper {
    padding-left: .26rem;
    .coupons-list {
      .coupons-item {
        margin-bottom: .2rem;
        position: relative;
        img {
          width: 5.98rem;
          height: 1.29rem;
          display: block;
        }
        .num {
          color: #fff;
          font-size: .36rem;
          position: absolute;
          right: .42rem;
          top: 0;
          height: 1.29rem;
          line-height: 1.29rem;
        }
      }
    }
  }
  .see-more {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .4rem;
    margin-bottom: .43rem;
    img {
      width: 6.59rem;
      height: .75rem;
      display: block;
    }
  }
  .rules-wrapper {
    font-size: .24rem;
    color: #fff;
    padding-bottom: 0.57rem;
    img {
      width: 6.99rem;
      height: .45rem;
      display: block;
    }
    .rules-text {
      padding: 0 .27rem;
      line-height: .4rem;
    }
    .rulse-content{
      padding: 0 .27rem 0 .65rem;
    }
    .rules-text:nth-of-type(1)  {
      margin-top: .21rem;
    }
  }
}
</style>
