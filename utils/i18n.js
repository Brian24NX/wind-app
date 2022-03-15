/**
 *  author:Jason
 *  time:2022-03-15 17:56:03
 *  desc:国际化
 */
let T={
    locale:null,//zh-cn en
    locales:{},//语言包内容
    langCode:['zh-cn','en']
}
T.registerLocale=function(locales){
     T.locales=locales;  //将语言包里的对象赋给当前对象的locales属性
}
T.setLocale=function(code){
    T.locale=code;
}
T.setLocaleByIndex=function(index){
    T.setLocale(T.langCode[index]);
}
T.getLanguage=function(){
    return T.locales[T.locale];
}
export default T;