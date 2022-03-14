var Languague = {
  home: {
    test: 'i am home page'
  },

  product: {
    name: 'test',
    list: []
  },

  understand: {
    test: 'i am understanding product page'
  },

  userCenter:{
    //中英文切换按钮
    changeLanguage:"change to Chinese",
    userInfo:{
      title:"personal information"
    },
     //联系我们
    contactUs:{
      title:"contact us"
    },
  },

  //底部英文版工具栏，这里是用于自定义tarbar用的
  toolbar:{
    list: [
      {
        pagePath: "pages/Home/index",
        iconPath: "/assets/img/tabs/home.png",
        selectedIconPath: "/assets/img/tabs/home-active.png",
        text: 'Home',
        isdot: false,
        number: 0
      }, {
        pagePath: "pages/Query/index",
        iconPath: "/assets/img/tabs/message.png",
        selectedIconPath: "/assets/img/tabs/message-active.png",
        text: 'Query',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home2/index",
        iconPath: "/assets/img/tabs/contact.png",
        selectedIconPath: "/assets/img/tabs/contact-active.png",
        text: 'Quotation',
        isdot: false,
        number: 0
      }, {
        pagePath: "pages/My/index",
        selectedIconPath: '/assets/img/tabs/profile.png',
        iconPath: '/assets/img/tabs/profile-active.png',
        text: 'My',
        isdot: false,
        number: 0
      }
    ]
  }
}

module.exports = {
  lang: Languague
}