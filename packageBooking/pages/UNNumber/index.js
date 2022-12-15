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
    id: '',
    verifyInfo: {},
    // showUNNumberDelete: false,
    showUnNumberLoading: false,
    UNNumberLists: [],
    chooseUNNumber: '',
    unNumberCode: '',
    unNumberName: '',
    // picker
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
        value: 'KGM',
        text: 'KGM (Kilogram)',
        index: 0
      },
      // Packaging Description
      3: {
        value: '',
        text: '',
        index: 0
      },
      // inner Packaging
      4: {
        value: '',
        text: '',
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
      unNumberName: '',
      packingGroup: '',
      classNumber: '',
      emsCode: '',
      chemicalName: '',
      netWeight: '',
      grossWeight: '',
      flashPoint: '',
      emergencyContactName: '',
      emergencyNumber: '',
      quantityValue: '',
      unit: '',
      packageDescriptionName: '',
      quantityValue: '',
      innerPackageDescriptionName: '',
      innerQuantityValue: '',
      emergencyContactName: '',
      emergencyNumber: ''
    },
    // Packaging Description
    packageDescriptionLoading: !1,
    packageDescriptionLists: [],
    packageDescriptionCode: '',
    packageDescriptionName: '',
    quantityValue: '',
    // inner Packaging Description
    isShowInnerPackage: false,
    innerPackageDescriptionLoading: !1,
    innerPackageDescriptionLists: [],
    innerPackageDescriptionCode: '',
    innerPackageDescriptionName: '',
    innerQuantityValue: '',
    emergencyContactName: '',
    emergencyNumber: '',
    commentOptional: '',
    commentOptionalLength: 0,
    scrollEmelemt: '', // 定位元素
    requiredEmelemt: [], // 是否存在验证为空的元素
    scrollToElement: ['unnumber', 'packing-group', 'class', 'emergency-procedure', 'net-weight', 'gross-weight', 'unit', 'packaging-description', 'quantity', 'inner-packaging-description', 'inner-quantity', 'emergency-contact-name', 'emergency-number']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo,
    })

    // 数据回显设置
    if (options?.id) {
      const prevData = JSON.parse(JSON.stringify(wx.getStorageSync('unNumberCache') || []));

      console.log('prevData', prevData)
      if (prevData.length > 0) {
        const index = prevData.findIndex(v => parseInt(v.id) === parseInt(options.id));
        const {
          id,
          chooseUNNumber,
          unNumberCode,
          unNumberName,
          chemicalName,
          pickerChooseReault,
          classNumber,
          emsCode,
          flashPoint,
          netWeight,
          grossWeight,
          packageDescriptionCode,
          packageDescriptionName,
          quantityValue,
          emergencyContactName,
          emergencyNumber,
          isIncludeHazardous,
          isTransport,
          commentOptional,
          commentOptionalLength,
          cacheData,
          isShowInnerPackage,
          innerPackageDescriptionLists,
          innerPackageDescriptionCode,
          innerPackageDescriptionName,
          innerQuantityValue
        } = prevData[index];
        this.setData({
          id,
          chooseUNNumber,
          unNumberCode,
          unNumberName,
          chemicalName,
          pickerChooseReault,
          classNumber,
          emsCode,
          flashPoint,
          netWeight,
          grossWeight,
          packageDescriptionCode,
          packageDescriptionName,
          quantityValue,
          emergencyContactName,
          emergencyNumber,
          isIncludeHazardous,
          isTransport,
          commentOptional,
          commentOptionalLength,
          cacheData,
          isShowInnerPackage,
          innerPackageDescriptionLists,
          innerPackageDescriptionCode,
          innerPackageDescriptionName,
          innerQuantityValue
        })
      }
    }
  },

  enterUNNumber: utils.debounce(function (e) {
    const data = e['0'].detail.value;

    this.setData({
      unNumberName: data,
      unNumberCode: '',
      classNumber: '',
      emsCode: '',
      [`pickerChooseReault.1.text`]: '',
      [`pickerChooseReault.1.value`]: '',
      [`tips.unNumberName`]: !data ? `${this.data.verifyInfo.required}` : '',
      [`cacheData.packingGroup`]: [],
      packageDescriptionLists: [],
      packageDescriptionCode: '',
      packageDescriptionName: '',
      showUnNumberLoading: !1,
      UNNumberLists: []
    })

    // console.log('enterUNNumber', this.data)
    if (data.length < 2) return false;

    this.setData({
      showUnNumberLoading: !0,
    })
    this.getUNNumber(data)
  }, 800),

  getUNNumber(data) {
    UNNumberList({
      keyword: data
    }).then(res => {
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
    const {
      unNumber
    } = this.data.UNNumberLists[index];
    this.setData({
      unNumberCode: this.data.UNNumberLists[index].unNumber,
      unNumberName: this.data.UNNumberLists[index].unNumber + ' - ' + this.data.UNNumberLists[index].unName,
      chooseUNNumber: this.data.UNNumberLists[index],
      UNNumberLists: []
    })
    this.getPackageList(unNumber)
  },

  // get Packing Group list
  getPackageList(unNumber) {
    packageList({
      unNumber
    }).then(res => {
        if (res.data.length) {
          const Data = JSON.parse(JSON.stringify(res.data));
          Data.map((val, index) => {
            val.value = val.packingInsCode;
            val.text = (val.packingGroup || val.variation) ?  (`${val.packingGroup || ''}${val.packingGroup && val.variation ? ' - ' : ''}${val.variation || ''}`) : '-';
            val.index = index;
          });
          this.setData({
            [`cacheData.packingGroup`]: Data
          })
        }
    })
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

  // clickPackingGroup
  clickPackingGroup(e) {
    const lag = languageUtils.languageVersion().lang.page.langue;
    const tips = {
      zh: `UN Number/Shipping Name 必填`,
      en: `UN Number/Shipping Name is Required.`
    };

    if (!this.data.unNumberCode) {
      wx.showToast({
        title: tips[lag],
        icon: 'none'
      })
    } else {
      this.openPicker(e)
    }
  },

  // openPicker
  openPicker({
    currentTarget
  }) {
    const _t = this;
    const type = parseInt(currentTarget.dataset.type);
    const {
      cacheData
    } = _t.data;

    // Packing Group
    if (type === 1) {
      const columnsList = cacheData.packingGroup;
      _t.setData({
        columnsList,
        pickerValueKey: 'text',
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
        pickerValueKey: 'text',
        pickerValueKeyFlag: type,
        isShowPicker: !0
      })
    };

    // Packaging Description
    if (type === 3) {
      _t.setData({
        columnsList: this.data.packageDescriptionLists,
        pickerValueKeyFlag: type,
        pickerValueKey: 'packagingDescription',
        isShowPicker: !0
      })
    }

    // inner Packaging Description
    if (type === 4) {
      _t.setData({
        columnsList: this.data.innerPackageDescriptionLists,
        pickerValueKeyFlag: type,
        pickerValueKey: 'packagingDescription',
        isShowPicker: !0
      })
    }
  },

  // onPickerClose
  onPickerClose() {
    this.setData({
      columnsList: [],
      isShowPicker: !1
    })
  },

  // 展示inner packagingDescription 逻辑
  // 1) O,S -- 显示Inner Packaging
  // 2) I,M -- 不显示Inner Packaging
  // 3) x,null-- 不显示
  checkInner(packagingType) {
    const showArr = ['o', 's'];
    const notShowArr = ['i', 'm', 'x', 'null'];
    const type = `${packagingType || ''}`.toLowerCase();
    if (type && showArr.includes(type)) {
      return true
      _t.getPackageDescription(_isShow)
    } else if (type && notShowArr.includes(type)) {
      return false
    } else {
      return false
    };
  },

  // onPickerConfirm
  onPickerConfirm({
    detail
  }) {
    const _t = this;
    const type = _t.data.pickerValueKeyFlag;
    // set select data
    if (!detail) {
      _t.setData({
        isShowPicker: !1
      });
      return false;
    }
    console.log('detail', detail)

    // Packing Group
    if (type === 1) {
      _t.setData({
        [`tips.packingGroup`]: '',
        [`tips.classNumber`]: '',
        [`tips.emsCode`]: '',
        classNumber: detail.imdgClass,
        emsCode: detail.emsCode
      });
      this.getPackageDescription()
    }
    if (type === 2) {
      _t.setData({
        [`tips.unit`]: ''
      });
    }

    // package Description
    if (type === 3) {
      let isShowInnerPackage = false;
      if (detail.value !== _t.data.packageDescriptionCode) {
        // check inner package Description
        isShowInnerPackage = _t.checkInner(detail.packagingType || '');
        // get inner package Description list
        if (isShowInnerPackage) _t.getPackageDescription(isShowInnerPackage);
        _t.setData({
          [`pickerChooseReault.4.text`]: '',
          [`pickerChooseReault.4.value`]: '',
          innerPackageDescriptionName: '',
          innerPackageDescriptionCode: '',
          [`tips.innerPackageDescriptionName`]: ''
        })
      }

      // 设置 packagingDescription 数据
      this.setData({
        isShowInnerPackage,
        packageDescriptionCode: detail.value,
        packageDescriptionName: detail.text,
        [`tips.packageDescriptionName`]: '',
        requiredEmelemt: this.data.requiredEmelemt
      })
    }

    // inner package Description
    if (type === 4) {
      // this.data.requiredEmelemt[7] = null
      this.setData({
        innerPackageDescriptionCode: detail.value,
        innerPackageDescriptionName: detail.text,
        [`tips.innerPackageDescriptionName`]: '',
        requiredEmelemt: this.data.requiredEmelemt
      })
    }


    // setData
    _t.setData({
      [`pickerChooseReault.${type}`]: detail,
      pickerValueKeyFlag: type,
      isShowPicker: !1
    });
  },

  // clearValue
  clearValue({
    currentTarget
  }) {
    const keys = currentTarget.dataset.keys.split(',');
    const isrequired = currentTarget.dataset.isrequired;
    keys.forEach(v => {
      let msg = '';
      let _val = '';
      if (isrequired) msg = `${this.data.verifyInfo.required}`;

      if (v === 'unNumberName') {
        this.setData({
          isShowInnerPackage: false,
          [`pickerChooseReault.4.text`]: '',
          [`pickerChooseReault.4.value`]: '',
          innerPackageDescriptionName: '',
          innerPackageDescriptionCode: '',
          [`tips.${v}`]: ''
        })
      }

      if (v.includes('.')) {
        var _g = v.split('.');
        _val = this.data[_g[0]][_g[1]][_g[2]]
      } else {
        _val = this.data[v]
      }

      // 先设置提示语，再清数据
      if (_val) {
        if (!v.includes('innerPackageDescriptionName')) {
          this.setData({
            [`tips.${v.includes('pickerChooseReault.1')? 'packingGroup': v}`]: msg
          })
        }
      };
      this.setData({
        [v]: '',
      })
    })
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

  // fix
  recordFloatBlur({
    detail,
    currentTarget
  }) {
    const keys = currentTarget.dataset.keys;
    let {
      value
    } = detail;
    let varLen = value.toString().split(".");
    // if(varLen.length === 1) {
    //   value = `${value.toString()}.00`;
    // };

    if (varLen.length > 1) {
      if (varLen[1] === '') {
        value = `${value.toString()}00`;
      }
      if (varLen[1] !== '' && varLen[1].length < 2) {
        value = `${value.toString()}0`;
      }
    };
    this.setData({
      [`tips.${keys}`]: ((value && parseFloat(value) <= 0) ? `${this.data.verifyInfo.required}` : ''),
      [keys]: ((value && parseFloat(value) <= 0) ? '' : value)
    })
  },

  // setFlashPoint
  setFlashPoint({
    detail,
    currentTarget
  }) {
    const isrequired = currentTarget.dataset.isrequired;
    const flashPoint = this.recordFloat(detail.value) || '';
    let msg = '';
    if (isrequired && !flashPoint) {
      msg = `${this.data.verifyInfo.required}`;
    } else {
      msg = ``;
    }
    this.setData({
      flashPoint,
      [`tips.flashPoint`]: msg
    })
  },

  // setValues
  setValues({
    detail,
    currentTarget
  }) {
    const keys = currentTarget.dataset.keys;
    const keystype = currentTarget.dataset.keystype;
    const isrequired = currentTarget.dataset.isrequired;
    const lag = languageUtils.languageVersion().lang.page.langue;
    const tips = {
      zh: `毛重必须大于净重`,
      en: `Gross weight must be greater than net weight.`
    };
    let {
      value
    } = detail;
    let msg = '';

    if (isrequired && !value) msg = `${this.data.verifyInfo.required}`;
    if (keystype && keystype === 'number') {
      value = this.recordFloat(detail.value) || '';

      if (keys === 'netWeight') {
        const grossWeight = this.data.grossWeight;
        let msg = tips[lag];
        if (grossWeight && (parseFloat(grossWeight) > parseFloat(value))) {
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
  setNumberValues({
    detail,
    currentTarget
  }) {
    const _t = this;
    const keys = currentTarget.dataset.keys;
    const lag = languageUtils.languageVersion().lang.page.langue;
    const tips = {
      zh: `毛重必须大于净重`,
      en: `Gross weight should be greater than Net weight.`
    };
    let value = (detail.value).replace(/[^\d.]/g, '');
    value = this.recordFloat(detail.value) || '';
    let {
      netWeight,
      grossWeight,
      verifyInfo
    } = _t.data;
    let msg = '';
    // console.log('value', value, netWeight, parseFloat(value), parseFloat(netWeight))
    if (!value) msg = `${verifyInfo.required}`;
    if (value && !netWeight) msg = tips[lag];
    if (value && netWeight && parseFloat(netWeight) >= parseFloat(value)) msg = tips[lag];
    _t.setData({
      [`tips.${keys}`]: msg
    })

    this.setData({
      [keys]: value
    })
  },

  // getPackageDescription
  getPackageDescription(innerFlag=false) {
    const loading = !innerFlag? `packageDescriptionLoading`: `innerPackageDescriptionLoading`;
    const list = !innerFlag? `packageDescriptionLists`: `innerPackageDescriptionLists`;

    packageDescription({
      innerFlag,
      packingInsCode: this.data.pickerChooseReault[1].packingInsCode
    }).then(res => {
      let Data = [];
      if (res.data && res.data.length) {
        Data = JSON.parse(JSON.stringify(res.data));
        Data.map((val, index) => {
          val.value = val.packingRef;
          val.text = val.packagingDescription;
          val.index = index;
        });
      };
      this.setData({
        [list]: Data,
        [loading]: !1
      })
    }, () => {
      this.setData({
        [loading]: !1,
      })
      this.getPackageDescription(innerFlag)
    })
  },
  // clickPackagingDescription
  clickPackagingDescription() {
    const lag = languageUtils.languageVersion().lang.page.langue;
    const tips = {
      zh: `请选择 Packing Group`,
      en: `Please select Packing Group.`
    };
    if (!this.data.pickerChooseReault[1]?.packingInsCode) {
      wx.showToast({
        title: tips[lag],
        icon: 'none'
      })
      this.setData({
        packageDescriptionName: '',
        packageDescriptionCode: ''
      })
    };
  },

  // enterPackagingDescription
  enterPackagingDescription: utils.debounce(function (e) {
    const lag = languageUtils.languageVersion().lang.page.langue;
    const tips = {
      zh: `请选择 Packing Group`,
      en: `Please select Packing Group.`
    };
    if (!this.data.pickerChooseReault[1]?.packingInsCode) {
      wx.showToast({
        title: tips[lag],
        icon: 'none'
      })
      this.setData({
        packageDescriptionName: '',
        packageDescriptionCode: ''
      })
      return false
    };
    const data = e[0].detail.value;

    this.setData({
      packageDescriptionName: data,
      packageDescriptionCode: '',
      [`tips.packageDescriptionName`]: !data ? `${this.data.verifyInfo.required}` : '',
      packageDescriptionLoading: !1,
      packageDescriptionLists: []
    })
    if (data.length < 2) {
      return false
    };

    this.setData({
      packageDescriptionLoading: !0,
    })
    this.getPackageDescription()
  }, 800),

  // // choosePackagingDescription
  // choosePackagingDescription({
  //   currentTarget
  // }) {
  //   const {
  //     item
  //   } = currentTarget.dataset;
  //   this.setData({
  //     packageDescriptionCode: item.packingRef,
  //     packageDescriptionName: `${item.packingRef} - ${item.packagingDescription}`,
  //     packageDescriptionLists: []
  //   })
  // },

  // setCommentOptional
  setCommentOptional({
    detail
  }) {
    this.setData({
      commentOptional: detail.value,
      commentOptionalLength: detail.value.length || 0
    })
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
            scrollTop: res.top + 1250,
            duration
          })
        }
      })
    }).exec()
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
      // console.log('v', _val)
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

  // onSave
  onSave() {
    const _t = this;
    const scrollToElement = _t.data.scrollToElement;
    const lag = languageUtils.languageVersion().lang.page.langue;

    // UN Number or Proper Shipping Name
    if (_t.verify('unNumberName', 'unNumberName', scrollToElement[0])) {
      console.log('UN Number or Proper Shipping Name - 为空')
    }

    // Packing Group
    if (_t.verify('pickerChooseReault.1.text', 'packingGroup', scrollToElement[1], _t.data.pickerChooseReault[1].text)) {
      console.log('chemicalName - 为空')
    }

    // Class - classNumber
    if (_t.verify('classNumber', 'classNumber', scrollToElement[2])) {
      console.log('classNumber - 为空')
    }

    // Emergency procedure - emsCode
    if (_t.verify('emsCode', 'emsCode', scrollToElement[3])) {
      console.log('emsCode - 为空')
    }

    // Net Weight - netWeight
    if (_t.verify('netWeight', 'netWeight', scrollToElement[4])) {
      console.log('netWeight - 为空')
    }

    // Gross Weight - grossWeight
    if (_t.verify('grossWeight', 'grossWeight', scrollToElement[5])) {
      console.log('grossWeight - 为空')
    }

    // Unit - unit
    if (_t.verify('pickerChooseReault.2.text', 'unit', scrollToElement[6], _t.data.pickerChooseReault[2].text)) {
      console.log('unit - 为空')
    }

    // Packaging Description - packageDescriptionName
    if (_t.verify('pickerChooseReault.3.text', 'packageDescriptionName', _t.data.pickerChooseReault[3].text)) {
      console.log('packageDescriptionName - 为空')
    }

    // Quantity - quantityValue
    if (_t.verify('quantityValue', 'quantityValue', scrollToElement[8])) {
      console.log('quantityValue - 为空')
    }

    // // Packaging Description - innerPackageDescriptionName
    // if (_t.verify('pickerChooseReault.4.text', 'innerPackageDescriptionName', _t.data.pickerChooseReault[4].text)) {
    //   console.log('innerPackageDescriptionName - 为空')
    // }

    // // innerQuantity - innerQuantityValue
    // if (_t.verify('innerQuantityValue', 'innerQuantityValue', scrollToElement[10])) {
    //   console.log('innerQuantityValue - 为空')
    // }


    // Emergency Contact Name - emergencyContactName
    if (_t.verify('emergencyContactName', 'emergencyContactName', scrollToElement[11])) {
      console.log('emergencyContactName - 为空')
    }

    // Emergency Number - emergencyNumber
    if (_t.verify('emergencyNumber', 'emergencyNumber', scrollToElement[12])) {
      console.log('emergencyNumber - 为空')
    }

    // scrollTo
    _t.scrollTo({
      element: _t.data.requiredEmelemt.find(v => !!v)
    })

    if (_t.data.requiredEmelemt.findIndex(v => !!v) !== -1) {
      console.log('存在必填为空', _t.data.requiredEmelemt, _t.data.requiredEmelemt.findIndex(v => !!v))
      return false
    }

    if (!_t.data.packageDescriptionCode) {
      const tips = {
        zh: `请输入并获取正确的 Packaging Description`,
        en: `Enter and obtain the correct Packaging Description`
      };

      this.setData({
        [`tips.packageDescriptionName`]: tips[lag]
      })
      _t.scrollTo({
        element: 'packaging-description'
      })
      return false
    }

    // inner
    if (_t.data.innerPackageDescriptionName && !_t.data.innerQuantityValue) {
      this.setData({
        [`tips.innerQuantityValue`]: `${_t.data.verifyInfo.required}`
      })
      _t.scrollTo({
        element: 'inner-quantity'
      })
      return false
    }

    // 上层页面数据设置
    const prevData = JSON.parse(JSON.stringify(wx.getStorageSync('unNumberCache') || []));

    console.log('prevData', prevData)
    const {
      chooseUNNumber,
      unNumberCode,
      unNumberName,
      chemicalName,
      pickerChooseReault,
      classNumber,
      emsCode,
      flashPoint,
      netWeight,
      grossWeight,
      packageDescriptionCode,
      packageDescriptionName,
      quantityValue,
      emergencyContactName,
      emergencyNumber,
      isIncludeHazardous,
      isTransport,
      commentOptional,
      commentOptionalLength,
      cacheData,
      isShowInnerPackage,
      innerPackageDescriptionLists,
      innerPackageDescriptionCode,
      innerPackageDescriptionName,
      innerQuantityValue
    } = _t.data;
    const newsData = {
      id: prevData.length + 1,
      chooseUNNumber,
      unNumberCode,
      unNumberName,
      chemicalName,
      pickerChooseReault,
      classNumber,
      emsCode,
      flashPoint,
      netWeight,
      grossWeight,
      packageDescriptionCode,
      packageDescriptionName,
      quantityValue,
      emergencyContactName,
      emergencyNumber,
      isIncludeHazardous,
      isTransport,
      commentOptional,
      cacheData,
      isShowInnerPackage,
      innerPackageDescriptionLists,
      innerPackageDescriptionCode,
      innerPackageDescriptionName,
      innerQuantityValue
    };
    if (_t.data.id) {
      const index = prevData.findIndex(v => parseInt(v.id) === parseInt(_t.data.id));
      prevData[index] = newsData;
    } else {
      prevData.push(newsData);
    };

    console.log('Save data', prevData)

    wx.setStorageSync('unNumberUpdate', prevData);
    wx.removeStorageSync('unNumberCache')
    wx.navigateBack()
    // do something...
  }
})