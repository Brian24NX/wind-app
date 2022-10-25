// pages/Quotation/List/comments/Remind/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    languageContent: {
      type: Object
    },
    containers: {
      type: Number
    },
    hasContainers: {
      type: Number
    },
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    languageContents: {}
  },

  observers: {
    "show": function(newValue, oldValue) {
      if (newValue) {
        let languageContents = this.data.languageContent
        languageContents.ferContainerDesc = languageContents.ferContainerDesc.replace('{{containers}}', this.data.containers).replace('{{hasContainers}}', this.data.hasContainers)
        this.setData({
          languageContents
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    continue () {
      this.triggerEvent('continue')
    },
    onClickHide() {
      this.triggerEvent('hide')
    }
  }
})