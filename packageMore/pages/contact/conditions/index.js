// packageMore/pages/contact/conditions/index.js
import {
  dictList,
  bussinessScopeList,
  contactTradeList,
  contractInfo,
  contractInfoByOrderId
} from '../../../api/modules/more';
const languageUtil = require('../../../../utils/languageUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    language: 'zh',
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
    defaultIndex: 0,
    showRemind1: false,
    showRemind2: false,
    showRemind3: false,
    showRemind4: false,
    contractList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage()
    this.getOfficeList()
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
    this.setData({
      businessType: '',
      businessTypeName: '',
      trade: '',
      tradeName: ''
    })
    bussinessScopeList({
      officeKey: this.data.office
    }).then(res => {
      this.setData({
        businessScopeList: res.data
      })
    })
  },

  // 获取资讯航线
  getContactTradeList() {
    this.setData({
      trade: '',
      tradeName: ''
    })
    contactTradeList({
      officeKey: this.data.office,
      businessTypeKey: this.data.businessType
    }).then(res => {
      this.setData({
        contactTradeList: res.data
      })
    })
  },

  // 选择是否提供订舱信息
  changeProvide(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      canProvide: type === '1' ? true : false,
      bookingReference: '',
      trade: '',
      tradeName: '',
      accountName: '',
      showRemind3: false,
      showRemind4: false
    })
  },

  openPopup(e) {
    const type = e.currentTarget.dataset.type
    if (type === '1') {
      const defaultIndex = this.data.officeList.findIndex(i => i.key === this.data.office)
      this.setData({
        currentType: type,
        defaultIndex: defaultIndex > -1 ? defaultIndex : 0,
        valueKey: 'value',
        columns: this.data.officeList || [],
        showPopup: true
      })
    } else if (type === '2') {
      const defaultIndex = this.data.businessScopeList.findIndex(i => i.key === this.data.businessType)
      this.setData({
        currentType: type,
        defaultIndex: defaultIndex > -1 ? defaultIndex : 0,
        valueKey: this.data.language === 'zh' ? 'businessName' : 'businessNameEn',
        columns: this.data.businessScopeList || [],
        showPopup: true
      })
    } else if (type === '3') {
      const defaultIndex = this.data.contactTradeList.findIndex(i => i.tradeKey === this.data.trade)
      this.setData({
        currentType: type,
        defaultIndex: defaultIndex > -1 ? defaultIndex : 0,
        valueKey: this.data.language === 'zh' ? 'tradeName' : 'tradeNameEn',
        columns: this.data.contactTradeList || [],
        showPopup: true
      })
    }
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
        this.getBussinessScopeList()
        break;
      case '2':
        this.setData({
          businessType: detail.businessType,
          businessTypeName: this.data.language === 'zh' ? detail.businessName : detail.businessNameEn,
          showRemind2: false
        })
        this.getContactTradeList()
        break;
      case '3':
        this.setData({
          trade: detail.trade,
          tradeName: this.data.language === 'zh' ? detail.tradeName : detail.tradeNameEn,
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
      bookingReference: e.detail.value || '',
      showRemind4: e.detail.value ? false : true
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
      if (!this.data.bookingReference) {
        this.setData({
          showRemind4: true
        })
      } else {
        this.setData({
          showRemind4: false
        })
      }
    } else {
      this.setData({
        showRemind4: false
      })
      if (this.data.trade === '') {
        this.setData({
          showRemind3: true
        })
      } else {
        this.setData({
          showRemind3: false
        })
      }
    }

    if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4) return
    this.getContractInfo()
  },

  getContractInfo() {
    this.setData({
      loading: true,
      contractList: []
    })
    if (this.data.canProvide) {
      contractInfoByOrderId({
        bookingReference: this.data.bookingReference.toUpperCase(),
        office: this.data.office,
        businessType: this.data.businessType,
      }).then(res => {
        this.setData({
          contractList: res.data
        })
        wx.navigateTo({
          url: '/packageMore/pages/contact/result/index',
        })
      }, err => {
        wx.showToast({
          title: languageUtil.languageVersion().lang.page.callMe.noOrder,
          icon: 'none',
          duration: 3000
        })
        this.setData({
          canProvide: false
        })
      })
    } else {
      contractInfo({
        office: this.data.office,
        businessType: this.data.businessType,
        trade: this.data.trade,
        accountName: this.data.accountName
      }).then(res => {
        this.setData({
          contractList: res.data
        })
        wx.navigateTo({
          url: '/packageMore/pages/contact/result/index',
        })
      })
    }
  },
})