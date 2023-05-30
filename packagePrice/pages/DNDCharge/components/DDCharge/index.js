// packagePrice/pages/DNDCharge/components/DDCharge/index.js
var languageUtil = require('../../../../../utils/languageUtils')
const utils = require('../../../../../utils/util')
import {
  chargeFuzzySearch,
  equitmentSizeList
} from '../../../../../api/modules/home';
Component({

  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    hide: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
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
      label: 'refrigerated',
      id: 'refrigerated',
      disabled: true,
      isDefault: false,
      isChecked: false
    }, {
      label: 'hazardous',
      id: 'hazardous',
      disabled: true,
      isDefault: false,
      isChecked: false
    }],
    pollist: [],
    podlist: [],
    specialCargoDefault: '',
    specialCargo: [],
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
    showPol: false,
    podCount:0,
    showPod: false,
    polCount:0,
  },

  attached() {
    this.initLanguage()
    this.getEquitmentSizeList()
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
      equitmentSizeList().then(res => {
        this.setData({
          columns: res.data
        })
      })
    },

    //获取起始港的接口处理
    changepol: utils.debounce(function (e) {
      const data = e['0'].detail.value
      this.setData({
        showDelete1: !!data,
        showRemind1: false,
        showRemind2: false,
        showPol: false,
        polCount:0,
        pollist: []
      })
      if (data.length < 2) {
        this.setData({
          pollist: []
        })
        return
      }
      this.getPolData(data)
    }, 800),

    getPolData(data) {
      this.setData({
        showPol: true
      })
      chargeFuzzySearch({
        searchStr: data
      }, true).then(res => {
        this.setData({
          showPol: false,
          polCount:0,
        })
        if (res.data != ''&&res.data!==undefined) {
          this.setData({
            pollist: res.data || []
          })
        }
      }, () => {
        this.data.polCount++
        if(this.data.polCount<=3){
          this.getPolData(data)
        }else{
          this.setData({
            showPol: false,
            polCount:0,
          })
        }
      })
    },

    //获取卸货港的接口处理
    changepod: utils.debounce(function (e) {
      const data = e['0'].detail.value
      this.setData({
        showDelete2: !!data,
        showRemind3: false,
        showRemind4: false,
        showPod: false,
        podCount:0,
        podlist: []
      })
      if (data.length < 2) {
        this.setData({
          podlist: []
        })
        return
      }
      this.getPodData(data)
    }, 800),

    getPodData(data) {
      this.setData({
        showPod: true
      })
      chargeFuzzySearch({
        searchStr: data
      }, true).then(res => {
        this.setData({
          showPod: false,
          podCount:0,
        })
        if (res.data != ''&&res.data!==undefined) {
          this.setData({
            podlist: res.data || []
          })
        }
      }, () => {
        this.data.podCount++
        if(this.data.podCount<=3){
          this.getPodData(data)
        }else{
          this.setData({
            showPod: false,
            podCount:0,
          })
        }
      })
    },

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
      if (e.currentTarget.dataset.item.disabled || e.currentTarget.dataset.item.isDefault) return
      const id = e.currentTarget.dataset.item.id
      const index = this.data.specialCargo.findIndex(i => i === id)
      if (index > -1) {
        this.data.specialCargo.splice(index, 1)
        this.data.typeList[this.data.typeList.findIndex(i => i.id === id)].isChecked = false
      } else {
        this.data.specialCargo.push(id)
        this.data.typeList[this.data.typeList.findIndex(i => i.id === id)].isChecked = true
      }
      this.setData({
        specialCargo: this.data.specialCargo,
        typeList: this.data.typeList
      })
    },

    openPopup() {
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
      let typeList = this.data.typeList
      typeList[0].disabled = e.detail.specialCargo.indexOf(typeList[0].id) === -1
      typeList[1].disabled = e.detail.specialCargo.indexOf(typeList[1].id) === -1
      typeList[0].isDefault = false
      typeList[0].isChecked = false
      typeList[1].isDefault = false
      typeList[1].isChecked = false
      if (e.detail.specialCargoDefault) {
        if (e.detail.specialCargoDefault === 'refrigerated') {
          typeList[0].isDefault = true
          typeList[0].isChecked = true
        } else if (e.detail.specialCargoDefault === 'hazardous') {
          typeList[1].isDefault = true
          typeList[1].isChecked = true
        }
      }
      this.setData({
        equipmentSize: e.detail.code,
        equipmentSizeName: this.data.language === 'zh' ? e.detail.nameCn : e.detail.nameEn,
        showPopup: false,
        typeList,
        specialCargo: e.detail.specialCargoDefault ? [e.detail.specialCargoDefault] : []
      })
    },

    // 提交搜索
    submit() {
      if (this.data.showDelete1) {
        this.setData({
          showRemind1: false
        })
        var reg = /^([ ]*[A-z0-9]+([\,\.\-\;]*)){2,}$/;
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
  }
})