module.exports = {
  app_name: 'CMA CGM',
	version: "v2.0.0",
	dev_env: 'dev', // 是否开发环境
	pro: {
    url: 'https://wind.cma-cgm.com',
    fileUrl: 'https://wind-admin.cma-cgm.com/api/admin/'
	},
	dev: {
		url: 'https://uat.wind.cma-cgm.com',
    fileUrl: 'https://uat.wind-admin.cma-cgm.com/api/admin/'
	}
}