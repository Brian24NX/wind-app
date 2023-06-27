// packagePrice/pages/chargeFinder/index.js
var languageUtil = require('../../../utils/languageUtils')
const utils = require('../../../utils/util')
const dayjs = require("dayjs");
import {
    chargeFuzzySearch,
} from '../../../api/modules/home';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        languageContent: {}, // 用于保存当前页面所需字典
        verifyInfo: {},
        // 卸货港
        podvalue: "",
        podcode: "",
        // 起运港
        polvalue: "",
        polcode: "",
        typeList: [{
            label: 'dryNoR',
            id: '1'
        }, {
            label: 'reefer',
            id: '2'
        }],
        currentType: '1',
        pollist: [],
        showPol: false,
        polCount: 0,
        podlist: [],
        showPod: false,
        podCount: 0,
        date: '',
        showRemind1: false,
        showRemind2: false,
        showRemind3: false,
        showRemind4: false,
        showDelete1: false,
        showDelete2: false,
        showDatePopup: false,
        currentDate: null,
        language: 'zh',
        minDate: new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000,
        maxDate: new Date().getTime() + 1 * 30 * 24 * 60 * 60 * 1000,
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.initLanguage()
        this.setData({
            date: this.getDate()
        })
    },

    onShareAppMessage: function () {
    },

    //初始化语言
    initLanguage() {
        this.setData({
            languageContent: languageUtil.languageVersion().lang.page.chargeFinder,
            language: languageUtil.languageVersion().lang.page.langue,
            verifyInfo: languageUtil.languageVersion().lang.page.verifyInfo
        })
        wx.setNavigationBarTitle({
            title: languageUtil.languageVersion().lang.page.chargeFinder.title
        })
    },

    //获取起始港的接口处理
    changepol: utils.debounce(function (e) {
        const data = e['0'].detail.value
        this.setData({
            showDelete1: !!data,
            showRemind1: false,
            showRemind2: false
        })
        if (data.length < 2) {
            this.setData({
                pollist: []
            })
        }
        this.getPolData(data)
    }, 800),

    getPolData(data) {
        this.setData({
            showPol: true
        })
        if (wx.getStorageSync('partnerList')[0].code == '0002130568') {
            this.setData({
                showPol: false,
                pollist: [{"pointCode": "CNSHA", "point": "SHANGHAI;CN;CNSHA"}]
            })
        } else {
            chargeFuzzySearch({
                searchStr: data
            }, true).then(res => {
                this.setData({
                    showPol: false,
                    polCount: 0,
                })
                if (res.data != '' && res.data !== undefined) {
                    this.setData({
                        pollist: res.data || []
                    })
                }
            }, () => {
                this.data.polCount++
                if (this.data.polCount <= 3) {
                    this.getPolData(data)
                } else {
                    this.setData({
                        showPol: false,
                        polCount: 0,
                    })
                }
            })
        }

    },

    //获取卸货港的接口处理
    changepod: utils.debounce(function (e) {
        const data = e['0'].detail.value
        this.setData({
            showDelete2: !!data,
            showRemind3: false,
            showRemind4: false
        })
        if (data.length < 2) {
            this.setData({
                podlist: []
            })
            return
        }
        this.getPodData(data)
    }, 800),

    getPodData(data) {
        this.setData({
            showPod: true
        })
        if (wx.getStorageSync('partnerList')[0].code == '0002130568') {
            this.setData({
                showPod: false,
                podlist:  [{"pointCode":"HKHKG","point":"HONG KONG;SAR;CHINA"}]
            })
        }else{
            chargeFuzzySearch({
                searchStr: data
            }, true).then(res => {
                this.setData({
                    showPod: false,
                    podCount: 0,
                })
                if (res.data != '' && res.data !== undefined) {
                    this.setData({
                        podlist: res.data || []
                    })
                }
            }, () => {
                this.data.podCount++
                if (this.data.podCount <= 3) {
                    this.getPodData(data)
                } else {
                    this.setData({
                        showPod: false,
                        podCount: 0,
                    })
                }
            })
        }

    },

    deleteValue(e) {
        const type = e.currentTarget.dataset.type
        if (type === '1') {
            this.setData({
                polvalue: '',
                polcode: '',
                pollist: [],
                showDelete1: false,
                showRemind1: false,
                showRemind2: false
            })
        } else {
            this.setData({
                podvalue: '',
                podcode: '',
                podlist: [],
                showDelete2: false,
                showRemind3: false,
                showRemind4: false
            })
        }
    },

    // 起始港选择
    changepolname(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            polvalue: this.data.pollist[index].point,
            polcode: this.data.pollist[index].pointCode,
            pollist: [],
        })
    },

    // 卸货港
    changepodname(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            podvalue: this.data.podlist[index].point,
            podcode: this.data.podlist[index].pointCode,
            podlist: []
        })
    },

    changeType(e) {
        this.setData({
            currentType: e.currentTarget.dataset.type
        })
    },

    openPopup() {
        const date = this.data.date.replaceAll('-', '/')
        this.setData({
            currentDate: new Date(date).getTime(),
            showDatePopup: true
        })
    },

    closeDate() {
        this.setData({
            showDatePopup: false
        })
    },

    confirmDate(e) {
        this.setData({
            date: dayjs(e.detail).format('YYYY-MM-DD'),
            showDatePopup: false
        })
    },

    getDate() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        month = month < 10 ? ('0' + month) : month;
        let day = now.getDate();
        day = day < 10 ? ('0' + day) : day
        return year + '-' + month + '-' + day;
    },

    // 提交搜索
    submit() {
        if (this.data.showDelete1) {
            this.setData({
                showRemind1: false
            })
            var reg = /^([ ]*[A-z0-9]+([\,\.\-\;]*)){2,}$/;
            if (this.data.polvalue) {
                if (!reg.test(this.data.polvalue)) {
                    this.setData({
                        showRemind2: true
                    })
                } else {
                    this.setData({
                        showRemind2: false
                    })
                }
            } else {
                this.setData({
                    showRemind1: false,
                    showRemind2: true
                })
            }
        } else {
            this.setData({
                showRemind1: true,
                showRemind2: false
            })
        }

        if (this.data.showDelete2) {
            this.setData({
                showRemind3: false
            })
            if (this.data.podvalue) {
                if (!reg.test(this.data.podvalue)) {
                    this.setData({
                        showRemind4: true
                    })
                } else {
                    this.setData({
                        showRemind4: false
                    })
                }
            } else {
                this.setData({
                    showRemind4: true
                })
            }
        } else {
            this.setData({
                showRemind3: true,
                showRemind4: false
            })
        }
        if (this.data.showRemind1 || this.data.showRemind2 || this.data.showRemind3 || this.data.showRemind4) return
        wx.setStorageSync('chargeFinderSearchKey', {
            placeOfDischarge: this.data.podcode,
            podvalue: this.data.podvalue.split(';')[0],
            podCode: this.data.podvalue.split(';')[1],
            placeOfLoading: this.data.polcode,
            polCode: this.data.polvalue.split(';')[1],
            polvalue: this.data.polvalue.split(';')[0],
            reefer: this.data.currentType,
            simulationDate: this.data.date
        })
        wx.navigateTo({
            url: '/packagePrice/pages/chargeFinderResult/index',
        })
    }
})