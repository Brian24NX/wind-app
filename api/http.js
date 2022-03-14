/**
 * 1.引入要调用GET,POST,PUT,DELETE方法 
 *    const { postRequest } = require('../request.js')
 * 2.编写业务接口方法  
 *    export const login = (params) =>  postRequest('/auth/login', params, true)
 * 3.页面引入业务接口  
 *    import { login } from '../../utils/api/modules/security.js'
 * 4.页面使用业务接口  
 *    login({ userName: 'admin', passWord: 123456 }).then(res => console.log('success',res))
 *    .catch(err => console.log('error','出错了～～'))
 */

import { skipNulls } from '../utils/util'
const config = require('../config/config')
const { getStorage } = require('../storage.js')

// 请求及拦截封装
const request = ( { url, data, method, contentType }) => {
	wx.showLoading({
		title:"正在加载中..."
	});
	return new Promise((resolve, reject) => {
		wx.request({
			url: `${config[config.dev_env].url}${url}`,
			data: data,
			method: method,
			header: {
				'content-type': contentType || 'application/json',
				'token': getStorage('token')
			},
			success: (res) => {
				
				// 返回成功提示信息
				if (res.statusCode === 200) {
					// 未登录拦截
					if (res.data.code === 401) {
						wx.redirectTo({url:'/pages/Login/index'})
					} else {
						resolve(res.data)
					}
				} else {
					// 返回错误提示信息
					reject(res.data)
				}
			},
			fail: (res) => {
				// 返回错误提示信息
				reject('网络出错')
			},
			complete: () => {
				wx.hideLoading();
			}
		})
	})
}


// 添加事件结束
Promise.prototype.finally = function(callback) {
	var Promise = this.constructor;
	return this.then(
		function(value) {
			Promise.resolve(callback()).then(
				function() {
					return value
				}
			)
		},
		function(reason) {
			Promise.resolve(callback()).then(
				function() {
					throw reason
				}
			)
		}
	)
}



export const getRequest = (url, data) => {
	data = skipNulls(data)
	return request({
		url,
		data,
		method: 'GET'
	})
}

export const postRequest = (url, data, isJson) => {
	return request({
		url,
		data,
		method: 'POST',
		contentType: isJson ? 'application/json' : 'application/x-www-form-urlencoded'
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
