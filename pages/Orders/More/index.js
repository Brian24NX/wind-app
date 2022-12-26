// pages/Orders/More/index.js
const dayjs = require("dayjs");
const utils = require('../../../utils/util')
const languageUtils = require('../../../utils/languageUtils')

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
    results: {
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
    language: 'zh',
  },

  ready() {
    this.setData({
      language: languageUtils.languageVersion().lang.page.langue
    })
    this.setList()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setList() {
      const lists = this.data.list
      console.log("More组件==>",lists)
      lists.forEach(one => {
        if (one.movement.length) {
          let statusLabel 
          one.movement = one.movement.reverse();
          one.movement.forEach((item, index) => {
             item.statusLabel = utils.formatHuoYunStatus(item.carrierSpecificData.internalEventCode, this.data.language)
             statusLabel = utils.formatHuoYunStatus(item.carrierSpecificData.internalEventCode, this.data.language)
            const dayStatus = dayjs(item.eventDateTime).isBefore(dayjs(), 'date')
            if (dayStatus) {
              item.stepStatus = 'past'
            } else if (dayjs().isSame(dayjs(item.eventDateTime), 'date')) {
              item.stepStatus = 'being'
            } else {
              if (one.movement[index - 1].stepStatus === 'past') {
                one.movement[index - 1].stepStatus = 'being'
              }
              item.stepStatus = 'coming'
            }
          })
          // console.log("More组件 one.movement==>",statusLabel,one.movement)
          const beingIndex = one.movement.findIndex(u => u.stepStatus === 'being')
          if (beingIndex === -1) {
            one.timeRemaining = -1;
          }
          one.currentStatus = one.movement[beingIndex > -1 ? beingIndex : one.movement.length - 1]
        }
      })
      // console.log("MORE lists ==>",lists)
      this.setData({
        lists
      })
    },

    toDetail(e) {
      const index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: `/pages/OrderDetail/index?index=${index}`,
      })
    }
  }
})