// packageMore/pages/contact/conditions/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canProvide: true,
    columns: [{
      id: 1,
      label: '上海'
    }, {
      id: 2,
      label: '苏州'
    }, {
      id: 3,
      label: '南京'
    }, {
      id: 4,
      label: '无锡'
    }, {
      id: 5,
      label: '南通'
    }],
    valueKey: 'label',
    showPopup: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: '联系我们'
    })
  },

  // 选择是否提供订舱信息
  changeProvide(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      canProvide: type === '1' ? true : false
    })
  },

  openPopup() {
    this.setData({
      showPopup: true
    })
  },

  // 关闭弹框
  onClose() {
    this.setData({
      showPopup: false
    })
  },

  // 确认选择
  onConfirm(e) {
    const detail = e.detail
    // console.log(detail)
    this.setData({
      showPopup: false
    })
  },

  // 查询结果
  searchResult() {
    wx.navigateTo({
      url: '/packageMore/pages/contact/result/index',
    })
  }
})