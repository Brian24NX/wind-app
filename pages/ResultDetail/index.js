// pages/ResultDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detaillist:[],
      podlist:[],
      pollist:[],
      tranforlist:[],
      translist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详情',
    })
    let detail=wx.getStorageSync('details');
    let arr=detail.routingDetails;
      let arrclone=[...arr];
    //如果数据大于3条并且第一条数据为陆地的时候， 陆海转运 并且第一条为海的时候中心值不处理 海陆转运 并且第一条为陆  陆海陆为两个陆地 中间的对象换为RAIL
    //如果数据为两条，两个海为直达，3个海
    //
    console.log(arr.length)
    if(arrclone.length==3){
      // 陆陆
      if(arrclone[0].transportation.meanOfTransport=='RAIL'&&arrclone[2].transportation.meanOfTransport=='RAIL'){
        arrclone[1].transportation.meanOfTransport='RAIL'
        let arrtop=arrclone.shift();
        let arrbottom=arrclone.pop();
        
      }
      //陆海
     else if(arrclone[0].transportation.meanOfTransport=='RAIL'&&arrclone[2].transportation.meanOfTransport=='Vessel'){
        let arrtop=arrclone.shift();
        let arrbottom=arrclone.pop();
        
      }
      // 海陆 两次循环
      else if(arrclone[0].transportation.meanOfTransport=='RAIL'&&arrclone[2].transportation.meanOfTransport=='Vessel'){
        let arrtop=arrclone.shift();
        
      }
      // 海海多层
      else{
         let arrtop=arrclone.shift();
         let arrbottom=arrclone.pop();
          ;
      }
    }else if(arrclone.length==2){
        //陆海
        if(arrclone[0].transportation.meanOfTransport==='RAIL'&&arrclone[1].transportation.meanOfTransport=='Vessel'){
              let arrtop=arrclone.shift();
              
        }
        //海海
        else if(arrclone[0].transportation.meanOfTransport==='Vessel'&&arrclone[1].transportation.meanOfTransport=='Vessel'){
             let arrtop=arrclone.shift();
             
        }
        //海陆
        else{
          arrclone[1].transportation.meanOfTransport='RAIL'
          let arrtop=arrclone.shift();
          
          
        }
    }else if(arrclone.length==1){
          let arrtop=arrclone.shift();
          
    }else if(arrclone.length=4){
          arrclone[3].transportation.meanOfTransport='Vessel'
          let arrtop=arrclone.shift();
    }else{
      let arrtop=arrclone.shift();
    }
    this.setData({
      detaillist:detail,
      pollist:detail.routingDetails[0],
      podlist:detail.routingDetails[detail.routingDetails.length-1],
      translist:arrclone
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