const {
  getRequest, postRequest
} = require('../../../api/http')

// 获取船运概览列表
export const shipmentsList = (params) => {
  return getRequest('/api/miniapp/shipmentsView', params)
}