const config = require('../config/config')
const languageUtil = require('../utils/languageUtils')

// 请求及拦截封装
const request = ({
  url,
  data,
  method,
  contentType,
  hideLoading
}) => {
  if (!hideLoading) {
    wx.showLoading({
      title: languageUtil.languageVersion().lang.page.load.loading,
      mask: true
    });
  }
  return new Promise((resolve, reject) => {
    // console.log(`${config[config.dev_env].url}${url}`);
    wx.request({
      url: `${config[config.dev_env].url}${url}`,
      data: data,
      method: method,
      header: {
        'content-type': contentType || 'application/json',
        // 'token': getStorage('token')
      },
      success: (res) => {
        // console.log(res)
        wx.hideLoading();
        // 返回成功提示信息
        if (res.statusCode === 200) {
          // 未登录拦截
          if (res.data.code == 200) {
            resolve(res.data)
          } else if (res.data.code == 401) {
            wx.redirectTo({
              url: '/pages/Login/index'
            })
          } else if (res.data.code == 408) {
            if (!hideLoading) {
              wx.showToast({
                title: languageUtil.languageVersion().lang.page.load.chaoshi,
                icon: 'none'
              })
            }
            reject(res.data)
          } else if (res.data.code == 404) {
            reject(res.data)
          } else {
            if (!hideLoading) {
              wx.showToast({
                title: languageUtil.languageVersion().lang.page.load.systemIsBusyNow,
                icon: 'none'
              })
            }
            reject(res.data)
          }
        } else {
          // 返回错误提示信息
          if (!hideLoading) {
            wx.showToast({
              title: languageUtil.languageVersion().lang.page.load.systemIsBusyNow,
              icon: 'none'
            })
          }
          reject(res.data)
        }
      },
      fail: (res) => {
        wx.hideLoading();
        // 返回错误提示信息
        reject('网络请求失败')
      },
      complete: () => {
        // wx.hideLoading();
      }
    })
  })
}


// 添加事件结束
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value
        }
      )
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason
        }
      )
    }
  )
}

export const getRequest = (url, data, hideLoading) => {
  return request({
    url,
    data,
    method: 'GET',
    contentType: '',
    hideLoading
  })
}

export const postRequest = (url, data, isJson, hideLoading) => {
  return request({
    url,
    data,
    method: 'POST',
    contentType: isJson ? 'application/json' : 'application/x-www-form-urlencoded',
    hideLoading
  })
}

export const putRequest = (url, data, isJson) => {
  return request({
    url,
    data,
    method: 'PUT',
    contentType: isJson ? 'application/json' : 'application/x-www-form-urlencoded'
  })
}

export const deleteRequest = (url, data) => {
  return request({
    url,
    data,
    method: 'DELETE'
  })
}

export const getBaseUrl = (url) => {
  return `${config[config.dev_env].url}${url}`
}