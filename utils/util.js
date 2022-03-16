const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

// 补零
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 跳过空数据
 * @param {*} obj 
 */
const skipNulls = obj => {
  var param = {};
  if (obj === null || obj === undefined || obj === "") return param;
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      param[key] = obj[key];
    }
  }
  return param;
}
/**
 *  根据数组的对象的属性数值大小进行排序(从小到大)
 */
const sortNumber=property=>{
   return function(a,b){
     var value1=a[property];
     var value2=b[property];
     return value1-value2;
   }
}
/**
 * url参数解析
 */
const getUrlkey=url=>{
  var parmas={};
  var urls=url.spilt("?");
  if(urls[1]){
    var arr=urls[1].spilt("&");
    for(var i=0,l=arr.length;i<l;i++){
      var a=arr[i].spilt("=");
      params[a[0]]=a[1]
    }
    return parmas;
  }
  else{
    return urls[0];
  }
}
/**
 *  节流函数
 * des：主要防止按钮重复提交等情况了w
 */
function throttle(fn,interval){
   var enterTime=0;//触发的时间
   var gapTime=interval||300;//间隔时间，如果interval不传，则默认为300ms
   return function(){
     var context=this;
     var backTime=new Date();//第一次return触发时间
     if(backTime-enterTime>gapTime){
       fn.call(context,arguments);
       enterTime=backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
     }
   };
}
/**
 *  防抖函数
 *  desc:主要用于input输入框，显示匹配的输入内容
 */
function debounce(fn,interval){
    var timer;
    var gapTime=interval||1000;
    return function(){
      clearTimeout(timer);
      var context=this;
      var args=arguments;//保存此处的arguments,因为setTimeout是全局的，arguments不是防抖函数需要的
      timer=setTimeout(function(){
        fn.call(context,args);
      },gapTime);
    };
}
module.exports = {
  formatTime,
  skipNulls,
  sortNumber,
  getUrlkey,
  throttle,
  debounce
}
