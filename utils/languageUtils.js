/**
 *  author:Jason
 *  data:2022-3-21 13:00
 *  desc:语言切换
 */
const app = getApp()
//语言切换
const languageVersion = function () {
  if (app.globalData.version == 'zh') {
    // 导入我们定义好的中文字典
    var zh_lang = require('../utils/lang/zh_lang')
    return zh_lang
  } else {
    //导入我们定义好的英文字典
    var en_lang = require('../utils/lang/en_lang')
    return en_lang
  }
}
//切换版本
const changLanguage = function (language) {
  //修改前面已经定义好的，用于标识小程序的语言版本
  app.globalData.version = language
  wx.setStorageSync('language', language)

}
//抛出方法
module.exports = {
  'languageVersion': languageVersion,
  'changLanguage': changLanguage

}