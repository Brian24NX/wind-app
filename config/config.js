module.exports = {
  app_name: 'CMA CGM',
	version: "v5.0.0",
	dev_env: 'dev', // 是否开发环境
	pro: {
    url: 'https://wind.cma-cgm.com',
    fileUrl: 'https://wind-admin.cma-cgm.com/api/admin/',
    appId: 'wxbcfe1072de985b0d'
	},
	dev: {
		url: 'https://uat.wind.cma-cgm.com',
    fileUrl: 'https://uat.wind-admin.cma-cgm.com/api/admin/',
    appId: 'wxa026e360ceef2f02'
	}
}