// packageMore/pages/contact/conditions/index.js
import {
  dictList,
  contactTradeList
} from '../../../../api/modules/more';
const languageUtil = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    language: '',
    languageContent: {},
    verifyInfo: {},
    canProvide: true,
    columns: [],
    currentType: '',
    valueKey: '',
    showPopup: false,
    officeList: [],
    businessScopeList: [],
    contactTradeList: [],
    businessTypeName: '',
    businessType: '',
    officeName: '',
    office: '',
    accountName: '',
    tradeName: '',
    trade: '',
    showRemind1: false,
    showRemind2: false,
    showRemind3: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage()
    this.getOfficeList()
    this.getBussinessScopeList()
    this.getContactTradeList()
  },

  initLanguage() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.homeInfo.callMe
    })
    //获取当前小程序语言版本所对应的字典变量
    this.setData({
      language: languageUtil.languageVersion().lang.page.langue,
      languageContent: languageUtil.languageVersion().lang.page.callMe,
      verifyInfo: languageUtil.languageVersion().lang.page.verifyInfo
    })
  },

  // 获取办事处list
  getOfficeList() {
    dictList({
      dictName: 'dict_office'
    }).then(res => {
      this.setData({
        officeList: res.data
      })
    })
  },

  // 获取业务列表
  getBussinessScopeList() {
    dictList({
      dictName: 'dict_business_scope'
    }).then(res => {
      this.setData({
        businessScopeList: res.data
      })
    })
  },

  // 获取资讯航线
  getContactTradeList() {
    contactTradeList().then(res => {
      this.setData({
        contactTradeList: res.data
      })
    })
  },

  // 选择是否提供订舱信息
  changeProvide(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      canProvide: type === '1' ? true : false
    })
  },

  openPopup(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentType: type,
      valueKey: type === '3' ? 'trade' : type === '1' ? 'value' : this.data.language === 'en' ? 'value' : 'valueCn',
      columns: type === '1' ? this.data.officeList : type === '2' ? this.data.businessScopeList : type === '3' ? this.data.contactTradeList : [],
      showPopup: true
    })
  },

  // 关闭弹框
  onClose() {
    this.setData({
      showPopup: false
    })
  },

  // 确认选择
  onConfirm(e) {
    const detail = e.detail
    console.log(detail)
    switch (this.data.currentType) {
      case '1':
        this.setData({
          office: detail.key,
          officeName: detail.value,
          showRemind1: false
        })
        break;
      case '2':
        this.setData({
          businessType: detail.key,
          businessTypeName: this.data.language === 'en' ? detail.value : detail.valueCn,
          showRemind2: false
        })
        break;
      case '3':
        this.setData({
          trade: detail.tradeKey,
          tradeName: detail.trade,
          showRemind3: false
        })
        break;
      default:
        break;
    }
    this.setData({
      showPopup: false
    })
  },

  // 设置公司名称
  setAccount(e) {
    this.setData({
      accountName: e.detail.value || ''
    })
  },

  setBookingReference(e) {
    this.setData({
      bookingReference: e.detail.value || ''
    })
  },

  // 查询结果
  searchResult() {
    if (!this.data.office) {
      this.setData({
        showRemind1: true
      })
    } else {
      this.setData({
        showRemind1: false
      })
    }
    if (!this.data.businessType) {
      this.setData({
        showRemind2: true
      })
    } else {
      this.setData({
        showRemind2: false
      })
    }
    if (this.data.canProvide) {
      this.setData({
        showRemind3: false
      })
    } else {
      if (!this.data.trade) {
        this.setData({
          showRemind3: true
        })
      } else {
        this.setData({
          showRemind3: false
        })
      }
    }

    if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3) return
    wx.navigateTo({
      url: '/packageMore/pages/contact/result/index',
    })
  }
})