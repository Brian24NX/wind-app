Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    },
    routesPlanList: {
      type: Array
    }
  },
  data: {
    isPhoneX: getApp().globalData.isPhoneX,
    radio: '1',
    sortMenu: true,
    programme: true,
    result: ["1", "2", "3"],
    tabBarData: [{
        text: '排序',
        isChecked: true,
        id: 1,
        active: '/assets/img/result/tabbar/active/one.png',
        noactive: '/assets/img/result/tabbar/noactive/one.png'
      },
      {
        text: '航线方案',
        isChecked: true,
        id: 2,
        active: '/assets/img/result/tabbar/active/two.png',
        noactive: '/assets/img/result/tabbar/noactive/two.png'
      },
      {
        text: '仅限最早到达',
        isChecked: false,
        id: 3,
        active: '/assets/img/result/tabbar/active/three.png',
        noactive: '/assets/img/result/tabbar/noactive/three.png'
      },
      {
        text: '仅看直达',
        isChecked: false,
        id: 4,
        active: '/assets/img/result/tabbar/active/four.png',
        noactive: '/assets/img/result/tabbar/noactive/four.png'
      },
    ]
  },
  methods: {
    closeSort() {
      this.setData({
        sortMenu: true,
        programme: true
      })
    },
    changeCheckBox(event) {
      this.setData({
        result: event.detail,
      });
    },

    apply() {
      this.setData({
        programme: true
      })
      this.triggerEvent('tabbarchange', {
        actived: 2,
        result: this.data.result
      })
    },

    changeCheckboxtoggle(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.checkboxes-${index}`);
      checkbox.toggle();
    },

    onClickRadio(event) {
      const {
        name
      } = event.currentTarget.dataset;
      this.setData({
        radio: name,
      });
      this.triggerEvent('tabbarchange', {
        actived: 1,
        result: name
      })
    },
    handleClickTab(e) {
      // 传递的参数
      let activeIndex = e.currentTarget.dataset['index'];
      let activeData = this.data.tabBarData[activeIndex]
      let data = this.data.tabBarData
      if (activeIndex === 0) {
        this.setData({
          sortMenu: !this.data.sortMenu,
          programme: true,
        })
      } else if (activeIndex === 1) {
        this.setData({
          programme: !this.data.programme,
          sortMenu: true,
        })
      } else if (activeIndex === 2 || activeIndex === 3) {
        this.setData({
          programme: true,
          sortMenu: true
        })
        data[activeIndex].isChecked = !data[activeIndex].isChecked
        // tabnar为 后两项时
        this.triggerEvent('tabbarchange', {
          actived: activeData.id,
          result: data[activeIndex].isChecked
        })
      }
      this.setData({
        tabBarData: data
      })
    },
  }
})