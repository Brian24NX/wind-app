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
    podcode: "",
    // 起运港
    polvalue: "",
    polcode: "",
    array: [],
    pollist: [],
    podlist: [],
    searchlist: [{
      id: 0,
      method: "离港时间"
    }, {
      id: 1,
      method: "到港时间"
    }],
    // search 离案
    search: '',
    // week  
    week: '3 星期',
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
    resultlist: {},
    showRemind1: false,
    showRemind2: false,
    showRemind3: false,
    showRemind4: false,
    showDelete1: false,
    showDelete2: false
  },
  getlocation(e) {
    let index = e.currentTarget.dataset.index;
    let location = this.data.array[index];
    let pollocation = location.split("-")[0];
    let podlocation = location.split("-")[1];
    let polcode = pollocation.split(";")[2];
    let podcode = podlocation.split(";")[2];
    this.setData({
      podcode: podcode,
      polcode: polcode,
      podvalue: podlocation,
      polvalue: pollocation,
      showRemind1: false,
      showRemind2: false,
      showRemind3: false,
      showRemind4: false
    })
  },
  changemethod(e) {
    let index = e.detail.id;
    this.setData({
      search: this.data.searchlist[index].method
    })
  },
  changeweek(e) {
    let index = e.detail.id;
    this.setData({
      week: this.data.weeklist[index].weeks
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
  // 提交搜索
  submit() {
    if (!this.data.polvalue || !this.data.podvalue) {
      if (!this.data.polvalue) {
        this.setData({
          showRemind1: true
        })
      } else {
        this.setData({
          showRemind1: false
        })
      }
      if (!this.data.podvalue) {
        this.setData({
          showRemind3: true
        })
      } else {
        this.setData({
          showRemind3: false
        })
      }
    } else {
      this.setData({
        showRemind1: false,
        showRemind3: false
      })
    }
    var reg = /^([ ]*[A-z0-9]+([\,\;]*)){2,}$/;
    if (!this.data.showRemind1) {
      if (!reg.test(this.data.polvalue)) {
        this.setData({
          showRemind2: true
        })
      } else {
        this.setData({
          showRemind2: false
        })
      }
    }
    if (!this.data.showRemind3) {
      if (!reg.test(this.data.podvalue)) {
        this.setData({
          showRemind4: true
        })
      } else {
        this.setData({
          showRemind4: false
        })
      }
    }
    if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4) return
    this.setHistory()
    // let week = '';
    // if (this.data.week === '1 星期') {
    //   week = 7
    // } else if (this.data.week === '2 星期') {
    //   week = 14
    // } else if (this.data.week === '3 星期') {
    //   week = 21
    // } else {
    //   week = 28
    // }
    // let obj = {
    //   placeOfDischarge: this.data.podcode,
    //   placeOfLoading: this.data.polcode,
    //   arrivalDate: this.data.search === '到港时间' ? this.data.date : '',
    //   departureDate: this.data.search === '离港时间' ? this.data.date : '',
    //   searchRange: week,
    //   shippingCompany: '',
    // }
    // routingFinder(obj).then(res => {
    //   if (res.code == 200) {
    //     this.setData({
    //       resultlist: res.data
    //     })
    //     if (res.data.againReq) {
    //       let obj2 = {
    //         placeOfDischarge: this.data.podcode,
    //         placeOfLoading: this.data.polcode,
    //         arrivalDate: this.data.search == '到港时间' ? this.data.date : '',
    //         departureDate: this.data.search == '离港时间' ? this.data.date : '',
    //         searchRange: week,
    //         shippingCompany: '0015'
    //       }
    //       routingFinder(obj2).then(data => {
    //         console.log(data)
    //         if (JSON.stringify(data.data) == '{}') {
    //           this.setHistory(obj)
    //           return
    //         }
    //         this.data.resultlist.apl = data.data.apl;
    //         this.data.resultlist.routings = this.data.resultlist.routings.concat(data.data.routings)
    //         this.data.resultlist.solutionServices.apl = data.data.solutionServices.apl
    //         this.setData({
    //           resultlist: this.data.resultlist
    //         })
    //         this.setHistory(obj)
    //       })
    //     } else {
    //       this.setHistory(obj)
    //     }
    //   } else {
    //     this.setHistory(obj)
    //     wx.showToast({
    //       title: res.message,
    //       icon: 'none',
    //       duration: 3000
    //     })
    //   }
    // })
  },
  // 设置历史查询
  setHistory(obj) {
    wx.setStorageSync('searchKey', {
      placeOfDischarge: this.data.podcode,
      podvalue: this.data.podvalue.split(';')[0],
      podCode: this.data.podvalue.split(';')[1],
      placeOfLoading: this.data.polcode,
      polCode: this.data.polvalue.split(';')[1],
      polvalue: this.data.polvalue.split(';')[0],
      searchRange: Number(this.data.week.split(' ')[0]) * 7,
      search: this.data.search == '到港时间' ? 0 : 1,
      searchDate: this.data.date
    })
    let history = this.data.array || [];
    let polpleace = this.data.polvalue;
    let podpleace = this.data.podvalue;
    let str = polpleace + '-' + podpleace;
    if (history.findIndex(item => item === str) === -1) {
      if (history.length == 6) {
        history.pop();
      }
      history.unshift(str);
      this.setData({
        array: history,
      })
      wx.setStorageSync('location', this.data.array);
    }
    wx.navigateTo({
      url: '/pages/Result/index',
    })
  },
  //获取卸货港的接口处理
  changepod: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete2: data ? true : false
    })
    if (data.length < 2) {
      this.setData({
        podlist: []
      })
      return
    }
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      if (res.data != '') {
        this.setData({
          podlist: res.data || []
        })
      } else {
        // this.setData({
        //   podvalue: data
        // })
      }
    })
  }, 800),
  //获取起始港的接口处理
  changepol: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete1: data ? true : false
    })
    if (data.length < 2) {
      this.setData({
        pollist: []
      })
    }
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      console.log(res)
      if (res.data != '') {
        this.setData({
          pollist: res.data || []
        })
      }
    })
  }, 800),
  deleteValue(e) {
    const type = e.currentTarget.dataset.type
    if (type === '1') {
      this.setData({
        polvalue: '',
        polcode: '',
        pollist: [],
        showDelete1: false
      })
    } else {
      this.setData({
        podvalue: '',
        podcode: '',
        podlist: [],
        showDelete2: false
      })
    }
  },
  // 起始港选择
  changepolname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      polvalue: this.data.pollist[index].point,
      polcode: this.data.pollist[index].pointCode,
      pollist: [],
    })
  },
  // 卸货港
  changepodname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      podvalue: this.data.podlist[index].point,
      podcode: this.data.podlist[index].pointCode,
      podlist: []
    })
  },
  onclose(e) {
    let index = e.currentTarget.dataset.index;
    let history = this.data.array;
    history.splice(index, 1)
    this.setData({
      array: history
    })
    wx.setStorageSync('location', history)
  },
  deleteall() {
    let history = this.data.array;
    history = [];
    this.setData({
      array: history
    })
    wx.removeStorageSync('location')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let location = wx.getStorageSync('location')
    this.setData({
      date: this.getDate(),
      search: '离港时间',
      array: location,
      pollist: [],
      podlist: []
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
    if (wx.getStorageSync('setHangXian')) {
      let polobject = wx.getStorageSync('polobject')
      let podobject = wx.getStorageSync('podobject')
      this.setData({
        polvalue: polobject.polvalue,
        podvalue: podobject.podvalue,
        polcode: polobject.polcode,
        podcode: podobject.podcode,
        showDelete1: true,
        showDelete2: true
      })
      wx.setStorageSync('setHangXian', false)
      wx.removeStorageSync('polobject')
      wx.removeStorageSync('podobject')
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
    console.log(typeof this.getTabBar === 'function' && this.getTabBar());
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
      })
    }
  },
})