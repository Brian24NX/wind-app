// packageDashboard/pages/seaRewards/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  rewardDashboard,
  seaPartnerInfo
} from '../../api/modules/dashboard'

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
      cnBenfits: '每消费100 USD累积2海里',
      rewards: '2'
    },
    {
      name: 'Captain',
      cnName: '上尉',
      icon: '/assets/img/seaReward/captain@2x.png',
      condition: 'To reach the Captain level, you need to book minimum 3 TEUs per week for at least 13 weeks',
      cnCondition: '要达到上尉级别，您需要至少在13周内每周预定最少3个TEU（标准箱）',
      benefits: 'Earn 4 Nautical Miles for 100 dollars spent',
      cnBenfits: '每消费100 USD累积4海里',
      rewards: '4'
    },
    {
      name: 'Master',
      cnName: '船长',
      icon: '/assets/img/seaReward/master@2x.png',
      condition: 'To reach the Master level, you need to book minimum 25 TEUs per week for at least 16 weeks',
      cnCondition: '要达到船长级别，您需要至少在16周内每周预定最少25个TEU（标准箱）',
      benefits: 'Earn 6 Nautical Miles for 100 dollars spent',
      cnBenfits: '每消费100 USD累积6海里',
      rewards: '6'
    },
    {
      name: 'Admiral',
      cnName: '上将',
      icon: '/assets/img/seaReward/admiral@2x.png',
      condition: 'To reach the Admiral level, you need to book minimum 120 TEUs per week for at least 20 weeks',
      cnCondition: '要达到上将级别，您需要至少在20周内每周预定最少120个TEU（标准箱）',
      benefits: 'Earn 8 Nautical Miles for 100 dollars spent',
      cnBenfits: '每消费100 USD累积8海里',
      rewards: '8'
    }
    ],
    list: [{
      id: 1,
      date: '03-MAR-2023',
      cnDate: '2023-03-03',
      quoteRef: 'QSPOT2827255',
      invoiceRef: 'FREX83088443',
      miles: '52.92',
      status: 'EARNED',
      cnStatus: '累积'
    },
    {
      id: 2,
      date: '03-MAR-2023',
      cnDate: '2023-03-03',
      quoteRef: 'QSPOT2827124',
      invoiceRef: 'FREX83088443',
      miles: '30.08',
      status: 'EAGAGED',
      cnStatus: '锁定'
    },
    {
      id: 3,
      date: '03-MAR-2023',
      cnDate: '2023-03-03',
      quoteRef: 'QSPOT2827121',
      invoiceRef: 'FREX83088441',
      miles: '29.04',
      status: 'USED',
      cnStatus: '消耗'
    }
    ],
    //sea Reward
    currentLevel: null,
    nextLevel: null,
    availableMiles: 0,
    savedUSD: 0,
    seaRewardData: null,
    dashboard: null,
    rewardLevel: null,
    nextDate: '03-MAR-2023',
    typeList: ['all', 'earnings', 'burns'],
    curTab: 'all'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage()
    this.setData({
      rewardLevel: wx.getStorageSync('rewardLevel')
    })
  },

  onShow() {
    this.getRewardDashboard('all')
    this.getSeaPartnerInfo()
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

  changeType(e) {
    this.setData({
      curTab: e.currentTarget.dataset.type
    })
    this.getRewardDashboard(e.currentTarget.dataset.type)
  },

  getRewardDashboard(type) {
    let requestType = ''
    if (type === 'earnings') {
      requestType = 'Accrual'
    } else if (type === 'burns') {
      requestType = 'Redemption'
    }
    rewardDashboard({
      "partnerCode": wx.getStorageSync('partnerList')[0].code,
      "requestType": requestType,
      "language": this.data.language
      // "range": pageSize
    }).then(res => {
      if (res.data) {
        allList = res.data
        this.setData({
          dashboard: res.data.description
        })
      } else {
        this.setData({
          loading: false,
          noData: true
        })
      }
    }, () => {
      this.setData({
        loading: false,
        noData: true
      })
    })
  },

  getSeaPartnerInfo() {
    seaPartnerInfo({
      "partnerCode": wx.getStorageSync('partnerList')[0].code,
    }).then(res => {
      const infodata = res.data
      if (infodata.memberTiers && infodata.memberTiers.length) {
        const myReward = this.data.rewardLevel.filter((i) => i.label === infodata.memberTiers[0].loyaltyMemberTierName)
        const points = infodata.memberCurrencies.filter((j) => j.loyaltyMemberCurrencyName === 'AvailableNmiles' || j.loyaltyProgramCurrencyId === '0lc7Y000000001JQAQ')[0]
        const newSea = {
          memberStatus: infodata.memberStatus,
          level: infodata.memberTiers[0].loyaltyMemberTierName,
          icon: myReward[0] ? myReward[0].icon : '',
          pointsBalance: points.pointsBalance || 0,
          cnName: myReward[0] ? myReward[0].cnName : '',
          usdSaved: points.totalPointsRedeemed || 0,
          associatedAccount: infodata.associatedAccount.name
        }
        let idx = this.data.iconList.findIndex(item => item.name === infodata.memberTiers[0].loyaltyMemberTierName)
        this.setData({
          seaRewardData: newSea,
          currentLevel: idx >= 0 ? this.data.iconList[idx] : null,
          nextLevel: idx + 1 < this.data.iconList.length ? this.data.iconList[idx + 1] : null,
          availableMiles: points.pointsBalance || 0,
          savedUSD: points.totalPointsRedeemed || 0,
        })
        wx.setStorageSync('seaRewardData', newSea)
      }
    }).catch(err => {
      console.error(err)
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
      url: '/packageDashboard/pages/seaRewardFAQ/index',
    })
  },

  gotoQuat() {
    wx.switchTab({
      url: '/pages/Quotation/Search/index',
    })
  },
})