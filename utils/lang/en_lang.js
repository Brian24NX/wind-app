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
      dcgswx: 'Invalid shipment ref, please check format',
      more3: 'Maximum three container status, please re-enter',
      chongfu: 'Duplicate number, please check and enter',
      only: 'Please enter either one Booking reference or Multiple Container Reference',
      input: 'Input',
      select: 'Select',
      alarm:'Container is not linked to the current logged in carrier'
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
      TRACKING1: 'Tracking',
      chuanqi1: 'Shipment',
      chuanqi2: ' Tracking',
      // 提示
      goodsRemind: 'Container, Bill of lading or Booking Number',
      //货物追踪按钮
      goods: "Search",
      //提示
      tips: "Please enter a unique reference before launching your search, system will automatically recognise the type of value.",
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
      instantQuote: "SpotOn",
      //柜租费率
      DDCharges: "D&D Charges",
      //查询费率
      chargeFinder: "Charge Finder",
      guizu: 'D&D Prices',
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
      template: 'Template\n &\u00A0Link',
      // 管制品
      gzp: 'Cargo Restriction',
      // 联系我们
      callMe: 'Contact Us',
      tariff: 'Tariff Book'
    },
    khtg: {
      topTitle: 'Business & Operational Update',
      send: 'Send email',
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
      gzp: 'Cargo Restriction',
      gzfl: 'D&D Prices\n(Standard)',
      cxfl: 'Charge Finder',
      ddCharges: 'D&D Charges\n(Simulation)'
    },
    // 查询结果
    queryRes: {
      topTitle: 'Tracking Details',
      title: 'Tracking Details',
      placeholder: 'Container, B/L or Booking No.',
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
      notFound: 'Not found or already unstuffed or returned to the depot.',
      noDataDesc: 'Booking not found, not yet confirmed or container cycle not yet started'
    },
    //航线查询
    scheduleSearching: {
      //航线|获取船期
      getASchedule1: "Routes",
      getASchedule2: 'Get A Schedule',
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
      title: 'Cargo Restriction',
      topTitle: 'Cargo\n Restriction',
      title1: 'Cargo',
      title2: ' Restriction',
      placeholder: 'Name or Ref. No.',
      commodity: 'Cargo Restriction',
      country: 'Country/Region',
      type: 'Type',
      code: 'Reference Number',
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
    tariffBook : {
      navBarTitle: 'Tariff Book',
      topTitle: 'Tariff Book',
      selectTitle: 'Search Country/Region',
      send: 'Send email'
    },
    DDP: {
      title1: 'Demurrage &',
      title2: 'Detention Price',
      ddDocument: 'Tariff Book',
      ddPrice: 'D&D Price'
    },
    // 我的
    userCenter: {
      title: 'My Account',
      login: 'Login',
      myDashboard: 'My Dashboards',
      shipment: 'Shipment\nDashboard',
      document: 'Document\nDashboard',
      seaReward: 'Sea Reward\nDashboard',
      setting: 'Language Setting',
      legalTerms: 'Privacy Policy',
      notifications: 'Manage My Notifications',
      noAccount: "You don't have an account?",
      siteName: 'CMA CGM official website',
      visitSite1: 'Please visit ',
      visitSite2: ' to register an account.',
      refusedText: 'Please agree to phone number authorization before login',
      refusedTitle: 'Info',
      refusedButton: 'Ok'
    },
    //sea reward
    seaReward:{
      seaRewardTitle: 'What is Sea Reward?',
      activate: 'Discover SpotOn loyalty program!',
      dashboard: 'Sea Reward Dashboard',
      seaRewardInformation: 'Sea Reward Information',
      seaRewardIntro: 'CMA CGM loyalty program dedicated to SpotOn. Get rewarded every time you ship with us!',
      Lieutenant: 'Lieutenant',
      LieutenantText1:'Earn 2 Nautical Miles for every 100$ spent',
      LieutenantText2: 'To reach the Captain level, you need to book at least 1 TEU for 20 weeks out of 26',
      LieutenantBenefits: 'Earn 2 Nautical Miles for 100 dollars spent', 
      Captain: 'Captain',
      CaptainText1:'Booked at least 1 TEU for 20 weeks',
      CaptainText2:'Earn 4 Nautical Miles for every 100$ spent',
      Master: 'Master',
      MasterText1: 'Booked at least 15 TEU for 20 weeks',
      MasterText2:'Earn 6 Nautical Miles for every 100$ spent',
      MasterBenefits: 'Earn 6 Nautical Miles for 100 dollars spent',
      Admiral: 'Admiral',
      AdmiralText1: 'Booked at least 100 TEU for 20 weeks',
      AdmiralText2:'Earn 8 Nautical Miles for every 100$ spent',
      Howtogetthere: 'How to get there',
      NauticalMilesFocus: 'My Nautical Miles',
      NauticalMilesCycle: 'My Nautical Miles Cycle',
      RankFocus: 'My Rank',
      Howtogetthere1:'Earn Nautical Miles',
      CaptainGetThere1:'Nautical miles are the currency of the Sea Reward program.\n' +
          'You earn nautical miles based on the amount you pay.' +
          ' 3 easy steps to earn miles: Quote on SpotOn, Book & Pay.',
      benefits1:'Use Nautical Miles',
      CaptainBenefits1:'You can use your earned nautical miles as discount on SpotOn.\n' +
          '\n' +
          'You decide when you want to save money.\n' +
          '\n' +
          '3 easy steps to use miles: Decide to use when quoting on SpotOn, Book & Pay.',
      Howtogetthere2:'Get a Quote, Book, Pay and Be Rewarded',
      MasterGetThere2:'Being rewarded for every booking you make on SpotOn has never been easier. A new way to reward each and every one of you, no matter what type of container or cargo you carry. Four simple steps: get a quote, book, pay and be rewarded.',
      Howtogetthere3:'Elevate Your Rank to Access More Rewards',
      AdmiralGetThere3:'The regularity of your SpotOn bookings defines your rank.\n' +
          '\n' +
          'Each quarter, your rank is defined based on your regularity the 6 previous months (26 weeks).',
      benefits: 'Benefits',
      seaRewardDiscover: 'Discover your Sea',
      seaRewardDiscover2: 'Reward dashboard',
      mySeaReward: 'Sea Reward',
      nauticalMiles: 'Start earning',
      nauticalMiles2: 'Nautical Miles',
      getAQuote: 'SpotOn',
      save1: 'Use ',
      save2: 'Nmiles to save ',
      usd: 'USD',
      earned: 'Earn up to ',
      earnedEdn:' Nautical Miles',
      fortext:' for ',
      xiangzi:' containers',
      status: 'Your Rank: ',
      available: 'Nautical Miles Available',
      usdSaved: '',
      description: 'As a Captain you earn 2 Nautical Miles for every 100＄ spent on Spoton quotes. Nautical Miles are earned once the invoice is paied.',
      rewardResult1: 'Potentially earned ',
      rewardResult2: ' Nautical Miles',
      resultInfo: 'Points will be effectively accumulated after payment of the invoice'
    },
    seaRewardFAQ:{
      title: 'Sea Reward FAQ'
    },
    //sea reward dashboard
    seaRewardDashboard: {
      noData: 'No results found',
      title: 'Sea Reward Dashboard',
      transaction: 'Transaction Journal',
      uo: 'Parent Company:',
      bp: 'Company:',
      bp1:'Parent Company:',
      nextDate: 'Next update:',
      all: 'ALL',
      earnings: ' EARNED',
      burns: ' USED',
      quatedate: 'Quotation Date',
      bookRef:'Booking Ref.',
      next: 'Next level: ',
      available: ' Nautical Miles Available',
      saved: ' USD Saved',
      virtroles: 'CENTRIMEX-Virtroles',
      spotOn: 'On SpotOn Bookings',
      Lieutenant:'Sorry, the benefit to use Nautical Miles is available starting Captain rank and above.',
      Lieutenanttext:'Get an instant quote now to level up!',
      desc1: 'Reward: ',
      desc2: 'Earn ',
      desc3: ' Nautical Miles for every 100$ spent',
      nauticalMiles : 'Nautical Miles',
      placeholder: 'Quotation Ref. / Booking Ref. / Invoice Ref.',
      raisedDate: 'Raised Date',
      quotRef: 'Quotation Ref.',
      invoiceRef: 'Invoice Ref.',
      nauticalMiles2: 'Nautical Miles',
      faq: 'Sea Reward FAQ',
      use: 'Use Rewards',
      nodata: "Haven't experienced Sea Reward yet?",
      getQuot: 'Get an instant quote now!',
      detail: {
        status: 'My Status',
        next: 'Next Level',
        conditions: 'Conditions',
        benefits: 'Benefits',
      }
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
      ming: 'First Name',
      xing: 'Last Name',
      email: 'Email Address',
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
      titlenew: 'D&D Prices',
      title3: 'Prices',
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
      detailTitle: 'D&D Prices',
      import: 'Import',
      export: 'Export',
      noChargeData: 'No data found'
    },
    // new D&D Charges
    NewDDCharges: {
      title: 'D&D Charges',
      title1: 'D&D',
      title2: 'Charges',
      //运输编号
      byShipment: 'By Shipment Ref.',
      //集装箱号
      byContainer: 'By Container No.',
      shipment: 'Shipment Ref.',
      // 集装箱
      container: 'Container(s)',
      allContainer: 'All Containers',
      containerNo: 'Container Number',
      // 费用计算截至
      cost: 'Charge Calculation as of',
      chargeFor: 'Charge for',
      export: 'Export',
      import: 'Import',
      // 计算费用
      count: 'Calculate Charges',
      noContainer: 'No container found, please check your shipment reference',
      errTip: 'No match found: your ref is incorrect or no charges were raised at this date.'
    },
    NewDDChargesResult: {
      title: 'D&D Result',
      title1: 'D&D',
      title2: 'Result',
      //运输编号
      shipmentRef: 'Shipment Ref.',
      //集装箱号
      containerNo: 'Container No.',
      currentLocation: 'Current Location',
      chargeType: 'Charge Type',
      lastFreeDate: 'Last Free Date',
      customersClearedDate: 'US Customs\n Cleared Date',
      cashierClearedDate: 'Cashier\n Cleared Date',
      total: 'TOTAL',
      amount: 'Amount',
      cankao: 'For reference only, please refer to invoice for actual cost. For D&D charges due to vessel delay or vessel change by carrier, the extra amount will be deducted from the bill. Booking cancelled by customer is not eligible for D&D free time.'
    },
    // 报价
    quotation: {
      //航线|获取船期
      getASchedule1: "Instant ",
      getASchedule2: 'Quote',
      type1: 'SpotOn',
      type2: 'My Quotations',
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
      departure: "Vessel Departure from",
      ownedContainer: 'Shipper Owned Container (SOC)',
      equipmentType: 'Equipment Type',
      weight: 'Net Weight (KGM)',
      weightName: 'EX.10 000 kgm',
      container: 'Number of Container(s)',
      commodity: "Commodity",
      namedAccount: 'Named Account (if you have)',
      //查询
      search: "Get My Quote",
      search2: 'Search',
      reset: 'Reset',
      partners: 'Partner(s) linked to your web account',
      //查询历史
      history: "History"
    },
    // 报价详情
    qutationResult: {
      noOffer: 'No offer currently available',
      spotOut: 'Spot allocation sold out',
      container: 'CONTAINER',
      title: 'SpotOn',
      title2: 'SpotOn',
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
      saveQuotation: 'Save Quote',
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
      containers: 'Number of Container(s)',
      Commodity: 'Commodity',
      title3: 'My Quotations',
      title4: 'Quotation Detail',
      book: 'Book Now',
      books: 'Book',
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
      totalPerContainer: 'Total Containers',
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
      total: 'TOTAL',
      include: 'INCLUDED IN OFFER',
      createFail: 'Failed to create quotation, please contact your agent',
      getAgain: 'Get an Instant Quote',
      soc: 'Shipper Owned Container',
      socAgree: 'I agree with these conditions',
      socWarn: 'Please accept Terms and Conditions',
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
      value: 'FOR A VALUE OF',
      agree: 'I agree with',
      terms: 'Terms and Conditions',
      required: 'You must accept the terms and conditions',
      needProduct: 'Please select the product',
      inputAmount: 'Please input the amount and calculate',
      vasSelect: 'Select'
    },
    // 订舱
    booking: {
      title: 'Click & Book',
      getASchedule1: "Click Book",
      getASchedule2: ' Book',
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
      searchOn: 'Search On',
      //时间
      date: "Date",
      reference: 'Quotation / Contract Number',
      //查询
      search: "See the Routes",
      reset: 'Reset',
      remind: 'Value-added service (VAS) function coming soon.\n Please add additional services during booking on eCommerce website for now.',
      needQuo: 'Need a quotation？',
      searchQuo: 'Check your contracts or get an instant quote'
    },
    // 订舱详情
    bookingDetail: {
      title: 'Booking',
      matching: 'matching',
      direct: 'DIRECT',
      transhipment: 'TRANSHIPMENT',
      day: 'Day',
      days: 'Days',
      portCutOff: 'Port Cut-off',
      specialBkgCutOff: 'Special BKG Cut-off',
      standardBkgCutOff: 'Standard BKG Cut-off',
      hide: 'Hide',
      display: 'Display',
      select: 'Select',
      bookingDetail: 'Booking Detail',
      routeSelected: 'Route Selected',
      haulageExport: 'Haulage Export',
      haulageImport: 'Haulage Import',
      locationPoint: 'Location Point',
      appointmentDate: 'Appointment Date',
      appointmentTime: 'Appointment Time',
      transportModes: 'Transport Mode',
      address: 'Address',
      contactCompany: 'Contact Company',
      address1: 'Address',
      otherAddress: 'Additional Address Details',
      optional: 'Optional',
      city: 'City',
      zipCode: 'Zip Code',
      countryRegin: 'Country / Region',
      state: 'State',
      contact: 'Contact',
      contactName: 'Contact Name',
      phoneNumber: 'Phone Number',
      Email: 'Email',
      emailExpired: 'The Email field must be a valid email',
      LoadingReference: 'Loading Reference',
      TransportComment: 'Transport Comment',
      saveBtn: 'Save',
      cargoDetail: 'Cargo Detail',
      commodity: 'Commodity',
      addCommodity: 'Add Commodity',
      contaier: 'Contaier',
      vas: 'Additional Services',
      parties: 'Parties',
      partyName: 'Party Name',
      myReference: 'My Reference',
      role: 'Role',
      addParty: 'Add Party',
      payment: 'Payment',
      freightPayment: 'Freight Payment',
      freightPayer: 'Freight Payer',
      paymentLocation: 'Payment Location',
      bookingOffice: 'Preferred Booking Office',
      freeComments: 'Free Comments',
      freeCommentsPlaceHolder: 'Optional, example Release Order Date, Customer Broker ...',
      save: 'Place My Booking',
      save1: 'Place ',
      save2: ' Booking',
      partyRole: {
        SHP: 'Shipper',
        FOR: 'Forwarder',
        CEE: 'Consignee',
        NOT: 'Notify',
        NO2: 'Second Notify party',
        DCD: 'Deciding party',
        NAC: 'Named Account',
        '3BA': 'Third Party booking agent',
        CUS: 'Customs Broker'
      },
      transportMode: {
        Road: 'Truck',
        Rail: 'Rail',
        RailRoad: 'Rail + Truck',
        Barge: 'Barge',
        BargeRoad: 'Barge + Truck',
        RailBarge: 'Train + Barge'
      },
      Edit: 'Edit',
      Unsubsribe: 'Unsubsribe'
    },
    commodity: {
      title: 'Cargo Detail',
      commodity: 'Commodity',
      commodityPlaceholder: 'Type Your Commodity',
      container: 'Container',
      shipperOwner: 'Shipper Owned Container',
      sizeType: 'Size/Type',
      Quantity: 'Quantity',
      perWeight: 'Weight Per Container (Net Weight)',
      totalWeight: 'Total Weight',
      Unit: 'Unit',
      SpecialAttributes: 'Special Attributes',
      Reefer: 'Reefer',
      Hazardous: 'Hazardous',
      addUNNumber: 'Add Another UN Number',
      Confirm: 'Confirm'
    },
    unNumber: {
      title: 'Hazardous Settings',
      globalDetail: 'Global Details',
      unNumberName: 'UN Number or Proper Shipping Name',
      nameOrCode: 'Name / Code',
      chemicalName: 'Chemical Name',
      PackingGroup: 'Packing Group',
      Class: 'Class',
      EmergencyProcedure: 'Emergency Procedure',
      Flashpoint: 'Flashpoint',
      hazWeight: 'Hazardous cargo weight per container',
      NetWeight: 'Net Weight',
      GrossWeight: 'Gross Weight',
      Unit: 'Unit',
      PackingDetails: 'Packing Details',
      PackagingDescription: 'Packaging Description',
      Quantity: 'Quantity',
      InnerPackaging: 'Inner Packaging',
      InnerQuantity: 'Inner Quantity',
      transportOfDangerous: 'Transport of dangerous goods in limited quantities',
      EmergencyDetails: 'Emergency Details',
      EmergencyContactName: 'Emergency Contact Name',
      EmergencyNumber: 'Emergency Number',
      Comment: 'Comment',
      Optional: 'Optional',
      remind: 'Please note that validation regarding the hazardous details provided will be done by our technical experts who could revert to you for any further information that could be helpful for hazardous approval on the voyage selected. Thanks for your understanding.',
      save: 'Save'
    },
    reefer: {
      title: 'Reefer Settings',
      reeferMode: 'Reefer Mode',
      noOperating: '(Non operating)',
      Ventilation: 'Ventilation',
      close: '(Close)',
      Open: 'Open',
      Dehumified: 'Dehumified',
      no: '(No)',
      yes: 'Yes',
      yesAt: 'Yes at',
      switchDehumifiedDesc: 'The accuracy of Dehumidify control is linked with the opening setup of fresh air exchange, an excessive choice will cause trouble, more info on CMA CGM site.',
      ControlledAtmosphere: 'Controlled Atmosphere',
      o2Operate: 'Operating at O²',
      co2Operate: 'and CO²',
      GensetRequired: 'Genset Required',
      AdditionalComments: 'Additional Comments',
      save: 'Save'
    },
    modifyParty: {
      address: 'Address',
      partyName: 'Party Name',
      additionalAddress: 'Additional Address Details',
      city: 'City',
      zipCode: 'Zip Code',
      country: 'Country / Region',
      state: 'State',
      contactDetail: 'Contact Details',
      name: 'Name',
      email: 'Email',
      phoneNumber: 'Phone number',
      fax: 'Fax',
      localLegalNumber: 'Local legal identifier number',
      reference: 'Reference',
      optional: 'Optional',
      save: 'Save'
    },
    bookingResult: {
      title: 'Booking Result',
      processing: 'PROCESSING',
      export: 'Export PDF',
      toEmail: 'Send to Email',
    },
    popupBtn: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    copyInfo: {
      success: 'Successfully copied,\nplease visit in browser',
      success2: 'Successfully copied'
    },
    load: {
      //加载中
      load:'Loading',
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
      noLogin: 'Login failed or invalid, please login again',
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
    },
    manageNotifications: {
      title: 'Manage My Notifications',
      notice: 'To receive WeChat notifications, please make sure to subscribe the same notifications on eCommerce website & follow "CMACGMCHINA" offical WeChat Account.',
      urlLabel: 'Copy link for eCommerce website',
      checkBoxLabel: 'Only for booking I submitted',
      subscribe: [
        // {
        //   id: 0,
        //   name: 'booking',
        //   title: 'Booking Follow up',
        //   description: 'This notification informs you that your booking is confirmed.',
        // },
        // {
        //   id: 1,
        //   name: 'vgm',
        //   title: 'My VGM Follow up',
        //   description: 'This notification informs you about the status of your VGM declaration, whether it was validated or rejected due to errors.',
        // },
        // {
        //   id: 2,
        //   name: 'eta',
        //   title: 'ETA & ETD Change',
        //   description: 'This notification informs you that the estimated time of arrival or departure of your vessel has been modified.',
        // },
        {
          id: 3,
          name: 'container',
          title: 'Container Loaded on Board',
          description: 'This notification informs you when a container has been loaded on board at POL.',
        },
        {
          id: 4,
          name: 'invoice',
          title: 'Invoice Available',
          description: 'This notification informs you that your import & export invoice is available on your ebusiness account.',
        },
        {
          id: 5,
          name: 'eir',
          title: 'Empty Release',
          description: 'This notification informs you that your EIR is ready to be printed, which is exclusive to WeChat Mini-Program, not available on eCommerce website yet.',
        },
      ]
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
      "text": "SpotOn",
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