// packageBooking/pages/Contract/Detail/index.js
const languageUtil = require('../../../../utils/languageUtils')
import {
  equitmentSizeList
} from '../../../../api/modules/home';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    load: {},
    language: 'zh',
    otherList: [{
      icon: '/assets/img/instantQuote/other_1@2x.png',
      label: 'Local Charges',
      url: "/pages/Quotation/Others/LocalCharges/index"
    }, {
      icon: '/assets/img/instantQuote/other_2@2x.png',
      label: 'D&D',
      url: "/pages/Quotation/Others/DDCharges/index?from=myContracts"
    }, {
      icon: '/assets/img/instantQuote/other_3@2x.png',
      label: 'SpotOn',
      url: "/pages/Quotation/Others/SpotOn/index"
    }, {
      icon: '/assets/img/instantQuote/other_4@2x.png',
      label: 'Add Info',
      url: "/pages/Quotation/Others/AdditionalInformation/index"
    }],
    fromLabel: '',
    toLabel: '',
    quotationDetail: {},
    simulationDate: '',
    currentType: 'charge',
    portOfLoading: '',
    portOfDischarge: ''
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
    let quotationDetail = data.contractList[Number(options.index)]
    quotationDetail.surchargeDetails.oceanFreight.isChecked = true
    quotationDetail.surchargeDetails.freightCharges.isChecked = true
    quotationDetail.surchargeDetails.prepaidCharges.isChecked = true
    quotationDetail.surchargeDetails.collectCharges.isChecked = true
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.qutationResult,
      load: languageUtil.languageVersion().lang.page.load,
      language: languageUtil.languageVersion().lang.page.langue,
      portOfLoading: data.portOfLoading,
      portOfDischarge: data.portOfDischarge,
      fromLabel: data.contractList[Number(options.index)].portOfLoadingLabel,
      toLabel: data.contractList[Number(options.index)].portOfDischargeLabel,
      simulationDate: data.simulationDate,
      quotationDetail: quotationDetail
    })
    this.calculatedCharges()
    this.dealEquipmentSize()
  },

  calculatedCharges() {
    const surchargeDetails = this.data.quotationDetail.surchargeDetails
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
    console.log(surchargeDetails)
    this.setData({
      totalChargeAmount: totalChargeAmount || surchargeDetails.totalCharge.amount
    })
  },

  changeType(e) {
    this.setData({
      currentType: e.currentTarget.dataset.type
    })
  },

  changeCheck(e) {
    this.data.quotationDetail.surchargeDetails[e.currentTarget.dataset.id].isChecked = !this.data.quotationDetail.surchargeDetails[e.currentTarget.dataset.id].isChecked
    this.setData({
      quotationDetail: this.data.quotationDetail
    })
    this.calculatedCharges()
  },

  dealEquipmentSize() {
    equitmentSizeList().then(res=>{
      console.log(res)
      const index = res.data.findIndex(i => i.code === this.data.quotationDetail.equipments[0].code)
      this.data.quotationDetail.equitmentSizeType = index === -1 ? this.data.quotationDetail.equipments[0].code : res.data[index].nameEn
      this.setData({
        quotationDetail: this.data.quotationDetail
      })
    })
  },

  copyReference() {
    wx.setClipboardData({
      data: this.data.quotationDetail.quotationReference,
      success() {
        wx.showToast({
          title: languageUtil.languageVersion().lang.page.copyInfo.success2,
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
    })
  },

  toOther(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.item.url,
    })
  },

  submit() {
    wx.showToast({
      title: this.data.load.functionIsUnderDevelopment,
      icon: 'none'
    })
  }
})