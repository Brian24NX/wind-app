/**
 * author:Jason
 * date:2022-3-22 14:02
 * desc: 自定义tabbar 底部导航栏
 */
Component({
  data: {
    show: true,
    version: 0,
    selected: 0,
    color: "#6B7790",
    selectedColor: "#04246A",
    list: [{
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
        "pagePath": "/pages/Quotation/index",
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
  },
  attached() {},
  show() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      //切换导航栏，标识导航栏下标
      this.setData({
        selected: data.index
      })
      //点击导航栏，跳转到对应页面上
      wx.switchTab({
        url: url
      })
    }
  }
})