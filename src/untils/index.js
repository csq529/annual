import moment from 'moment'
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const getStatusAndTime = (start, end) => {
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
      // 上面需要即将结拍的状态的时候
      // else if(duration.hours() === 0 && duration.minutes() <= 30) {
      //   const minutes =
      //     duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes();
      //   const seconds =
      //     duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds();
      //   countdownTime = `即将结拍 00:${minutes}:${seconds}`;
      // }
      const hour =
        duration.hours() < 10 ? `0${duration.hours()}` : duration.hours()
      const minutes =
        duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes()
      const seconds =
        duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()
      countdownTime = `距结拍 ${hour}:${minutes}:${seconds}`
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
      const hour =
        duration.hours() < 10 ? `0${duration.hours()}` : duration.hours()
      const minutes =
        duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes()
      const seconds =
        duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()
      countdownTime = `距开拍 ${hour}:${minutes}:${seconds}`
    }
    return {
      countdownLabel: '距开拍',
      countdownTime
    }
  }
}
// const getStatusAndTime = (start, end) => {
//   const now = new Date().valueOf();
//   if (now > end) {
//     return {
//       countdownLabel: "已结束",
//       countdownTime: moment(end, "x").format("MM-DD HH:mm")
//     };
//   } else if (now >= start) {
//     const duration = moment.duration(end - now, "milliseconds");
//     let countdownTime;
//     if (duration.days > 0) {
//       countdownTime = `${duration.days}天${duration.hours}时${duration.minutes}分${duration.seconds}秒`;
//     } else {
//       countdownTime = `${duration.hours}:${duration.minutes}:${duration.seconds}`;
//     }
//     return {
//       countdownLabel: "竞拍中",
//       countdownTime
//     };
//   } else {
//     const duration = moment.duration(start - now, "milliseconds");
//     let countdownTime;
//     if (duration.days > 0) {
//       countdownTime = `${duration.days}天${duration.hours}时${duration.minutes}分${duration.seconds}秒`;
//     } else {
//       countdownTime = `${duration.hours}:${duration.minutes}:${duration.seconds}`;
//     }
//     return {
//       countdownLabel: "距开拍",
//       countdownTime
//     };
//   }
// };
export const utils = {
  // 设置、获取、删除localStorage
  setStore (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },

  getStore (name) {
    if (!name) return
    return window.localStorage.getItem(name)
  },

  removeStore (name) {
    if (!name) return
    return window.localStorage.removeItem(name)
  }
}
export const getEndTimeDiff = end => {
  const now = new Date().valueOf()
  if (now < end) {
    return {
      countdownLabel: '竞拍中',
      countdownTime: moment
        .utc(moment(end, 'x').diff(moment(now, 'x')))
        .format('HH:mm:ss')
    }
  } else if (now > end) {
    return {
      countdownLabel: '已结束',
      countdownTime: moment(end, 'x').format('MM-DD HH:mm')
    }
  }
}

// export untils = {
//   formatTime: formatTime,
//   getStatusAndTime,
//   getEndTimeDiff
// }
