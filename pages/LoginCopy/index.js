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
        ]
      },
      value1: 0,
      value2: 'a',
      username:'',
      password:'',
      isShow:false
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
    console.log('key-on',event.detail.value)
    this.setData({
      username:event.detail.value
    })
    console.log('Username',this.data.username)
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
  toLogin() {
    console.log(this.data.username)
    wx.navigateTo({
                url: '/pages/LoginCopy/loading/loading',
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

  page(){
    wx.navigateTo({
      url: '/pages/LoginCopy/detail'
    })
  },
})