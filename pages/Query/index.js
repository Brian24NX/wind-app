// pages/query/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
const utils = require('../../utils/util')
import {
  fuzzySearch,
  routingFinder
} from '../../api/modules/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {}, // 用于保存当前页面所需字典变了
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    viewShowedPol: false,
    viewShowedPod: false,
    // 卸货港
    podvalue: "",
    // 起运港
    polvalue: "",
    array: [{
        location: 'guangzhou-shanghai'
      },
      {
        location: 'guangzhou-yangzhou'
      },
      {
        location: 'guangzhou-suzhou'
      }
    ],
    pollist: [],
    podlist: [],
    searchlist: [{
      id: 0,
      method: "离岸"
    }, {
      id: 1,
      method: "到达"
    }],
    // search
    search: '',
    // week
    week: '',
    weeklist: [{
      id: 0,
      weeks: '1 星期'
    }, {
      id: 1,
      weeks: '2 星期'
    }, {
      id: 2,
      weeks: '3 星期'
    }, {
      id: 3,
      weeks: '4 星期'
    }],
    date: '',
  },
  changemethod(e) {
    let index = e.detail.id;
    this.setData({
      search: this.data.searchlist[index].method
    })
    console.log(this.data.search)
  },
  changeweek(e) {
    let index = e.detail.id;
    this.setData({
      search: this.data.weeklist[index].week
    })
  },
  getDate() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = now.getDate();
    day = day < 10 ? ('0' + day) : day
    return year + '-' + month + '-' + day;
  },
  bindTimeChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  submit() {
    let obj = {
      placeOfDischarge: this.data.podvalue || 'AUMEL',
      placeOfLoading: this.data.polvalue || 'CNSHA',
      arrivalDate: '',
      departureDate: '',
      searchRange: this.data.week || this.data.week,
      shippingCompany: '',
    }
    routingFinder(obj).then(res => {
      if (res.code == 200) {
        wx.setStorageSync('resultlist', res.data);
        wx.navigateTo({
          url: '../Result/index',
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    })

  },
  //获取卸货港的接口处理
  changepod: utils.debounce(function(e) {
    const data = e['0'].detail.value
    if (data.length < 2) return
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      console.log(res)
      this.setData({
        podlist: res.data || []
      })
    })
    this.setData({
      viewShowedPod: true,
      // polvalue: ""
    })
  }, 500),
  // changepod(e) {
  //   let obj = {
  //     searchStr: e.detail.value
  //   }
  //   fuzzySearch(obj).then(res => {
  //     this.setData({
  //       podlist: res.data
  //     })
  //   })
  //   this.setData({
  //     viewShowedPod: true,
  //     podvalue: ""
  //   })
  // },
  //获取起始港的接口处理
  changepol: utils.debounce(function(e) {
    const data = e['0'].detail.value
    if (data.length < 2) return
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      console.log(res)
      this.setData({
        pollist: res.data || []
      })
    })
    this.setData({
      viewShowedPol: true,
      // polvalue: ""
    })
  }, 500),
  // changepol(e) {
  //   let obj = {
  //     searchStr: e.detail.value
  //   }
  //   fuzzySearch(obj).then(res => {
  //     this.setData({
  //       pollist: res.data
  //     })
  //   })
    // this.setData({
    //   viewShowedPol: true,
    //   polvalue: ""
    // })
  // },
  // 起始港选择
  changepolname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      viewShowedPol: false,
      polvalue: this.data.pollist[index].point
    })
  },
  // 卸货港
  changepodname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      viewShowedPod: false,
      podvalue: this.data.podlist[index].point
    })
  },
  change(e) {
    console.log(e.detail.id);
  },
  onClose(index) {
    console.log('删除')
  },
  deleteall() {
    this.setData({
      array: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: this.getDate()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initLanguage();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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
      title: lang.lang.userCenter.querytitle
    })
    console.log(typeof this.getTabBar === 'function' && this.getTabBar());
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },
})