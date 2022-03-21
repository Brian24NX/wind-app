/**
 *  author:Jason
 *  time:2022-03-15 17:56:03
 *  desc:国际化中文语言包
 */
var Languague = {
  //个人中心
  userCenter:{
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
    title:"首页",
    homeInfo:{
       //货物追踪
       goods:"货物追踪",
       //箱号
       containerNo:"箱号",
       //提单号
       billOfLadingNo:"提单号",
       //订舱号
       bookingRef:"订舱号",
       //提示
       tips:"最多可同时查询三个集装箱状态，请输入箱号并用逗号隔开。",
       //船期查询
       query:"船期查询",
       //实时报价
       instantQuote:"实时报价",
       //柜租费率
       ddRate:"柜租费率",
       //价格模拟
       priceSimulation:"价格模拟",
       //查询费率
       chargeFinder:"查询费率",
       //新闻咨询
       news:"新闻咨询",
       //增值服务
       valueAddedService:"增值服务",
       //Act with CMA CGM+
       actWithCmaCgm:"Act with CMA CGM+",
       //SpotOn即时定价
       spotOnFreeTime:"SpotOn即时定价",
       //无纸化提单
       paperinessBl:"无纸化提单",
       //Priority SPGO Family
       prioritySpgoFamily:"Priority SPGO Family",
       //多式联运
       intermodal:"多式联运",
       //关于达飞
       aboutCmaCgm:"关于达飞",
       //更多
       more:"更多"
    },
    //航线查询
    scheduleSearching:{
        //航线|获取船期
        getASchedule:"航线|获取船期",
        //卸货港
        portOfDischarge:"卸货港",
        //起运港
        protOfLanding:"起运港",
        //此项为必填项
        theFieldIsMandatory:"此项为必填项",
        //格式无效
        formatIsInvalid:"格式无效",
    }
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
        "text": "咨询",
        "iconPath": "/assets/img/tabs/message.png",
        "selectedIconPath": "/assets/img/tabs/message-active.png"
      },
      {
        "pagePath": "pages/Quotation/index",
        "text": "报价",
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
