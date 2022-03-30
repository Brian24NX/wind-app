// pages/Home/index.js
const app = getApp();
import {routingFinder,shipmentTracking} from '../../api/modules/home';
var languageUtil = require('../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {}, // 用于保存当前页面所需字典变了
    currentTab: 0,
    currentTrackTab: 0,
    containerno: '',
    billnod: '',
    bookref: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let parmas={
      placeOfDischarge:'NLRTM',
      placeOfLoading:'CNSHA' 
    }
    routingFinder(parmas).then(res=>{
       console.log(res.data);
    })
    let obj={
      shipmentRef:'LHV2564717',
      eqpid:''
    }
    shipmentTracking(obj).then(res=>{
       console.log(res.data);
    })
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
    this.setData({
      content: lang
    })
    wx.setNavigationBarTitle({
      title: lang.lang.userCenter.hometitle
    })
    if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
      this.getTabBar().setData({
        selected:0,
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