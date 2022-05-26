const {
  getRequest, postRequest
} = require('../../../api/http')

// 获取柜租费率列表
export const demurragePdfList = (params) => {
  return getRequest('/api/miniapp/DemurragePdfList', params)
}

// 柜租费率发送邮箱
export const demurrageSendEmail = (params) => {
  return postRequest('/api/miniapp/DemurrageSendEmail', params, true)
}