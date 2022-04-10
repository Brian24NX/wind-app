// pages/Result/index.js
const utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPhoneX: getApp().globalData.isPhoneX,
    viewactived: false,
    routinglist: [],
    planList: [],
    placeOfLoading: '',
    placeOfDischarge: '',
    currentPlan: null,
    searchDate: '',
    weekNum: '',
    dateList: []
  },

  onTabbarChange(event) {
    console.log(event.detail, '传递过来tab最后2项发送筛选请求');
  },
  onChangeRadio(event) {
    console.log(event.detail, '传递过来第一项的单选框');
  },
  onChangeCheckBox(event) {
    console.log(event.detail, '传递过来第二项的多选框');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '搜索结果',
    })
    this.dealData()
  },

  setDayList() {
    this.setData({
      dateList: utils.getDayList(this.data.searchDate, 5)
    })
  },

  dealData() {
    let resultlist = wx.getStorageSync("resultlist");
    const weekNum = Number(resultlist.searchRange) / 7
    console.log(weekNum)
    this.setData({
      searchDate: resultlist.departureDate,
      routinglist: resultlist.routings,
      placeOfLoading: resultlist.placeOfLoading,
      placeOfDischarge: resultlist.placeOfDischarge,
      weekNum: weekNum === 1 ? '一' : weekNum === 2 ? '二' : weekNum === 3 ? '三' : '四'
    })
    this.setDayList()
    if (!resultlist.anl && !resultlist.apl && !resultlist.cnc) {
      this.setData({
        planList: [],
        viewactived: false
      })
    } else {
      this.setData({
        viewactived: true,
        planList: [{
          title: 'CNC',
          value: resultlist.cnc
        }, {
          title: 'ANL',
          value: resultlist.anl
        }, {
          title: 'APL',
          value: resultlist.apl
        }],
        currentPlan: resultlist.cnc ? 0 : resultlist.anl ? 1 : resultlist.apl ? 2 : null
      })
    }
  },

  // 去详情
  toDetail(e) {
    console.log(this.data.resultlist);
    let index = e.currentTarget.dataset.id;
    let resultlist = wx.getStorageSync("resultlist")
    console.log(resultlist)
    let details = resultlist.routings[index];
    wx.setStorageSync('details', details);
    wx.navigateTo({
      url: '/pages/ResultDetail/index',
    })
  }
})