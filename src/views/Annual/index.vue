<template>
  <div class="activity-wrapper">
    <!-- 头图 -->
    <div class="header-img" ref="headerImg"></div>
    <!-- 趣拍特惠 -->
    <div class="fun-sale" ref="funSale">
      <!-- <div class="fun-title">美好生活 一拍即得</div> -->
      <div class="fun-title"></div>
      <ul class="sale-list" ref="saleList">
        <li class="sale-item" v-for="(item) in funList" :key="item.id"  @click="jumpDetail(item.id, item.modulename)">
          <div class="sale-item-wrapper">
            <img class="sale-img" :src="item.imageurl" :alt="item.modulename" />
            <!-- <div class="sale-des">新手捡漏</div> -->
          </div>
          <p class="sale-text">{{ item.modulename }}</p>
        </li>
      </ul>
    </div>

    <!-- 年度巨献 -->
    <div class="annual-launch" ref="annualLaunch">
      <div>
        <img class="annual-img" src="../../assets/img/annual-title.png" alt="" />
      </div>
      <div class="crunchies">
        <div class="crunchies-left">
          <div class="crunchies-left-wrapper swiper-container">
            <ul class="swiper-wrapper">
              <li class="swiper-slide slide-left" v-for="(item) in annnualList" :key="item.id">
                <div class="swiper-slide-content">
                  <p class="slide-left-des" @click="goAnchor('#anchor-' + index)">{{ item.paipinriqi }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="swiper-button-next-bottom"></div>
        </div>

        <div class="crunchies-right">
          <div class="crunchies-right-wrapper swiper-container">
            <ul class="swiper-wrapper">
              <li class="swiper-slide slide-right" v-for="(item, index) in annnualList" :key="index"  @click="goAnchor('#anchor-' + index)">
                <div class="swiper-right-item">
                  <p class="top-des">{{ item.modulename }}</p>
                  <p class="bottom-des">{{ item.secondTitle }}</p>
                </div>
                <div>
                  <img class="swiper-right-goods" :src="item.imageurl" :alt="item.paipinriqi">
                </div>
                <div class="come-in"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 品类专区 -->
    <div class="category-region" ref="categoryRegion">
      <div class="category-title">品类专区</div>
      <div class="category-content">
        <ul class="category-list">
          <li class="category-item" v-for="(item, index) in categoryList" :key="index" @click="goCategory(item.ids, item.mingcheng)">
            <img class="category-img" :src="item.fenleituhei" :alt="item.mingcheng">
            <p class="category-text text-overflow">{{ item.mingcheng }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 热门拍品 -->
    <div class="hot-sale" ref="hotSaleWrapper">
      <div ref="hotSale">
        <div class="sale-title">热门拍品</div>
        <div class="sale-wrapper">
          <ul class="sale-list">
            <li class="sale-item" v-for="(item, index) in hotList" :key="index" @click="jumpTohotSale(item.paipinid, item.zhuanchangid)">
              <img class="annual-icon" src="../../assets/img/annual-happay.png" alt="">
              <div class="sale-goods-wrapper">
                <img class="sale-goods" :src="item.imageurl" :alt="item.paipinmingcheng">
                <div class="sale-countdown-wrapper">
                  <span class="on-sale">{{ item.count.countdownLabel }}</span>
                  <span class="sale-countdown">{{ item.count.countdownTime }}</span>
                </div>
              </div>
              <div class="sale-info">
                <p class="sale-name text-overflow">{{ item.paipinmingcheng }}</p>
                <p class="sale-price">
                  <span>当前价：</span>
                  <span class="goods-price">￥{{ item.dangqianjiage }}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 专场 -->
      <!-- <div :class="{ 'scroll-bar': fixedTop }">
        <cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler" ref="scrollBar"/>
      </div> -->
      <!-- <div class="slide-wrapper">
        <ul class="slide-list">
          <li class="slide-item" v-for="(item, index) in labels" :key="index">{{ item }}</li>
        </ul>
      </div> -->
      <div :style="{'margin-top': fixedTop ? '1.08rem' : '0'}">
        <div class="special-session" v-for="(item, index) in specialList" :key="index" ref="scrollContent">
          <div class="session-title" :id="'anchor-' + index">
            <span class="session-day">{{ item.paipinriqi }}</span>
          </div>

          <div v-for="(special, i) in item.zhuangchangList" :key="i">
            <div class="session-content" @click="jumpToZhuan(special.id)">
              <div class="session-img-wrap">
                <img class="session-img" :src="special.shouyetu" alt="">
                <div class="session-countdown-wrap">
                  <span class="session-text">{{ getStatusAndTime(special.chuangjianshijian, special.jieshuriqi).countdownLabel }}</span>
                  <span class="session-countdown">{{ getStatusAndTime(special.chuangjianshijian, special.jieshuriqi).countdownTime }}</span>
                </div>
              </div>
              <div class="session-info">
                <p class="session-info-top">{{ special.name }}</p>
                <p class="session-info-bottom">
                  <span>{{ special.paipinshu }}件拍品</span>
                  <span>{{ special.weiguan }}人围观</span>
                  <span>{{ special.chujia }}人出价</span>
                </p>
              </div>
              <!-- <div class="special-annual"></div> -->
              <!-- <div class="special-in"></div> -->
            </div>

            <div class="sale-wrapper session-wrapper">
              <ul class="sale-list">
                <li class="sale-item" v-for="(list, i) in special.PaipinLiebiaoVO.paipinLiebiao" :key="i" @click="jumpTohotSale(list.id, list.zhuanchangid)">
                  <img class="annual-icon" src="../../assets/img/session-years.png" alt="">
                  <div class="sale-goods-wrapper">
                    <img class="sale-goods" :src="list.beijingtulujing" :alt="list.paipinmingcheng">
                    <div class="sale-countdown-wrapper">
                      <span class="on-sale">{{ getStatusAndTime(list.kaishishijian, list.jieshushijian).countdownLabel }}</span>
                      <span class="sale-countdown">{{ getStatusAndTime(list.kaishishijian, list.jieshushijian).countdownTime }}</span>
                    </div>
                  </div>
                  <div class="sale-info">
                    <p class="sale-name text-overflow">{{list.zuozhe}} {{ list.mingcheng }}</p>
                    <p class="sale-price">
                      <span>当前价：</span>
                      <span class="goods-price">￥{{ list.jiage }}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- <div class="session-wrapper">
              <ul class="session-list">
                <li class="session-item" v-for="(list, i) in special.PaipinLiebiaoVO.paipinLiebiao" :key="i" @click="jumpTohotSale(list.id, list.zhuanchangid)">
                  <img class="annual-icon" src="../../assets/img/session-years.png" alt="">
                  <div class="session-goods-wrapper">
                    <img class="session-goods" :src="list.beijingtulujing" alt="">
                    <div class="session-countdown-wrapper">
                      <span class="on-sale">{{ getStatusAndTime(list.kaishishijian, list.jieshushijian).countdownLabel }}</span>
                      <span class="session-countdown" style="padding-left: 0.1rem;">{{ getStatusAndTime(list.kaishishijian, list.jieshushijian).countdownTime }}</span>
                    </div>
                  </div>
                  <div class="sale-info">
                    <p class="sale-name text-overflow">{{list.zuozhe}} {{ list.mingcheng }}</p>
                    <p class="sale-price">
                      <span>当前价：</span>
                      <span class="goods-price">￥{{ list.jiage }}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess-like">
      <div class="guess-title">猜你喜欢</div>
      <div class="guess-content">
        <ul class="guess-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <li class="guess-item" v-for="(item, index) in guessList" :key="index" @click="jumpTohotSale(item.paipinid, item.zhuanchangid)">
            <div class="top-item">
              <img class="guess-goods-img" :src="item.imageurl" alt="">
              <div class="guess-goods-countdown">
                <span class="on-sale">{{ item.count.countdownLabel }}</span>
                <span class="sale-countdown">{{ item.count.countdownTime }}</span>
              </div>
            </div>
            <div class="guess-goods-info">
              <p class="guess-goods-name text-overflow">{{ item.zuozhe }} {{ item.paipinmingcheng }}</p>
              <p class="guess-goods-price">
                <span>当前价：</span>
                <span class="goods-price">￥{{ item.dangqianjiage }}</span>
              </p>
            </div>
            <div class="guess-icon"></div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="loading" class="loadmore">
      <loading :size="loadingSize"></loading>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import http from '@/api/public'
import moment from 'moment'
import loading from '@/components/loading/loading'

export default {
  components: {
    loading
  },
  data () {
    return {
      funList: [],
      annnualList: [],
      categoryList: [],
      hotList: [],
      specialList: [],
      guessList: [],
      offset: 10,
      loading: false,
      loadingSize: 22,
      labels: ['12月24日', '12月25日', '12月26日', '12月27日', '12月28日', '12月29日', '12月30日'],
      current: '12月24日',
      timer: null,
      fixedTop: false,
      d: 0,
      h: 0,
      m: 0,
      s: 0
    }
  },
  methods: {
    jumpTohotSale (id, zcid) {
      // eslint-disable-next-line no-undef
      wx.miniProgram.navigateTo({ url: `/pages/new_auction_detail/index?zhuanchangid=${zcid}&id=${id}` })
    },
    jumpToZhuan (id) {
      // eslint-disable-next-line no-undef
      wx.miniProgram.navigateTo({ url: `/pages/new_special_detail/index?id=${id}` })
    },
    goAnchor (selector) {
      console.log(selector)
      let anchor = this.$el.querySelector(selector)
      console.log(anchor.offsetTop)
      let total = anchor.offsetTop
      // document.body.scrollTop = total
      // // Firefox
      // document.documentElement.scrollTop = total
      // // Safari
      // window.pageYOffset = total
      clearInterval(this.timer)// 防止加速
      // 点击后，页面需要滚动到的最终位置，为lisUl中跟当前按钮对应的li的offsetTop
      this.timer = setInterval(() => {
        // 1 获取页面当前位置（页面当前卷曲的高度）
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var current = scrollTop
        // 2 设置步长
        var step = (total - current) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        // 3 套用公式
        current = current + step
        // 4 设置window.scrollTo()
        window.scrollTo(0, current)
        // 5 位置到达，清除定时器
        if (current === total) {
          clearInterval(this.timer)
        }
      }, 20)
    },

    goCategory (ids, name) {
      console.log('ids:', ids)
      console.log('name:', name)
      this.$router.push({
        path: '/goods-category',
        query: {
          ids: ids,
          name: name
        }
      })
    },
    jumpDetail (ids, name) {
      console.log('ids:', ids)
      this.$router.push({
        path: '/special-sale',
        query: {
          ids: ids,
          name: name
        }
      })
    },
    changeHandler (cur) {
      console.log(cur)
      this.current = cur
      let scrollBar = this.$refs.scrollBar.labels
      let active = this.$refs.scrollBar.active
      let currentIndex = scrollBar.findIndex(item => {
        return item === active
      })
      let scrollContent = this.$refs.scrollContent
      let target = scrollContent[currentIndex].offsetTop
      this.scrollDong(target - 50)
    },
    scrollDong (target) {
      clearInterval(this.timer)// 防止加速
      // 点击后，页面需要滚动到的最终位置，为lisUl中跟当前按钮对应的li的offsetTop
      this.timer = setInterval(() => {
        // 1 获取页面当前位置（页面当前卷曲的高度）
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var current = scrollTop
        // 2 设置步长
        var step = (target - current) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        // 3 套用公式
        current = current + step
        // 4 设置window.scrollTo()
        window.scrollTo(0, current)
        // 5 位置到达，清除定时器
        if (current === target) {
          clearInterval(this.timer)
        }
      }, 20)
    },
    myScroll () {
      return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
      }
    },
    getStatusAndTime (start, end) {
      const now = new Date().valueOf()
      let countdownTime
      if (now > end) {
        return {
          countdownLabel: '已结束',
          countdownTime: moment(end, 'x').format('MM-DD HH:mm')
        }
      } else if (now >= start) {
        const duration = moment.duration(end - now, 'milliseconds')
        if (duration.days() >= 1) {
          countdownTime = `距结拍 >${duration.days()}天`
        } else {
          // const hour =
          //   duration.hours() < 10 ? `0${duration.hours()}` : duration.hours()
          const hour = duration.hours() < 1 ? `` : `${duration.hours()}时`
          const minutes =
            duration.minutes() < 10 ? `0${duration.minutes()}分` : `${duration.minutes()}分`
          // const seconds =
          //   duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()
          countdownTime = `距结拍 ${hour}${minutes}`
        }
        return {
          countdownLabel: '竞拍中',
          countdownTime
        }
      } else {
        const duration = moment.duration(start - now, 'milliseconds')
        if (duration.days() >= 1) {
          countdownTime = `距开拍 >${duration.days()}天`
        } else {
          // const hour =
          //   duration.hours() < 10 ? `0${duration.hours()}` : duration.hours()
          const hour = duration.hours() < 1 ? `` : `${duration.hours()}时`
          const minutes =
            duration.minutes() < 10 ? `0${duration.minutes()}分` : `${duration.minutes()}分`
          // const seconds =
          //   duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()
          countdownTime = `距开拍 ${hour}${minutes}`
        }
        return {
          countdownLabel: '预展中',
          countdownTime
        }
      }
    },
    // 品类专区
    getCategory () {
      let params = {
        offset: 0,
        limit: 1000
      }
      http.fetchGet(this.$api.CAREGORYREGION, params).then(res => {
        console.log('category:', res)
        if (res.data.code === '0') {
          this.categoryList = res.data.rows
        }
      })
    },
    // 年度盛典
    getAnnualLanch () {
      return http.fetchGet(this.$api.ANNUALLAUNCH).then(res => {
        console.log('annual:', res)
        if (res.status === 200) {
          this.annnualList = res.data.rows
        }
      })
    },
    // 趣味特拍
    getFun () {
      http.fetchGet(this.$api.FUN).then(res => {
        if (res.data.code === '0') {
          this.funList = res.data.rows
          console.log('fun', res.data)
        }
      })
    },
    // 热门拍品
    getHotSale () {
      http.fetchGet(this.$api.HOTSALE).then(res => {
        if (res.data.code === '0') {
          this.hotList = res.data.rows
          // setInterval(
          this.hotList.forEach(item => {
            // console.log(item)
            // item.count = setInterval(this.getStatusAndTime(item.kaishishijian, item.jieshushijian), 1000)
            item.count = this.getStatusAndTime(item.kaishishijian, item.jieshushijian)
          })
          // , 1000)
          console.log('hotsale:', this.hotList)
        }
      })
    },
    // 专场
    getSpecialSession () {
      let params = {
        offset: 0,
        limit: 7
      }
      http.fetchGet(this.$api.SPECIALSESSION, params).then(res => {
        if (res.data.code === '0') {
          this.specialList = res.data.rows
          this.specialList.forEach(item => {
            item.count = this.getStatusAndTime(item.kaishishijian, item.jieshushijian)
          })
          console.log('specialList:', this.specialList)
        }
      })
    },
    // 猜你喜欢
    getGuessLike () {
      let params = {
        offset: this.offset,
        limit: 10
      }
      console.log(params)
      http.fetchGet(this.$api.GUESSLICK, params).then(res => {
        if (res.data.code === '0') {
          this.guessList = this.guessList.concat(res.data.rows)
          this.guessList.forEach(item => {
            item.count = this.getStatusAndTime(item.kaishishijian, item.jieshushijian)
          })
          console.log('guessList:', this.guessList)
          this.loading = false
        }
      })
    },

    // 下拉加载
    loadMore () {
      console.log('loadmore:')
      this.loading = true
      this.offset = this.offset += 10
      this.getGuessLike()
    },
    scrollTo () {
      let headerImg = this.$refs.headerImg.clientHeight
      let funSale = this.$refs.funSale.clientHeight
      let annualLaunch = this.$refs.annualLaunch.clientHeight
      let categoryRegion = this.$refs.categoryRegion.clientHeight
      let hotSale = this.$refs.hotSale.clientHeight
      let hotSaleWrapper = this.$refs.hotSaleWrapper.clientHeight
      let scrollTop = this.myScroll().scrollTop
      let totalHeight = headerImg + funSale + annualLaunch + categoryRegion + hotSale
      if (scrollTop >= totalHeight) {
        this.fixedTop = true
      } else {
        this.fixedTop = false
      }

      if (scrollTop > totalHeight + hotSaleWrapper - 260) {
        this.fixedTop = false
      }
    },
    updateCurTime () {
      this.getHotSale()
      this.getGuessLike()
      this.getSpecialSession()
    }
  },
  created () {
    this.getFun()
    this.getCategory()
    this.updateCurTime()
    // this.curTimer = setInterval(this.updateCurTime, 1000)
  },
  mounted () {
    // window.addEventListener('scroll', this.scrollTo)
    this.getAnnualLanch().then(() => {
      var swiperRight = new Swiper('.crunchies-right-wrapper', {
        direction: 'vertical',
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        speed: 3000,
        allowTouchMove: false,
        autoplay: {
          disableOnInteraction: false,
          delay: 3000
        },
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2
        },
        touchMoveStopPropagation: false
      })
      var swiperleft = new Swiper('.crunchies-left-wrapper', {
        direction: 'vertical',
        loop: true,
        speed: 1000,
        slidesPerView: 'auto',
        touchMoveStopPropagation: false,
        navigation: {
          nextEl: '.swiper-button-next-bottom'
        },
        initialSlide: 1,
        controller: {
          control: swiperRight
        },
        on: {
          tap (event) {
            this.slideTo(this.clickedIndex, 1000, false)
          }
        }
      })
      swiperRight.controller.control = swiperleft
    })
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollTo)
  },
  destroyed () {
    document.removeEventListener('scroll', this.scrollTo)
    clearInterval(this.curTimer)
  }
}
</script>

<style scoped lang="stylus">
.text-overflow {
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    white-space: nowrap;
}

.activity-wrapper {
  padding-bottom: 1.43rem;
  background: #C53839;

  .header-img {
    width: 100%;
    height: 9.51rem;
    background: url('../../assets/img/top-img.e522aca2.png') no-repeat center center;
    background-size: 100%;
  }

  .fun-sale {
    padding: 0 0.25rem;
    .fun-title {
      font-size: .3rem;
      color: #FFFFFF;
      height: .3rem;
      line-height: .3rem;
      text-align: center;
    }
    .sale-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      height: 4.6rem;

      .sale-item {
        width: 1.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;

        .sale-item-wrapper {
          position: relative;

          .sale-img {
            width: 1.6rem;
            height: 1.72rem;
            display: block;
            border-radius: 0.1rem;
            font-size: .2rem;
            color: #FFFFFF;
            object-fit: contain;
          }

          .sale-des {
            box-sizing: border-box;
            padding: 0.05rem 0.1rem 0.08rem 0.18rem;
            width: 100%;
            height: 0.64rem;
            background: #ECECEC;
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: 0.2rem;
            overflow: hidden;
            border-radius: 0rem 0rem 0.1rem 0.1rem;
          }
        }

        .sale-text {
          font-size: 0.24rem;
          color: #FFFFFF;
          margin-top: 0.11rem;
          height: 0.23rem;
          line-height: 0.23rem;
          margin-bottom: 0.27rem;
        }
      }
    }
  }

  .annual-launch {
    .annual-img {
      width: 5.45rem;
      height: 1.79rem;
      display: block;
      margin: 0 auto;
      font-size: .2rem;
      color: #FFFFFF;
    }

    .crunchies {
      display: flex;
      align-items: center;
      width: 100%;
      height: 4.10rem;

      .crunchies-left {
        height: 100%;
        width: 1.70rem;
        background: url('../../assets/img/crunchies-left-bg.png') no-repeat center center;
        background-size: 100%;
        position: relative;
        padding: .19rem 0 .4rem 0;
        overflow: hidden;
        box-sizing: border-box;

        .crunchies-left-wrapper {
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          padding-top: .95rem;

          .slide-left {
            margin-left: .25rem;
            width: 1.21rem;
            margin-bottom: .1rem;
            height: .76rem;
            background: url('../../assets/img/crunchies-left.png') no-repeat center center;
            background-size: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .slide-left-day {
              height: .23rem;
              line-height: .23rem;
              font-size: .24rem;
            }
            .slide-left-des {
              height: .16rem;
              line-height: .16rem;
              font-size: .18rem;
              margin-top: .04rem;
            }
            .swiper-slide-content {
              color: #82273F;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
          }

          .swiper-slide-active {
            margin-left: .2rem !important;
            width: 1.4rem
            height: .85rem;
            background: url('../../assets/img/crunchies-left-actived.png') no-repeat center center;
            background-size: 100%;
            .swiper-slide-content {
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
          }
        }

        .swiper-button-next-bottom {
          width: .23rem;
          height: .15rem;
          background: url('../../assets/img/more-arrow.png') no-repeat center center;
          background-size: 90%;
          position: absolute;
          bottom: .26rem;
          left: 50%;
          transform: translateX(-50%);
          &:focus {
            outline: none;
          }
        }

      }

      .crunchies-right {
        width: 5.5rem;
        height: 3.8rem;
        background: url('../../assets/img/swiper-right-bg.png') no-repeat center center;
        background-size: 100%;

        .crunchies-right-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .swiper-right-item {
            padding-left: .24rem;
            padding-top: .43rem;
            font-size: .3rem;
            .top-des {
              height: .29rem;
              line-height: .29rem;
              color: #AC67B8;
            }

            .bottom-des {
              height: .29rem;
              line-height: .29rem;
              color: #FEFEFE;
              margin-top: .14rem;
            }

          }
          .swiper-right-goods {
            width: 4.98rem;
            height: 2.07rem;
            display: block;
            font-size: .2rem;
            color: #FFFFFF;
            border-radius: .1rem;
            margin-left: .24rem;
            margin-top: .27rem;
          }

          .come-in {
            position: absolute;
            right: .22rem;
            top: .27rem;
            width: 1.75rem;
            height: .62rem;
            background: url('../../assets/img/in.png') no-repeat center center;
            background-size: 100%;
          }
        }
      }
    }
  }

  .category-region {
    .category-title {
      color: #FFFFFF;
      font-size: .3rem;
      text-align: center;
      height: 1.09rem;
      line-height: 1.09rem;
    }

    .category-content {
      padding-left: .15rem;
      box-sizing: border-box;
      overflow-x: auto;

      .category-list {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        height: 4.5rem;
        align-items: flex-start;
        justify-content: center;

        .category-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin-bottom: .28rem;
          margin-right: .2rem;
          &:last-child {
            padding-right: 0.15rem;
            box-sizing: border-box;
          }
          .category-img {
            width: 1.4rem;
            height: 1.39rem;
            display: block;
            border-radius: .1rem;
            font-size: .2rem;
            color: #FFFFFF;
            object-fit: contain;
          }
          .category-text {
            font-size: .24rem;
            color: #FFFFFF;
            margin-top: .22rem;
          }
        }
      }
    }
  }

  .hot-sale {
    .sale-title {
      font-size: .3rem;
      color: #FFFFFF;
      height: 1.19rem
      line-height: 1.19rem;
      text-align: center;
    }

    .slide-wrapper {
      overflow-x: scroll;
      .slide-list {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .24rem;
        color: #fff;
        height: 1.08rem;
        line-height: 1.08rem;
        .slide-item {
          padding-right:.5rem;
          word-break: keep-all;
        }
      }
    }
    .sale-wrapper {
      overflow-x: auto;
      padding-left: .15rem;
      height: 3.7rem;
      margin-bottom: .2rem;
      .sale-list {
        display: flex;
        flex-wrap: nowrap;
        .sale-item {
          width: 3.1rem;
          position: relative;
          margin-right: .19rem;
          display: block;
          border-radius: .1rem;
           &:last-child {
            // padding-right: .15rem;
            // box-sizing: border-box;
          }
          .sale-goods-wrapper {
            border-radius: .1rem .1rem 0 0;
            position: relative;
            background:#FFFFFF;
            .sale-goods {
              object-fit: contain;
              width: 3.1rem;
              height: 2.29rem;
              display: block;
              font-size: .2rem;
              color: #FFFFFF;
            }

            .sale-countdown-wrapper {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: .41rem;
              background: url('../../assets/img/sale-countdown.png') no-repeat center center;
              background-size: 100%;
              display: flex;
              justify-content: center;
              align-items: center;

              .on-sale {
                font-size: .2rem;
                color: #FFD259;
                margin-right: .1rem;
              }

              .sale-countdown {
                font-size: .24rem;
                color: #FFFFFF;
              }
            }
          }
          .annual-icon {
            position: absolute;
            top: .1rem;
            left: .09rem;
            width: 1.24rem;
            height: .5rem;
            z-index: 10
          }

          .sale-info {
            background: #ECECEC;
            width: 100%;
            height: 1.41rem;
            padding: 0 .2rem;
            box-sizing: border-box;
            border-radius: 0 0 .1rem .1rem;

            .sale-name {
              font-size: .28rem;
              height: .28rem;
              line-height: .28rem;
              padding: .24rem 0 .18rem 0 ;
            }

            .sale-price {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              span {
                font-size: .24rem;
              }
              .goods-price {
                font-size: .3rem;
                color: #B5433F;
                font-weight: 700;
              }
            }
          }

        }
      }
    }

    .scroll-bar {
      position: fixed;
      top: 0;
      left: 0;
      background: #fff;
      z-index: 10;
    }
    .special-session {
      padding: 0 .15rem;
      .session-title {
        width: 7.2rem;
        height: 1.16rem;
        line-height: 1.16rem;
        background: url('../../assets/img/hot-sale-title.png') no-repeat center center;
        background-size: 100%;
        color: #fff;
        font-size: .3rem;
        .session-day {
          margin: 0 .59rem 0 .25rem;
        }
      }

      .session-content {
        position: relative;
        .session-img-wrap {
          position: relative;
          width: 100%;
          .session-img {
            width: 100%;
            display: block;
            font-size: .2rem;
            color: #FFFFFF;
          }

          .session-countdown-wrap {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: .54rem;
            line-height: .54rem;
            background: url('../../assets/img/session-countdown.png') no-repeat center center;
            background-size: 100%;
            font-size: .24rem;

            .session-text {
              color: #FFD259;
              margin: 0 .25rem;
            }

            .session-countdown {
              color: #FFFFFF;
            }
          }
        }

        .session-info {
          padding: .36rem 0 .3rem .27rem;
          background: #ECECEC;
          border-radius: 0 0 .1rem .1rem;
          .session-info-top {
            height: .29rem;
            line-height: .29rem;
            font-size: .3rem;
          }
          .session-info-bottom {
            height: .29rem;
            line-height: .28rem;
            color: #999999;
            font-size: .24rem;
            margin-top: .23rem;

            span:nth-child(2) {
              margin: 0 .47rem
            }
          }

        }

        .special-annual {
          position: absolute;
          top: .15rem;
          left: .17rem;
          width: 1.77rem;
          height: .51rem;
          background: url('../../assets/img/special-annual.png') no-repeat center center;
          background-size: 100%;
        }

        .special-in {
          position: absolute;
          top: .15rem;
          right: .21rem;
          width: 1.63rem;
          height: .5rem;
          background: url('../../assets/img/in.png') no-repeat center center;
          background-size: 100%;
        }
      }

      .session-wrapper {
        overflow-x: auto;
        margin-top: .2rem;
        margin-bottom: .2rem;
        .session-list {
          display: flex;
          flex-wrap: nowrap;
          .session-item {
            position: relative;
            margin-right: .19rem;
            display: block;
            border-radius: .1rem;
            &:last-child {
              padding-right: .15rem;
              box-sizing: border-box;
            }
            .session-goods-wrapper {
              position: relative;
              width: 2.15rem;
              height: 1.31rem;
              background:#FFFFFF;
              border-radius: .1rem .1rem 0 0;
              .session-goods {
                object-fit: contain
                border-radius: .1rem .1rem 0 0;
                width: 2.15rem;
                height: 1.31rem;
                display: block;
                font-size: .2rem;
                color: #FFFFFF
              }

              .session-countdown-wrapper {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: .29rem;
                background: url('../../assets/img/special-session-count.png') no-repeat center center;
                background-size: 100%;
                display: flex;
                align-items: center;

                .on-sale {
                  font-size: .16rem;
                  color: #FFD259;
                  transform: scale(0.8);
                  word-break: keep-all;
                }

                .session-countdown {
                  font-size: .16rem;
                  transform: scale(0.8)
                  color: #FFFFFF;
                  word-break: keep-all;
                  margin-left: -.15rem;
                }
              }
            }
            .annual-icon {
              position: absolute;
              top: .06rem;
              left: .06rem;
              width: .87rem;
              height: .36rem;
              z-index: 1;
            }

            .sale-info {
              background: #ECECEC;
              width: 2.15rem;
              height: .98rem;
              border-radius: 0 0 .1rem .1rem;

              .sale-name {
                font-size: .2rem;
                transform: scale(0.9);
                height: .2rem;
                line-height: .2rem;
                padding: .24rem 0 .10rem 0 ;
              }

              .sale-price {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                span {
                  font-size: .18rem;
                  transform: scale(0.8);
                }
                .goods-price {
                  font-size: .24rem;
                  color: #B5433F;
                  font-weight: 700;
                  margin-left: -0.1rem;
                }
              }
            }

          }
        }
      }
    }
  }

  .guess-like {
    .guess-title {
      font-size: .3rem;
      color: #FFFFFF;
      height: 1.15rem;
      line-height: 1.15rem;
      text-align: center;
    }
    .guess-content {
      padding: 0 .18rem;
      .guess-list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        .guess-item {
          width: 3.45rem;
          margin-bottom: .2rem;
          .top-item {
            width: 100%;
            height: 2.5rem;
            position: relative;
            background:#FFFFFF;

            .guess-goods-img {
              width: 100%;
              height: 100%;
              display: block;
              font-size: .2rem;
              color: #FFFFFF;
              object-fit: contain;
            }

            .guess-goods-countdown {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: .46rem;
              background: url('../../assets/img/guess-countdown.png') no-repeat center center;
              background-size: 100%;
              display: flex;
              align-items: center;

              .on-sale {
                font-size: .2rem;
                color: #FFD259;
                margin-right: .15rem;
                margin-left: .29rem;
              }

              .sale-countdown {
                font-size: .24rem;
                color: #FFFFFF;
              }
            }
          }

          .guess-goods-info {
            width: 100%;
            height: 1.57rem;
            background: #ECECEC;
            padding: 0 .2rem;
            box-sizing: border-box;

            .guess-goods-name {
              font-size: .3rem;
              height: .29rem;
              line-height: .29rem;
              padding: .41rem 0 .23rem 0;
            }

            .guess-goods-price {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              span {
                font-size: .24rem;
              }
              .goods-price {
                font-size: .3rem;
                color: #B5433F;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }

  .loadmore {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1rem;
    line-height: 1rem;
  }
}
</style>
