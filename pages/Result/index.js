// pages/Result/index.js
const utils = require('../../utils/util')
import {
  routingFinder,
  routingSort
} from '../../api/modules/home';
const dayjs = require("dayjs");
const languageUtil = require('../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    weeksContent: {},
    language: '',
    isPhoneX: getApp().globalData.isPhoneX,
    viewactived: false,
    routingLists: [{
        id: 'CMA',
        shippingCompany: '0001',
        list: []
      },
      {
        id: 'ANL',
        shippingCompany: '0002',
        list: []
      },
      {
        id: 'CNC',
        shippingCompany: '0011',
        list: []
      },
      {
        id: 'APL',
        shippingCompany: '0015',
        list: []
      }
    ],
    routinglist: [],
    planList: [],
    placeOfLoading: '',
    placeOfDischarge: '',
    polCode: '',
    podCode: '',
    currentPlan: null,
    searchDate: '',
    weekNum: '',
    dateList: [],
    routesPlanList: [],
    sort: '1',
    plans: [],
    needEarlyFlag: false,
    needDirectFlag: false,
    isLoading: true,
    scrollLeft: 0,
    oneScroll: 0,
    showDatePopup: false,
    currentDate: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.searchResultList.title
    })
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.searchResultList,
      weeksContent: languageUtil.languageVersion().lang.page.weeks,
      language: languageUtil.languageVersion().lang.page.langue
    })
    const weekNum = Number(wx.getStorageSync('searchKey').searchRange) / 7
    this.setData({
      polCode: wx.getStorageSync('searchKey').polCode,
      podCode: wx.getStorageSync('searchKey').podCode,
      placeOfLoading: wx.getStorageSync('searchKey').polvalue,
      placeOfDischarge: wx.getStorageSync('searchKey').podvalue,
      weekNum: weekNum
    })
    this.setDayList()
    this.dealData()
  },

  // bindTimeChange(e) {
  //   this.setData({
  //     searchDate: e.detail.value,
  //     oneScroll: 0
  //   })
  //   this.setDayList(this.data.searchDate)
  //   this.resetData()
  //   this.dealData()
  // },

  openDate() {
    const date = this.data.searchDate.replaceAll('-', '/')
    this.setData({
      currentDate: new Date(date).getTime(),
      showDatePopup: true
    })
  },

  closeDate() {
    this.setData({
      showDatePopup: false
    })
  },

  confirmDate(e) {
    console.log(e)
    this.setData({
      searchDate: dayjs(e.detail).format('YYYY-MM-DD'),
      oneScroll: 0,
      showDatePopup: false
    })
    this.setDayList(this.data.searchDate)
    this.resetData()
    this.dealData()
  },

  changeDay(e) {
    const date = e.currentTarget.dataset.item
    let offsetLeft = e.currentTarget.offsetLeft;
    this.setData({
      scrollLeft: offsetLeft - this.data.oneScroll * 2.5
    })
    this.setData({
      searchDate: date
    })
    this.resetData()
    this.dealData()
  },

  resetData() {
    this.setData({
      isLoading: true,
      viewactived: false,
      routingLists: [{
          id: 'CMA',
          shippingCompany: '0001',
          list: []
        },
        {
          id: 'ANL',
          shippingCompany: '0002',
          list: []
        },
        {
          id: 'CNC',
          shippingCompany: '0011',
          list: []
        },
        {
          id: 'APL',
          shippingCompany: '0015',
          list: []
        }
      ],
      routinglist: [],
      planList: []
    })
  },

  setDayList(searchTime) {
    const searchDate = searchTime || wx.getStorageSync('searchKey').searchDate
    if (!this.data.oneScroll) {
      wx.createSelectorQuery().select('.calendarLeft').boundingClientRect((rect) => {
        this.setData({
          oneScroll: rect.height,
          scrollLeft: 15 * rect.height - rect.height / 2
        })
      }).exec()
    }
    this.setData({
      searchDate: searchDate,
      dateList: utils.getDayList(searchDate, 14)
    })
  },

  getList(shippingCompany, callback) {
    const searchKey = wx.getStorageSync('searchKey')
    const params = {
      placeOfDischarge: searchKey.placeOfDischarge,
      placeOfLoading: searchKey.placeOfLoading,
      departureDate: searchKey.search === 0 ? this.data.searchDate : '',
      arrivalDate: searchKey.search === 1 ? this.data.searchDate : '',
      searchRange: searchKey.searchRange,
      specificRoutings: [],
      shippingCompany: shippingCompany
    }
    routingFinder(params).then(res => {
      console.log(res)
      if (callback) {
        const index = this.data.routingLists.findIndex(item => item.shippingCompany === shippingCompany)
        if (index > -1) {
          this.data.routingLists[index].list = res.data.routings
          this.setData({
            routingLists: this.data.routingLists,
          })
        }
        if (shippingCompany === '0001' && !res.data.routings) {
          callback(true)
        } else {
          this.setData({
            planList: [],
            viewactived: false,
            currentPlan: "CMA",
            plans: res.data.solutionServices['cma'],
            routesPlanList: res.data.solutionServices['cma']
          })
          callback(false)
        }
      }
    })
  },

  dealData() {
    this.getList(this.data.routingLists[0].shippingCompany, (res) => {
      if (!res) {
        this.sortData()
      } else {
        this.getLists()
      }
    })
  },

  async getLists() {
    await this.getOneList()
    console.log(this.data.routingLists)
    this.setData({
      viewactived: true,
      planList: [{
        title: 'CNC',
        value: this.data.routingLists.find(u => u.id === 'CNC').solutionServices ? this.data.routingLists.find(u => u.id === 'CNC').solutionServices.length : 0
      }, {
        title: 'ANL',
        value: this.data.routingLists.find(u => u.id === 'ANL').solutionServices ? this.data.routingLists.find(u => u.id === 'ANL').solutionServices.length : 0
      }, {
        title: 'APL',
        value: this.data.routingLists.find(u => u.id === 'APL').solutionServices ? this.data.routingLists.find(u => u.id === 'APL').solutionServices.length : 0
      }]
    })
    console.log(this.data.routingLists)
    this.setData({
      currentPlan: this.data.planList.find(u => u.value).title,
      routesPlanList: this.data.routingLists.find(u => u.id === this.data.planList.find(u => u.value).title).solutionServices,
      plans: this.data.routingLists.find(u => u.id === this.data.planList.find(u => u.value).title).solutionServices,
    })
    this.sortData()
  },

  async getOneList() {
    let response = []
    const searchKey = wx.getStorageSync('searchKey')
    console.log(searchKey)
    // 循环依次等待上传结果
    for (let i = 1; i < this.data.routingLists.length; i++) {
      const params = {
        placeOfDischarge: searchKey.placeOfDischarge,
        placeOfLoading: searchKey.placeOfLoading,
        departureDate: searchKey.search === 0 ? searchKey.searchDate : '',
        arrivalDate: searchKey.search === 1 ? searchKey.searchDate : '',
        searchRange: searchKey.searchRange,
        specificRoutings: [],
        shippingCompany: this.data.routingLists[i].shippingCompany
      }
      const res = await routingFinder(params)
      const index = this.data.routingLists.findIndex(item => item.shippingCompany === this.data.routingLists[i].shippingCompany)
      if (res.data.routings) {
        if (index > -1) {
          this.data.routingLists[index].list = res.data.routings
          this.data.routingLists[index].solutionServices = res.data.solutionServices[this.data.routingLists[index].id.toLocaleLowerCase()]
        }
      } else {
        this.data.routingLists[index].list = []
        this.data.routingLists[index].solutionServices = []
      }
      this.setData({
        routingLists: this.data.routingLists,
      })
      response.push(res)
    }
    return response
  },

  changePlan(e) {
    const title = e.currentTarget.dataset.title
    const items = this.data.routingLists.find(item => item.id === title)
    if (!items.list.length) return
    this.setData({
      currentPlan: title,
      routinglist: [],
      isLoading: true,
      plans: items.solutionServices,
      routesPlanList: items.solutionServices,
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
    const item = this.data.routingLists.find(u => u.id === this.data.currentPlan)
    let params = {
      routings: item.list,
      sortDateType: Number(this.data.sort),
      sortSolutionServices: this.data.plans
    }
    console.log(params)
    if (this.data.needEarlyFlag) {
      params.needEarlyFlag = true
    }
    if (this.data.needDirectFlag) {
      params.needDirectFlag = true
    }
    routingSort(params).then(res => {
      this.setData({
        routinglist: res.data,
        isLoading: false
      })
      wx.hideLoading()
    }, () => {
      this.setData({
        routinglist: [],
        isLoading: false
      })
      wx.hideLoading()
    })
  },

  // 去详情
  toDetail(e) {
    let index = e.currentTarget.dataset.id;
    let details = this.data.routinglist[index];
    wx.setStorageSync('details', details);
    wx.navigateTo({
      url: '/pages/ResultDetail/index',
    })
  }
})