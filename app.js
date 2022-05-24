// app.js
const config = require('./config/config')

require("./utils/webmonitor.mp.min")
/**
 * 初始化用户信息
 * @param userId 用户唯一性标识 (手机号、用户名、id等)
 * @param userTag 用于区分同一个项目下，角色的分类（公司A, B, C, D等）
 * @param projectVersion 应用每次发布的版本号
 */
wx.setStorageSync('wmUserInfo', JSON.stringify({userTag: "达飞轮船", projectVersion: "1.0.0", env: "pro"}))

App(wx.webfunny({
  onLaunch() {
    wx.removeStorageSync('polobject')
    wx.removeStorageSync('podobject')
    wx.removeStorageSync('details')
    wx.setStorageSync('setHangXian', false)
    if (wx.getStorageSync('language') === 'us') {
      this.globalData.version = 1
    } else {
      this.globalData.version = 0
    }
    const antonioBold = 'url("' + config[config.dev_env].url + '/ttf/Antonio-Bold.ttf' + '")'
    const antonioRegular = 'url("' + config[config.dev_env].url + '/ttf/Antonio-Regular.ttf' + '")'
    const antonioLight = 'url("' + config[config.dev_env].url + '/ttf/Antonio-Light.ttf' + '")'
    wx.loadFontFace({
      global: true,
      family: 'Antonio-Bold',
      source: antonioBold
    })
    wx.loadFontFace({
      global: true,
      family: 'Antonio-Regular',
      source: antonioRegular
    })
    wx.loadFontFace({
      global: true,
      family: 'Antonio-Light',
      source: antonioLight
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
      },
      fail(err) {
        // console.log(err);
      }
    })
  },
  globalData: {
    version: 0, // 0中文 1英文
    isPhoneX: false,
    // 全局的方法, 获取到App的实例就可以拿到方法
    function: {

    }
  }
}))