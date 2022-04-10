// pages/Result/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPhoneX: getApp().globalData.isPhoneX,
    viewactived: false,
    routinglist: [],
    planList: [],
    placeOfLoading: '',
    placeOfDischarge: ''
  },

  onTabbarChange(event) {
    console.log(event.detail, '传递过来tab最后2项发送筛选请求');
  },
  onChangeRadio(event) {
    console.log(event.detail, '传递过来第一项的单选框');
  },
  onChangeCheckBox(event) {
    console.log(event.detail, '传递过来第二项的多选框');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '搜索结果',
    })
    this.dealData()
  },

  dealData() {
    let resultlist = wx.getStorageSync("resultlist");
    this.setData({
      routinglist: resultlist.routings,
      placeOfLoading: resultlist.placeOfLoading,
      placeOfDischarge: resultlist.placeOfDischarge,
    })

    if (!resultlist.anl && !resultlist.anl && !resultlist.cnc) {
      this.setData({
        planList: [],
        viewactived: false
      })
    } else {
      this.setData({
        viewactived: true,
        planList: [{
          title: 'CNC',
          value: resultlist.cnc
        }, {
          title: 'ANL',
          value: resultlist.cnc
        }, {
          title: 'APL',
          value: resultlist.cnc
        }]
      })
    }
  },

  // 去详情
  toDetail(e) {
    console.log(this.data.resultlist);
    let index = e.currentTarget.dataset.id;
    let resultlist = wx.getStorageSync("resultlist")
    console.log(resultlist)
    let details = resultlist.routings[index];
    wx.setStorageSync('details', details);
    wx.navigateTo({
      url: '/pages/ResultDetail/index',
    })
  }
})