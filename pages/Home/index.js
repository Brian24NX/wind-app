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
      label: '货物追踪',
    }, {
      id: 'SCHEDULE',
      label: '船期查询',
    }, {
      id: 'PRICE',
      label: '获取报价',
    }],
    actived: 'TRACKING',
    currentIndex: 0,
    huoGuiValue: '',
    showRemind: false,
    qiYunValue: '',
    showRemind2: false,
    xieHuoValue: '',
    showRemind3: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {},
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
      actived: e.currentTarget.dataset.type,
      showRemind: false,
      showRemind2: false,
      showRemind3: false
    })
  },
  // discover切换swiper
  changeCurrentDto(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  setHuoGui(e) {
    this.setData({
      huoGuiValue: e.detail.value,
      showRemind: e.detail.value ? false : true
    })
  },
  // 获取追踪
  toHuoWu() {
    if (this.data.showRemind) {
      return
    }
    if (!this.data.huoGuiValue) {
      this.setData({
        showRemind: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/Orders/index',
    })
  },
  // 设置起运港
  setQiYun(e) {
    console.log(e)
    this.setData({
      qiYunValue: e.detail.value,
      showRemind2: e.detail.value ? false : true
    })
  },
  // 设置卸货港
  setXieHuo(e) {
    this.setData({
      xieHuoValue: e.detail.value,
      showRemind3: e.detail.value ? false : true
    })
  },
  // 船期搜索
  toChuanQi() {
    if (this.data.showRemind2 || this.data.showRemind3) {
      return
    }
    if (!this.data.qiYunValue && !this.data.xieHuoValue) {
      this.setData({
        showRemind2: true,
        showRemind3: true
      })
      return
    }
    if (!this.data.qiYunValue) {
      this.setData({
        showRemind2: true
      })
      return
    }
    if (!this.data.xieHuoValue) {
      this.setData({
        showRemind3: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/Orders/index',
    })
  },
  // 高级查询
  toAdvancedSearch() {
    wx.switchTab({
      url: '/pages/Query/index',
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
        list: lang.lang.toolbar.list //赋值
      })
    }
  },
})