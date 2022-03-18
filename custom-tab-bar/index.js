var app=getApp()
var languageUtil=require('../utils/languageUtils')
Component({
  data: {
    version:0,
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
   "list": [
    ]
  },
  attached() {
      console.log(this.list);
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
//切换导航栏，标识导航栏下标
      this.setData({
        selected: data.index
      })
    //  console.log(url)
    //点击导航栏，跳转到对应页面上
      wx.switchTab({url:url})
    }  
  }
})