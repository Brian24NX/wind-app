const config = require('../config/config')
const languageUtil = require('../utils/languageUtils')
const utils = require('../utils/util')

// 请求及拦截封装
const request = ({
  url,
  data,
  method,
  needAccessToken,
  contentType,
  hideLoading
}) => {
  return new Promise((resolve, reject) => {
    if (needAccessToken && !utils.checkAccessToken()) {
      wx.showToast({
        title: languageUtil.languageVersion().lang.page.load.noLogin,
        icon: 'none',
        mask: true,
        duration: 3000
      })
      wx.removeStorageSync('expires_time')
      wx.removeStorageSync('access_token')
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/Login/index',
        })
      }, 3000)
      reject()
      return
    }
    if (!hideLoading) {
      wx.showLoading({
        title: languageUtil.languageVersion().lang.page.load.loading,
        mask: true
      });
    }
    wx.request({
      url: `${config[config.dev_env].url}${url}`,
      data: data,
      method: method,
      header: {
        'content-type': contentType || 'application/json'
      },
      success: (res) => {
        if (!hideLoading) {
          wx.hideLoading();
        }
        // 返回成功提示信息
        if (res.statusCode === 200) {
          // 未登录拦截
          if (res.data.code == 200) {
            resolve(res.data)
          } else if (res.data.code == 401) {
            wx.showToast({
              title: languageUtil.languageVersion().lang.page.load.noLogin,
              icon: 'none',
              mask: true,
              duration: 3000
            })
            wx.removeStorageSync('expires_time')
            wx.removeStorageSync('access_token')
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/Login/index'
              })
            }, 3000)
          } else if (res.data.code == 408) {
            wx.showToast({
              title: languageUtil.languageVersion().lang.page.load.chaoshi,
              icon: 'none'
            })
            reject(res.data)
          } else if (res.data.code == 404) {
            reject(res.data)
          } else {
            wx.showToast({
              title: languageUtil.languageVersion().lang.page.load.systemIsBusyNow,
              icon: 'none'
            })
            reject(res.data)
          }
        } else {
          // 返回错误提示信息
          wx.showToast({
            title: languageUtil.languageVersion().lang.page.load.systemIsBusyNow,
            icon: 'none'
          })
          reject(res.data)
        }
      },
      fail: (err) => {
        if (!hideLoading) {
          wx.hideLoading();
        }
        if (err.errMsg === 'request:fail timeout') {
          wx.showToast({
            title: languageUtil.languageVersion().lang.page.load.chaoshi,
            icon: 'none'
          })
        }
        // 返回错误提示信息
        reject('网络请求失败')
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

export const getRequest = (url, data, hideLoading, needAccessToken) => {
  return request({
    url,
    data,
    method: 'GET',
    needAccessToken,
    contentType: '',
    hideLoading
  })
}

export const postRequest = (url, data, isJson, hideLoading, needAccessToken) => {
  return request({
    url,
    data,
    method: 'POST',
    needAccessToken,
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