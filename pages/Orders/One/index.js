const dayjs = require("dayjs");
import {
  reportToPDF
} from '../../../api/modules/home';

// pages/Orders/One/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    detail: {
      type: Object
    },
    list: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    originalData: null,
    stepList: [],
    stepCount: 0,
    timeRemaining: 0
  },

  ready: function () {
    this.setStepList();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setStepList() {
      this.setData({
        stepList: [],
        stepCount: 0,
        originalData: this.data.detail
      })
      const list = this.data.detail.movements.reverse();
      list.forEach((item, index) => {
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
        item.date = dayjs(item.date).format('YYYY-MM-DD')
        const dayStatus = dayjs(item.date).isBefore(dayjs(), 'date')
        if (dayStatus) {
          item.stepStatus = 'past'
        } else if (dayjs().isSame(dayjs(item.date), 'date')) {
          item.stepStatus = 'being'
        } else {
          if (list[index - 1].stepStatus === 'past') {
            list[index - 1].stepStatus = 'being'
          }
          item.stepStatus = 'coming'
        }
        if (item.stepStatus === 'past' || item.stepStatus === 'being') {
          this.setData({
            stepCount: ++this.data.stepCount
          })
        }
      })
      const date1 = dayjs(dayjs(list[list.length - 1].date).format('YYYY-MM-DD'))
      const date2 = dayjs().format('YYYY-MM-DD')
      const timeRemaining = parseInt(date1.diff(date2) / 1000 / 60 / 60 / 24)
      this.setData({
        stepList: list,
        timeRemaining: timeRemaining < 0 ? 0 : timeRemaining
      })
    },
    
    // PDF查看
    reportToPDF() {
      console.log(this.data.list)
      // return
      reportToPDF({
        trackingResp: this.data.list[0].data
      }).then(res => {})
    }
  }
})