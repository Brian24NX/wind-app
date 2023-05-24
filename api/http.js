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
  hideLoading,
  needError
}) => {
  console.log('------------',url,hideLoading)
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
        if(config.mockLogin){
          wx.navigateTo({
            url: '/pages/LoginCopy/index'
          })
        }else{
          wx.navigateTo({
            url: '/pages/Login/index'
          })
        }
      }, 3000)
      reject()
      return
    }
    if (!hideLoading) {
      console.log('http.js------------------')
      wx.showLoading({
        title: languageUtil.languageVersion().lang.page.load.loading,
        mask: true
      });
    }
    let header = {
      'content-type': contentType || 'application/json'
    }
    if (needAccessToken) {
      header['Authorization'] = wx.getStorageSync('access_token')
    }
    wx.request({
      url: `${config[config.dev_env].url}${url}`,
      data: data,
      method: method,
      header,
      success: (res) => {
        if (!hideLoading) {
          console.log('http.js-----1------')
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
              console.log(1111111111111111111,config.mockLogin)
              if(config.mockLogin){
                wx.navigateTo({
                  url: '/pages/LoginCopy/index'
                })
              }else{
                wx.navigateTo({
                  url: '/pages/Login/index'
                })
              }
             
            }, 3000)
          } else if (res.data.code == 408) {
            if (!needError) {
              wx.showToast({
                title: languageUtil.languageVersion().lang.page.load.chaoshi,
                icon: 'none'
              })
            }
            reject(res.data)
          } else if (res.data.code == 404) {
            reject(res.data)
          } else if (res.data.code == 401) {
            if (!needError) {
              wx.showToast({
                title: languageUtil.languageVersion().lang.page.load.noLogin,
                icon: 'none'
              })
              setTimeout(() => {
                if(config.mockLogin){
                  wx.navigateTo({
                    url: '/pages/LoginCopy/index'
                  })
                }else{
                  wx.navigateTo({
                    url: '/pages/Login/index'
                  })
                }
              }, 2000);
            }
            reject(res.data)
          } else if (res.data.code == 403) {
            if (!needError) {
              wx.showToast({
                title: languageUtil.languageVersion().lang.page.load.accessDenied,
                icon: 'none'
              })
            }
            reject(res.data)
          } else if (res.data.code == 422) {
            reject(res.data)
          } else {
            if (!needError) {
              wx.showToast({
                title: languageUtil.languageVersion().lang.page.load.systemIsBusyNow,
                icon: 'none'
              })
            }
            reject(res.data)
          }
        } else {
          if (!needError) {
            // 返回错误提示信息
            wx.showToast({
              title: languageUtil.languageVersion().lang.page.load.systemIsBusyNow,
              icon: 'none'
            })
          }
          reject(res.data)
        }
      },
      fail: (err) => {
        if (!hideLoading) {
          console.log('http.js-----2------')
          wx.hideLoading();
        }
        if (err.errMsg === 'request:fail timeout') {
          if (!needError) {
            wx.showToast({
              title: languageUtil.languageVersion().lang.page.load.chaoshi,
              icon: 'none'
            })
          }
        }
        if (err.errMsg.indexOf('request:fail') !== -1) {
          if (!needError) {
            wx.showToast({
              title: languageUtil.languageVersion().lang.page.load.networkIsNotWorking,
              icon: 'none',
              duration: 3000
            })
          }
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

export const getRequest = (url, data, hideLoading, needAccessToken, needError) => {
  return request({
    url,
    data,
    method: 'GET',
    needAccessToken,
    contentType: '',
    hideLoading,
    needError
  })
}

export const postRequest = (url, data, isJson, hideLoading, needAccessToken, needError) => {
  return request({
    url,
    data,
    method: 'POST',
    needAccessToken,
    contentType: isJson ? 'application/json' : 'application/x-www-form-urlencoded',
    hideLoading,
    needError
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