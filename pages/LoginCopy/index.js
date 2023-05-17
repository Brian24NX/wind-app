// pages/LoginCopy/index.js
const utils = require('../../utils/util')
const config = require('../../config/config')
// const app = getApp();
// var languageUtil = require('../../utils/languageUtils')
// const utils = require('../../utils/util')
// const dayjs = require("dayjs");
import {
  mockLogin,
  bindPhone,
  checkPhoneBind,
  writeOperationLog,
  seaPartnerInfo
} from '../../api/modules/home'
Page({

  /**
   * Page initial data
   */
  data: {
      option1: [
        { text: 'English', value: 0 },
        { text: 'Français', value: 1 },
        { text: 'Português', value: 2 },
        { text: 'Español', value: 3 },
        { text: '中文', value: 4 },
        { text: '日本語', value: 5 },
        {text:'한국어',value: 6}
      ],
    language:0,
      item: {
      title:[
          'Sign In',
          'Connexion',
          'Iniciar',
          'Iniciar sesión',
          '登录',
        'サインイン',
          '로그인'
      ],
        username:[
            'Login (Email)',
          'Identifiant (Email)',
          'Usuário (Email)',
            'Nombre de usuario (Email)',
            '电子邮件',
          'ログイン(メールアドレス)',
            '사용자명 (이메일)'
        ],
        password: [
            'Password',
          'Mot de passe',
            'Senha',
            'Contraseña',
            '密码',
            'パスワード',
            '비밀번호'
        ],
        Forgotten:[
            'Forgotten Password?',
            'Mot de passe oublié?',
          'Esqueceu a senha?',
            '¿Olvidó su contraseña?',
            '忘记了密码？',
            'パスワードをお忘れですか？',
            '비밀번호를 잊으셨습니까?'
        ],
        sing:[
            'Sign In',
            'Connexion',
            'Iniciar',
            'Iniciar sesión',
            '登录',
            'サインイン',
            '로그인'
        ],
        err:[
            'The user name or password is incorrect.',
            'Le nom d\'utilisateur ou le mot de passe que vous avez entré n\'est pas reconnu. Veuillez réessayer',
            'A palavra-passe ou nome de utilizador está incorrecto.',
            'El nombre de usuario o la contraseña son incorrectos.',
            '用户名或密码不正确。',
            'ユーザー名またはパスワードが正しくありません。',
            '사용자 이름 또는 비밀번호가 잘못되었습니다.',
        ]
      },
      value1: 0,
      value2: 'a',
      username:'',
      password:'',
      isShow:false,
    isErr:false
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {

    wx.setNavigationBarTitle({
      title: this.data.item.title[this.data.language],
    })
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
    wx.removeStorageSync('seaRewardData')
    if(wx.getStorageSync('partnerList')){
      this.getSeaPartnerInfo()
    }
    console.log('level',level)
    wx.setStorageSync('rewardLevel', level)
    this.setData({
      rewardLevel: level
    })

  },
  onInput(event){
    this.setData({
      username:event.detail.value
    })
  },
  onShow(){
    console.log(this.data.option1)
  },
  isShow(){
    this.setData({
      isShow: !this.data.isShow
    })
  },
  languageBtn(val){
    this.setData({
      language: val.detail.index
    })
    this.setData({
      isShow: false
    })
    this.onLoad()
  },
  pwdInput(event){
  this.setData({
    password:event.detail.value
  })
  },
  toLogin() {
    mockLogin({username:this.data.username,pwd:this.data.password}).then(res=>{
      if(res.data){
        this.setData({
          isErr:false
        })
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
        wx.navigateTo({
          url: '/pages/loading/index',
        })
      }else{
        this.setData({
          isErr:true
        })
      }
    }).catch(err => {
      console.log(err)
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
        const myReward = this.data.rewardLevel.filter((i) => i.label === infodata.memberTiers[0].loyaltyMemberTierName)
        const points = infodata.memberCurrencies.filter((j) => j.loyaltyMemberCurrencyName === 'Available Nmiles')[0]
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

  page(){
    wx.navigateTo({
      url: '/pages/LoginCopy/detail/index'
    })
  },
})