/**
 *  author:Jason
 *  time:2022-03-15 17:56:03
 *  desc:国际化英文语言包
 */
var Languague = {
  //个人中心
  userCenter:{
    //banner
    banner:"http://hyncdata.maomaokeji.cn/hync/20200717/cb1d554cec91434d9c4e5b9058724a67.png",
    //中英文切换按钮
    changeLanguage:"change to Chinese",
    //个人信息
    userInfo:{
      title:"personal information",
      content:{}
    },
     //联系我们
    contactUs:{
      title:"contact us",
      content:{}
    },
    //页面标题
    title:"Home"
  },

  //底部英文版工具栏，这里是用于自定义tarbar用的
  toolbar:{
      "list": [
      {
        "pagePath": "pages/Home/index",
        "text": "Home",
        "iconPath": "/assets/img/tabs/home.png",
        "selectedIconPath": "/assets/img/tabs/home-active.png"
      }, 
      {
        "pagePath": "pages/Query/index",
        "text": "Query",
        "iconPath": "/assets/img/tabs/message.png",
        "selectedIconPath": "/assets/img/tabs/message-active.png"
      },
      {
        "pagePath": "pages/Quotation/index",
        "text": "Quotation",
        "iconPath": "/assets/img/tabs/contact.png",
        "selectedIconPath": "/assets/img/tabs/contact-active.png"
      },
      {
        "pagePath": "pages/My/index",
        "text": "My",
        "iconPath": "/assets/img/tabs/profile.png",
        "selectedIconPath": "/assets/img/tabs/profile-active.png"
      }
    ]
  }
}

module.exports = {
  lang: Languague
}
