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
    commodityList: [],
    commodityCode: '',
    commodityName: '',
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
        value: 'KGM',
        text: 'KGM (Kilogram)',
        index: 0
      }
    },
    // Constant - Unit Data
    unitData: {
      'en': [{
          value: 'KGM',
          text: 'KGM (Kilogram)',
          index: 0
        },
        {
          value: 'TNE',
          text: 'TNE (Metric Ton)',
          index: 1
        },
        {
          value: 'LB',
          text: 'LB (Pound)',
          index: 2
        },
        {
          value: 'TON',
          text: 'TON (US Ton)',
          index: 3
        }
      ],
      'zh': [{
          value: 'KGM',
          text: 'KGM (Kilogram)',
          index: 0
        },
        {
          value: 'TNE',
          text: 'TNE (Metric Ton)',
          index: 1
        },
        {
          value: 'LB',
          text: 'LB (Pound)',
          index: 2
        },
        {
          value: 'TON',
          text: 'TON (US Ton)',
          index: 3
        }
      ],
    },
    quantityValue: '',
    weightValue: '',
    totalWeightValue: '',
    isIncludeHazardous: false,
    isAddReeft: false,
    unList: [],
    addReeft: null,
    tips: {
      commodityName: '',
      sizeType: '',
      weightPerContaine: '',
      totalWeightValue: '',
      unit: '',
      addReeft: '',
      includeHazardous: ''
    },
    scrollEmelemt: '', // 定位元素
    requiredEmelemt: [], // 是否存在验证为空的元素
    scrollToElement: ['commodityName', 'sizeType', 'quantity', 'weightPerContaine', 'totalWeightValue', 'unit', 'addReeft', 'includeHazardous'],
    agreementReference: '',
    index: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.index) {
      this.setData({
        index: options.index
      })
    }
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.bookingDetail,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail,
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo,
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      agreementReference: data.quotationReference
    })
  },

  onShow() {

    // unNumber ----- start
    let unList = wx.getStorageSync('unNumberUpdate')

    // console.log('unList', unList)
    // 提交数据设置
    if (unList) {
      this.setData({
        unList
      }, () => {
        wx.removeStorageSync('unNumberUpdate')
      })
    };

    // remove cache
    wx.removeStorageSync('unNumberCache')

    this.setData({
      isIncludeHazardous: (this.data.unList.length > 0 ? true : false)
    });

    // addReeft ----- start
    let addReeft = wx.getStorageSync('addReeft')

    // console.log('unList', unList)
    // 提交数据设置
    if (addReeft) {
      this.setData({
        addReeft,
        ['tips.addReeft']: ''
      }, () => {
        wx.removeStorageSync('addReeft')
      })
    };

    // remove cache
    wx.removeStorageSync('addReeftCache')

    // this.setData({
    //   isAddReeft: (Object.keys(this.data.addReeft).length > 0 ? true : false)
    // });
    // addReeft ----- end
  },

  enterCommodity: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      [`tips.commodityName`]: !data ? `${this.data.verifyInfo.required}` : '',
      ['commodity.commodityName']: data,
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
      agreementReference: this.data.agreementReference,
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
      commodityCode: this.data.commodityList[index].commodityCode,
      commodityName: this.data.commodityList[index].description + ' - ' + this.data.commodityList[index].commodityCode,
      commodityList: []
    })
  },

  addUNNumber() {
    wx.navigateTo({
      url: '/packageBooking/pages/UNNumber/index'
    })
  },

  // updateUNNumber
  updateUNNumber({
    currentTarget
  }) {
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
  deleteUNNumber({
    currentTarget
  }) {

    wx.showModal({
      title: '是否要删除此 UN Number？',
      // content: '是否要删除此 UN Number？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          const id = parseInt(currentTarget.dataset.id);
          const unList = JSON.parse(JSON.stringify(this.data.unList));
          const index = unList.findIndex(v => v.id === id);
          unList.splice(index, 1);
          this.setData({
            unList,
            isIncludeHazardous: (unList.length > 0 ? true : false)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  // openPicker
  openPicker({
    currentTarget
  }) {
    const _t = this;
    const type = parseInt(currentTarget.dataset.type);

    // Size/Type
    if (type === 1) {
      const List = wx.getStorageSync('containers') || [];
      const columnsList = JSON.parse(JSON.stringify(List));
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
  checkBoxToggle({
    currentTarget
  }) {
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
  onPickerConfirm({
    detail
  }) {
    const _t = this;

    // 1 => Size/Type, 2 => Unit
    const type = _t.data.pickerValueKeyFlag;
    if (type === 1) {
      detail.value = detail.code;
      _t.setData({
        [`tips.sizeType`]: '',
        isAddReeft: (detail.value === '20RF' || detail.value === '40RH' || detail.value === '45RH')
      })
    }
    if (type === 2) {
      _t.setData({
        [`tips.unit`]: '',
      })
    }
    _t.setData({
      [`pickerChooseReault.${type}`]: detail,
      pickerValueKeyFlag: type,
      isShowPicker: !1
    })
  },

  // input - setNumberData
  setNumberData({
    currentTarget,
    detail
  }) {
    const keys = currentTarget.dataset.keys;
    const addkeys = currentTarget.dataset.addkeys;
    const resultkeys = currentTarget.dataset.resultkeys;
    const tipkeys = currentTarget.dataset.tipkeys;
    let valueDetail = detail.value;
    if (valueDetail[0] == 0) {
      if (valueDetail[1] != '.' && valueDetail[1] != undefined) {
        valueDetail = valueDetail.substr(1, -1);
      }
    };
    const value = valueDetail.replace(/[^\d]/g, '') || '';
    const addkeysValue = this.data[addkeys];
    this.setData({
      [`tips.${tipkeys}`]: (value ? '' : `${this.data.verifyInfo.required}`),
      [`tips.${resultkeys}`]: (value && parseInt(value) > 0 && addkeysValue && parseInt(addkeysValue) > 0) ? '' : `${this.data.verifyInfo.required}`,
      [keys]: value,
      [resultkeys]: (value && parseInt(value) > 0 && addkeysValue && parseFloat(addkeysValue) > 0) ? (parseInt(value) * parseFloat(addkeysValue)) : ''
    });
  },

  // FloatNumber
  recordFloat(val) {
    const _t = this;
    const decimalReg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
    let value = val.replace(/^\./g, "");
    let num = '';

    if (!value) {
      _t.setData({
        cacheNumber: ''
      })
      return '';
    };
    if (value && parseInt(value[0]) === 0) {
      if (typeof value[1] !== 'undefined' && value[1] && value[1] !== '.') {
        value = value.substr(1, -1);
      }
    };

    if (value && decimalReg.test(value)) {
      _t.setData({
        cacheNumber: value
      })
    } else {
      if (value) value = _t.data.cacheNumber;
    };


    return value
  },


  // setFlashPoint
  setFloatNumber({
    detail,
    currentTarget
  }) {
    const keys = currentTarget.dataset.keys;
    const addkeys = currentTarget.dataset.addkeys;
    const resultkeys = currentTarget.dataset.resultkeys;
    const tipkeys = currentTarget.dataset.tipkeys;
    const value = this.recordFloat(detail.value) || '';
    const addkeysValue = this.data[addkeys];
    this.setData({
      [`tips.${tipkeys}`]: (value ? '' : `${this.data.verifyInfo.required}`),
      [`tips.${resultkeys}`]: (value && parseFloat(value) > 0 && addkeysValue && parseInt(addkeysValue) > 0) ? '' : `${this.data.verifyInfo.required}`,
      [keys]: value,
      [resultkeys]: (value && parseFloat(value) > 0 && addkeysValue && parseInt(addkeysValue) > 0) ? (parseFloat(value) * parseInt(addkeysValue)) : ''
    });
  },

  resetNumber({
    detail,
    currentTarget
  }) {
    const keys = currentTarget.dataset.keys;
    const tipkeys = currentTarget.dataset.tipkeys;
    let valueDetail = detail.value;
    if (valueDetail && parseInt(valueDetail) <= 0) {
      this.setData({
        [`tips.${tipkeys}`]: `${this.data.verifyInfo.required}`,
        [keys]: ''
      });
    }
  },

  // clearValue
  clearValue({
    currentTarget
  }) {
    const keys = currentTarget.dataset.keys.split(',');
    const isrequired = currentTarget.dataset.isrequired;
    const tipkey = currentTarget.dataset.tipkeys;
    keys.forEach(v => {
      let msg = '';
      let _val = '';
      if (isrequired) msg = `${this.data.verifyInfo.required}`;

      if (v.includes('.')) {
        var _g = v.split('.');
        if (_g.length === 2) {
          _val = this.data[_g[0]][_g[1]]
        }
        if (_g.length === 3) {
          _val = this.data[_g[0]][_g[1]][_g[2]]
        }
        if (_g.length === 4) {
          _val = this.data[_g[0]][_g[1]][_g[2]][_g[3]]
        }
      } else {
        _val = this.data[v]
      }
      console.log('tipkey', tipkey, msg)
      this.setData({
        [`tips.${tipkey}`]: msg,
        [v]: ''
      })
    })
  },

  // toAddReeft
  toAddReeft() {
    wx.navigateTo({
      url: `/packageBooking/pages/AddReeft/index${(Object.keys(this.data.addReeft).length > 0? '?update=true': '')}`
    })

    if (Object.keys(this.data.addReeft).length > 0) {
      wx.setStorageSync('addReeftCache', this.data.addReeft);
    }
  },

  // verify
  // keys 为判断的keys
  // tipkey 为输出判断的key
  // scrollElement 为校验滚动点元素
  verify(keys = '', tipkey = '', scrollElement = '', nativeData = '') {
    const _t = this;
    const data = _t.data;
    const dataKeys = keys.split(',');
    let isFlag = false;
    let requiredEmelemt = '';
    if (data.requiredEmelemt.length < 1) {
      requiredEmelemt = Array(data.scrollToElement.length)
    } else {
      requiredEmelemt = data.requiredEmelemt
    }

    dataKeys.forEach(v => {
      let msg = '';
      let _val = ''
      if (v.includes('.')) {
        var _g = v.split('.');
        if (_g.length === 2) {
          _val = this.data[_g[0]][_g[1]]
        }
        if (_g.length === 3) {
          _val = this.data[_g[0]][_g[1]][_g[2]]
        }
        if (_g.length === 4) {
          _val = this.data[_g[0]][_g[1]][_g[2]][_g[3]]
        }
      } else {
        _val = this.data[v]
      }

      if (!_val && !nativeData) {
        msg = `${data.verifyInfo.required}`;
        isFlag = true;
      }
      this.setData({
        [`tips.${tipkey}`]: msg
      })
    });

    const isFind = requiredEmelemt.findIndex(v => v === scrollElement);
    const index = data.scrollToElement.findIndex(v => v === scrollElement);
    if (isFlag) {
      isFind === -1 && (requiredEmelemt[index] = scrollElement);
    } else {
      if (isFind !== -1) {
        requiredEmelemt[index] = ''
      }
    };
    this.setData({
      requiredEmelemt
    });
    return isFlag;
  },

  // scrollTo
  scrollTo({
    element,
    duration = 200,
    offsetTop = 0
  }) {
    // 使用wx.createSelectorQuery()查询到需要滚动到的元素位置
    // console.log('element', element)
    const query = wx.createSelectorQuery().in(this)
    if (!element) return false;
    query.select(`.scroll-${element}`).boundingClientRect(res => {
      // console.log('res', res)
      // 使用wx.getSysTemInfo()获取设备及页面高度windowHeight（px）
      wx.getSystemInfo({
        success(ress) {
          // console.log('ress', ress)
          wx.pageScrollTo({
            scrollTop: res.top + 357,
            // scrollTop: res.top,
            duration
          })
        }
      })
    }).exec()
  },

  // onConfirm
  onConfirm() {
    const _t = this;
    const scrollToElement = _t.data.scrollToElement;


    // commodityName
    if (_t.verify('commodityName', 'commodityName', scrollToElement[0])) {
      console.log('commodityName - 为空')
    }

    // sizeType
    if (_t.verify('pickerChooseReault.1.value', 'sizeType', scrollToElement[1])) {
      console.log('sizeType - 为空')
    }

    // quantityValue
    if (_t.verify('quantityValue', 'quantity', scrollToElement[2])) {
      console.log('quantityValue - 为空')
    }

    // weightValue
    if (_t.verify('weightValue', 'weightPerContaine', scrollToElement[3])) {
      console.log('weightValue - 为空')
    }

    // totalWeightValue
    if (_t.verify('totalWeightValue', 'totalWeightValue', scrollToElement[4])) {
      console.log('totalWeightValue - 为空')
    }

    // unit
    if (_t.verify('pickerChooseReault.2.value', 'unit', scrollToElement[5])) {
      console.log('unit - 为空')
    }

    // addReeft
    if (_t.verify('isAddReeft', 'addReeft', scrollToElement[6])) {
      console.log('addReeft - 为空')
    }

    // scrollTo
    _t.scrollTo({
      element: _t.data.requiredEmelemt.find(v => !!v)
    })

    if (_t.data.requiredEmelemt.findIndex(v => !!v) !== -1) {
      console.log('存在必填为空', _t.data.requiredEmelemt, _t.data.requiredEmelemt.findIndex(v => !!v))
      return false
    }

    if (!_t.data.commodityCode) {
      this.setData({
        [`tips.commodityName`]: `请输入并获取正确的 Commodity`
      })
      _t.scrollTo({
        element: 'commodityName'
      })
      return false
    }

    if (_t.data.isIncludeHazardous && _t.data.unList.length < 1) {
      this.setData({
        [`tips.includeHazardous`]: `请添加 UN Number`
      })
      _t.scrollTo({
        element: 'includeHazardous'
      })
      return false
    }

    console.log('验证通过')
    // sumbit
    // do something...
    const {
      commodityName,
      commodityCode,
      pickerChooseReault,
      isUserContainer,
      weightValue,
      totalWeightValue,
      isIncludeHazardous,
      unList,
      isAddReeft,
      addReeft
    } = _t.data;

    let unListData = JSON.parse(JSON.stringify(unList));
    let hazardousDetails = unListData.map(v => {
      console.log('unListData', v)
      return {
        imdgNumber: v.unNumberCode,
        hazardousDetails: [{
          // hazardousId: 0,
          unNumber: v.unNumberCode,
          properShippingName: v.unNumberName,
          packingGroup: v.pickerChooseReault[1].value,
          imdgClass: v.classNumber,
          ems: v.emsCode,
          flashPoint: v.flashPoint,
          flashPointUnit: 'C',
          // marinePollutant: true,
          netWeight: v.netWeight,
          grossWeight: v.grossWeight,
          unit: v.pickerChooseReault[2].value,
          emergencyContactName: v.emergencyContactName,
          emergencyContactNumber: v.emergencyNumber,
          comment: v.commentOptional,
          chemicalName: v.chemicalName,
          limitedQuantity: v.isTransport,
          unVariant: v.chooseUNNumber.unVariant,
          // outerPackaging: {
          //   packagingDesc: 4H1 Expanded plastics boxes,
          //   packagingQuantity: 15,
          //   packagingTypes: O
          // },
          // innerPackaging: {
          //   packagingDesc: 4H1 Expanded plastics boxes,
          //   packagingQuantity: 15,
          //   packagingTypes: O
          // },
          // variation: Packaging group I.,
          // pins: string
        }]
      }
    })

    const submitData = {
      commodity: {
        commodityName,
        commodityCode
      },
      sizeTypeName: pickerChooseReault[1].text,
      sizeTypeCode: pickerChooseReault[1].value,
      shipperOwnedContainer: isUserContainer,
      numberOfContainer: this.data.quantityValue,
      tareWeightUom: 'KGM',
      tareWeight: totalWeightValue,
      netWeight: weightValue,
      netWeightUom: pickerChooseReault[2].value,
      hazardous: isIncludeHazardous,
      // outOfGauge: true,
      // multipleCargo: true,
      reefer: isAddReeft,
      // outOfGaugeDetail: {
      //   back: 10,
      //   front: 20,
      //   height: 30,
      //   left: 20,
      //   right: 30,
      //   overLengthUnit: cm,
      //   overHeightUnit: cm,
      //   overWidthUnit: cm
      // },
      hazardousDetails,
      // reeferDetail: {
      //   operatingMode: addReeft.switchReeferMode,
      //   temperature: addReeft.switchReeferModeValue,
      //   temperatureUnit: addReeft.switchReeferModeUnit.value,
      //   ventilationOpen: addReeft.switchVentilation,
      //   ventilation: addReeft.switchVentilation,
      //   ventilationUnit: 'CBM/HR',
      //   ventilationValue: addReeft.switchVentilationValue,
      //   dehumified: addReeft.switchDehumified,
      //   dehumifiedPercentage: addReeft.switchDehumifiedValue,
      //   controlledAtmosphere: addReeft.switchControlledAtmosphere,
      //   o2Percentage: addReeft.switchControlledAtmosphereValue,
      //   co2Percentage: addReeft.switchControlledAtmosphereValue,
      //   nitrogenPercent: addReeft.switchControlledAtmosphereValue,
      //   gensetRequired: addReeft.switchGensetRequired,
      //   additionalComments: ''
      // }
    };

    console.log('submitData', submitData)
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    currentPage.setCorgoData(submitData, this.data.index)
    wx.navigateBack()
  }
})