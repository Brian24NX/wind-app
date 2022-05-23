/**
 *  author:Jason
 *  time:2022-03-15 17:56:03
 *  desc:国际化英文语言包
 */
var Languague = {
  // 页面
  page: {
    //中英文切换按钮
    changeLanguage: "Whether to switch to Chinese",
    sure: 'YES',
    cancel: 'No',
    langue: 'en',
    // 校验
    verifyInfo: {
      // 必填
      required: 'This parameter is required',
      // 格式无效
      gswx: 'Invalid number, please check format',
      more3: 'Maximum three container states, please re-enter',
      chongfu: 'Duplicate number, please check and enter',
      input: 'Input',
      select: 'Select'
    },
    // 星期
    weeks: {
      week1: "Mon",
      week2: "Tue",
      week3: "Wed",
      week4: "Thur",
      week5: "Fri",
      week6: "Sat",
      week0: "Sun",
      weeks1: "Monday",
      weeks2: "Tuesday",
      weeks3: "Wednesday",
      weeks4: "Thursday",
      weeks5: "Friday",
      weeks6: "Saturday",
      weeks0: "Sunday",
    },
    empty: {
      description: 'No relevant information',
    },
    // 首页
    homeInfo: {
      //页面标题
      hometitle: "CMA CGM",
      // 获取追踪
      TRACKING: 'TRACKING',
      chuanqi1: 'SHIPMENT',
      chuanqi2: ' TRACKING',
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
      about: 'About CMA CGM',
      //新闻咨询
      news: "News Center",
      // 在线服务
      onlineServices: 'Online Services',
      //增值服务
      valueAddedService: "Customer Advisory",
      template: 'Useful Template and Link',
      // 管制品
      gzp: 'Sanction Check',
      // 联系我们
      callMe: 'Contact Us'
    },
    khtg: {
      topTitle: 'Business & Operational Update',
      send: 'Send Email'
    },
    newsCenter: {
      title: 'News Center',
      topTitle: 'News Center',
      keyword: 'Keyword'
    },
    callMe: {
      topTitle: 'I HAVE A QUESTION',
      bsc: 'Choose a local office you need to be in contact with',
      businessType: 'What kind of business you want to inquire about?',
      tigong: 'Do you have the booking reference information to provide?',
      yes: 'YES',
      no: 'NO',
      dingdan: 'Booking reference',
      hangxian: 'What trade or cargo you want to inquire about?',
      accountName: 'Please input your account name',
      submitBtn: 'Submit and Obtain Contact Information',
      noOrder: 'Unable to find the relevant booking number, please provide more information'
    },
    callMeResult: {
      title: 'Contact Us',
      fuwu: 'Customer Service',
      phone: 'Phone',
      email: 'Email Address',
      noContact: 'No relevant contact information,\n please amend your searching criteria.'
    },
    // 查询
    queryInfo: {
      dingcang: 'Place Booking',
      chuanqi: 'Routing Finder',
      huowu: 'Shipment Tracking',
      gzp: 'Sanction Check',
      gzfl: 'D&D Rate',
      cxfl: 'Charge Finder'
    },
    // 查询结果
    queryRes: {
      topTitle: 'query',
      title: 'Tracking Details',
      placeholder: 'Container, Bill of lading or Booking Number',
      yuji: 'ETA Berth at POD',
      tingbo: 'Berth at POD',
      shengyu: 'Remaining',
      tian: 'Days',
      export: 'Export PDF',
      toEmail: 'Sand to Email',
      huoguihao: 'Container (Ref.)',
      dingdans: 'Container (Ref.)',
      xiangxing: 'Equipment Type',
      location: 'Location',
      time: 'Time',
      chuanming: 'Vessel',
      chuanci: 'Voyage',
      noData: 'No results found',
      noDataDesc: 'Booking not found,not yet confirmed or container cycle not yet started'
    },
    //航线查询
    scheduleSearching: {
      //航线|获取船期
      getASchedule1: "Routes",
      getASchedule2: 'Get a schedule',
      //卸货港
      portOfDischarge: "Port of Discharge, POD",
      //起运港
      protOfLanding: "Port of Loading, POL",
      //港口名称/代码
      name: "Name/Code",
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
      //查询历史
      history: "History"
    },
    //航线查询结果列表
    searchResultList: {
      // 标题
      title: 'Schedule Results',
      fangan1: 'solution',
      fangan2: 'solutions',
      //日历
      calendar: "Calendar",
      // 未来一星期
      future1: '1 Week',
      // 未来二星期
      future2: '2 Weeks',
      // 未来一星期
      future3: '3 Weeks',
      // 未来一星期
      future4: '4 Weeks',
      days: 'days',
      day: 'day',
      // 转运
      zhuanyun: 'transhipment',
      apply: 'apply',
      //排序
      sortBy: "Sort by",
      //最快离港
      earliestDeparture: "EARLIEST DEPARTURE",
      //最快到港
      earliestArrival: "EARLIEST ARRIVAL",
      // 最快运输时间
      earliestTime: 'EARLIEST TRANSPORTATION TIME',
      //离港
      depart: "Depart/Departure ",
      //航线方案，航线方案1
      routingSolutions: "Routing\nsolutions",
      //仅看最早到达
      earliestArrivalOnly: "Earliest\n arrival only",
      //仅看直达
      directOnly: "Direct\nonly",
      //抱歉！未找到此问题的解决方案,在CMA CGM集团内目前暂未能提供处理方案.
      noFindTips1: "Sorry! No solution has been found for this query.",
      noFindTips2: "We are currently not able to propose solutions within CMA CGM Group."
    },
    //routeDetails航线查询详情
    routeDetails: {
      title: 'Route Detail',
      day: 'DAY',
      days: 'DAYS',
      transhipment: 'transhipment',
      transhipments: 'transhipments',
      // 船名
      vessel: 'Vessel',
      // 航线方案
      service: 'Service',
      //验证集装箱重量截止时间
      vgmCutOff: "VGM Cut-off",
      //港口截关时间
      portCutOff: "Port Cut-off",
      //本地航次
      localVoyageRef: "Local Voyage Ref.",
      //航次
      vouageRef: "Voyage Ref.",
      // 起运港
      pol: "POL",
      // 卸货港
      pod: "POD",
      // 始发地
      coc: 'POO',
      // 最终目的地
      dest: 'DEST'
    },
    // 常用模板与链接
    useful: {
      title: 'Useful Template & Link',
      title1: 'Useful',
      title2: ' Template & Link',
      keyword: 'Search Document or Link Name',
      template: 'Template',
      link: 'Link',
      copy: 'Copy',
      send: 'Send email'
    },
    // 管制品查询
    sanction: {
      title: 'Sanction Check',
      title1: 'Sanction',
      title2: ' Check',
      placeholder: 'Name or Ref. No.',
      type: 'Type',
      code: 'Reference number'
    },
    // 我的
    userCenter: {
      title: 'My Account',
      login: 'Login',
      myDashboard: 'My Dashboard',
      shipment: 'Shipment\nDashboard',
      setting: 'Document\nDashboard'
    },
    popupBtn: {
      confirm: 'confirm',
      cancel: 'cancel'
    },
    copyInfo: {
      success: 'Successfully copied, please open the link in your browser.'
    },
    load: {
      //努力加载中
      loading: "Loading...",
      //网络不给力,请稍后刷新
      networkIsNotWorking: "Network is not working, please click and refresh later",
      // 功能升级中,敬请期待
      functionIsUnderDevelopment: "Function is under development, stay tuned~ ",
      chaoshi: 'Request timeout, please try again later',
      // 系统繁忙,请稍后重试
      systemIsBusyNow: "System is busy now, please try again later ",
      // 暂无更多数据
      noMoreData: 'No more data available',
      // 发送中
      send: 'Sending...',
      sendSuccess: 'Send successfully, please go to mailbox to check'
    },
    email: {
      title: 'Recipient Email Address',
      placeholder: 'Email Address',
      exprise: 'Please enter the correct email address',
      send: 'Send'
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