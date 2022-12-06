const {
  getRequest,
  postRequest
} = require('../../../api/http')

// 获取订舱航线列表
export const bookingQuotationList = (params) => {
  return getRequest('/api/miniapp/bookingSolution', params, false, true)
}

// 获取办公室列表
export const bookOfficeList = (params) => {
  return getRequest('/api/miniapp/agencyOffice', params, true, true)
}

// 商品搜索
export const bookCommodityList = (params) => {
  return getRequest("/api/miniapp/cdrCommodityFuzzy", params, true, true)
}

// UNNumber搜索
export const UNNumberList = (params) => {
  return getRequest("/api/miniapp/cdrUnNumber", params, true, true)
}

// Package搜索
export const packageList = (params) => {
  return getRequest("/api/miniapp/cdrPackage", params, true, true)
}