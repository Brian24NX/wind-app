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
    resultlist: {}
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
  submit() {
    let week = '';
    if (this.data.week === '1 星期') {
      week = 7
    } else if (this.data.week === '2 星期') {
      week = 14
    } else if (this.data.week === '3 星期') {
      week = 21
    } else {
      week = 28
    }
    let obj = {
      placeOfDischarge: this.data.podcode,
      placeOfLoading: this.data.polcode,
      arrivalDate: this.data.search === '到达日期' ? this.data.date : '',
      departureDate: this.data.search === '离案日期' ? this.data.date : '',
      searchRange: week,
      shippingCompany: '',
    }
    routingFinder(obj).then(res => {
      if (res.code == 200) {
        this.setData({
          resultlist: res.data
        })
        if (res.data.againReq) {
          let obj2 = {
            placeOfDischarge: this.data.podcode,
            placeOfLoading: this.data.polcode,
            arrivalDate: this.data.search === '到达日期' ? this.data.date : '',
            departureDate: this.data.search === '离案日期' ? this.data.date : '',
            searchRange: week,
            shippingCompany: '0015'
          }
          routingFinder(obj2).then(data => {
            console.log(data)
            this.data.resultlist.apl = data.data.apl;
            this.data.resultlist.routings = this.data.resultlist.routings.concat(data.data.routings)
            this.data.resultlist.solutionServices.apl = data.data.solutionServices.apl
            this.setData({
              resultlist: this.data.resultlist
            })
            this.setHistory(obj)
          })
        } else {
          this.setHistory(obj)
        }
      } else {
        this.setData({
          podvalue: '',
          polvalue: '',
        })
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  setHistory(obj) {
    wx.setStorageSync('resultlist', this.data.resultlist);
    wx.setStorageSync('searchKey', {
      placeOfDischarge: obj.placeOfDischarge,
      placeOfLoading: obj.placeOfLoading,
      searchRange: obj.searchRange,
      search: this.data.search,
      searchDate: this.data.date
    })
    let history = this.data.array;
    let polpleace = this.data.polvalue;
    let podpleace = this.data.podvalue;
    let str = polpleace + '-' + podpleace;
    if (history.length == 6) {
      history.shift();

    }
    history.push(str);
    this.setData({
      array: history,
      podvalue: '',
      polvalue: '',
    })
    wx.navigateTo({
      url: '../Result/index',
    })
  },
  //获取卸货港的接口处理
  changepod: utils.debounce(function (e) {
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
  changepol: utils.debounce(function (e) {
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
      polvalue: this.data.pollist[index].point,
      polcode: this.data.pollist[index].pointCode
    })
  },
  // 卸货港
  changepodname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      viewShowedPod: false,
      podvalue: this.data.podlist[index].point,
      podcode: this.data.podlist[index].pointCode
    })
  },
  onClose(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let history = this.data.array;
    history.splice(index, 1)
    this.setData({
      array: history
    })
  },
  deleteall() {
    let history = this.data.array;
    history = [];
    this.setData({
      array: history
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: this.getDate(),
      search: '离案日期'
    })
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
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