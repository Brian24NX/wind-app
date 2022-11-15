// pages/Login/index.js
const utils = require('../../utils/util')
const config = require('../../config/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: config[config.dev_env].url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  getMessage(e) {
    const data = e.detail.data[0]
    if (!data.status) {
      wx.setStorageSync('access_token', data.access_token)
      wx.setStorageSync('expires_time', utils.setExpiresTime(data.expires_in))
      if (data.data && data.data.length) {
        let userInfo = data.data[0].customer
        const partnerList = data.partnerList
        const profileRights = data.data[0].profilerights
        console.log(profileRights)
        if (userInfo) {
          wx.setStorageSync('ccgId', userInfo.ccgId)
          userInfo.lastName = userInfo.lastName ? userInfo.lastName.toLocaleUpperCase() : ''
          if (userInfo.lastName && userInfo.firstName) {
            userInfo.avatar = userInfo.firstName.substr(0, 1) + userInfo.lastName.substr(0, 1)
          }
          wx.setStorageSync('userInfo', userInfo)
        }
        if (profileRights && profileRights.length) {
          const shipCompanyList = profileRights.map(item => (item.shipcomp))
          const rights = []
          profileRights.forEach(i => {
            i.rights.forEach(r => {
              if (rights.indexOf(r.code) === -1) {
                rights.push(r.code)
              }
            })
          })
          wx.setStorageSync('shipCompanyList', shipCompanyList)
          wx.setStorageSync('rights', rights)
        }
        if (partnerList && partnerList.length) {
          let partnerLists = []
          partnerList.forEach(i => {
            partnerLists.push({
              code: i.partnerDetails.code,
              name: i.partnerDetails.fullName + ', ' + i.partnerDetails.city
            })
          })
          wx.setStorageSync('partnerList', partnerLists)
        }
      }
    }
  }
})