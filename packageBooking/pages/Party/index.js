// packageBooking/pages/Party/index.js
const languageUtils = require('../../../utils/languageUtils')
const utils = require('../../../utils/util')
import {
  bookPartyList
} from '../../api/modules/booking'
import {
  customerPartners
} from '../../../api/modules/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    language: 'zh',
    verifyInfo: {},
    partnerList: wx.getStorageSync('partnerList'),
    isShowPicker: false,
    defaultIndex: 0,
    roleList: ['SHP', 'FOR', 'CEE', 'NOT', 'NO2', 'DCD', 'NAC', '3BA', 'CUS'],
    otherRoleList: [],
    partiesList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const language = languageUtils.languageVersion().lang.page
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let partiesList = JSON.parse(JSON.stringify(data.partyList))
    if (!partiesList.length) {
      partiesList.push({
        code: this.data.partnerList[0].code,
        name: this.data.partnerList[0].name,
        address: this.data.partnerList[0].address,
        bookingPartyReference: '',
        roleIds: []
      })
    }
    this.setData({
      languageContent: language.bookingDetail,
      language: language.langue,
      verifyInfo: language.verifyInfo,
      partiesList
    })
    this.setOtherParty()
  },

  openPopup() {
    this.setData({
      defaultIndex: this.data.partnerList.findIndex(i => i.code === this.data.partiesList[0].code),
      isShowPicker: true
    })
  },

  onPickerConfirm(e) {
    console.log(e)
    this.data.partiesList[0].code = e.detail.code
    this.data.partiesList[0].name = e.detail.name
    this.data.partiesList[0].address = e.detail.address
    this.setData({
      isShowPicker: false,
      partiesList: this.data.partiesList
    })
  },

  onPickerClose() {
    this.setData({
      isShowPicker: false
    })
  },

  editParty(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/packageBooking/pages/ModifyParty/index?from=party&index=' + index,
    })
  },

  setPartyData(detail, index) {
    this.data.partiesList[index].address = detail
    this.setData({
      partiesList: this.data.partiesList
    })
  },

  deleteParty(e) {
    this.data.partiesList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      partiesList: this.data.partiesList
    })
  },

  enterParty: utils.debounce(function (e) {
    const data = e[0].detail.value
    const index = e[0].currentTarget.dataset.index
    this.data.partiesList[index].showPartyDelete = !!data
    this.data.partiesList[index].showParty = false
    this.data.partiesList[index].partyList = []
    this.data.partiesList[index].name = data
    this.data.partiesList[index].required1 = false
    this.setData({
      partiesList: this.data.partiesList
    })
    if (data.length < 2) {
      return
    }
    this.getPartyList(data, index)
  }, 800),

  getPartyList(data, index) {
    this.data.partiesList[index].showParty = true
    this.setData({
      partiesList: this.data.partiesList
    })
    bookPartyList({
      shippingCompany: '0001',
      searchCriteria: data
    }).then(res => {
      this.data.partiesList[index].showParty = false
      this.data.partiesList[index].partyList = res.data || []
      this.setData({
        partiesList: this.data.partiesList
      })
    }, () => {
      this.getPartyList(data, index)
    })
  },

  chooseParty(e) {
    const index = e.currentTarget.dataset.index
    const item = e.currentTarget.dataset.item
    this.data.partiesList[index].code = item.code
    this.data.partiesList[index].name = item.text
    this.data.partiesList[index].partyList = []
    this.setData({
      partiesList: this.data.partiesList
    })
    this.getPartnerAddress(index)
  },

  getPartnerAddress(index) {
    customerPartners({
      partners: [this.data.partiesList[index].code],
      token: wx.getStorageSync('access_token')
    }).then(res => {
      console.log(res)
      let partnerDetails = res.data[0].partnerDetails
      partnerDetails.address1 = partnerDetails.addressLine1
      partnerDetails.address2 = partnerDetails.addressLine2
      partnerDetails.address3 = partnerDetails.addressLine3
      delete partnerDetails.addressLine1
      delete partnerDetails.addressLine2
      delete partnerDetails.addressLine3
      this.data.partiesList[index].address = partnerDetails
      this.setData({
        partiesList: this.data.partiesList
      })
    })
  },

  chooseRole(e) {
    const index = e.currentTarget.dataset.index
    const roleId = e.currentTarget.dataset.roleid
    const indexs = this.data.partiesList[index].roleIds.indexOf(roleId)
    if (indexs > -1) {
      this.data.partiesList[index].roleIds.splice(indexs, 1)
    } else {
      this.data.partiesList[index].roleIds.push(roleId)
    }
    if (!index && indexs === -1) {
      for (let i = 1; i < this.data.partiesList.length; i++) {
        const element = this.data.partiesList[i];
        const j = element.roleIds.indexOf(roleId)
        if (j > -1) {
          element.roleIds.splice(j, 1)
        }
      }
    }
    this.data.partiesList[index].required2 = false
    this.setData({
      partiesList: this.data.partiesList
    })
    this.setOtherParty()
  },

  setOtherParty() {
    const roleIds = this.data.partiesList[0].roleIds
    const otherRoleList = this.data.roleList.filter(i => roleIds.indexOf(i) === -1 || i === 'NO2' || i === 'CUS')
    this.setData({
      otherRoleList
    })
  },

  addParty() {
    this.data.partiesList.push({
      code: '',
      name: '',
      address: {},
      roleIds: [],
      showPartyDelete: false,
      showParty: false,
      partyList: [],
    })
    this.setData({
      partiesList: this.data.partiesList
    })
    this.setOtherParty()
  },

  deleteValue() {
    this.data.partiesList[0].bookingPartyReference = ''
    this.setData({
      partiesList: this.data.partiesList
    })
  },

  deletePartyValue(e) {
    this.data.partiesList[e.currentTarget.dataset.index].code = ''
    this.data.partiesList[e.currentTarget.dataset.index].name = ''
    this.data.partiesList[e.currentTarget.dataset.index].required1 = false
    this.data.partiesList[e.currentTarget.dataset.index].showPartyDelete = false
    this.setData({
      partiesList: this.data.partiesList
    })
  },

  setReference(e) {
    let partiesList = this.data.partiesList
    partiesList[0].bookingPartyReference = e.detail.value
    this.setData({
      partiesList: this.data.partiesList
    })
  },

  saveParty() {
    let arr = []
    this.data.partiesList.forEach(i => {
      if (!i.code) {
        i.required1 = true
        arr.push(1)
      } else {
        i.required1 = false
      }
      if (!i.roleIds.length) {
        i.required2 = true
        arr.push(2)
      } else {
        i.required2 = false
      }
    })
    this.setData({
      partiesList: this.data.partiesList
    })
    if (arr.length) return
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    currentPage.setPartyData(this.data.partiesList)
    wx.navigateBack()
  }
})