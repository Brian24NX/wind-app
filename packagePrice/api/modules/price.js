const {
  getRequest,
  postRequest
} = require('../../../api/http')

// 获取柜租费率列表
export const demurragePdfList = (params) => {
  return getRequest('/api/miniapp/DemurragePdfList', params)
}

// 柜租费率发送邮箱
export const demurrageSendEmail = (params) => {
  return postRequest('/api/miniapp/DemurrageSendEmail', params, true)
}


// 获取费率列表
export const chargeFinderTariff = (params) => {
  return getRequest('/api/miniapp/chargeFinderTariff', params)
}

// 获取D&D Charges
export const ddChargeFinder = (params) => {
  return postRequest('/api/miniapp/ddChargeFinder', params, true, false, false)
}

// 获取货柜
export const freightContainerSearch = (params) => {
  return getRequest('/api/miniapp/dnd/shipmentsDetail', params, false, true)
}

// 计算费用
export const calculatedCharge = (params) => {
  return postRequest(`/api/miniapp/dnd/calculatedCharges?shippingCompany=${params.shippingCompany}`, params.req, true, false, true, true)
}