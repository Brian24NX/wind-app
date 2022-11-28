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
      required: 'Mandatory',
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
      qyg: 'Port of Loading',
      // 卸货港
      xhg: 'Port of Discharge',
      gCode: 'Name/Code',
      scheduleBtn: 'Search',
      advancedBtn: 'Advanced Search',
      //实时报价
      PRICE: 'PRICE',
      instantQuote: "Instant Quotation",
      //柜租费率
      DDCharges: "D&D Charges",
      //查询费率
      chargeFinder: "Charge Finder",
      // 发现更多
      more: 'More to Discover',
      // cmacgm
      cma: 'CMA CGM+ (VAS)',
      // 关于我们
      about: 'About CMA CGM',
      //新闻咨询
      news: "News Center",
      // 在线服务
      onlineServices: 'Online Service',
      //增值服务
      valueAddedService: "Customer Advisory",
      template: 'Template & Link',
      // 管制品
      gzp: 'Sanction Check',
      // 联系我们
      callMe: 'Contact Us'
    },
    khtg: {
      topTitle: 'Business & Operational Update',
      send: 'Send Email',
      keyword: 'Keyword'
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
      gzfl: 'D&D Prices',
      cxfl: 'Charge Finder',
      ddCharges: 'D&D Charges'
    },
    // 查询结果
    queryRes: {
      topTitle: 'Tracking Details',
      title: 'Tracking Details',
      placeholder: 'Container, Bill of lading or Booking Number',
      yuji: 'ETA Berth at POD',
      tingbo: 'Berth at POD',
      shengyu: 'Remaining',
      tian: 'Days',
      export: 'Export PDF',
      toEmail: 'Send to Email',
      huoguihao: 'Container (Ref.)',
      dingdans: 'Container (Ref.)',
      xiangxing: 'Equipment Type',
      location: 'Location',
      time: 'Time',
      chuanming: 'Vessel',
      chuanci: 'Voyage',
      noData: 'No results found',
      noDataDesc: 'Booking not found, not yet confirmed or container cycle not yet started'
    },
    //航线查询
    scheduleSearching: {
      //航线|获取船期
      getASchedule1: "Routes",
      getASchedule2: 'Get a schedule',
      //卸货港
      portOfDischarge: "Port of Discharge",
      //起运港
      protOfLoading: "Port of Loading",
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
      days: 'DAYS',
      day: 'DAY',
      // 转运
      zhuanyun: 'Transhipment',
      zhida: 'Direct',
      apply: 'Apply',
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
      transhipment: 'Transhipment',
      transhipments: 'Transhipments',
      zhida: 'Direct',
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
      dest: 'FPD',
      perTEU: 'per TEU'
    },
    // 常用模板与链接
    useful: {
      title: 'Template & Link',
      topTitle: 'Template & Link',
      title1: 'Useful',
      title2: ' Template & Link',
      keyword: 'Document or Link Name',
      template: 'Template',
      link: 'Link',
      copy: 'Copy',
      send: 'Send email'
    },
    // 管制品查询
    sanction: {
      title: 'Sanction Check',
      topTitle: 'Sanction\n Check',
      title1: 'Sanction',
      title2: ' Check',
      placeholder: 'Name or Ref. No.',
      commodity: 'Commodity',
      country: 'Country/Region',
      type: 'Type',
      code: 'Reference number',
      remind1: 'Enquiries of specific hazardous commodity UN#, ',
      remind2: 'please contact '
    },
    // 柜租费率
    guizufeilv: {
      navBarTitle: 'D&D Prices',
      topTitle: 'Demurrage &\n Detention Prices',
      selectTitle: 'Search Country/Region',
      send: 'Send email'
    },
    // 我的
    userCenter: {
      title: 'My Account',
      login: 'Login',
      myDashboard: 'My Dashboard',
      shipment: 'Shipment\nDashboard',
      document: 'Document\nDashboard',
      setting: 'Language Setting',
      legalTerms: 'Privacy Policy'
    },
    legalTerms: {
      title: 'Privacy Policy',
      title1: 'Privacy',
      title2: ' Policy'
    },
    // 基础信息
    baseInfo: {
      title: 'User Information',
      company: 'Company',
      ming: 'First name',
      xing: 'Last name',
      email: 'Email address',
      exit: 'Log out'
    },

    exit: {
      title: 'Confirm to exit the account',
      cancel: 'Cancel',
      sure: 'Logout'
    },
    // 设置语言
    setLanguage: {
      title: 'Language Setting'
    },
    // 文件概览
    document: {
      title: 'Document Dashboard',
      title1: 'Document',
      title2: ' Dashboard',
      placeholder: 'Booking or B/L Ref.',
      fileNo: 'Document Ref.',
      referenceNo: 'Shipment Ref.',
      type: 'Category',
      status: 'Status',
      date: 'Date',
      send: 'Send email',
      noData: 'No document available yet'
    },
    shipment: {
      title: 'Shipment Dashboard',
      title1: 'Shipment',
      title2: ' Dashboard',
      placeholder: 'Reference',
      shipment: 'Shipment View',
      et: "Arrival",
      eat: 'ETA',
      shipmentRef: 'Shipment Ref.',
      container: 'Container View',
      huoguihao: 'Container Ref.',
      xiangxing: 'Equipment Type',
      location: 'Location',
      time: 'Time',
      chuanming: 'Vessel',
      chuanci: 'Voyage',
      detailTitle: 'Shipment Detail',
      detailTitle1: 'Shipment',
      detailTitle2: ' Detail',
      detailContainer: 'Container',
      info: 'Info',
      document: 'Document',
      RECEIPT: 'RECEIPT',
      POL: 'POL',
      POD: 'POD',
      DELIVERY: 'DELIVERY',
      containers: 'Containers',
      TEU: 'Total TEU',
      weight: 'Cargo Weight',
      volume: 'Cargo Volume',
      Commodities: 'Commodities',
      Shipper: 'Shipper',
      Consignee: 'Consignee',
      noShipmentData: 'No shipment found',
      noContainersData: 'No container attributed yet'
    },
    // 查询费率
    chargeFinder: {
      title: 'Charge Finder',
      title1: 'Charge',
      title2: ' Finder',
      //卸货港
      portOfDischarge: "Port of Discharge",
      //起运港
      protOfLoading: "Port of Loading",
      //港口名称/代码
      name: "Name/code",
      type: 'Mode',
      dryNoR: 'Dry & NOR',
      reefer: 'Reefer',
      date: 'Simulation Date',
      search: 'Search',
      detailTitle: 'Charge Detail',
      main: 'Main Charges',
      other: 'Other Charges',
      noChargeData: 'No data found'
    },
    // D&D Charges
    DDCharges: {
      title: 'D&D Charges',
      title1: 'D&D ',
      title2: 'Charges',
      //卸货港
      portOfDischarge: "Port of Discharge",
      //起运港
      protOfLoading: "Port of Loading",
      //港口名称/代码
      name: "Name/code",
      type: 'Equipment Size',
      specialCargo: "Special Cargo",
      refrigerated: 'Refrigerated',
      hazardous: 'Hazardous',
      oversized: 'Oversized',
      search: 'Search',
      detailTitle: 'D&D Charges',
      import: 'Import',
      export: 'Export',
      noChargeData: 'No data found'
    },
    // 报价
    quotation: {
      //航线|获取船期
      getASchedule1: "Instant ",
      getASchedule2: 'Quote',
      type1: 'Instant Quote',
      type2: 'My Contracts',
      placeOfOrigin: "Place of Receipt",
      addPlaceOfOrigin: "Add a Place of Receipt",
      //起运港
      protOfLoading: "Port of Loading",
      //卸货港
      portOfDischarge: "Port of Discharge",
      placeOfDelivery: "Place of Delivery",
      addPlaceOfDelivery: 'Add a Place of Delivery',
      //港口名称/代码
      name: "Name/Code",
      //离港时间
      departure: "Vessel departure from",
      equipmentType: 'Equipment Type',
      weight: 'Net Weight(KGM)',
      weightName: 'EX.10 000 kgm',
      container: 'Number of container(s)',
      commodity: "Commodity",
      namedAccount: 'Named Account (if you have)',
      //查询
      search: "Get My Quote",
      search2: 'Search',
      reset: 'Reset',
      partners: 'Partner(s) linked to your web account'
    },
    // 报价详情
    qutationResult: {
      noOffer: 'No offer currently available',
      spotOut: 'Spot allocation sold out',
      container: 'CONTAINER',
      title: 'Instant Quote',
      title2: 'Instant Quote',
      select: 'Select',
      days: 'DAYS',
      day: 'DAY',
      // 转运
      zhuanyun: 'Transhipment',
      zhuanyuns: 'Transhipments',
      zhida: 'Direct',
      perRate: 'Rate per Container',
      totalPer: 'Total per Container',
      oceanFeight: 'Ocean Freight',
      perFeight: 'Charges payable as per freight',
      prepaid: 'Charges payable at export (prepaid)',
      collect: 'Charges payable at import (Collect)',
      perBL: 'Rate per B/L',
      totalBL: 'Total per B/L',
      forContainer1: 'For ',
      forContainer2: ' container(s)',
      saveQuotation: 'Save quote to book',
      apply: 'Apply',
      //排序
      sortBy: "Sort by",
      //最快离港
      earliestDeparture: "EARLIEST DEPARTURE",
      //最快到港
      earliestArrival: "EARLIEST ARRIVAL",
      // 最快运输时间
      earliestTime: 'BEST TRANSIT TIME',
      price: 'PRICE',
      spotOn: 'SPOTON',
      //离港
      depart: "Depart/Departure ",
      //航线方案，航线方案1
      routingSolutions: "Routing\nsolutions",
      //仅看最早到达
      earliestArrivalOnly: "Earliest\n arrival only",
      //仅看直达
      directOnly: "Direct\nonly",
      //抱歉！未找到此问题的解决方案,在CMA CGM集团内目前暂未能提供处理方案.
      noFindQuteTips1: "Sorry! No matching records found.",
      noUsFindQuteTips1: 'We apologize. We are currently not able to propose online offer for your request on FMC scope. Our team is consistently proposing new solutions to fit your needs. Please modify your search.',
      noFindTips1: "Sorry! No matching records found.",
      modifySearch: 'Modify Search',
      equipmentType: 'Equipment Type',
      weight: 'Net Weight（KGM）',
      containers: 'Number of container(s)',
      Commodity: 'Commodity',
      title3: 'My Contracts',
      title4: 'Contract Detail',
      book: 'Book Now',
      localCharge: 'Local Charges',
      DDSM: 'D&D',
      SpotOn: 'SpotOn',
      addInfo: 'Add Info',
      localChargeDetail: 'More details about local charges:',
      exportLocalCharge: 'Export local charges',
      importLocalCharge: 'Import local charges',
      copy: 'Copy',
      exportFreeTime: 'Export free time',
      importFreeTime: 'Import free time',
      spotOnDetail: 'SpotOn - Specific Conditions',
      consult: 'Consult detailed spotOn terms & conditions',
      additionalInformation: 'Additional Information',
      quotation: 'Quotation',
      valid: 'VALID',
      expired: 'EXPIRED',
      coming: 'COMING',
      allInRate: 'ALL IN RATE',
      reference: 'Reference',
      chargeDetails: 'Charge Details',
      quoteDetails: 'Quote Details',
      totalPerContainer: 'Total containers',
      validity: 'Validity',
      validityFrom: 'From',
      validityTo: 'To',
      comments: 'Comments',
      commoditys: 'Commodity',
      incluedLabel: 'Included charges: ',
      import: 'Import',
      export: 'Export',
      movementType: 'Movement Type',
      bookPreCarriage: 'Booking Pre Carriage',
      bookOnCarriage: 'Booking on Carriage',
      usContract: 'US Contract',
      amendment: 'Amendment',
      governingTariff: 'Governing Tariff',
      trade: 'Trade',
      bulletCode: 'Bullet Code',
      HAZ: 'HAZ',
      OOG: 'OOG',
      SOC: 'SOC',
      NOR: 'NOR',
      additionalAttributes: 'Additional Attributes',
      socLabel: 'Shipper Owned Container (SOC)',
      hazLabel: 'Hazardous Cargo',
      oogLabel: 'Out Of Gauge (OOG)',
      overDimensions: 'Over Dimensions',
      norLabel: 'Non-Operating Reefer (NOR)',
      reeferLabel: 'Reefer Container',
      temperature: 'Temperature',
      ventilation: 'Ventilation',
      namedAccounts: 'Named Account',
      weightAndDimensions: 'Weight and Dimensions',
      perContainer: 'per container',
      maxWeight: 'Max Weight per container',
      length: 'Length',
      allowed: 'Allowed',
      refused: 'Refused',
      referenceSuccess1: 'Your offer ',
      referenceSuccess2: ' has been successfully created',
      copyReference: 'Please copy the reference code for check before booking',
      backHome: 'Back to Home',
      bookNow: 'Book Now',
      nearPortInstantQuote: 'Instant quote on nearby ports',
      clickCard: 'Please find nearby ports combinations for which you can obtain an instant quotation. Click on a card to see the offer.',
      fewContainer: 'Few containers available',
      ferContainerDesc1: 'You have requested ',
      ferContainerDesc2: ' container(s) but only ',
      ferContainerDesc3: ' are remaining for this departure.',
      continue: 'Do you want to continue?',
      continueBtn: 'Continue',
      chooseOther: 'Choose another route',
      containerRemind: 'container(s) remaining',
      exportPDF: 'Export PDF',
      contractDetail: 'Detail',
      currentVaild: 'Current valid offers',
      additionalResults: 'Additional results close to your search',
      placeOfOrigin: "Place of Receipt",
      placeOfDelivery: "Place of Delivery",
      transType: 'Transportation Mode',
      comingSoon: 'ADDITIONAL SERVICES FUNCTION COMING SOON',
      bookInWeb: 'Please add additional services during booking on eCommerce website for now',
      back: 'Back',
      next: 'Next',
      total: 'TOTAL'
    },
    vas: {
      containers: 'Container',
      perBL: 'BL',
      warningRemind: 'This service is subject to the agent validation after booking submission.',
      additionalServicesChoosed: 'Subscribed Services',
      noChoosedAdditionalServices: 'No services subscribed yet. Please discover additional services available for your quote.',
      additionalServices: 'Additional Services',
      additionalServicesDesc: 'Protect your cargo | Expand your business | Act towards carbon neutrality',
      send: 'Send to Email',
      subscribe: 'Subscribe',
      calculate: 'Calculate',
      agree: 'I agree with',
      terms: 'Terms an Conditions',
      include: 'INCLUDED IN OFFER',
      createFail: 'Failed to create quotation, please contact your agent'
    },
    // 我的报价
    myContract: {
      title: 'My Contracts',
      getASchedule1: "My ",
      getASchedule2: 'Contracts',
      placeOfOrigin: "Place of Receipt",
      addPlaceOfOrigin: "Add a Place of Receipt",
      //起运港
      protOfLoading: "Port of Loading",
      //卸货港
      portOfDischarge: "Port of Discharge",
      placeOfDelivery: "Place of Delivery",
      addPlaceOfDelivery: 'Add a Place of Delivery',
      //港口名称/代码
      name: "Name/Code",
      //离港时间
      departure: "Vessel departure from",
      equipmentType: 'Equipment Type',
      ST: 'Dry',
      RF: 'Reefer',
      SP: 'Special',
      //查询
      search: "Search",
      reset: 'Reset'
    },
    popupBtn: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    copyInfo: {
      success: 'Successfully copied, please view in browser.',
      success2: 'Successfully copied.'
    },
    load: {
      //努力加载中
      loading: "Loading...",
      //网络不给力,请稍后刷新
      networkIsNotWorking: "Network unstable, please try later",
      // 功能升级中,敬请期待
      functionIsUnderDevelopment: "Function coming soon, stay tuned",
      chaoshi: 'Request timeout, please try later',
      accessDenied: 'Access Denied',
      noPermission: 'Sorry, you do not have sufficient privileges to access this page',
      // 系统繁忙,请稍后重试
      systemIsBusyNow: "System is busy, please try later",
      // 暂无更多数据
      noMoreData: 'No more data available',
      // 发送中
      send: 'Sending...',
      sendSuccess: 'Email sent successfully',
      noLogin: 'Login failed or invalid. Please log in again',
      notFound: 'This file is not available, please contact your agent',
      toLogin: 'Login',
      exit: 'Exiting...',
      waitData: 'The data is being prepared, please try again later'
    },
    email: {
      title: 'Email Address',
      placeholder: 'Email Address',
      exprise: 'Please enter the correct email address',
      send: 'Send'
    },
    preview: {
      disPreview: 'Preview not available, please send to email'
    },
    legalTermsRemind: {
      title: 'Privacy Policy',
      desc1: 'Dear customer, before you continue to experience CMA CGM Mini-Program, please read ',
      desc2: 'CMA CGM WeChat Mini-Program Privacy Policy ',
      desc3: 'carefully.',
      desc4: 'If you agree to our policy, please click "Agree" to continue.',
      allow: 'Agree',
      refuse: 'Disagree'
    }
  },

  //底部英文版工具栏，这里是用于自定义tarbar用的
  toolbar: {
    "list": [{
        "pagePath": "/pages/Home/index",
        "text": "Home",
        "iconPath": "/assets/img/tabs/home.png",
        "selectedIconPath": "/assets/img/tabs/home_selected.png"
      },
      {
        "pagePath": "/pages/Query/index",
        "text": "Query",
        "iconPath": "/assets/img/tabs/query.png",
        "selectedIconPath": "/assets/img/tabs/query_selected.png"
      },
      {
        "pagePath": "/pages/Quotation/Search/index",
        "text": "Quotation",
        "iconPath": "/assets/img/tabs/price.png",
        "selectedIconPath": "/assets/img/tabs/price_selected.png"
      },
      {
        "pagePath": "/pages/My/index",
        "text": "Me",
        "iconPath": "/assets/img/tabs/mine.png",
        "selectedIconPath": "/assets/img/tabs/mine_selected.png"
      }
    ]
  }
}

module.exports = {
  lang: Languague
}