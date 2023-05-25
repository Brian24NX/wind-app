// pages/Home/index.js
const app = getApp();
import {
  fuzzySearch
} from '../../api/modules/home';
var languageUtil = require('../../utils/languageUtils')
const utils = require('../../utils/util')
const dayjs = require("dayjs")
const config = require('../../config/config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典
    load: {},
    verifyInfo: {},
    currentTab: 0,
    currentTrackTab: 0,
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    showHis: false,
    showOverlay: false,
    showDropdown: {
      pol: false,
      pod: false,
    },
    searchHis: [],
    tabList: [{
      id: 'TRACKING'
    }, {
      id: 'SCHEDULE'
    }, {
      id: 'PRICE'
    }],
    actived: 'TRACKING',
    currentIndex: 0,
    huoGuiValue: '', //BCC0186925   CDDU9420999  TTNU8257966,CXRU1614539
    showRemind: false,
    qiYunValue: '',
    qiYunCode: '',
    showRemind2: false,
    xieHuoValue: '',
    xieHuoCode: '',
    showPol: false,
    polCount:0,
    showPod: false,
    podCount:0,
    showRemind3: false,
    showRemind4: false,
    showRemind5: false,
    codePolList: [],
    codePodList: [],
    resultlist: {},
    swiperindex: 0,
    showDelete1: false,
    showDelete2: false,
    priceList: [{
      label: 'instantQuote',
      type: 'switch',
      url: '/pages/Quotation/Search/index',
      icon: '/assets/img/home/PRICE_1@2x.png',
      needLogin: false
    }, {
      label: 'DDCharges',
      type: 'nav',
      url: '/packagePrice/pages/calculatedCharges/index',
      icon: '/assets/img/menu/D&D@2x.png',
      needLogin: true
    }, {
      label: 'chargeFinder',
      type: 'nav',
      url: '/packagePrice/pages/chargeFinder/index',
      icon: '/assets/img/home/PRICE_3@2x.png',
      needLogin: false
    }],
    moreMenuList: [
      [{
          id: 'cma',
          type: 1,
          icon: '/assets/img/home/discover_1@2x.png',
          url: '/packageMore/pages/cma/list/index'
        },
        {
          id: 'about',
          type: 5,
          icon: '/assets/img/home/discover_2@2x.png',
          url: '/packageMore/pages/about/index'
        },
        // {
        //   id: 'tariff',
        //   type: 2,
        //   icon: '/assets/img/home/tariffBook.png',
        //   url: '/packagePrice/pages/guizufeilv/index'
        // },
        {
          id: 'news',
          type: 2,
          icon: '/assets/img/home/discover_3@2x.png',
          url: '/packageMore/pages/news/list/index'
        },
        {
          id: 'onlineServices',
          type: 6,
          icon: '/assets/img/home/discover_4@2x.png',
          url: '/packageMore/pages/Faq/index'
        }
      ],
      [
        {
          id: 'valueAddedService',
          type: 3,
          icon: '/assets/img/home/customernotice@2x.png',
          url: '/packageMore/pages/BusinessAndOperational/list/index'
        },
        {
          id: 'template',
          type: 7,
          icon: '/assets/img/home/templatelinks@2x.png',
          url: '/packageMore/pages/usefulTemplateAndLink/index'
        },
        {
          id: 'gzp',
          type: 4,
          icon: '/assets/img/home/controllproduct@2x.png',
          url: '/packageMore/pages/sanctionCheck/list/index'
        },
        {
          id: 'callMe',
          type: 8,
          icon: '/assets/img/home/contact@2x.png',
          url: '/packageMore/pages/contact/conditions/index'
        },
      ]
    ],
    showLegalRemind: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initLanguage();
    if (options.actived) {
      this.setData({
        actived: options.actived
      })
    }
    var transMode = {
      'RD': {
        code: 'RD',
        label: 'Road',
        zhLabel: '陆地',
        icon: '/assets/img/result/road.png',
      },
      'BA': {
        code: 'BA',
        label: 'Barge',
        zhLabel: '驳船',
        icon: '/assets/img/result/barge.png',
      },
      'RL': {
        code: 'RL',
        label: 'Rail',
        zhLabel: '铁道',
        icon: '/assets/img/result/rail.png',
      },
      'RR': {
        code: 'RR',
        label: 'Rail / Road',
        zhLabel: '铁路/公路',
        icon: '/assets/img/result/railTruck.png',
      },
      'BR': {
        code: 'BR',
        label: 'Barge / Road',
        zhLabel: '驳船/公路',
        icon: '/assets/img/result/bargeRoad.png',
      }
    }
    wx.setStorageSync('transMode', transMode);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      searchHis: wx.getStorageSync('trackSearchHis')
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
        list: languageUtil.languageVersion().lang.toolbar.list //赋值
      })
    }
  },

  onShareAppMessage: function () {},

  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.homeInfo,
      verifyInfo: languageUtil.languageVersion().lang.page.verifyInfo,
      load: languageUtil.languageVersion().lang.page.load
    })
  },

  // 切换搜索类型
  changeSearchTab(e) {
    this.setData({
      actived: e.currentTarget.dataset.type,
      showRemind: false,
      huiguiType: 1,
      showRemind2: false,
      showRemind3: false,
      showRemind4: false,
      showRemind5: false
    })
  },

  // discover切换swiper
  changeCurrentDto(e) {
    this.setData({
      swiperindex: e.detail.current
    })
  },

  clearInput(e) {
    const type = e.currentTarget.dataset.type
    if (type === '1') {
      this.setData({
        huoGuiValue: '',
        showRemind: false,
        huiguiType: 1
      })
    } else if (type === '2') {
      this.setData({
        qiYunValue: '',
        qiYunCode: '',
        codePolList: [],
        showRemind5: false,
        showRemind2: false,
        showDelete1: false
      })
    } else {
      this.setData({
        xieHuoValue: '',
        xieHuoCode: '',
        codePodList: [],
        showRemind4: false,
        showRemind3: false,
        showDelete2: false
      })
    }
  },

  setHuoGui(e) {
    //去掉空格和大写问题
    let value = e.detail.value.toUpperCase()
    let regvalue = value.trim()
    this.setData({
      huoGuiValue: value.replaceAll('，', ',')
    })
    if (!value) {
      this.setData({
        showRemind: true,
        huiguiType: 1
      })
      return
    }
    var reg = /^([ ]*[A-z0-9]+([\,\，]*)){0,3}$/;
    // 不包含，类型的数据
    if (!reg.test(regvalue)) {
      this.setData({
        // huoGuiValue: value,
        showRemind: true,
        huiguiType: value.split(',').length > 3 ? 3 : 2
      })
      return
    }
    const value2 = (value.substr(value.length - 1, 1) === ',' || value.substr(value.length - 1, 1) === '，') ? value.substr(0, value.length - 1) : value
    if (value2.split(',').length >= 2 && value2.split(',').length <= 3) {
      const arr = value2.split(',').map(item => item.trim())
      var newArr = arr.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
      if (newArr.length !== arr.length) {
        this.setData({
          showRemind: true,
          huiguiType: 4
        })
        return
      }
    }
    this.setData({
      showRemind: false
    })
  },

  // 货物追踪
  toHuoWu() {
    this.hideSearchHis()
    if (this.data.showRemind) {
      return
    }
    if (!this.data.huoGuiValue || this.data.huoGuiValue.replace(/\s*/g,"") === '' ) {
      this.setData({
        showRemind: true,
        huiguiType: 1
      })
      return
    }
    const huoguiStr = this.data.huoGuiValue.replaceAll(' ', '')
    const huogui = (huoguiStr.charAt(huoguiStr.length - 1) === ',' ? huoguiStr.substr(0, huoguiStr.length - 2) : huoguiStr).split(',')
    var reg = /[A-Z]{3}[UJZ][0-9]{7}$/;
    const checkRes = []
    var serList = this.data.searchHis ? this.data.searchHis: []

    huogui.forEach(item => {
      var noSpaceItem = item.replace(/\s*/g,"")
      checkRes.push(reg.test(noSpaceItem))
      var idx = serList.indexOf(noSpaceItem)
      if(idx !== -1){
        serList.splice(idx,1)
        serList.unshift(noSpaceItem)
      }else if(noSpaceItem !== '' && idx === -1 ){
        if(serList.length < 5){
          serList.unshift(noSpaceItem)
        }else{
          serList.unshift(noSpaceItem)
          serList.splice(serList.length-1,1)
        }
      }
    })

    if (checkRes.length > 1 && checkRes.filter(i => i).length !== checkRes.length) {
      this.setData({
        huiguiType: 5,
        showRemind: true
      })
      return
    }

    let newHis = [...new Set(serList)]
    this.setData({
      searchHis: newHis
    })

    wx.setStorageSync('trackSearchHis', this.data.searchHis);
    wx.navigateTo({
      url: `/pages/Orders/index?str=${this.data.huoGuiValue.replaceAll(' ', '')}`
    })
  },

  // 设置起运港
  setQiYun: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete1: !!data,
      showRemind2: false,
      showRemind5: false,
      showPol: false,
      polCount:0,
      codePolList: []
    })
    if (data.length < 2) {
      this.setData({
        codePolList: []
      })
      return
    }else{
      this.getPolData(data)
      this.showDropdown(e[0].currentTarget.id || 'pol')
    }
    
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
        polCount:0
      })
      if (res.data != ''||res.data==undefined) {
        this.setData({
          codePolList: res.data
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
          polCount:0
        })
        this.hideDropdown()
      }
    })
  },

  // 设置卸货港
  setXieHuo: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete2: !!data,
      showRemind3: false,
      showRemind4: false,
      showPod: false,
      podCount:0,
      codePodList: []
    })
    if (data.length < 2) {
      this.setData({
        codePodList: []
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
          codePodList: res.data
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

  // 设置启运港
  changepolname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      showRemind2: false,
      codePolList: [],
      qiYunValue: this.data.codePolList[index].point,
      qiYunCode: this.data.codePolList[index].pointCode
    })
    this.hideDropdown()
  },

  // 设置卸货港
  changepodname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      showRemind3: false,
      codePodList: [],
      xieHuoValue: this.data.codePodList[index].point,
      xieHuoCode: this.data.codePodList[index].pointCode
    })
    this.hideDropdown()
  },

  isAdsValid(str){
    let reg = /^([A-z0-9\,\.\-\/\s]+[A-z0-9\()]+[\;]){2}([A-z0-9]+)$/;
    return reg.test(str); 
  },

  // 船期搜索
  toChuanQi() {
    this.hideDropdown();
    if (this.data.showDelete1) {
      this.setData({
        showRemind2: false
      })
      if (this.data.qiYunValue) {
        if (!this.isAdsValid(this.data.qiYunValue)) {
          this.setData({
            showRemind5: true
          })
        } else {
          this.setData({
            showRemind5: false
          })
        }
      } else {
        this.setData({
          showRemind2: false,
          showRemind5: true
        })
      }
    } else {
      this.setData({
        showRemind2: true,
        showRemind5: false
      })
    }

    if (this.data.showDelete2) {
      this.setData({
        showRemind3: false
      })
      if (this.data.xieHuoValue) {
        if (!this.isAdsValid(this.data.xieHuoValue)) {
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

    if (this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4 || this.data.showRemind5) return
    wx.setStorageSync('searchKey', {
      placeOfDischarge: this.data.xieHuoCode || this.data.xieHuoValue,
      podvalue: this.data.xieHuoValue.split(';')[0],
      podCode: this.data.xieHuoValue.split(';')[1],
      placeOfLoading: this.data.qiYunCode || this.data.qiYunValue,
      polvalue: this.data.qiYunValue.split(';')[0],
      polCode: this.data.qiYunValue.split(';')[1],
      searchRange: '21',
      search: 0,
      searchDate: dayjs().format('YYYY-MM-DD')
    })
    wx.navigateTo({
      url: '/pages/Result/index',
    })
  },

  // 高级查询
  toAdvancedSearch() {
    this.hideDropdown();
    if (this.data.qiYunCode) {
      let polobject = {
        polvalue: this.data.qiYunValue,
        polcode: this.data.qiYunCode
      }
      wx.setStorageSync('polobject', polobject);
      wx.setStorageSync('setHangXian', true)
    }
    if (this.data.xieHuoCode) {
      let podobject = {
        podvalue: this.data.xieHuoValue,
        podcode: this.data.xieHuoCode
      }
      wx.setStorageSync('podobject', podobject);
      wx.setStorageSync('setHangXian', true)
    }
    wx.navigateTo({
      url: '/pages/RouterQuery/index',
    })
  },

  toPirceUrl(e) {
    const item = e.currentTarget.dataset.item
    if (item.url) {
      if (!item.needLogin || (item.needLogin && utils.checkAccessToken())) {
        if (item.type === 'nav') {
          wx.navigateTo({
            url: item.url
          })
        } else {
          wx.switchTab({
            url: item.url
          })
        }
      } else {
        wx.showToast({
          title: languageUtil.languageVersion().lang.page.load.noLogin,
          icon: 'none',
          mask: true,
          duration: 2000
        })
        setTimeout(() => {
          this.toLogin()
        }, 2000)
      }
    } else {
      wx.showToast({
        title: this.data.load.functionIsUnderDevelopment,
        icon: 'none'
      })
    }
  },

  // 去登录
  toLogin() {
    if (wx.getStorageSync('allowLegalTerms') && wx.getStorageSync('phone')) {
      if(config.mockLogin){
        wx.navigateTo({
          url: '/pages/LoginCopy/index'
        })
      }else{
        wx.navigateTo({
          url: '/pages/Login/index'
        })
      }
    } else {
      this.setData({
        showLegalRemind: true
      })
      this.getTabBar().setData({
        show: false
      })
    }
  },

  setRemind(e) {
    this.setData({
      showLegalRemind: false
    })
    this.getTabBar().setData({
      show: true
    })
    if (e.detail) {
      if(config.mockLogin){
        wx.navigateTo({
          url: '/pages/LoginCopy/index'
        })
      }else{
        wx.navigateTo({
          url: '/pages/Login/index'
        })
      }
    }
  },

  toNav(e) {
    const item = e.currentTarget.dataset.item
    if (!item.url) {
      wx.showToast({
        title: this.data.load.functionIsUnderDevelopment,
        icon: 'none'
      })
      return
    }
    // analysis({
    //   analysisType: 6,
    //   operateType: 1,
    //   statisti: item.type
    // })
    wx.navigateTo({
      url: item.url,
    })
  },

  price() {
    wx.showToast({
      title: this.data.load.functionIsUnderDevelopment,
      icon: 'none'
    })
  },

  changeItem(e) {
    this.setData({
      swiperindex: e.currentTarget.dataset.index
    })
  },

  showSearchHis(){
    this.setData({
      showHis: true
    })
  },

  hideSearchHis(){
    this.setData({
      showHis: false
    })
  },

  //选择历史记录
  chooseHis(e){
    //判断是货柜号还是提单号
    var reg = /[A-Z]{3}[UJZ][0-9]{7}$/;
    var testInput = reg.test(e.detail);
    var testHave = false;
    const huoguiStr = this.data.huoGuiValue.replaceAll(' ', '')
    const huogui = (huoguiStr.charAt(huoguiStr.length - 1) === ',' ? huoguiStr.substr(0, huoguiStr.length - 2) : huoguiStr).split(',')
    if(huoguiStr.includes(e.detail)) return

    huogui.forEach(item => {
      if(reg.test(item.trim())){
        testHave = true
      }else{
        testHave = false
      }
    })
    if(testInput && testHave){
      let newStr = this.data.huoGuiValue+','+e.detail
      this.setData({
        huoGuiValue: newStr,
        showRemind: false
      })
    }else{
      this.setData({
        huoGuiValue: e.detail,
        showRemind: false
      })
    }
  },

  //删除一条历史记录
  delHis(e){
    this.setData({
      searchHis: e.detail
    })
    wx.setStorageSync('trackSearchHis',e.detail)
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