// packagePrice/pages/DDCharges/Search/index.js
var languageUtil = require('../../../../utils/languageUtils')
const utils = require('../../../../utils/util')
import {
  chargeFuzzySearch,
  equitmentSizeList
} from '../../../../api/modules/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典
    verifyInfo: {},
    // 卸货港
    podvalue: "",
    podcode: "",
    // 起运港
    polvalue: "",
    polcode: "",
    typeList: [{
      label: 'Refrigerated',
      id: 'Refrigerated'
    }, {
      label: 'Hazardous',
      id: 'Hazardous'
    }, {
      label: 'Oversized',
      id: 'Oversized'
    }],
    pollist: [],
    podlist: [],
    specialCargo: '',
    showRemind1: false,
    showRemind2: false,
    showRemind3: false,
    showRemind4: false,
    showRemind5: false,
    showDelete1: false,
    showDelete2: false,
    showPopup: false,
    columns: [],
    defaultIndex: 0,
    valueKey: '',
    equipmentSize: '',
    equipmentSizeName: '',
    language: 'zh',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initLanguage()
    this.getEquitmentSizeList()
  },
  
  //初始化语言
  initLanguage() {
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.DDCharges,
      language: languageUtil.languageVersion().lang.page.langue,
      verifyInfo: languageUtil.languageVersion().lang.page.verifyInfo
    })
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.DDCharges.title
    })
  },

  getEquitmentSizeList() {
    equitmentSizeList().then(res=>{
      console.log(res)
      this.setData({
        columns: res.data
      })
    })
  },

  //获取卸货港的接口处理
  changepod: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete2: data ? true : false,
      showRemind3: false,
      showRemind4: false
    })
    if (data.length < 2) {
      this.setData({
        podlist: []
      })
      return
    }
    chargeFuzzySearch({
      searchStr: data
    }, true).then(res => {
      if (res.data != '') {
        this.setData({
          podlist: res.data || []
        })
      }
    })
  }, 800),

  //获取起始港的接口处理
  changepol: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete1: data ? true : false,
      showRemind1: false,
      showRemind2: false
    })
    if (data.length < 2) {
      this.setData({
        pollist: []
      })
    }
    chargeFuzzySearch({
      searchStr: data
    }, true).then(res => {
      if (res.data != '') {
        this.setData({
          pollist: res.data || []
        })
      }
    })
  }, 800),

  deleteValue(e) {
    const type = e.currentTarget.dataset.type
    if (type === '1') {
      this.setData({
        polvalue: '',
        polcode: '',
        pollist: [],
        showDelete1: false,
        showRemind1: false,
        showRemind2: false
      })
    } else {
      this.setData({
        podvalue: '',
        podcode: '',
        podlist: [],
        showDelete2: false,
        showRemind3: false,
        showRemind4: false
      })
    }
  },

  // 起始港选择
  changepolname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      polvalue: this.data.pollist[index].point,
      polcode: this.data.pollist[index].pointCode,
      pollist: [],
    })
  },

  // 卸货港
  changepodname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      podvalue: this.data.podlist[index].point,
      podcode: this.data.podlist[index].pointCode,
      podlist: []
    })
  },

  changeType(e) {
    console.log(e)
    this.setData({
      specialCargo: e.currentTarget.dataset.type === this.data.specialCargo ? '' : e.currentTarget.dataset.type
    })
  },

  openPopup(e) {
    const index = this.data.language === 'zh' ? this.data.columns.findIndex(i => i.nameCn === this.data.equipmentSizeName) : this.data.columns.findIndex(i => i.nameEn === this.data.equipmentSizeName)
    this.setData({
      defaultIndex: index > -1 ? index : 0,
      valueKey: this.data.language === 'zh' ? 'nameCn' : 'nameEn',
      showPopup: true,
      showRemind5: false
    })
  },

  onClose() {
    this.setData({
      showPopup: false
    })
  },

  onConfirm(e) {
    this.setData({
      equipmentSize: e.detail.code,
      equipmentSizeName: this.data.language === 'zh' ? e.detail.nameCn : e.detail.nameEn,
      showPopup: false
    })
  },

  // 提交搜索
  submit() {
    if (this.data.showDelete1) {
      this.setData({
        showRemind1: false
      })
      var reg = /^([ ]*[A-z0-9]+([\,\;]*)){2,}$/;
      if (this.data.polvalue) {
        if (!reg.test(this.data.polvalue)) {
          this.setData({
            showRemind2: true
          })
        } else {
          this.setData({
            showRemind2: false
          })
        }
      } else {
        this.setData({
          showRemind1: false,
          showRemind2: true
        })
      }
    } else {
      this.setData({
        showRemind1: true,
        showRemind2: false
      })
    }

    if (this.data.showDelete2) {
      this.setData({
        showRemind3: false
      })
      if (this.data.podvalue) {
        if (!reg.test(this.data.podvalue)) {
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
          showRemind4: true
        })
      }
    } else {
      this.setData({
        showRemind3: true,
        showRemind4: false
      })
    }
    if (!this.data.equipmentSize) {
      this.setData({
        showRemind5: true
      })
    } else {
      this.setData({
        showRemind5: false
      })
    }
    if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4 || this.data.showRemind5) return
    wx.setStorageSync('ddChargeSearchKey', {
      placeOfDischarge: this.data.podcode,
      podvalue: this.data.podvalue.split(';')[0],
      podCode: this.data.podvalue.split(';')[1],
      placeOfLoading: this.data.polcode,
      polCode: this.data.polvalue.split(';')[1],
      polvalue: this.data.polvalue.split(';')[0],
      equipmentSize: this.data.equipmentSize,
      equipmentSizeName: this.data.equipmentSizeName,
      specialCargo: this.data.specialCargo
    })
    wx.navigateTo({
      url: '/packagePrice/pages/DDCharges/Result/index',
    })
  }
})