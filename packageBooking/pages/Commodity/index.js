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
        index: 0
      },
      // Unit
      2: {
        value: '',
        text: '',
        index: 0
      }
    },
    // Constant - Unit Data
    unitData: {
      'en': [
        { value: 'KGM', text: 'KGM (Kilogram)', index: 0},
        { value: 'TNE', text: 'TNE (Metric Ton)', index: 1},
        { value: 'LB', text: 'LB', index: 2},
        { value: 'TON', text: 'TON (US Ton)', index: 3}
      ],
      'zh': [
        { value: 'KGM', text: 'KGM (Kilogram)', index: 0},
        { value: 'TNE', text: 'TNE (Metric Ton)', index: 1},
        { value: 'LB', text: 'LB', index: 2},
        { value: 'TON', text: 'TON (US Ton)', index: 3}
      ],
    },
    quantityValue: '',
    weightValue: '',
    totalWeightValue: '',
    isIncludeHazardous: false,
    unList: []
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

  onShow() {
    let unList = wx.getStorageSync('unNumberUpdate')

    // console.log('unList', unList)
    // 提交数据设置
    if(unList){
      this.setData({
        unList
      },()=>{
        wx.removeStorageSync('unNumberUpdate')
      })
    };

    // remove cache
    wx.removeStorageSync('unNumberCache')
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
      this.setData({
        commodityList: res.data || []
      })
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
      url: '/packageBooking/pages/UNNumber/index'
    })
  },

  // updateUNNumber
  updateUNNumber({currentTarget}) {
    const id = parseInt(currentTarget.dataset.id)
    wx.navigateTo({
      url: `/packageBooking/pages/UNNumber/index?id=${id}`,
      // success: (res) => {
      //   // 通过 eventChannel 向被打开页面传送数据
      //   res.eventChannel.emit('test-data', { data: 'test' })
      //   // res.eventChannel.emit 第二个参数是要传递的数据 **第二个参数只能是key-value形式的对象**
      // }
    });

    wx.setStorageSync('unNumberCache', this.data.unList);
  },

  // deleteUNNumber
  deleteUNNumber({currentTarget}) {
    const id = parseInt(currentTarget.dataset.id);
    const unList = JSON.parse(JSON.stringify(this.data.unList));
    const index = unList.findIndex( v => v.id === id);
    unList.splice(index, 1);
    this.setData({
      unList
    })
  },
  // openPicker
  openPicker({currentTarget}) {
    const _t = this;
    const type = parseInt(currentTarget.dataset.type);

    // Size/Type
    if (type === 1) {
      const List = wx.getStorageSync('containers') || [];
      const columnsList = JSON.parse(JSON.stringify(List));

      if (columnsList.length < 1) {
        columnsList.map( (val, index) => {
          val.index = index;
          val.value = val.code;
        });
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
    // 1 => Size/Type, 2 => Unit
    const type = _t.data.pickerValueKeyFlag;
    _t.setData({
      [`pickerChooseReault.${type}`]: detail,
      pickerValueKeyFlag: type,
      isShowPicker: !1
    })
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