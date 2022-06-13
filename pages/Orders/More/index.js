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
      lists.forEach(one => {
        if (one.movements.length) {
          one.movements = one.movements.reverse();
          one.movements.forEach((item, index) => {
            item.status.statusLabel = utils.formatHuoYunStatus(item.status.code, this.data.language)
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
        }
      })
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