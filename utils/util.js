const config = require('../config/config')

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
function formatHuoYunStatus(code, language) {
  let codeArr = [{
      code: 'MAC',
      labelEn: "Empty at Consignee's yard",
      labelCn: '空箱在收货人堆场'
    },
    {
      code: 'MAS',
      labelEn: "Empty at Shipper’s yard",
      labelCn: '空箱在发货人堆场'
    },
    {
      code: 'MEF',
      labelEn: "Empty available food grade",
      labelCn: '食品空集装箱可用'
    },
    {
      code: 'MEG',
      labelEn: "Empty available general cargo",
      labelCn: '普通货物空集装箱可用'
    },
    {
      code: 'MEM',
      labelEn: "Empty available scrap metal",
      labelCn: '金属货物空集装箱可用'
    },
    {
      code: 'FAC',
      labelEn: "Full at CEE's Premises",
      labelCn: '已在CEE装箱'
    },
    {
      code: 'MOH',
      labelEn: "On Hired empty",
      labelCn: 'On Hired empty'
    },
    {
      code: 'MEA',
      labelEn: "Empty In Depot Available",
      labelCn: '空集装箱在堆场'
    },
    {
      code: 'FCR',
      labelEn: "Off Hire Full",
      labelCn: '退租箱已载满'
    },
    {
      code: 'FDF',
      labelEn: "DI From Full",
      labelCn: 'DI From Full'
    },
    {
      code: 'FRO',
      labelEn: "Return After SL Out Full",
      labelCn: 'Return After SL Out Full'
    },
    {
      code: 'FSO',
      labelEn: "Sublease Out Full",
      labelCn: '转租箱已载满'
    },
    {
      code: 'IFP',
      labelEn: "Import Full Quay Unstuffing",
      labelCn: '进口码头拆箱'
    },
    {
      code: 'IIT',
      labelEn: "Received Full Exp for Transfer",
      labelCn: '已收到做出口转移'
    },
    {
      code: 'IRI',
      labelEn: "Arrival at dest full import",
      labelCn: '已收到做进口转移'
    },
    {
      code: 'MCR',
      labelEn: "Off Hire Empty",
      labelCn: '退租箱已空箱'
    },
    {
      code: 'MED',
      labelEn: "Empty Damaged",
      labelCn: '集装箱破损'
    },
    {
      code: 'MEI',
      labelEn: "Empty in depot to be inspected",
      labelCn: '集装箱在堆场待检验'
    },
    {
      code: 'MES',
      labelEn: "Empty For Quay",
      labelCn: '集装箱货运站装货'
    },
    {
      code: 'MOS',
      labelEn: "Deliver Empty to Shipper/Empty to Shipper",
      labelCn: '空集装箱已交付托运人'
    },
    {
      code: 'MSF',
      labelEn: "In shipper's owned full",
      labelCn: "托运人自有整柜进集装箱堆场"
    },
    {
      code: 'MSO',
      labelEn: "In shipper's owned empty",
      labelCn: "In shipper's owned empty"
    },
    {
      code: 'RSF',
      labelEn: "Out shipper's owned full",
      labelCn: "托运人自有整柜出集装箱堆场"
    },
    {
      code: 'TDF',
      labelEn: "Tship discharged full",
      labelCn: "转运港卸货"
    },
    {
      code: 'XLR',
      labelEn: "Full Load on rail for export",
      labelCn: "出口铁路装载"
    },
    {
      code: 'XRA',
      labelEn: "Train arrival for export",
      labelCn: "出口铁路到达"
    },
    {
      code: 'XUR',
      labelEn: "Export unload full from rail",
      labelCn: "出口铁路卸载"
    },
    {
      code: 'ILR',
      labelEn: "Full Load on rail for import",
      labelCn: "集装箱已满载做进口"
    },
    {
      code: 'IRA',
      labelEn: "Train arrival for import",
      labelCn: "进口铁路到达"
    },
    {
      code: 'IUR',
      labelEn: "Import unload full from rail",
      labelCn: "进口铁路卸载"
    },
    {
      code: 'REX',
      labelEn: "Reused for export",
      labelCn: "Reused for export"
    },
    {
      code: 'XRX',
      labelEn: "Ready to be Loaded",
      labelCn: "准备载货"
    },
    {
      code: 'XOF',
      labelEn: "Loaded on Board",
      labelCn: "装船"
    },
    {
      code: 'TOF',
      labelEn: "Loaded on Board",
      labelCn: "装船"
    },
    {
      code: 'IDF',
      labelEn: "Discharged",
      labelCn: "已卸货"
    },
    {
      code: 'IFC',
      labelEn: "Container to Consignee",
      labelCn: "集装箱已送达收货人"
    },
    {
      code: 'TAF',
      labelEn: "Containerintransitforimport",
      labelCn: "集装箱中转进口"
    },
    {
      code: 'PSI',
      labelEn: "ContainerOnRailForImport",
      labelCn: "集装箱进口上轨"
    },
    {
      code: 'TPF',
      labelEn: "Container in Transit for Export",
      labelCn: "集装箱中转出口"
    },
    {
      code: 'PSE',
      labelEn: "ContainerOnRailForExport",
      labelCn: "集装箱出口上轨"
    },
    {
      code: 'ETA_FINAL_DISCHARGE',
      labelEn: "Arrival Final Port of",
      labelCn: "到达最终卸货港"
    },
    {
      code: 'ETA_DISCHARGE',
      labelEn: "ETA_DISCHARGE",
      labelCn: "卸货"
    },
    {
      code: 'ETA_DEPATURE',
      labelEn: "ETA_DEPATURE",
      labelCn: "离港时间"
    },
    {
      code: 'ETA_LOAD',
      labelEn: "ETA_LOAD",
      labelCn: "装货"
    },
    {
      code: 'RSM',
      labelEn: "Out shipper's owned empty",
      labelCn: "托运人自有空柜出集装箱堆场"
    },
    {
      code: 'MDE',
      labelEn: "EMPTY IN DEPOT",
      labelCn: "集装箱在堆场"
    },
    {
      code: 'PVD',
      labelEn: "Vessel Departure",
      labelCn: "船离开"
    },
    {
      code: 'AVD',
      labelEn: "Vessel Departure",
      labelCn: "船离开"
    },
    {
      code: 'PVA',
      labelEn: "Vessel Arrival",
      labelCn: "船到达"
    },
    {
      code: 'AVA',
      labelEn: "Vessel Arrival",
      labelCn: "船到达"
    }
  ]
  const index = codeArr.findIndex(item => item.code === code)
  if (index > -1) {
    return language === 'zh' ? codeArr[index].labelCn : codeArr[index].labelEn
  } else {
    return code
  }
}

// 格式化文件状态
function formatDocumentStatus(status, language) {
  const statusList = [{
    labelEn: "To be reviewed",
    labelCn: "等待审核"
  }, {
    id: '2',
    labelEn: "Review Sent",
    labelCn: "已发送审核"
  }, {
    labelEn: "Approved",
    labelCn: "已确认"
  }, {
    id: '4',
    labelEn: "Modif. requested",
    labelCn: "修改请求"
  }, {
    id: '5',
    labelEn: "Available",
    labelCn: "可使用的"
  }, {
    id: '6',
    labelEn: "To be printed",
    labelCn: "等待打印"
  }, {
    labelEn: "Original printed",
    labelCn: "正本已打印"
  }, {
    id: '9',
    labelEn: "Copy Available",
    labelCn: "提单副本可打印"
  }, {
    labelEn: "Printed By The Carrier",
    labelCn: "船公司虚拟打印"
  }, {
    id: '14',
    labelEn: "Surrendered",
    labelCn: "已交付"
  }, {
    id: '15',
    labelEn: "Switched to Paper",
    labelCn: "转换成纸质"
  }, {
    labelEn: "Canceled",
    labelCn: "取消"
  }, {
    labelEn: "Printed & Modif request sent",
    labelCn: "已打印并已提交修改"
  }, {
    labelEn: "Printed & Modify request sent",
    labelCn: "已打印并已提交修改"
  }, {
    labelEn: "Printed & Modif. request sent",
    labelCn: "已打印并已提交修改"
  }, {
    id: '51',
    labelEn: "Transferred",
    labelCn: "已移交"
  }, {
    id: '52',
    labelEn: "Owned BL",
    labelCn: "持有"
  }]
  const index = statusList.findIndex(item => item.id === status)
  if (index > -1) {
    return language === 'zh' ? statusList[index].labelCn : statusList[index].labelEn
  } else {
    return status
  }
}

// 格式化单证类型
function formatDocumentCategory(category) {
  const categoryList = [{
    id: 'BKGCF',
    label: 'Booking Confirmation'
  }, {
    id: 'BKGREQ',
    label: 'Booking Request'
  }, {
    id: 'NOA',
    label: 'Arrival Notice'
  }, {
    id: 'SIREQ',
    label: 'SI Request'
  }, {
    id: 'BL Negotiable',
    label: 'B/L Negotiable'
  }, {
    id: 'BL Waybill',
    label: 'B/L Waybill'
  }]
  const index = categoryList.findIndex(i => i.id === category.trim())
  if (index > -1) {
    return categoryList[index].label
  } else {
    return category
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
  if (!date) return ''
  if (date.indexOf('T') > -1) {
    date = date.split('T')[0] + ' ' + date.split('T')[1].split('+')[0].split('-')[0].split('Z')[0]
  }
  return date
}
/*
 *  货运状态
 */
// 判别陆运种类
var judgLand = function (obj) {
  if (!obj) return false;
  if (obj == 'RAIL') {
    return true;
  } else if (obj == 'TRUCK') {
    return true;
  } else if (obj == 'TRUCK / RAIL') {
    return true;
  } else if (obj == 'FEEDER') {
    return true;
  } else if (obj == 'INTERMODAL') {
    return true;
  } else {
    return false;
  }
}

function formatEnDateLocal(date) {
  var dt = new Date(date.split('T')[0].replaceAll('-', '/'));
  var m = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec");
  var week = new Array("Sunday", "Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday");
  var mn = dt.getMonth(),
    wn = dt.getDay(),
    dn = dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()
  return week[wn - 1] + '，' + m[mn] + " " + dn + "，" + dt.getFullYear()
}

// 校验token
function checkAccessToken() {
  if (!wx.getStorageSync('access_token') || !wx.getStorageSync('expires_time')) {
    wx.removeStorageSync('access_token')
    wx.removeStorageSync('expires_time')
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('ccgId')
    wx.removeStorageSync('partnerCode')
    wx.removeStorageSync('shipCompanyList')
    wx.removeStorageSync('rights')
    wx.removeStorageSync('partnerList')
    return false
  } else {
    if (new Date(wx.getStorageSync('expires_time')).getTime() - new Date().getTime() < 0) {
      wx.removeStorageSync('access_token')
      wx.removeStorageSync('expires_time')
      wx.removeStorageSync('userInfo')
      wx.removeStorageSync('ccgId')
      wx.removeStorageSync('partnerCode')
      wx.removeStorageSync('shipCompanyList')
      wx.removeStorageSync('rights')
      wx.removeStorageSync('partnerList')
      return false
    } else {
      wx.setStorageSync('expires_time', this.setExpiresTime(config.expiresIn * 60 - 1))
      return true
    }
  }
}

// 格式化过期时间
function setExpiresTime(expiresIn) {
  let expiresTime = new Date().getTime() + Number(expiresIn * 1000)
  var date = new Date(expiresTime),
    Y = date.getFullYear(),
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
    D = date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
    h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
    m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
    s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s
}

// 判断权限
function checkPermission(permission) {
  if (!permission) return false
  const rights = wx.getStorageSync('rights')
  return rights.indexOf(permission) > -1 ? true : false
}

function checkValidDate(startDate, endDate) {
  if (!startDate || !endDate) return ''
  if (startDate.indexOf('T') > -1) {
    startDate = startDate.split('T')[0] + ' 00:00:00'
  }
  if (endDate.indexOf('T') > -1) {
    endDate = endDate.split('T')[0] + ' 23:59:59'
  }
  startDate = startDate.split('-').join('/')
  endDate = endDate.split('-').join('/')
  // valid : expired : coming
  if (new Date().getTime() - new Date(startDate).getTime() > 0 && new Date(endDate).getTime() - new Date().getTime() > 0) return 'valid'
  if (new Date().getTime() - new Date(startDate).getTime() < 0) return 'coming'
  if (new Date().getTime() - new Date(endDate).getTime() > 0) return 'expired'
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
  substrTime,
  judgLand,
  formatEnDateLocal,
  checkAccessToken,
  setExpiresTime,
  formatDocumentStatus,
  formatDocumentCategory,
  checkPermission,
  checkValidDate
}