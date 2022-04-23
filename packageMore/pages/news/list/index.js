// packageMore/pages/news/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryId: '',
    categoryList: [{
      id: '',
      label: 'All'
    }, {
      id: '1',
      label: 'Corporate Information'
    }, {
      id: '2',
      label: 'Business'
    }, {
      id: '3',
      label: 'categoryOne'
    }, {
      id: '4',
      label: 'categoryTwo'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '新闻中心'
    })
  },

  // 切换分类
  changeCategory(e) {
    const categoryId = e.currentTarget.dataset.id
    this.setData({
      categoryId
    })
  },
  
  // 新闻详情
  toDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/packageMore/pages/news/detail/index?id=${id}`,
    })
  }
})