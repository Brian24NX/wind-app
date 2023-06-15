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
      if(wx.getStorageSync('partnerList')[0]?.code == '0002130568'){
        allList=[{"bookingReference":"YGG0109523","estimatedDateOfArrival":"2023-06-20T21:00:00Z","from":"LIANYUNGANG, CNLYG","to":"SHEKOU, CNSHK","status":"Booked","vesselName":"PALAWAN","voyageReference":"0XKE3S1MA"},{"bookingReference":"SHZ5589054","estimatedDateOfArrival":"2023-06-19T07:00:00Z","from":"YANTIAN, CNYTN","to":"SINGAPORE, SGSIN","status":"Booked","vesselName":"CMA CGM CHAMPS ELYSEES","voyageReference":"0FLF5W1MA"},{"bookingReference":"YGG0109344","estimatedDateOfArrival":"2023-06-12T22:09:00Z","from":"LIANYUNGANG, CNLYG","to":"YANTIAN, CNYTN","status":"Booked","vesselName":"CMA CGM MEDEA","voyageReference":"0TN9QN1MA"},{"bookingReference":"DXB0768741","estimatedDateOfArrival":"2023-07-03T20:00:00Z","from":"JEBEL ALI","to":"SHEKOU","status":"DraftSI","vesselName":"APGWA","voyageReference":"0MD82E1MA"},{"bookingReference":"CHN0307065","from":"SHANGHAI","to":"HAMBURG","status":"DraftSI","vesselName":"CGTRO","voyageReference":"0FLF1W1MA"},{"bookingReference":"QGD0265842","estimatedDateOfArrival":"2023-06-04T22:00:00Z","from":"QINGDAO, CNTAO","to":"SHEKOU, CNSHK","status":"Cancelled","vesselName":"CMA CGM MASAI MARA","voyageReference":"0WWF7W1MA"},{"bookingReference":"SWA0378131","estimatedDateOfArrival":"0001-01-01T00:00:00Z","from":"SHANTOU","to":"CHARLESTON, SC","status":"DraftSI"},{"bookingReference":"NAM6249215","estimatedDateOfArrival":"2023-07-17T20:18:00Z","from":"LOS ANGELES, CA, USLAX","to":"SHEKOU, CNSHK","status":"FinalBLIssued","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingReference":"QGD0241533","from":"QINGDAO, CNTAO","to":"SHEKOU, CNSHK","status":"BookingInProgress"},{"bookingReference":"SHZ5498939","estimatedDateOfArrival":"2023-06-14T13:00:00Z","from":"YANTIAN","to":"CALLAO","status":"DraftSI","vesselName":"EVLYR","voyageReference":"0LSELE1MA"},{"bookingReference":"WBMOD10088252","estimatedDateOfArrival":"2023-05-23T21:00:00Z","from":"SHANGHAI, CNSHA","to":"HAMBURG, DEHAM","status":"BookingInProgress","vesselName":"EVER GENIUS","voyageReference":"0SCBJW1MA"},{"bookingReference":"WBMOD10086786","estimatedDateOfArrival":"2023-05-24T04:00:00Z","from":"SHANGHAI, CNSHA","to":"HAMBURG, DEHAM","status":"BookingInProgress","vesselName":"EVER GENIUS","voyageReference":"0SCBJW1MA"},{"bookingReference":"HKA2287129","from":"SHEKOU","to":"LAZARO CARDENAS","status":"DraftSI","vesselName":"CGADM","voyageReference":"0MHEJE1MA"},{"bookingReference":"GGZ1874039","from":"SHEKOU","to":"CAUCEDO","status":"DraftSI","vesselName":"APYGS","voyageReference":"0PPF9E1MA"},{"bookingReference":"SWA0375811","estimatedDateOfArrival":"2023-05-16T18:00:00Z","from":"SHANTOU","to":"ABIDJAN","status":"DraftSI","vesselName":"JKLON","voyageReference":"0XW2FS1MA"},{"bookingReference":"SHZ5458813","from":"YANTIAN","to":"MIAMI, FL","status":"DraftSI","vesselName":"CGCET","voyageReference":"0XR27E1MA"},{"bookingReference":"SHZ5455266","estimatedDateOfArrival":"2023-04-05T19:00:00Z","from":"YANTIAN, CNYTN","to":"LOS ANGELES, CA, USLAX","status":"BookingInProgress","vesselName":"CMA CGM CHRISTOPHE COLOMB","voyageReference":"0TXE1E1MA"},{"bookingReference":"SHZ5242125","from":"YANTIAN","to":"LOS ANGELES, CA","status":"DraftSI","vesselName":"CGTNE","voyageReference":"0TXCRE1MA"},{"bookingReference":"JAM0166683","estimatedDateOfArrival":"2023-04-19T19:00:00Z","from":"KINGSTON, JMKIN","to":"SHEKOU, CNSHK","status":"Booked","vesselName":"CMA CGM ARGENTINA","voyageReference":"0PPTZW1MA"},{"bookingReference":"CNCC801947","estimatedDateOfArrival":"2023-03-08T14:00:00Z","from":"SHANGHAI, CNSHA","to":"HONG KONG, HKHKG","status":"Booked","vesselName":"CMA CGM LIBERTY","voyageReference":"0TXDZE1MA"},{"bookingReference":"GGZ1862782","from":"YANTIAN","to":"ROUEN","status":"DraftSI","vesselName":"CGSOR","voyageReference":"0FLEBW1MA"},{"bookingReference":"JAM0166495","estimatedDateOfArrival":"2023-04-05T21:00:00Z","from":"KINGSTON, JMKIN","to":"SHEKOU, CNSHK","status":"Booked","vesselName":"CMA CGM ATTILA","voyageReference":"0PGE4W1MA"},{"bookingReference":"ZSN0554800","from":"SHEKOU","to":"ISTANBUL, AMBARLI PORT E. SIDE","status":"DraftSI","vesselName":"JUSCH","voyageReference":"0BXENW1MA"},{"bookingReference":"SHZ5420001","estimatedDateOfArrival":"2023-03-29T19:00:00Z","from":"SHEKOU","to":"JEBEL ALI","status":"DraftSI","vesselName":"APGWA","voyageReference":"0MD7JW1MA"},{"bookingReference":"WBMOD10048304","estimatedDateOfArrival":"2023-03-30T20:00:00Z","from":"SHANGHAI, CNSHA","to":"HAMBURG, DEHAM","status":"BookingInProgress","vesselName":"EVER ATOP","voyageReference":"0LAE7W1MA"},{"bookingReference":"WBMOD10048284","estimatedDateOfArrival":"2023-03-30T20:00:00Z","from":"SHANGHAI, CNSHA","to":"HAMBURG, DEHAM","status":"BookingInProgress","vesselName":"EVER ATOP","voyageReference":"0LAE7W1MA"},{"bookingReference":"TSMD232319","from":"TIANJIN XINGANG","to":"BUENAVENTURA","status":"DraftSI"},{"bookingReference":"WBMOD10045642","estimatedDateOfArrival":"2023-03-31T01:00:00Z","from":"SHANGHAI, CNSHA","to":"HAMBURG, DEHAM","status":"BookingInProgress","vesselName":"CMA CGM TROCADERO","voyageReference":"0FLE9W1MA"},{"bookingReference":"JAM0166063","from":"KINGSTON","to":"SHEKOU","status":"DraftSI","vesselName":"CGAQI","voyageReference":"0PPTXW1MA"},{"bookingReference":"WBMOD10043970","estimatedDateOfArrival":"2023-03-15T20:00:00Z","from":"SHANGHAI, CNSHA","to":"HAMBURG, DEHAM","status":"BookingInProgress","vesselName":"EVER GOVERN","voyageReference":"0LAE3W1MA"},{"bookingReference":"WBMOD10043835","estimatedDateOfArrival":"2023-03-23T20:00:00Z","from":"SHANGHAI, CNSHA","to":"HAMBURG, DEHAM","status":"BookingInProgress","vesselName":"EVER ALOT","voyageReference":"0LAE5W1MA"},{"bookingReference":"SHZ5398159","estimatedDateOfArrival":"2023-02-06T16:30:00Z","from":"YANTIAN, CNYTN","to":"JEBEL ALI, AEJEA","status":"BookingInProgress","vesselName":"CMA CGM CONCORDE","voyageReference":"0FLDVW1MA"},{"bookingReference":"SHZ5398154","estimatedDateOfArrival":"2023-02-06T16:30:00Z","from":"YANTIAN, CNYTN","to":"JEBEL ALI, AEJEA","status":"BookingInProgress","vesselName":"CMA CGM CONCORDE","voyageReference":"0FLDVW1MA"},{"bookingReference":"SHZ5396683","estimatedDateOfArrival":"2023-02-13T16:00:00Z","from":"QINZHOU, CNQZH","to":"VANCOUVER, BC, CAVAN","status":"BookingInProgress","vesselName":"OOCL SAN FRANCISCO","voyageReference":"0TPDVE1MA"},{"bookingReference":"SHZ5347336","from":"SHEKOU","to":"NINGBO","status":"DraftSI","vesselName":"CGTAG","voyageReference":"0PGDZE1MA"},{"bookingReference":"JAM0166073","estimatedDateOfArrival":"2023-02-19T19:00:00Z","from":"KINGSTON, JMKIN","to":"SHEKOU, CNSHK","status":"Booked","vesselName":"CMA CGM VELA","voyageReference":"0PPE6W1MA"}]
        allList.forEach(listItem => {
          if(listItem.status === "DraftSI"){
            listItem.status = "SI Saved"
          }
        })
        this.dealPaging()
      }else{
        shipmentsViewForSpotOn({
          ccgId: wx.getStorageSync('ccgId'),
          owned: this.data.ownedId !== 'AllShipment',
          bookingReference: this.data.keyword
        }).then(res => {
          if (res.data) {
            allList = res.data
            console.log('1111111111',allList,JSON.stringify(allList))
            allList.forEach(listItem => {
              if(listItem.status === "DraftSI"){
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
      if(wx.getStorageSync('partnerList')[0]?.code == '0002130568'){
        allList=[{"bookingreference":"NAM6249215","containerNumber":"MAGU2239792","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:55:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"CMAU0875630","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:55:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"CAIU3707093","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:52:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"TEMU3240783","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:52:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"TEMU0227469","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:49:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"TCLU7252194","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:49:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"TRHU3662231","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:47:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"APZU3936760","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:47:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"TRLU9614964","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:45:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"APZU3856920","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:45:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"CMAU0323116","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:43:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"},{"bookingreference":"NAM6249215","containerNumber":"TLLU2806305","dischargeDatePODLocal":"2023-07-18T04:18:00+08:00","containerSizeType":"20ST","statusCode":"XOF","locationName":"LOS ANGELES, CA","statusDateLocal":"2023-06-10T13:43:00Z","vesselName":"EVER FOND","voyageReference":"0FTHSN1MA"}]
        this.dealPaging()
      }else{
        shipmentsContainerList({
          ccgId: wx.getStorageSync('ccgId'),
          owned: this.data.ownedId !== 'AllContainer',
          containerOrBookingReference: this.data.keyword
        }).then(res => {
          if (res.data) {
            allList = res.data
            console.log('222222222222',allList,JSON.stringify(allList))
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