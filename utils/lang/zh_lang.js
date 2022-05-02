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
    // 校验
    verifyInfo: {
      // 必填
      required: '此项为必填项',
      // 格式无效
      gswx: '号码无效，请检查格式',
      more3: '最多可同时查询三个货柜状态，请重新输入',
      chongfu: '号码重复，请检查后输入'
    },
    // 首页
    homeInfo: {
      hometitle: "CAM CGM",
      // 获取追踪
      TRACKING: '货物追踪',
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
      //1 星期
      oneWeek: "1 星期",
      //2 星期
      twoWeek: "2 星期",
      //3 星期
      threeWeek: "3 星期",
      //4 星期
      fourWeek: "4 星期",
      //查询历史
      history: "查询历史"
    },
    //航线查询结果列表
    searchResultList: {
      //日历
      calendar: "日历",
      //星期一
      mon: "星期一",
      //星期二
      tue: "星期二",
      //周三
      wed: "星期三",
      //周四
      thur: "星期四",
      //周五
      fri: "星期五",
      //周六
      sat: "星期六",
      //周日
      sun: "星期日",
      //排序
      sortBy: "排序",
      //最快离港
      earliestDeparture: "最快离港",
      //最快到港
      earliestArrival: "最快到港",
      //离港
      depart: "离港",
      //最快运输时间
      fastestTransit: "最快运输时间",
      // 最佳碳足迹
      bestCarbonfootpint: "最佳碳足迹",
      //航线方案，航线方案1
      routingSolutions: "航线方案，航线方案1",
      //仅看最早出发
      earliestArrivalOnly: "仅看最早出发",
      //仅看直达
      directOnly: "仅看直达",
      //4条航线方案
      fourSolutions: "4条航线方案",
      // 4天
      fourDays: "4天",
      //抱歉，我们暂未查询到匹配的航线方案.
      noFindTips: "抱歉，我们暂未查询到匹配的航线方案."
    },
    //routeDetails航线查询详情
    routeDetails: {
      //验证集装箱重量截止时间
      vgmCutOff: "验证集装箱重量截止时间",
      //港口截关时间
      portCutOff: "港口截关时间",
      //本地航次
      localVoyageRef: "本地航次",
      //航次
      vouageRef: "航次",
      //转运
      transhipment: "转运",
      // 起运港
      pol: "起运港",
      // 卸货港
      pod: "卸货港",
    },
    //shipmentTracking货物追踪
    shipmentTracking: {
      // 运输详情
      trackingDetails: "运输详情",
      // 订舱号 JXTLXXXXX
      bookingJxtl: "订舱号JXTLXXXXX",
      // 重新搜索
      newSearch: "重新搜索",
      // 预计到港时间
      eta: "预计到港时间",
      // 集装箱号
      contianer: "集装箱号",
      // 目的港预计靠泊时间
      etaBerthAtPod: "目的港预计靠泊时间",
      // 剩余航程
      remaining: "剩余航程",
      // 导出pdf
      exportPdf: "导出pdf",
      // 空集装箱抵达堆场
      emptyToDepot: "空集装箱抵达堆场",
      // 空集装箱已交付托运人
      emptyToShipper: "空集装箱已交付托运人",
      // 准备卸货
      readyToBeLoaded: "准备卸货",
      // 装船
      loadedOnBoard: "装船",
      // 转运港卸货
      dischargedInTranshipment: "转运港卸货",
      // 到达最终卸货港
      arrivalFinalPortOf: "到达最终卸货港",
      // 星期三
      wendnesday: "星期三",
      // 23-2月-2022
      date: "23-2月-2022",
      // 集装箱正柜在托运人处
      containertoconsignee: "集装箱正柜在托运人处",
      // 未查询到相关结果
      noResult: "未查询到相关结果",
      //最多可同时查询三个集装箱状态，请重新输入.
      threeContainers: "最多可同时查询三个集装箱状态，请重新输入.",
      //号码无效，请检查格式。例如：ABCD1234567
      referencesIsNotValid: "号码无效，请检查格式。例如：ABCD1234567",
      //集装箱暂未开始运输.
      containerCycle: "集装箱暂未开始运输.",
      //暂未查询到运输动态，或该集装箱已卸货/返回堆场。
      containerNotFount: "暂未查询到运输动态，或该集装箱已卸货/返回堆场.",
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
      systemIsBusyNow: "系统繁忙,请稍后重试"
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