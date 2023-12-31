// pages/Login/index.js
const utils = require('../../utils/util')
const config = require('../../config/config')
import {
  bindPhone,
  checkPhoneBind,
  writeOperationLog,
  seaPartnerInfo
} from '../../api/modules/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: config[config.dev_env].url,
    rewardLevel: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let level = [{
      label: 'Lieutenant',
      cnName: '中尉',
      icon: '/assets/img/seaReward/lieutenant@2x.jpg'
    }, {
      label: 'Captain',
      cnName: '上尉',
      icon: '/assets/img/seaReward/captain@2x.jpg'
    }, {
      label: 'Master',
      cnName: '船长',
      icon: '/assets/img/seaReward/master@2x.jpg'
    }, {
      label: 'Admiral',
      cnName: '上将',
      icon: '/assets/img/seaReward/admiral@2x.jpg'
    }]
    wx.removeStorageSync('seaRewardData')
    if(wx.getStorageSync('partnerList')){
      this.getSeaPartnerInfo()
    }
    wx.setStorageSync('rewardLevel', level)
    this.setData({
      rewardLevel: level
    })
  },

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

  getSeaPartnerInfo() {
    seaPartnerInfo({
      "partnerCode": wx.getStorageSync('partnerList')[0].code,
    }).then(res => {
      const infodata = res.data
      if (infodata.memberTiers && infodata.memberTiers.length) {
        console.log(1,this.data.rewardLevel,infodata.memberTiers[0].loyaltyMemberTierName)
        const myReward = this.data.rewardLevel.filter((i) => i.label === infodata.memberTiers[0].loyaltyMemberTierName)
        const points = infodata.memberCurrencies.filter((j) => j.loyaltyMemberCurrencyName === 'Available Nmiles')[0]
        wx.setStorageSync('seaRewardData', {
          memberStatus: infodata.memberStatus,
          level: infodata.memberTiers[0].loyaltyMemberTierName,
          icon: myReward[0] ? myReward[0].icon : '',
          pointsBalance: points.pointsBalance || 0,
          cnName: myReward[0] ? myReward[0].cnName : '',
          usdSaved: points.totalPointsRedeemed || 0,
          // associatedAccount: infodata.associatedAccount.name
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },

  getMessage(e) {
    const data = e.detail.data[0]

    console.log('-------------',data)
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
              if (i.relationType === 'MAIN') {
                wx.setStorageSync('partnerCode', i.partner.code)
              }
            })
          })
          wx.setStorageSync('shipCompanyList', shipCompanyList)
          wx.setStorageSync('rights', rights)
        }
         console.log('partnerList',partnerList)
        if (partnerList && partnerList.length) {
          let partnerLists = []
          partnerList.forEach(i => {
            i.partnerDetails.address1 = i.partnerDetails.addressLine1
            i.partnerDetails.address2 = i.partnerDetails.addressLine2
            i.partnerDetails.address3 = i.partnerDetails.addressLine3
            delete i.partnerDetails.addressLine1
            delete i.partnerDetails.addressLine2
            delete i.partnerDetails.addressLine3
            if(i.partnerDetails.code===wx.getStorageSync('partnerCode')){
              partnerLists.unshift({
                code: i.partnerDetails.code,
                name: i.partnerDetails.fullName + ' - ' + i.partnerDetails.city,
                fullName: i.partnerDetails.fullName
              })
            }else{
              partnerLists.push({
                code: i.partnerDetails.code,
                name: i.partnerDetails.fullName + ', ' + i.partnerDetails.city,
                fullName: i.partnerDetails.fullName
              })
            }
          })
          wx.setStorageSync('partnerList', partnerLists)
        }
        const params = {
          "account": userInfo.email,
          "ccgid": userInfo.ccgId,
          "company": userInfo.company,
          "nickname": userInfo.firstName + userInfo.lastName,
          "operationType": "Login",
          "shipmentRef": "-"
        }
        writeOperationLog(params).then(res => {
          console.log('登录日志记录成功')
        })
        this.getSeaPartnerInfo()
      }
    }
  }
})