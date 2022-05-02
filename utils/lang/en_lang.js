/**
 *  author:Jason
 *  time:2022-03-15 17:56:03
 *  desc:国际化英文语言包
 */
var Languague = {
  // 页面
  page: {
    //中英文切换按钮
    changeLanguage: "change to Chinese",
    //个人信息
    userInfo: {
      title: "personal information",
      content: {}
    },
    //联系我们
    contactUs: {
      title: "contact us",
      content: {}
    },
    langue: 'en',
    querytitle: "Query",
    quotationtitle: "Quotation",
    mytitle: "My Account",
    verifyInfo: {
      // 必填
      required: 'This parameter is required',
      // 格式无效
      gswx: 'Invalid number, please check format',
      more3: 'Maximum three container states, please re-enter',
      chongfu: 'Duplicate number, please check and enter'
    },
    homeInfo: {
      //页面标题
      hometitle: "CAM CGM",
      // 获取追踪
      TRACKING: 'TRACKING',
      // 提示
      goodsRemind: 'Container, Bill of lading or Booking Number',
      //货物追踪按钮
      goods: "Search",
      //提示
      tips: "To track up to three containers, please enter references separated by a comma.",
      //船期查询
      SCHEDULE: "SCHEDULE",
      // 起运港
      qyg: 'Place of Loading',
      // 卸货港
      xhg: 'Port of Discharge',
      gCode: 'Name/Code',
      scheduleBtn: 'Search',
      advancedBtn: 'Advanced Search',
      //实时报价
      PRICE: 'PRICE',
      instantQuote: "Instant Quote",
      //柜租费率
      ddRate: "D&D Rate",
      //查询费率
      chargeFinder: "Charge Finder",
      // 发现更多
      more: 'More to Discover',
      // cmacgm
      cma: 'CMA CGM+',
      // 关于我们
      about: 'About US',
      //新闻咨询
      news: "News",
      // 在线服务
      onlineServices: 'Online Services',
      //增值服务
      valueAddedService: "Value Added Service",
      template: 'Useful Template and Link',
      // 管制品
      gzp: 'Sanctions and Commodity',
      // 联系我们
      callMe: 'call me'
    },
    //航线查询
    scheduleSearching: {
      //航线|获取船期
      getASchedule: "Routes | Get a schedule",
      //卸货港
      portOfDischarge: "Port of Discharge, POD",
      //起运港
      protOfLanding: "Port of Loading, POL",
      //港口名称/代码
      name: "Name/Code",
      //此项为必填项
      theFieldIsMandatory: "The field is mandatory",
      //格式无效
      formatIsInvalid: "Format is invalid",
      //查询
      searchOn: "Search on",
      //离港时间
      departure: "(Search on) Departure",
      //到港时间
      arrival: "(Search on) Arrival",
      //日期
      date: "Date",
      //未来
      next: "Next",
      //查询
      search: "Search",
      //1 星期
      oneWeek: "1 Week",
      //2 星期
      twoWeek: "2 Weeks",
      //3 星期
      threeWeek: "3 Weeks",
      //4 星期
      fourWeek: "4 Weeks",
      //查询历史
      history: "History"
    },
    //航线查询结果列表
    searchResultList: {
      //日历
      calendar: "Calendar",
      //星期一
      mon: "Mon",
      //星期二
      tue: "Tue",
      //星期三
      wed: "Wed",
      //星期四
      thur: "Thur",
      //星期五
      fri: "Fri",
      //星期六
      sat: "Sat",
      //星期日
      sun: "Sun",
      //排序
      sortBy: "Sort by",
      //最快离港
      earliestDeparture: "Earliest Departure",
      //最快到港
      earliestArrival: "Earliest Arrival",
      //离港
      depart: "Depart/Departure ",
      //最快运输时间
      fastestTransit: "Fastest transit time",
      // 最佳碳足迹
      bestCarbonfootpint: "Best carbon footpint",
      //航线方案，航线方案1
      routingSolutions: "Routing solutions, Solution One",
      //仅看最早出发
      earliestArrivalOnly: "Earliest arrival only",
      //仅看直达
      directOnly: "Direct only",
      //4条航线方案
      fourSolutions: "4 solutions, 2 solutions, 1 solution",
      // 4天
      fourDays: "4 Days",
      //抱歉！未找到此问题的解决方案,在CMA CGM集团内目前暂未能提供处理方案.
      noFindTips: "Sorry! No solution has been found for this query. We are currently not able to propose solutions within CMA CGM Group."
    },
    //routeDetails航线查询详情
    routeDetails: {
      //验证集装箱重量截止时间
      vgmCutOff: "VGM Cut-off",
      //港口截关时间
      portCutOff: "Port Cut-off",
      //本地航次
      localVoyageRef: "Local Voyage Ref.",
      //航次
      vouageRef: "Voyage Ref.",
      //转运
      transhipment: "Transshipment",
      // 起运港
      pol: "POL",
      // 卸货港
      pod: "POD",
    },
    //shipmentTracking货物追踪
    shipmentTracking: {
      // 运输详情
      trackingDetails: "Tracking details",
      // 订舱号 JXTLXXXXX
      bookingJxtl: "Booking JXTLXXXXX",
      // 重新搜索
      newSearch: "New search",
      // 预计到港时间
      eta: "ETA",
      // 集装箱号
      contianer: "Container (Ref.)",
      // 目的港预计靠泊时间
      etaBerthAtPod: "ETA Berth at POD",
      // 剩余航程
      remaining: "Remaining",
      // 导出pdf
      exportPdf: "Export PDF",
      // 空集装箱抵达堆场
      emptyToDepot: "Empty to Depot",
      // 空集装箱已交付托运人
      emptyToShipper: "Empty to Shipper",
      // 准备卸货
      readyToBeLoaded: "Ready to be Loaded",
      // 装船
      loadedOnBoard: "Loaded on Board",
      // 转运港卸货
      dischargedInTranshipment: "Discharged in Transhipment ",
      // 到达最终卸货港
      arrivalFinalPortOf: "Arrival Final Port of XX ",
      // 星期三
      wendnesday: "Wednesday",
      // 23-2月-2022
      date: "23-Feb-2022",
      // 集装箱正柜在托运人处
      containertoconsignee: "Container to Consignee",
      // 未查询到相关结果
      noResult: "No results found",
      //最多可同时查询三个集装箱状态，请重新输入.
      threeContainers: "Maximum of three containers references can be filled out. Please amend your search criteria.",
      //号码无效，请检查格式。例如：ABCD1234567
      referencesIsNotValid: "Reference is not valid. Please check the format. Example: ABCD1234567",
      //集装箱暂未开始运输.
      containerCycle: "Container cycle not yet started.",
      //暂未查询到运输动态，或该集装箱已卸货/返回堆场。
      containerNotFount: "Container CMAU577XXX not found or already unstuffed or returned to the depot.",
    },
    load: {
      //努力加载中
      loading: "Loading ",
      //网络不给力,请稍后刷新
      networkIsNotWorking: "Network is not working, please click and refresh later",
      // 功能升级中,敬请期待
      functionIsUnderDevelopment: "Function is under development, stay tuned~ ",
      // 系统繁忙,请稍后重试
      systemIsBusyNow: "System is busy now, please try again later "
    }
  },

  //底部英文版工具栏，这里是用于自定义tarbar用的
  toolbar: {
    "list": [{
        "pagePath": "../Home/index",
        "text": "Home",
        "iconPath": "/assets/img/tabs/home.png",
        "selectedIconPath": "/assets/img/tabs/home_selected.png"
      },
      {
        "pagePath": "../Query/index",
        "text": "Query",
        "iconPath": "/assets/img/tabs/query.png",
        "selectedIconPath": "/assets/img/tabs/query_selected.png"
      },
      {
        "pagePath": "../Quotation/index",
        "text": "Quotation",
        "iconPath": "/assets/img/tabs/price.png",
        "selectedIconPath": "/assets/img/tabs/price_selected.png"
      },
      {
        "pagePath": "../My/index",
        "text": "My Account",
        "iconPath": "/assets/img/tabs/mine.png",
        "selectedIconPath": "/assets/img/tabs/mine_selected.png"
      }
    ]
  }
}

module.exports = {
  lang: Languague
}