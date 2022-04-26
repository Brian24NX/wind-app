const {
  getRequest,
  postRequest
} = require('../http')

// 获取首页数据
export const GetHomeData = (params) => {
  return getRequest('/getHome')
}
// 获取航线查询数据
export const routingFinder = (params) => {
  let obj = {
    placeOfDischarge: params.placeOfDischarge,
    placeOfLoading: params.placeOfLoading,
    arrivalDate: params.arrivalDate,
    departureDate: params.departureDate,
    searchRange: params.searchRange,
    shippingCompany: params.shippingCompany,
    specificRoutings: ""
  }
  return getRequest('/api/routing-finder', obj)
}
// 获取货物追踪数据
export const shipmentTracking = (params) => {
  let obj = {
    shipmentRef: params.shipmentRef,
    eqpid: params.eqpid
  }
  console.log(obj);
  return getRequest('/api/shipment-tracking', obj)
}

// 获取PDF下载路径
export const reportToPDF = (params) => {
  return postRequest('/api/downloadPdf', params, true)
}

// 模糊查询
export const fuzzySearch = (params, hideLoading) => {
  let obj = {
    searchStr: params.searchStr
  }
  return getRequest('/api/fuzzySearch', obj, hideLoading)
}
// 排序
export const routingSort = (params) => {
  return postRequest('/api/routingSort', params, true)
}

// 排序
export const sendEmail = (params) => {
  return postRequest('/api/emailPdf', params, true, true)
}