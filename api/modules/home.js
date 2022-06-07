const {
  getRequest,
  postRequest
} = require('../http')

// 获取航线查询数据
export const routingFinder = (params) => {
  return getRequest('/api/miniapp/routing-finder', params)
}

// 获取货物追踪数据
export const shipmentTracking = (params) => {
  return getRequest('/api/miniapp/shipment-tracking', params)
}

// 获取PDF下载路径
export const reportToPDF = (params) => {
  return postRequest('/api/miniapp/downloadPdf', params, true)
}

// 模糊查询
export const fuzzySearch = (params, hideLoading) => {
  return getRequest('/api/miniapp/fuzzySearch', params, hideLoading)
}

// 排序
export const routingSort = (params) => {
  return postRequest('/api/miniapp/routingSort', params, true)
}

// 发送邮箱
export const sendEmail = (params) => {
  return postRequest('/api/miniapp/emailPdf', params, true, true)
}