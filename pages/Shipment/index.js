// pages/Shipment/index.js
const languageUtil = require('../../utils/languageUtils')
const utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    language: '',
    languageContent: {}, // 用于保存当前页面所需字典
    verifyInfo: {},
    showRemind: false,
    huiguiType: 1,
    huoGuiValue: '',
    showHis: false,
    searchHis: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initLanguage();
    this.setData({
      searchHis: wx.getStorageSync('trackSearchHis')
    })
  },

  onShareAppMessage: function () {},

  clearInput() {
    this.setData({
      huoGuiValue: '',
      showRemind: false,
      huiguiType: 1
    })
  },

  setHuoGui(e) {
    //去掉空格和大写问题
    let value = e.detail.value.toUpperCase()
    let regvalue = value.trim()
    this.setData({
      huoGuiValue: value
    })
    if (!value) {
      this.setData({
        showRemind: true,
        huiguiType: 1
      })
      return
    }
    var reg = /^([ ]*[A-z0-9]+([\,\，]*)){0,3}$/;
    // 不包含，类型的数据
    if (!reg.test(regvalue)) {
      this.setData({
        // huoGuiValue: value,
        showRemind: true,
        huiguiType: value.split(',').length > 3 ? 3 : 2
      })
      return
    }
    const value2 = (value.substr(value.length - 1, 1) === ',' || value.substr(value.length - 1, 1) === '，') ? value.substr(0, value.length - 1) : value
    if (value2.split(',').length >= 2 && value2.split(',').length <= 3) {
      const arr = value2.split(',').map(item => item.trim())
      var newArr = arr.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
      if (newArr.length !== arr.length) {
        this.setData({
          showRemind: true,
          huiguiType: 4
        })
        return
      }
    }
    this.setData({
      showRemind: false
    })
  },

  // 货物追踪
  toHuoWu() {
    this.hideSearchHis()
    if (this.data.showRemind) {
      return
    }
    if (!this.data.huoGuiValue || this.data.huoGuiValue.replace(/\s*/g,"") === '') {
      this.setData({
        showRemind: true,
        huiguiType: 1
      })
      return
    }
    const huoguiStr = this.data.huoGuiValue.replaceAll(' ', '')
    const huogui = (huoguiStr.charAt(huoguiStr.length - 1) === ',' ? huoguiStr.substr(0, huoguiStr.length - 2) : huoguiStr).split(',')
    var reg = /[A-Z]{3}[UJZ][0-9]{7}$/;
    const checkRes = []
    var serList = this.data.searchHis ? this.data.searchHis: []
    huogui.forEach(item => {
      var noSpaceItem = item.replace(/\s*/g,"")
      checkRes.push(reg.test(noSpaceItem))
      var idx = serList.indexOf(noSpaceItem)
      if(idx !== -1){
        serList.splice(idx,1)
        serList.unshift(noSpaceItem)
      }else if(noSpaceItem !== '' && idx === -1 ){
        if(serList.length < 5){
          serList.unshift(noSpaceItem)
        }else{
          serList.unshift(noSpaceItem)
          serList.splice(serList.length-1,1)
        }
      }
    })
    if (checkRes.length > 1 && checkRes.filter(i=>i).length !== checkRes.length) {
      this.setData({
        huiguiType: 5,
        showRemind: true
      })
      return
    }
    let newHis = [...new Set(serList)]
    this.setData({
      searchHis: newHis
    })
    wx.setStorageSync('trackSearchHis', this.data.searchHis);
    wx.navigateTo({
      url: `/pages/Orders/index?str=${this.data.huoGuiValue.replaceAll(' ', '')}`
    })
  },

  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    wx.setNavigationBarTitle({
      title: lang.lang.page.homeInfo.TRACKING1
    })
    this.setData({
      language: lang.lang.page.langue,
      languageContent: lang.lang.page.homeInfo,
      verifyInfo: lang.lang.page.verifyInfo
    })
  },
  showSearchHis(){
    this.setData({
      showHis: true
    })
  },

  hideSearchHis(){
    this.setData({
      showHis: false
    })
  },

  chooseHis(e){
    var reg = /[A-Z]{3}[UJZ][0-9]{7}$/;
    var testInput = reg.test(e.detail);
    var testHave = false;
    const huoguiStr = this.data.huoGuiValue.replaceAll(' ', '')
    const huogui = (huoguiStr.charAt(huoguiStr.length - 1) === ',' ? huoguiStr.substr(0, huoguiStr.length - 2) : huoguiStr).split(',')
    if(huoguiStr.includes(e.detail)) return
    huogui.forEach(item => {
      if(reg.test(item.trim())){
        testHave = true
      }else{
        testHave = false
      }
    })
    if(testInput && testHave){
      let newStr = this.data.huoGuiValue+','+e.detail
      this.setData({
        huoGuiValue: newStr,
        showRemind: false
      })
    }else{
      this.setData({
        huoGuiValue: e.detail,
        showRemind: false
      })
    }
  },
  delHis(e){
    this.setData({
      searchHis: e.detail
    })
    wx.setStorageSync('trackSearchHis',e.detail)
  },
})