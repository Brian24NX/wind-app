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
      more3: '最多可同时查询三个货柜状态，请重新输入',
      chongfu: '号码重复，请检查后输入',
      input: '请输入',
      select: '请选择'
    },
    // 首页
    homeInfo: {
      hometitle: "CMA CGM",
      // 获取追踪
      TRACKING: '货物追踪',
      chuanqi1: '货物',
      chuanqi2: '追踪',
      // 提示
      goodsRemind: '输入货柜号，提单号或订舱号',
      //货物追踪
      goods: "搜索",
      //提示
      tips: "最多可同时查询三个货柜状态，请输入货柜号并用逗号隔开",
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
      ddRate: "柜租费率",
      //查询费率
      chargeFinder: "查询费率",
      // 发现更多
      more: '发现更多',
      // cmacgm
      cma: 'CMA CGM+',
      // 关于我们
      about: '关于达飞',
      //新闻资讯
      news: "新闻中心",
      // 在线服务
      onlineServices: '在线服务',
      //增值服务
      valueAddedService: "客户通告",
      template: '常用模版及链接',
      // 管制品
      gzp: '管制品查询',
      // 联系我们
      callMe: '联系我们'
    },
    khtg: {
      topTitle: '业务及运营\n信息更新',
      send: '发送至邮箱'
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
      dingdan: '请输入订单号',
      accountName: '请填写您所在的公司名称',
      submitBtn: '提交并获取联系信息',
      noOrder: '无法找到相关订舱号，请提供更多信息'
    },
    callMeResult: {
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
      gzp: '管制品查询',
      gzfl: '柜租费率',
      cxfl: '查询费率'
    },
    // 查询结果
    queryRes: {
      topTitle: '查询',
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
      protOfLanding: "起运港",
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
      day: '天',
      days: '天',
      transhipment: '转运',
      transhipments: '转运',
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
      dest: '最终目的地'
    },
    popupBtn: {
      confirm: '确定',
      cancel: '取消'
    },
    copyInfo: {
      success: '已复制，请前往浏览器打开'
    },
    load: {
      //努力加载中
      loading: "努力加载中...",
      //网络不给力,请稍后刷新
      networkIsNotWorking: "网络不给力,请稍后刷新",
      // 功能升级中,敬请期待
      functionIsUnderDevelopment: "功能升级中，敬请期待",
      chaoshi: '请求超时，请稍后再试',
      // 系统繁忙,请稍后重试
      systemIsBusyNow: "系统繁忙,请稍后重试",
      // 暂无更多数据
      noMoreData: '暂无更多数据',
      // 发送中
      send: '发送中...',
      sendSuccess: '发送成功，请前往邮箱查看'
    },
    email: {
      title: '请输入邮箱地址',
      exprise: '请输入正确的邮箱地址',
      send: '发送'
    }
  },

  //顶部导航栏，这里是用于自定义tarbar用的
  toolbar: {
    "list": [{
        "pagePath": "../Home/index",
        "text": "首页",
        "iconPath": "/assets/img/tabs/home.png",
        "selectedIconPath": "/assets/img/tabs/home_selected.png"
      },
      {
        "pagePath": "../Query/index",
        "text": "查询",
        "iconPath": "/assets/img/tabs/query.png",
        "selectedIconPath": "/assets/img/tabs/query_selected.png"
      },
      {
        "pagePath": "../Quotation/index",
        "text": "报价",
        "iconPath": "/assets/img/tabs/price.png",
        "selectedIconPath": "/assets/img/tabs/price_selected.png"
      },
      {
        "pagePath": "../My/index",
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