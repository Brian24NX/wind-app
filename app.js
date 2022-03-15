// app.js
import locales from './utils/locales';
import T from './utils/i18n';
T.registerLocale(locales);
//当前语言设置为用户上一次选择的语言，如果是第一次使用，则调用 T.setLocaleByIndex(0) 将语言设置成中文
T.setLocaleByIndex(wx.getStorageSync('langIndex')|| 0);
//将 T 注册到 wx 之下，这样在任何地方都可以调用 wx.T.getLanguage() 来得到当前的语言对象了。
wx.T=T;
App({
  onLaunch() {
        // 在这里处理一下 默认语言
    // 获取本地存储的 语言包的数组下标
    let langFlag = wx.getStorageSync('langIndex')  || 0;
    // 存储 当前应用的对象 键
    wx.T.setLocaleByIndex(langFlag);
    // 存储 当前选中语言的下标
    wx.setStorageSync('langIndex', langFlag);
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    // 全局的方法, 获取到App的实例就可以拿到方法
    function: {

    }
  }
})
