const {
  getRequest,
  postRequest
} = require('../http')

// 获取报价单列表
export const quotationNextDepartures = (params) => {
  return postRequest('/api/miniapp/quotation/quotationNextDeparturesSearch', params, true, false, true)
}

// 获取报价单排序
export const quotationSort = (params) => {
  return postRequest('/api/miniapp/quotation/quotationSort', params, true, false, true)
}

// 获取报价单详情
export const getQuotationSurchargeDetail = (params) => {
  return postRequest(`/api/miniapp/quotation/quotationSurchargeDetailsSearch`, params, true, true, true, true)
}

// 获取附近港口列表
export const nearByPortNextDeparture = (params) => {
  return postRequest('/api/miniapp/quotation/quotationNearByPortNextDeparture', params, true, false, true)
}

// 获取我的报价单列表
export const quotationQuoteLinesSearch = (params) => {
  return postRequest('/api/miniapp/quotation/quotationQuoteLinesSearch', params, true, false, true)
}

// 港口详情
export const fuzzyPointSearch = (params) => {
  return getRequest('/api/miniapp/fuzzyPointSearch', params, true, false, true)
}

// 获取我的报价单列表
export const createQuotationQuotation = (params) => {
  return postRequest(`/api/miniapp/quotation/quotationQuotationCreate`, params, true, false, true)
}

// 获取D&D
export const detentionDemurrages = (params) => {
  return postRequest('/api/miniapp/detentionDemurrages', params, true, false, true)
}

// 获取nameAndAccounts
export const namedAccountsSearch = (params) => {
  return postRequest('/api/miniapp/namedAccountsSearch', params, true, true, true, true)
}

// 获取VAS
export const vasLists = (params) => {
  return postRequest('/api/miniapp/quotation/quotationValueAddedServices', params, true, false, true, true)
}

// 获取报价单内的VAS
export const quotationSelectedVas = (params) => {
  return postRequest('/api/miniapp/quotation/quotationSelectedValueAddedServices', params, true, false, true)
}

export const vasFileDetail = (params) => {
  return getRequest('/api/miniapp/saveFileFromUrl', params, false, true)
}

// 发送VAS文件
export const vasFileSendEmail = (params) => {
  return postRequest('/api/miniapp/emailVasPdf', params, true)
}

// 导出PDF
export const exportPDF = (params) => {
  return postRequest('/api/miniapp/downloadQuotationPdf', params, true, false, true)
}

// export const seaBurnPoints = (params) => {
//   return getRequest('/api/miniapp/sea/burnPoints', params, false, true)
// }

export const seaEarnPoints = (params) => {
  return getRequest('/api/miniapp/sea/earnPoints', params, true, true, true)
}


//创建quotation后的获得积分
export const seaQuotationCreation= (params) => {
  return postRequest('/api/miniapp/sea/windQuotationCreation', params, true, true, true)
}