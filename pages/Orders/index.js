// pages/Orders/index.js
import {
  shipmentTracking
} from '../../api/modules/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shipmentRef: '',
    dataLength: null,
    detail: null,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '查询',
    })
    if (options.str) {
      this.setData({
        shipmentRef: options.str
      })
      this.getHuoGuiResult()
    }
  },

  changeHuoguiValue(e) {
    this.setData({
      shipmentRef: e.detail.value
    })
  },

  getHuoGuiResult() {
    // const res = {
    //   "code": "200",
    //   "message": "操作成功",
    //   "data": [{
    //     "data": {
    //       "portOfLoading": {
    //         "code": "FRLEH",
    //         "name": "LE HAVRE",
    //         "unLocode": "FRLEH"
    //       },
    //       "portOfLoadingCountryCode": "FR",
    //       "portOfDischarge": {
    //         "code": "DEHAM",
    //         "name": "HAMBURG",
    //         "unLocode": "DEHAM"
    //       },
    //       "portOfDischargeCountryCode": "DE",
    //       "voyageReference": "ICP1010",
    //       "nbUnits": 0,
    //       "routes": [{
    //         "journeyLegs": [],
    //         "containers": [{
    //           "id": "PARTLOAD214",
    //           "size": 20,
    //           "type": "ST",
    //           "movements": [{
    //             "statusOrder": "637840404",
    //             "status": {
    //               "code": "IDF",
    //               "name": "Discharged from Vessel at Final Port terminal"
    //             },
    //             "date": "2022-03-28T05:00:00+02:00",
    //             "poolLocation": "DEHAMDHAM",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "DEHAMDHAM",
    //               "facilityCodifications": [],
    //               "name": "HAMBURG"
    //             },
    //             "pointLocation": {
    //               "code": "DEHAM",
    //               "name": "HAMBURG",
    //               "unLocode": "DEHAM"
    //             },
    //             "voyageReference": "ICP1010",
    //             "vessel": {
    //               "code": "DIM366",
    //               "name": "RegTest Vsl No366"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfOrigin": "FRLEH",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "finalDest": "DEHAM",
    //             "countryCode": "DE",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637840368",
    //             "status": {
    //               "code": "XOF",
    //               "name": "Loaded on Vessel at Port terminal"
    //             },
    //             "date": "2022-03-28T04:00:00+02:00",
    //             "poolLocation": "FRLEHDLEH",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "FRLEHDLEH",
    //               "facilityCodifications": [],
    //               "name": "LE HAVRE PRINCIPAL"
    //             },
    //             "pointLocation": {
    //               "code": "FRLEH",
    //               "name": "LE HAVRE",
    //               "unLocode": "FRLEH"
    //             },
    //             "voyageReference": "ICP1010",
    //             "vessel": {
    //               "code": "DIM366",
    //               "name": "RegTest Vsl No366"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfOrigin": "FRLEH",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "finalDest": "DEHAM",
    //             "countryCode": "FR",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637840332",
    //             "status": {
    //               "code": "XRX",
    //               "name": "Gate in at Port terminal"
    //             },
    //             "date": "2022-03-28T03:00:00+02:00",
    //             "poolLocation": "FRLEHDLEH",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "FRLEHDLEH",
    //               "facilityCodifications": [],
    //               "name": "LE HAVRE PRINCIPAL"
    //             },
    //             "pointLocation": {
    //               "code": "FRLEH",
    //               "name": "LE HAVRE",
    //               "unLocode": "FRLEH"
    //             },
    //             "voyageReference": "ICP1010",
    //             "vessel": {
    //               "code": "DIM366",
    //               "name": "RegTest Vsl No366"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfOrigin": "FRLEH",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "finalDest": "DEHAM",
    //             "countryCode": "FR",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637840296",
    //             "status": {
    //               "code": "MOS",
    //               "name": "Gate out Empty to Shipper"
    //             },
    //             "date": "2022-03-28T02:00:00+02:00",
    //             "poolLocation": "FRLEHDLEH",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "FRLEHDLEH",
    //               "facilityCodifications": [],
    //               "name": "LE HAVRE PRINCIPAL"
    //             },
    //             "pointLocation": {
    //               "code": "FRLEH",
    //               "name": "LE HAVRE",
    //               "unLocode": "FRLEH"
    //             },
    //             "voyageReference": "ICP1010",
    //             "vessel": {
    //               "code": "DIM366",
    //               "name": "RegTest Vsl No366"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfOrigin": "FRLEH",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "finalDest": "DEHAM",
    //             "countryCode": "FR",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637840260",
    //             "status": {
    //               "code": "MEA",
    //               "name": "Container Empty Returned"
    //             },
    //             "date": "2022-03-28T01:00:00+02:00",
    //             "poolLocation": "FRLEHDLEH",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "FRLEHDLEH",
    //               "facilityCodifications": [],
    //               "name": "LE HAVRE PRINCIPAL"
    //             },
    //             "pointLocation": {
    //               "code": "FRLEH",
    //               "name": "LE HAVRE",
    //               "unLocode": "FRLEH"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "countryCode": "FR",
    //             "shipCompCode": "0001"
    //           }]
    //         }, {
    //           "id": "PARTLOAD215",
    //           "size": 20,
    //           "type": "ST",
    //           "movements": [{
    //             "statusOrder": "637840404",
    //             "status": {
    //               "code": "IDF",
    //               "name": "Discharged from Vessel at Final Port terminal"
    //             },
    //             "date": "2022-03-28T05:00:00+02:00",
    //             "poolLocation": "DEHAMDHAM",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "DEHAMDHAM",
    //               "facilityCodifications": [],
    //               "name": "HAMBURG"
    //             },
    //             "pointLocation": {
    //               "code": "DEHAM",
    //               "name": "HAMBURG",
    //               "unLocode": "DEHAM"
    //             },
    //             "voyageReference": "ICP1010",
    //             "vessel": {
    //               "code": "DIM366",
    //               "name": "RegTest Vsl No366"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfOrigin": "FRLEH",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "finalDest": "DEHAM",
    //             "countryCode": "DE",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637840368",
    //             "status": {
    //               "code": "XOF",
    //               "name": "Loaded on Vessel at Port terminal"
    //             },
    //             "date": "2022-03-28T04:00:00+02:00",
    //             "poolLocation": "FRLEHDLEH",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "FRLEHDLEH",
    //               "facilityCodifications": [],
    //               "name": "LE HAVRE PRINCIPAL"
    //             },
    //             "pointLocation": {
    //               "code": "FRLEH",
    //               "name": "LE HAVRE",
    //               "unLocode": "FRLEH"
    //             },
    //             "voyageReference": "ICP1010",
    //             "vessel": {
    //               "code": "DIM366",
    //               "name": "RegTest Vsl No366"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfOrigin": "FRLEH",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "finalDest": "DEHAM",
    //             "countryCode": "FR",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637840332",
    //             "status": {
    //               "code": "XRX",
    //               "name": "Gate in at Port terminal"
    //             },
    //             "date": "2022-03-28T03:00:00+02:00",
    //             "poolLocation": "FRLEHDLEH",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "FRLEHDLEH",
    //               "facilityCodifications": [],
    //               "name": "LE HAVRE PRINCIPAL"
    //             },
    //             "pointLocation": {
    //               "code": "FRLEH",
    //               "name": "LE HAVRE",
    //               "unLocode": "FRLEH"
    //             },
    //             "voyageReference": "ICP1010",
    //             "vessel": {
    //               "code": "DIM366",
    //               "name": "RegTest Vsl No366"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfOrigin": "FRLEH",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "finalDest": "DEHAM",
    //             "countryCode": "FR",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637840296",
    //             "status": {
    //               "code": "MOS",
    //               "name": "Gate out Empty to Shipper"
    //             },
    //             "date": "2022-03-28T02:00:00+02:00",
    //             "poolLocation": "FRLEHDLEH",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "FRLEHDLEH",
    //               "facilityCodifications": [],
    //               "name": "LE HAVRE PRINCIPAL"
    //             },
    //             "pointLocation": {
    //               "code": "FRLEH",
    //               "name": "LE HAVRE",
    //               "unLocode": "FRLEH"
    //             },
    //             "voyageReference": "ICP1010",
    //             "vessel": {
    //               "code": "DIM366",
    //               "name": "RegTest Vsl No366"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfOrigin": "FRLEH",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "finalDest": "DEHAM",
    //             "countryCode": "FR",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637840260",
    //             "status": {
    //               "code": "MEA",
    //               "name": "Container Empty Returned"
    //             },
    //             "date": "2022-03-28T01:00:00+02:00",
    //             "poolLocation": "FRLEHDLEH",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "FRLEHDLEH",
    //               "facilityCodifications": [],
    //               "name": "LE HAVRE PRINCIPAL"
    //             },
    //             "pointLocation": {
    //               "code": "FRLEH",
    //               "name": "LE HAVRE",
    //               "unLocode": "FRLEH"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "countryCode": "FR",
    //             "shipCompCode": "0001"
    //           }]
    //         }]
    //       }]
    //     },
    //     "shipmentRef": "LHV2574096"
    //   }],
    //   "success": true
    // }
    // if (!this.data.shipmentRef) {
    //   wx.showToast({
    //     title: '请输入货柜号、提单号或订舱号',
    //     icon: 'none'
    //   })
    //   return
    // }

    // const res = {
    //   "code": "200",
    //   "message": "操作成功",
    //   "data": [{
    //     "data": {
    //       "portOfLoading": {
    //         "code": "FRLEH",
    //         "name": "LE HAVRE",
    //         "unLocode": "FRLEH"
    //       },
    //       "portOfLoadingCountryCode": "FR",
    //       "portOfDischarge": {
    //         "code": "DEHAM",
    //         "name": "HAMBURG",
    //         "unLocode": "DEHAM"
    //       },
    //       "portOfDischargeCountryCode": "DE",
    //       "voyageReference": "BLS1028",
    //       "nbUnits": 0,
    //       "routes": [{
    //         "journeyLegs": [{
    //           "sequenceNumber": 1,
    //           "pointFrom": {
    //             "code": "FRLEH",
    //             "name": "LE HAVRE",
    //             "unLocode": "FRLEH"
    //           },
    //           "vesselFrom": {
    //             "name": "RegTest Vsl No18"
    //           },
    //           "vesselTo": {
    //             "code": "CGM18",
    //             "name": "RegTest Vsl No18"
    //           },
    //           "pointTo": {
    //             "code": "DEHAM",
    //             "name": "HAMBURG",
    //             "unLocode": "DEHAM"
    //           },
    //           "poolLocationFromCode": "FRLEHD21",
    //           "facilityFrom": {
    //             "facilityType": "Shipping Terminal",
    //             "internalCode": "FRLEHD21",
    //             "facilityCodifications": [{
    //               "codificationType": "SMDG",
    //               "codification": "FRLEHQATL"
    //             }],
    //             "name": "TERMINAL DE L'ATLANTIQUE"
    //           },
    //           "poolLocationToCode": "DEHAMDBMW",
    //           "facilityTo": {
    //             "facilityType": "Shipper Pool",
    //             "internalCode": "DEHAMDBMW",
    //             "facilityCodifications": [],
    //             "name": "UNITS EX BMW"
    //           },
    //           "collectionDate": "2022-02-11T14:00:00+01:00",
    //           "voyageReference": "BLS1028",
    //           "dischargeVoyageReference": "BLS1028",
    //           "deliveryDate": "2022-02-12T14:00:00+01:00",
    //           "shipCompCode": "0001"
    //         }],
    //         "containers": [{
    //           "id": "BLLEVEL0219",
    //           "size": 20,
    //           "type": "ST",
    //           "movements": [{
    //             "statusOrder": "637803216",
    //             "status": {
    //               "code": "XOF",
    //               "name": "Loaded on Vessel at Port terminal"
    //             },
    //             "date": "2022-04-15T04:00:00+01:00",
    //             "poolLocation": "DEHAMDHAM",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "DEHAMDHAM",
    //               "facilityCodifications": [],
    //               "name": "HAMBURG"
    //             },
    //             "pointLocation": {
    //               "code": "DEHAM",
    //               "name": "HAMBURG",
    //               "unLocode": "DEHAM"
    //             },
    //             "voyageReference": "BLS1028",
    //             "vessel": {
    //               "code": "CGM18",
    //               "name": "RegTest Vsl No18"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "countryCode": "DE",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637803180",
    //             "status": {
    //               "code": "XRX",
    //               "name": "Gate in at Port terminal"
    //             },
    //             "date": "2022-04-07T03:00:00+01:00",
    //             "poolLocation": "DEHAMDHAM",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "DEHAMDHAM",
    //               "facilityCodifications": [],
    //               "name": "HAMBURG"
    //             },
    //             "pointLocation": {
    //               "code": "DEHAM",
    //               "name": "HAMBURG",
    //               "unLocode": "DEHAM"
    //             },
    //             "voyageReference": "BLS1028",
    //             "vessel": {
    //               "code": "CGM18",
    //               "name": "RegTest Vsl No18"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "countryCode": "DE",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637803144",
    //             "status": {
    //               "code": "MOS",
    //               "name": "Gate out Empty to Shipper"
    //             },
    //             "date": "2022-02-13T02:00:00+01:00",
    //             "poolLocation": "DEHAMDHAM",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "DEHAMDHAM",
    //               "facilityCodifications": [],
    //               "name": "HAMBURG"
    //             },
    //             "pointLocation": {
    //               "code": "DEHAM",
    //               "name": "HAMBURG",
    //               "unLocode": "DEHAM"
    //             },
    //             "voyageReference": "BLS1028",
    //             "vessel": {
    //               "code": "CGM18",
    //               "name": "RegTest Vsl No18"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "portOfLoading": "FRLEH",
    //             "finalPod": "DEHAM",
    //             "countryCode": "DE",
    //             "shipCompCode": "0001",
    //             "voyageShipCompCode": "0001"
    //           }, {
    //             "statusOrder": "637803108",
    //             "status": {
    //               "code": "MEA",
    //               "name": "Container Empty Returned"
    //             },
    //             "date": "2022-02-13T01:00:00+01:00",
    //             "poolLocation": "FRLEHDLEH",
    //             "facility": {
    //               "facilityType": "Container Yard",
    //               "internalCode": "FRLEHDLEH",
    //               "facilityCodifications": [],
    //               "name": "LE HAVRE PRINCIPAL"
    //             },
    //             "pointLocation": {
    //               "code": "FRLEH",
    //               "name": "LE HAVRE",
    //               "unLocode": "FRLEH"
    //             },
    //             "pointOfDischarge": "DEHAM",
    //             "countryCode": "FR",
    //             "shipCompCode": "0001"
    //           }]
    //         }]
    //       }]
    //     },
    //     "shipmentRef": "LHV2564717"
    //   }],
    //   "success": true
    // }

    // const res = {
    //   "code": "200",
    //   "message": "操作成功",
    //   "data": [
    //     {
    //       "data": {
    //         "portOfLoading": {
    //           "code": "FRLEH",
    //           "name": "LE HAVRE",
    //           "unLocode": "FRLEH"
    //         },
    //         "portOfLoadingCountryCode": "FR",
    //         "portOfDischarge": {
    //           "code": "DEHAM",
    //           "name": "HAMBURG",
    //           "unLocode": "DEHAM"
    //         },
    //         "portOfDischargeCountryCode": "DE",
    //         "voyageReference": "ICP1010",
    //         "nbUnits": 0,
    //         "routes": [
    //           {
    //             "journeyLegs": [],
    //             "containers": [
    //               {
    //                 "id": "PARTLOAD214",
    //                 "size": 20,
    //                 "type": "ST",
    //                 "movements": [
    //                   {
    //                     "statusOrder": "637840404",
    //                     "status": {
    //                       "code": "IDF",
    //                       "name": "Discharged from Vessel at Final Port terminal"
    //                     },
    //                     "date": "2022-03-28T05:00:00+02:00",
    //                     "poolLocation": "DEHAMDHAM",
    //                     "facility": {
    //                       "facilityType": "Container Yard",
    //                       "internalCode": "DEHAMDHAM",
    //                       "facilityCodifications": [],
    //                       "name": "HAMBURG"
    //                     },
    //                     "pointLocation": {
    //                       "code": "DEHAM",
    //                       "name": "HAMBURG",
    //                       "unLocode": "DEHAM"
    //                     },
    //                     "voyageReference": "ICP1010",
    //                     "vessel": {
    //                       "code": "DIM366",
    //                       "name": "RegTest Vsl No366"
    //                     },
    //                     "pointOfDischarge": "DEHAM",
    //                     "portOfOrigin": "FRLEH",
    //                     "portOfLoading": "FRLEH",
    //                     "finalPod": "DEHAM",
    //                     "finalDest": "DEHAM",
    //                     "countryCode": "DE",
    //                     "shipCompCode": "0001",
    //                     "voyageShipCompCode": "0001"
    //                   },
    //                   {
    //                     "statusOrder": "637840368",
    //                     "status": {
    //                       "code": "XOF",
    //                       "name": "Loaded on Vessel at Port terminal"
    //                     },
    //                     "date": "2022-03-28T04:00:00+02:00",
    //                     "poolLocation": "FRLEHDLEH",
    //                     "facility": {
    //                       "facilityType": "Container Yard",
    //                       "internalCode": "FRLEHDLEH",
    //                       "facilityCodifications": [],
    //                       "name": "LE HAVRE PRINCIPAL"
    //                     },
    //                     "pointLocation": {
    //                       "code": "FRLEH",
    //                       "name": "LE HAVRE",
    //                       "unLocode": "FRLEH"
    //                     },
    //                     "voyageReference": "ICP1010",
    //                     "vessel": {
    //                       "code": "DIM366",
    //                       "name": "RegTest Vsl No366"
    //                     },
    //                     "pointOfDischarge": "DEHAM",
    //                     "portOfOrigin": "FRLEH",
    //                     "portOfLoading": "FRLEH",
    //                     "finalPod": "DEHAM",
    //                     "finalDest": "DEHAM",
    //                     "countryCode": "FR",
    //                     "shipCompCode": "0001",
    //                     "voyageShipCompCode": "0001"
    //                   },
    //                   {
    //                     "statusOrder": "637840332",
    //                     "status": {
    //                       "code": "XRX",
    //                       "name": "Gate in at Port terminal"
    //                     },
    //                     "date": "2022-03-28T03:00:00+02:00",
    //                     "poolLocation": "FRLEHDLEH",
    //                     "facility": {
    //                       "facilityType": "Container Yard",
    //                       "internalCode": "FRLEHDLEH",
    //                       "facilityCodifications": [],
    //                       "name": "LE HAVRE PRINCIPAL"
    //                     },
    //                     "pointLocation": {
    //                       "code": "FRLEH",
    //                       "name": "LE HAVRE",
    //                       "unLocode": "FRLEH"
    //                     },
    //                     "voyageReference": "ICP1010",
    //                     "vessel": {
    //                       "code": "DIM366",
    //                       "name": "RegTest Vsl No366"
    //                     },
    //                     "pointOfDischarge": "DEHAM",
    //                     "portOfOrigin": "FRLEH",
    //                     "portOfLoading": "FRLEH",
    //                     "finalPod": "DEHAM",
    //                     "finalDest": "DEHAM",
    //                     "countryCode": "FR",
    //                     "shipCompCode": "0001",
    //                     "voyageShipCompCode": "0001"
    //                   },
    //                   {
    //                     "statusOrder": "637840296",
    //                     "status": {
    //                       "code": "MOS",
    //                       "name": "Gate out Empty to Shipper"
    //                     },
    //                     "date": "2022-03-28T02:00:00+02:00",
    //                     "poolLocation": "FRLEHDLEH",
    //                     "facility": {
    //                       "facilityType": "Container Yard",
    //                       "internalCode": "FRLEHDLEH",
    //                       "facilityCodifications": [],
    //                       "name": "LE HAVRE PRINCIPAL"
    //                     },
    //                     "pointLocation": {
    //                       "code": "FRLEH",
    //                       "name": "LE HAVRE",
    //                       "unLocode": "FRLEH"
    //                     },
    //                     "voyageReference": "ICP1010",
    //                     "vessel": {
    //                       "code": "DIM366",
    //                       "name": "RegTest Vsl No366"
    //                     },
    //                     "pointOfDischarge": "DEHAM",
    //                     "portOfOrigin": "FRLEH",
    //                     "portOfLoading": "FRLEH",
    //                     "finalPod": "DEHAM",
    //                     "finalDest": "DEHAM",
    //                     "countryCode": "FR",
    //                     "shipCompCode": "0001",
    //                     "voyageShipCompCode": "0001"
    //                   },
    //                   {
    //                     "statusOrder": "637840260",
    //                     "status": {
    //                       "code": "MEA",
    //                       "name": "Container Empty Returned"
    //                     },
    //                     "date": "2022-03-28T01:00:00+02:00",
    //                     "poolLocation": "FRLEHDLEH",
    //                     "facility": {
    //                       "facilityType": "Container Yard",
    //                       "internalCode": "FRLEHDLEH",
    //                       "facilityCodifications": [],
    //                       "name": "LE HAVRE PRINCIPAL"
    //                     },
    //                     "pointLocation": {
    //                       "code": "FRLEH",
    //                       "name": "LE HAVRE",
    //                       "unLocode": "FRLEH"
    //                     },
    //                     "pointOfDischarge": "DEHAM",
    //                     "countryCode": "FR",
    //                     "shipCompCode": "0001"
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       "shipmentRef": "PARTLOAD214"
    //     },
    //     {
    //       "data": {
    //         "portOfLoading": {
    //           "code": "FRLEH",
    //           "name": "LE HAVRE",
    //           "unLocode": "FRLEH"
    //         },
    //         "portOfLoadingCountryCode": "FR",
    //         "portOfDischarge": {
    //           "code": "DEHAM",
    //           "name": "HAMBURG",
    //           "unLocode": "DEHAM"
    //         },
    //         "portOfDischargeCountryCode": "DE",
    //         "voyageReference": "BLS1028",
    //         "nbUnits": 0,
    //         "routes": [
    //           {
    //             "journeyLegs": [
    //               {
    //                 "sequenceNumber": 1,
    //                 "pointFrom": {
    //                   "code": "FRLEH",
    //                   "name": "LE HAVRE",
    //                   "unLocode": "FRLEH"
    //                 },
    //                 "vesselFrom": {
    //                   "name": "RegTest Vsl No18"
    //                 },
    //                 "vesselTo": {
    //                   "code": "CGM18",
    //                   "name": "RegTest Vsl No18"
    //                 },
    //                 "pointTo": {
    //                   "code": "DEHAM",
    //                   "name": "HAMBURG",
    //                   "unLocode": "DEHAM"
    //                 },
    //                 "poolLocationFromCode": "FRLEHD21",
    //                 "facilityFrom": {
    //                   "facilityType": "Shipping Terminal",
    //                   "internalCode": "FRLEHD21",
    //                   "facilityCodifications": [
    //                     {
    //                       "codificationType": "SMDG",
    //                       "codification": "FRLEHQATL"
    //                     }
    //                   ],
    //                   "name": "TERMINAL DE L'ATLANTIQUE"
    //                 },
    //                 "poolLocationToCode": "DEHAMDBMW",
    //                 "facilityTo": {
    //                   "facilityType": "Shipper Pool",
    //                   "internalCode": "DEHAMDBMW",
    //                   "facilityCodifications": [],
    //                   "name": "UNITS EX BMW"
    //                 },
    //                 "collectionDate": "2022-02-11T14:00:00+01:00",
    //                 "voyageReference": "BLS1028",
    //                 "dischargeVoyageReference": "BLS1028",
    //                 "deliveryDate": "2022-02-12T14:00:00+01:00",
    //                 "shipCompCode": "0001"
    //               }
    //             ],
    //             "containers": [
    //               {
    //                 "id": "BLLEVEL0219",
    //                 "size": 20,
    //                 "type": "ST",
    //                 "movements": [
    //                   {
    //                     "statusOrder": "637803216",
    //                     "status": {
    //                       "code": "XOF",
    //                       "name": "Loaded on Vessel at Port terminal"
    //                     },
    //                     "date": "2022-02-13T04:00:00+01:00",
    //                     "poolLocation": "DEHAMDHAM",
    //                     "facility": {
    //                       "facilityType": "Container Yard",
    //                       "internalCode": "DEHAMDHAM",
    //                       "facilityCodifications": [],
    //                       "name": "HAMBURG"
    //                     },
    //                     "pointLocation": {
    //                       "code": "DEHAM",
    //                       "name": "HAMBURG",
    //                       "unLocode": "DEHAM"
    //                     },
    //                     "voyageReference": "BLS1028",
    //                     "vessel": {
    //                       "code": "CGM18",
    //                       "name": "RegTest Vsl No18"
    //                     },
    //                     "pointOfDischarge": "DEHAM",
    //                     "portOfLoading": "FRLEH",
    //                     "finalPod": "DEHAM",
    //                     "countryCode": "DE",
    //                     "shipCompCode": "0001",
    //                     "voyageShipCompCode": "0001"
    //                   },
    //                   {
    //                     "statusOrder": "637803180",
    //                     "status": {
    //                       "code": "XRX",
    //                       "name": "Gate in at Port terminal"
    //                     },
    //                     "date": "2022-02-13T03:00:00+01:00",
    //                     "poolLocation": "DEHAMDHAM",
    //                     "facility": {
    //                       "facilityType": "Container Yard",
    //                       "internalCode": "DEHAMDHAM",
    //                       "facilityCodifications": [],
    //                       "name": "HAMBURG"
    //                     },
    //                     "pointLocation": {
    //                       "code": "DEHAM",
    //                       "name": "HAMBURG",
    //                       "unLocode": "DEHAM"
    //                     },
    //                     "voyageReference": "BLS1028",
    //                     "vessel": {
    //                       "code": "CGM18",
    //                       "name": "RegTest Vsl No18"
    //                     },
    //                     "pointOfDischarge": "DEHAM",
    //                     "portOfLoading": "FRLEH",
    //                     "finalPod": "DEHAM",
    //                     "countryCode": "DE",
    //                     "shipCompCode": "0001",
    //                     "voyageShipCompCode": "0001"
    //                   },
    //                   {
    //                     "statusOrder": "637803144",
    //                     "status": {
    //                       "code": "MOS",
    //                       "name": "Gate out Empty to Shipper"
    //                     },
    //                     "date": "2022-02-13T02:00:00+01:00",
    //                     "poolLocation": "DEHAMDHAM",
    //                     "facility": {
    //                       "facilityType": "Container Yard",
    //                       "internalCode": "DEHAMDHAM",
    //                       "facilityCodifications": [],
    //                       "name": "HAMBURG"
    //                     },
    //                     "pointLocation": {
    //                       "code": "DEHAM",
    //                       "name": "HAMBURG",
    //                       "unLocode": "DEHAM"
    //                     },
    //                     "voyageReference": "BLS1028",
    //                     "vessel": {
    //                       "code": "CGM18",
    //                       "name": "RegTest Vsl No18"
    //                     },
    //                     "pointOfDischarge": "DEHAM",
    //                     "portOfLoading": "FRLEH",
    //                     "finalPod": "DEHAM",
    //                     "countryCode": "DE",
    //                     "shipCompCode": "0001",
    //                     "voyageShipCompCode": "0001"
    //                   },
    //                   {
    //                     "statusOrder": "637803108",
    //                     "status": {
    //                       "code": "MEA",
    //                       "name": "Container Empty Returned"
    //                     },
    //                     "date": "2022-02-13T01:00:00+01:00",
    //                     "poolLocation": "FRLEHDLEH",
    //                     "facility": {
    //                       "facilityType": "Container Yard",
    //                       "internalCode": "FRLEHDLEH",
    //                       "facilityCodifications": [],
    //                       "name": "LE HAVRE PRINCIPAL"
    //                     },
    //                     "pointLocation": {
    //                       "code": "FRLEH",
    //                       "name": "LE HAVRE",
    //                       "unLocode": "FRLEH"
    //                     },
    //                     "pointOfDischarge": "DEHAM",
    //                     "countryCode": "FR",
    //                     "shipCompCode": "0001"
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       "shipmentRef": "LHV2564717"
    //     }
    //   ],
    //   "success": true
    // }

    let value = this.data.shipmentRef;
    if (!value) {
      wx.showToast({
        title: '请输入货柜号、提单号或订舱号',
        icon: 'none',
        mask: true
      })
      return
    }
    var reg = /^([0-9a-zA-Z,])*([0-9a-zA-Z]+)$/;
    value = value.substr(value.length - 1, 1) === ',' ? value.substr(0, value.length - 1) : value;
    if (!reg.test(value)) {
      wx.showToast({
        title: '货柜号、提单号或订舱号格式有误',
        icon: 'none',
        mask: true
      })
      return
    }
    const length = value.split(',').length
    if (length > 3) {
      wx.showToast({
        title: '最多同时支持3个编号搜索',
        icon: 'none',
        mask: true
      })
      return
    }

    let obj = {
      shipmentRef: value,
      eqpid: ''
    }
    shipmentTracking(obj).then(res => {
    const data = res.data;
    if (!data.length || (data.length === 1 && !data[0].data)) {
      this.setData({
        dataLength: 0,
        list: data
      })
    } else {
      const dataLength = data.filter(u => u.data).length;
      if (!dataLength) {
        this.setData({
          dataLength: 0,
          list: data
        })
        return
      }
      if (data.length === 1 && data[0].data.routes[0].containers.length === 1) {
        this.setData({
          dataLength: 1,
          detail: data[0].data.routes[0].containers[0],
          list: data
        })
      } else {
        this.setData({
          dataLength: 2,
          list: data
        })
      }
    }
    })
  }
})