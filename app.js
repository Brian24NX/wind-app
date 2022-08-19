// app.js
const config = require('./config/config')

require("./utils/webmonitor.mp.min")
/**
 * 初始化用户信息
 * @param userId 用户唯一性标识 (手机号、用户名、id等)
 * @param userTag 用于区分同一个项目下，角色的分类（公司A, B, C, D等）
 * @param projectVersion 应用每次发布的版本号
 */

if (!wx.getStorageSync('openId')) {
  wx.login({
    success(res) {
      wx.request({
        url: config[config.dev_env].url + '/api/miniapp/wx/user/login?code=' + res.code,
        success(data) {
          wx.setStorageSync('openId', data.data.data)
        }
      })
    }
  })
}

App({
  onLaunch() {
    this.autoUpdate()
    wx.removeStorageSync('polobject')
    wx.removeStorageSync('podobject')
    wx.removeStorageSync('details')
    wx.setStorageSync('setHangXian', false)
    this.globalData.version = wx.getStorageSync('language') ? wx.getStorageSync('language') : 'zh'
    wx.loadFontFace({
      global: true,
      family: 'Antonio-Bold',
      source: 'url("https://wind.cma-cgm.com/ttf/Antonio-Bold.ttf")'
    })
    wx.loadFontFace({
      global: true,
      family: 'Antonio-Regular',
      source: 'url("https://wind.cma-cgm.com/ttf/Antonio-Regular.ttf")'
    })
    wx.loadFontFace({
      global: true,
      family: 'Antonio-Light',
      source: 'url("https://wind.cma-cgm.com/ttf/Antonio-Light.ttf")'
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
      fail(err) {}
    })
  },
  autoUpdate: function () {
    var self = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: 'Warm prompt',
            content: 'If a new version is detected, determine whether to download the new version and restart the applet?',
            confirmText: 'Sure',
            cancelText: "Cancel",
            success: function (res) {
              if (res.confirm) {
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                wx.clearStorageSync()
                self.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: 'Warm prompt',
                  content: 'This version update involves the addition of new functions, and the old version cannot be accessed',
                  showCancel: false,//隐藏取消按钮
                  confirmText: "Confirm",//只保留确定更新按钮
                  success: function (res) {
                    if (res.confirm) {
                      //下载新版本，并重新应用
                      wx.clearStorageSync()
                      self.downLoadAndUpdate(updateManager)
                    }
                  }
                })
              }
            }
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: 'Warm prompt',
        content: 'The current wechat version is too early to use this function. Please upgrade to the latest wechat version and try again.',
        confirmText: 'Sure',
        cancelText: 'Cancel'
      })
    }
  },
  /**
   * 下载小程序新版本并重启应用
   */
  downLoadAndUpdate: function (updateManager) {
    wx.showLoading();
    //静默下载更新小程序新版本
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: 'There is a new version already',
        content: 'The new version has been online, please delete the current small program, search again open.',
        confirmText: 'Sure'
      })
      wx.hideLoading()
    })
  },
  globalData: {
    version: 'zh',
    isPhoneX: false,
    // 全局的方法, 获取到App的实例就可以拿到方法
    function: {

    }
  }
})