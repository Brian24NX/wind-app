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

// 获取国家列表
export const countryList = (params) => {
  return getRequest('/api/miniapp/cdrCodifiedsCountry', params, true)
}

// 获取地区列表
export const stateList = (params) => {
  return getRequest('/api/miniapp/cdrRegion', params, true)
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
  return getRequest("/api/miniapp/cdrPackageGroup", params, true, true)
}

// 搜索Package描述信息
export const packageDescription = (params) => {
  return getRequest("/api/miniapp/cdrPackageDescription", params, true, true)
}


// Party搜索
export const bookPartyList = (params) => {
  return getRequest("/api/miniapp/bookingPartnersSearch", params, true, true)
}

// paymentLocationLists
export const paymentLocationLists = (params) => {
  return getRequest('/api/miniapp/placesOfPayment', params, true)
}

// 港口详情
export const fuzzyPointSearch = (params) => {
  return getRequest('/api/miniapp/fuzzyPointSearch', params, true, false, true)
}