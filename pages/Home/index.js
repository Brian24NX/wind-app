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
    console.log(e)
    const type = e.currentTarget.dataset.type
    if (type === '1') {
      this.setData({
        huoGuiValue: '',
        showRemind: true,
        huiguiType: 1
      })
    } else if (type === '2') {
      this.setData({
        qiYunValue: '',
        codePolList: []
      })
    } else {
      this.setData({
        xieHuoValue: '',
        codePodList: []
      })
    }
  },
  setHuoGui(e) {
    var reg = /^([0-9a-zA-Z,])*([0-9a-zA-Z]+)$/;
    //去掉空格和大写问题
    let value = e.detail.value.trim().toUpperCase();
    if (!value) {
      this.setData({
        huoGuiValue: value,
        showRemind: true,
        huiguiType: 1
      })
      return
    }
    
    // 不包含，类型的数据
    if (!reg.test(value.replace(/,/g, ""))){
      this.setData({
        huoGuiValue: value,
        showRemind: true,
        huiguiType: 2
      })
      return
    }
    const length = value.split(',').length
    this.setData({
      huoGuiValue: value,
      showRemind: length > 3 ? true : false,
      huiguiType: 3
    })
    // if(value.split(',')[0]==value.split(',')[1]||value.split(',')[0]==value.split(',')[2]||value.split(',')[1]==value.split(',')[2]){
    //         this.setData({
    //           huoGuiValue:value,
    //           showRemind:true,
    //           huiguiType:4
    //         })
    // }
  },
  // 获取追踪
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
      url: `/pages/Orders/index?str=${this.data.huoGuiValue}`
    })
  },
  // 设置起运港
  setQiYun: utils.debounce(function (e) {
    const data = e['0'].detail.value
    var reg = /^([0-9a-zA-Z,])*([0-9a-zA-Z]+)$/;
    // if (!reg.test(data)) {
      this.setData({
    //     showRemind5: true,
    //     showRemind2: false,
        qiYunValue: data
      })
    //   return;
    // } else {
      // this.setData({
    //     showRemind5: false,
    //     showRemind2: false,
    //     codePolList: [],
        // qiYunValue: data
      // })
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
        } else {
          this.setData({
            qiYunValue: data
          })
        }

      })
    
  }, 500),
  // 设置卸货港
  setXieHuo: utils.debounce(function (e) {
    const data = e['0'].detail.value
    // var reg = /^([0-9a-zA-Z,])*([0-9a-zA-Z]+)$/;
    // if (!reg.test(data)) {
      this.setData({
    //     showRemind4: true,
    //     showRemind3: false,
        xieHuoValue: data
      })
    //   return;
    // }
    // this.setData({
    //   showRemind4: false,
    //   showRemind3: false,
    //   codePodList: [],
    //   xieHuoValue: data
    // })
    console.log(this.data.xieHuoValue);
    if (data.length < 2) {
      if (data.length < 2) {
        this.setData({
          codePolList: []
        })
        return
      }
    }
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      if (res.data != '') {
        this.setData({
          codePodList: res.data
        })
      } else {
        this.setData({
          xieHuoValue: data
        })
      }
    })
  }, 500),
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
    var reg = /^([0-9a-zA-Z;])*([0-9a-zA-Z]+)$/;
    // 先判断参数是否为空，再判断参数错误
    if (!this.data.qiYunValue) {
      this.setData({
        showRemind2: true
      })
    // } else {
    //   let length =  this.data.qiYunValue.split(';').length;
    //   if (length!=2) {
    //     this.setData({
    //       showRemind2: false,
    //       showRemind5: true
    //     })
    //   } else {
    //     this.setData({
    //       showRemind2: false,
    //       showRemind5: false
    //     })
    //   }
    }
    if (!this.data.xieHuoValue) {
      this.setData({
        showRemind3: true
      })
    // } else {
    //   let length =  this.data.xieHuoValue.split(';').length;
    //   if (length!=2) {
    //     this.setData({
    //       showRemind3: false,
    //       showRemind4: true
    //     })
    //   } else {
    //     this.setData({
    //       showRemind4: false,
    //       showRemind3: false
    //     })
    //   }
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
        // this.setData({
        //   qiYunValue: '',
        //   xieHuoValue: ''
        // })
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
    // this.setData({
    //   qiYunValue: '',
    //   xieHuoValue: ''
    // })
  },
  // 高级查询
  toAdvancedSearch() {
    let polobject={
      polvalue:this.data.qiYunValue,
      polcode:this.data.qiYunCode
    }
    wx.setStorageSync('polobject', polobject);
    let podobject={
      podvalue:this.data.xieHuoValue,
      podcode:this.data.xieHuoCode
   }
   wx.setStorageSync('podobject', podobject);
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
  toMore() {
    wx.showToast({
      title: '功能升级中，敬请期待',
      icon: 'none'
    })
  },
  price() {
    wx.showToast({
      title: '功能升级中，敬请期待',
      icon: 'none'
    })
  },
  changeItem(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      swiperindex: e.currentTarget.dataset.index
    })
  }
})