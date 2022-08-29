const {
  getRequest,
  postRequest
} = require('../http')

// 获取报价单详情
export const getQuotationSurchargeDetails = (params) => {
  return postRequest('/api/miniapp/quotationSurchargeDetailsSearch', params, true, false, true)
}
