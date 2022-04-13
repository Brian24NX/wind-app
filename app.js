// app.js

App({
  onLaunch() {
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    wx.removeStorageSync('polobject')
    wx.removeStorageSync('podobject')
    wx.setStorageSync('setHangXian', false)
    // 展示本地存储能力
    wx.getSystemInfo({
      success: res => {
        let Height = res.windowHeight;
        this.globalData.Height = Height;
      },
    })
    // 自定义头部
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width, // 胶囊按钮与右侧的距离 = windowWidth - right+胶囊宽度
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight; //导航栏总体高度
        this.globalData.navTop = navTop; //胶囊距离顶部距离
        this.globalData.navObj = menuButtonObject.height; //胶囊高度
        this.globalData.navObjWid = navObjWid; //胶囊宽度(包括右边距离)
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.windowWidth = res.windowWidth;
        if (res.model.indexOf('iPhone X') > -1 || res.model.indexOf('iPhone 11') > -1 || res.model.indexOf('iPhone 12') > -1 || res.model.indexOf('iPhone 13') > -1) {
          this.globalData.isPhoneX = true;
        } else {
          this.globalData.isPhoneX = false;
        }
        // console.log(navHeight,navTop,menuButtonObject.height,navObjWid)
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: null,
    share: false, //默认分享为false
    height: 0,
    version: 0, // 0中文 1英文
    isPhoneX: false,
    // 全局的方法, 获取到App的实例就可以拿到方法
    function: {

    }
  }
})