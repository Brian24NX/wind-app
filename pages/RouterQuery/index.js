// pages/RouterQuery/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
const utils = require('../../utils/util')
const dayjs = require("dayjs");
import {
  fuzzySearch,
  // routingFinder
} from '../../api/modules/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典
    language: 'zh',
    verifyInfo: {},
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    showPol: false,
    polCount:0,
    showPod: false,
    podCount:0,
    // 卸货港
    podvalue: "",
    podcode: "",
    // 起运港
    polvalue: "",
    polcode: "",
    array: [],
    pollist: [],
    podlist: [],
    searchlist: [],
    // search 离案
    search: '',
    searchName: '',
    // week  
    week: 3,
    weekName: '',
    weeklist: [],
    date: '',
    resultlist: {},
    showRemind1: false,
    showRemind2: false,
    showRemind3: false,
    showRemind4: false,
    showDelete1: false,
    showDelete2: false,
    columns: [],
    valueKey: '',
    showPopup: false,
    popupType: 1,
    defaultIndex: 0,
    showDatePopup: false,
    currentDate: null,
    showOverlay: false,
    showDropdown: {
      pol: false,
      pod: false,
    },
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initLanguage()
    this.setDefaultLocation()
  },

  onShareAppMessage: function () {},

  //初始化语言
  initLanguage() {
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.scheduleSearching,
      language: languageUtil.languageVersion().lang.page.langue,
      verifyInfo: languageUtil.languageVersion().lang.page.verifyInfo
    })
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.homeInfo.SCHEDULE
    })
    if (languageUtil.languageVersion().lang.page.langue === 'en') {
      this.setData({
        searchlist: [{
          id: 0,
          method: "Departure"
        }, {
          id: 1,
          method: "Arrival"
        }],
        weeklist: [{
          id: 1,
          weeks: '1 Week'
        }, {
          id: 2,
          weeks: '2 Weeks'
        }, {
          id: 3,
          weeks: '3 Weeks'
        }, {
          id: 4,
          weeks: '4 Weeks'
        }]
      })
    } else {
      this.setData({
        searchlist: [{
          id: 0,
          method: "离港时间"
        }, {
          id: 1,
          method: "到港时间"
        }],
        weeklist: [{
          id: 1,
          weeks: '1 星期'
        }, {
          id: 2,
          weeks: '2 星期'
        }, {
          id: 3,
          weeks: '3 星期'
        }, {
          id: 4,
          weeks: '4 星期'
        }]
      })
    }
  },

  // 设置默认起运卸货港
  setDefaultLocation() {
    let location = wx.getStorageSync('location')
    this.setData({
      date: this.getDate(),
      search: 0,
      searchName: this.data.searchlist[0].method,
      weekName: this.data.weeklist[2].weeks,
      array: location,
      pollist: [],
      podlist: []
    })
    if (wx.getStorageSync('setHangXian')) {
      let polobject = wx.getStorageSync('polobject')
      let podobject = wx.getStorageSync('podobject')
      this.setData({
        polvalue: polobject.polvalue,
        podvalue: podobject.podvalue,
        polcode: polobject.polcode,
        podcode: podobject.podcode,
        showDelete1: polobject.polvalue ? true : false,
        showDelete2: podobject.podvalue ? true : false
      })
      wx.setStorageSync('setHangXian', false)
      wx.removeStorageSync('polobject')
      wx.removeStorageSync('podobject')
    }
  },

  getlocation(e) {
    let index = e.currentTarget.dataset.index;
    let location = this.data.array[index].name;
    let pollocation = location.split("-")[0];
    let podlocation = location.split("-")[1];
    let polcode = this.data.array[index].polCode;
    let podcode = this.data.array[index].podCode;
    this.setData({
      podcode: podcode,
      polcode: polcode,
      podvalue: podlocation,
      polvalue: pollocation,
      showRemind1: false,
      showRemind2: false,
      showRemind3: false,
      showRemind4: false,
      showDelete1: true,
      showDelete2: true
    })
  },

  //获取起始港的接口处理
  changepol: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete1: !!data,
      showRemind1: false,
      showRemind2: false,
      showPol: false,
      polCount:0,
      pollist: []
    })
    if (data.length < 2) {
      this.setData({
        pollist: []
      })
      return
    }else{
      this.getPolData(data)
      this.showDropdown(e[0].currentTarget.id || 'pol')}
  }, 800),

  getPolData(data) {
    this.setData({
      showPol: true
    })
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      this.setData({
        showPol: false,
        polCount:0,
      })
      if (res.data != ''||res.data==undefined) {
        this.setData({
          pollist: res.data || []
        })
      }else{
        this.hideDropdown()
      }
    }, () => {
      this.data.polCount++
      if(this.data.polCount<=3){
        this.getPolData(data)
      }else{
        this.setData({
          showPol: false,
          polCount:0,
        })
        this.hideDropdown()
      }
    })
  },

  //获取卸货港的接口处理
  changepod: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete2: !!data,
      showRemind3: false,
      showRemind4: false,
      showPod: false,
      podCount:0,
      podlist: []
    })
    if (data.length < 2) {
      this.setData({
        podlist: []
      })
      return
    }else{
    this.getPodData(data)
    this.showDropdown(e[0].currentTarget.id || 'pod')
    }
  }, 800),

  getPodData(data) {
    this.setData({
      showPod: true
    })
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      this.setData({
        showPod: false,
        podCount:0,
      })
      if (res.data != ''||res.data==undefined) {
        this.setData({
          podlist: res.data || []
        })
      }else{
        this.hideDropdown()
      }
    }, () => {
      this.data.podCount++
      if(this.data.podCount<=3){
        this.getPodData(data)
      }else{
        this.setData({
          showPod: false,
          podCount:0,
        })
        this.hideDropdown()
      }
    })
  },

  deleteValue(e) {
    const type = e.currentTarget.dataset.type
    if (type === '1') {
      this.setData({
        polvalue: '',
        polcode: '',
        pollist: [],
        showDelete1: false,
        showRemind1: false,
        showRemind2: false
      })
    } else {
      this.setData({
        podvalue: '',
        podcode: '',
        podlist: [],
        showDelete2: false,
        showRemind3: false,
        showRemind4: false
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
    this.hideDropdown()
  },

  // 卸货港
  changepodname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      podvalue: this.data.podlist[index].point,
      podcode: this.data.podlist[index].pointCode,
      podlist: []
    })
    this.hideDropdown()
  },

  openPopup(e) {
    if (e.currentTarget.dataset.type === '2') {
      const date = this.data.date.replaceAll('-', '/')
      this.setData({
        currentDate: new Date(date).getTime(),
        showDatePopup: true
      })
      return
    }
    this.setData({
      popupType: e.currentTarget.dataset.type,
      columns: e.currentTarget.dataset.type === '1' ? this.data.searchlist : this.data.weeklist,
      valueKey: e.currentTarget.dataset.type === '1' ? 'method' : 'weeks',
      defaultIndex: e.currentTarget.dataset.type === '1' ? this.data.search : this.data.week - 1,
      showPopup: true
    })
  },

  onClose() {
    this.setData({
      popupType: '',
      columns: [],
      valueKey: '',
      showPopup: false
    })
  },

  onConfirm(e) {
    if (this.data.popupType === '1') {
      this.setData({
        search: e.detail.id,
        searchName: e.detail.method
      })
    } else {
      this.setData({
        week: e.detail.id,
        weekName: e.detail.weeks
      })
    }
    this.onClose()
  },

  closeDate() {
    this.setData({
      showDatePopup: false
    })
  },

  confirmDate(e) {
    this.setData({
      date: dayjs(e.detail).format('YYYY-MM-DD'),
      showDatePopup: false
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

  isAdsValid(str){
    let reg = /^([A-z0-9\,\.\-\/\s]+[A-z0-9]+[\;]){2}([A-z0-9]+)$/;
    return reg.test(str); 
  },

  // 提交搜索
  submit() {
    if (this.data.showDelete1) {
      this.setData({
        showRemind1: false
      })
      // var reg = /^([ ]*[A-z0-9]+([\,\.\-\;]*)){2,}$/;
      if (this.data.polvalue) {
        if (!this.isAdsValid(this.data.polvalue)) {
          this.setData({
            showRemind2: true
          })
        } else {
          this.setData({
            showRemind2: false
          })
        }
      } else {
        this.setData({
          showRemind1: false,
          showRemind2: true
        })
      }
    } else {
      this.setData({
        showRemind1: true,
        showRemind2: false
      })
    }

    if (this.data.showDelete2) {
      this.setData({
        showRemind3: false
      })
      if (this.data.podvalue) {
        if (!this.isAdsValid(this.data.podvalue)) {
          this.setData({
            showRemind4: true
          })
        } else {
          this.setData({
            showRemind4: false
          })
        }
      } else {
        this.setData({
          showRemind4: true
        })
      }
    } else {
      this.setData({
        showRemind3: true,
        showRemind4: false
      })
    }
    if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4) return
    this.setHistory()
  },

  // 设置历史查询
  setHistory(obj) {
    // wx.setStorageSync('resultlist', this.data.resultlist);
    wx.setStorageSync('searchKey', {
      placeOfDischarge: this.data.podcode,
      podvalue: this.data.podvalue.split(';')[0],
      podCode: this.data.podvalue.split(';')[1],
      placeOfLoading: this.data.polcode,
      polCode: this.data.polvalue.split(';')[1],
      polvalue: this.data.polvalue.split(';')[0],
      searchRange: this.data.week * 7,
      search: this.data.search,
      searchDate: this.data.date
    })
    let history = this.data.array || [];
    let polpleace = this.data.polvalue;
    let podpleace = this.data.podvalue;
    let str = polpleace + '-' + podpleace;
    if (history.findIndex(item => item.name === str) === -1) {
      if (history.length == 6) {
        history.pop();
      }
      history.unshift({
        name: str,
        polCode: this.data.polcode,
        podCode: this.data.podcode
      });
      this.setData({
        array: history,
      })
      wx.setStorageSync('location', this.data.array);
    }
    wx.navigateTo({
      url: '/pages/Result/index',
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

  showDropdown(id) {
    var key = 'showDropdown.' + id
    this.setData({
      [key]: true,
      showOverlay: true
    })
  },

  hideDropdown(e) {
    this.setData({
      showDropdown: {
        pol: false,
        pod: false,
      },
      showOverlay: false
    })
  },
})