// packageBooking/pages/Party/index.js
const languageUtils = require('../../../utils/languageUtils')
const utils = require('../../../utils/util')
import {
  bookPartyList
} from '../../api/modules/booking'
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
  onLoad(options) {
    const language = languageUtils.languageVersion().lang.page
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let partiesList =  JSON.parse(JSON.stringify(data.partyList))
    if (!partiesList.length) {
      partiesList.push({
        code: this.data.partnerList[0].code,
        name: this.data.partnerList[0].name,
        address: this.data.partnerList[0].address,
        roleIds: []
      })
    }
    this.setData({
      languageContent: language.bookingDetail,
      language: language.langue,
      verifyInfo: language.verifyInfo,
      partiesList
    })
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
      if (res.data.length) {
        this.setData({
          partiesList: this.data.partiesList
        })
      }
    }, () => {
      this.getPartyList(data, index)
    })
  },

  chooseParty(e) {
    const index = e.currentTarget.dataset.index
    const item = e.currentTarget.dataset.item
    this.data.partiesList[index].code = item.code
    this.data.partiesList[index].name = item.text
    this.data.partiesList[index].address = item.address
    this.data.partiesList[index].partyList = []
    this.setData({
      partiesList: this.data.partiesList
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
    this.setData({
      partiesList: this.data.partiesList
    })
    this.setOtherParty()
  },

  setOtherParty() {
    const roleIds = this.data.partiesList[0].roleIds
    const otherRoleList = this.data.roleList.filter(i => roleIds.indexOf(i) === -1)
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
    this.data.partiesList[0].reference = ''
    this.setData({
      partiesList: this.data.partiesList
    })
  },

  saveParty() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    currentPage.setPartyData(this.data.partiesList)
    wx.navigateBack()
  }
})