const {
  getRequest,
  postRequest
} = require('../../../api/http')

// 获取订舱航线列表
export const bookingQuotationList = (params) => {
  return getRequest('/api/miniapp/shipmentsView', params, true, true)
}