// packageBooking/pages/UNNumber/index.js
const utils = require('../../../utils/util')
import {
  UNNumberList,
  packageList
} from '../../api/modules/booking'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUNNumberDelete: false,
    showUNNumber: false,
    UNNumberLists: [],
    unNumberCode: '',
    unNumberName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  enterUNNumber: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showUNNumberDelete: !!data,
      showUNNumber: false,
      UNNumberLists: []
    })
    if (data.length < 2) {
      return
    }
    this.getUNNumber(data)
  }, 800),

  getUNNumber(data) {
    this.setData({
      showUNNumber: true
    })
    UNNumberList({
      keyword: data
    }).then(res=>{
      console.log(res)
      this.setData({
        showUNNumber: false,
        UNNumberLists: res.data || []
      })
    }, () => {
      this.getUNNumber(data)
    })
  },

  chooseUNNumber(e) {
    const index = e.currentTarget.dataset.index
    const packingInsCode = this.data.UNNumberLists[index].packingInsCode
    this.setData({
      unNumberCode: this.data.UNNumberLists[index].unNumber,
      unNumberName: this.data.UNNumberLists[index].unNumber + ' - ' + this.data.UNNumberLists[index].unName,
      UNNumberLists: []
    })
    this.getPackageList(packingInsCode)
  },
  getPackageList(packingInsCode) {
    packageList({
      packingInsCode
    }).then(res=>{
      console.log(res)
    })
  }
})