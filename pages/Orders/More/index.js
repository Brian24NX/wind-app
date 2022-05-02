// pages/Orders/More/index.js
const dayjs = require("dayjs");
const utils = require('../../../utils/util')

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array
    },
    languageContent: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lists: [],
    oldList: []
  },

  ready() {
    this.setData({
      oldList: this.data.list
    })
    this.setList()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setList() {
      const lists = this.data.list
      // console.log(lists)
      lists.forEach(items => {
        if (items.data) {
          items.data.routes.forEach(routeItem => {
            routeItem.containers.forEach(one => {
              if (!one.movements.length) {
                items.data = ''
                return
              }
              one.movements = one.movements.reverse();
              one.movements.forEach((item, index) => {
                item.status.statusLabel = utils.formatHuoYunStatus(item.status.code)
                item.date = utils.substrTime(item.date)
                const week = new Date(item.date).getDay()
                switch (week) {
                  case 0:
                    item.week = '星期日'
                    break;
                  case 1:
                    item.week = '星期一'
                    break;
                  case 2:
                    item.week = '星期二'
                    break;
                  case 3:
                    item.week = '星期三'
                    break;
                  case 4:
                    item.week = '星期四'
                    break;
                  case 5:
                    item.week = '星期五'
                    break;
                  case 6:
                    item.week = '星期六'
                    break;
                  default:
                    break;
                }
                item.time = dayjs(item.date).format('HH:mm')
                item.dateStr = dayjs(item.date).format('YYYY-MM-DD HH:mm')
                item.date = dayjs(item.date).format('YYYY-MM-DD')
                const dayStatus = dayjs(item.date).isBefore(dayjs(), 'date')
                if (dayStatus) {
                  item.stepStatus = 'past'
                } else if (dayjs().isSame(dayjs(item.date), 'date')) {
                  item.stepStatus = 'being'
                } else {
                  if (one.movements[index - 1].stepStatus === 'past') {
                    one.movements[index - 1].stepStatus = 'being'
                  }
                  item.stepStatus = 'coming'
                }
              })
              const beingIndex = one.movements.findIndex(u => u.stepStatus === 'being')
              if (beingIndex === -1) {
                one.timeRemaining = -1;
              }
              one.currentStatus = one.movements[beingIndex > -1 ? beingIndex : one.movements.length - 1]
            })
          })
          
        }
      })
      this.setData({
        lists
      })
    },
    toDetail(e) {
      const index = e.currentTarget.dataset.index
      const routeIndex = e.currentTarget.dataset.routeindex
      const indexs = e.currentTarget.dataset.indexs
      wx.navigateTo({
        url: `/pages/OrderDetail/index?index=${index}&routeIndex=${routeIndex}&indexs=${indexs}`,
      })
    }
  }
})