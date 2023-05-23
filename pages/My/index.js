// pages/my/index.js
import languageUtil from "../../utils/languageUtils";

const config = require('../../config/config')
const app = getApp();
const languageUtils = require('../../utils/languageUtils')
const utils = require('../../utils/util')
import {
    customerProfile,
    customerPartners,
} from '../../api/modules/home'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        navTop: app.globalData.navTop,
        navHeight: app.globalData.navObj,
        languageContent: {}, // 用于保存当前页面所需字典
        seaReward: {},
        dashboardList: [{
            label: 'shipment',
            url: '/packageDashboard/pages/shipment/list/index',
            icon: '/assets/img/myAccount/shipment@2x.png'
        }, {
            label: 'document',
            url: '/packageDashboard/pages/document/index',
            icon: '/assets/img/myAccount/document@2x.png'
        }, {
            label: 'seaReward',
            url: '/packageDashboard/pages/seaRewards/index',
            icon: '/assets/img/seaReward/seaIcon@2x.png'
        }],
        needLogin: false,
        userInfo: {},
        showRemind: false,
        phoneNumber: '',
        preAccount: '',
        memberStatus: null,
        seaRewardData: null,
        count: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.initLanguage();
        let phone = wx.getStorageSync('phone')
        if (phone) {
            this.setData({
                phoneNumber: phone,
                count: 1
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (utils.checkAccessToken()) {
            let userInfo = wx.getStorageSync('userInfo')
            if (!userInfo) {
                customerProfile({
                    token: wx.getStorageSync('access_token')
                }).then(res => {
                    let userInfo = res.data[0].customer
                    if (userInfo) {
                        userInfo.lastName = userInfo.lastName ? userInfo.lastName.toLocaleUpperCase() : ''
                        if (userInfo.lastName && userInfo.firstName) {
                            userInfo.avatar = userInfo.firstName.substr(0, 1) + userInfo.lastName.substr(0, 1)
                        }
                        wx.setStorageSync('userInfo', userInfo)
                        this.setData({
                            userInfo
                        })
                        let partners = []
                        res.data[0].profilerights.map(i => {
                            if (i.shipcomp === '0001') {
                                partners.push(i.partner.code)
                            }
                        })
                        customerPartners({
                            "partners": partners,
                            "token": wx.getStorageSync('access_token')
                        }).then(result => {
                            let partnerLists = []
                            result.data.forEach(i => {
                                partnerLists.push({
                                    code: i.partnerDetails.code,
                                    name: i.partnerDetails.fullName + ', ' + i.partnerDetails.city,
                                    fullName: i.partnerDetails.fullName
                                })
                            })
                            wx.setStorageSync('partnerList', partnerLists)
                        })

                    }
                })
            } else {
                this.setData({
                    userInfo
                })
            }
            //判断手机是否绑定
            let phone = wx.getStorageSync('phone')
            if (phone) {
                this.setData({
                    phoneNumber: phone
                })
            }
            this.setData({
                needLogin: false
            })
            console.log('count', this.data.count, this.data.count === 1,new Date())
            if (this.data.count === 1) {
                wx.showLoading({
                    title: languageUtil.languageVersion().lang.page.load.load,
                    mask: true
                })
            }
            setTimeout(() => {
                let reward = wx.getStorageSync('seaRewardData')
                console.log(new Date(),reward)
                if (reward) {
                    this.setData({
                        count: 2
                    })
                    this.setData({
                        seaRewardData: reward,
                        memberStatus: reward.memberStatus,
                    })
                    console.log(2,this.data.seaRewardData,this.data.memberStatus,new Date())
                    // setTimeout(() => {
                        console.log(2222,new Date())
                        wx.hideLoading()
                    // },1000)
                } else {
                    // this.$nextTick(()=>{
                        wx.hideLoading()
                    // })
                }
            }, 2000)
        } else {
            this.setData({
                needLogin: true,
                userInfo: {},
                seaRewardData: null,
                memberStatus: null
            })
        }
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            })
        }

    },

    //初始化语言
    initLanguage() {
        //获取当前小程序语言版本所对应的字典变量
        var lang = languageUtils.languageVersion()
        this.setData({
            languageContent: lang.lang.page.userCenter,
            seaReward: lang.lang.page.seaReward
        })
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                list: lang.lang.toolbar.list //赋值
            })
        }
    },

    // 去登录
    toLogin() {
        if (wx.getStorageSync('allowLegalTerms') && wx.getStorageSync('phone')) {
            if (config.mockLogin) {
                wx.navigateTo({
                    url: '/pages/LoginCopy/index'
                })
            } else {
                wx.navigateTo({
                    url: '/pages/Login/index'
                })
            }
        } else {
            this.setData({
                showRemind: true
            })
            this.getTabBar().setData({
                show: false
            })
        }

    },
    goToSeaRewardPage() {
        wx.navigateTo({
            url: '/pages/SeaInfoPage/index',
        })
    },

    buttonNX() {
        if (config.mockLogin) {
            wx.navigateTo({
                url: '/pages/LoginCopy/index'
            })
        } else {
            wx.navigateTo({
                url: '/pages/Login/index'
            })
        }
    },

    toBaseInfo() {
        wx.navigateTo({
            url: '/pages/baseInfo/index',
        })
    },

    // 我的概览
    toDashboard(e) {
        if (!utils.checkAccessToken()) {
            wx.showToast({
                title: languageUtils.languageVersion().lang.page.load.noLogin,
                icon: 'none',
                mask: true,
                duration: 2000
            })
            setTimeout(() => {
                this.toLogin()
            }, 2000)
            return
        }
        if (e.currentTarget.dataset.url) {
            wx.navigateTo({
                url: e.currentTarget.dataset.url
            })
        } else {
            wx.showToast({
                title: languageUtils.languageVersion().lang.page.load.functionIsUnderDevelopment,
                icon: 'none'
            })
        }
    },

    // 管理我的通知
    notifications() {
        if (wx.getStorageSync('ccgId')) {
            wx.navigateTo({
                url: '/pages/notifications/index',
            })
        } else {
            wx.showToast({
                title: languageUtils.languageVersion().lang.page.load.noLogin,
                icon: 'none',
                mask: true,
                duration: 2000
            })
            wx.removeStorageSync('expires_time')
            wx.removeStorageSync('access_token')
            setTimeout(() => {
                this.toLogin()
            }, 500)
        }
    },

    // 设置语言
    setLanguage() {
        wx.navigateTo({
            url: '/pages/setLanguage/index',
        })
    },

    // 隐私政策
    legalTerms() {
        wx.navigateTo({
            url: '/pages/legalTerms/index',
        })
    },

    setRemind(e) {
        this.setData({
            showRemind: false
        })
        this.getTabBar().setData({
            show: true
        })
        if (e.detail) {
            if (config.mockLogin) {
                wx.navigateTo({
                    url: '/pages/LoginCopy/index'
                })
            } else {
                wx.navigateTo({
                    url: '/pages/Login/index'
                })
            }

        }
    },
    copy() {
        const url = 'https://www.cma-cgm.com/ebusiness/registration/information'
        wx.setClipboardData({
            data: url,
            success() {
                wx.showToast({
                    title: languageUtils.languageVersion().lang.page.copyInfo.success,
                    icon: 'none',
                    mask: true,
                    duration: 2000
                })
            }
        })
    }
})