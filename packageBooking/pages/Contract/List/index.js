// packageBooking/pages/Contract/List/index.js
const languageUtil = require('../../../../utils/languageUtils')
import {
  fuzzyPointSearch,
  quotationQuoteLinesSearch,
  getQuotationSurchargeDetail
} from '../../../../api/modules/quotation'
const util = require('../../../../utils/util')
const size = 5

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
    contractLists: [],
    contractList: [],
    perfectCurrentContractList: [],
    perfectComingContractList: [],
    partialCurrentContractList: [],
    partialComingContractList: [],
    perfectExpiredContractList: [],
    partialExpiredContractList: [],
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
    partnerCode: [],
    contractType: '',
    contractTypeId: '',
    contractTypeList: [],
    valueKey: '',
    defaultIndex: 0,
    showPopup: false,
    page: 0,
    isFirst: true
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

  onReachBottom() {
    if (this.data.contractList.length >= this.data.contractLists.length) return
    this.setData({
      page: ++this.data.page
    })
    this.getPageData()
  },

  changeType(e) {
    this.setData({
      currentType: Number(e.currentTarget.dataset.index),
      page: 0,
      contractType: '',
      contractTypeList: [],
      contractLists: [],
      contractList: []
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
        res.data.perfectMatches.forEach(item => {
          item.contractStatus = util.checkValidDate(item.validityFrom, item.validityTo)
        })
        res.data.partialMatches.forEach(item => {
          item.contractStatus = util.checkValidDate(item.validityFrom, item.validityTo)
        })
        this.setData({
          perfectCurrentContractList: res.data.perfectMatches.filter(i => i.contractStatus === 'valid'),
          perfectComingContractList: res.data.perfectMatches.filter(i => i.contractStatus === 'coming'),
          perfectExpiredContractList: res.data.perfectMatches.filter(i => i.contractStatus === 'expired'),
          partialCurrentContractList: res.data.partialMatches.filter(i => i.contractStatus === 'valid'),
          partialComingContractList: res.data.partialMatches.filter(i => i.contractStatus === 'coming'),
          partialExpiredContractList: res.data.partialMatches.filter(i => i.contractStatus === 'expired'),
          loggedId: res.data.loggedId
        })
        if (this.data.perfectCurrentContractList.length) {
          this.data.contractTypeList.push({
            id: 'currentValid',
            labelCn: '有效报价 - 完全匹配',
            labelEn: 'Current valid offers'
          })
        }
        if (this.data.perfectComingContractList.length) {
          this.data.contractTypeList.push({
            id: 'comingValid',
            labelCn: '未来报价 - 完全匹配',
            labelEn: 'Coming valid offers'
          })
        }
        if (this.data.partialCurrentContractList.length) {
          this.data.contractTypeList.push({
            id: 'additionalValid',
            labelCn: '与您搜索相关的其他结果',
            labelEn: 'Additional results close to your search'
          })
        }
        if (this.data.partialComingContractList.length) {
          this.data.contractTypeList.push({
            id: 'additionalComing',
            labelCn: '未来与您搜索相关的其他结果',
            labelEn: 'Coming additional results close to your search'
          })
        }
        if (this.data.perfectExpiredContractList.length) {
          this.data.contractTypeList.push({
            id: 'expiredOffers',
            labelCn: '失效 - 完全匹配',
            labelEn: 'Expired offers'
          })
        }
        if (this.data.partialExpiredContractList.length) {
          this.data.contractTypeList.push({
            id: 'expiredOffers',
            labelCn: '失效与您搜索相关的其他结果',
            labelEn: 'Expired offers'
          })
        }
        let contractLists = []
        if (this.data.perfectCurrentContractList.length) {
          contractLists = this.data.perfectCurrentContractList
        } else if (this.data.perfectComingContractList.length) {
          contractLists = this.data.perfectComingContractList
        } else if (this.data.partialCurrentContractList.length) {
          contractLists = this.data.partialCurrentContractList
        } else if (this.data.partialComingContractList.length) {
          contractLists = this.data.partialComingContractList
        } else if (this.data.perfectExpiredContractList.length) {
          contractLists = this.data.perfectExpiredContractList
        } else if (this.data.partialExpiredContractList.length) {
          contractLists = this.data.partialExpiredContractList
        }
        this.setData({
          isFirst: false,
          contractTypeList: this.data.contractTypeList,
          contractTypeId: this.data.contractTypeList[0].id,
          contractType: this.data.language === 'zh' ? this.data.contractTypeList[0].labelCn : this.data.contractTypeList[0].labelEn,
          contractLists,
          isLoading: false,
        })
        this.getPageData()
      } else {
        if (this.data.isFirst) {
          this.setData({
            currentType: ++this.data.currentType
          })
          if (this.data.currentType === this.data.typeList.length) {
            this.setData({
              isFirst: false,
              currentType: 0,
              perfectCurrentContractList: [],
              perfectComingContractList: [],
              partialCurrentContractList: [],
              partialComingContractList: [],
              contractLists: [],
              contractList: [],
              loggedId: '',
              isLoading: false
            })
            return
          }
          this.getContractList()
        } else {
          this.setData({
            perfectCurrentContractList: [],
            perfectComingContractList: [],
            partialCurrentContractList: [],
            partialComingContractList: [],
            contractLists: [],
            contractList: [],
            loggedId: '',
            isLoading: false
          })
        }
      }
    }, () => {
      this.setData({
        perfectCurrentContractList: [],
          perfectComingContractList: [],
          partialCurrentContractList: [],
          partialComingContractList: [],
          contractLists: [],
          contractList: [],
        loggedId: '',
        isLoading: false
      })
    })
  },

  openPopup() {
    const index = this.data.contractTypeList.findIndex(i=>i.id === this.data.contractTypeId)
    this.setData({
      valueKey: this.data.language === 'zh' ? 'labelCn' : 'labelEn',
      defaultIndex: index > -1 ? index : 0,
      showPopup: true
    })
  },

  onClose() {
    this.setData({
      showPopup: false
    })
  },

  onConfirm(e) {
    let contractLists = []
    switch (e.detail.id) {
      case "currentValid":
        contractLists = JSON.parse(JSON.stringify(this.data.perfectCurrentContractList))
        break;
      case "comingValid":
        contractLists = JSON.parse(JSON.stringify(this.data.perfectComingContractList))
        break;
      case "additionalValid":
        contractLists = JSON.parse(JSON.stringify(this.data.partialCurrentContractList))
        break;
      case "additionalComing":
        contractLists = JSON.parse(JSON.stringify(this.data.partialComingContractList))
        break;
      default:
        break;
    }
    this.setData({
      showPopup: false,
      page: 0,
      contractTypeId: e.detail.id,
      contractType: this.data.language === 'zh' ? e.detail.labelCn : e.detail.labelEn,
      contractLists,
      contractList: []
    })
    this.getPageData()
  },

  getPageData() {
    let lists = this.data.contractLists.slice(this.data.page * size, (this.data.page + 1) * size)
    // console.log(lists)
    lists = lists.map((item) => {
      return {
        ...item,
        isLoading: true
      }
    }),
    this.setData({
      contractList: this.data.contractList.concat(lists)
    })
    this.dealData()
  },

  dealData() {
    const equipmentTypes = ["20ST", "40ST", "40HC", "45HC", "20RF", "40RF", "40RH", "45RH", "20NOR", "40NOR"]
    for (let index = this.data.page * size; index < this.data.contractList.length; index++) {
      const item = this.data.contractList[index];
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
        item.nacLabel = (item.affiliates.filter(i => i.affiliatesType === 'NAC')).length ? item.affiliates.filter(i => i.affiliatesType === 'NAC').map(i => i.name + (i.city ? ', ' + i.city : ''))[0] : ''
        if (!item.surchargeDetails) {
          this.getQuotationDetailFn(item)
          this.getPointData(item)
        }
      }, 300 * (index - this.data.page * size));
    }
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
        contractList: this.data.contractList
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
      item.portofLoadingCountry = data.data.country.name
      this.setData({
        contractList: this.data.contractList
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
      item.portofDichargeCountry = data.data.country.name
      this.setData({
        contractList: this.data.contractList
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
        contractList: this.data.contractList
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
        contractList: this.data.contractList
      })
    }, () => {
      this.getQuotationDetailFn(item)
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: `/packageBooking/pages/Contract/Detail/index?index=${e.currentTarget.dataset.index}`,
    })
  },

  toBook() {
    wx.showToast({
      title: languageUtil.languageVersion().lang.page.load.functionIsUnderDevelopment,
      icon: 'none'
    })
  }
})