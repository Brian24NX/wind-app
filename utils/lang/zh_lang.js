/**
 *  author:Jason
 *  time:2022-03-15 17:56:03
 *  desc:国际化中文语言包
 */
var Languague = {
  //个人中心
  userCenter:{
    //banner
    banner:"http://hyncdata.maomaokeji.cn/hync/20200717/cb1d554cec91434d9c4e5b9058724a67.png",
    //中英文切换按钮
    changeLanguage:"切换英文",
    //个人信息
    userInfo:{
      title:"个人信息",
      content:{}
    },
     //联系我们
    contactUs:{
      title:"联系我们",
      content:{}
    },
    //个人中心
    title:"首页"
  },

  //顶部导航栏，这里是用于自定义tarbar用的
  toolbar:{
      "list": [
      {
        "pagePath": "pages/Home/index",
        "text": "首页",
        "iconPath": "/assets/img/tabs/home.png",
        "selectedIconPath": "/assets/img/tabs/home-active.png"
      }, 
      {
        "pagePath": "pages/Query/index",
        "text": "查询",
        "iconPath": "/assets/img/tabs/message.png",
        "selectedIconPath": "/assets/img/tabs/message-active.png"
      },
      {
        "pagePath": "pages/Quotation/index",
        "text": "分析",
        "iconPath": "/assets/img/tabs/contact.png",
        "selectedIconPath": "/assets/img/tabs/contact-active.png"
      },
      {
        "pagePath": "pages/My/index",
        "text": "我的",
        "iconPath": "/assets/img/tabs/profile.png",
        "selectedIconPath": "/assets/img/tabs/profile-active.png"
      }
    ]
  }
}

module.exports = {
  lang: Languague
}
