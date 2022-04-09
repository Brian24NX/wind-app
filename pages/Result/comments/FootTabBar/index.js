const app = getApp();
Page({
  data: {
    radio: '1',
    sortMenu:true,
    programme:true,
    tabBarData:[
      {
        text: '排序',
        isChecked: true,
        active: '/assets/img/result/tabbar/active/one.png',
        noactive: '/assets/img/result/tabbar/noactive/one.png'
      },
      {
        text: '航线方案',
        isChecked: false,
        active: '/assets/img/result/tabbar/active/two.png',
        noactive: '/assets/img/result/tabbar/noactive/two.png'
      },
      {
        text: '仅限最早到达',
        isChecked: false,
        active: '/assets/img/result/tabbar/active/three.png',
        noactive: '/assets/img/result/tabbar/noactive/three.png'
      },
      {
        text: '仅看直达',
        isChecked: false,
        active: '/assets/img/result/tabbar/active/four.png',
        noactive: '/assets/img/result/tabbar/noactive/four.png'
      },
    ]
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    })
  },

  onLoad: function (options) {
       
  },

  handleClickTab (e){
    // 传递的参数
    let activeIndex = e.currentTarget.dataset['index'];
    let data = this.data.tabBarData.map((item,index) => {
      index === activeIndex ? (item.isChecked = true) : (item.isChecked = false)
      return item
    })
    if (activeIndex === 0 ){
      this.setData({
        sortMenu : !this.data.sortMenu
      })
    }
    if(activeIndex === 1){
      this.setData({
        programme : !this.data.programme
      })
    }
    
    this.setData({
      tabBarData : data
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
})