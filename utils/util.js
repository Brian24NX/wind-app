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
module.exports = {
  formatTime,
  skipNulls,
  sortNumber,
  getUrlkey
}
