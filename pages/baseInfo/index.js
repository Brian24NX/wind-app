// pages/baseInfo/index.js
const languageUtils = require('../../utils/languageUtils')
import { writeOperationLog } from '../../api/modules/home';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    exitContent: {},
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.baseInfo.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.baseInfo,
      exitContent: languageUtils.languageVersion().lang.page.exit,
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  // 退出
  exit() {
    const _this = this
    wx.showModal({
      cancelColor: '#666666',
      title: _this.data.exitContent.title,
      cancelText: _this.data.exitContent.cancel,
      confirmColor: '#2D75FF',
      confirmText: _this.data.exitContent.sure,
      success(res) {
        if (res.confirm) {
          const params = {
            "account": _this.data.userInfo.email,
            "ccgid": _this.data.userInfo.ccgId,
            "company": _this.data.userInfo.company,
            "nickname": _this.data.userInfo.firstName + ' ' + _this.data.userInfo.lastName,
            "operationType": "Logout",
            "shipmentRef": "-"
          }
          writeOperationLog(params).then(res => {
            console.log('登出日志记录成功')
          })
          wx.navigateTo({
            url: '/pages/Logout/index',
          })
        }
      }
    })
  }
})