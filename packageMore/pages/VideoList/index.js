// packageMore/pages/VideoList/index.js
import {
  getVideoLists
} from '../../api/modules/more'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTopHeight: getApp().globalData.navHeight,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getVideoList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  getVideoList() {
    getVideoLists().then(res => {
      var list = [];
      for (var i = 0; i < res.data.length; i += 3) {
        list.push(res.data.slice(i, i + 3));
      }
      this.setData({
        list
      })
    });
  },

  lookDetail(e) {
    console.log(e)
    const url = e.currentTarget.dataset.url
    wx.openChannelsActivity({
      finderUserName: "sphxc9HXnVD9wP3",
      feedId: url,
      fail(err) {
        console.log(err)
      }
    })
  }
})