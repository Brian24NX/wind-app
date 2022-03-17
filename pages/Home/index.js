// pages/Home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth:0,
    winHeight:0,
    currentTab:0,
    language:'',
    langIndex:0,
    currentTrackTab:0,
    containerno:'',
    billnod:'',
    bookref:''
  },
  changeLanguage(e) {
    let index = e.currentTarget.dataset.index
    // console.log(index)
      this.setData({	// (1)
        langIndex: index
      });
      wx.T.setLocaleByIndex(index);
      this.setLanguage();

      wx.setStorage({
        key: 'langIndex',
        data: this.data.langIndex
      })
  },
  setLanguage() {
    this.setData ({
      language: wx.T.getLanguage()
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('我是首页')
  },
  /**
   * 滑动切换tab
   */
   bindChange:function(e){
      this.setData({
        currentTab:e.detail.current,
        currentTrackTab:e.detail.current
      });
   },
   /**
    * 点击tab切换
    */
    switchNav:function(e){
      var that=this;
      if(this.data.currentTab===e.target.dataset.current){
        return false;
      }else{
         that.setData({
            currentTab:e.target.dataset.current ,
            currentTrackTab:0
         })
      }
    },
     /**
    * 点击子tab切换
    */
      switchTab:function(e){
        var that=this;
        console.log(e.target.dataset.current);
        if(this.data.currentTrackTab===e.target.dataset.current){
          return false;
        }else{
           that.setData({
            currentTrackTab:e.target.dataset.current  
           })
        }
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
    var that = this;
    //下面这两句  tabbar 页面建议写onShow里，子页面建议写在onLoad里面
    this.setData({ 'langIndex': wx.getStorageSync('langIndex') });
    this.setData({ 'language': wx.T.getLanguage() })
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})