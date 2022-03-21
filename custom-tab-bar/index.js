var app=getApp()
var languageUtil=require('../utils/languageUtils')
Component({
  data: {
    version:0,
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    "list": [
      {
        "pagePath": "../Home/index",
        "text": "首页",
        "iconPath": "/assets/img/tabs/home.png",
        "selectedIconPath": "/assets/img/tabs/home-active.png"
      }, 
      {
        "pagePath": "../Query/index",
        "text": "咨询",
        "iconPath": "/assets/img/tabs/message.png",
        "selectedIconPath": "/assets/img/tabs/message-active.png"
      },
      {
        "pagePath": "../Quotation/index",
        "text": "报价",
        "iconPath": "/assets/img/tabs/contact.png",
        "selectedIconPath": "/assets/img/tabs/contact-active.png"
      },
      {
        "pagePath": "../My/index",
        "text": "我的",
        "iconPath": "/assets/img/tabs/profile.png",
        "selectedIconPath": "/assets/img/tabs/profile-active.png"
      }
    ]
  },
  attached() {
      console.log(this.list);
  },
  show(){

  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(data)
      //切换导航栏，标识导航栏下标
      this.setData({
        selected: data.index
      })
    //点击导航栏，跳转到对应页面上
      wx.switchTab({url:url})
    }  
  }
})