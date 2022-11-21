// packageBooking/pages/Contract/List/index.js
const languageUtil = require('../../../../utils/languageUtils')
import {
  fuzzyPointSearch,
  quotationQuoteLinesSearch,
  getQuotationSurchargeDetail
} from '../../../../api/modules/quotation'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    fromLabel: '',
    fromCode: '',
    toLabel: '',
    toCode: '',
    equipmentType: '',
    simulationDate: '',
    perfectContractList: [],
    partialContractList: [],
    loggedId: '',
    isLoading: true,
    portOfLoading: '',
    portOfDischarge: '',
    commonEquipmentType: '',
    placeOfOrigin: '',
    portOfLoadingCode: '',
    portOfDischargeCode: '',
    finalPlaceOfDelivery: '',
    namedAccountCode: '',
    currentType: 0,
    typeList: [{
      label: 'CMA',
      shippingCompany: '0001'
    }, {
      label: 'ANL',
      shippingCompany: '0002'
    }, {
      label: 'CNC',
      shippingCompany: '0011'
    }, {
      label: 'APL',
      shippingCompany: '0015'
    }],
    partnerCode: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title3
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      language: languageUtil.languageVersion().lang.page.langue,
      equipmentType: data.commonEquipmentTypeName,
      partnerCode: data.partnerCode,
      simulationDate: data.simulationDate,
      namedAccountCode: data.namedAccountCode,
      portOfLoading: data.portOfLoadingLabel,
      portOfDischarge: data.portOfDischargeLabel,
      fromLabel: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[0] : data.portOfLoadingLabel.split(';')[0],
      fromCode: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[1] : data.portOfLoadingLabel.split(';')[1],
      toLabel: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[0] : data.portOfDischargeLabel.split(';')[0],
      toCode: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[1] : data.portOfDischargeLabel.split(';')[1],
      commonEquipmentType: data.commonEquipmentType,
      placeOfOrigin: data.placeOfOrigin,
      portOfLoadingCode: data.portOfLoading,
      portOfDischargeCode: data.portOfDischarge,
      finalPlaceOfDelivery: data.finalPlaceOfDelivery
    })
    this.getContractList()
  },

  changeType(e) {
    this.setData({
      currentType: Number(e.currentTarget.dataset.index)
    })
    this.getContractList()
  },

  getContractList() {
    this.setData({
      isLoading: true
    })
    quotationQuoteLinesSearch({
      "affiliates": this.data.partnerCode,
      "equipmentType": this.data.commonEquipmentType,
      "placeOfOrigin": this.data.placeOfOrigin || null,
      "portOfLoading": this.data.portOfLoadingCode,
      "portOfDischarge": this.data.portOfDischargeCode,
      "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
      "shippingCompany": this.data.typeList[this.data.currentType].shippingCompany,
      "simulationDate": this.data.simulationDate,
      "namedAccount": this.data.namedAccountCode || null
    }).then(res => {
      if (res.data) {
        this.setData({
          perfectContractList: res.data.perfectMatches || [],
          partialContractList: res.data.partialMatches || [],
          loggedId: res.data.loggedId,
          isLoading: false
        })
        this.dealData()
      } else {
        this.setData({
          perfectContractList: [],
          partialContractList: [],
          loggedId: '',
          isLoading: false
        })
      }
    }, () => {
      this.setData({
        perfectContractList: [],
        partialContractList: [],
        loggedId: '',
        isLoading: false
      })
    })
  },

  dealData() {
    this.setData({
      perfectContractList: this.data.perfectContractList.map((item) => {
        return {
          ...item,
          isLoading: true
        }
      }),
      partialContractList: this.data.partialContractList.map((item) => {
        return {
          ...item,
          isLoading: true
        }
      })
    })
    const equipmentTypes = ["20ST", "40ST", "40HC", "45HC", "20RF", "40RF", "40RH", "45RH", "20NOR", "40NOR"]
    this.data.perfectContractList.forEach((item, index) => {
      setTimeout(() => {
        const usContract = item.portOfDischarge.indexOf('US') > -1 ? true : false
        item.usContract = usContract
        item.equipments.sort((a, b) => {
          return equipmentTypes.indexOf(a.code) - equipmentTypes.indexOf(b.code);
        });
        item.equipmentTypeLabel = item.equipments.map(i => i.code).join(' | ')
        item.specialTags = []
        if (item.hazardous) {
          item.specialTags.push('HAZ')
        }
        if (item.overHeight || item.overLength || item.overWidth) {
          item.specialTags.push('OOG')
        }
        if (item.shipperOwnedContainer) {
          item.specialTags.push('SOC')
        }
        if (item.nonOperatingReefer) {
          item.specialTags.push('NOR')
        }
        item.nacLabel = item.affiliates.filter(i => i.affiliatesType === 'NAC').map(i => i.name).join(', ')
        if (!item.surchargeDetails) {
          this.getQuotationDetailFn(item)
          this.getPointData(item)
        }
      }, 300 * index);
    })
    this.data.partialContractList.forEach((item, index) => {
      setTimeout(() => {
        const usContract = (item.portOfLoading.indexOf('US') > -1 || item.portOfDischarge.indexOf('US') > -1) ? true : false
        item.usContract = usContract
        item.equipments.sort((a, b) => {
          return equipmentTypes.indexOf(a.code) - equipmentTypes.indexOf(b.code);
        });
        item.equipmentTypeLabel = item.equipments.map(i => i.code).join(' | ')
        if (!item.surchargeDetails) {
          this.getQuotationDetailFn(item)
          this.getPointData(item)
        }
      }, 300 * index);
    })
  },

  getPointData(item) {
    this.getInitialPlaceOfReceiptLabel(item)
    this.getInitialPortOfLoading(item)
    this.getInitialPortOfDischarge(item)
    this.getPortOfDelivery(item)
  },

  getInitialPlaceOfReceiptLabel(item) {
    if (!item.exportInlandPointCode) return
    fuzzyPointSearch({
      pointCode: item.exportInlandPointCode
    }).then(data => {
      item.placeOfReceiptLabel = data.data.point.name + ', ' + data.data.country.code
      this.setData({
        perfectContractList: this.data.perfectContractList,
        partialContractList: this.data.partialContractList
      })
    }, () => {
      this.getInitialPlaceOfReceiptLabel(item)
    })
  },

  getInitialPortOfLoading(item) {
    fuzzyPointSearch({
      pointCode: item.portOfLoading
    }).then(data => {
      item.portOfLoadingLabel = data.data.point.name + ', ' + data.data.country.code
      this.setData({
        perfectContractList: this.data.perfectContractList,
        partialContractList: this.data.partialContractList
      })
    }, () => {
      this.getInitialPortOfLoading(item)
    })
  },

  getInitialPortOfDischarge(item) {
    fuzzyPointSearch({
      pointCode: item.portOfDischarge
    }).then(data => {
      item.portOfDischargeLabel = data.data.point.name + ', ' + data.data.country.code
      this.setData({
        perfectContractList: this.data.perfectContractList,
        partialContractList: this.data.partialContractList
      })
    }, () => {
      this.getInitialPortOfDischarge(item)
    })
  },

  getPortOfDelivery(item) {
    if (!item.importInlandPointCode) return
    fuzzyPointSearch({
      pointCode: item.importInlandPointCode
    }).then(data => {
      item.placeOfDeliveryLabel = data.data.point.name + ', ' + data.data.country.code
      this.setData({
        perfectContractList: this.data.perfectContractList,
        partialContractList: this.data.partialContractList
      })
    }, () => {
      this.getPortOfDelivery(item)
    })
  },

  getQuotationDetailFn(item) {
    getQuotationSurchargeDetail({
      "surchargeFromLara": {
        quoteLineId: item.quoteLineId,
        shippingCompany: item.shippingCompany,
        equipments: item.equipments,
        simulationDate: this.data.simulationDate,
        paymentMethod: null,
        usContract: item.usContract,
        portOfLoading: item.portOfLoading,
        portOfDischarge: item.portOfDischarge,
        loggedId: this.data.loggedId,
        nextDepartureSolutionNumber: item.solutionNumber,
        nextDepartureScheduleNumber: item.scheduleNumber,
        quoteLineKey: item.qlKey
      }
    }, wx.getStorageSync('ccgId')).then(res => {
      item.isLoading = false
      if (res.data) {
        item.noOfContainersAvailable = res.data.allocationDetails ? res.data.allocationDetails.noOfContainersAvailable : 0
        item.surchargeDetails = res.data ? res.data.surchargeDetails : null
        // item.surchargeDetails.allocation = res.data.allocationDetails ? res.data.allocationDetails.allocation : true
      }
      this.setData({
        perfectContractList: this.data.perfectContractList,
        partialContractList: this.data.partialContractList
      })
    }, () => {
      this.getQuotationDetailFn(item)
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: `/packageBooking/pages/Contract/Detail/index?index=${e.currentTarget.dataset.index}&from=${e.currentTarget.dataset.from}`,
    })
  }
})