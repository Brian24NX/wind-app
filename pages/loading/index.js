
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:'登录中...',  //登录成功
        title_main:'Login...',   //Login successfully.
        username:'',
        rewardLevel: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title:'Login',
        })
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 2]
        const data = currentPage.data
        console.log(pages,data)
        this.getLogin()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    getLogin(){
        setTimeout(() => {
            this.setData({
                title:'登录成功',
                title_main:'Login successfully.'
            })
        }, 2000)

        setTimeout(() => {
            wx.switchTab({
                url: '/pages/My/index',
            })
        }, 3000)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

})