// pages/Home/index.js
const app = getApp();
import {
  fuzzySearch,routingFinder
} from '../../api/modules/home';
var languageUtil = require('../../utils/languageUtils')
const utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {}, // 用于保存当前页面所需字典变了
    currentTab: 0,
    currentTrackTab: 0,
    containerno: '',
    billnod: '',
    bookref: '',
    navTop: app.globalData.navTop,
    navHeight: app.globalData.navHeight,
    tabList: [{
      id: 'TRACKING',
      label: '货物追踪',
    }, {
      id: 'SCHEDULE',
      label: '船期查询',
    }, {
      id: 'PRICE',
      label: '获取报价',
    }],
    actived: 'TRACKING',
    currentIndex: 0,
    huoGuiValue: '',
    showRemind: false,
    qiYunValue: '',
    qiYunCode:'',
    showRemind2: false,
    xieHuoValue: '',
    xieHuoCode:'',
    showRemind3: false,
    showRemind4: false,
    showRemind5: false,
    codePolList: [],
    codePodList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    this.initLanguage();
  },
  // 切换搜索类型
  changeSearchTab(e) {
    this.setData({
      actived: e.currentTarget.dataset.type,
      showRemind: false,
      huiguiType: 1,
      showRemind2: false,
      showRemind3: false,
      showRemind4:false,
      showRemind5:false
    })
  },
  // discover切换swiper
  changeCurrentDto(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  setHuoGui(e) {
    let value = e.detail.value;
    if (!value) {
      this.setData({
        huoGuiValue: value,
        showRemind: true,
        huiguiType: 1
      })
      return
    }
    var reg = /^([0-9a-zA-Z,])*([0-9a-zA-Z]+)$/;
    value = value.substr(value.length - 1, 1) === ',' ? value.substr(0, value.length - 1) : value;
    if (!reg.test(value)) {
      this.setData({
        huoGuiValue: value,
        showRemind: true,
        huiguiType: 2
      })
      return
    }
    const length = value.split(',').length
    this.setData({
      huoGuiValue: value,
      showRemind: length > 3 ? true : false,
      huiguiType: 3
    })
  },
  // 获取追踪
  toHuoWu() {
    if (this.data.showRemind) {
      return
    }
    if (!this.data.huoGuiValue) {
      this.setData({
        showRemind: true,
        huiguiType: 1
      })
      return
    }
    wx.navigateTo({
      url: `/pages/Orders/index?str=${this.data.huoGuiValue}`
    })
  },
  // 设置起运港
  setQiYun: utils.debounce(function(e) {
    const data = e['0'].detail.value
    var reg = /^([0-9a-zA-Z,])*([0-9a-zA-Z]+)$/;
    let bool=reg.test(data);
    if(!bool){
        this.setData({
          showRemind5:true
        })
        return;
    }
    else{
      this.setData({
        showRemind5:false,
        codePolList: [],
        qiYunValue: data
      })
      if (data.length < 2) return
      fuzzySearch({
        searchStr: data
      }, true).then(res => {
        if(res.data!=''){
          this.setData({
            codePolList: res.data 
          })
        }
        else{
          this.setData({
            qiYunValue: data
          })
        }
        
      })
    }
  }, 500),
  // 设置卸货港
  setXieHuo: utils.debounce(function(e) {
    const data = e['0'].detail.value
    var reg = /^([0-9a-zA-Z,])*([0-9a-zA-Z]+)$/;
    let bool=reg.test(data);
    if(!bool){
      this.setData({
        showRemind5:false
      })
      return;
    }
    this.setData({
      codePodList: [],
      xieHuoValue: data
    })
    if (data.length < 2) return
    fuzzySearch({
      searchStr: data
    }, true).then(res => {
      if(res.data!=''){
        this.setData({
          codePodList: res.data
        })
      }
      else{
          this.setData({
              xieHuoValue:data
          })
      }
    })
  }, 500),
  // 设置启运港
  changepolname(e){
    
    let index=e.currentTarget.dataset.index;  
    this.setData({
      showRemind2:false,
      codePolList:[],
      qiYunValue:this.data.codePolList[index].point,
      qiYunCode:this.data.codePolList[index].pointCode
    })
  },
  // 设置卸货港
  changepodname(e){
    console.log(e); 
    let index=e.currentTarget.dataset.index; 
    
    this.setData({
      showRemind3:false,
      codePodList:[],
      xieHuoValue:this.data.codePodList[index].point,
      xieHuoCode:this.data.codePodList[index].pointCode
    })
  },
  // 船期搜索
  toChuanQi() {
    if(this.data.qiYunValue!=''){
       this.setData({
        showRemind2: false, 
       })
    }
    if(this.data.xieHuoValue!=''){
      this.setData({
        showRemind3:false
      })
    }
    
    if (!this.data.qiYunValue && !this.data.xieHuoValue) {
      this.setData({
        showRemind2: true,
        showRemind3: true
      })
      return
    }
 
    if (!this.data.qiYunValue) {
      this.setData({
        showRemind2: true
      })
      return
    }
    else{
       this.setData({
          showRemind2:false
       })
    }
    if (!this.data.xieHuoValue) {
      this.setData({
        showRemind3: true
      })
      return
    }
    else{
       this.setData({
         showRemind3:false
       })
    }
    var reg = /^([0-9a-zA-Z,])*([0-9a-zA-Z]+)$/;
    if(!reg.test(this.data.qiYunValue)){
        this.setData({
          showRemind5:true
        })
    }
    else{
       this.setData({
         showRemind5:false
       })
    }
    if(!reg.test(this.data.xieHuoValue)){
        this.setData({
          showRemind4:true
        })
    }
    else{
      this.setData({
        showRemind5:false
      })
    }
    let obj={
      placeOfDischarge:this.data.qiYunCode||this.data.qiYunValue,
      placeOfLoading:this.data.xieHuoCode||this.data.xieHuoValue,
      arrivalDate:'',
      departureDate:'',
      searchRange:'',
      shippingCompany:'',
    }
    routingFinder(obj).then(res=>{
      if(res.code==200||res.data!=''){
        wx.setStorageSync('resultlist', res.data);
        wx.navigateTo({
          url: '../Result/index',
        })
        this.setData({
          qiYunValue:'',
          xieHuoValue:''
       })
      }
      else{
        this.setData({
           qiYunValue:'',
           xieHuoValue:''
        })
        wx.showToast({
          title: '请求数据不存在或者网络错误,请您重试!',
          icon: 'none',
          duration: 2000
        })
      }
    })
    
  },
  // 高级查询
  toAdvancedSearch() {
    wx.switchTab({
      url: '/pages/Query/index',
    })
  },
  //中英文切换
  switchLanguage() {
    //切换当前版本，即修改公共变量中的version
    languageUtil.changLanguage()
    this.initLanguage()
  },
  //初始化语言
  initLanguage() {
    //获取当前小程序语言版本所对应的字典变量
    var lang = languageUtil.languageVersion()
    this.setData({
      content: lang
    })
    wx.setNavigationBarTitle({
      title: lang.lang.userCenter.hometitle
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
        list: lang.lang.toolbar.list //赋值
      })
    }
  },
  toMore() {
    wx.showToast({
      title: '功能升级中，敬请期待',
      icon: 'none'
    })
  },
  price(){
    wx.showToast({
      title: '功能升级中，敬请期待',
      icon: 'none'
    })
  }
})