// packageMore/pages/sanctionCheck/detail/index.js
const languageUtils = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    id: '',
    sanctionDetail: {
      content: `As per CMA-CGM Group procedure, we do not
      accept AT ALL this  sort of commodity from
      Asia and / or of Asian origin, even if harmless
      declared. (More banned commd
      name :carbon, charcoal, barbecue, coconut
      shells, Bamboo tablets, charcoal for shisha,
      tablets for water pipes or Hooka).`
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.sanction.title
    })
    this.setData({
      id: options.id,
      languageContent: languageUtils.languageVersion().lang.page.sanction,
      language: languageUtils.languageVersion().lang.page.langue
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})