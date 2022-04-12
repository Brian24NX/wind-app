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
const sortNumber = property => {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}
/**
 * url参数解析
 */
const getUrlkey = url => {
  var parmas = {};
  var urls = url.spilt("?");
  if (urls[1]) {
    var arr = urls[1].spilt("&");
    for (var i = 0, l = arr.length; i < l; i++) {
      var a = arr[i].spilt("=");
      params[a[0]] = a[1]
    }
    return parmas;
  } else {
    return urls[0];
  }
}
/**
 *  节流函数
 * des：主要防止按钮重复提交等情况了w
 */
function throttle(fn, interval) {
  var enterTime = 0; //触发的时间
  var gapTime = interval || 300; //间隔时间，如果interval不传，则默认为300ms
  return function () {
    var context = this;
    var backTime = new Date(); //第一次return触发时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}
/**
 *  防抖函数
 *  desc:主要用于input输入框，显示匹配的输入内容
 */
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 1000;
  return function () {
    clearTimeout(timer);
    var context = this;
    var args = arguments; //保存此处的arguments,因为setTimeout是全局的，arguments不是防抖函数需要的
    timer = setTimeout(function () {
      fn.call(context, args);
    }, gapTime);
  };
}

/**
 * 格式化货运状态
 */
function formatHuoYunStatus(code) {
  let codeArr = [{
      code: 'MEA',
      label: '空集装箱在堆场'
    },
    {
      code: 'MOS',
      label: '空集装箱已交付托运人'
    },
    {
      code: 'XRX',
      label: '准备载货'
    },
    {
      code: 'XOF',
      label: '装船'
    },
    {
      code: 'TDF',
      label: '转运港卸货'
    },
    {
      code: 'TOF',
      label: '装船'
    },
    {
      code: 'IDF',
      label: '已卸货'
    },
    {
      code: 'IFC',
      label: '集装箱已送达收货人'
    },
    {
      code: 'TAF',
      label: ''
    },
    {
      code: 'PSI',
      label: ''
    },
    {
      code: 'IRA',
      label: ''
    },
    {
      code: 'IRI',
      label: ''
    },
    {
      code: 'IIT',
      label: '已收到做出口转移'
    },
    {
      code: 'XLR',
      label: '出口铁路装载'
    },
    {
      code: 'TPF',
      label: '集装箱中转出口'
    },
    {
      code: 'PSE',
      label: '集装箱出口上轨'
    },
    {
      code: 'XUR',
      label: '出口铁路卸载'
    },
    {
      code: 'ETA_FINAL_DISCHARGE',
      label: '到达最终卸货港'
    }
  ]
  const index = codeArr.findIndex(item => item.code === code)
  if (index > -1) {
    return codeArr[index].label || codeArr[index].code
  } else {
    return code
  }
}

function getDayList(date, time) {
  var myDate = new Date(date);
  myDate.setDate(myDate.getDate() - time);
  var dateArray = [];
  var dateTemp;
  var flag = 1;
  // 日期格式化
  for (var i = 0; i < time * 2 + 1; i++) {
    let month = 0;
    // 月小于10，在前面加‘0’；因为月从0开始，故需+1
    if (myDate.getMonth() + 1 < 10) {
      month = '0' + (myDate.getMonth() + 1);
    } else {
      month = myDate.getMonth() + 1;
    }
    let day = 0;
    // 日小于10，在前加0
    if (myDate.getDate() < 10) {
      day = '0' + myDate.getDate();
    } else {
      day = myDate.getDate();
    }
    // YY-MM-DD
    dateTemp = myDate.getFullYear() + '-' + month + '-' + day;
    dateArray.push(dateTemp);
    //若不加flag则结果都是一个日期（当前日期减time天）
    //日期 +1 天，此日期为减time天后的日期
    myDate.setDate(myDate.getDate() + flag);
  }
  return dateArray
}

function substrTime(date) {
  if (date.indexOf('T') > -1) {
    date = date.split('T')[0] + ' ' + date.split('T')[1].split('+')[0].split('-')[0]
  }
  return date
}

module.exports = {
  formatTime,
  skipNulls,
  sortNumber,
  getUrlkey,
  throttle,
  debounce,
  formatHuoYunStatus,
  getDayList,
  substrTime
}