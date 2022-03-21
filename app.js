// app.js

App({
  onLaunch() {
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSystemInfoAsync({
      success: (res) => {
        this.globalData.height=res.statusBarHeight
      },
    })
  },
  globalData: {
    userInfo: null,
    share:false,//默认分享为false
    height:0,
    version:0,// 0中文 1英文
    // 全局的方法, 获取到App的实例就可以拿到方法
    function: {

    }
  }
})