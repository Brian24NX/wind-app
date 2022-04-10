// pages/Result/index.js
const utils = require('../../utils/util')
import {
  routingSort
} from '../../api/modules/home';
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
    dateList: [],
    routesPlanList: []
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
    let routesPlanList = []
    resultlist.solutionNos.forEach(item => {
      routesPlanList.push({
        id: Object.keys(item)[0],
        label: Object.values(item)[0]
      })
    })
    console.log(routesPlanList)
    this.setData({
      routesPlanList: routesPlanList,
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

  // 筛选
  onTabbarChange(e) {
    console.log('传递过来tab发送筛选请求', e.detail);
    let resultlist = wx.getStorageSync("resultlist")
    let params = {
      routings: resultlist.routings
    }
    if (e.detail.actived === 1) {
      params.sortDateType = Number(e.detail.result)
    }
    if (e.detail.actived === 2) {
      params.solutionNos = e.detail.result.map(id => Number(id))
    }
    if (e.detail.actived === 3) {
      params.needEarlyFlag = true
    }
    if (e.detail.actived === 4) {
      params.needDirectFlag = true
    }
    routingSort(params).then(res => {
      console.log(res)
      this.setData({
        routinglist: res.data
      })
    })
  },

  // 去详情
  toDetail(e) {
    let index = e.currentTarget.dataset.id;
    let resultlist = wx.getStorageSync("resultlist")
    let details = resultlist.routings[index];
    wx.setStorageSync('details', details);
    wx.navigateTo({
      url: '/pages/ResultDetail/index',
    })
  }
})