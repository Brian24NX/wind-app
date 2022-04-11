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
    plans: [],
    needEarlyFlag: false,
    needDirectFlag: false,
    resultlist: {}
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
      searchDate: date,
      sort: '1'
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
        this.setData({
          resultlist: res.data
        })
        if (res.data.againReq) {
          let obj2 = {
            placeOfDischarge: searchObj.placeOfDischarge,
            placeOfLoading: searchObj.placeOfLoading,
            arrivalDate: searchObj.search === '到达日期' ? date : '',
            departureDate: searchObj.search === '离案日期' ? date : '',
            searchRange: searchObj.searchRange,
            shippingCompany: '0015'
          }
          routingFinder(obj2).then(data => {
            console.log(data)
            this.data.resultlist.apl = data.data.apl;
            this.data.resultlist.routings = this.data.resultlist.routings.concat(data.data.routings)
            this.data.resultlist.solutionServices.apl = data.data.solutionServices.apl
            this.setData({
              resultlist: this.data.resultlist
            })
            wx.setStorageSync('resultlist', this.data.resultlist);
            this.dealData()
          })
        } else {
          wx.setStorageSync('resultlist', this.data.resultlist);
          this.dealData()
        }
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
    this.setData({
      resultlist: resultlist,
      placeOfLoading: resultlist.placeOfLoading,
      placeOfDischarge: resultlist.placeOfDischarge,
      week: resultlist.searchRange,
      weekNum: weekNum === 1 ? '一' : weekNum === 2 ? '二' : weekNum === 3 ? '三' : '四'
    })
    if (!resultlist.anl && !resultlist.apl && !resultlist.cnc) {
      this.setData({
        planList: [],
        viewactived: false,
        currentPlan: "CMA",
        plans: resultlist.solutionServices['cma'],
        routesPlanList: resultlist.solutionServices['cma'],
      })
    } else {
      const planTitle = resultlist.cnc ? "CNC" : resultlist.anl ? "ANL" : resultlist.apl ? "APL" : null
      console.log(planTitle.toLocaleLowerCase())
      console.log(resultlist.solutionServices)
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
        currentPlan: planTitle,
        plans: resultlist.solutionServices[planTitle.toLocaleLowerCase()],
        routesPlanList: resultlist.solutionServices[planTitle.toLocaleLowerCase()],
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
      const index = this.data.routingLists.findIndex(item => item.id === this.data.currentPlan)
      if (index > -1) {
        this.setData({
          routinglist: this.data.routingLists[index].list
        })
      }
    }
    this.sortData()
  },

  changePlan(e) {
    console.log(e)
    const title = e.currentTarget.dataset.title
    const items = this.data.routingLists.find(item => item.id === title)
    if (!items.list.length) return
    this.setData({
      currentPlan: title,
      // routinglist: items.list,
      plans: this.data.resultlist.solutionServices[title.toLocaleLowerCase()],
      routesPlanList: this.data.resultlist.solutionServices[title.toLocaleLowerCase()],
    })
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
        plans: e.detail.result
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
      sortSolutionServices: this.data.plans
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