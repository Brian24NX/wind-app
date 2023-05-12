// packageDashboard/pages/seaRewards/index.js
import languageUtil from "../../../utils/languageUtils";

const languageUtils = require('../../../utils/languageUtils')
import {
  rewardDashboard,
  seaPartnerInfo
} from '../../api/modules/dashboard'

let allList = []
const pageSize = 5
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    page: 1,
    keyword: '',
    loading: false,
    noMore: false,
    noData: false,
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
    dashboard: [],
    rewardLevel: null,
    nextDate: '10-MAY-2023',
    nextDate2: '2023年5月10日',
    typeList: ['earnings', 'burns'],
    curTab: 'earnings',
    item:[],//备份未筛选的数组数据
    showHis:false,
    searchHis: [],
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad() {
    this.initLanguage()
    this.setData({
      rewardLevel: wx.getStorageSync('rewardLevel'),
      searchHis: wx.getStorageSync('seaRewardsSearchHis')
    })
  },

  onReachBottom(){
    if (this.data.loading || this.data.noMore) return
    console.log(1111111111,this.data.keyword)
    if(this.data.dashboard.length>0){
      this.setData({
        page: ++this.data.page,
        loading: true,
      })
      this.dealPaging()
    }
  },

  onShow() {
    this.setData({
      keyword:'',
      page:1
    })
    wx.showLoading({
      title: languageUtil.languageVersion().lang.page.load.load,
      mask: true
    })
    this.getRewardDashboard('earnings')
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
    this.setData({
      dashboard:[],
      page:1,
      loading: true,
    })
    allList=[]
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
      this.setData({
        count: ++this.data.count,
      })
      if(this.data.count===2){
        wx.hideLoading()
      }
      if (res.data) {
        this.setData({
          item:res.data
        })
        allList = res.data
        console.log("allList",allList)
        this.dealPaging()
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
  dealPaging() {
    let that =this
    let list = []
    setTimeout(() => {
      console.log('true',this.data.keyword,!this.data.keyword)
      if(!this.data.keyword){
        list = allList.slice((this.data.page - 1) * pageSize, this.data.page * pageSize)
        that.setData({
          dashboard: this.data.dashboard.concat(list),
          loading: false,
        })
      }else{
        allList = that.fuzzyQuery(allList,that.data.keyword)
        that.setData({
          dashboard:that.fuzzyQuery(allList,that.data.keyword),
          loading: false,
        })
      }
      this.setData({
        noMore: this.data.dashboard.length >= allList.length
      })
      console.log('noMore',this.data.noMore,this.data.dashboard,allList)
    }, 200);

    console.log()
  },
  getSeaPartnerInfo() {
    seaPartnerInfo({
      "partnerCode": wx.getStorageSync('partnerList')[0].code,
    }).then(res => {
      this.setData({
        count: ++this.data.count,
      })
      console.log('getSeaPartnerInfo',this.data.count)
      if(this.data.count===2){
        wx.hideLoading()
      }
      const infodata = res.data
      if (infodata.memberTiers && infodata.memberTiers.length) {
        console.log(1,this.data.rewardLevel,infodata.memberTiers[0].loyaltyMemberTierName)
        const myReward = this.data.rewardLevel.filter((i) => i.label === infodata.memberTiers[0].loyaltyMemberTierName)
        const points = infodata.memberCurrencies.filter((j) => j.loyaltyMemberCurrencyName === 'Available Nmiles')[0]
        const newSea = {
          memberStatus: infodata.memberStatus,
          level: infodata.memberTiers[0].loyaltyMemberTierName,
          icon: myReward[0] ? myReward[0].icon : '',
          pointsBalance: points.pointsBalance || 0,
          cnName: myReward[0] ? myReward[0].cnName : '',
          usdSaved: points.totalPointsRedeemed || 0,
          // associatedAccount: infodata.associatedAccount.name
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
    if (value) {
      const reg = /[\u4e00-\u9fa5]/ig
      if ((reg.test(value))) {
        value = value.replace(reg, '')
      }
    }
      this.setData({
        keyword: value
      })
  },

  fuzzyQuery(list, keyWord) {
  let arr = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].quotationReference?.indexOf(keyWord) >= 0 || list[i].invoiceReference?.indexOf(keyWord)>-1 || list[i].bookingReference?.indexOf(keyWord)>-1) {
      arr.push(list[i]);
    }
  }
    const ary = arr.slice((this.data.page - 1) * pageSize, this.data.page * pageSize)
    console.log('list-------',ary,arr)
  return arr;
},
search(){
  this.setData({
    loading: true,
    page: 1,
    dashboard: []
  })
  allList = this.data.item
 this.dealPaging()
  const huoguiStr = this.data.keyword.replaceAll(' ', '')
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
  let newHis = [...new Set(serList)]
  this.setData({
    searchHis: newHis
  })
  wx.setStorageSync('seaRewardsSearchHis', this.data.searchHis);

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

  // 定义 formatDate 函数，参数为日期字符串
  formatDate(dateString) {
    // 将日期字符串转换成 Date 对象
    const date = new Date(dateString);
    console.log(11)
    // 定义月份的英文缩写数组
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    // 获取日期、月份、年份
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    // 格式化日期
    const formattedDate = `${day < 10 ? '0' + day : day}-${monthNames[monthIndex]}-${year}`;
    // 返回格式化后的日期字符串
    return formattedDate;
},
  
  showSearchHis(){
    this.setData({
      showHis: true
    })
  },

  hideSearchHis(){
    this.search()
    this.setData({
      showHis: false
    })
  },

  chooseHis(e){
      this.setData({
        keyword: e.detail,
      })
  },
  delHis(e){
    this.setData({
      searchHis: e.detail
    })
    wx.setStorageSync('seaRewardsSearchHis',e.detail)
  },
})