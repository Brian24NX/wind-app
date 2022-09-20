const {
  getRequest,
  postRequest
} = require('../http')

// 获取报价单列表
export const quotationNextDepartures = (params) => {
  return postRequest('/api/miniapp/quotationNextDeparturesSearch', params, true, false, true)
}

// 获取报价单排序
export const quotationSort = (params) => {
  return postRequest('/api/miniapp/quotationSort', params, true, false, true)
}

// 获取报价单详情
export const getQuotationSurchargeDetail = (params) => {
  return postRequest('/api/miniapp/quotationSurchargeDetailsSearch', params, true, true, true)
}

// 获取附近港口列表
export const nearByPortNextDeparture = (params) => {
  return postRequest('/api/miniapp/quotationNearByPortNextDeparture', params, true, false, true)
}

// 获取我的报价单列表
export const quotationQuoteLinesSearch = (params) => {
  return postRequest('/api/miniapp/quotationQuoteLinesSearch', params, true, false, true)
}

// 港口详情
export const fuzzyPointSearch = (params) => {
  return getRequest('/api/miniapp/fuzzyPointSearch', params, true)
}