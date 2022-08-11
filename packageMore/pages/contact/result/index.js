// packageMore/pages/contact/result/index.js
const languageUtil = require('../../../../utils/languageUtils')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    contractList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage()
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      contractList: data.contractList
    })
  },

  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.callMeResult,
      language: languageUtil.languageVersion().lang.page.langue
    })
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.callMeResult.title
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
      success() {
        wx.showToast({
          title: languageUtil.languageVersion().lang.page.copyInfo.success2,
          mask: true,
          icon: 'none'
        })
      }
    })
  }
})