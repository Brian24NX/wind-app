// pages/Orders/One/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    stepList: [{
      id: 1,
      time: '2022-03-29 星期二, TOKYO, JP',
      statusName: '准备装船',
      status: 'past'
    },
    {
      id: 2,
      time: '2022-03-29 星期二, TOKYO, JP',
      statusName: '装船',
      status: 'past'
    },
    {
      id: 3,
      time: '2022-03-29 星期二, TOKYO, JP',
      statusName: '离岗',
      status: 'being'
    },
    {
      id: 4,
      time: '2022-03-29 星期二, TOKYO, JP',
      statusName: '转运港卸货',
      status: 'future'
    },
    {
      id: 5,
      time: '2022-03-29 星期二, TOKYO, JP',
      statusName: '到达最终卸货港',
      status: 'future'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
