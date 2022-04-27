const {
  getRequest,
  postRequest
} = require('../http')

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


// 获取businiessOpentionalList列表数据
export const businiessOpentionalList = (params) => {
  return getRequest('/api/miniapp/businiessOpentionalList', params, true)
}