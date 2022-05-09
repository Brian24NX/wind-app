const {
  getRequest
} = require('../../../api/http')

// 获取列表
export const categoryList = (params) => {
  return getRequest('/api/miniapp/categoryList', params, true)
}

// 获取新闻列表数据
export const newsList = (params) => {
  return getRequest('/api/miniapp/newsList', params, true)
}

// 获取新闻列表数据
export const newsDetail = (params) => {
  return getRequest('/api/miniapp/newsDetail', params)
}

// 获取CMA CGM列表数据
export const cmaNewsList = (params) => {
  return getRequest('/api/miniapp/cmaNewsList', params, true)
}

// CMA CGM 详情
export const cmaNewsDetail = (params) => {
  return getRequest('/api/miniapp/cmaNewsDetail', params)
}

// 获取businiessOpentionalList列表数据
export const businiessOpentionalList = (params) => {
  return getRequest('/api/miniapp/businiessOpentionalList', params, true)
}

// 获取businiessOpentionalList详情数据
export const businiessOpentionalDetail = (params) => {
  return getRequest('/api/miniapp/businiessOpentionalDetail', params)
}

// 字典列表
export const dictList = (params) => {
  return getRequest('/api/miniapp/dictItem', params, true)
}

// 字典列表
export const contactTradeList = (params) => {
  return getRequest('/api/miniapp/contactTradeList', params, true)
}

// 联系我们
export const contractInfo = (params) => {
  return getRequest('/api/miniapp/contactInfoSearch', params)
}

// 根据订单号联系我们
export const contractInfoByOrderId = (params) => {
  return getRequest('/api/miniapp/contactSearchByBooking', params)
}