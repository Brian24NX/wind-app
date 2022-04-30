// packageMore/pages/contact/result/index.js
import {
  contractInfo
} from '../../../../api/modules/more';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navObj,
    office: '',
    businessType: '',
    trade: '',
    accountName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      office: data.office,
      businessType: data.businessType,
      trade: data.trade,
      accountName: data.accountName
    })
    this.getContractInfo()
  },

  getContractInfo() {
    contractInfo({
      office: this.data.office,
      businessType: this.data.businessType,
      trade: this.data.trade,
      accountName: this.data.accountName
    }).then(res => {
      console.log(res)
    })
  },

  // 返回
  back() {
    wx.navigateBack()
  },

  // 联系我们
  callme(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  // 复制邮箱
  copyEmail(e) {
    const email = e.currentTarget.dataset.email
    wx.setClipboardData({
      data: email,
    })
  }
})