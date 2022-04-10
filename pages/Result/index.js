// pages/Result/index.js
const utils = require('../../utils/util')
import {
  routingFinder,
  routingSort
} from '../../api/modules/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPhoneX: getApp().globalData.isPhoneX,
    viewactived: false,
    routingLists: [
      {id: 'CMA', list: []},
      {id: 'ANL', list: []},
      {id: 'CNC', list: []},
      {id: 'APL', list: []}
    ],
    routinglist: [],
    planList: [],
    placeOfLoading: '',
    placeOfDischarge: '',
    currentPlan: null,
    searchDate: '',
    weekNum: '',
    week: 0,
    dateList: [],
    routesPlanList: [],
    sort: '1',
    plans: [1, 2, 3],
    needEarlyFlag: false,
    needDirectFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '搜索结果',
    })
    this.setDayList()
    this.dealData()
  },

  changeDay(e) {
    const date = e.currentTarget.dataset.item;
    const searchObj = wx.getStorageSync('searchKey')
    this.setData({
      searchDate: date
    })
    let obj = {
      placeOfDischarge: searchObj.placeOfDischarge,
      placeOfLoading: searchObj.placeOfLoading,
      arrivalDate: searchObj.search === '到达日期' ? date : '',
      departureDate: searchObj.search === '离案日期' ? date : '',
      searchRange: searchObj.searchRange,
      shippingCompany: ''
    }
    this.setData({
      routinglist: []
    })
    routingFinder(obj).then(res => {
      if (res.code == 200) {
        wx.setStorageSync('resultlist', res.data);
        this.dealData()
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  setDayList() {
    const searchDate = wx.getStorageSync('searchKey').searchDate
    this.setData({
      searchDate: searchDate,
      dateList: utils.getDayList(searchDate, 5)
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
    this.setData({
      routesPlanList: routesPlanList,
      placeOfLoading: resultlist.placeOfLoading,
      placeOfDischarge: resultlist.placeOfDischarge,
      week: resultlist.searchRange,
      weekNum: weekNum === 1 ? '一' : weekNum === 2 ? '二' : weekNum === 3 ? '三' : '四'
    })
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
      resultlist.routings.forEach(item=>{
        if (item.shippingCompany === '0001') {
          this.data.routingLists[0].list.push(item)
        } else if (item.shippingCompany === '0002') {
          this.data.routingLists[1].list.push(item)
        } else if (item.shippingCompany === '0011') {
          this.data.routingLists[2].list.push(item)
        } else if (item.shippingCompany === '0015') {
          this.data.routingLists[3].list.push(item)
        }
      })
      this.setData({
        routingLists: this.data.routingLists
      })
      const plan = this.data.planList[this.data.currentPlan].title
      const index = this.data.routingLists.findIndex(item => item.id === plan)
      if (index > -1) {
        this.setData({
          routinglist: this.data.routingLists[index].list
        })
      }
    }
    this.sortData()
  },

  // 筛选
  onTabbarChange(e) {
    if (e.detail.actived === 1) {
      this.setData({
        sort: e.detail.result
      })
    }
    if (e.detail.actived === 2) {
      this.setData({
        plans: e.detail.result.map(id => Number(id))
      })
    }
    if (e.detail.actived === 3) {
      this.setData({
        needEarlyFlag: e.detail.result
      })
    }
    if (e.detail.actived === 4) {
      this.setData({
        needDirectFlag: e.detail.result
      })
    }
    this.sortData()
  },

  sortData() {
    let resultlist = wx.getStorageSync("resultlist")
    let params = {
      routings: resultlist.routings,
      sortDateType: Number(this.data.sort),
      sortSolutionNos: this.data.plans
    }
    if (this.data.needEarlyFlag) {
      params.needEarlyFlag = true
    }
    if (this.data.needDirectFlag) {
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