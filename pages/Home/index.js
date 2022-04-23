// pages/Home/index.js
const app = getApp();
import {
  fuzzySearch,
  routingFinder
} from '../../api/modules/home';
var languageUtil = require('../../utils/languageUtils')
const utils = require('../../utils/util')
const dayjs = require("dayjs")
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
    qiYunCode: '',
    showRemind2: false,
    xieHuoValue: '',
    xieHuoCode: '',
    showRemind3: false,
    showRemind4: false,
    showRemind5: false,
    codePolList: [],
    codePodList: [],
    resultlist: {},
    swiperindex: 0,
    showDelete1: false,
    showDelete2: false,
    moreMenuList: [
      [{
          id: 'CMA',
          cnLabel: 'CMA CGM+',
          enLabel: 'CMA CGM+',
          icon: '/assets/img/home/discover_1@2x.png',
          url: '/packageMore/pages/cma/list/index'
        },
        {
          id: 'about',
          cnLabel: '关于达飞',
          enLabel: 'CMA CGM+',
          icon: '/assets/img/home/discover_2@2x.png',
          url: '/packageMore/pages/about/index'
        },
        {
          id: 'news',
          cnLabel: '新闻中心',
          enLabel: 'CMA CGM+',
          icon: '/assets/img/home/discover_3@2x.png',
          url: '/packageMore/pages/news/list/index'
        },
        {
          id: 'onlineServices',
          cnLabel: '在线服务',
          enLabel: 'CMA CGM+',
          icon: '/assets/img/home/discover_4@2x.png',
          url: ''
        },
      ],
      [{
        id: 'CMA',
        cnLabel: '客户通告',
        enLabel: '客户通告',
        icon: '/assets/img/home/customernotice@2x.png',
        url: ''
      },
      {
        id: 'about',
        cnLabel: '常用模版及链接',
        enLabel: '常用模版及链接',
        icon: '/assets/img/home/templatelinks@2x.png',
        url: ''
      },
      {
        id: 'news',
        cnLabel: '管制品查询',
        enLabel: '管制品查询',
        icon: '/assets/img/home/controllproduct@2x.png',
        url: ''
      },
      {
        id: 'callMe',
        cnLabel: '联系我们',
        enLabel: '联系我们',
        icon: '/assets/img/home/contact@2x.png',
        url: '/packageMore/pages/contact/conditions/index'
      },
    ]
    ]
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
      huiguiType: 1,
      showRemind2: false,
      showRemind3: false,
      showRemind4: false,
      showRemind5: false
    })
  },
  // discover切换swiper
  changeCurrentDto(e) {
    console.log(e);
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
      huoGuiValue: value
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
    if (this.data.showRemind) {
      return
    }
    if (!this.data.huoGuiValue) {
      this.setData({
        showRemind: true,
        huiguiType: 1
      })
      return
    }
    wx.navigateTo({
      url: `/pages/Orders/index?str=${this.data.huoGuiValue.replaceAll(' ', '')}`
    })
  },
  // 设置起运港
  setQiYun: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete1: data ? true : false
    })
    if (data.length < 2) {
      this.setData({
        codePolList: []
      })
      return
    }
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      if (res.data != '') {
        this.setData({
          codePolList: res.data
        })
      }
    })

  }, 800),
  // 设置卸货港
  setXieHuo: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete2: data ? true : false
    })
    if (data.length < 2) {
      this.setData({
        codePolList: []
      })
      return
    }
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      if (res.data != '') {
        this.setData({
          codePodList: res.data
        })
      }
    })
  }, 800),
  // 设置启运港
  changepolname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      showRemind2: false,
      codePolList: [],
      qiYunValue: this.data.codePolList[index].point,
      qiYunCode: this.data.codePolList[index].pointCode
    })

  },
  // 设置卸货港
  changepodname(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    this.setData({
      showRemind3: false,
      codePodList: [],
      xieHuoValue: this.data.codePodList[index].point,
      xieHuoCode: this.data.codePodList[index].pointCode
    })
  },
  // 船期搜索
  toChuanQi() {
    // 先判断参数是否为空
    if (!this.data.qiYunValue || !this.data.xieHuoValue) {
      if (!this.data.qiYunValue) {
        this.setData({
          showRemind2: true
        })
      } else {
        this.setData({
          showRemind2: false
        })
      }
      if (!this.data.xieHuoValue) {
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
        showRemind2: false,
        showRemind3: false
      })
    }
    var reg = /^([ ]*[A-z0-9]+([\,\;]*)){2,}$/;
    if (!this.data.showRemind2) {
      if (!reg.test(this.data.qiYunValue)) {
        this.setData({
          showRemind5: true
        })
      } else {
        this.setData({
          showRemind5: false
        })
      }
    }
    if (!this.data.showRemind3) {
      if (!reg.test(this.data.xieHuoValue)) {
        this.setData({
          showRemind4: true
        })
      } else {
        this.setData({
          showRemind4: false
        })
      }
    }
    if (this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4 || this.data.showRemind5) return
    let obj = {
      placeOfDischarge: this.data.xieHuoCode || this.data.xieHuoValue,
      placeOfLoading: this.data.qiYunCode || this.data.qiYunValue,
      arrivalDate: '',
      departureDate: dayjs().format('YYYY-MM-DD'),
      searchRange: '21',
      shippingCompany: '',
    }
    routingFinder(obj).then(res => {
      if (res.code == 200 || res.data != '') {
        this.setData({
          resultlist: res.data
        })
        if (res.data.againReq) {
          let obj2 = {
            placeOfDischarge: this.data.xieHuoCode || this.data.xieHuoValue,
            placeOfLoading: this.data.qiYunCode || this.data.qiYunValue,
            arrivalDate: '',
            departureDate: dayjs().format('YYYY-MM-DD'),
            searchRange: '21',
            shippingCompany: '0015',
          }
          routingFinder(obj2).then(data => {
            if (JSON.stringify(data.data) == '{}') {
              this.setSearchList(obj)
              return
            }
            console.log(data)
            this.data.resultlist.apl = data.data.apl;
            this.data.resultlist.routings = this.data.resultlist.routings.concat(data.data.routings)
            this.data.resultlist.solutionServices.apl = data.data.solutionServices.apl
            this.setData({
              resultlist: this.data.resultlist
            })
            this.setSearchList(obj)
          })
        } else {
          this.setSearchList(obj)
        }

      } else {
        wx.showToast({
          title: '请求数据不存在或者网络错误,请您重试!',
          icon: 'none',
          duration: 5000
        })
      }
    })
  },
  setSearchList(obj) {
    wx.setStorageSync('resultlist', this.data.resultlist);
    wx.setStorageSync('searchKey', {
      placeOfDischarge: obj.placeOfDischarge,
      podvalue: this.data.xieHuoValue.split(';')[0],
      podCode: this.data.xieHuoValue.split(';')[1],
      placeOfLoading: obj.placeOfLoading,
      polvalue: this.data.qiYunValue.split(';')[0],
      polCode: this.data.qiYunValue.split(';')[1],
      searchRange: obj.searchRange,
      search: "离港时间",
      searchDate: obj.departureDate
    })
    wx.navigateTo({
      url: '../Result/index',
    })
  },
  // 高级查询
  toAdvancedSearch() {
    let polobject = {
      polvalue: this.data.qiYunValue,
      polcode: this.data.qiYunCode
    }
    wx.setStorageSync('polobject', polobject);
    let podobject = {
      podvalue: this.data.xieHuoValue,
      podcode: this.data.xieHuoCode
    }
    wx.setStorageSync('podobject', podobject);
    wx.setStorageSync('setHangXian', true)
    wx.navigateTo({
      url: '/pages/RouterQuery/index',
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
  toMore() {
    wx.showToast({
      title: '功能升级中，敬请期待',
      icon: 'none'
    })
  },
  toNav(e) {
    const item = e.currentTarget.dataset.item
    if (!item.url) {
      wx.showToast({
        title: '功能升级中，敬请期待',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: item.url,
    })
  },
  price() {
    wx.showToast({
      title: '功能升级中，敬请期待',
      icon: 'none'
    })
  },
  changeItem(e) {
    this.setData({
      swiperindex: e.currentTarget.dataset.index
    })
  }
})