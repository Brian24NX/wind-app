// pages/Home/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '首页', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '../../assets/img/nav/1.png' // 加个背景 不加就是没有
    },
    content: {}, // 用于保存当前页面所需字典变了
    height: app.globalData.height * 2 + 20,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    language: '',
    langIndex: 0,
    currentTrackTab: 0,
    containerno: '',
    billnod: '',
    bookref: ''
  },
  changeLanguage(e) {
    let index = e.currentTarget.dataset.index
    // console.log(index)
    this.setData({ // (1)
      langIndex: index
    });
    wx.T.setLocaleByIndex(index);
    this.setLanguage();

    wx.setStorage({
      key: 'langIndex',
      data: this.data.langIndex
    })
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('我是首页')
  },
  /**
   * 滑动切换tab
   */
  bindChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
      currentTrackTab: e.detail.current
    });
  },
  /**
   * 点击tab切换
   */
  switchNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        currentTrackTab: 0
      })
    }
  },
  /**
   * 点击子tab切换
   */
  switchTab: function (e) {
    var that = this;
    console.log(e.target.dataset.current);
    if (this.data.currentTrackTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTrackTab: e.target.dataset.current
      })
    }
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
    var that = this;
    this.initLanguage();
    //下面这两句  tabbar 页面建议写onShow里，子页面建议写在onLoad里面
    this.setData({
      'langIndex': wx.getStorageSync('langIndex')
    });
    this.setData({
      'language': wx.T.getLanguage()
    })
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
    console.log(lang)
    this.setData({
      content: lang
    })
    wx.setNavigationBarTitle({
      title: lang.lang.userCenter.title
    })
    console.log(typeof this.getTabBar === 'function' &&this.getTabBar());
    if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,//这个是当前页面在导航栏中的下标
        list:lang.lang.toolbar.list //赋值
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})