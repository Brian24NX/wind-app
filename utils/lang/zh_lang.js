/**
 *  author:Jason
 *  time:2022-03-15 17:56:03
 *  desc:国际化中文语言包
 */
var Languague = {
  //个人中心
  page: {
    //中英文切换按钮
    changeLanguage: "是否切换为英文",
    sure: '确认',
    cancel: '取消',
    // 语言
    langue: 'zh',
    // 星期
    weeks: {
      week0: '周日',
      week1: '周一',
      week2: '周二',
      week3: '周三',
      week4: '周四',
      week5: '周五',
      week6: '周六',
      weeks0: '星期日',
      weeks1: '星期一',
      weeks2: '星期二',
      weeks3: '星期三',
      weeks4: '星期四',
      weeks5: '星期五',
      weeks6: '星期六',
    },
    // 校验
    verifyInfo: {
      // 必填
      required: '此项为必填项',
      // 格式无效
      gswx: '号码无效，请检查格式',
      dcgswx: '运输号无效，请检查格式',
      more3: '最多可同时查询三个货柜状态，请重新输入',
      chongfu: '号码重复，请检查后输入',
      only: '请输入一个订舱号或多个货柜号',
      input: '请输入',
      select: '请选择'
    },
    empty: {
      description: '暂无相关信息',
    },
    // 首页
    homeInfo: {
      hometitle: "CMA CGM",
      // 获取追踪
      TRACKING: '货物追踪',
      TRACKING1: '货物追踪',
      chuanqi1: '货物',
      chuanqi2: '追踪',
      // 提示
      goodsRemind: '输入货柜号，提单号或订舱号',
      //货物追踪
      goods: "搜索",
      //提示
      tips: "请在搜索时输入唯一号码，系统将自动识别号码",
      //船期查询
      SCHEDULE: "船期查询",
      // 起运港
      qyg: '起运港',
      // 卸货港
      xhg: '卸货港',
      gCode: '名称/代码',
      scheduleBtn: '搜索',
      advancedBtn: '高级搜索',
      //实时报价
      PRICE: '获取报价',
      //实时报价
      instantQuote: "实时报价",
      //柜租费率
      DDCharges: "柜租费率",
      //查询费率
      chargeFinder: "查询费率",
      guizu: '柜租费率',
      // 发现更多
      more: '发现更多',
      // cmacgm
      cma: '增值服务',
      // 关于我们
      about: '集团介绍',
      //新闻资讯
      news: "新闻中心",
      // 在线服务
      onlineServices: '在线服务',
      //增值服务
      valueAddedService: "客户通告",
      template: '模板及链接',
      // 管制品
      gzp: '货物运输限制',
      // 联系我们
      callMe: '联系我们',
      tariff: '滞留滞期费'
    },
    khtg: {
      topTitle: '业务及运营\n信息更新',
      send: '发送至邮箱',
      keyword: '关键词'
    },
    newsCenter: {
      title: '新闻中心',
      topTitle: '新闻中心',
      keyword: '关键词'
    },
    callMe: {
      topTitle: '业务咨询',
      bsc: '请选择您需要联系的本地办事处',
      businessType: '请选择您需要咨询的业务类型',
      tigong: '请问您是否可以提供订舱信息？',
      yes: '是',
      no: '否',
      hangxian: '请选择您需要咨询的航线',
      dingdan: '请输入订舱号',
      accountName: '请填写您所在的公司名称',
      submitBtn: '提交并获取联系信息',
      noOrder: '无法找到相关订舱号，请提供更多信息'
    },
    callMeResult: {
      title: '联系我们',
      fuwu: '客户服务',
      phone: '联系方式',
      email: '邮箱地址',
      noContact: '无相应联系信息，请修改搜索条件'
    },
    // 查询
    queryInfo: {
      dingcang: '订舱',
      chuanqi: '船期查询',
      huowu: '货物追踪',
      gzp: '货物运输限制',
      gzfl: '柜租费率\n(标准)',
      cxfl: '查询费率',
      ddCharges: '柜租费率\n(实时)'
    },
    // 查询结果
    queryRes: {
      topTitle: '追踪结果',
      title: '追踪结果',
      placeholder: '输入货柜号，提单号或订舱号',
      yuji: '目的港预计停泊时间',
      tingbo: '目的港停泊时间',
      shengyu: '剩余航程',
      tian: '天',
      export: '以PDF格式输出',
      toEmail: '以附件形式发送至邮箱',
      huoguihao: '货柜号',
      dingdans: '货柜号/提单号/订舱号',
      xiangxing: '箱型',
      location: '位置',
      time: '时间',
      chuanming: '船名',
      chuanci: '船次',
      noData: '未找到结果',
      notFound: '未找到或已经卸货或返回到堆场',
      noDataDesc: '未找到或已经卸货或返回堆场'
    },
    //航线查询
    scheduleSearching: {
      //航线|获取船期
      getASchedule1: "航线",
      getASchedule2: '获取船期',
      //卸货港
      portOfDischarge: "卸货港",
      //起运港
      protOfLoading: "起运港",
      //港口名称/代码
      name: "名称/代码",
      //查询
      searchOn: "查询",
      //离港时间
      departure: "离港时间",
      //到港时间
      arrival: "到港时间",
      //日期
      date: "日期",
      //未来
      next: "未来",
      //查询
      search: "查询",
      week: '星期',
      //查询历史
      history: "查询历史"
    },
    //航线查询结果列表
    searchResultList: {
      // 标题
      title: '航线结果',
      fangan1: '路线方案',
      fangan2: '路线方案',
      //日历
      calendar: "日历",
      // 未来一星期
      future1: '未来一星期',
      // 未来二星期
      future2: '未来二星期',
      // 未来三星期
      future3: '未来三星期',
      // 未来四星期
      future4: '未来四星期',
      days: '天',
      day: '天',
      // 转运
      zhuanyun: '转运',
      zhida: '直达',
      apply: '应用',
      //排序
      sortBy: "排序",
      //最快离港
      earliestDeparture: "最快离港",
      //最快到港
      earliestArrival: "最快到港",
      // 最快运输时间
      earliestTime: '最快运输时间',
      //离港
      depart: "离港",
      //航线方案
      routingSolutions: "航线方案",
      //仅看最早到达
      earliestArrivalOnly: "仅看最早到达",
      //仅看直达
      directOnly: "仅看直达",
      //抱歉，我们暂未查询到匹配的航线方案.
      noFindTips1: "抱歉！未找到此问题的解决方案",
      noFindTips2: "在CMA CGM集团内目前暂未能提供处理方案"
    },
    //routeDetails航线查询详情
    routeDetails: {
      title: '航线详情',
      zhida: '直达',
      day: '天',
      days: '天',
      transhipment: '转运',
      transhipments: '转运',
      zhida: '直达',
      // 船名
      vessel: '船名',
      // 航线方案
      service: '航线方案',
      //验证集装箱重量截止时间
      vgmCutOff: "验证集装箱总重量(VGM)截止时间",
      //港口截关时间
      portCutOff: "港口截关时间",
      //本地航次
      localVoyageRef: "本地航次",
      //航次
      vouageRef: "航次",
      // 起运港
      pol: "起运港",
      // 卸货港
      pod: "卸货港",
      // 始发地
      coc: '始发地',
      dest: '最终目的地',
      perTEU: '每标准箱(TEU)'
    },
    // 常用模板与链接
    useful: {
      title: '常用模板与链接',
      topTitle: '常用模板\n及链接',
      title1: '常用模板',
      title2: '及链接',
      keyword: '搜索模板或链接名称',
      template: '模板',
      link: '链接',
      copy: '复制',
      send: '发送至邮箱'
    },
    // 管制品查询
    sanction: {
      title: '货物运输限制',
      topTitle: '货物运输限制',
      title1: '货物运输限制',
      title2: '查询',
      placeholder: '名称/编码',
      commodity: '货物运输限制',
      country: '国家/地区',
      type: '种类',
      code: '编码',
      remind1: '如需查询CMA CGM是否承运特定危险品UN#, ',
      remind2: '请联系 '
    },
    // 柜租费率
    guizufeilv: {
      navBarTitle: '柜租费率',
      topTitle: '柜租费率',
      selectTitle: '选择国家/地区',
      send: '发送至邮箱'
    },
    tariffBook : {
      navBarTitle: '滞留滞期费',
      topTitle: '滞留滞期费',
      selectTitle: '选择国家/地区',
      send: '发送至邮箱'
    },
    DDP: {
      title1: '柜租费率',
      title2: '',
      ddDocument: 'Tariff Book',
      ddPrice: 'D&D Price'
    },
    // 我的
    userCenter: {
      title: '我的',
      login: '登录',
      myDashboard: '我的概览',
      shipment: '船运概览',
      document: '单证概览',
      seaReward: '我的海里',
      setting: '语言设置',
      legalTerms: '隐私政策',
      notifications: '管理我的通知',
      noAccount: '您还没有账户？',
      siteName: 'CMA CGM官网',
      visitSite1: '请前往 ',
      visitSite2: ' 申请账户。',
      refusedText: '您已拒绝授权，请重新点击并授权',
      refusedTitle: '提示',
      refusedButton: '知道了',
      rewardResult1: 'Potentially earned ',
      rewardResult2: 'Nautical Miles',
      resultInfo: 'Points will be effectively accumulated after payment of the invoice'
    },
    //sea reward
    seaReward:{
      seaRewardTitle: '海里抵现',
      activate: '海里抵现，开启您的省钱之旅！',
      dashboard: '我的海里',
      seaRewardInformation: '海里抵现',
      seaRewardIntro: '海里抵现是达飞轮船基于实时报价特别为您设计的一项遍及世界的海里奖励计划。每一次成功订舱，即可赚取海里!',
      Lieutenant: '中尉',
      LieutenantBenefits: '每消费100 USD累积2海里', 
      Captain: '上尉',
      CaptainGetThere: '要达到上尉级别，您需要至少在13周内每周预定最少3个TEU（标准箱）',
      CaptainBenefits: '每消费100 USD累积4海里',
      Master: '船长',
      MasterGetThere: '要达到船长级别，您需要至少在16周内每周预定最少25个TEU（标准箱）',
      MasterBenefits: '每消费100 USD累积6海里',
      Admiral: '上将',
      AdmiralGetThere: '要达到上将级别，您需要至少在20周内每周预定最少120个TEU（标准箱）',
      AdmiralBenefits: '每消费100 USD累积8海里',
      Howtogetthere: '等级条件',
      benefits: '等级权益',
      seaRewardDiscover: '查看海里详情',
      seaRewardDiscover2: '',
      mySeaReward: '我的海里',
      nauticalMiles: '赚取海里',
      getAQuote: '获取报价',


      save1: '使用 ',
      save2: '海里抵扣 ',
      usd: 'USD',
      nmilesCollected: '可获得海里: ',
      earned: '可获得海里:',
      status: '当前等级: ',
      available: 'Nautical Miles Available',
      usdSaved: '',
      description: 'As a Captain you earn 2 Nautical Miles for every 100＄ spent on Spoton quotes. Nautical Miles are earned once the invoice is paied.',
      rewardResult1: '可获得 ',
      rewardResult2: ' 海里',
      resultInfo: '实际海里累积将在账单支付后生效'
    },
    //sea reward dashboard
    seaRewardDashboard: {
      title: '我的海里',
      next: '下个等级: ',
      available: ' 可用海里',
      saved: ' USD 已抵扣',
      virtroles: 'CENTRIMEX-Virtroles',
      spotOn: '最新报价单',
      desc1: '作为',
      desc2: '，您在创建报价单时每消费100 USD将累积',
      desc3: '海里。账单支付成功后即可有效累积海里数。',
      nauticalMiles : '海里',
      placeholder: '报价单号/账单单号',
      raisedDate: '生成日期',
      quotRef: '报价单号',
      invoiceRef: '账单单号:',
      nauticalMiles2: '海里:',
      faq: '常见问题',
      use: '获取报价',
      nodata: '您还未体验海里抵现？',
      getQuot: '即刻开始实时报价！',
      detail: {
        status: '我的等级',
        next: '下个等级',
        conditions: '等级条件',
        benefits: '等级权益',
      }
    },
    legalTerms: {
      title: '隐私政策',
      title1: '隐私',
      title2: '政策'
    },
    // 基础信息
    baseInfo: {
      title: '用户信息',
      company: '公司',
      ming: '名',
      xing: '姓',
      email: '邮箱地址',
      exit: '退出'
    },
    exit: {
      title: '确认退出此账号',
      cancel: '取消',
      sure: '退出'
    },
    // 设置语言
    setLanguage: {
      title: '设置语言'
    },
    // 单证概览
    document: {
      title: '单证概览',
      title1: '单证',
      title2: '概览',
      placeholder: '搜索订舱号或提单号',
      fileNo: '单证编号',
      referenceNo: '运输号码',
      type: '类型',
      status: '状态',
      date: '日期',
      send: '发送至邮箱',
      noData: '暂无单证'
    },
    // 船舶概览
    shipment: {
      title: '船运概览',
      title1: '船运',
      title2: '概览',
      placeholder: '订舱号或提单号',
      shipment: '装运视图',
      shipmentRef: '运输号码',
      et: '到港时间',
      eat: '预计到港时间',
      container: '货柜视图',
      huoguihao: '货柜号',
      xiangxing: '箱型',
      location: '位置',
      time: '时间',
      chuanming: '船名',
      chuanci: '船次',
      detailTitle: '船运详情',
      detailTitle1: '船运',
      detailTitle2: '详情',
      detailContainer: '货柜',
      info: '资讯',
      document: '单证',
      RECEIPT: '始发地',
      POL: '起运港',
      POD: '卸货港',
      DELIVERY: '目的地',
      containers: '货柜数量',
      TEU: '总计TEU',
      weight: '货物重量',
      volume: '货物体积',
      Commodities: '海关编码',
      Shipper: '发货人',
      Consignee: '收货方',
      noShipmentData: '暂无船运信息',
      noContainersData: '暂无货柜'
    },
    // 查询费率
    chargeFinder: {
      title: '查询费率',
      title1: '查询',
      title2: '费率',
      //卸货港
      portOfDischarge: "卸货港",
      //起运港
      protOfLoading: "起运港",
      //港口名称/代码
      name: "名称/代码",
      type: '集装箱类型',
      dryNoR: '干货集装箱 & 冷代干',
      reefer: '冻柜',
      date: '模拟日期',
      search: '搜索',
      detailTitle: '费率详情',
      main: '主要费用',
      other: '其他费用',
      noChargeData: '未找到相关数据'
    },
    // D&D Charges
    DDCharges: {
      title: 'D&D费用',
      title1: 'D&D',
      title2: '费用',
      titlenew: '柜租费率',
      title3: 'Prices',
      //卸货港
      portOfDischarge: "卸货港",
      //起运港
      protOfLoading: "起运港",
      //港口名称/代码
      name: "名称/代码",
      type: '集装箱型号',
      specialCargo: "特殊货物",
      refrigerated: '冷藏货物',
      hazardous: '危险货物',
      oversized: '超大货物',
      date: '模拟日期',
      search: '搜索',
      detailTitle: 'D&D费用',
      import: '进口',
      export: '出口',
      noChargeData: '未找到相关数据'
    },
    //new D&D Charges
    NewDDCharges: {
      title: '柜租费率',
      title1: '柜租费率',
      title2: '',
      //运输编号
      byShipment: '按运输编号',
      //集装箱号
      byContainer: '按集装箱号',
      shipment: '运输号',
      // 集装箱
      container: '集装箱',
      allContainer: '所有集装箱',
      containerNo: '集装箱号',
      // 费用计算截至
      cost: '费用计算截至',
      chargeFor: '查询',
      export: '出口费用',
      import: '进口费用',
      // 计算费用
      count: '计算费用',
      noContainer: '没有找到相关货柜，请核实您的提单',
      errTip: '没有找到匹配的：不正确的日期或者集装箱号码'
    },
    NewDDChargesResult: {
      title: 'D&D 结果',
      title1: 'D&D',
      title2: '结果',
      //运输编号
      shipmentRef: '运输号',
      //集装箱号
      containerNo: '货柜号',
      currentLocation: '当前所在地',
      chargeType: '费用类型',
      lastFreeDate: '最后免费日期',
      customersClearedDate: '美国清关日期',
      cashierClearedDate: '结款日期',
      total: '总计',
      amount: 'Amount',
      cankao: '仅供参考，请以实际账单为准。如有因船期延误或船公司换船引起的D&D费用，相应金额将在账单中扣除。出口退关集装箱不享受免费用箱期。'
    },
    // 报价
    quotation: {
      //航线|获取船期
      getASchedule1: "即时",
      getASchedule2: '报价',
      type1: '实时报价',
      type2: '我的合约',
      placeOfOrigin: "收货地",
      addPlaceOfOrigin: '添加收货地',
      //起运港
      protOfLoading: "起运港",
      //卸货港
      portOfDischarge: "卸货港",
      placeOfDelivery: "目的地",
      addPlaceOfDelivery: '添加目的地',
      //港口名称/代码
      name: "名称/代码",
      //离港时间
      departure: "离港时间",
      ownedContainer: '托运人自备集装箱（SOC）',
      equipmentType: '箱型',
      weight: '净重（KGM）',
      weightName: 'EX.10 000 kgm',
      container: '货柜数量',
      commodity: "品名/海关编码",
      namedAccount: '指定账号（NAC）',
      //查询
      search: "获取报价",
      search2: "查找价格",
      reset: '重置',
      partners: '关联单位',
      history: "查询历史"
    },
    // 报价详情
    qutationResult: {
      noOffer: '目前没有报价可供选择',
      spotOut: 'Spot舱位已满',
      container: '货柜',
      title: '报价列表',
      title2: '报价详情',
      select: '选择',
      days: '天',
      day: '天',
      // 转运
      zhuanyun: '转运',
      zhuanyuns: '转运',
      zhida: '直达',
      perRate: '每柜费用',
      totalPer: '每柜总价',
      oceanFeight: '海运费',
      perFeight: '运费附加费',
      prepaid: '出口附加费（预付）',
      collect: '进口附加费（到付）',
      perBL: '每单费用',
      totalBL: '按单总计',
      saveQuotation: '获取报价',
      forContainer1: '集装箱总数 ',
      forContainer2: '',
      apply: '应用',
      //排序
      sortBy: "排序",
      //最快离港
      earliestDeparture: "最快离港",
      //最快到港
      earliestArrival: "最快到港",
      // 最快运输时间
      earliestTime: '最快运输',
      price: '价格',
      spotOn: 'SPOTON',
      //离港
      depart: "离港",
      //航线方案
      routingSolutions: "航线方案",
      //仅看最早到达
      earliestArrivalOnly: "仅看最早到达",
      //仅看直达
      directOnly: "仅看直达",
      //抱歉，我们暂未查询到匹配的航线方案.
      noFindQuteTips1: '抱歉，未找到相匹配的记录',
      noUsFindQuteTips1: '抱歉，我们目前不能为您在FMC范围内的需求提供在线报价。我们的团队正在不断提出新的解决方案，以满足您的需求。请修改您的搜索。',
      noFindTips1: "抱歉！未在您的合约中找到符合您搜索的价格",
      modifySearch: '修改搜索',
      equipmentType: '箱型',
      weight: '净重（KGM）',
      containers: '货柜数量',
      Commodity: '商品',
      title3: '我的报价',
      title4: '合同详情',
      book: '立即订舱',
      books: '订舱',
      localCharge: '本地费用',
      DDSM: 'D&D',
      SpotOn: 'SpotOn',
      addInfo: '其他信息',
      localChargeDetail: '有关本地费用的详细信息：',
      exportLocalCharge: '出口本地费用',
      importLocalCharge: '进口本地费用',
      copy: '复制',
      exportFreeTime: '出口免租期',
      importFreeTime: '进口免租期',
      spotOnDetail: 'SpotOn - 具体条款',
      consult: '请参阅更多条款细则',
      additionalInformation: '其他信息',
      quotation: '报价单',
      valid: '有效',
      expired: '无效',
      coming: '未来',
      allInRate: '综合利率',
      reference: '报价单',
      chargeDetails: '费用详情',
      quoteDetails: '报价详情',
      totalPerContainer: '按柜总计',
      validity: '有效期',
      validityFrom: '从',
      validityTo: '至',
      comments: '备注',
      commoditys: '品名/海关编码',
      incluedLabel: '包括费用: ',
      import: '进口',
      export: '出口',
      movementType: '运输类型',
      bookPreCarriage: '预多式联运',
      bookOnCarriage: '预多式联运',
      usContract: 'US 合约号',
      amendment: '修改',
      governingTariff: '关税',
      trade: '交易',
      bulletCode: '美国专案代码',
      HAZ: '危险品',
      OOG: 'OOG',
      SOC: '发货人自备柜',
      NOR: 'NOR',
      additionalAttributes: '附加属性',
      socLabel: '托运人自备集装箱（SOC）',
      norLabel: '干冻柜（NOR）',
      hazLabel: '危险品（HAZ）',
      oogLabel: '超限（OOG）',
      overDimensions: '超尺寸',
      reeferLabel: '冷藏柜',
      temperature: '温度',
      ventilation: '通风设备',
      namedAccounts: '指定账号',
      weightAndDimensions: '重量与尺寸',
      perContainer: '每个货柜',
      maxWeight: '每只货柜最大重量',
      length: '长度',
      allowed: '已获准',
      refused: '已拒绝',
      referenceSuccess1: '您的报价 ',
      referenceSuccess2: ' 已成功创建',
      copyReference: '请惠存报价单号，并在订舱前进行核对',
      backHome: '返回首页',
      bookNow: '立即订舱',
      nearPortInstantQuote: '附近港口的即时报价',
      clickCard: '请找到附近港口以便获取即时报价。 请点击卡片并查看结果。',
      fewContainer: '仅剩少量货柜',
      ferContainerDesc1: '您需要 ',
      ferContainerDesc2: ' 个货柜，该方案仅剩余 ',
      ferContainerDesc3: ' 个货柜。',
      continue: '继续获取报价?',
      continueBtn: '继续',
      chooseOther: '选择其他航线',
      containerRemind: '个剩余货柜',
      exportPDF: '导出PDF',
      contractDetail: '详情',
      currentVaild: '有效报价 - 完全匹配',
      additionalResults: '与您搜索相关的其他结果',
      placeOfOrigin: "收货地",
      placeOfDelivery: "目的地",
      transType: '运输方式',
      comingSoon: '增值服务功能升级中，敬请期待',
      bookInWeb: '请至官网订舱时添加增值服务产品',
      back: '上一步',
      next: '下一步',
      total: '总计',
      include: '包含在报价里',
      createFail: '创建报价单失败，请联系您的代理',
      getAgain: '获取报价',
      soc: '托运人自备集装箱（SOC）',
      socAgree: '我同意这些条件',
      socWarn: '请接受T&C',
    },
    vas: {
      containers: '柜号',
      perBL: '提单',
      warningRemind: '订舱提交后须经代理确认',
      additionalServicesChoosed: '已订阅的服务',
      noChoosedAdditionalServices: '尚未选购增值服务，请选择下列适配您的报价的增值服务.',
      additionalServices: '增值服务',
      additionalServicesDesc: '保护您的货物 · 拓展业务 · 争取实现碳中和',
      send: '发送至邮箱',
      subscribe: '订阅',
      calculate: '计算',
      value: '值',
      agree: '我同意',
      required: '您必须接受条款',
      needProduct: '请选择产品',
      inputAmount: '请输入金额并计算',
      terms: '条件与条款',
      vasSelect: '订阅'
    },
    // 订舱
    booking: {
      title: '订舱',
      getASchedule1: "订舱",
      getASchedule2: '& Book',
      placeOfOrigin: "收货地",
      addPlaceOfOrigin: '添加收货地',
      //起运港
      protOfLoading: "起运港",
      //卸货港
      portOfDischarge: "卸货港",
      placeOfDelivery: "目的地",
      addPlaceOfDelivery: '添加目的地',
      //港口名称/代码
      name: "名称/代码",
      searchOn: '搜索',
      //离港时间
      date: "日期",
      reference: '合约号',
      //查询
      search: "查看路线",
      reset: '重置',
      remind: '增值服务功能升级中，敬请期待。\n如需添加增值服务产品，请移步至官网进行操作。',
      needQuo: '需要报价？',
      searchQuo: '查询我的合同或获取报价'
    },
    // 订舱详情
    bookingDetail: {
      title: '订舱',
      matching: '匹配',
      direct: '直达',
      transhipment: '转运',
      day: '天',
      days: '天',
      portCutOff: 'Port Cut-off',
      specialBkgCutOff: 'Special BKG Cut-off',
      standardBkgCutOff: 'Standard BKG Cut-off',
      hide: '隐藏',
      display: '展开',
      select: '选择',
      bookingDetail: '订舱详情',
      routeSelected: '已选好的线路',
      haulageExport: '出口运输',
      haulageImport: '进口运输',
      locationPoint: '定位点',
      appointmentDate: '预约日期',
      appointmentTime: '预约时间',
      transportModes: '运输方式',
      address: '地址',
      contactCompany: '联系公司',
      address1: '地址',
      otherAddress: '其他地址详细信息',
      optional: '可选',
      city: '城市',
      zipCode: '邮政编码',
      countryRegin: '国家 / 地区',
      state: '说明',
      contact: '联系人',
      contactName: '联系人姓名',
      phoneNumber: '电话号码',
      Email: '电子邮箱',
      emailExpired: '邮箱格式不正确',
      LoadingReference: '送货参考号',
      TransportComment: '运输备注',
      saveBtn: '保存',
      cargoDetail: '货物详情',
      commodity: '商品',
      addCommodity: '添加商品',
      contaier: '柜子',
      vas: '增值服务',
      parties: '相关方',
      partyName: '相关方名称',
      myReference: '我的参考号',
      role: '角色',
      addParty: '添加相关方',
      payment: '付款',
      freightPayment: '运费支付方式',
      paymentLocation: '付款地',
      freightPayer: '费用付款方',
      bookingOffice: '首选订舱办事处',
      freeComments: '备注',
      freeCommentsPlaceHolder: '可选，附加备注（到付的本地费用付款方，首选仓库等）',
      save: '制作我的订舱',
      save1: '制作 ',
      save2: ' 订舱',
      partyRole: {
        SHP: '发货人',
        FOR: '货代',
        CEE: '收货方',
        NOT: '通知',
        NO2: '第二通知方',
        DCD: '决定方',
        NAC: '指定账号',
        '3BA': '第三方订舱代理',
        CUS: '报关行'
      },
      transportMode: {
        Road: '卡车',
        Rail: '轨道',
        RailRoad: '铁路 + 拖车',
        Barge: '驳船',
        BargeRoad: '驳船 + 拖车',
        RailBarge: '火车 + 驳船'
      },
      Edit: '编辑',
      Unsubsribe: '取消订阅'
    },
    commodity: {
      title: '货品详情',
      commodity: '货品',
      commodityPlaceholder: '输入您的海关编码',
      container: '货柜',
      shipperOwner: '发货人自备柜',
      sizeType: '尺寸/类型',
      Quantity: '数量',
      perWeight: '每个集装箱的重量 (净重)',
      totalWeight: '总重量',
      Unit: '单位',
      SpecialAttributes: '特殊属性',
      Reefer: '冻柜',
      Hazardous: '危险品',
      addUNNumber: '添加 UN 号码',
      Confirm: '完成'
    },
    unNumber: {
      title: '危险品设置',
      globalDetail: '全球详情',
      unNumberName: 'UN号码或者相应的船运名称',
      nameOrCode: 'Name / Code',
      chemicalName: '化学名称',
      PackingGroup: '包装组',
      Class: '类',
      EmergencyProcedure: '紧急程序',
      Flashpoint: '亮点',
      hazWeight: '每只柜的危险品重量',
      NetWeight: '净重',
      GrossWeight: '毛重',
      Unit: '单位',
      PackingDetails: '包装详情',
      PackagingDescription: '包装说明',
      Quantity: '数量',
      InnerPackaging: '内包装',
      InnerQuantity: '内部数量',
      transportOfDangerous: '限量运输危险品',
      EmergencyDetails: '紧急情况详情',
      EmergencyContactName: '紧急联系名称',
      EmergencyNumber: '紧急号码',
      Comment: '备注',
      Optional: '可选',
      remind: '请注意，我们的技术专家将验证您所提交的危险品详细信息，他们将为您提供进一步的信息，以帮助对所选航次进行危险品审批。 感谢你的理解。',
      save: '保存'
    },
    reefer: {
      title: '冻柜设置',
      reeferMode: '冷冻模式',
      noOperating: '(非运行)',
      Ventilation: '通风',
      close: '(关闭)',
      Open: '开放',
      Dehumified: '除湿',
      no: '(无)',
      yes: '确认',
      yesAt: '确认在',
      switchDehumifiedDesc: '除湿控制的精准度与新鲜空气的换气系统设置有关，过多的选择会引起故障，更多信息请访问CMA CGM官网。',
      ControlledAtmosphere: '控制气流',
      o2Operate: '以O²运行',
      co2Operate: '和 CO²',
      GensetRequired: '需要发电机',
      AdditionalComments: '附加备注',
      save: '保存'
    },
    modifyParty: {
      address: '地址',
      partyName: '相关方名称',
      additionalAddress: '其他地址详情',
      city: '城市',
      zipCode: '邮政编码',
      country: '国家/地区',
      state: '说明',
      contactDetail: '联系详情',
      name: '名称',
      email: '邮件',
      phoneNumber: '电话号码',
      fax: '传真',
      localLegalNumber: '本地法律编号',
      reference: '参考号',
      optional: '可选',
      save: '保存'
    },
    bookingResult: {
      title: '订舱结果',
      processing: 'PROCESSING',
      export: '导出PDF',
      toEmail: '以附件形式发送至邮箱'
    },
    popupBtn: {
      confirm: '确定',
      cancel: '取消'
    },
    copyInfo: {
      success: '已复制，请前往浏览器打开',
      success2: '已复制'
    },
    load: {
      //努力加载中
      loading: "努力加载中...",
      //网络不给力,请稍后刷新
      networkIsNotWorking: "网络不给力,请稍后刷新",
      // 功能升级中,敬请期待
      functionIsUnderDevelopment: "功能升级中，敬请期待",
      chaoshi: '请求超时，请稍后再试',
      accessDenied: '抱歉，您暂无此权限',
      noPermission: '对不起，您没有足够的权限显示此页',
      // 系统繁忙,请稍后重试
      systemIsBusyNow: "系统繁忙，请稍后重试",
      // 暂无更多数据
      noMoreData: '暂无更多数据',
      // 发送中
      send: '发送中...',
      sendSuccess: '发送成功，请前往邮箱查看',
      noLogin: '未登录或登录失效，请重新登录',
      notFound: '此文件不可用，请联系您的代理',
      toLogin: '登录',
      exit: '退出中...',
      waitData: '导出数据准备中，请稍后再试'
    },
    email: {
      title: '请输入收件人邮箱',
      placeholder: '邮箱地址',
      exprise: '请输入正确的邮箱地址',
      send: '发送'
    },
    preview: {
      disPreview: '暂不支持此类型文件预览，请发送至邮箱后查看'
    },
    legalTermsRemind: {
      title: '隐私政策',
      desc1: '尊敬的客户，在您继续使用达飞轮船小程序之前，请您认真阅读',
      desc2: '《达飞轮船微信小程序隐私政策》',
      desc3: '。',
      desc4: '若您同意我们的政策内容，请点击“同意”并继续。',
      allow: '同意',
      refuse: '不同意，继续浏览'
    },
    manageNotifications: {
      title: '管理我的通知',
      notice: '为了能收到微信通知，请确保您在eCommerce网站订阅相同通知，并关注"达飞轮船中国"公众号。',
      checkBoxLabel: '只适用于我管理的船运',
      urlLabel: '获取eCommerce网站链接',
      subscribe: [
        // {
        //   id: 0,
        //   name: 'booking',
        //   title: '订舱跟进',
        //   description: '此通知用于通知您的订舱已确认。',
        // },
        // {
        //   id: 1,
        //   name: 'vgm',
        //   title: '验证集装箱总重量(VGM)跟进',
        //   description: '这份通知是告知您提交验证集装箱总重量申报(VGM)的状态， 是记录成功还是由于错误信息被拒绝。',
        // },
        // {
        //   id: 2,
        //   name: 'eta',
        //   title: '预计离港 & 到港时间更改',
        //   description: '此通知用于通知您的预计离港或到港时间已更改。',
        // },
        {
          id: 3,
          name: 'container',
          title: '集装箱已装船',
          description: '请知悉集装箱已在起运港装船。',
        },
        {
          id: 4,
          name: 'invoice',
          title: '可供使用发票',
          description: '此通知用于通知您可以在您的电子商务账户上查阅进出口发票。',
        },
        {
          id: 5,
          name: 'eir',
          title: '放箱预告',
          description: '此通知用于通知您的EIR已准备好打印，该通知仅通过微信小程序提供，无需至eCommerce官网订阅。',
        },
      ]
    }
  },

  //顶部导航栏，这里是用于自定义tarbar用的
  toolbar: {
    "list": [{
      "pagePath": "/pages/Home/index",
      "text": "首页",
      "iconPath": "/assets/img/tabs/home.png",
      "selectedIconPath": "/assets/img/tabs/home_selected.png"
    },
    {
      "pagePath": "/pages/Query/index",
      "text": "查询",
      "iconPath": "/assets/img/tabs/query.png",
      "selectedIconPath": "/assets/img/tabs/query_selected.png"
    },
    {
      "pagePath": "/pages/Quotation/Search/index",
      "text": "报价",
      "iconPath": "/assets/img/tabs/price.png",
      "selectedIconPath": "/assets/img/tabs/price_selected.png"
    },
    {
      "pagePath": "/pages/My/index",
      "text": "我的",
      "iconPath": "/assets/img/tabs/mine.png",
      "selectedIconPath": "/assets/img/tabs/mine_selected.png"
    }
    ]
  }
}

module.exports = {
  lang: Languague
}