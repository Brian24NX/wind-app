// pages/quotation/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
const utils = require('../../utils/util')
const dayjs = require("dayjs");
import {
  fuzzySearch,
  equitmentSizeList
} from '../../api/modules/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    languageContent: {}, // 用于保存当前页面所需字典变了
    language: 'zh',
    verifyInfo: {},
    showPol: false,
    showPod: false,
    // 卸货港
    podvalue: "",
    podcode: "",
    // 起运港
    polvalue: "",
    polcode: "",
    pollist: [],
    podlist: [],
    departureDate: '',
    equipmentType: '',
    equipmentTypeName: '',
    equipmentTypeList: [],
    weight: null,
    commodityCode: '',
    commodityName: '',
    commodityList: [],
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
    currentDate: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initLanguage();
    this.getEquitmentSizeList()
    this.setData({
      departureDate: this.getDate()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },


  onShareAppMessage: function () {},


  getEquitmentSizeList() {
    equitmentSizeList().then(res => {
      this.setData({
        equipmentTypeList: res.data
      })
    })
  },

  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    this.setData({
      languageContent: lang.lang.page.quotation,
      language: languageUtil.languageVersion().lang.page.langue,
      verifyInfo: languageUtil.languageVersion().lang.page.verifyInfo
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        list: lang.lang.toolbar.list //赋值
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
        showDelete1: true,
        showDelete2: true
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
      showDelete1: data ? true : false,
      showRemind1: false,
      showRemind2: false,
      showPol: false,
      pollist: []
    })
    if (data.length < 2) {
      return
    }
    this.setData({
      showPol: true
    })
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      this.setData({
        showPol: false
      })
      if (res.data != '') {
        this.setData({
          pollist: res.data || []
        })
      }
    })
  }, 800),

  //获取卸货港的接口处理
  changepod: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete2: data ? true : false,
      showRemind3: false,
      showRemind4: false,
      showPod: false,
      podlist: []
    })
    if (data.length < 2) {
      return
    }
    this.setData({
      showPod: true
    })
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      this.setData({
        showPod: false
      })
      if (res.data != '') {
        this.setData({
          podlist: res.data || []
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

  // 提交搜索
  submit() {
    if (this.data.showDelete1) {
      this.setData({
        showRemind1: false
      })
      var reg = /^([ ]*[A-z0-9]+([\,\;]*)){2,}$/;
      if (this.data.polvalue) {
        if (!reg.test(this.data.polvalue)) {
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
        if (!reg.test(this.data.podvalue)) {
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
  }
})