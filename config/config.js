module.exports = {
    app_name: 'CMA CGM',
    version: "v7.0.0",
    expiresIn: 30,
    dev_env: 'dev', // 是否开发环境
    mockLogin: true, // true=模拟登录，false=非模拟登录
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