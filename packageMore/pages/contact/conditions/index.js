// packageMore/pages/contact/conditions/index.js
import {
  dictList,
  contactTradeList
} from '../../../../api/modules/more';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canProvide: true,
    columns: [],
    currentType: '',
    valueKey: '',
    showPopup: false,
    officeList: [],
    businessScopeList: [],
    contactTradeList: [],
    businessTypeName: '',
    businessType: '',
    officeName: '',
    office: '',
    accountName: '',
    tradeName: '',
    trade: '',
    showRemind1: false,
    showRemind2: false,
    showRemind3: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: '联系我们'
    })
    this.getOfficeList()
    this.getBussinessScopeList()
    this.getContactTradeList()
  },

  // 获取办事处list
  getOfficeList() {
    this.setData({
      officeList: [{
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 24,
          "name": "dict_office",
          "key": 1,
          "value": "Beihai, Fangcheng, Qunzhou, Wuzhou, Guigang, Haikou, Yangpu"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 25,
          "name": "dict_office",
          "key": 2,
          "value": "Beijing"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 26,
          "name": "dict_office",
          "key": 3,
          "value": "Dalian"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 27,
          "name": "dict_office",
          "key": 4,
          "value": "Fuzhou"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 28,
          "name": "dict_office",
          "key": 5,
          "value": "Guangzhou"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 29,
          "name": "dict_office",
          "key": 6,
          "value": "Lianyungang"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 30,
          "name": "dict_office",
          "key": 7,
          "value": "Nanjing"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 31,
          "name": "dict_office",
          "key": 8,
          "value": "Ningbo"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 32,
          "name": "dict_office",
          "key": 9,
          "value": "Qingdao"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 33,
          "name": "dict_office",
          "key": 10,
          "value": "Shanghai"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 34,
          "name": "dict_office",
          "key": 11,
          "value": "Shantou"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 35,
          "name": "dict_office",
          "key": 12,
          "value": "Shenzhen"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 36,
          "name": "dict_office",
          "key": 13,
          "value": "Shunde"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 37,
          "name": "dict_office",
          "key": 14,
          "value": "Tianjin"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 38,
          "name": "dict_office",
          "key": 15,
          "value": "Xiamen"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 39,
          "name": "dict_office",
          "key": 16,
          "value": "Zhongshan"
        }
      ]
    })
  },

  // 获取业务列表
  getBussinessScopeList() {
    this.setData({
      businessScopeList: [{
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 41,
          "name": "dict_business_scope",
          "key": 1,
          "value": "Import",
          "valueCn": "进口"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 42,
          "name": "dict_business_scope",
          "key": 2,
          "value": "Export",
          "valueCn": "出口"
        },
        {
          "deleted": 1,
          "createUser": 1,
          "updateUser": 0,
          "createTime": "2022-04-18T16:00:00.000+00:00",
          "id": 43,
          "name": "dict_business_scope",
          "key": 3,
          "value": "OBL & Telex Release",
          "valueCn": "柜台业务"
        }
      ]
    })
  },

  // 获取资讯航线
  getContactTradeList() {
    contactTradeList().then(res => {
      this.setData({
        contactTradeList: res.data
      })
    })
  },

  // 选择是否提供订舱信息
  changeProvide(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      canProvide: type === '1' ? true : false
    })
  },

  openPopup(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentType: type,
      valueKey: type === '3' ? 'trade' : type === '2' ? 'valueCn' : 'value',
      columns: type === '1' ? this.data.officeList : type === '2' ? this.data.businessScopeList : type === '3' ? this.data.contactTradeList : [],
      showPopup: true
    })
  },

  // 关闭弹框
  onClose() {
    this.setData({
      showPopup: false
    })
  },

  // 确认选择
  onConfirm(e) {
    const detail = e.detail
    console.log(detail)
    switch (this.data.currentType) {
      case '1':
        this.setData({
          office: detail.key,
          officeName: detail.value,
          showRemind1: false
        })
        break;
      case '2':
        this.setData({
          businessType: detail.key,
          businessTypeName: detail.valueCn,
          showRemind2: false
        })
        break;
      case '3':
        this.setData({
          trade: detail.tradeKey,
          tradeName: detail.trade,
          showRemind3: false
        })
        break;
      default:
        break;
    }
    this.setData({
      showPopup: false
    })
  },

  // 设置公司名称
  setAccount(e) {
    this.setData({
      accountName: e.detail.value || ''
    })
  },

  // 查询结果
  searchResult() {
    if (!this.data.office) {
      this.setData({
        showRemind1: true
      })
    } else {
      this.setData({
        showRemind1: false
      })
    }
    if (!this.data.businessType) {
      this.setData({
        showRemind2: true
      })
    } else {
      this.setData({
        showRemind2: false
      })
    }
    if (this.data.canProvide) {
      this.setData({
        showRemind3: false
      })
    } else {
      if (!this.data.trade) {
        this.setData({
          showRemind3: true
        })
      } else {
        this.setData({
          showRemind3: false
        })
      }
    }
    
    if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3) return
    wx.navigateTo({
      url: '/packageMore/pages/contact/result/index',
    })
  }
})