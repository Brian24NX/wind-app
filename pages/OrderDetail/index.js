// pages/OrderDetail/index.js
const dayjs = require("dayjs");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    stepList: [],
    stepCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '查询',
    })
    this.setData({
      detail: JSON.parse(decodeURIComponent(options.detail))
    })
    this.setStepList()
  },

  setStepList() {
    this.setData({
      stepList: [],
      stepCount: 0
    })
    console.log(this.data.detail)
    const list = this.data.detail.movements.reverse();
    list.forEach(item => {
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
  }
})