// components/vas/index.js
const languageUtil = require('../../utils/languageUtils')
import {
  vasLists
} from '../../api/modules/quotation'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subscribedServices: {
      type: Array
    },
    vasParams: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    languageCode: '',
    baseUrl: '',
    vasList: []
  },

  attached() {
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.vas,
      language: languageUtil.languageVersion().lang.page.langue
    })
    this.setData({
      languageCode: this.data.language === 'zh' ? 'zh_CN' : 'en_US',
      baseUrl: "https://www.cma-cgm.com/static/ecommerce/VASAssets/" + (this.data.language === 'zh' ? 'zh_CN' : 'en_US') + "/"
    })
    this.getVasList()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getVasList() {
      vasLists({
        ...this.data.vasParams,
        locale: this.data.languageCode
      }).then(res => {
        // console.log(res)
        res.data.forEach(one => {
          if (one.termsandConditions) {
            one.termsandConditions = this.data.baseUrl + one.termsandConditions
          }
          if (one.productSheet) {
            one.productSheet = this.data.baseUrl + one.productSheet
          }
          if (one.productMainImage) {
            one.productMainImage = this.data.baseUrl + one.productMainImage
          }
          one.minPrice = Math.min.apply(Math, one.chargeDetails.filter(i=>i.levelOfCharge === 'Per Container').map(item => {
            return item.rateFrom
          }))
        })
        this.setData({
          vasList: res.data
        })
      })
    },
    toSelect(e) {
      const index = e.currentTarget.dataset.index
      wx.setStorageSync('vasDetail', this.data.vasList[index])
      wx.navigateTo({
        url: '/pages/VAS/Detail/index',
      })
    }
  }
})