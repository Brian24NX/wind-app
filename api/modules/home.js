const { getRequest } = require('../http')

// 获取首页数据
export const GetHomeData = (params) => {
  return getRequest('/getHome')
}