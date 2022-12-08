// packageBooking/pages/UNNumber/index.js
import {
  UNNumberList,
  packageList,
  packageDescription
} from '../../api/modules/booking'
const languageUtils = require("../../../utils/languageUtils")
const utils = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyInfo: {},
    // showUNNumberDelete: false,
    showUnNumberLoading: false,
    UNNumberLists: [],
    unNumberCode: '',
    unNumberName: '',
    // picker
    columnsList: [],
    columnsList: [],
    isShowPicker: false,
    pickerValueKeyFlag: 1, // 1 => Packing Group , 2 => Unit, 3 => Packaging Description
    pickerValueKey: 'text',
    // 选择的结果
    pickerChooseReault: {
      // Packing Group
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
    cacheData: {
      packingGroup: []
    },
    cacheNumber: '', // 计算小数缓存
    chemicalName: '',
    classNumber: '',
    emsCode: '',
    flashPoint: '',
    isIncludeHazardous: false,
    isTransport: false,
    netWeight: '',
    grossWeight: '',
    tips: {
      chemicalName: '',
      netWeight: '',
      grossWeight: ''
    },
    // Packaging Description
    packageDescriptionLoading: !1,
    packageDescriptionLists: [],
    packageDescriptionCode: '',
    packageDescriptionName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo,
    })
  },

  enterUNNumber: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showUnNumberLoading: !0,
      UNNumberLists: []
    })
    if (data.length < 2) {
      return
    }
    this.getUNNumber(data)
  }, 800),

  getUNNumber(data) {
    UNNumberList({
      keyword: data
    }).then(res=>{
      console.log(res)
      this.setData({
        showUnNumberLoading: !1,
        UNNumberLists: res.data || []
      })
    }, () => {
      this.getUNNumber(data)
    })
  },

  // choose UNNumber
  chooseUNNumber(e) {
    const index = e.currentTarget.dataset.index
    const {unNumber} = this.data.UNNumberLists[index];
    this.setData({
      unNumberCode: this.data.UNNumberLists[index].unNumber,
      unNumberName: this.data.UNNumberLists[index].unNumber + ' - ' + this.data.UNNumberLists[index].unName,
      UNNumberLists: []
    })
    this.getPackageList(unNumber)
  },

  // get Packing Group list
  getPackageList(unNumber) {
    packageList({
      unNumber
    }).then(res=>{
      if (res && parseInt(res.code) === 200 && res.data) {
        if (res.data.length > 0) {
          const Data = JSON.parse(JSON.stringify(res.data));
          Data.map( (val, index) => {
            val.value = val.packingInsCode;
            val.text = `${val.packingGroup}${val.variation? (' - '+val.variation) : ''}`;
            val.index = index;
          });
          this.setData({
            [`cacheData.packingGroup`]: Data
          })
        }
      }
    })
  },

  // checkBoxToggle
  checkBoxToggle({currentTarget}) {
    const keys = currentTarget.dataset.keys;
    this.setData({
      [keys]: !this.data[keys]
    })
  },

  // clickPackingGroup
  clickPackingGroup(e) {
    if (!this.data.unNumberCode) {
      wx.showToast({
        title: `请输入 UN Number or Proper Shipping Name`,
        icon: 'none'
      })
    } else {
      this.openPicker(e)
    }
  },

  // openPicker
  openPicker({currentTarget}) {
    const _t = this;
    const type = parseInt(currentTarget.dataset.type);
    const {cacheData} = _t.data;

    // Packing Group
    if (type === 1) {
      const columnsList = cacheData.packingGroup;
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

    // set select data
    _t.setData({
      [`pickerChooseReault.${type}`]: detail,
      pickerValueKeyFlag: type,
      isShowPicker: !1
    });

    // Packing Group
    console.log('detail', detail)
    if (type === 1) {
      _t.setData({
        classNumber: detail.imdgClass,
        emsCode: detail.emsCode
      });
    }
  },

  // clearValue
  clearValue({currentTarget}) {
    const keys = currentTarget.dataset.keys.split(',');
    const isrequired = currentTarget.dataset.isrequired;
    keys.forEach(v => {
      let msg = '';
      if (isrequired) msg = `${this.data.verifyInfo.required}`;
      this.setData({
        [v]: '',
        [`tips.${v}`]: msg
      })
    })
  },

  // FloatNumber
  recordFloat(val) {
    const _t = this;
    const decimalReg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
    let value = val.replace(/^\./g,"");
    let num = '';

    if (!value) {
      _t.setData({ cacheNumber: '' })
      return '';
    };
    if(value && parseInt(value[0]) === 0){
      if(typeof value[1] !== 'undefined' && value[1] && value[1] !== '.'){
        value = value.substr(1,-1);
      }
    };

    if (value && decimalReg.test(value)) {
      _t.setData({ cacheNumber: value })
    } else {
      if(value) value = _t.data.cacheNumber;
    };


    return value
  },

  // fix
  recordFloatBlur({detail, currentTarget}) {
    const keys = currentTarget.dataset.keys;
    let {value} = detail;
    let varLen = value.toString().split(".");
    // if(varLen.length === 1) {
    //   value = `${value.toString()}.00`;
    // };
    if (varLen.length > 1) {
      if ( varLen[1] === '') {
        value = `${value.toString()}00`;
      }
      if( varLen[1] !== '' && varLen[1].length < 2) {
        value = `${value.toString()}0`;
      }
    };

    this.setData({
      [keys]: value
    })
  },

  // setFlashPoint
  setFlashPoint({detail}) {
    const flashPoint = this.recordFloat(detail.value);
    this.setData({
      flashPoint
    })
    console.log('setFlashPoint', flashPoint)
  },

  // setValues
  setValues({detail, currentTarget}) {
    const keys = currentTarget.dataset.keys;
    const keystype = currentTarget.dataset.keystype;
    const isrequired = currentTarget.dataset.isrequired;
    let {value} = detail;
    let msg = '';

    if (isrequired && !value) msg = `${this.data.verifyInfo.required}`;
    if (keystype && keystype === 'number') {
      value = value.replace(/[^\d.]/g,'');

      if (keys === 'netWeight') {
        const grossWeight = this.data.grossWeight;
        let msg ='毛重必须小于净重';
        if (grossWeight && (parseInt(value) > parseInt(grossWeight))) {
          msg = '';
        };
        this.setData({
          [`tips.grossWeight`]: msg
        })
      }
    };
    this.setData({
      [keys]: value,
      [`tips.${keys}`]: msg
    })
  },

  // setNumberValues
  setNumberValues({detail, currentTarget}) {
    const _t = this;
    const value = (detail.value).replace(/[^\d.]/g,'');
    const keys = currentTarget.dataset.keys;
    let { netWeight, grossWeight, verifyInfo } = _t.data;
    let msg = '';
    console.log('value', value, netWeight , parseInt(value) , parseInt(netWeight))
    if (!value) msg = `${verifyInfo.required}`;
    if (value && !netWeight) msg = `毛重必须小于净重`;
    if (value && netWeight && parseInt(value) >= parseInt(netWeight)) msg = `毛重必须小于净重`;
    _t.setData({
      [`tips.${keys}`]: msg
    })

    this.setData({
      [keys]: value
    })
  },

  // getPackageDescription
  getPackageDescription(keyword) {
    packageDescription({
      keyword,
      packingInsCode: this.data.pickerChooseReault[1].packingInsCode
    }).then(res=>{
      this.setData({
        packageDescriptionLoading: !1,
        packageDescriptionLists: res.data || []
      })
    }, () => {
      // this.getPackageDescription(keyword)
    })
  },
  // clickPackagingDescription
  clickPackagingDescription() {
    if (!this.data.pickerChooseReault[1]?.packingInsCode) {
      wx.showToast({
        title: `请选择 Packing Group`,
        icon: 'none'
      })
      this.setData({
        packageDescriptionName: ''
      })
    };
  },

  // enterPackagingDescription
  enterPackagingDescription: utils.debounce(function (e) {
    if (!this.data.pickerChooseReault[1]?.packingInsCode) {
      wx.showToast({
        title: `请选择 Packing Group`,
        icon: 'none'
      })
      this.setData({
        packageDescriptionName: ''
      })
      return false
    };
    const data = e[0].detail.value
    this.setData({
      // showUNNumberDelete: !!data,
      packageDescriptionLoading: !0,
      packageDescriptionLists: []
    })
    if (data.length < 2) {
      return false
    };
    this.getPackageDescription(data)
  }, 800),

  // choosePackagingDescription
  choosePackagingDescription({currentTarget}) {
    const {item} = currentTarget.dataset;
    this.setData({
      packageDescriptionCode: item.packingRef,
      packageDescriptionName: `${item.packingRef} - ${item.packagingDescription}`,
      packageDescriptionLists: []
    })
  },
})