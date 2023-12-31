// packageBooking/pages/AddReeft/index.js
const languageUtils = require("../../../utils/languageUtils")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    verifyInfo: {},
    switchReeferMode: true,
    switchReeferModeValue: '',
    switchReeferModeUnit: {
      value: 'C',
      text: '°C',
      index: 0
    },
    switchVentilation: false,
    switchVentilationValue: '',
    switchVentilationComputeValue: '0',
    switchDehumified: false,
    switchDehumifiedValue: '',
    switchControlledAtmosphere: false,
    switchControlledAtmosphereValue: '',
    switchControlledAtmosphereValue1: '',
    switchGensetRequired: false,
    isShowPicker: false,
    pickerValueKey: 'text',
    pickerList: [
      {
        value: 'C',
        text: '°C',
        index: 0
      },
      {
        value: 'F',
        text: '°F',
        index: 1
      }
    ],
    errorTips: {
      reeferMode: '',
      ventilation: '',
      dehumified: '',
      controlledAtmosphere: '',
      controlledAtmosphere1: '',
    },
    additionalComments: '',
    additionalCommentsLength: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.reefer.title,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.reefer,
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo,
    });

    // 数据回显设置
    if (options?.update) {
      const prevData = JSON.parse(JSON.stringify(wx.getStorageSync('addReeftCache') || {}));
      if (Object.keys(prevData).length > 0) {
        const {
          switchReeferMode,
          switchReeferModeValue,
          switchReeferModeUnit,
          switchVentilation,
          switchVentilationValue,
          switchVentilationComputeValue,
          switchDehumified,
          switchDehumifiedValue,
          switchControlledAtmosphere,
          switchControlledAtmosphereValue,
          switchControlledAtmosphereValue1,
          switchGensetRequired,
          additionalComments
        } = prevData;
        this.setData({
          switchReeferMode,
          switchReeferModeValue,
          switchReeferModeUnit,
          switchVentilation,
          switchVentilationValue,
          switchVentilationComputeValue,
          switchDehumified,
          switchDehumifiedValue,
          switchControlledAtmosphere,
          switchControlledAtmosphereValue,
          switchControlledAtmosphereValue1,
          switchGensetRequired,
          additionalComments
        })
      }
    }
  },

  // onSwitchChange
  onSwitchChange({detail, currentTarget}) {
    if (currentTarget.dataset.keys === 'switchVentilation') {
      this.data.errorTips.ventilation = ''
    } else if (currentTarget.dataset.keys === 'switchDehumified') {
      this.data.errorTips.dehumified = ''
    } else if (currentTarget.dataset.keys === 'switchControlledAtmosphere') {
      this.data.errorTips.dehumified = ''
    }
    this.setData({
      errorTips: this.data.errorTips
    })
    this.setData({ [currentTarget.dataset.keys]: detail });
    this.clearAllData(detail, currentTarget.dataset.keys);
  },

  // onToggleValue
  onToggleValue({currentTarget}) {
    const key = currentTarget.dataset.keys;
    const isdisabled = currentTarget.dataset.isdisabled;
    if (isdisabled) return false;
    const data = this.data[key];
    this.setData({
      [key]: !data
    });

    this.clearAllData(!data, currentTarget.dataset.keys);
  },

  openPicker() {
    this.setData({ isShowPicker: !0 })
  },

  // onPickerClose
  onPickerClose() {
    this.setData({ isShowPicker: !1 })
  },

  // onPickerConfirm
  onPickerConfirm({detail}) {
    // set select data
    console.log('detail', detail)
    this.setData({
      switchReeferModeUnit: detail,
      isShowPicker: !1
    });this.setData({ isShowPicker: !0 })
  },

  // clear all data
  clearAllData(status, key) {
    if (!status && key === 'switchReeferMode') {
      this.setData({
        switchReeferModeValue: '',
        switchVentilation: false,
        switchVentilationValue: '',
        switchVentilationComputeValue: '',
        switchDehumified: false,
        switchDehumifiedValue: '',
        switchControlledAtmosphere: false,
        switchControlledAtmosphereValue: '',
        switchControlledAtmosphereValue1: '',
        switchGensetRequired: false,
        errorTips: {
          reeferMode: '',
          ventilation: '',
          dehumified: '',
          controlledAtmosphere: '',
          controlledAtmosphere1: '',
        },
      })
    }
  },

  // setNumberValues
  setNumberValues({detail, currentTarget}) {
    const key = currentTarget.dataset.keys;
    const clearkeys = currentTarget.dataset.clearkeys;
    const value = (detail.value).replace(/[^\d.]/g,'') || '';
    if (value && clearkeys) {
      this.setErrorTips(clearkeys, true);
    } else {
      this.setErrorTips(clearkeys);
    };
    this.setData({ [key]: value })
  },

  // FloatNumber
  recordFloat(val) {
    const _t = this;
    const decimalReg = /^(\-|\d){0,8}\.{0,1}(\d{1,2})?$/;
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
    if (value > 999.99) value = 999.99
    let varLen = value.toString().split(".");
    // if(varLen.length === 1) {
    //   value = `${value.toString()}.00`;
    // };

    if (varLen.length > 1) {
      if (value.length === 6 && varLen[1] === '') {
        value = varLen[0]
      } else {
        if ( varLen[1] === '') {
          value = value = varLen[0];
        }

        if( varLen[1] !== '' && varLen[1].length < 2) {
          value = `${value}0`;
        }
      }
    };

    this.setData({
      [keys]: value
    })
  },

  dehumifiedBBlur({detail}) {
    let value = detail.value || 0;

    if (value) {
      if (parseInt(value) < 55) value = 55
      if (parseInt(value) > 100) value = 100
    }

    this.setData({
      switchDehumifiedValue: value
    })
  },

  maxNumberBlur({detail, currentTarget}) {
    let value = detail.value || 0;
    const key = currentTarget.dataset.keys;

    if (value && parseInt(value) > 20) {
      value = 20
    }

    this.setData({
      [key]: value
    })
  },

  // setNumberValues
  setFloatNumberValues({detail, currentTarget}) {
    const key = currentTarget.dataset.keys;
    const clearkeys = currentTarget.dataset.clearkeys;
    const flashPoint = this.recordFloat(detail.value) || '';
    if (flashPoint && clearkeys) {
      this.setErrorTips(clearkeys, true);
    } else {
      this.setErrorTips(clearkeys);
    };
    this.setData({
      [key]: flashPoint
    })
  },

  setErrorTips(key, isClear) {
    this.setData({
      // [`errorTips.${key}`]: `${this.data.verifyInfo.required}`
      [`errorTips.${key}`]: `${!isClear? '不能为空': ''}`
    })
  },

  // setCommentOptional
  setAdditionalComments({
    detail
  }) {
    this.setData({
      additionalComments: detail.value,
      additionalCommentsLength: detail.value.length || 0
    })
  },

  onSave() {
    const _t = this;
    const _errorArr = [];
    // regExp
    // Reefer Mode
    if (_t.data.switchReeferMode && !_t.data.switchReeferModeValue) {
      _t.setErrorTips(`reeferMode`);
      _errorArr.push('reeferMode');
    };

    // Ventilation
    if (_t.data.switchVentilation && !_t.data.switchVentilationValue) {
      _t.setErrorTips(`ventilation`);
      _errorArr.push('ventilation');
    };

    // Dehumified
    if (_t.data.switchDehumified && !_t.data.switchDehumifiedValue) {
      _t.setErrorTips(`dehumified`);
      _errorArr.push('dehumified');
    };

    // controlledAtmosphere
    if (_t.data.switchControlledAtmosphere && !_t.data.switchControlledAtmosphere) {
      _t.setErrorTips(`controlledAtmosphere`);
      _errorArr.push('controlledAtmosphere');
    };

    // controlledAtmosphere
    if (_t.data.switchControlledAtmosphere && !_t.data.switchControlledAtmosphereValue1) {
      _t.setErrorTips(`controlledAtmosphere1`);
      _errorArr.push('controlledAtmosphere1');
    };

    // console.log('onSave _errorArr', _errorArr)
    if (_errorArr.length > 0) return false;

    const {
      switchReeferMode,
      switchReeferModeValue,
      switchReeferModeUnit,
      switchVentilation,
      switchVentilationValue,
      switchVentilationComputeValue,
      switchDehumified,
      switchDehumifiedValue,
      switchControlledAtmosphere,
      switchControlledAtmosphereValue,
      switchControlledAtmosphereValue1,
      switchGensetRequired,
      additionalComments
    } = _t.data;
    const newsData = {
      switchReeferMode,
      switchReeferModeValue,
      switchReeferModeUnit,
      switchVentilation,
      switchVentilationValue,
      switchVentilationComputeValue,
      switchDehumified,
      switchDehumifiedValue,
      switchControlledAtmosphere,
      switchControlledAtmosphereValue,
      switchControlledAtmosphereValue1,
      switchGensetRequired,
      additionalComments
    };

    wx.setStorageSync('addReeft', newsData);
    wx.removeStorageSync('addReeftCache')
    wx.navigateBack()
  }
})