// packageDashboard/pages/seaRewards/index.js
const languageUtils = require('../../../utils/languageUtils')
// import {
//   documentList
// } from '../../api/modules/dashboard'
const utils = require('../../../utils/util')
const pageSize = 20
let allList = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    page: 1,
    keyword: '',
    noData: false,
    loading: false,
    noMore: false,
    showPopup: false,
    iconList: [{
      name: 'Lieutenant',
      cnName: '中尉',
      icon: '/assets/img/seaReward/lieutenant@2x.png',
      condition: '',
      cnCondition: '',
      benefits: 'Earn 2 Nautical Miles for 100 dollars spent',
      cnBenfits: '每消费100 USD累积2海里'
    },
    {
      name: 'Captain',
      cnName: '上尉',
      icon: '/assets/img/seaReward/captain@2x.png',
      condition: 'To reach the Captain level, you need to book minimum 3 TEUs per week for at least 13 weeks',
      cnCondition: '要达到上尉级别，您需要至少在13周内每周预定最少3个TEU（标准箱）',
      benefits: 'Earn 4 Nautical Miles for 100 dollars spent',
      cnBenfits: '每消费100 USD累积4海里'
    },
    {
      name: 'Master',
      cnName: '船长',
      icon: '/assets/img/seaReward/master@2x.png',
      condition: 'To reach the Master level, you need to book minimum 25 TEUs per week for at least 16 weeks',
      cnCondition: '要达到船长级别，您需要至少在16周内每周预定最少25个TEU（标准箱）',
      benefits: 'Earn 6 Nautical Miles for 100 dollars spent',
      cnBenfits: '每消费100 USD累积6海里'
    },
    {
      name: 'Admiral',
      cnName: '上将',
      icon: '/assets/img/seaReward/admiral@2x.png',
      condition: 'To reach the Admiral level, you need to book minimum 120 TEUs per week for at least 20 weeks',
      cnCondition: '要达到上将级别，您需要至少在20周内每周预定最少120个TEU（标准箱）',
      benefits: 'Earn 8 Nautical Miles for 100 dollars spent',
      cnBenfits: '每消费100 USD累积8海里'
    }
    ],
    list: [{
      id: 1,
      date: '03-MAR-2023',
      quoteRef: 'QSPOT2827255',
      invoiceRef: 'FREX83088443',
      miles: '52.92',
      status: 'EARNED'
    },
    {
      id: 2,
      date: '03-MAR-2023',
      quoteRef: 'QSPOT2827124',
      invoiceRef: 'FREX83088443',
      miles: '30.08',
      status: 'EAGAGED'
    }
    ],
    //sea Reward
    currentLevel: null,
    nextLevel: null,
    availableMiles: 856,
    savedUSD: 222,
    seaRewardData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage()
    // this.search()
    let idx = this.data.iconList.findIndex(item => item.name === wx.getStorageSync('seaRewardData').level)

    this.setData({
      seaRewardData: wx.getStorageSync('seaRewardData'),
      currentLevel: idx >= 0 ? this.data.iconList[idx] : null,
      nextLevel: idx + 1 < this.data.iconList.length ? this.data.iconList[idx + 1] : null,
    })
  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.seaRewardDashboard,
      language: language.lang.page.langue
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.seaRewardDashboard.title,
    })
  },

  onOpenPopup() {
    this.setData({ showPopup: true });
  },

  onClosePopup() {
    this.setData({ showPopup: false });
  },

  setInput(e) {
    let value = e.detail.value.toUpperCase()
    let regvalue = value.trim()
    this.setData({
      keyword: regvalue
    })
  },

  deleteValue() {
    this.setData({
      keyword: ''
    })
    this.search()
  },

  gotoFAQ() {
    wx.navigateTo({
      url: '/packageMore/pages/Faq/index',
    })
  },

  gotoQuat() {
    wx.switchTab({
      url: '/pages/Quotation/Search/index',
    })
  },

  search() {
    // this.setData({
    //   loading: true,
    //   noData: false,
    //   noMore: false,
    //   page: 1,
    //   list: []
    // })
    allList = []
    // documentList({
    //   ccgId: wx.getStorageSync('ccgId'),
    //   bookingReference: this.data.keyword
    // }).then(res => {
    //   if (res.data) {
    //     allList = res.data
    //     this.dealPaging()
    //   } else {
    //     this.setData({
    //       loading: false,
    //       noData: true
    //     })
    //   }
    // }, () => {
    //   this.setData({
    //     loading: false,
    //     noData: true
    //   })
    // })
  },

  // dealPaging() {
  //   setTimeout(() => {
  //     const pageList = allList.slice((this.data.page - 1) * pageSize, pageSize)
  //     pageList.forEach(item => {
  //       item.statusLabel = utils.formatDocumentStatus(item.blStatus, this.data.language)
  //       item.categoryName = utils.formatDocumentCategory(item.category)
  //     })
  //     this.setData({
  //       noData: !allList.length,
  //       list: this.data.list.concat(allList.slice((this.data.page - 1) * pageSize, pageSize)),
  //       loading: false,
  //     })
  //     this.setData({
  //       noMore: this.data.list.length >= allList.length
  //     })
  //   }, 600);
  // }
})