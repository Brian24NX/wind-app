// pages/Orders/index.js
import {
  shipmentTracking
} from '../../api/modules/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shipmentRef: '',
    dataLength: null,
    detail: null,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '查询',
    })
    if (options.str) {
      this.setData({
        shipmentRef: options.str
      })
      this.getHuoGuiResult()
    }
  },

  changeHuoguiValue(e) {
    this.setData({
      shipmentRef: e.detail.value
    })
  },

  getHuoGuiResult() {
    let value = this.data.shipmentRef;
    if (!value) {
      wx.showToast({
        title: '请输入货柜号、提单号或订舱号',
        icon: 'none',
        mask: true
      })
      return
    }
    var reg = /^([0-9a-zA-Z,])*([0-9a-zA-Z]+)$/;
    value = value.substr(value.length - 1, 1) === ',' ? value.substr(0, value.length - 1) : value;
    if (!reg.test(value)) {
      wx.showToast({
        title: '货柜号、提单号或订舱号格式有误',
        icon: 'none',
        mask: true
      })
      return
    }
    const length = value.split(',').length
    if (length > 3) {
      wx.showToast({
        title: '最多同时支持3个编号搜索',
        icon: 'none',
        mask: true
      })
      return
    }
    this.setData({
      dataLength: null
    })
    let obj = {
      shipmentRef: value,
      eqpid: ''
    }
    shipmentTracking(obj).then(res => {
      const data = res.data;
      if (!data.length || (data.length === 1 && !data[0].data)) {
        this.setData({
          dataLength: 0,
          list: data
        })
      } else {
        const dataLength = data.filter(u => u.data).length;
        if (!dataLength) {
          this.setData({
            dataLength: 0,
            list: data
          })
          return
        }
        if (data.length === 1 && data[0].data.routes[0].containers.length === 1) {
          this.setData({
            dataLength: 1,
            detail: data[0].data.routes[0].containers[0],
            list: data
          })
        } else {
          this.setData({
            dataLength: 2,
            list: data
          })
        }
      }
    })
  }
})