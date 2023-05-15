// pages/LoginCopy/index.js
import {
    bindPhone,
    checkPhoneBind,
    mockLogin,
    seaPartnerInfo,
    writeOperationLog,
} from '../../api/modules/home'
const utils = require('../../utils/util')
const config = require('../../config/config')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:'登录中...',  //登录成功
        title_main:'Login...',   //Login successfully.
        username:'',
        rewardLevel: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title:'Login',
        })
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 2]
        const data = currentPage.data
        console.log(pages,data)
        this.getLogin(data.username)
        let level = [{
            label: 'Lieutenant',
            cnName: '中尉',
            icon: '/assets/img/seaReward/lieutenant@2x.png'
        }, {
            label: 'Captain',
            cnName: '上尉',
            icon: '/assets/img/seaReward/captain@2x.png'
        }, {
            label: 'Master',
            cnName: '船长',
            icon: '/assets/img/seaReward/master@2x.png'
        }, {
            label: 'Admiral',
            cnName: '上将',
            icon: '/assets/img/seaReward/admiral@2x.png'
        }]
        if(wx.getStorageSync('partnerList')){
            this.getSeaPartnerInfo()
        }
        wx.setStorageSync('rewardLevel', level)
        this.setData({
            rewardLevel: level
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    getLogin(username){
        mockLogin({username:username}).then(res=>{
            const data = res.data
            const ary = data.data[0]
            let userInfo = ary.customer
            if (userInfo) {
                wx.setStorageSync('ccgId', userInfo.ccgId)
                userInfo.lastName = userInfo.lastName ? userInfo.lastName.toLocaleUpperCase() : ''
                if (userInfo.lastName && userInfo.firstName) {
                    userInfo.avatar = userInfo.firstName.substr(0, 1) + userInfo.lastName.substr(0, 1)
                }
                wx.setStorageSync('access_token', data.access_token)
                wx.setStorageSync('expires_time', utils.setExpiresTime(config.expiresIn * 60))
                wx.setStorageSync('account', ary.customer.email)

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
            const partnerList = data.partnerList
            const profileRights = ary.profilerights
            console.log("----",partnerList,profileRights)
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
                this.getSeaPartnerInfo()
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
            setTimeout(() => {
                this.setData({
                    title:'登录成功',
                    title_main:'Login successfully.'
                })
            }, 2000)

            setTimeout(() => {
                wx.switchTab({
                    url: '/pages/My/index',
                })
            }, 3000)
        }).catch(err => {
            this.setData({
                title:'登录失败',
                title_main:'Login failed.'
            })
            setTimeout(() => {
                wx.switchTab({
                    url: '/pages/My/index',
                })
            }, 3000)
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
                console.log('infodata',infodata,myReward[0],points)
                let list = {}
                list = {
                    memberStatus: infodata.memberStatus,
                    level: infodata.memberTiers[0].loyaltyMemberTierName,
                    icon: myReward[0] ? myReward[0].icon : '',
                    pointsBalance: points.pointsBalance || 0,
                    cnName: myReward[0] ? myReward[0].cnName : '',
                    usdSaved: points.totalPointsRedeemed || 0,
                    // associatedAccount: infodata.associatedAccount.name
                }
                console.log('list',list)
                wx.setStorageSync('one',1)
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
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

})