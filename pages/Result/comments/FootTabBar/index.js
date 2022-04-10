Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    isPhoneX: getApp().globalData.isPhoneX,
    radio: '1',
    sortMenu:true,
    programme:true,
    list: ['a', 'b', 'c'],
    result: ['a'],
    tabBarData:[
      {
        text: '排序',
        isChecked: true,
        id:1,
        active: '/assets/img/result/tabbar/active/one.png',
        noactive: '/assets/img/result/tabbar/noactive/one.png'
      },
      {
        text: '航线方案',
        isChecked: false,
        id:2,
        active: '/assets/img/result/tabbar/active/two.png',
        noactive: '/assets/img/result/tabbar/noactive/two.png'
      },
      {
        text: '仅限最早到达',
        isChecked: false,
        id:3,
        active: '/assets/img/result/tabbar/active/three.png',
        noactive: '/assets/img/result/tabbar/noactive/three.png'
      },
      {
        text: '仅看直达',
        isChecked: false,
        id:4,
        active: '/assets/img/result/tabbar/active/four.png',
        noactive: '/assets/img/result/tabbar/noactive/four.png'
      },
    ]
  },
  methods:{
    // radioChange(event) {
    //   console.log('radio触发',event.detail);
    //   this.setData({
    //     radio: event.detail,
    //   })
    // },
    changeCheckBox(event) {
      this.setData({
        result: event.detail,
      });
      console.log(event.detail,'123');
      this.triggerEvent('tabbarchange', {result: event.detail})
    },
  
    changeCheckboxtoggle(event) {
      const { index } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.checkboxes-${index}`);
      checkbox.toggle();
    },
    
    onClickRadio(event) {
      const { name } = event.currentTarget.dataset;
      this.setData({
        radio: name,
      });
      this.triggerEvent('tabbarchange', {radio:name})
    },
    handleClickTab (e){
      // 传递的参数
      let activeIndex = e.currentTarget.dataset['index'];
      let activeData = this.data.tabBarData[activeIndex]
      // console.log(activeData,'123');
      let data = this.data.tabBarData.map((item,index) => {
        index === activeIndex ? (item.isChecked = true) : (item.isChecked = false)
        return item
      })
      if (activeIndex === 0){
        this.setData({
          sortMenu : !this.data.sortMenu,
          programme : true,
        })
      } else if (activeIndex === 1){
        this.setData({
          programme : !this.data.programme,
          sortMenu : true,
        })
      } else if(activeIndex === 2 || activeIndex === 3) {
        this.setData({
          programme : true,
          sortMenu : true
        })
        // tabnar为 后两项时
        this.triggerEvent('tabbarchange', {actived: activeData.id})
      }
      console.log(!this.data.sortMenu,'sortMenu');
      this.setData({
        tabBarData : data,
      })

      // console.log(this.data.tabBarData,'123123');
    },
  },

  onLoad: function (options) {
       
  },


  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
})