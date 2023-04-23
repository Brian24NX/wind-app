const {
  getRequest,
  postRequest
} = require('../../../api/http')

// 获取船运概览装运视图列表
export const shipmentsList = (params) => {
  return getRequest('/api/miniapp/shipments/shipmentsView', params, true, true)
}

export const shipmentsViewForSpotOn = (params) => {
  return getRequest('/api/miniapp/shipments/shipmentsViewForSpotOn', params, true, true)
}

// 获取船运详情
export const shipmentsDetail = (params) => {
  return getRequest('/api/miniapp/shipments/shipmentsDetail', params, false, true)
}

// 获取船运概览货柜视图列表
export const shipmentsContainerList = (params) => {
  return getRequest('/api/miniapp/shipments/shipmentsContainerView', params, true, true)
}

// 获取文件概览列表
export const documentList = (params) => {
  return getRequest('/api/miniapp/documents/documentList', params, true, true)
}

// 获取文件概览详情
export const documentDetail = (params) => {
  return getRequest('/api/miniapp/documents/documentDetail', params, false, true)
}

// 发送邮箱
export const documentSendEmail = (params) => {
  return postRequest('/api/miniapp/documents/documentEmail', params, true, true, true)
}

//获取sea reward dashboard
export const rewardDashboard = (params) => {
  return getRequest('/api/miniapp/sea/dashboard', params, true, true, true)
}

//获取客户消费信息
export const seaPartnerInfo = (params) => {
  return getRequest('/api/miniapp/sea/partnerInfo', params, true, true, true)
}

//获取sea reward FAQ
export const seaRewardFAQ = (params) => {
  return getRequest('/api/miniapp/sea/faq', params, true, true, true)
}