// pages/Quotation/Detail/index.js
const languageUtil = require('../../../utils/languageUtils')
import {
  vasLists,
  createQuotationQuotation,
  seaEarnPoints,
} from '../../../api/modules/quotation';

import { writeOperationLog } from '../../../api/modules/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    vasLanguageContent: {},
    seaReward: {},
    language: 'zh',
    baseUrl: '',
    languageCode: '',
    todayDate: '',
    isFirst: true,
    scrollTop: 0,//控制上滑距离
    otherList: [{
      icon: '/assets/img/instantQuote/other_1@2x.png',
      label: 'localCharge',
      url: "/pages/Quotation/Others/LocalCharges/index",
      show: true
    }, {
      icon: '/assets/img/instantQuote/other_2@2x.png',
      label: 'DDSM',
      url: "/pages/Quotation/Others/DDCharges/index",
      show: true
    }, {
      icon: '/assets/img/instantQuote/other_3@2x.png',
      label: 'SpotOn',
      url: "/pages/Quotation/Others/SpotOn/index",
      show: true
    }, {
      icon: '/assets/img/instantQuote/other_4@2x.png',
      label: 'addInfo',
      url: "/pages/Quotation/Others/AdditionalInformation/index",
      show: true
    }],
    fromLabel: "",
    fromCode: '',
    toLabel: '',
    toCode: '',
    quotationDetail: {},
    totalChargeAmount: 0,
    equipmentTypeSize: '',
    equipmentTypeName: '',
    weight: '',
    containers: '',
    commodityName: '',
    shippingCompany: '',
    simulationDate: '',
    traceId: '',
    portOfLoading: '',
    portOfLoadingLabel: '',
    portOfDischarge: '',
    portOfDischargeLabel: '',
    placeOfOrigin: '',
    finalPlaceOfDelivery: '',
    partnerCode: [],
    vasList: [],
    subscribedServices: [],
    noSelectVasList: [],
    showVas: false,
    isUs: false,
    isSocAgree: false,
    shipperOwnedContainer: false,
    showError: false,
    foldContainerRate: true,
    foldBLRate: true,
    foldQuoteDetail: true,
    foldSoc: true,
    burnRewards: 0,
    rewardsEarned: null,   //海里
    useRewards: false,
    finalPrice: 0,    //总计 （订阅）
    sum:0,//初始值
    rewardsLevel: '',
    memberStatus: '',
    addMoney:0, //增值订阅服务的总额
    reduceMoney:false,//是否抵扣海里
    count:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.qutationResult.title2
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    const languages = languageUtil.languageVersion().lang.page
    this.setData({
      languageContent: languages.qutationResult,
      vasLanguageContent: languages.vas,
      language: languages.langue,
      seaReward: languageUtil.languageVersion().lang.page.seaReward,
      isUs: data.isUs,
      languageCode: languages.langue === 'zh' ? 'zh_CN' : 'en_US',
      baseUrl: "https://www.cma-cgm.com/static/ecommerce/VASAssets/" + (languages.langue === 'zh' ? 'zh_CN' : 'en_US') + "/",
      partnerCode: data.partnerCode,
      todayDate: this.getDate(),
      portOfLoading: data.portOfLoading,
      portOfLoadingLabel: data.portOfLoadingLabel,
      portOfDischarge: data.portOfDischarge,
      portOfDischargeLabel: data.portOfDischargeLabel,
      placeOfOrigin: data.placeOfOrigin,
      finalPlaceOfDelivery: data.finalPlaceOfDelivery,
      transMode: wx.getStorageSync('transMode'),
      shipperOwnedContainer: data.shipperOwnedContainer,
      isSocAgree: wx.getStorageSync('isSocAgree') ? wx.getStorageSync('isSocAgree') : false,
      rewardsLevel: wx.getStorageSync('seaRewardData').level,
      burnRewards: wx.getStorageSync('seaRewardData').pointsBalance,
      memberStatus: wx.getStorageSync('seaRewardData').memberStatus,
      containers: data.containers
    })
    this.setDefaultInfo(options.index, options.containers)
    if (!this.data.isUs) {
      this.getVasList()
    }
  },

  getSeaEarnPoints(amount) {
    // if(this.data.subscribedServices.length!==0&&this.data.reduceMoney){

    //   if(this.data.count===1){
    //     if(this.data.reduceMoney) {
    //       sum = sum - this.data.burnRewards
    //     }
    //   }
    // }
    // console.log("------amount-------",amount,sum)
    console.log('333333333333',amount,this.data.addMoney,this.data.sum,this.data.reduceMoney)

    seaEarnPoints({
      "baseAmount":amount - this.data.addMoney,
      "currencyType": this.data.quotationDetail.surchargeDetails.totalCharge.currency.code,
      "partnerCode": wx.getStorageSync('partnerList')[0].code,
      "level": wx.getStorageSync('seaRewardData').level
    }).then(res => {
      console.log("--------------",this.data.reduceMoney,res.data.simulationResults[0].changeInPointsBalance)
        this.setData({
          rewardsEarned:  res.data ? res.data.simulationResults[0].changeInPointsBalance : null
        })
    })
  },

  setDefaultInfo(index, containers) {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let quotationDetail = data.quoteLineList[index]
    // let surchargeDetail = quotationDetail.surchargeDetails[this.data.currentEquipmentType]
    // console.log(quotationDetail)
    if (quotationDetail.surchargeDetails.oceanFreight.paymentMethod === 'Collect') {
      quotationDetail.surchargeDetails.collectChargeDetails = quotationDetail.surchargeDetails.collectChargeDetails.concat(quotationDetail.surchargeDetail.freightChargeDetails)
      quotationDetail.surchargeDetails.freightChargeDetails = []
      quotationDetail.surchargeDetails.collectCharges.amount += quotationDetail.surchargeDetails.freightCharges.amount
      quotationDetail.surchargeDetails.freightCharges.amount = 0
    }
    quotationDetail.surchargeDetails.oceanFreightDetailsLabel = quotationDetail.surchargeDetails.oceanFreightDetails.join(' / ')
    quotationDetail.surchargeDetails.oceanFreight.isChecked = true
    quotationDetail.surchargeDetails.freightCharges.isChecked = true
    quotationDetail.surchargeDetails.prepaidCharges.isChecked = true
    quotationDetail.surchargeDetails.collectCharges.isChecked = true
    this.data.otherList[2].show = quotationDetail.quoteLines[0].spotOffer
    this.setData({
      fromLabel: data.fromLabel,
      fromCode: data.fromCode,
      toLabel: data.toLabel,
      toCode: data.toCode,
      receiptHaulage: data.receiptHaulage,
      deliveryHaulage: data.deliveryHaulage,
      shippingCompany: data.shippingCompany,
      quotationDetail,
      simulationDate: data.simulationDate,
      traceId: data.traceId,
      otherList: this.data.otherList
    })
    this.calculatedCharges()
    const currentPage2 = pages[pages.length - 3]
    const data2 = currentPage2.data
    this.setData({
      equipmentTypeSize: data2.equiptCode,
      equipmentTypeName: data2.equipmentTypeName,
      weight: data2.weight,
      containers: containers || data2.containers,
      commodityName: data2.commodityName
    })
  },

  previewVas() {
    if (!this.data.subscribedServices.length) return
    this.setData({
      showVas: !this.data.showVas
    })
  },

  // 折叠
  zhedie(e) {
    this.setData({
      [e.currentTarget.dataset.type]: !this.data[e.currentTarget.dataset.type]
    })
  },

  calculatedCharges() {
    const surchargeDetails = this.data.quotationDetail.surchargeDetails
    let addMoney = 0
     console.log("'''''''''''surchargeDetails'''''''",surchargeDetails)
    let totalChargeAmount = 0
    if (surchargeDetails.oceanFreight.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.oceanFreight.price.amount
    }
    if (surchargeDetails.freightCharges.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.freightCharges.amount
    }
    if (surchargeDetails.prepaidCharges.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.prepaidCharges.amount
    }
    if (surchargeDetails.collectCharges.isChecked) {
      totalChargeAmount = totalChargeAmount + surchargeDetails.collectCharges.amount
    }

    console.log('********订阅*********',this.data.sum)
    this.setData({
      sum:totalChargeAmount
    })
    //订阅的数组
    this.data.subscribedServices.forEach(i => {
      if (i.seletcedProduct.levelOfCharge === 'Per Container' && !i.seletcedProduct.isInclude) {
        totalChargeAmount = totalChargeAmount + i.seletcedProduct.amount
        addMoney = addMoney+ i.seletcedProduct.amount
      }
      console.log(true,'11111111111111')
    })

    console.log('++++++++++++0+++++++++++++',totalChargeAmount,addMoney,sum, this.data.count)
    this.setData({
      totalChargeAmount: totalChargeAmount || this.data.quotationDetail.surchargeDetails.totalCharge.amount,
      addMoney:addMoney
    })

    this.setData({
      finalPrice: this.data.totalChargeAmount * this.data.containers,
    })
    if (this.data.finalPrice < wx.getStorageSync('seaRewardData').pointsBalance) {
      this.setData({
        burnRewards: this.data.finalPrice
      })
    }
    if(this.data.memberStatus === 'Active'){
      this.getSeaEarnPoints(this.data.finalPrice)
    } 
  },

  changeCheck(e) {
    this.data.quotationDetail.surchargeDetails[e.currentTarget.dataset.id].isChecked = !this.data.quotationDetail.surchargeDetails[e.currentTarget.dataset.id].isChecked
    this.setData({
      quotationDetail: this.data.quotationDetail
    })
    this.calculatedCharges()
  },

  toOther(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.item.url,
    })
  },

  openAdditionalService() {
    this.selectComponent("#additionalServices").onClickOpen()
  },

  toLineDetail() {
    wx.navigateTo({
      url: '/pages/Quotation/LineDetail/index',
    })
  },

  toRemind() {
    wx.navigateTo({
      url: '/pages/Quotation/Others/Remind/index',
    })
  },

  back() {
    this.setData({
      isFirst: true,
    })
    wx.pageScrollTo({
      duration: 300,
      scrollTop: 0
    })
  },

  checkBoxToggle({
    currentTarget
  }) {
    const keys = currentTarget.dataset.keys;
    this.setData({
      [keys]: !this.data[keys],
    })
    if (!this.data.isSocAgree) {
      this.setData({
        showError: true
      })
    } else {
      this.setData({
        showError: false
      })
    }
    wx.setStorageSync('isSocAgree', this.data.isSocAgree)
  },

  submit() {
    if (this.data.shipperOwnedContainer !== this.data.isSocAgree) {
      this.setData({
        showError: true,
        foldSoc: false
      })
      wx.pageScrollTo({
        duration: 500,
        scrollTop: 2000
      })
      return
    }
    if (this.data.isFirst) {
      this.setData({
        isFirst: false
      })
      wx.pageScrollTo({
        duration: 300,
        scrollTop: 0
      })
    } else {
      let params = {}
      let vasChargeDetails = []
      this.data.subscribedServices.forEach(item => {
        vasChargeDetails.push({
          "calculationType": item.seletcedProduct.calculationType || '',
          "cargoLines": item.seletcedProduct.cargoLines,
          "chargeCode": item.seletcedProduct.chargeCode,
          "chargeName": item.seletcedProduct.chargeName,
          "currency": item.seletcedProduct.currency,
          "description": item.seletcedProduct.subscriptionMode || '',
          "expectedActions": item.expectedActions,
          "hasChargeSelected": true,
          "levelOfCharge": item.seletcedProduct.levelOfCharge,
          "maximumChargeableAmount": item.seletcedProduct.minimumChargeableAmount || '',
          "minimumChargeableAmount": item.seletcedProduct.maximumChargeableAmount || '',
          "rateFrom": item.seletcedProduct.rateFrom,
          "subscribedAmount": (item.seletcedProduct.levelOfCharge === 'Per BL' && item.seletcedProduct.calculationType !== 'FIX') ? item.seletcedProduct.amount : item.seletcedProduct.rateFrom,
          "subscriptionMode": item.seletcedProduct.subscriptionMode || ''
        })
      })
      if (this.data.useRewards && this.data.burnRewards && this.data.burnRewards !== 0) {
        vasChargeDetails.push({
          "calculationType": '',
          "cargoLines": [],
          "chargeCode": 'FRT33',
          "chargeName": '',
          "currency": 'USD',
          "description": '',
          "expectedActions": '',
          "hasChargeSelected": false,
          "levelOfCharge": '',
          "maximumChargeableAmount": '',
          "minimumChargeableAmount": '',
          "rateFrom": '',
          "subscribedAmount": this.data.burnRewards,
          "subscriptionMode": ''
        })
      }
      if (this.data.quotationDetail.quoteLines[0].quoteLineId) {
        params = {
          "createLaraSpecialQuotation": {
            "affiliates": this.data.partnerCode,
            "simulationDate": this.data.simulationDate,
            "equipmentSizeType": this.data.equipmentTypeSize,
            "numberOfContainers": this.data.containers,
            "weightPerContainer": this.data.weight,
            "polCountryCode": this.data.portOfLoading.substring(0, 2),
            "podCountryCode": this.data.portOfDischarge.substring(0, 2),
            "allowSpecialQuotation": this.data.quotationDetail.quoteLines[0].allowSpecialQuotation,
            "spotValidityInDays": this.data.quotationDetail.quoteLines[0].spotValidityInDays,
            "routingComment": this.data.quotationDetail.quoteLines[0].routingComment,
            "voyageRef": this.data.quotationDetail.voyage,
            "arrivalDate": this.data.quotationDetail.arrivalDate,
            "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
            "placeOfOrigin": this.data.placeOfOrigin || null,
            "quoteLineId": "string",
            "portOfLoading": this.data.portOfLoading,
            "portOfDischarge": this.data.portOfDischarge,
            "initialPortOfLoading": this.data.portOfLoading,
            "initalPortOfDischarge": this.data.portOfDischarge,
            "traceId": this.data.quotationDetail.traceId,
            vasChargeDetails
          }
        }
      } else {
        params = {
          "createAquaSpecialQuotation": {
            "affiliates": this.data.partnerCode,
            "simulationDate": this.data.simulationDate,
            "numberOfContainers": this.data.containers,
            "weightPerContainer": this.data.weight,
            "equipmentSizeType": this.data.equipmentTypeSize,
            "polCountryCode": this.data.portOfLoading.substring(0, 2),
            "podCountryCode": this.data.portOfDischarge.substring(0, 2),
            "allowSpecialQuotation": this.data.quotationDetail.quoteLines[0].allowSpecialQuotation,
            "spotValidityInDays": this.data.quotationDetail.quoteLines[0].spotValidityInDays,
            "routingComment": this.data.quotationDetail.quoteLines[0].routingComment,
            "arrivalDate": this.data.quotationDetail.arrivalDate,
            "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
            "placeOfOrigin": this.data.placeOfOrigin || null,
            "voyageRef": this.data.quotationDetail.voyage,
            "offerId": this.data.quotationDetail.offerId,
            "traceId": this.data.traceId,
            "shippingCompany": this.data.shippingCompany,
            vasChargeDetails
          }
        }
      }
      createQuotationQuotation(params, wx.getStorageSync('ccgId')).then(res => {
        const userInfo = wx.getStorageSync('userInfo')
        if (res.data) {
          const params = {
            "account": userInfo.email,
            "ccgid": userInfo.ccgId,
            "company": userInfo.company,
            "nickname": userInfo.firstName + userInfo.lastName,
            "operationType": "SpotOn",
            "shipmentRef": res.data ? res.data : '-'
          }
          writeOperationLog(params).then(result => {
            console.log('SpotOn日志记录成功')
          })
          wx.navigateTo({
            url: `/pages/Quotation/Result/index?quotationId=${res.data}`,
          })
        } else {
          wx.showToast({
            title: this.data.languageContent.createFail,
          })
        }
      })
    }
  },

  booking() {
    wx.navigateTo({
      url: `/packageBooking/pages/Search/index?pol=${this.data.portOfLoading}&polLabel=${this.data.portOfLoadingLabel}&pod=${this.data.portOfDischarge}&podLabel=${this.data.portOfDischargeLabel}&quotationReference=${this.data.quotationDetail.quoteLines[0].quotationReference || ''}`,
    })
  },

  getVasList() {
    const quoteLine = this.data.quotationDetail.quoteLines[0]
    const shippingCompany = quoteLine.shippingCompany
    const bookingParties = []
    this.data.partnerCode.forEach(i => {
      bookingParties.push({
        "partnerCode": i,
        "bookingParty": true,
        "role": "BKG",
        "name": ""
      })
    })
    let subscribedCharges = []
    const surchargeDetails = this.data.quotationDetail.surchargeDetails
    const a = surchargeDetails.collectChargeDetails.filter(i => i.fixedByThePricer).map(i => {
      return {
        code: i.chargeCode,
        currency: surchargeDetails.collectCharges.currency.code,
        rateFrom: i.convertedRate
      }
    })
    const b = surchargeDetails.freightChargeDetails.filter(i => i.fixedByThePricer).map(i => {
      return {
        code: i.chargeCode,
        currency: surchargeDetails.freightCharges.currency.code,
        rateFrom: i.convertedRate
      }
    })
    const c = surchargeDetails.oceanFreightChargeDetails.filter(i => i.fixedByThePricer).map(i => {
      return {
        code: i.chargeCode,
        currency: surchargeDetails.oceanFreight.price.currency.code,
        rateFrom: i.convertedRate
      }
    })
    const d = surchargeDetails.prepaidChargeDetails.filter(i => i.fixedByThePricer).map(i => {
      return {
        code: i.chargeCode,
        currency: surchargeDetails.prepaidCharges.currency.code,
        rateFrom: i.convertedRate
      }
    })
    subscribedCharges = subscribedCharges.concat(a).concat(b).concat(c).concat(d)
    vasLists({
      "shippingCompany": shippingCompany === "0001" ? 'CMACGM' : shippingCompany === '0002' ? 'ANL' : shippingCompany === '0011' ? 'CHENGLIE' : 'APL',
      "placeReceipt": this.data.placeOfOrigin,
      "portLoading": this.data.portOfLoading,
      "portDischarge": this.data.portOfDischarge,
      "placeDelivery": this.data.finalPlaceOfDelivery,
      "placeOfPayment": this.data.portOfDischarge,
      "importMovementType": quoteLine.importMovementType.toLocaleUpperCase(),
      "importHaulageMode": "MERCHANT",
      "exportMovementType": quoteLine.exportMovementType.toLocaleUpperCase(),
      "exportHaulageMode": "MERCHANT",
      "applicationDate": this.data.quotationDetail.departureDate,
      "locale": this.data.languageCode,
      "channel": "PRI",
      "typeOfBl": "Negotiable",
      "bookingParties": bookingParties,
      "cargoes": [{
        "cargoNumber": 1,
        "packageCode": this.data.equipmentTypeSize,
        "packageBookedQuantity": this.data.containers,
        "commodityCode": quoteLine.commodities[0].code,
        "commodityName": quoteLine.commodities[0].name,
        "totalNetWeight": 1,
        "uomWeight": "TNE",
        "hazardous": false,
        "oversize": false,
        "refrigerated": false,
        "shipperOwned": false
      }],
      "currency": surchargeDetails.totalCharge.currency.code,
      subscribedCharges: subscribedCharges.map(i => i.code)
    }).then(res => {
      if (this.data.equipmentTypeSize === '20RF' || this.data.equipmentTypeSize === '40RH') {
        const i = res.data.findIndex(i => i.parentProductId === 'SEAPRIORITY go')
        if (i > -1) {
          res.data.splice(i, 1)
        }
      }
      res.data.forEach(one => {
        if (one.isProductSelected) {
          // console.log(subscribedCharges)
          const index = subscribedCharges.findIndex(i => one.chargeDetails[0].chargeCode === i.code)
          one.levelOfCharge = 'Per Container'
          one.currency = subscribedCharges[index].currency
          one.chargeDetails[0].currency = subscribedCharges[index].currency
          one.chargeDetails[0].rateFrom = subscribedCharges[index].rateFrom
          one.chargeDetails[0].amount = subscribedCharges[index].rateFrom
          one.chargeDetails[0].levelOfCharge = 'Per Container'
          one.chargeDetails[0].isInclude = true
          one.seletcedProduct = one.chargeDetails[0]
        }
        one.minPrice = Math.min.apply(Math, one.chargeDetails.filter(i => i.levelOfCharge === one.levelOfCharge).map(item => {
          return item.rateFrom
        }))
        if (one.levelOfCharge === 'Per BL' && one.chargeDetails[0].calculationType !== 'FIX') {
          one.minPrice = '%'
        }
      })
      const arr = res.data.filter(i => i.bestSeller).concat(res.data.filter(i => !i.bestSeller))
      this.setData({
        vasList: arr,
        noSelectVasList: arr.filter(i => !i.isProductSelected),
        subscribedServices: arr.filter(i => i.isProductSelected)
      })
      this.calculatedCharges()
    }, () => {
      this.getVasList()
    })
  },
  toSelect(e) {
    wx.navigateTo({
      url: '/pages/VAS/Detail/index?productId=' + encodeURIComponent(e.currentTarget.dataset.productid),
    })
  },

  setSubscribedServices(detail) {
    console.log(999999999999999999999999,detail)
    const index = this.data.vasList.findIndex(i => i.parentProductId === detail.parentProductId)
    this.data.vasList[index] = detail
    this.setData({
      vasList: this.data.vasList,
      subscribedServices: this.data.vasList.filter(i => i.isProductSelected),
      noSelectVasList: this.data.vasList.filter(i => !i.isProductSelected)
    })
    this.calculatedCharges()
  },


  editSubscribe(e) {
    wx.navigateTo({
      url: '/pages/VAS/Detail/index?productId=' + encodeURIComponent(e.currentTarget.dataset.productid),
    })
  },

  deleteSubscribe(e) {
    const index = this.data.vasList.findIndex(i => i.productName === e.currentTarget.dataset.productid)
    this.data.vasList[index].isProductSelected = false
    delete this.data.vasList[index].seletcedProduct
    this.setData({
      vasList: this.data.vasList,
      subscribedServices: this.data.vasList.filter(i => i.isProductSelected),
      noSelectVasList: this.data.vasList.filter(i => !i.isProductSelected)
    })
    if (!this.data.subscribedServices.length) {
      this.setData({
        showVas: false
      })
    }
    this.calculatedCharges()
  },

  closeBg() {
    this.setData({
      showVas: false
    })
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

  switchRewards(e) {
    console.log('------e.detail----------',e.detail,  this.data.count)
    console.log('///////////22finalPrice22/////////////',this.data.finalPrice)
    this.setData(
        {
          reduceMoney:e.detail,count:1
        }
    )

    if (e.detail) {
      this.setData({
        useRewards: e.detail,
        finalPrice: this.data.finalPrice - this.data.burnRewards,
        sum:this.data.sum - this.data.burnRewards
      })
    } else {
      this.setData({
        useRewards: e.detail,
        finalPrice: this.data.finalPrice + this.data.burnRewards,
        sum:this.data.sum + this.data.burnRewards
      })
    }
    if (this.data.finalPrice === 0) {
      this.setData({
        rewardsEarned: 0
      })
    } else {
      this.getSeaEarnPoints(this.data.finalPrice)
    }

  },

  prevent() {
    return
  }
})