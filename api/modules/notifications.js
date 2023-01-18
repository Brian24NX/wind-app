const {
  getRequest,
  postRequest,
} = require('../http')

//获取订阅
export const querySubscribe = (params) => {
  return getRequest('/api/miniapp/getSubscribe', params, true, false, false, false)
}

//添加订阅
export const addSubscribe = (params) => {
  return postRequest('/api/miniapp/subscribeAdd', params, true, false, false, false)
}

//修改订阅
export const updateSubscribe = (params) => {
  return postRequest('/api/miniapp/subscribeEdit', params, true, false, false, false)
}

//删除订阅
export const deleteSubscribe = (params) => {
  return getRequest('/api/miniapp/subscribeDelete', params, true, false, false, false)
}
