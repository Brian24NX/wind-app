// packageDashboard/pages/shipment/list/containers/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
  shipmentTracking
} from '../../../api/modules/home';
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    loading: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh'
  },

  attached() {
    this.initLanguage()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initLanguage() {
      this.setData({
        languageContent: languageUtils.languageVersion().lang.page.shipment,
        language: languageUtils.languageVersion().lang.page.langue
      })
    },

    

    toDetail(e) {
      let obj = {
        shipmentRef: e.currentTarget.dataset.shipmentref,
        eqpid: ''
      }
      shipmentTracking(obj).then(res => {
        if (res.data[0].data) {
          wx.navigateTo({
            url: `/pages/OrderDetail/index?index=0&showSearch=false`,
          })
        } else {
          wx.showToast({
            title: languageUtils.languageVersion().lang.page.queryRes.noDataDesc,
            icon: 'none'
          })
        }
      })
    }
  }
})