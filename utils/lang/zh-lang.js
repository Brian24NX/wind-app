/*
*  author:Jason
*  time:2022-3-14 12:32:05
*  desc: chinese语言
*/
var Languague={
    userCenter:{
        //中英文切换按钮
        changeLanguage:"切换英文",
        contactUs:{
            title:"联系我们"
        },
    },
    toolbar:{
        list: [
          {
            pagePath: "pages/Home/index",
            iconPath: "/assets/img/tabs/home.png",
            selectedIconPath: "/assets/img/tabs/home-active.png",
            text: '首页',
            isdot: false,
            number: 0
          }, {
            pagePath: "pages/Query/index",
            iconPath: "/assets/img/tabs/message.png",
            selectedIconPath: "/assets/img/tabs/message-active.png",
            text: '查询',
            isdot: false,
            number: 0
          }, {
            pagePath: "page/home2/index",
            iconPath: "/assets/img/tabs/contact.png",
            selectedIconPath: "/assets/img/tabs/contact-active.png",
            text: '引用',
            isdot: false,
            number: 0
          }, {
            pagePath: "pages/My/index",
            selectedIconPath: '/assets/img/tabs/profile.png',
            iconPath: '/assets/img/tabs/profile-active.png',
            text: '我的',
            isdot: false,
            number: 0
          }
          ]
    }
}
module.exports={
    lang:Languague
}