const {
  getRequest, postRequest
} = require('../../../api/http')

// 获取船运概览装运视图列表
export const shipmentsList = (params) => {
  return getRequest('/api/miniapp/shipmentsView', params, true)
}

// 获取船运详情
export const shipmentsDetail = (params) => {
  return getRequest('/api/miniapp/shipmentsDetail', params)
}

// 获取船运概览货柜视图列表
export const shipmentsContainerList = (params) => {
  return getRequest('/api/miniapp/shipmentsContainerView', params, true)
}

// 获取文件概览列表
export const documentList = (params) => {
  return getRequest('/api/miniapp/documentList', params, true)
}

// 获取文件概览详情
export const documentDetail = (params) => {
  return getRequest('/api/miniapp/documentDetail', params)
}

// 发送邮箱
export const documentSendEmail = (params) => {
  return postRequest('/api/miniapp/documentEmail', params, true, true)
}