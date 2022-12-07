// packageBooking/pages/Commodity/index.js
const languageUtils = require("../../../utils/languageUtils")
const utils = require('../../../utils/util')
import {
  bookCommodityList
} from '../../api/modules/booking';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyInfo: {},
    showCommodity: false,
    showCommodityDelete: false,
    commodityList: [],
    commodity: null,
    // equipmentType: '',
    // equipmentTypeName: '',
    isUserContainer: false,
    // Picker
    columnsList: [],
    isShowPicker: false,
    pickerValueKeyFlag: 1, // 1 => Size/Type, 2 => Unit
    pickerValueKey: 'text',
    // 选择的结果
    pickerChooseReault: {
      // Size/Type
      1: {
        value: '',
        text: '',
        index: 0,
      },
      // Unit
      2: {
        value: '',
        text: '',
        index: 0,
      },
    },
    // Constant - Unit Data
    unitData: {
      'en': [
        { value: 'KGM', text: 'KGM (Kilogram)'},
        { value: 'TNE', text: 'TNE (Metric Ton)'},
        { value: 'LB', text: 'LB'},
        { value: 'TON', text: 'TON (US Ton)'}
      ],
      'zh': [
        { value: 'KGM', text: 'KGM (Kilogram)'},
        { value: 'TNE', text: 'TNE (Metric Ton)'},
        { value: 'LB', text: 'LB'},
        { value: 'TON', text: 'TON (US Ton)'}
      ],
    },
    quantityValue: '',
    weightValue: '',
    totalWeightValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.bookingDetail,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail,
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo,
    })
  },

  enterCommodity: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showCommodityDelete: !!data,
      showCommodity: false,
      commodityList: []
    })
    if (data.length < 2) {
      return
    }
    this.getCommodities(data)
  }, 800),

  getCommodities(data) {
    this.setData({
      showCommodity: true
    })
    bookCommodityList({
      agreementReference: 'QHOF287175',
      keyword: data
    }).then(res => {
      console.log(res)
      this.setData({
        showCommodity: false
      })
      if (res.data.length) {
        this.setData({
          commodityList: res.data || []
        })
      }
    }, () => {
      this.getCommodities(data)
    })
  },

  chooseCommodity(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      commodity: {
        commodityCode: this.data.commodityList[index].commodityCode,
        commodityName: this.data.commodityList[index].description + ' - ' + this.data.commodityList[index].commodityCode
      },
      commodityList: []
    })
  },

  addUNNumber() {
    wx.navigateTo({
      url: '/packageBooking/pages/UNNumber/index',
    })
  },

  // openPicker
  openPicker({currentTarget}) {
    const _t = this;
    const type = parseInt(currentTarget.dataset.type);

    // Size/Type
    if (type === 1) {
      const columnsList = wx.getStorageSync('containers') || [];
      if (columnsList.length < 1) {
        wx.showToast({
          title: languageUtils.languageVersion().lang.page.load.systemIsBusyNow,
          icon: 'none',
          mask: true,
          duration: 2500
        });

        return false;
      };

      _t.setData({
        columnsList,
        pickerValueKeyFlag: type,
        isShowPicker: !0
      })
    };

    // Unit
    if (type === 2) {
      const lang = languageUtils.languageVersion().lang.page.langue;
      const columnsList = _t.data.unitData[lang];
      _t.setData({
        columnsList,
        pickerValueKeyFlag: type,
        isShowPicker: !0
      })
    };
  },

  // checkBoxToggle
  checkBoxToggle({currentTarget}) {
    const keys = currentTarget.dataset.keys;
    this.setData({
      [keys]: !this.data[keys]
    })
  },

  // onPickerClose
  onPickerClose() {
    this.setData({
      columnsList: [],
      isShowPicker: !1
    })
  },

  // onPickerConfirm
  onPickerConfirm({detail}) {
    const _t = this;
    const type = _t.data.pickerValueKeyFlag;
    // Size/Type
    const {code, text, value} = detail;
    if (type === 1) {
      const index = _t.data.columnsList.findIndex( val => val.code === code);
      const res = {
        value: code,
        text,
        index
      };
      _t.setData({
        [`pickerChooseReault.${type}`]: res,
        pickerValueKeyFlag: type,
        isShowPicker: !1
      })
    };

    // Unit
    if (type === 2) {
      const index = _t.data.columnsList.findIndex( val => val.value === value);
      const res = {
        value,
        text,
        index
      };
      _t.setData({
        [`pickerChooseReault.${type}`]: res,
        pickerValueKeyFlag: type,
        isShowPicker: !1
      })
    };
  },

  // input - setNumberData
  setNumberData({currentTarget, detail}) {
    const keys = currentTarget.dataset.keys;
    const addkeys = currentTarget.dataset.addkeys;
    const resultkeys = currentTarget.dataset.resultkeys;
    const value = (detail.value).replace(/[^\d.]/g,'');
    const addkeysValue = this.data[addkeys];
    this.setData({
      [keys]: value,
      [resultkeys]: (value && parseInt(value) > 0 && addkeysValue && parseInt(addkeysValue) > 0) ? (parseInt(value) * parseInt(addkeysValue)): ''
    });
  },

  // clearValue
  clearValue({currentTarget}) {
    const keys = currentTarget.dataset.keys.split(',');
    keys.forEach(v => {
      this.setData({
        [v]: ''
      })
    })
  }
})