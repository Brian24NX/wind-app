// packagePrice/pages/calculatedCharges/index.js
const app = getApp();
var languageUtil = require('../../../utils/languageUtils')
const utils = require('../../../utils/util')
const dayjs = require("dayjs")
import {
  freightContainerSearch,
  shipmentDetail,
  dndFuzzySearch,
  calculatedCharge
} from '../../api/modules/price';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典
    verifyInfo: {},
    language: 'zh',
    isShow: false,
    result: [],
    tabList: [{
      id: 'byShipment'
    }, {
      id: 'byContainer'
    }],
    actived: 'byShipment',
    containers: [],
    huoGuiValue: '',
    showRemind: false,
    showRemind2: false,
    showDelete1: false,
    showDelete2: false,
    // 日期组件
    showDatePopup: false,
    currentDate: null,
    date: '',
    errTip: '',
    noContainer: false,
    noMore: false,
    page: 1,
    minDate: new Date().setFullYear(new Date().getFullYear() - 2),
    maxDate: new Date().setFullYear(new Date().getFullYear() + 7),
    cankao: '',
    typeList: ['export', 'import'],
    currentType: 'export',
    pol: '',
    pod: '',
    calculatedChargeResult: [],
    showShipment: false,
    searchShipment: [],
    showContainer: false,
    searchContainer: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initLanguage();
    this.setData({
      date: this.getDate(),
      searchShipment: wx.getStorageSync('searchShipment'),
      searchContainer: wx.getStorageSync('searchContainer')
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  //初始化语言
  initLanguage() {
    const language = languageUtil.languageVersion().lang.page
    wx.setNavigationBarTitle({
      title: language.NewDDCharges.title,
    })
    //获取当前小程序语言版本所对应的字典变量
    this.setData({
      languageContent: language.NewDDCharges,
      language: language.langue,
      verifyInfo: language.verifyInfo
    })
  },

  copyUrl() {
    wx.setClipboardData({
      data: 'https://www.cma-cgm.com/ebusiness/invoice',
      success() {
        wx.showToast({
          title: languageUtil.languageVersion().lang.page.copyInfo.success,
          icon: 'none'
        })
      }
    })
  },

  // 切换搜索类型
  changeSearchTab(e) {
    this.setData({
      actived: e.currentTarget.dataset.type,
      huoGuiValue: '',
      errTip: '',
      showRemind: false,
      showRemind2: false,
      containers: [],
      result: [],
      noContainer: false,
      currentType: 'export'
    })
    console.log(this.data.searchShipment,this.data.searchContainer)
  },

  onChange(event) {
    this.setData({
      result: event.detail,
      showRemind3: false
    });
  },

  getDate() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = now.getDate();
    day = day < 10 ? ('0' + day) : day
    return year + '-' + month + '-' + day;
  },

  openPopup(e) {
    if (e.currentTarget.dataset.type === '1' || e.currentTarget.dataset.type === '2') {
      const date = this.data.date.replaceAll('-', '/')
      this.setData({
        currentDate: new Date(date).getTime(),
        showDatePopup: true
      })
      return
    }
    this.setData({
      popupType: e.currentTarget.dataset.type,
      columns: e.currentTarget.dataset.type === '1' ? this.data.searchlist : this.data.weeklist,
      valueKey: e.currentTarget.dataset.type === '1' ? 'method' : 'weeks',
      defaultIndex: e.currentTarget.dataset.type === '1' ? this.data.search : this.data.week - 1,
      showPopup: true
    })
  },

  closeDate() {
    this.setData({
      showDatePopup: false
    })
  },

  confirmDate(e) {
    this.setData({
      date: dayjs(e.detail).format('YYYY-MM-DD'),
      showDatePopup: false
    })
  },

  getMoreContainer() {
    if (this.data.noMore) return
    this.setData({
      page: ++this.data.page
    })
    this.getContainerList()
  },

  searchResult() {
    this.setData({
      noContainer: false,
      containers: [],
      result: [],
      noMore: false,
      page: 1
    })
    if (!this.data.huoGuiValue) {
      this.setData({
        showRemind2: true,
        showRemind: false
      })
      return
    }
    var reg = /^[0-9a-zA-Z]*$/g;
    // 不包含，类型的数据
    if (!reg.test(this.data.huoGuiValue)) {
      this.setData({
        showRemind2: false,
        showRemind: true
      })
      return
    }
    const huoguiStr = this.data.huoGuiValue.replaceAll(' ', '')
    const huogui = (huoguiStr.charAt(huoguiStr.length - 1) === ',' ? huoguiStr.substr(0, huoguiStr.length - 2) : huoguiStr).split(',')
    var reg = /^[0-9a-zA-Z]*$/g;
    const checkRes = []
    var serList = this.data.searchShipment ? this.data.searchShipment : []
    huogui.forEach(item => {
      var noSpaceItem = item.replace(/\s*/g, "")
      checkRes.push(reg.test(noSpaceItem))
      var idx = serList.indexOf(noSpaceItem)
      if (idx !== -1) {
        serList.splice(idx, 1)
        serList.unshift(noSpaceItem)
      } else if (noSpaceItem !== '' && idx === -1) {
        if (serList.length < 5) {
          serList.unshift(noSpaceItem)
        } else {
          serList.unshift(noSpaceItem)
          serList.splice(serList.length - 1, 1)
        }
      }
    })
    let newHis = [...new Set(serList)]
    this.setData({
      searchShipment: newHis
    })
    console.log('555555,searchContainer,searchShipment',this.data.searchContainer,this.data.searchShipment)
    wx.setStorageSync('searchShipment', this.data.searchShipment);
    this.getContainerList()
  },

  getContainerList() {
    if (wx.getStorageSync('partnerList')[0].code == '0002130568') {
      if(this.data.huoGuiValue==='CHN0359450'){
        let res ={
          data:[{"refrigerated":false,"cgVolUom":"MTQ","oversize":false,"returnTerminal":{"code":"","name":""},"equipmentGoods":[{"volume":0,"commodity":{"code":"","name":""},"additionalGoodsDescription":"","package":{"code":"","name":""},"packageOnBl":"","weight":0,"uomVolume":"","uomWeight":"","packageNbPieces":0}],"reeferInfo":{"nitrogen":0,"temperatureUom":"","carbonDioxide":0,"presetTemperature":0,"dehumidity":0,"carriageTemperature":0,"presetCode":"","gensetRequired":false,"maximumTemperature":0,"minimumTemperature":0,"presetRule":"","oxygen":0,"controlledAtmosphere":{"code":"","name":""},"ventilatedOpenPercentage":0},"commodities":{"code":"820570"},"packNb":1216,"returnTurnReference":"","referenceCommodityDesc":"Vices, clamps and the like (excl. accessories for and parts ","uomWeight":"KGM","uomVolume":"MTQ","totalGrossWeight":42440,"discharged":false,"packageBookedQuantity":1216,"outOfGauges":{"backLength":0,"leftWidth":0,"widthUnit":"","frontLength":0,"lengthUnit":"","rightWidth":0,"heightUnit":"","height":0},"cargoMarkDesc":{"cargoItemNumber":1},"numberOfTeu":4,"sealReferences":{"sealNumber4":"","sealOwner4":"","sealNumber2":"","sealOwner3":"","sealNumber3":"","sealOwner2":"","sealOwner1":"CA","sealNumber1":"C6511256","sealType3":"","sealType4":"","sealType1":"Mechanical","sealType2":""},"equipmentRequired":true,"cWgth":13.5968,"containerSequence":0.5,"tcn":"","shortShipped":false,"released":false,"packageNbPieces":0,"cWgthUom":"KGM","hazardous":false,"groupSequence":"CT","requiredQualityGrade":{"code":"GC","name":"General Cargo"},"containerMarkDesc":{"containerNumber":"TRLU8733151","cargoItemNumber":1,"containerSequence":0.5},"cgVol":55,"fumigationRequired":false,"unitaryNetWeight":35000,"readyToLoadAtPortFullDate":{"utc":"0001-01-01T00:00:00"},"volume":110,"containerNumber":"TRLU8733151","loadOnBoardFullDate":{"utc":"0001-01-01T00:00:00"},"cargoItemNumber":1,"containerSizeType":"40ST","packageBooked":"CARTONS","shipperOwned":false,"tareWeight":0},{"refrigerated":false,"cgVolUom":"MTQ","oversize":false,"returnTerminal":{"code":"","name":""},"equipmentGoods":[{"volume":0,"commodity":{"code":"","name":""},"additionalGoodsDescription":"","package":{"code":"","name":""},"packageOnBl":"","weight":0,"uomVolume":"","uomWeight":"","packageNbPieces":0}],"reeferInfo":{"nitrogen":0,"temperatureUom":"","carbonDioxide":0,"presetTemperature":0,"dehumidity":0,"carriageTemperature":0,"presetCode":"","gensetRequired":false,"maximumTemperature":0,"minimumTemperature":0,"presetRule":"","oxygen":0,"controlledAtmosphere":{"code":"","name":""},"ventilatedOpenPercentage":0},"commodities":{"code":"820570"},"packNb":1347,"returnTurnReference":"","referenceCommodityDesc":"Vices, clamps and the like (excl. accessories for and parts ","uomWeight":"KGM","uomVolume":"MTQ","totalGrossWeight":42440,"discharged":false,"packageBookedQuantity":1347,"outOfGauges":{"backLength":0,"leftWidth":0,"widthUnit":"","frontLength":0,"lengthUnit":"","rightWidth":0,"heightUnit":"","height":0},"cargoMarkDesc":{"cargoItemNumber":1},"numberOfTeu":4,"sealReferences":{"sealNumber4":"","sealOwner4":"","sealNumber2":"","sealOwner3":"","sealNumber3":"","sealOwner2":"","sealOwner1":"CA","sealNumber1":"C6499387","sealType3":"","sealType4":"","sealType1":"Mechanical","sealType2":""},"equipmentRequired":true,"cWgth":14.925,"containerSequence":1,"tcn":"","shortShipped":false,"released":false,"packageNbPieces":0,"cWgthUom":"KGM","hazardous":false,"groupSequence":"CT","requiredQualityGrade":{"code":"GC","name":"General Cargo"},"containerMarkDesc":{"containerNumber":"APZU4866559","cargoItemNumber":1,"containerSequence":1},"cgVol":55,"fumigationRequired":false,"unitaryNetWeight":35000,"readyToLoadAtPortFullDate":{"utc":"0001-01-01T00:00:00"},"volume":110,"containerNumber":"APZU4866559","loadOnBoardFullDate":{"utc":"0001-01-01T00:00:00"},"cargoItemNumber":1,"containerSizeType":"40ST","packageBooked":"CARTONS","shipperOwned":false,"tareWeight":0}]
        }
        if (res.data && res.data.length) {
          this.setData({
            containers: this.data.containers.concat(res.data.filter(i => i.containerNumber))
          })
        }
        if (!res.data || !res.data.length || res.data.length < 10) {
          this.setData({
            noMore: true
          })
        }
        if (this.data.page === 1 && (!res.data || !res.data.length)) {
          this.setData({
            noContainer: true
          })
        }
      }
    }else{
      freightContainerSearch({
        bookingReference: this.data.huoGuiValue,
        range: this.data.page
      }).then(res => {
        console.log(JSON.stringify(res.data))
        if (res.data && res.data.length) {
          this.setData({
            containers: this.data.containers.concat(res.data.filter(i => i.containerNumber))
          })
        }
        if (!res.data || !res.data.length || res.data.length < 10) {
          this.setData({
            noMore: true
          })
        }
        if (this.data.page === 1 && (!res.data || !res.data.length)) {
          this.setData({
            noContainer: true
          })
        }
      })
    }
  },

  clearInput() {
    this.setData({
      huoGuiValue: '',
      showRemind3: false,
      showRemind2: false,
      showRemind: false,
      errTip: '',
      result: [],
      containers: [],
      currentType: 'export'
    })
  },

  chooseAll() {
    this.setData({
      showRemind3: false
    })
    if (this.data.result.length === this.data.containers.length) {
      this.setData({
        result: []
      })
    } else {
      this.setData({
        result: this.data.containers.map(i => i.containerNumber)
      })
    }
  },

  setHuoGui(e) {
    //去掉空格和大写问题
    let value = e.detail.value.toUpperCase()
    let regvalue = value.trim()
    const inputType = /[\W]/g
    this.setData({
      huoGuiValue: regvalue.replace(inputType, ''),
      showRemind: false,
      showRemind2: false,
      showRemind3: false,
      errTip: '',
      result: [],
      containers: []
    })
  },

  changeType(e) {
    this.setData({
      currentType: e.currentTarget.dataset.item,
      errTip: ''
    })
  },

  getShipmentDetail() {
    shipmentDetail({
      bookingReference: this.data.actived === 'byShipment' ? this.data.huoGuiValue : this.data.calculatedChargeResult[0].blReference
    }).then(res => {
      const pol = res.data.shipmentSummary.routing.portOfLoading.code
      const pod = res.data.shipmentSummary.routing.portOfDischarge.code

      this.setData({
        pod,
        pol
      })
      console.log(111,this.data)
      this.setResList()
    })
  },

  setResList() {
    const payCountry = (this.data.currentType === 'export' ? this.data.pol : this.data.pod).substr(0, 2)
    const calculatedChargeList = this.data.calculatedChargeResult
    const calculatedChargeLists = []
    let arr = []
    wx.showLoading({
      title: languageUtil.languageVersion().lang.page.load.loading,
      mark: true
    })
    calculatedChargeList.forEach(item => {
      if (wx.getStorageSync('partnerList')[0].code == '0002130568') {
        let res= {
          data: [{"pointCode": "CNSHA", "point": "SHANGHAI;CN;CNSHA"}]
        }
        const data = res.data.filter(i => i.point.split(';')[0] === item.paymentlocation.internalCode)
        // console.log(data[0])
        if (data.length && data[0].pointCode.substr(0, 2) === payCountry) {
          calculatedChargeLists.push(item)
        }
    }else{
        arr.push(
            dndFuzzySearch({
              searchStr: item.paymentlocation.internalCode
            }).then(res => {
              console.log('res.data',res.data,JSON.stringify(res.data))
              const data = res.data.filter(i => i.point.split(';')[0] === item.paymentlocation.internalCode)
              if (data.length && data[0].pointCode.substr(0, 2) === payCountry) {
                calculatedChargeLists.push(item)
              }
            })
        )
        console.log(1,JSON.stringify(arr))
      }

    })
    Promise.all(arr).finally(() => {
      wx.hideLoading()
      if (calculatedChargeLists.length) {
        wx.setStorageSync('calculatedChargeResult', calculatedChargeLists)
        wx.navigateTo({
          url: `/packagePrice/pages/calculatedChargeResult/index`,
        })
      } else {
        this.setData({
          errTip: 'No match found: your ref is incorrect or no charges were raised at this date.'
        })
      }
    })
  },

  calculatedCharges() {
    this.setData({
      errTip: ''
    })
    let params = {}
    if (this.data.actived === 'byShipment') {
      if (!this.data.result.length) {
        this.setData({
          showRemind3: true
        })
        return
      }
      params = {
        shippingCompany: '0001',
        req: {
          chargeCalculationDate: this.data.date,
          containers: this.data.result,
          shipmentReference: [this.data.huoGuiValue]
        }
      }
    } else {
      // 不包含，类型的数据
      console.log(this.data.huoGuiValue)
      if (!this.data.huoGuiValue) {
        this.setData({
          showRemind2: true,
          showRemind: false
        })
        return
      }
      var reg = /[A-Z]{3}[UJZ][0-9]{7}$/;
      // 不包含，类型的数据
      if (!reg.test(this.data.huoGuiValue)) {
        this.setData({
          showRemind2: false,
          showRemind: true
        })
        return
      }
      const huoguiStr = this.data.huoGuiValue.replaceAll(' ', '')
      const huogui = (huoguiStr.charAt(huoguiStr.length - 1) === ',' ? huoguiStr.substr(0, huoguiStr.length - 2) : huoguiStr).split(',')
      var reg = /[A-Z]{3}[UJZ][0-9]{7}$/;
      const checkRes = []
      var serList = this.data.searchContainer ? this.data.searchContainer : []
      huogui.forEach(item => {
        var noSpaceItem = item.replace(/\s*/g, "")
        checkRes.push(reg.test(noSpaceItem))
        var idx = serList.indexOf(noSpaceItem)
        if (idx !== -1) {
          serList.splice(idx, 1)
          serList.unshift(noSpaceItem)
        } else if (noSpaceItem !== '' && idx === -1) {
          if (serList.length < 5) {
            serList.unshift(noSpaceItem)
          } else {
            serList.unshift(noSpaceItem)
            serList.splice(serList.length - 1, 1)
          }
        }
      })
      let newHis = [...new Set(serList)]
      this.setData({
        searchContainer: newHis
      })
      console.log('searchContainer,searchShipment',this.data.searchContainer,this.data.searchShipment)
      wx.setStorageSync('searchContainer', this.data.searchContainer);
      params = {
        shippingCompany: '0001',
        req: {
          chargeCalculationDate: this.data.date,
          containers: [this.data.huoGuiValue],
          shipmentReference: []
        }
      }
    }
    if (wx.getStorageSync('partnerList')[0].code == '0002130568') {
      console.log(this.data.huoGuiValue)
      if(this.data.huoGuiValue=='APZU4866559'||this.data.huoGuiValue=='CHN0359450'){
        const res={
          data:[{"billableDays":14,"amount":8630,"blReference":"CHN0359450","payable":false,"chargeId":"1123157810","containerId":"APZU4866559","chargeName":"Merge","currencyCode":"CNY","freeDate":"2023-06-25T00:00:00Z","chargeDetails":[{"fromDate":"2023-06-12T00:00:00Z","calculationType":"Calendar","billableAmount":0,"toDate":"2023-06-25T00:00:00Z","ratePerDay":"0","currencyCode":"CNY","noOfDays":14},{"fromDate":"2023-06-26T00:00:00Z","calculationType":"Calendar","billableAmount":1480,"toDate":"2023-06-29T00:00:00Z","ratePerDay":"370","currencyCode":"CNY","noOfDays":4},{"fromDate":"2023-06-30T00:00:00Z","calculationType":"Calendar","billableAmount":4585,"toDate":"2023-07-06T00:00:00Z","ratePerDay":"655","currencyCode":"CNY","noOfDays":7},{"fromDate":"2023-07-07T00:00:00Z","calculationType":"Calendar","billableAmount":2565,"toDate":"2023-07-09T00:00:00Z","ratePerDay":"855","currencyCode":"CNY","noOfDays":3}],"paymentlocation":{"name":"BRILLIANT DEPOT","internalCode":"SHANGHAI"}}]
        }
        const pol = 'USSAV'
        const pod = 'CNSHA'
        if (res.data && res.data.length) {
          this.setData({
            calculatedChargeResult: res.data,
            pod,
            pol,
          })
        } else {
          this.setData({
            calculatedChargeResult: [],
            pod,
            pol
          })
        }
        this.setResList()
      }else{
        this.setData({
          errTip: 'No match found: your ref is incorrect or no charges were raised at this date.'
        })
      }

    }else{
      calculatedCharge(params).then(res => {
        console.log(res.data,JSON.stringify(res.data))
        if (res.data && res.data.length) {
          this.setData({
            calculatedChargeResult: res.data
          })
        } else {
          this.setData({
            calculatedChargeResult: []
          })
        }
        this.getShipmentDetail()
        // this.getDndFuzzySearch()
      }, err => {
        if (err.code === '422' || err.message === 'Response status code does not indicate success: 400 (Bad Request).') {
          this.setData({
            errTip: 'No match found: your ref is incorrect or no charges were raised at this date.'
          })
        } else {
          this.setData({
            errTip: err.message
          })
        }
      })
    }

  },


  chooseShipment(e) {
    this.setData({
      huoGuiValue: e.detail,
    })
    this.searchResult()
  },
  delShipment(e) {
    this.setData({
      searchShipment: e.detail
    })
    wx.setStorageSync('searchShipment', e.detail)
  },
  showSearchShipment() {
    this.setData({
      showShipment: true
    })
  },

  hideSearchShipment() {
    this.setData({
      showShipment: false
    })
  },
  chooseContainer(e) {
    this.setData({
      huoGuiValue: e.detail,
    })
  },
  delContainer(e) {
    this.setData({
      searchContainer: e.detail
    })
    wx.setStorageSync('searchContainer', e.detail)
  },
  showSearchContainer() {
    this.setData({
      showContainer: true
    })
  },

  hideSearchContainer() {
    this.setData({
      showContainer: false
    })
  },
})