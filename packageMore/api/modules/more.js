const {
  getRequest, postRequest
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

// 新闻点赞
export const newsLike = (params) => {
  return getRequest('/api/miniapp/newsLikeCount', params)
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

// 发送Email
export const sendEmail = (params) => {
  return postRequest('/api/miniapp/businiessSendEmail', params, true, true)
}

// 字典列表
export const dictList = (params) => {
  return getRequest('/api/miniapp/dictItem', params, true)
}

// 业务类型列表
export const bussinessScopeList = (params) => {
  return getRequest('/api/miniapp/contactBusinessTypeList', params, true)
}

// 航线列表
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

// 管制品列表
export const sanctionCommodityList = (params) => {
  return getRequest('/api/miniapp/sanctionCommodityList', params, true)
}

// 管制品详情
export const sanctionCommodityDetail = (params) => {
  return getRequest('/api/miniapp/sanctionCommodityDetail', params)
}

// 获取常用模板与链接列表
export const templateList = (params) => {
  return getRequest('/api/miniapp/templateList', params, true)
}

// 常用模板与链接发送邮箱
export const templateSendEmail = (params) => {
  return postRequest('/api/miniapp/templateSendEmail', params, true)
}