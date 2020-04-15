<template>
  <div class="specialsale-wrapper">
    <!-- <div class="go-back">
      <div class="arrow-wrapper" @click="goBack">
        <img class="arrow" src="../../assets/img/arrow-left.png" alt="">
        <span>返回</span>
      </div>
      <div class="page-title">{{ current }}</div>
    </div> -->
      <div class="brand-list-wrap">
        <cube-scroll-nav-bar :current="current" :labels="brandList" @change="changeHandler" ref="scrollBar"/>
        <img @click="showMoreBrand" class="more-arrow" src="../../assets/img/arrow-down.png" alt="">
      </div>
      <div class="showmore-brand" v-if="showMore">
        <div class="more-header">
          <span>请选择</span>
          <img @click="showMoreBrand" class="arrow-top" src="../../assets/img/arrow-top.png" alt="">
        </div>
        <ul class="more-brand-list">
          <li class="more-item" v-for="(item, index) in moreBrandList" :key="index" @click="chooseBrand(item.ids, item.mingcheng)">
            <img class="brand-img" :src="item.tubiao" alt="">
            <span class="brand-name">{{ item.mingcheng }}</span>
          </li>
        </ul>
      </div>
    <div class="goods-list-wrap">
      <ul class="goods-list">
        <li class="goods-item" v-for="(item, index) in goodsList" :key="index" @click="jumpTo(item.id, item.zhuanchangid)">
          <div class="top-info">
            <img class="goods-img" :src="item.jubutu" alt="">
            <div class="count-down-wrapper">
              <span class="on-sale">{{ getStatusAndTime(item.kaishishijian, item.jieshushijian).countdownLabel }}</span>
              <span class="count-down">{{ getStatusAndTime(item.kaishishijian, item.jieshushijian).countdownTime }}</span>
            </div>
            <div class="annual-img"></div>
          </div>
          <div class="goods-info">
            <p class="goods-name">{{ item.zuozhe }} {{ item.mingcheng }}</p>
            <p class="goods-price-wrapper">
              <span class="current">当前价:</span>
              <span class="goods-price">￥{{ item.jiage }}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <cube-loading :size="28" v-if="showLoading"></cube-loading>
  </div>
</template>

<script>
import http from '@/api/public'
import moment from 'moment'

export default {
  data () {
    return {
      brandList: [],
      moreBrandList: [],
      goodsList: [],
      current: this.$route.query.name,
      showMore: false,
      showLoading: true
    }
  },
  methods: {
    jumpTo (id, zcid) {
      // eslint-disable-next-line no-undef
      wx.miniProgram.navigateTo({ url: `/pages/new_auction_detail/index?zhuanchangid=${zcid}&id=${id}` })
    },
    chooseBrand (id, name) {
      this.goodsList = []
      this.showLoading = true
      this.showMore = false
      this.current = name
      this.getDetail(id)
    },
    showMoreBrand () {
      this.showMore = !this.showMore
    },
    changeHandler (cur) {
      this.goodsList = []
      this.showLoading = true
      let id
      for (let i = 0; i < this.moreBrandList.length; i++) {
        let item = this.moreBrandList[i]
        if (cur === item.mingcheng) {
          id = item.ids
          break
        }
      }
      this.current = cur
      this.getDetail(id)
    },
    goBack () {
      this.$router.go(-1)
    },
    getDetail (id) {
      let params = {
        offset: 0,
        limit: 100,
        pinleizhuanqu: id
      }
      http.fetchGet(this.$api.GETDETAILS, params).then(res => {
        if (res.data.code === '0') {
          this.showLoading = false
          this.goodsList = res.data.paipinLiebiao
          console.log('goodsList:', this.goodsList)
        }
      })
    },

    getBrand () {
      http.fetchGet(this.$api.CAREGORYREGION).then(res => {
        let data = res.data.rows
        this.moreBrandList = data
        data.forEach(item => {
          this.brandList.push(item.mingcheng)
        })
        console.log('brandList:', this.brandList)
      })
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
    }
  },
  created () {
    const id = this.$route.query.ids
    // console.log(id)
    this.getBrand()
    this.getDetail(id)
    // this.curTimer = setInterval(this.updateCurTime, 1000, this.id)
    // this.timer = setInterval(this.getDetail(id), 1000)
  },
  mounted () {
    // this.timer = setInterval(this.getDetail(id), 1000)
  },
  beforeDestroy () {

  },
  destroyed () {
    clearInterval(this.curTimer)
  }
}
</script>

<style scoped lang="stylus">
.specialsale-wrapper {
  width: 100%
  height: 100%;
  background: #B5433F;
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
      text-align: center;
    }
  }
  .more-arrow {
    position: absolute;
    top: 50%;
    right: 0rem;
    width: .32rem;
    height: .32rem;
    margin-top: -.2rem;
    background: #fff;
    padding-right: .1rem;
    z-index: 102;
  }
  .brand-list-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 101;
    .brand-list {
      display: flex;
      .brand-item {
        font-size: .3rem;
        width: auto;
        padding: 0 .2rem;
      }
    }
  }

  .showmore-brand {
      padding: 0 .36rem;
      box-sizing: border-box;
      position: fixed;
      top: 1.1rem;
      width: 100%;
      z-index: 101;
      background: #fff;
      .more-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: .24rem;
        border-bottom: 1px solid #EBEBEB;
        padding-bottom: .15rem;
        .arrow-top {
          width: .32rem;
          height: .32rem;
        }
      }

      .more-brand-list {
          padding-top: .4rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          .more-item {
            width: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: .49rem;
            .brand-img {
              width: 1.12rem;
              height: 1.12rem;
              display: block;
            }
            .brand-img {
              width: 0.6rem;
              height: 0.6rem;
              display: block;
            }
            .brand-name {
              font-size: .24rem;
              height: .24rem;
              line-height: .24rem;
              padding-top: .26rem;
            }
          }
      }
  }

  .goods-list-wrap {
    margin-top: 1.1rem;
    .goods-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .29rem .19rem;
      background: #B5433F;
      flex-wrap: wrap;
      .goods-item {
        width: 3.46rem;
        border-radius: .1rem;
        margin-bottom: .2rem;
        .top-info {
          background: #fff;
          position: relative;
          border-radius: .1rem .1rem 0 0;
          .goods-img {
            width: 100%;
            height: 2.55rem;
            display: block;
            border-radius: .1rem .1rem 0 0;
            object-fit: contain;
          }
          .count-down-wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%
            height: .46rem;
            line-height: .46rem;
            background: url('../../assets/img/special-session-count.png') no-repeat center center;
            background-size: 100%;
            font-size: .24rem;
            .on-sale {
              color: #FFD259;
              padding-left: .24rem;
              padding-right: .2rem;
            }
            .count-down {
              color: #FFFFFF;
            }
          }
          .annual-img {
            width: 1.39rem;
            height: .56rem;
            background: url('../../assets/img/detail-annal.png') no-repeat center center;
            background-size: 100%;
            position: absolute;
            top: .1rem;
            left: .1rem;
          }
        }

        .goods-info {
          background: #ECECEC;
          border-radius: 0 0 .1rem .1rem;
          .goods-name {
            height: .42rem;
            line-height: .42rem;
            font-size: .3rem;
            padding: .32rem 0 .17rem .23rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .goods-price-wrapper {
            height: .42rem;
            line-height: .42rem;
            display: flex;
            padding:0 0 .29rem .23rem;
            .current {
              font-size: .24rem;
            }
            .goods-price {
              font-size: .3rem;
              color: #B5433F;
              margin-left: .1rem;
            }
          }
        }
      }
    }
  }
}
</style>
