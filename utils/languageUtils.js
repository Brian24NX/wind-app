/*
*  author:Jason
*  time:2022-3-14 12:32:05
*  desc: langchange切换
*/
const app= getApp();
const languageVersion=function(){
    var lang=wx.getStorageSync('lang')?wx.getStorageSync('lang'):'zh'
    console.log(lang);
    if(lang=='zh'){
        var zh_lang=require('./lang/zh-lang')
        return zh_lang
    }
    else{
        var en_lang=require('./lang/en-lang')
        return en_lang
    }
}
//切换版本
const changeLanguage=function(){
    var lang=wx.getStorageSync('lang')?wx.getStorageSync('lang'):'zh'
    if(lang=='zh'){
        wx.setStorageSync('lang','en')
    }
    else{
        wx.setStorageSync('lang','zh')
    }
}
//抛出方法
module.exports={
    'languageVersion':languageVersion,
    'changeLanguage':changeLanguage
}