// packageBooking/pages/Haulage/index.js
const languageUtils = require("../../../utils/languageUtils")
const dayjs = require("dayjs");
import {
  countryList,
  stateList,
  fuzzyPointSearch
} from '../../api/modules/booking';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {},
    verifyInfo: {},
    language: 'zh',
    haulageDirectionType: 'Export',
    haulageType: "Ramp",
    // haulage错误提示开始
    appointmentDateRemind: false,
    appointmentTimeRemind: false,
    transportModeRemind: false,
    companyNameRemind: false,
    cityRemind: false,
    countryRemind: false,
    address1Remind: false,
    contactNameRemind: false,
    phoneNumberRemind: false,
    emailRemind: false,
    emailRemind2: false,
    // haulage错误提示结束
    bookingSearchKey: null,
    transportModeList: [{
      id: 'Road',
      icon: '/assets/img/booking/mode/truck.png'
    }, {
      id: 'Rail',
      icon: '/assets/img/booking/mode/rail.png'
    }, {
      id: 'RailRoad',
      icon: '/assets/img/booking/mode/railTruck.png'
    }, {
      id: 'Barge',
      icon: '/assets/img/booking/mode/barge.png'
    }, {
      id: 'BargeRoad',
      icon: '/assets/img/booking/mode/brageTruck.png'
    }, {
      id: 'RailBarge',
      icon: '/assets/img/booking/mode/trainBarge.png'
    }],
    appointmentDate: '',
    appointmentTime: '',
    transportMode: '',
    haulageAddress: {
      haulageAddress: {
        contactName: "",
        address1: "",
        address2: "",
        address3: "",
        countryName: "",
        countryCode: "",
        stateCode: "",
        stateName: "",
        city: "",
        zipCode: "",
        email: "",
        phoneNumber: ""
      },
      companyName: "",
      customerReference: "",
      transportComment: ""
    },
    countryList: [],
    stateList: [],
    timeType: 'date',
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
    currentDate: new Date().getTime(),
    showDatePopup: false,
    locationPoint: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtils.languageVersion().lang.page.bookingDetail.bookingDetail,
    })
    this.setData({
      languageContent: languageUtils.languageVersion().lang.page.bookingDetail,
      verifyInfo: languageUtils.languageVersion().lang.page.verifyInfo,
      haulageDirectionType: options.from
    })
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    if (options.from === 'Export') {
      this.setData({
        locationPoint: data.finalPlaceOfDelivery.name + ';' + data.finalPlaceOfDelivery.countryCode + ';' + data.finalPlaceOfDelivery.code,
        haulageType: data.bookingSearchKey.deliveryHaulage
      })
    } else {
      this.setData({
        locationPoint: data.placeOfReceipt.name + ';' + data.placeOfReceipt.countryCode + ';' + data.placeOfReceipt.code,
        haulageType: data.bookingSearchKey.receiptHaulage
      })
    }
    this.setHaulageAddress()
    this.getCountryList()
  },

  setHaulageAddress() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    if (this.data.haulageDirectionType === 'Export' && data.exportHaulage) {
      const exportHaulage = data.exportHaulage
      this.setData({
        appointmentDate: exportHaulage.appointmentInfo.appointmentDate.utc,
        appointmentTime: exportHaulage.appointmentInfo.appointmentTime,
        transportMode: exportHaulage.appointmentInfo.transportMode,
        haulageAddress: exportHaulage.haulageAddress
      })
      this.getStateList()
    }
    if (this.data.haulageDirectionType === 'Import' && data.importHaulage) {
      const importHaulage = data.importHaulage
      this.setData({
        appointmentDate: importHaulage.appointmentInfo.appointmentDate.utc,
        appointmentTime: importHaulage.appointmentInfo.appointmentTime,
        transportMode: importHaulage.appointmentInfo.transportMode,
        haulageAddress: importHaulage.haulageAddress
      })
      this.getStateList()
    }
  },

  chooseDate() {
    const date = this.data.appointmentDate.replaceAll('-', '/')
    this.setData({
      timeType: 'date',
      currentDate: new Date(date).getTime(),
      showDatePopup: true
    })
  },

  chooseTime() {
    this.setData({
      timeType: 'time',
      currentDate: this.data.appointmentTime || dayjs().format('HH:mm'),
      showDatePopup: true
    })
  },


  closeDate() {
    this.setData({
      showDatePopup: false
    })
  },

  openPopup(e) {
    const type = e.currentTarget.dataset.type
    let defaultIndex = 0
    let columns = []
    let valueKey = ''
    if (type === 'country') {
      columns = this.data.countryList
      valueKey = 'countryName'
      const index = this.data.countryList.findIndex(i => i.laraCountry === this.data.haulageAddress.haulageAddress.countryCode)
      defaultIndex = index > -1 ? index : 0
    } else {
      columns = this.data.stateList
      valueKey = 'regionName'
      const index = this.data.stateList.findIndex(i => i.areaCode === this.data.haulageAddress.haulageAddress.stateCode)
      defaultIndex = index > -1 ? index : 0
    }
    this.setData({
      currentPopup: type,
      columns,
      valueKey,
      defaultIndex,
      isShowPicker: true
    })
  },

  onPickerClose() {
    this.setData({
      isShowPicker: false
    })
  },

  onPickerConfirm(e) {
    console.log(e)
    if (this.data.currentPopup === 'country') {
      this.data.haulageAddress.haulageAddress.countryCode = e.detail.laraCountry
      this.data.haulageAddress.haulageAddress.countryName = e.detail.countryName
      this.setData({
        haulageAddress: this.data.haulageAddress,
        countryRemind: false
      })
      this.getStateList()
    } else {
      this.data.haulageAddress.haulageAddress.stateCode = e.detail.areaCode
      this.data.haulageAddress.haulageAddress.stateName = e.detail.regionName
      this.setData({
        haulageAddress: this.data.haulageAddress
      })
    }
    this.setData({
      isShowPicker: false
    })
  },

  getStateList() {
    stateList({
      countryCode: this.data.haulageAddress.haulageAddress.countryCode
    }).then(res => {
      console.log(res)
      this.setData({
        stateList: res.data.sort(this.sortStateArray)
      })
    })
  },

  sortStateArray(x, y) {
    return x.regionName.localeCompare(y.regionName);
  },

  confirmDate(e) {
    console.log(e)
    if (this.data.timeType === 'date') {
      this.setData({
        appointmentDate: dayjs(e.detail).format('YYYY-MM-DD'),
        appointmentDateRemind: false,
        showDatePopup: false
      })
    } else if (this.data.timeType === 'time') {
      this.setData({
        appointmentTime: e.detail,
        appointmentTimeRemind: false,
        showDatePopup: false
      })
    }
  },

  getCountryList() {
    countryList().then(res => {
      this.setData({
        countryList: res.data.sort(this.sortCountryArray)
      })
    })
  },

  sortCountryArray(x, y) {
    return x.countryName.localeCompare(y.countryName);
  },

  chooseMode(e) {
    this.setData({
      transportMode: e.currentTarget.dataset.id,
      transportModeRemind: false
    })
  },

  setInputValue(e) {
    const value = e.detail.value
    const type = e.currentTarget.dataset.type
    const type2 = e.currentTarget.dataset.type2
    let haulageAddress = this.data.haulageAddress
    if (type2) {
      haulageAddress[type][type2] = value
      this.setData({
        [type2 + 'Remind']: false
      })
      if (type2 === 'email') {
        this.setData({
          emailRemind2: false
        })
      }
    } else {
      haulageAddress[type] = value
      this.setData({
        [type + 'Remind']: false
      })
    }
    this.setData({
      haulageAddress
    })
  },

  deleteValue(e) {
    const type = e.currentTarget.dataset.type
    const type2 = e.currentTarget.dataset.type2
    let haulageAddress = this.data.haulageAddress
    if (type2) {
      haulageAddress[type][type2] = ''
    } else {
      haulageAddress[type] = ''
    }
    this.setData({
      haulageAddress
    })
  },

  confirmHaulage() {
    if (this.data.haulageType === 'Door') {
      if (!this.data.appointmentDate) {
        this.setData({
          appointmentDateRemind: true
        })
      }
      if (!this.data.appointmentTime) {
        this.setData({
          appointmentTimeRemind: true
        })
      }
      if (!this.data.haulageAddress.companyName) {
        this.setData({
          companyNameRemind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.city) {
        this.setData({
          cityRemind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.countryCode) {
        this.setData({
          countryRemind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.address1) {
        this.setData({
          address1Remind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.contactName) {
        this.setData({
          contactNameRemind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.phoneNumber) {
        this.setData({
          phoneNumberRemind: true
        })
      }
      if (!this.data.haulageAddress.haulageAddress.email) {
        this.setData({
          emailRemind: true
        })
      }
      let email = new RegExp("^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$");
      if (!email.test(this.data.haulageAddress.haulageAddress.email)) {
        this.setData({
          emailRemind2: true
        })
      }
    }
    if (!this.data.transportMode) {
      this.setData({
        transportModeRemind: true
      })
    }
    if (this.data.haulageType === 'Door' && !(this.data.appointmentDateRemind || this.data.appointmentTimeRemind || this.data.transportModeRemind || this.data.companyNameRemind || this.data.cityRemind || this.data.countryRemind || this.data.address1Remind || this.data.contactNameRemind || this.data.phoneNumberRemind || this.data.emailRemind || this.data.emailRemind2)) {
      let haulage = {
        appointmentInfo: {
          appointmentTime: this.data.appointmentTime,
          appointmentDate: {
            local: this.data.appointmentDate,
            utc: this.data.appointmentDate
          },
          transportMode: this.data.transportMode
        },
        haulageAddress: JSON.parse(JSON.stringify(this.data.haulageAddress))
      }
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 2]
      currentPage.setHaulage(haulage, this.data.haulageDirectionType)
      wx.navigateBack()
    }
    if (this.data.haulageType === 'Ramp' && !this.data.transportModeRemind) {
      let haulage = {
        appointmentInfo: {
          appointmentTime: this.data.appointmentTime,
          appointmentDate: {
            local: this.data.appointmentDate,
            utc: this.data.appointmentDate
          },
          transportMode: this.data.transportMode
        },
        haulageAddress: JSON.parse(JSON.stringify(this.data.haulageAddress))
      }
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 2]
      currentPage.setHaulage(haulage, this.data.haulageDirectionType)
      wx.navigateBack()
    }
  },
})