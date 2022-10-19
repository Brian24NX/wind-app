const {
  getRequest,
  postRequest
} = require('../../../api/http')

// 获取报价单详情
export const getQuotationDetail = (params) => {
  return getRequest('/api/miniapp/getQuotationDetail', params, true)
}
