// pages/Quotation/Others/AdditionalInformation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
        const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      infoList: data.quotationDetail.surchargeDetails.additionalInformation
    })
  }
})