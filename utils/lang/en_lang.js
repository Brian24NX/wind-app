/**
 *  author:Jason
 *  time:2022-03-15 17:56:03
 *  desc:国际化英文语言包
 */
var Languague = {
  //个人中心
  userCenter:{
    
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
    title:"CAM CGM",
    homeInfo:{
      //货物追踪
      goods:"Tracking/Shipment Tracking",
      //箱号
      containerNo:"Container No.",
      //提单号
      billOfLadingNo:"Billing of Lading No.",
      //订舱号
      bookingRef:"Booking Ref.",
      //提示
      tips:"To track up to three containers, please enter references separated by a comma.",
      //船期查询
      query:"Schedule",
      //实时报价
      instantQuote:"Instant Quote",
      //柜租费率
      ddRate:"D&D Rate",
      //价格模拟
      priceSimulation:"Price Simulation",
      //查询费率
      chargeFinder:"Charge Finder",
      //新闻咨询
      news:"News",
      //增值服务
      valueAddedService:"Value Added Service",
      //Act with CMA CGM+
      actWithCmaCgm:"Act with CMA CGM+",
      //SpotOn即时定价
      spotOnFreeTime:"SpotOn FreeTime",
      //无纸化提单
      paperinessBl:"Paperless B/L",
      //Priority SPGO Family
      prioritySpgoFamily:"Priority SPGO Priority SPGO Family ",
      //多式联运
      intermodal:"Intermodal",
      //关于达飞
      aboutCmaCgm:"About CMA CGM",
      //更多
      more:"More"
   },
   //航线查询
   scheduleSearching:{
       //航线|获取船期
       getASchedule:"Routes | Get a schedule",
       //卸货港
       portOfDischarge:"Port of Discharge, POD",
       //起运港
       protOfLanding:"Port of Loading, POL",
       //港口名称/代码
       name:"Name/Code",
       //此项为必填项
       theFieldIsMandatory:"The field is mandatory",
       //格式无效
       formatIsInvalid:"Format is invalid",
       //查询
       searchOn:"Search on",
       //离港时间
       departure:"(Search on) Departure",
       //到港时间
       arrival:"(Search on) Arrival",
       //日期
       date:"Date",
       //未来
       next:"Next",
       //查询
       search:"Search",
       //1 星期
       oneWeek:"1 Week",
       //2 星期
       twoWeek:"2 Weeks",
       //3 星期
       threeWeek:"3 Weeks",
       //4 星期
       fourWeek:"4 Weeks",
       //查询历史
       history:"History"
   },
   //航线查询结果列表
   searchResultList:{
       //日历
       calendar:"Calendar",
       //周一
       mon:"Mon",
       //周二
       tue:"Tue",
       //周三
       wed:"Wed",
       //周四
       thur:"Thur",
       //周五
       fri:"Fri",
       //周六
       sat:"Sat",
       //周日
       sun:"Sun",
       //排序
       sortBy:"Sort by",
       //最快离港
       earliestDeparture:"Earliest Departure",
       //最快到港
       earliestArrival:"Earliest Arrival",
       //离港
       depart:"Depart/Departure ",
       //最快运输时间
       fastestTransit:"Fastest transit time",
       // 最佳碳足迹
       bestCarbonfootpint:"Best carbon footpint",
       //航线方案，航线方案1
       routingSolutions:"Routing solutions, Solution One",
       //仅看最早出发
       earliestArrivalOnly:"Earliest arrival only",
       //仅看直达
       directOnly:"Direct only",
       //4条航线方案
       fourSolutions:"4 solutions, 2 solutions, 1 solution",
       // 4天
       fourDays:"4 Days",
       //抱歉，我们暂未查询到匹配的航线方案.
       noFindTips:"Sorry! No solution has been found for this query. We are currently not able to propose solutions within CMA CGM Group."
     },
     //routeDetails航线查询详情
     routeDetails:{
        //验证集装箱重量截止时间
        vgmCutOff:"VGM Cut-off",
        //港口截关时间
        portCutOff:"Port Cut-off",
        //本地航次
        localVoyageRef:"Local Voyage Ref.",
        //航次
        vouageRef:"Voyage Ref.",
        //转运
        transhipment:"Transshipment",
        // 起运港
        pol:"POL",
        // 卸货港
        pod:"POD",
     },
     //shipmentTracking货物追踪
     shipmentTracking:{
         // 运输详情
         trackingDetails:"Tracking details",
         // 订舱号 JXTLXXXXX
         bookingJxtl:"Booking JXTLXXXXX",
         // 重新搜索
         newSearch:"New search",
         // 预计到港时间
         eta:"ETA",
         // 集装箱号
         contianer:"Container (Ref.)",
         // 目的港预计靠泊时间
         etaBerthAtPod:"ETA Berth at POD",
         // 剩余航程
         remaining:"Remaining",
         // 导出pdf
         exportPdf:"Export PDF",
         // 空集装箱抵达堆场
         emptyToDepot:"Empty to Depot",
         // 空集装箱已交付托运人
         emptyToShipper:"Empty to Shipper",
         // 准备卸货
         readyToBeLoaded:"Ready to be Loaded",
         // 装船
         loadedOnBoard:"Loaded on Board",
         // 转运港卸货
         dischargedInTranshipment:"Discharged in Transhipment ",
         // 到达最终卸货港
         arrivalFinalPortOf:"Arrival Final Port of XX ",
         // 星期三
         wendnesday:"Wednesday",
         // 23-2月-2022
         date:"23-Feb-2022",
         // 未查询到相关结果
         noResult:"No results found",
         //最多可同时查询三个集装箱状态，请重新输入.
         threeContainers:"Maximum of three containers references can be filled out. Please amend your search criteria.",
         //号码无效，请检查格式。例如：ABCD1234567
         referencesIsNotValid:"Reference is not valid. Please check the format. Example: ABCD1234567",
         //集装箱暂未开始运输.
         containerCycle:"Container cycle not yet started.",
         //暂未查询到运输动态，或该集装箱已卸货/返回堆场。
         containerNotFount:"Container CMAU577XXX not found or already unstuffed or returned to the depot.",
     },
     load:{
       //努力加载中
       loading:"Loading ",
       //网络不给力,请稍后刷新
       networkIsNotWorking:"Network is not working, please click and refresh later",
       // 功能升级中,敬请期待
       functionIsUnderDevelopment:"Function is under development, stay tuned~ ",
       // 系统繁忙,请稍后重试
       systemIsBusyNow:"System is busy now, please try again later "
     }
  },

  //底部英文版工具栏，这里是用于自定义tarbar用的
  toolbar:{
      "list": [
      {
        "pagePath": "../Home/index",
        "text": "Home",
        "iconPath": "/assets/img/tabs/home.png",
        "selectedIconPath": "/assets/img/tabs/home-active.png"
      }, 
      {
        "pagePath": "../Query/index",
        "text": "Query",
        "iconPath": "/assets/img/tabs/message.png",
        "selectedIconPath": "/assets/img/tabs/message-active.png"
      },
      {
        "pagePath": "../Quotation/index",
        "text": "Quotation",
        "iconPath": "/assets/img/tabs/contact.png",
        "selectedIconPath": "/assets/img/tabs/contact-active.png"
      },
      {
        "pagePath": "../My/index",
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
