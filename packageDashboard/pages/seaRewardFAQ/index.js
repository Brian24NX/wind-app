// packageDashboard/pages/seaRewardFAQ/index.js
const languageUtils = require('../../../utils/languageUtils')
import { formatHuoYunStatus } from '../../../utils/util'
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
    selected: 0,
    foldRate: true,
    foldRate2: true,
    foldRate3: true,
    foldRate4: true,
    foldRate5: true,
    foldRate6: true,
    scrollLeft: 0,
    categoryId: 0,
    categoryList: [
      { text: 'My Nautical Miles', value: 0 },
      { text: 'My Reward & Rank', value: 1 },
      { text: 'My Sea Reward account', value: 2 },
      { text: 'Enrolment & Registration', value: 3 },
    ],
    list:[
      {one:''},
      {one:''}
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(this.data.categoryList)
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

    // 切换分类
    changeCategory(e) {
      const categoryId = e.currentTarget.dataset.id
      console.log(categoryId, 212323)
      this.setData({
        categoryId
      })
      wx.createSelectorQuery().select('#categoryId-' + categoryId).boundingClientRect((rect) => {
        this.setData({
          scrollLeft: e.currentTarget.offsetLeft - this.data.scrollViewWidth / 2 + rect.width / 2
        })
      }).exec()
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

  
    // 折叠
  zhedie(e) {
    this.setData({
      [e.currentTarget.dataset.type]: !this.data[e.currentTarget.dataset.type]
    })
  },
})