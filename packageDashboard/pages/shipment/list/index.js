// packageDashboard/pages/shipment/list/index.js
const languageUtils = require('../../../../utils/languageUtils')
const utils = require('../../../../utils/util')
import {
    // shipmentsList,
    shipmentsViewForSpotOn,
    shipmentsContainerList
} from '../../../api/modules/dashboard'

let allList = []
const pageSize = 20
Page({

    /**
     * 页面的初始数据
     */
    data: {
        languageContent: {},
        language: 'zh',
        page: 1,
        keyword: '',
        typeList: ['shipment', 'container'],
        current: 'shipment',
        ownedId: '',
        ownedLabel: '',
        shipmentColumns: [{
            id: 'AllShipment',
            labelCn: '全部船运',
            labelEn: 'All Shipment'
        }, {
            id: 'MyShipment',
            labelCn: '我的船运',
            labelEn: 'My Shipment'
        }],
        containerColumns: [{
            id: 'AllContainer',
            labelCn: '全部货柜',
            labelEn: 'All Container'
        }, {
            id: 'MyContainer',
            labelCn: '我的货柜',
            labelEn: 'My Container'
        }],
        list: [],
        loading: false,
        noMore: false,
        noData: false,
        showPopup: false,
        defaultIndex: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.initLanguage()
        this.search()
    },

    onReachBottom() {
        if (this.data.loading || this.data.noMore) return
        this.setData({
            page: ++this.data.page,
            loading: true
        })
        this.dealPaging()
    },

    initLanguage() {
        const language = languageUtils.languageVersion()
        this.setData({
            languageContent: language.lang.page.shipment,
            language: language.lang.page.langue
        })
        wx.setNavigationBarTitle({
            title: language.lang.page.shipment.title,
        })
        this.setData({
            ownedId: this.data.shipmentColumns[0].id,
            ownedLabel: this.data.language === 'zh' ? this.data.shipmentColumns[0].labelCn : this.data.shipmentColumns[0].labelEn
        })
    },

    setInput(e) {
        let value = e.detail.value.toUpperCase()
        let regvalue = value.trim()
        this.setData({
            keyword: regvalue
        })
    },

    deleteValue() {
        this.setData({
            keyword: ''
        })
        this.search()
    },

    changeCategory() {
        this.setData({
            showPopup: true
        })
    },

    onClose() {
        this.setData({
            showPopup: false
        })
    },

    onConfirm(e) {
        this.setData({
            ownedId: e.detail.id,
            ownedLabel: this.data.language === 'zh' ? e.detail.labelCn : e.detail.labelEn,
            showPopup: false
        })
        this.search()
    },

    changeType(e) {
        this.setData({
            current: e.currentTarget.dataset.type,
            noData: false,
            noMore: false,
            keyword: '',
            ownedId: e.currentTarget.dataset.type === 'shipment' ? this.data.shipmentColumns[0].id : this.data.containerColumns[0].id,
            ownedLabel: e.currentTarget.dataset.type === 'shipment' ? (this.data.language === 'zh' ? this.data.shipmentColumns[0].labelCn : this.data.shipmentColumns[0].labelEn) : (this.data.language === 'zh' ? this.data.containerColumns[0].labelCn : this.data.containerColumns[0].labelEn)
        })
        this.search()
    },

    search() {
        this.setData({
            loading: true,
            page: 1,
            list: []
        })
        allList = []
        if (this.data.current === 'shipment') {
            if (wx.getStorageSync('partnerList')[0]?.code == '0002130568') {
                allList = [
                    {
                    "bookingReference": "NAM6249215",
                    "estimatedDateOfArrival": "2023-06-20T21:00:00Z",
                    "from": "LIANYUNGANG, CNLYG",
                    "to": "SHEKOU, CNSHK",
                    "status": "FINALBLISSUED",
                    "vesselName": "PALAWAN",
                    "voyageReference": "0XKE3S1MA"
                },
                  {
                    "bookingReference": "SHZ5589054",
                    "estimatedDateOfArrival": "2023-06-19T07:00:00Z",
                    "from": "YANTIAN, CNYTN",
                    "to": "SINGAPORE, SGSIN",
                    "status": "Booked",
                    "vesselName": "CMA CGM CHAMPS ELYSEES",
                    "voyageReference": "0FLF5W1MA"
                },
                  {
                    "bookingReference": "YGG0109344",
                    "estimatedDateOfArrival": "2023-06-12T22:09:00Z",
                    "from": "LIANYUNGANG, CNLYG",
                    "to": "YANTIAN, CNYTN",
                    "status": "Booked",
                    "vesselName": "CMA CGM MEDEA",
                    "voyageReference": "0TN9QN1MA"
                },
                  {
                    "bookingReference": "DXB0768741",
                    "estimatedDateOfArrival": "2023-07-03T20:00:00Z",
                    "from": "JEBEL ALI",
                    "to": "SHEKOU",
                    "status": "DraftSI",
                    "vesselName": "APGWA",
                    "voyageReference": "0MD82E1MA"
                },
                  {
                    "bookingReference": "CHN0307065",
                    "from": "SHANGHAI",
                    "to": "HAMBURG",
                    "status": "DraftSI",
                    "vesselName": "CGTRO",
                    "voyageReference": "0FLF1W1MA"
                },
                 ]
                allList.forEach(listItem => {
                    if (listItem.status === "DraftSI") {
                        listItem.status = "SI Saved"
                    }
                })
                this.dealPaging()
            } else {
                shipmentsViewForSpotOn({
                    ccgId: wx.getStorageSync('ccgId'),
                    owned: this.data.ownedId !== 'AllShipment',
                    bookingReference: this.data.keyword
                }).then(res => {
                    if (res.data) {
                        allList = res.data
                        console.log('1111111111', allList, JSON.stringify(allList))
                        allList.forEach(listItem => {
                            if (listItem.status === "DraftSI") {
                                listItem.status = "SI Saved"
                            }
                        })
                        this.dealPaging()
                    } else {
                        this.setData({
                            loading: false,
                            noData: true
                        })
                    }

                }, () => {
                    this.setData({
                        loading: false,
                        noData: true
                    })
                })
            }

        } else {
            if (wx.getStorageSync('partnerList')[0]?.code == '0002130568') {
                allList = [
                    {
                    "bookingreference": "MAGU2239792",
                    "containerNumber": "MAGU2239792",
                    "dischargeDatePODLocal": "2023-07-18T04:18:00+08:00",
                    "containerSizeType": "20ST",
                    "statusCode": "XOF",
                    "locationName": "LOS ANGELES, CA",
                    "statusDateLocal": "2023-06-10T13:55:00Z",
                    "vesselName": "EVER FOND",
                    "voyageReference": "0FTHSN1MA"
                },
                  {
                    "bookingreference": "NAM6249215",
                    "containerNumber": "CMAU0875630",
                    "dischargeDatePODLocal": "2023-07-18T04:18:00+08:00",
                    "containerSizeType": "20ST",
                    "statusCode": "XOF",
                    "locationName": "LOS ANGELES, CA",
                    "statusDateLocal": "2023-06-10T13:55:00Z",
                    "vesselName": "EVER FOND",
                    "voyageReference": "0FTHSN1MA"
                },
                  {
                    "bookingreference": "NAM6249215",
                    "containerNumber": "CAIU3707093",
                    "dischargeDatePODLocal": "2023-07-18T04:18:00+08:00",
                    "containerSizeType": "20ST",
                    "statusCode": "XOF",
                    "locationName": "LOS ANGELES, CA",
                    "statusDateLocal": "2023-06-10T13:52:00Z",
                    "vesselName": "EVER FOND",
                    "voyageReference": "0FTHSN1MA"
                },
                  {
                    "bookingreference": "NAM6249215",
                    "containerNumber": "TEMU3240783",
                    "dischargeDatePODLocal": "2023-07-18T04:18:00+08:00",
                    "containerSizeType": "20ST",
                    "statusCode": "XOF",
                    "locationName": "LOS ANGELES, CA",
                    "statusDateLocal": "2023-06-10T13:52:00Z",
                    "vesselName": "EVER FOND",
                    "voyageReference": "0FTHSN1MA"
                },
                  {
                    "bookingreference": "NAM6249215",
                    "containerNumber": "TEMU0227469",
                    "dischargeDatePODLocal": "2023-07-18T04:18:00+08:00",
                    "containerSizeType": "20ST",
                    "statusCode": "XOF",
                    "locationName": "LOS ANGELES, CA",
                    "statusDateLocal": "2023-06-10T13:49:00Z",
                    "vesselName": "EVER FOND",
                    "voyageReference": "0FTHSN1MA"
                },]
                this.dealPaging()
            } else {
                shipmentsContainerList({
                    ccgId: wx.getStorageSync('ccgId'),
                    owned: this.data.ownedId !== 'AllContainer',
                    containerOrBookingReference: this.data.keyword
                }).then(res => {
                    if (res.data) {
                        allList = res.data
                        this.dealPaging()
                    } else {
                        this.setData({
                            loading: false,
                            noData: true
                        })
                    }
                }, () => {
                    this.setData({
                        loading: false,
                        noData: true
                    })
                })
            }

        }
    },

    dealPaging() {
        setTimeout(() => {
            const list = allList.slice((this.data.page - 1) * pageSize, this.data.page * pageSize)
            list.forEach(item => {
                item.statusLabel = utils.formatHuoYunStatus(item.statusCode, this.data.language)
            })
            this.setData({
                noData: !allList.length,
                list: this.data.list.concat(list),
                loading: false
            })
            this.setData({
                noMore: this.data.list.length >= allList.length
            })
        }, 200);
    }
})