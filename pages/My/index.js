const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

// pages/Home/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
// pages/my/index.js
Page({
  onShareAppMessage() {
    return {
      title: 'picker-view',
      path: 'page/component/pages/picker-view/picker-view'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    content: {}, // 用于保存当前页面所需字典变了
    years,
    year:date.getFullYear(),
    months,
    month:2,
    days,
    day:2,
    value:[9999,1,1],
    date:'2022-02-23'
  },
  changeDate(e){
        this.setData({ date:e.detail.value});
  },
    
  bindChange(e){
      const val=e.detail.value
      this.setData({
         year:this.data.years[val[0]],
         month:this.data.months[val[1]],
         day:this.data.days[val[2]]
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initLanguage();
    if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
      this.getTabBar().setData({
        selected:3
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
    //中英文切换
    switchLanguage() {
      //切换当前版本，即修改公共变量中的version
      languageUtil.changLanguage()
      this.initLanguage()
    },
    //初始化语言
    initLanguage() {
      //获取当前小程序语言版本所对应的字典变量
      var lang = languageUtil.languageVersion()
      // console.log(lang)
      this.setData({
        content: lang
      })
      wx.setNavigationBarTitle({
        title: lang.lang.userCenter.mytitle
      })
      // console.log(typeof this.getTabBar === 'function' &&this.getTabBar());
      if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
        this.getTabBar().setData({
          list:lang.lang.toolbar.list //赋值
        })
      }
    },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})