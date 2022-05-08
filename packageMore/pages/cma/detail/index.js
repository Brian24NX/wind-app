// packageMore/pages/cma/detail/index.js
import {cmaNewsDetail} from '../../../api/modules/more'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getDetail()
  },
  // 获取详情
  getDetail() {
    cmaNewsDetail({id: this.data.id}).then(res=>{
      this.setData({
        url: res.data.originalLink
      })
    })
  }
})