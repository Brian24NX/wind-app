// pages/Login/index.js
const utils = require('../../utils/util')
const config = require('../../config/config')
import {
  bindPhone,
  checkPhoneBind,
  writeOperationLog
} from '../../api/modules/home'
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
  onLoad() { },

  checkBindStatus() {
    let openId = wx.getStorageSync('openId')
    let phone = wx.getStorageSync('phone')
    let account = wx.getStorageSync('account')

    checkPhoneBind({
      "account": account,
      "openId": openId,
      "phoneNumber": phone
    }).then(res => {
      if (res.data === "2") {
        bindPhone({
          "account": account,
          "openId": openId,
          "phoneNumber": phone
        }).then(res => {
          console.log('成功绑定手机')
          wx.setStorageSync('bindDate', new Date())
          wx.setStorageSync('phone', phone)
        }).catch(err => {
          console.error(err)
        })
      }
    })
  },

  getMessage(e) {
    const data = e.detail.data[0]
    if (!data.status) {
      wx.setStorageSync('access_token', data.access_token)
      wx.setStorageSync('expires_time', utils.setExpiresTime(config.expiresIn * 60))
      if (data.data && data.data.length) {
        let userInfo = data.data[0].customer
        const partnerList = data.partnerList
        const profileRights = data.data[0].profilerights
        // console.log(profileRights)
        if (userInfo) {
          wx.setStorageSync('ccgId', userInfo.ccgId)
          userInfo.lastName = userInfo.lastName ? userInfo.lastName.toLocaleUpperCase() : ''
          if (userInfo.lastName && userInfo.firstName) {
            userInfo.avatar = userInfo.firstName.substr(0, 1) + userInfo.lastName.substr(0, 1)
          }
          wx.setStorageSync('userInfo', userInfo)

          //检查是否绑定手机号
          wx.setStorageSync('account', userInfo.email)
          let openId = wx.getStorageSync('openId')
          let phone = wx.getStorageSync('phone')
          let account = wx.getStorageSync('account')
          if (openId && phone && account) {
            this.checkBindStatus()
          } else {
            if (!openId) {
              wx.login({
                success(res) {
                  wx.request({
                    url: config[config.dev_env].url + '/api/miniapp/wx/user/login?code=' + res.code,
                    success(data) {
                      wx.setStorageSync('openId', data.data.data)
                    }
                  })
                }
              })
              openId = wx.getStorageSync('openId')
              phone = wx.getStorageSync('phone')
              account = wx.getStorageSync('account')
              if (openId && phone && account) {
                this.checkBindStatus()
              }
            }
          }
        }
        if (profileRights && profileRights.length) {
          const shipCompanyList = Array.from(new Set(profileRights.map(item => item.shipcomp)))
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
            i.partnerDetails.address1 = i.partnerDetails.addressLine1
            i.partnerDetails.address2 = i.partnerDetails.addressLine2
            i.partnerDetails.address3 = i.partnerDetails.addressLine3
            delete i.partnerDetails.addressLine1
            delete i.partnerDetails.addressLine2
            delete i.partnerDetails.addressLine3
            partnerLists.push({
              code: i.partnerDetails.code,
              name: i.partnerDetails.fullName + ' - ' + i.partnerDetails.city,
              address: i.partnerDetails
            })
          })
          wx.setStorageSync('partnerList', partnerLists)
        }
        const params = {
          "account": userInfo.email,
          "ccgid": userInfo.ccgId,
          "company": userInfo.company,
          "nickname": userInfo.firstName + ' ' + userInfo.lastName,
          "operationType": "Login",
          "shipmentRef": ""
        }
        writeOperationLog(params).then(res => {
          console.log('登录日志记录成功')
        })
      }
    }
  }
})