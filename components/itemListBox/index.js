// components/itemListBox/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
    },
    showBox: {
      type: Boolean,
      value: false
    },
    colunmNum: {
      type: Number,
      value: 2
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: '',
    newList: []
  },

  attached() {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseItem(e) {
      this.setData({
        selected: e.target.dataset.item
      })
      this.triggerEvent('chooseItem', this.data.selected)
    },
    delItem(e) {
      var rmList = this.data.list
      var idx = rmList.indexOf(e.target.dataset.index)
      rmList.splice(idx, 1)
      this.setData({
        newList: rmList
      })
      this.triggerEvent('delItem', this.data.newList)
    },
  }
})