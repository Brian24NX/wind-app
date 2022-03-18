// app.js
import locales from './utils/locales';
import T from './utils/i18n';
T.registerLocale(locales);
//当前语言设置为用户上一次选择的语言，如果是第一次使用，则调用 T.setLocaleByIndex(0) 将语言设置成中文
T.setLocaleByIndex(wx.getStorageSync('langIndex') || 0);
//将 T 注册到 wx 之下，这样在任何地方都可以调用 wx.T.getLanguage() 来得到当前的语言对象了。
wx.T = T;
App({
  onLaunch() {
    // 判断是否由分享进入小程序
    // if (e.scene == 1007 || e.scene == 1008) {
    //   this.globalData.share = true
    // } else {
    //   this.globalData.share = false
    // };
    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
    //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
    //虽然最后解决了，但是花费了不少时间
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
      }
    })
    // 在这里处理一下 默认语言
    // 获取本地存储的 语言包的数组下标
    let langFlag = wx.getStorageSync('langIndex') || 0;
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
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    version:0,//0 为中文  1为英文
    // 全局的方法, 获取到App的实例就可以拿到方法
    function: {

    }
  }
})