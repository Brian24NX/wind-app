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
    // formattedDate: '',
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
    nextDate: '10-MAY-2023',
    nextDate2: '2023年5月10日',
    typeList: ['earnings', 'burns'],
    curTab: 'earnings',
    item:null,//备份未筛选的数组数据
    showHis:false,
    searchHis: [],
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
    data.forEach(item => {
      item.bookingDate = formatDate(item.bookingDate);
    })
    // // 获取后端传来的日期字符串
    // const dateString = item.bookingDate;
    // // 调用 formatDate 函数，将日期字符串格式化为需要的格式a
    // const formattedDate = formatDate(dateString);
    // // 将格式化后的日期字符串赋值给模板数据
    // this.setData({
    //   formattedDate: formattedDate
    // });
  },

  onShow() {
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
        if(this.data.keyword){
          this.setData({
            dashboard:this.fuzzyQuery(res.data.description,this.data.keyword),
            item:res.data.description
          })
        }else{
          this.setData({
            dashboard: res.data.description,
            item:res.data.description
          })
        }

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
    console.log(11,value,regvalue,e.detail.value)
    if (value) {
      const reg = /[\u4e00-\u9fa5]/ig
      if ((reg.test(value))) {
        value = value.replace(reg, '')
      }
    }
      this.setData({
        keyword: value
      })
    console.log(this.data.keyword)
  },

  fuzzyQuery(list, keyWord) {
  let arr = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].quotationReference.indexOf(keyWord) >= 0 || list[i].invoiceReference.indexOf(keyWord)>-1 || list[i].bookingReference.indexOf(keyWord)>-1) {
      arr.push(list[i]);
    }
  }
  return arr;
},
search(){
    let keyword = this.data.keyword
    if(keyword){
      console.log(this.data.dashboard,this.fuzzyQuery(this.data.dashboard,keyword))
      this.setData({
        dashboard: this.fuzzyQuery(this.data.dashboard,keyword)
      })
    }else{
      let data = this.data.item
      this.setData({
        dashboard : data
      })
    }
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

  formatDate(dateString) {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const date = new Date(dateString + 'Z'); //将UTC时间字符串转换为Date对象
    const day = date.toLocaleString('en', { day: '2-digit' }).toUpperCase(); //将本地时间的日期格式化为 2 位数的数字并转换为大写字母
    const month = months[date.getMonth()]; //获取月份的缩写
    const year = date.getFullYear(); //获取年份
    return `${day}-${month}-${year}`;
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
    console.log(this.data.keyword)
  },
  delHis(e){
    this.setData({
      searchHis: e.detail
    })
    wx.setStorageSync('seaRewardsSearchHis',e.detail)
  },
  // onName({detail}) {
  //   let value = detail.value;
  //   if (!value || value == " ") {
  //     return '';
  //   }
  //   const rule = /[^\u4E00-\u9FA5]/g;
  //   this.$nextTick(function() {
  //     this.name = value.replace(rule, '');
  //   })
  // }
})