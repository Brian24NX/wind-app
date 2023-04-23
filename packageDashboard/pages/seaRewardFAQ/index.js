// packageDashboard/pages/seaRewardFAQ/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  seaRewardFAQ
} from '../../api/modules/dashboard'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    noData: false,
    loading: false,
    noMore: false,
    list: [],
    selected: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage(),
      this.getSeaRewardFAQ()
  },

  initLanguage() {
    const language = languageUtils.languageVersion()
    this.setData({
      languageContent: language.lang.page.seaRewardFAQ,
      language: language.lang.page.langue
    })
    wx.setNavigationBarTitle({
      title: language.lang.page.seaRewardFAQ.title,
    })
  },

  getSeaRewardFAQ() {
    seaRewardFAQ({
      "code": this.data.language,
    }).then(res => {
      if (res.data) {
        this.setData({
          list: res.data
        })
      } else {
        this.setData({
          loading: false,
          noData: true
        })
      }
    }, () => {
      this.setData({
        loading: false,
        noData: true
      })
    })
  },

  zhedie(e) {
    this.setData({ selected: e.target.dataset.type });
  },
})