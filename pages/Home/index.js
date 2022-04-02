// pages/Home/index.js
const app = getApp();
// import {routingFinder,shipmentTracking} from '../../api/modules/home';
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
    bookref: '',
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    tabList: [{
      id: 'TRACKING',
      label: 'TRACKING',
    }, {
      id: 'SCHEDULE',
      label: 'SCHEDULE',
    }, {
      id: 'PRICE',
      label: 'PRICE',
    }],
    actived: 'TRACKING',
    currentIndex: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // let parmas={
    //   placeOfDischarge:'NLRTM',
    //   placeOfLoading:'CNSHA' 
    // }
    // routingFinder(parmas).then(res=>{
    //    console.log(res.data);
    // })
    // let obj={
    //   shipmentRef:'LHV2564717',
    //   eqpid:''
    // }
    // shipmentTracking(obj).then(res=>{
    //    console.log(res.data);
    // })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    this.initLanguage();
  },
  // 切换搜索类型
  changeSearchTab(e) {
    this.setData({
      actived: e.currentTarget.dataset.type
    })
  },
  // discover切换swiper
  changeCurrentDto(e) {
    this.setData({
      currentIndex: e.detail.current
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
})