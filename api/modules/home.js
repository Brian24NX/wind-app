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
  return postRequest('/api/miniapp/trackingEventsTrackingReference', params, true)
}

// 获取PDF下载路径
export const reportToPDF = (params) => {
  return postRequest('/api/miniapp/downloadPdf', params, true)
}

// 模糊查询
export const fuzzySearch = (params, hideLoading) => {
  return getRequest('/api/miniapp/fuzzySearch', params, hideLoading, false, true)
}

// 模糊查询
export const chargeFuzzySearch = (params, hideLoading) => {
  return getRequest('/api/miniapp/chargeFuzzySearch', params, hideLoading, false, true)
}

// 港口模糊查询
export const getPortPlaceInfo = (params, hideLoading) => {
  return getRequest('/api/miniapp/getPortPlaceInfo', params, hideLoading, false, true)
}

// 港口模糊查询
export const getAllNetworkPoint = (params, hideLoading) => {
  return getRequest('/api/miniapp/getAllNetworkPoint', params, hideLoading, false, true)
}

// 排序
export const routingSort = (params) => {
  return postRequest('/api/miniapp/routingSort', params, true)
}

// 发送邮箱
export const sendEmail = (params) => {
  return postRequest('/api/miniapp/emailPdf', params, true, true)
}

// 获取用户信息
export const customerProfile = (params) => {
  return getRequest('/api/miniapp/customerProfile', params, false, true)
}

// 获取用户Parnters
export const customerPartners = (params) => {
  return postRequest('/api/miniapp/customerPartners', params, true, true)
}

// 获取用户信息
export const ccgId = (params) => {
  return getRequest('/api/miniapp/ccgId', params, false, true)
}

// 分析上报
export const analysis = (params) => {
  return postRequest('/api/miniapp/analysisAdd', params, true, true)
}

// 获取箱型
export const equitmentSizeList = (params) => {
  return getRequest('/api/miniapp/equipmentSizeList', params, true, false)
}

// 获取箱型SpotOn
export const equitmentSizeListSpotOn = (params) => {
  return getRequest('/api/miniapp/equipmentSizeListForSpotOn', params, true, false)
}

// 获取商品
export const getCommodityLists = (params) => {
  return getRequest('/api/miniapp/quotation/quotationCommodities', params, true, true, true)
}

//获取手机号
export const getUserPhoneNumber = (params) => {
  return getRequest('/api/miniapp/user/wx/getPhoneNumber', params, false, false, true)
}

//获取微信token
export const getWXToken = () => {
  return getRequest('/api/miniapp/user/wx/getAccessToken', false, true)
}

// 绑定手机号
export const bindPhone = (params) => {
  return postRequest('/api/miniapp/bindPhoneNumber', params, true, true, true, true)
}

// 检查绑定
export const checkPhoneBind = (params) => {
  return postRequest('/api/miniapp/checkBind', params, true, true, true, true)
}

//写日志
export const writeOperationLog = (params) => {
  return postRequest('/api/miniapp/operation/miniLog', params, true, true, true, true)
}

//获取客户消费信息
export const seaPartnerInfo = (params) => {
  return getRequest('/api/miniapp/sea/partnerInfo', params, true, true, true)
}