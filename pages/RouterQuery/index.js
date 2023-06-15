// pages/RouterQuery/index.js
const app = getApp();
var languageUtil = require('../../utils/languageUtils')
const utils = require('../../utils/util')
const dayjs = require("dayjs");
import {
  fuzzySearch,
  // routingFinder
} from '../../api/modules/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    languageContent: {}, // 用于保存当前页面所需字典
    language: 'zh',
    verifyInfo: {},
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    showPol: false,
    polCount:0,
    showPod: false,
    podCount:0,
    // 卸货港
    podvalue: "",
    podcode: "",
    // 起运港
    polvalue: "",
    polcode: "",
    array: [],
    pollist: [],
    podlist: [],
    searchlist: [],
    // search 离案
    search: '',
    searchName: '',
    // week  
    week: 3,
    weekName: '',
    weeklist: [],
    date: '',
    resultlist: {},
    showRemind1: false,
    showRemind2: false,
    showRemind3: false,
    showRemind4: false,
    showDelete1: false,
    showDelete2: false,
    columns: [],
    valueKey: '',
    showPopup: false,
    popupType: 1,
    defaultIndex: 0,
    showDatePopup: false,
    currentDate: null,
    showOverlay: false,
    showDropdown: {
      pol: false,
      pod: false,
    },
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initLanguage()
    this.setDefaultLocation()
  },

  onShareAppMessage: function () {},

  //初始化语言
  initLanguage() {
    this.setData({
      languageContent: languageUtil.languageVersion().lang.page.scheduleSearching,
      language: languageUtil.languageVersion().lang.page.langue,
      verifyInfo: languageUtil.languageVersion().lang.page.verifyInfo
    })
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.homeInfo.SCHEDULE
    })
    if (languageUtil.languageVersion().lang.page.langue === 'en') {
      this.setData({
        searchlist: [{
          id: 0,
          method: "Departure"
        }, {
          id: 1,
          method: "Arrival"
        }],
        weeklist: [{
          id: 1,
          weeks: '1 Week'
        }, {
          id: 2,
          weeks: '2 Weeks'
        }, {
          id: 3,
          weeks: '3 Weeks'
        }, {
          id: 4,
          weeks: '4 Weeks'
        }]
      })
    } else {
      this.setData({
        searchlist: [{
          id: 0,
          method: "离港时间"
        }, {
          id: 1,
          method: "到港时间"
        }],
        weeklist: [{
          id: 1,
          weeks: '1 星期'
        }, {
          id: 2,
          weeks: '2 星期'
        }, {
          id: 3,
          weeks: '3 星期'
        }, {
          id: 4,
          weeks: '4 星期'
        }]
      })
    }
  },

  // 设置默认起运卸货港
  setDefaultLocation() {
    let location = wx.getStorageSync('location')
    this.setData({
      date: this.getDate(),
      search: 0,
      searchName: this.data.searchlist[0].method,
      weekName: this.data.weeklist[2].weeks,
      array: location,
      pollist: [],
      podlist: []
    })
    if (wx.getStorageSync('setHangXian')) {
      let polobject = wx.getStorageSync('polobject')
      let podobject = wx.getStorageSync('podobject')
      this.setData({
        polvalue: polobject.polvalue,
        podvalue: podobject.podvalue,
        polcode: polobject.polcode,
        podcode: podobject.podcode,
        showDelete1: polobject.polvalue ? true : false,
        showDelete2: podobject.podvalue ? true : false
      })
      wx.setStorageSync('setHangXian', false)
      wx.removeStorageSync('polobject')
      wx.removeStorageSync('podobject')
    }
  },

  getlocation(e) {
    let index = e.currentTarget.dataset.index;
    let location = this.data.array[index].name;
    let pollocation = location.split("-")[0];
    let podlocation = location.split("-")[1];
    let polcode = this.data.array[index].polCode;
    let podcode = this.data.array[index].podCode;
    this.setData({
      podcode: podcode,
      polcode: polcode,
      podvalue: podlocation,
      polvalue: pollocation,
      showRemind1: false,
      showRemind2: false,
      showRemind3: false,
      showRemind4: false,
      showDelete1: true,
      showDelete2: true
    })
  },

  //获取起始港的接口处理
  changepol: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete1: !!data,
      showRemind1: false,
      showRemind2: false,
      showPol: false,
      polCount:0,
      pollist: []
    })
    if (data.length < 2) {
      this.setData({
        pollist: []
      })
      return
    }else{
      if(wx.getStorageSync('partnerList')[0]?.code == '0002130568'){
        this.setData({
          showPol: true
        })
        let list=[]
        if(data.indexOf('CN')!==-1||data.indexOf('cn')!==-1||data.indexOf('Cn')!==-1){
          list=[{"pointCode":"CNAN1","point":"ANJI, 33;CN;CNAN1"},{"pointCode":"CNAQG","point":"ANQING;CN;CNAQG"},{"pointCode":"CNBAY","point":"BAYUQUAN, YINGKOU;CN;CNBAY"},{"pointCode":"CNBEI","point":"BEILUN, 33;CN;CNBEI"},{"pointCode":"CNBHY","point":"BEIHAI;CN;CNBHY"},{"pointCode":"CNBJS","point":"BEIJING;CN;CNBJS"},{"pointCode":"CNCAN","point":"GUANGZHOU;CN;CNCAN"},{"pointCode":"CNCDE","point":"CHANGDE, 43;CN;CNCDE"},{"pointCode":"CNCFD","point":"CAOFEIDIAN, 13;CN;CNCFD"},{"pointCode":"CNCGO","point":"ZHENGZHOU;CN;CNCGO"},{"pointCode":"CNCGU","point":"CHANGSHU;CN;CNCGU"},{"pointCode":"CNCKG","point":"CHONGQING;CN;CNCKG"},{"pointCode":"CNCLJ","point":"CHENGLINGJI, 43;CN;CNCLJ"},{"pointCode":"CNCOZ","point":"CHAOZHOU;CN;CNCOZ"},{"pointCode":"CNCPG","point":"CHANGPING;CN;CNCPG"},{"pointCode":"CNCSX","point":"CHANGSHA;CN;CNCSX"},{"pointCode":"CNCTU","point":"CHENGDU;CN;CNCTU"},{"pointCode":"CNCWN","point":"CHIWAN;CN;CNCWN"},{"pointCode":"CNCZ1","point":"CHIZHOU, 34;CN;CNCZ1"},{"pointCode":"CNCZX","point":"CHANGZHOU;CN;CNCZX"},{"pointCode":"CNDCB","point":"DACHAN BAY, 44;CN;CNDCB"},{"pointCode":"CNDDG","point":"DANDONG;CN;CNDDG"},{"pointCode":"CNDEI","point":"DEQING, 33;CN;CNDEI"},{"pointCode":"CNDFE","point":"DAFENG, 32;CN;CNDFE"},{"pointCode":"CNDGG","point":"DONGGUAN;CN;CNDGG"},{"pointCode":"CNDLC","point":"DALIAN;CN;CNDLC"},{"pointCode":"CNDMY","point":"TAIZHOU - DAMAIYU, 33;CN;CNDMY"},{"pointCode":"CNDOU","point":"DOUMEN, 44;CN;CNDOU"},{"pointCode":"CNDS3","point":"DUSHAN, 33;CN;CNDS3"},{"pointCode":"CNDSN","point":"DONGSHAN;CN;CNDSN"},{"pointCode":"CNDZ3","point":"DONGZHOU, 33;CN;CNDZ3"},{"pointCode":"CNFAN","point":"FANGCHENG;CN;CNFAN"},{"pointCode":"CNFGN","point":"FANGCUN;CN;CNFGN"},{"pointCode":"CNFLG","point":"FULING, 50;CN;CNFLG"},{"pointCode":"CNFNG","point":"FUYONG, 44;CN;CNFNG"},{"pointCode":"CNFOC","point":"MAWEI FUZHOU;CN;CNFOC"},{"pointCode":"CNFUG","point":"JIANGYIN, FUQING,FUZHOU, 35;CN;CNFUG"},{"pointCode":"CNFYG","point":"FUYONG;CN;CNFYG"},{"pointCode":"CNGA4","point":"GANZHOU, JIANGXI;CN;CNGA4"},{"pointCode":"CNGAS","point":"GAOSHA, 44;CN;CNGAS"},{"pointCode":"CNGAY","point":"ZHAOQING - GAOYAO, 44;CN;CNGAY"},{"pointCode":"CNGGY","point":"GONGYI, 44;CN;CNGGY"},{"pointCode":"CNGOM","point":"GAOMING;CN;CNGOM"},{"pointCode":"CNGON","point":"GAOLAN, 44;CN;CNGON"},{"pointCode":"CNGUG","point":"GUIGANG;CN;CNGUG"},{"pointCode":"CNHAK","point":"HAIKOU;CN;CNHAK"},{"pointCode":"CNHFE","point":"HEFEI;CN;CNHFE"},{"pointCode":"CNHGH","point":"HANGZHOU;CN;CNHGH"},{"pointCode":"CNHME","point":"HAIMEN;CN;CNHME"},{"pointCode":"CNHRB","point":"HARBIN;CN;CNHRB"}]
        }if(data.indexOf('H')!==-1||data.indexOf('h')!==-1){
          list = [{"pointCode":"HKHKG","point":"HONG KONG;SAR;CHINA"}]
        }if(data.indexOf('CNJIX')!==-1||data.indexOf('Cnjix')!==-1||data.indexOf('cnjix')!==-1){
          list =[{"pointCode":"CNJIX","point":"JIAXING, 33;CN;CNJIX"}]
        }if(data.indexOf('S')!==-1||data.indexOf('s')!==-1){
          list =[{"pointCode":"SGSIN","point":"SINGAPORE;SG;SGSIN"}]
        }else{
          this.hideDropdown()
        }
        this.setData({
          showPol: false,
          pollist: list
        })
      }else {
        this.getPolData(data)
      }
      this.showDropdown(e[0].currentTarget.id || 'pol')}
  }, 800),

  getPolData(data) {
    this.setData({
      showPol: true
    })
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      this.setData({
        showPol: false,
        polCount:0,
      })
      if (res.data != ''&&res.data!==undefined) {
        console.log(res.data,JSON.stringify(res.data))
        this.setData({
          pollist: res.data || []
        })
      }else{
        this.hideDropdown()
      }
    }, () => {
      this.data.polCount++
      if(this.data.polCount<=3){
        this.getPolData(data)
      }else{
        this.setData({
          showPol: false,
          polCount:0,
        })
        this.hideDropdown()
      }
    })
  },

  //获取卸货港的接口处理
  changepod: utils.debounce(function (e) {
    const data = e['0'].detail.value
    this.setData({
      showDelete2: !!data,
      showRemind3: false,
      showRemind4: false,
      showPod: false,
      podCount:0,
      podlist: []
    })
    if (data.length < 2) {
      this.setData({
        podlist: []
      })
      return
    }else{
      if(wx.getStorageSync('partnerList')[0]?.code == '0002130568'){
        this.setData({
          showPod: true
        })
        let list = []
        if(data.indexOf('FR')!==-1||data.indexOf('fr')!==-1||data.indexOf('Fr')!==-1){
          list=[{"pointCode":"FR2GO","point":"TREMOREL,22;FR;FR2GO"},{"pointCode":"FR3EH","point":"BREHAN, 56;FR;FR3EH"},{"pointCode":"FR5SS","point":"ISSE, 44;FR;FR5SS"},{"pointCode":"FRARQ","point":"ARQUES, 62;FR;FRARQ"},{"pointCode":"FRAUT","point":"AUTUN, 71;FR;FRAUT"},{"pointCode":"FRBAS","point":"BASSENS,33;FR;FRBAS"},{"pointCode":"FRBAY","point":"BAYONNE, 64;FR;FRBAY"},{"pointCode":"FRBES","point":"BREST;FR;FRBES"},{"pointCode":"FRBI9","point":"BAIS, 35;FR;FRBI9"},{"pointCode":"FRBOD","point":"BORDEAUX, 33;FR;FRBOD"},{"pointCode":"FRBRU","point":"BRUGES/BORDEAUX, 33;FR;FRBRU"},{"pointCode":"FRBSM","point":"BONNEUIL SUR MARNE, 94;FR;FRBSM"},{"pointCode":"FRC5V","point":"CLERVAL, 25;FR;FRC5V"},{"pointCode":"FRCBQ","point":"CHATEAUBERNARD, 16;FR;FRCBQ"},{"pointCode":"FRCER","point":"CHERBOURG, 50;FR;FRCER"},{"pointCode":"FRCFE","point":"CLERMONT FERRAND, 63;FR;FRCFE"},{"pointCode":"FRCNG","point":"COGNAC, 16;FR;FRCNG"},{"pointCode":"FRCSS","point":"CHALON SUR SAONE, 71;FR;FRCSS"},{"pointCode":"FRDGS","point":"DOURGES, 62;FR;FRDGS"},{"pointCode":"FRDKK","point":"DUNKERQUE;FR;FRDKK"},{"pointCode":"FRERN","point":"ERSTEIN, 67;FR;FRERN"},{"pointCode":"FRFOS","point":"FOS SUR MER;FR;FRFOS"},{"pointCode":"FRGRA","point":"GRETZ-ARMAINVILLIERS;FR;FRGRA"},{"pointCode":"FRGVL","point":"GENNEVILLIERS, 92;FR;FRGVL"},{"pointCode":"FRHEA","point":"CHERAC, 17;FR;FRHEA"},{"pointCode":"FRHON","point":"HONFLEUR, 14;FR;FRHON"},{"pointCode":"FRLAU","point":"LAUTERBOURG, 67;FR;FRLAU"},{"pointCode":"FRLBF","point":"LA BRUFFIERE, 85;FR;FRLBF"},{"pointCode":"FRLEH","point":"LE HAVRE;FR;FRLEH"},{"pointCode":"FRLIO","point":"LYON, 69;FR;FRLIO"},{"pointCode":"FRLLE","point":"LILLE, 59;FR;FRLLE"},{"pointCode":"FRLMY","point":"LIMAY, 78;FR;FRLMY"},{"pointCode":"FRLOC","point":"LOCTUDY, 29;FR;FRLOC"},{"pointCode":"FRLPE","point":"LA PALLICE;FR;FRLPE"},{"pointCode":"FRLRH","point":"LA ROCHELLE;FR;FRLRH"},{"pointCode":"FRLRT","point":"LORIENT, 56;FR;FRLRT"},{"pointCode":"FRLUD","point":"LOUDEAC, 22;FR;FRLUD"},{"pointCode":"FRLVE","point":"LE VERDON;FR;FRLVE"},{"pointCode":"FRMLE","point":"MELLE, 79;FR;FRMLE"},{"pointCode":"FRMRS","point":"MARSEILLE;FR;FRMRS"},{"pointCode":"FRMTX","point":"MONTOIR DE BRETAGNE;FR;FRMTX"},{"pointCode":"FRNCE","point":"NICE, 06;FR;FRNCE"},{"pointCode":"FROTM","point":"OTTMARSHEIM, 68;FR;FROTM"},{"pointCode":"FROUI","point":"OUISTREHAM, 14;FR;FROUI"},{"pointCode":"FRPAR","point":"PARIS, 75;FR;FRPAR"},{"pointCode":"FRPOV","point":"PORT VENDRES;FR;FRPOV"},{"pointCode":"FRRAD","point":"RADICATEL;FR;FRRAD"},{"pointCode":"FRRAE","point":"BRAINE,02;FR;FRRAE"},{"pointCode":"FRRDL","point":"RION DES LANDES, 40;FR;FRRDL"},{"pointCode":"FRRIB","point":"RIBECOURT, 60;FR;FRRIB"}]
        }if(data.indexOf('H')!==-1||data.indexOf('h')!==-1){
          list = [{"pointCode":"HKHKG","point":"HONG KONG;SAR;CHINA"}]
        }if(data.indexOf('C')!==-1||data.indexOf('c')!==-1){
          list =[{"pointCode":"CNJIX","point":"JIAXING, 33;CN;CNJIX"}]
        }if(data.indexOf('S')!==-1||data.indexOf('s')!==-1){
          list =[{"pointCode":"SGSIN","point":"SINGAPORE;SG;SGSIN"}]
        }if(data.indexOf('FRPAR')!==-1||data.indexOf('Frpar')!==-1||data.indexOf('frpar')!==-1){
          list=[{"pointCode": "FRPAR", "point": "PARIS, 75;FR;FRPAR"}]
        }else{
          this.hideDropdown()
        }
        this.setData({
          showPod: false,
          podlist: list
        })
      }else {
        this.getPodData(data)
      }
    this.showDropdown(e[0].currentTarget.id || 'pod')
    }
  }, 800),

  getPodData(data) {
    this.setData({
      showPod: true
    })
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      this.setData({
        showPod: false,
        podCount:0,
      })
      if (res.data != ''&&res.data!==undefined) {
        this.setData({
          podlist: res.data || []
        })
      }else{
        this.hideDropdown()
      }
    }, () => {
      this.data.podCount++
      if(this.data.podCount<=3){
        this.getPodData(data)
      }else{
        this.setData({
          showPod: false,
          podCount:0,
        })
        this.hideDropdown()
      }
    })
  },

  deleteValue(e) {
    const type = e.currentTarget.dataset.type
    if (type === '1') {
      this.setData({
        polvalue: '',
        polcode: '',
        pollist: [],
        showDelete1: false,
        showRemind1: false,
        showRemind2: false
      })
    } else {
      this.setData({
        podvalue: '',
        podcode: '',
        podlist: [],
        showDelete2: false,
        showRemind3: false,
        showRemind4: false
      })
    }
  },

  // 起始港选择
  changepolname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      polvalue: this.data.pollist[index].point,
      polcode: this.data.pollist[index].pointCode,
      pollist: [],
    })
    this.hideDropdown()
  },

  // 卸货港
  changepodname(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      podvalue: this.data.podlist[index].point,
      podcode: this.data.podlist[index].pointCode,
      podlist: []
    })
    this.hideDropdown()
  },

  openPopup(e) {
    if (e.currentTarget.dataset.type === '2') {
      const date = this.data.date.replaceAll('-', '/')
      this.setData({
        currentDate: new Date(date).getTime(),
        showDatePopup: true
      })
      return
    }
    this.setData({
      popupType: e.currentTarget.dataset.type,
      columns: e.currentTarget.dataset.type === '1' ? this.data.searchlist : this.data.weeklist,
      valueKey: e.currentTarget.dataset.type === '1' ? 'method' : 'weeks',
      defaultIndex: e.currentTarget.dataset.type === '1' ? this.data.search : this.data.week - 1,
      showPopup: true
    })
  },

  onClose() {
    this.setData({
      popupType: '',
      columns: [],
      valueKey: '',
      showPopup: false
    })
  },

  onConfirm(e) {
    if (this.data.popupType === '1') {
      this.setData({
        search: e.detail.id,
        searchName: e.detail.method
      })
    } else {
      this.setData({
        week: e.detail.id,
        weekName: e.detail.weeks
      })
    }
    this.onClose()
  },

  closeDate() {
    this.setData({
      showDatePopup: false
    })
  },

  confirmDate(e) {
    this.setData({
      date: dayjs(e.detail).format('YYYY-MM-DD'),
      showDatePopup: false
    })
  },

  getDate() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = now.getDate();
    day = day < 10 ? ('0' + day) : day
    return year + '-' + month + '-' + day;
  },

  isAdsValid(str){
    let reg = /^([A-z0-9\,\.\-\/\s]+[A-z0-9]+[\;]){2}([A-z0-9]+)$/;
    return reg.test(str); 
  },

  // 提交搜索
  submit() {
    if (this.data.showDelete1) {
      this.setData({
        showRemind1: false
      })
      // var reg = /^([ ]*[A-z0-9]+([\,\.\-\;]*)){2,}$/;
      if (this.data.polvalue) {
        if (!this.isAdsValid(this.data.polvalue)) {
          this.setData({
            showRemind2: true
          })
        } else {
          this.setData({
            showRemind2: false
          })
        }
      } else {
        this.setData({
          showRemind1: false,
          showRemind2: true
        })
      }
    } else {
      this.setData({
        showRemind1: true,
        showRemind2: false
      })
    }

    if (this.data.showDelete2) {
      this.setData({
        showRemind3: false
      })
      if (this.data.podvalue) {
        if (!this.isAdsValid(this.data.podvalue)) {
          this.setData({
            showRemind4: true
          })
        } else {
          this.setData({
            showRemind4: false
          })
        }
      } else {
        this.setData({
          showRemind4: true
        })
      }
    } else {
      this.setData({
        showRemind3: true,
        showRemind4: false
      })
    }
    if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4) return
    this.setHistory()
  },

  // 设置历史查询
  setHistory(obj) {
    // wx.setStorageSync('resultlist', this.data.resultlist);
    wx.setStorageSync('searchKey', {
      placeOfDischarge: this.data.podcode,
      podvalue: this.data.podvalue.split(';')[0],
      podCode: this.data.podvalue.split(';')[1],
      placeOfLoading: this.data.polcode,
      polCode: this.data.polvalue.split(';')[1],
      polvalue: this.data.polvalue.split(';')[0],
      searchRange: this.data.week * 7,
      search: this.data.search,
      searchDate: this.data.date
    })
    let history = this.data.array || [];
    let polpleace = this.data.polvalue;
    let podpleace = this.data.podvalue;
    let str = polpleace + '-' + podpleace;
    if (history.findIndex(item => item.name === str) === -1) {
      if (history.length == 6) {
        history.pop();
      }
      history.unshift({
        name: str,
        polCode: this.data.polcode,
        podCode: this.data.podcode
      });
      this.setData({
        array: history,
      })
      wx.setStorageSync('location', this.data.array);
    }
    wx.navigateTo({
      url: '/pages/Result/index',
    })
  },

  onclose(e) {
    let index = e.currentTarget.dataset.index;
    let history = this.data.array;
    history.splice(index, 1)
    this.setData({
      array: history
    })
    wx.setStorageSync('location', history)
  },

  deleteall() {
    let history = this.data.array;
    history = [];
    this.setData({
      array: history
    })
    wx.removeStorageSync('location')
  },

  showDropdown(id) {
    var key = 'showDropdown.' + id
    this.setData({
      [key]: true,
      showOverlay: true
    })
  },

  hideDropdown(e) {
    this.setData({
      showDropdown: {
        pol: false,
        pod: false,
      },
      showOverlay: false
    })
  },
})