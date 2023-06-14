// pages/Quotation/List/index.js
import {
    quotationSort,
    getQuotationSurchargeDetail,
    fuzzyPointSearch,
    seaEarnPoints,
} from '../../../api/modules/quotation';

const languageUtil = require('../../../utils/languageUtils')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        languageContent: {},
        seaReward: {},
        language: 'zh',
        isPhoneX: getApp().globalData.isPhoneX,
        transMode: {},
        oldQuoteLineList: [],
        traceId: '',
        containers: 0,
        hasContainers: 0,
        loggedId: '',
        simulationDate: '',
        quoteLineList: [],
        planList: [],
        fromLabel: '',
        toLabel: '',
        fromCode: '',
        toCode: '',
        receiptHaulage: '',
        deliveryHaulage: '',
        currentPlan: null,
        sort: '1',
        plans: [],
        needEarlyFlag: false,
        needDirectFlag: false,
        sortSolutionServices: [],
        isLoading: true,
        showRemind: false,
        currentIndex: null,
        equipmentSize: '',
        shippingCompany: '',
        portOfLoading: '',
        portOfLoadingLabel: '',
        portOfDischarge: '',
        portOfDischargeLabel: '',
        placeOfOrigin: '',
        finalPlaceOfDelivery: '',
        commodityCode: '',
        partnerCode: [],
        isUs: false,
        equiptCode: '',
        shipperOwnedContainer: false,
        rewardsEarned: null,
        memberStatus: '',
        porCount:0,
        count:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.isUs) {
            this.setData({
                isUs: true
            })
        }
        wx.setNavigationBarTitle({
            title: languageUtil.languageVersion().lang.page.qutationResult.title
        })
        this.setData({
            languageContent: languageUtil.languageVersion().lang.page.qutationResult,
            language: languageUtil.languageVersion().lang.page.langue,
            transMode: wx.getStorageSync('transMode'),
            seaReward: languageUtil.languageVersion().lang.page.seaReward,
            memberStatus: wx.getStorageSync('seaRewardData').memberStatus
        })
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 2]
        const data = currentPage.data
        console.log('list----- data', data, data.shippingCompany)
        this.setData({
            equiptCode: data.equiptCode,
            partnerCode: data.partnerCode,
            portOfLoading: data.portOfLoading,
            portOfLoadingLabel: data.portOfLoadingLabel,
            portOfDischarge: data.portOfDischarge,
            portOfDischargeLabel: data.portOfDischargeLabel,
            finalPlaceOfDelivery: data.finalPlaceOfDelivery,
            placeOfOrigin: data.placeOfOrigin,
            commodityCode: data.commodityCode,
            containers: data.containers,
            equipmentSize: data.equipmentType,
            shippingCompany: data.shippingCompany,
            simulationDate: data.simulationDate,
            fromLabel: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[0] : data.portOfLoadingLabel.split(';')[0],
            toLabel: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[0] : data.portOfDischargeLabel.split(';')[0],
            fromCode: data.placeOfOriginLabel ? data.placeOfOriginLabel.split(';')[1] : data.portOfLoadingLabel.split(';')[1],
            toCode: data.finalPlaceOfDeliveryLabel ? data.finalPlaceOfDeliveryLabel.split(';')[1] : data.portOfDischargeLabel.split(';')[1],
            receiptHaulage: data.receiptHaulage || '',
            deliveryHaulage: data.deliveryHaulage || '',
            shipperOwnedContainer: data.shipperOwnedContainer
        })
        console.log('list----containers', this.data.containers,data.resultResq.traceId)
        if (data.resultResq.traceId) {
            console.log('oldQuoteLineList', data.resultResq.nextDepartureQuoteLineAndRoute)
            this.setData({
                oldQuoteLineList: data.resultResq.nextDepartureQuoteLineAndRoute,
                traceId: data.resultResq.traceId,
                loggedId: data.resultResq.loggedId,
                sortSolutionServices: [...new Set(data.resultResq.nextDepartureQuoteLineAndRoute.map(obj => {
                    return obj.scheduleDescription
                }))],
                plans: [...new Set(data.resultResq.nextDepartureQuoteLineAndRoute.map(obj => {
                    return obj.scheduleDescription
                }))]
            })
            this.sortData(true)
        } else {
            if(wx.getStorageSync('partnerList')[0].code === '0002130568'){
                this.sortData(true)
            }else{
                this.setData({
                    isLoading: false
                })
            }
        }
    },

    // 筛选
    onTabbarChange(e) {
        if (e.detail.actived === 1) {
            this.setData({
                sort: e.detail.result
            })
        }
        if (e.detail.actived === 2) {
            this.setData({
                plans: e.detail.result
            })
        }
        if (e.detail.actived === 3) {
            this.setData({
                needEarlyFlag: e.detail.result
            })
        }
        if (e.detail.actived === 4) {
            this.setData({
                needDirectFlag: e.detail.result
            })
        }
        this.sortData()
    },

    sortData(isFirst) {
        let params = {
            routings: this.data.oldQuoteLineList,
            sortDateType: Number(this.data.sort),
            sortSolutionServices: this.data.plans
        }
        if (this.data.needEarlyFlag) {
            params.needEarlyFlag = true
        }
        if (this.data.needDirectFlag) {
            params.needDirectFlag = true
        }
        console.log(11111,wx.getStorageSync('partnerList')[0].code === '0002130568')
        if (wx.getStorageSync('partnerList')[0].code === '0002130568') {
            console.log(1111)
            let quoteLineList = []
            if (this.data.receiptHaulage) {
                quoteLineList = [
                    {
                    "solutionNumber": 2,
                    "scheduleNumber": 1,
                    "scheduleDescription": "Service French Asia Line 3",
                    "vesselName": "APL SINGAPURA",
                    "voyage": "0FMD3W1MA",
                    "transitTime": "46",
                    "totalCO2": 0.98,
                    "departureDate": "2023-06-17T12:00:00+00:00",
                    "arrivalDate": "2023-08-02T06:00:00+00:00",
                    "cutoffLocation": "JIAXING, 33",
                    "tranShipment": ["SHANGHAI , CN", "LE HAVRE , FR"],
                    "noOfLegs": 2,
                    "withOutOfferDisplay": false,
                    "quoteLines": [{
                        "quoteLineExternalId": "48180936",
                        "quoteLineId": 0,
                        "quotationReference": "11761-SPOT-ASIA_NE/EUR_IOI_OCEANIA-DR/OG-ALL",
                        "quoteLineType": "PL",
                        "exportMovementType": "Ramp",
                        "importMovementType": "Door",
                        "portOfLoading": "CNSHA",
                        "portOfDischarge": "FRLEH",
                        "origin": "CNJIX",
                        "destination": "FRPAR",
                        "oversize": false,
                        "shipperOwnedContainer": false,
                        "hazardous": false,
                        "reefer": false,
                        "tariff": {"tarrifType": "PL", "basedRateType": "BOF", "dealPeriod": "SPOT"},
                        "equipments": [{
                            "code": "40ST",
                            "oceanFreightRate": 1200,
                            "currencyCode": "USD",
                            "maxNetWeight": 0
                        }],
                        "shippingCompany": "0001",
                        "commodities": [{"commodityType": "GRP", "code": "FAK LISA (UPA)", "name": "Freight All Kind"}],
                        "freightOfAllKinds": true,
                        "exportModeOfTranportCode": "BA",
                        "importModeOfTranportCode": "BR",
                        "nonOperatingReefer": false,
                        "validityFrom": "2023-06-15T00:00:00",
                        "validityTo": "2023-07-15T00:00:00",
                        "controlledAtmosphere": false,
                        "overLength": false,
                        "overWidth": false,
                        "overHeight": false,
                        "cargoType": "ST",
                        "routingComment": "[SCHEDULE:0FMD3W1MA]",
                        "exportConstruction": true,
                        "importConstruction": true,
                        "inlandExportConstructed": true,
                        "inlandImportConstructed": true,
                        "lineSequence": 0,
                        "fedralMaritimeControl": false,
                        "allowSpecialQuotation": false,
                        "spotValidityInDays": 28,
                        "underDeck": false,
                        "premium": false,
                        "solutionNumber": 2,
                        "scheduleNumber": 1,
                        "spotOffer": true,
                        "numberOfContainer": 1,
                        "spotNbContainer": 0
                    }],
                    "routingLegs": [{
                        "legNumber": 1,
                        "cO2": 0,
                        "lineInstruction": false,
                        "feeder": false,
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "CNJIX",
                            "placeName": "JIAXING, 33",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "port": false
                        },
                        "arrivalDetails": {
                            "placeCode": "CNSHA",
                            "placeName": "SHANGHAI",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "port": false
                        },
                        "co2": 0
                    }, {
                        "legNumber": 2,
                        "cO2": 0,
                        "departureDate": "2023-06-17T12:00:00+00:00",
                        "arrivalDate": "2023-08-02T06:00:00+00:00",
                        "cutOffDate": "2023-06-15T00:00:00+00:00",
                        "vgmCutOffDate": "2023-06-15T00:00:00+00:00",
                        "standardBookingAcceptance": "2023-06-15T00:00:00+00:00",
                        "specialBookingAcceptance": "2023-06-13T00:00:00+00:00",
                        "serviceName": "French Asia Line 3",
                        "serviceCode": "FAL3",
                        "lineInstruction": false,
                        "vesselName": "APL SINGAPURA",
                        "feeder": false,
                        "voyageRef": "0FMD3W1MA",
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "CNSHA",
                            "placeName": "SHANGHAI",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "terminalCode": "YAN",
                            "terminalName": "YANGSHAN DEEP WATER PORT PHASE1 TER",
                            "port": true
                        },
                        "arrivalDetails": {
                            "placeCode": "FRLEH",
                            "placeName": "LE HAVRE",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "terminalCode": "TDF",
                            "terminalName": "TERMINAL DE FRANCE",
                            "port": true
                        },
                        "co2": 0
                    }, {
                        "legNumber": 3,
                        "cO2": 0,
                        "lineInstruction": false,
                        "feeder": false,
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "FRLEH",
                            "placeName": "LE HAVRE",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "port": false
                        },
                        "arrivalDetails": {
                            "placeCode": "FRPAR",
                            "placeName": "PARIS, 75",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "port": false
                        },
                        "co2": 0
                    }],
                    "offerId": "ba7a665e-16df-407f-b636-1e6531743ab0",
                    "departureDateFlag": true,
                    "arrivalDateFlag": false,
                    "transitFlag": false,
                    "isLoading": false,
                    "canSelect": true,
                    "rewardsEarned": Math.round(84.2*this.data.containers),
                    "placeOfReceiptLabel": "JIAXING, 33, CN",
                    "placeOfReceiptLabelCountry": "China",
                    "placeOfLoadingLabel": "SHANGHAI, CN",
                    "placeOfLoadingLabelCountry": "China",
                    "placeOfDeliveryLabel": "PARIS, 75, FR",
                    "placeOfDeliveryLabelCountry": "France",
                    "placeOfDischargeLabel": "LE HAVRE, FR",
                    "placeOfDischargeLabelCountry": "France",
                    "surchargeDetails": {
                        "sizeType": "40ST",
                        "oceanFreight": {
                            "price": {"amount": 2105, "currency": {"code": "USD"}},
                            "fixedByThePricer": false,
                            "convertedRate": 0,
                            "isManualCharge": false
                        },
                        "collectCharges": {"amount": 287, "currency": {"code": "USD", "name": "USD"}},
                        "prepaidCharges": {"amount": 143, "currency": {"code": "USD", "name": "USD"}},
                        "freightCharges": {"amount": 0, "currency": {"code": "USD", "name": "USD"}},
                        "perBLCharges": {"amount": 25, "currency": {"code": "USD", "name": "USD"}},
                        "oceanFreightDetails": ["Bunker surcharge NOS", "Ocean Carrier-Intl Ship & port Facility Security", "Pre carriage haulage", "On carriage haulage"],
                        "collectChargeDetails": [{
                            "price": {"amount": 35, "currency": {"code": "EUR", "name": "EUR"}},
                            "paymentMethod": "C",
                            "fixedByThePricer": false,
                            "chargeCode": "FEE85",
                            "chargeName": "Container inspection fees and survey fees",
                            "convertedRate": 38,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 230, "currency": {"code": "EUR", "name": "EUR"}},
                            "paymentMethod": "C",
                            "fixedByThePricer": false,
                            "chargeCode": "THC34",
                            "chargeName": "Terminal handl. ch  destination",
                            "convertedRate": 248,
                            "isManualCharge": false
                        }],
                        "prepaidChargeDetails": [{
                            "price": {"amount": 30, "currency": {"code": "CNY", "name": "CNY"}},
                            "paymentMethod": "P",
                            "fixedByThePricer": false,
                            "chargeCode": "SEA06",
                            "chargeName": "Sealing service export",
                            "convertedRate": 4,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 990, "currency": {"code": "CNY", "name": "CNY"}},
                            "paymentMethod": "P",
                            "fixedByThePricer": false,
                            "chargeCode": "THC58",
                            "chargeName": "Terminal handl ch origin",
                            "commentOnChargeRule": "If standard dimensions and container gross weight over 30.50 tons, THC rates CNY 1094 / 1635 / 2038 per 20’ / 40 ‘ / 45’  DRY\n",
                            "convertedRate": 138,
                            "isManualCharge": false
                        }],
                        "freightChargeDetails": [],
                        "oceanFreightChargeDetails": [{
                            "price": {
                                "amount": 720,
                                "currency": {"code": "USD", "name": "USD"}
                            },
                            "fixedByThePricer": true,
                            "chargeCode": "BAF03",
                            "chargeName": "Bunker surcharge NOS",
                            "convertedRate": 720,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 14, "currency": {"code": "USD", "name": "USD"}},
                            "fixedByThePricer": true,
                            "chargeCode": "ISS01",
                            "chargeName": "Ocean Carrier-Intl Ship & port Facility Security",
                            "convertedRate": 14,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 235, "currency": {"code": "USD", "name": "USD"}},
                            "paymentMethod": "P",
                            "fixedByThePricer": false,
                            "chargeCode": "CAR00",
                            "chargeName": "Pre carriage haulage",
                            "convertedRate": 235,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 606, "currency": {"code": "EUR", "name": "EUR"}},
                            "paymentMethod": "C",
                            "fixedByThePricer": false,
                            "chargeCode": "CAR50",
                            "chargeName": "On carriage haulage",
                            "convertedRate": 654,
                            "isManualCharge": false
                        }],
                        "perBLChargeDetails": [{
                            "description": "Export Declaration Surcharge",
                            "rate": 25,
                            "convertedRate": 25,
                            "currency": "USD",
                            "paymentMethod": "P",
                            "hasFixed": false,
                            "code": "CUS16"
                        }],
                        "totalCharge": {"amount": 2535, "currency": {"code": "USD"}},
                        "allocation": true
                    }
                },
                    {
                    "solutionNumber": 2,
                    "scheduleNumber": 2,
                    "scheduleDescription": "Service French Asia Line 3",
                    "vesselName": "APL SINGAPURA",
                    "voyage": "0FMD3W1MA",
                    "transitTime": "46",
                    "totalCO2": 0.98,
                    "departureDate": "2023-06-17T12:00:00+00:00",
                    "arrivalDate": "2023-08-02T06:00:00+00:00",
                    "cutoffLocation": "JIAXING, 33",
                    "tranShipment": ["SHANGHAI , CN", "LE HAVRE , FR"],
                    "noOfLegs": 2,
                    "withOutOfferDisplay": false,
                    "quoteLines": [{
                        "quoteLineExternalId": "48180936",
                        "quoteLineId": 0,
                        "quotationReference": "11761-SPOT-ASIA_NE/EUR_IOI_OCEANIA-DR/OG-ALL",
                        "quoteLineType": "PL",
                        "exportMovementType": "Ramp",
                        "importMovementType": "Door",
                        "portOfLoading": "CNSHA",
                        "portOfDischarge": "FRLEH",
                        "origin": "CNJIX",
                        "destination": "FRPAR",
                        "oversize": false,
                        "shipperOwnedContainer": false,
                        "hazardous": false,
                        "reefer": false,
                        "tariff": {"tarrifType": "PL", "basedRateType": "BOF", "dealPeriod": "SPOT"},
                        "equipments": [{
                            "code": "40ST",
                            "oceanFreightRate": 1200,
                            "currencyCode": "USD",
                            "maxNetWeight": 0
                        }],
                        "shippingCompany": "0001",
                        "commodities": [{"commodityType": "GRP", "code": "FAK LISA (UPA)", "name": "Freight All Kind"}],
                        "freightOfAllKinds": true,
                        "exportModeOfTranportCode": "BA",
                        "importModeOfTranportCode": "RD",
                        "nonOperatingReefer": false,
                        "validityFrom": "2023-06-15T00:00:00",
                        "validityTo": "2023-07-15T00:00:00",
                        "controlledAtmosphere": false,
                        "overLength": false,
                        "overWidth": false,
                        "overHeight": false,
                        "cargoType": "ST",
                        "routingComment": "[SCHEDULE:0FMD3W1MA]",
                        "exportConstruction": true,
                        "importConstruction": true,
                        "inlandExportConstructed": true,
                        "inlandImportConstructed": true,
                        "lineSequence": 0,
                        "fedralMaritimeControl": false,
                        "allowSpecialQuotation": false,
                        "spotValidityInDays": 28,
                        "underDeck": false,
                        "premium": false,
                        "solutionNumber": 2,
                        "scheduleNumber": 2,
                        "spotOffer": true,
                        "numberOfContainer": 1,
                        "spotNbContainer": 0
                    }],
                    "routingLegs": [{
                        "legNumber": 1,
                        "cO2": 0,
                        "lineInstruction": false,
                        "feeder": false,
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "CNJIX",
                            "placeName": "JIAXING, 33",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "port": false
                        },
                        "arrivalDetails": {
                            "placeCode": "CNSHA",
                            "placeName": "SHANGHAI",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "port": false
                        },
                        "co2": 0
                    }, {
                        "legNumber": 2,
                        "cO2": 0,
                        "departureDate": "2023-06-17T12:00:00+00:00",
                        "arrivalDate": "2023-08-02T06:00:00+00:00",
                        "cutOffDate": "2023-06-15T00:00:00+00:00",
                        "vgmCutOffDate": "2023-06-15T00:00:00+00:00",
                        "standardBookingAcceptance": "2023-06-15T00:00:00+00:00",
                        "specialBookingAcceptance": "2023-06-13T00:00:00+00:00",
                        "serviceName": "French Asia Line 3",
                        "serviceCode": "FAL3",
                        "lineInstruction": false,
                        "vesselName": "APL SINGAPURA",
                        "feeder": false,
                        "voyageRef": "0FMD3W1MA",
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "CNSHA",
                            "placeName": "SHANGHAI",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "terminalCode": "YAN",
                            "terminalName": "YANGSHAN DEEP WATER PORT PHASE1 TER",
                            "port": true
                        },
                        "arrivalDetails": {
                            "placeCode": "FRLEH",
                            "placeName": "LE HAVRE",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "terminalCode": "TDF",
                            "terminalName": "TERMINAL DE FRANCE",
                            "port": true
                        },
                        "co2": 0
                    }, {
                        "legNumber": 3,
                        "cO2": 0,
                        "lineInstruction": false,
                        "feeder": false,
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "FRLEH",
                            "placeName": "LE HAVRE",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "port": false
                        },
                        "arrivalDetails": {
                            "placeCode": "FRPAR",
                            "placeName": "PARIS, 75",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "port": false
                        },
                        "co2": 0
                    }],
                    "offerId": "c4487dd5-0287-4992-8e8a-27d311e7ed0b",
                    "departureDateFlag": true,
                    "arrivalDateFlag": false,
                    "transitFlag": false,
                    "isLoading": false,
                    "canSelect": false,
                    "rewardsEarned": Math.round(84.2*this.data.containers),
                    "placeOfReceiptLabel": "JIAXING, 33, CN",
                    "placeOfReceiptLabelCountry": "China",
                    "placeOfDischargeLabel": "LE HAVRE, FR",
                    "placeOfDischargeLabelCountry": "France",
                    "placeOfDeliveryLabel": "PARIS, 75, FR",
                    "placeOfDeliveryLabelCountry": "France",
                    "placeOfLoadingLabel": "SHANGHAI, CN",
                    "placeOfLoadingLabelCountry": "China",
                },
                    {
                    "solutionNumber": 2,
                    "scheduleNumber": 3,
                    "scheduleDescription": "Service French Asia Line 3",
                    "vesselName": "APL SINGAPURA",
                    "voyage": "0FMD3W1MA",
                    "transitTime": "46",
                    "totalCO2": 0.98,
                    "departureDate": "2023-06-17T12:00:00+00:00",
                    "arrivalDate": "2023-08-02T06:00:00+00:00",
                    "cutoffLocation": "JIAXING, 33",
                    "tranShipment": ["SHANGHAI , CN", "LE HAVRE , FR"],
                    "noOfLegs": 2,
                    "withOutOfferDisplay": false,
                    "quoteLines": [{
                        "quoteLineExternalId": "48180936",
                        "quoteLineId": 0,
                        "quotationReference": "11761-SPOT-ASIA_NE/EUR_IOI_OCEANIA-DR/OG-ALL",
                        "quoteLineType": "PL",
                        "exportMovementType": "Ramp",
                        "importMovementType": "Door",
                        "portOfLoading": "CNSHA",
                        "portOfDischarge": "FRLEH",
                        "origin": "CNJIX",
                        "destination": "FRPAR",
                        "oversize": false,
                        "shipperOwnedContainer": false,
                        "hazardous": false,
                        "reefer": false,
                        "tariff": {"tarrifType": "PL", "basedRateType": "BOF", "dealPeriod": "SPOT"},
                        "equipments": [{
                            "code": "40ST",
                            "oceanFreightRate": 1200,
                            "currencyCode": "USD",
                            "maxNetWeight": 0
                        }],
                        "shippingCompany": "0001",
                        "commodities": [{"commodityType": "GRP", "code": "FAK LISA (UPA)", "name": "Freight All Kind"}],
                        "freightOfAllKinds": true,
                        "exportModeOfTranportCode": "BA",
                        "importModeOfTranportCode": "RR",
                        "nonOperatingReefer": false,
                        "validityFrom": "2023-06-15T00:00:00",
                        "validityTo": "2023-07-15T00:00:00",
                        "controlledAtmosphere": false,
                        "overLength": false,
                        "overWidth": false,
                        "overHeight": false,
                        "cargoType": "ST",
                        "routingComment": "[SCHEDULE:0FMD3W1MA]",
                        "exportConstruction": true,
                        "importConstruction": true,
                        "inlandExportConstructed": true,
                        "inlandImportConstructed": true,
                        "lineSequence": 0,
                        "fedralMaritimeControl": false,
                        "allowSpecialQuotation": false,
                        "spotValidityInDays": 28,
                        "underDeck": false,
                        "premium": false,
                        "solutionNumber": 2,
                        "scheduleNumber": 3,
                        "spotOffer": true,
                        "numberOfContainer": 1,
                        "spotNbContainer": 0
                    }],
                    "routingLegs": [{
                        "legNumber": 1,
                        "cO2": 0,
                        "lineInstruction": false,
                        "feeder": false,
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "CNJIX",
                            "placeName": "JIAXING, 33",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "port": false
                        },
                        "arrivalDetails": {
                            "placeCode": "CNSHA",
                            "placeName": "SHANGHAI",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "port": false
                        },
                        "co2": 0
                    }, {
                        "legNumber": 2,
                        "cO2": 0,
                        "departureDate": "2023-06-17T12:00:00+00:00",
                        "arrivalDate": "2023-08-02T06:00:00+00:00",
                        "cutOffDate": "2023-06-15T00:00:00+00:00",
                        "vgmCutOffDate": "2023-06-15T00:00:00+00:00",
                        "standardBookingAcceptance": "2023-06-15T00:00:00+00:00",
                        "specialBookingAcceptance": "2023-06-13T00:00:00+00:00",
                        "serviceName": "French Asia Line 3",
                        "serviceCode": "FAL3",
                        "lineInstruction": false,
                        "vesselName": "APL SINGAPURA",
                        "feeder": false,
                        "voyageRef": "0FMD3W1MA",
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "CNSHA",
                            "placeName": "SHANGHAI",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "terminalCode": "YAN",
                            "terminalName": "YANGSHAN DEEP WATER PORT PHASE1 TER",
                            "port": true
                        },
                        "arrivalDetails": {
                            "placeCode": "FRLEH",
                            "placeName": "LE HAVRE",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "terminalCode": "TDF",
                            "terminalName": "TERMINAL DE FRANCE",
                            "port": true
                        },
                        "co2": 0
                    }, {
                        "legNumber": 3,
                        "cO2": 0,
                        "lineInstruction": false,
                        "feeder": false,
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "FRLEH",
                            "placeName": "LE HAVRE",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "port": false
                        },
                        "arrivalDetails": {
                            "placeCode": "FRPAR",
                            "placeName": "PARIS, 75",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "port": false
                        },
                        "co2": 0
                    }],
                    "offerId": "114b841e-e421-4c55-94f0-b00d73e460f2",
                    "departureDateFlag": true,
                    "arrivalDateFlag": false,
                    "transitFlag": false,
                    "isLoading": false,
                    "canSelect": true,
                    "rewardsEarned": Math.round(84.2*this.data.containers),
                    "placeOfLoadingLabel": "SHANGHAI, CN",
                    "placeOfLoadingLabelCountry": "China",
                    "placeOfDischargeLabel": "LE HAVRE, FR",
                    "placeOfDischargeLabelCountry": "France",
                    "placeOfReceiptLabel": "JIAXING, 33, CN",
                    "placeOfReceiptLabelCountry": "China",
                    "placeOfDeliveryLabel": "PARIS, 75, FR",
                    "placeOfDeliveryLabelCountry": "France",
                    "surchargeDetails": {
                        "sizeType": "40ST",
                        "oceanFreight": {
                            "price": {"amount": 2200, "currency": {"code": "USD"}},
                            "fixedByThePricer": false,
                            "convertedRate": 0,
                            "isManualCharge": false
                        },
                        "collectCharges": {"amount": 286, "currency": {"code": "USD", "name": "USD"}},
                        "prepaidCharges": {"amount": 143, "currency": {"code": "USD", "name": "USD"}},
                        "freightCharges": {"amount": 0, "currency": {"code": "USD", "name": "USD"}},
                        "perBLCharges": {"amount": 25, "currency": {"code": "USD", "name": "USD"}},
                        "oceanFreightDetails": ["Bunker surcharge NOS", "Ocean Carrier-Intl Ship & port Facility Security", "Pre carriage haulage", "On carriage haulage"],
                        "collectChargeDetails": [{
                            "price": {"amount": 35, "currency": {"code": "EUR", "name": "EUR"}},
                            "paymentMethod": "C",
                            "fixedByThePricer": false,
                            "chargeCode": "FEE85",
                            "chargeName": "Container inspection fees and survey fees",
                            "convertedRate": 38,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 230, "currency": {"code": "EUR", "name": "EUR"}},
                            "paymentMethod": "C",
                            "fixedByThePricer": false,
                            "chargeCode": "THC34",
                            "chargeName": "Terminal handl. ch  destination",
                            "convertedRate": 248,
                            "isManualCharge": false
                        }],
                        "prepaidChargeDetails": [{
                            "price": {"amount": 30, "currency": {"code": "CNY", "name": "CNY"}},
                            "paymentMethod": "P",
                            "fixedByThePricer": false,
                            "chargeCode": "SEA06",
                            "chargeName": "Sealing service export",
                            "convertedRate": 4,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 990, "currency": {"code": "CNY", "name": "CNY"}},
                            "paymentMethod": "P",
                            "fixedByThePricer": false,
                            "chargeCode": "THC58",
                            "chargeName": "Terminal handl ch origin",
                            "commentOnChargeRule": "If standard dimensions and container gross weight over 30.50 tons, THC rates CNY 1094 / 1635 / 2038 per 20’ / 40 ‘ / 45’  DRY\n",
                            "convertedRate": 138,
                            "isManualCharge": false
                        }],
                        "freightChargeDetails": [],
                        "oceanFreightChargeDetails": [{
                            "price": {
                                "amount": 720,
                                "currency": {"code": "USD", "name": "USD"}
                            },
                            "fixedByThePricer": true,
                            "chargeCode": "BAF03",
                            "chargeName": "Bunker surcharge NOS",
                            "convertedRate": 720,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 14, "currency": {"code": "USD", "name": "USD"}},
                            "fixedByThePricer": true,
                            "chargeCode": "ISS01",
                            "chargeName": "Ocean Carrier-Intl Ship & port Facility Security",
                            "convertedRate": 14,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 235, "currency": {"code": "USD", "name": "USD"}},
                            "paymentMethod": "P",
                            "fixedByThePricer": false,
                            "chargeCode": "CAR00",
                            "chargeName": "Pre carriage haulage",
                            "convertedRate": 235,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 692, "currency": {"code": "EUR", "name": "EUR"}},
                            "paymentMethod": "C",
                            "fixedByThePricer": false,
                            "chargeCode": "CAR50",
                            "chargeName": "On carriage haulage",
                            "convertedRate": 747,
                            "isManualCharge": false
                        }],
                        "perBLChargeDetails": [{
                            "description": "Export Declaration Surcharge",
                            "rate": 25,
                            "convertedRate": 25,
                            "currency": "USD",
                            "paymentMethod": "P",
                            "hasFixed": false,
                            "code": "CUS16"
                        }],
                        "totalCharge": {"amount": 2629, "currency": {"code": "USD"}},
                        "allocation": true
                    }
                },
                    {
                    "solutionNumber": 1,
                    "scheduleNumber": 1,
                    "scheduleDescription": "Service French Asia Line 1",
                    "vesselName": "CMA CGM LOUVRE",
                    "voyage": "0FLF7W1MA",
                    "transitTime": "35",
                    "totalCO2": 0.91,
                    "departureDate": "2023-06-18T12:00:00+00:00",
                    "arrivalDate": "2023-07-23T06:00:00+00:00",
                    "cutoffLocation": "JIAXING, 33",
                    "tranShipment": ["SHANGHAI , CN", "LE HAVRE , FR"],
                    "noOfLegs": 2,
                    "withOutOfferDisplay": false,
                    "quoteLines": [{
                        "quoteLineExternalId": "48180936",
                        "quoteLineId": 0,
                        "quotationReference": "11761-SPOT-ASIA_NE/EUR_IOI_OCEANIA-DR/OG-ALL",
                        "quoteLineType": "PL",
                        "exportMovementType": "Ramp",
                        "importMovementType": "Door",
                        "portOfLoading": "CNSHA",
                        "portOfDischarge": "FRLEH",
                        "origin": "CNJIX",
                        "destination": "FRPAR",
                        "oversize": false,
                        "shipperOwnedContainer": false,
                        "hazardous": false,
                        "reefer": false,
                        "tariff": {"tarrifType": "PL", "basedRateType": "BOF", "dealPeriod": "SPOT"},
                        "equipments": [{
                            "code": "40ST",
                            "oceanFreightRate": 1200,
                            "currencyCode": "USD",
                            "maxNetWeight": 0
                        }],
                        "shippingCompany": "0001",
                        "commodities": [{"commodityType": "GRP", "code": "FAK LISA (UPA)", "name": "Freight All Kind"}],
                        "freightOfAllKinds": true,
                        "exportModeOfTranportCode": "BA",
                        "importModeOfTranportCode": "BR",
                        "nonOperatingReefer": false,
                        "validityFrom": "2023-06-15T00:00:00",
                        "validityTo": "2023-07-15T00:00:00",
                        "controlledAtmosphere": false,
                        "overLength": false,
                        "overWidth": false,
                        "overHeight": false,
                        "cargoType": "ST",
                        "routingComment": "[SCHEDULE:0FLF7W1MA]",
                        "exportConstruction": true,
                        "importConstruction": true,
                        "inlandExportConstructed": true,
                        "inlandImportConstructed": true,
                        "lineSequence": 0,
                        "fedralMaritimeControl": false,
                        "allowSpecialQuotation": false,
                        "spotValidityInDays": 28,
                        "underDeck": false,
                        "premium": false,
                        "solutionNumber": 1,
                        "scheduleNumber": 1,
                        "spotOffer": true,
                        "numberOfContainer": 1,
                        "spotNbContainer": 0
                    }],
                    "routingLegs": [{
                        "legNumber": 1,
                        "cO2": 0,
                        "lineInstruction": false,
                        "feeder": false,
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "CNJIX",
                            "placeName": "JIAXING, 33",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "port": false
                        },
                        "arrivalDetails": {
                            "placeCode": "CNSHA",
                            "placeName": "SHANGHAI",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "port": false
                        },
                        "co2": 0
                    }, {
                        "legNumber": 2,
                        "cO2": 0,
                        "departureDate": "2023-06-18T12:00:00+00:00",
                        "arrivalDate": "2023-07-23T06:00:00+00:00",
                        "cutOffDate": "2023-06-15T20:00:00+00:00",
                        "vgmCutOffDate": "2023-06-15T20:00:00+00:00",
                        "standardBookingAcceptance": "2023-06-15T20:00:00+00:00",
                        "specialBookingAcceptance": "2023-06-13T20:00:00+00:00",
                        "serviceName": "French Asia Line 1",
                        "serviceCode": "FAL",
                        "lineInstruction": false,
                        "vesselName": "CMA CGM LOUVRE",
                        "feeder": false,
                        "voyageRef": "0FLF7W1MA",
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "CNSHA",
                            "placeName": "SHANGHAI",
                            "placeCountryCode": "CN",
                            "placeCountryName": "CHINA",
                            "terminalCode": "YAN",
                            "terminalName": "YANGSHAN DEEP WATER PORT PHASE1 TER",
                            "port": true
                        },
                        "arrivalDetails": {
                            "placeCode": "FRLEH",
                            "placeName": "LE HAVRE",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "terminalCode": "TDF",
                            "terminalName": "TERMINAL DE FRANCE",
                            "port": true
                        },
                        "co2": 0
                    }, {
                        "legNumber": 3,
                        "cO2": 0,
                        "lineInstruction": false,
                        "feeder": false,
                        "usVessel": false,
                        "departureDetails": {
                            "placeCode": "FRLEH",
                            "placeName": "LE HAVRE",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "port": false
                        },
                        "arrivalDetails": {
                            "placeCode": "FRPAR",
                            "placeName": "PARIS, 75",
                            "placeCountryCode": "FR",
                            "placeCountryName": "FRANCE",
                            "port": false
                        },
                        "co2": 0
                    }],
                    "offerId": "01fb026b-9003-403d-8c60-26b71659a58e",
                    "departureDateFlag": false,
                    "arrivalDateFlag": true,
                    "transitFlag": false,
                    "isLoading": false,
                    "canSelect": true,
                    "rewardsEarned": Math.round(84.2*this.data.containers),
                    "placeOfReceiptLabel": "JIAXING, 33, CN",
                    "placeOfReceiptLabelCountry": "China",
                    "placeOfLoadingLabel": "SHANGHAI, CN",
                    "placeOfLoadingLabelCountry": "China",
                    "placeOfDischargeLabel": "LE HAVRE, FR",
                    "placeOfDischargeLabelCountry": "France",
                    "placeOfDeliveryLabel": "PARIS, 75, FR",
                    "placeOfDeliveryLabelCountry": "France",
                    "surchargeDetails": {
                        "sizeType": "40ST",
                        "oceanFreight": {
                            "price": {"amount": 2105, "currency": {"code": "USD"}},
                            "fixedByThePricer": false,
                            "convertedRate": 0,
                            "isManualCharge": false
                        },
                        "collectCharges": {"amount": 287, "currency": {"code": "USD", "name": "USD"}},
                        "prepaidCharges": {"amount": 143, "currency": {"code": "USD", "name": "USD"}},
                        "freightCharges": {"amount": 0, "currency": {"code": "USD", "name": "USD"}},
                        "perBLCharges": {"amount": 25, "currency": {"code": "USD", "name": "USD"}},
                        "oceanFreightDetails": ["Bunker surcharge NOS", "Ocean Carrier-Intl Ship & port Facility Security", "Pre carriage haulage", "On carriage haulage"],
                        "collectChargeDetails": [{
                            "price": {"amount": 35, "currency": {"code": "EUR", "name": "EUR"}},
                            "paymentMethod": "C",
                            "fixedByThePricer": false,
                            "chargeCode": "FEE85",
                            "chargeName": "Container inspection fees and survey fees",
                            "convertedRate": 38,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 230, "currency": {"code": "EUR", "name": "EUR"}},
                            "paymentMethod": "C",
                            "fixedByThePricer": false,
                            "chargeCode": "THC34",
                            "chargeName": "Terminal handl. ch  destination",
                            "convertedRate": 248,
                            "isManualCharge": false
                        }],
                        "prepaidChargeDetails": [{
                            "price": {"amount": 30, "currency": {"code": "CNY", "name": "CNY"}},
                            "paymentMethod": "P",
                            "fixedByThePricer": false,
                            "chargeCode": "SEA06",
                            "chargeName": "Sealing service export",
                            "convertedRate": 4,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 990, "currency": {"code": "CNY", "name": "CNY"}},
                            "paymentMethod": "P",
                            "fixedByThePricer": false,
                            "chargeCode": "THC58",
                            "chargeName": "Terminal handl ch origin",
                            "commentOnChargeRule": "If standard dimensions and container gross weight over 30.50 tons, THC rates CNY 1094 / 1635 / 2038 per 20’ / 40 ‘ / 45’  DRY\n",
                            "convertedRate": 138,
                            "isManualCharge": false
                        }],
                        "freightChargeDetails": [],
                        "oceanFreightChargeDetails": [{
                            "price": {
                                "amount": 720,
                                "currency": {"code": "USD", "name": "USD"}
                            },
                            "fixedByThePricer": true,
                            "chargeCode": "BAF03",
                            "chargeName": "Bunker surcharge NOS",
                            "convertedRate": 720,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 14, "currency": {"code": "USD", "name": "USD"}},
                            "fixedByThePricer": true,
                            "chargeCode": "ISS01",
                            "chargeName": "Ocean Carrier-Intl Ship & port Facility Security",
                            "convertedRate": 14,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 235, "currency": {"code": "USD", "name": "USD"}},
                            "paymentMethod": "P",
                            "fixedByThePricer": false,
                            "chargeCode": "CAR00",
                            "chargeName": "Pre carriage haulage",
                            "convertedRate": 235,
                            "isManualCharge": false
                        }, {
                            "price": {"amount": 606, "currency": {"code": "EUR", "name": "EUR"}},
                            "paymentMethod": "C",
                            "fixedByThePricer": false,
                            "chargeCode": "CAR50",
                            "chargeName": "On carriage haulage",
                            "convertedRate": 654,
                            "isManualCharge": false
                        }],
                        "perBLChargeDetails": [{
                            "description": "Export Declaration Surcharge",
                            "rate": 25,
                            "convertedRate": 25,
                            "currency": "USD",
                            "paymentMethod": "P",
                            "hasFixed": false,
                            "code": "CUS16"
                        }],
                        "totalCharge": {"amount": 2535, "currency": {"code": "USD"}},
                        "allocation": true
                    }
                }]
            } else {
               quoteLineList = [
                    {
                        "solutionNumber": 1,
                        "scheduleNumber": 1,
                        "scheduleDescription": "Service French Asia Line 3",
                        "vesselName": "APL SINGAPURA",
                        "voyage": "0FMD3W1MA",
                        "transitTime": "42",
                        "totalCO2": 0.96,
                        "departureDate": "2023-06-17T12:00:00+00:00",
                        "arrivalDate": "2023-07-29T22:00:00+00:00",
                        "bookingCutoffDate": "2023-06-15T00:00:00Z",
                        "vgmCutoffDate": "2023-06-15T00:00:00Z",
                        "portCutoffDate": "2023-06-15T00:00:00Z",
                        "cutoffLocation": "SHANGHAI",
                        "tranShipment": [],
                        "noOfLegs": 0,
                        "withOutOfferDisplay": false,
                        "quoteLines": [{
                            "quoteLineExternalId": "48165263",
                            "quoteLineId": 0,
                            "quotationReference": "11761-SPOT-ASIA_NE/EUR_IOI_OCEANIA-DR/OG-ALL",
                            "quoteLineType": "PL",
                            "exportMovementType": "Port",
                            "importMovementType": "Port",
                            "portOfLoading": "CNSHA",
                            "portOfDischarge": "BEANR",
                            "oversize": false,
                            "shipperOwnedContainer": false,
                            "hazardous": false,
                            "reefer": false,
                            "tariff": {"tarrifType": "PL", "basedRateType": "BOF", "dealPeriod": "SPOT"},
                            "equipments": [{
                                "code": "20ST",
                                "oceanFreightRate": 825,
                                "currencyCode": "USD",
                                "maxNetWeight": 0
                            }],
                            "shippingCompany": "0001",
                            "commodities": [{
                                "commodityType": "GRP",
                                "code": "FAK LISA (UPA)",
                                "name": "Freight All Kind"
                            }],
                            "freightOfAllKinds": true,
                            "nonOperatingReefer": false,
                            "validityFrom": "2023-06-15T00:00:00",
                            "validityTo": "2023-07-15T00:00:00",
                            "controlledAtmosphere": false,
                            "overLength": false,
                            "overWidth": false,
                            "overHeight": false,
                            "cargoType": "ST",
                            "routingComment": "[SCHEDULE:0FMD3W1MA]",
                            "exportConstruction": true,
                            "importConstruction": true,
                            "inlandExportConstructed": false,
                            "inlandImportConstructed": false,
                            "lineSequence": 0,
                            "fedralMaritimeControl": false,
                            "allowSpecialQuotation": false,
                            "spotValidityInDays": 28,
                            "underDeck": false,
                            "premium": false,
                            "solutionNumber": 1,
                            "scheduleNumber": 1,
                            "spotOffer": true,
                            "numberOfContainer": 1,
                            "spotNbContainer": 0,
                            "origin": "",
                            "destination": ""
                        }],
                        "routingLegs": [{
                            "legNumber": 1,
                            "cO2": 0,
                            "departureDate": "2023-06-17T12:00:00+00:00",
                            "arrivalDate": "2023-07-29T22:00:00+00:00",
                            "cutOffDate": "2023-06-15T00:00:00+00:00",
                            "vgmCutOffDate": "2023-06-15T00:00:00+00:00",
                            "standardBookingAcceptance": "2023-06-15T00:00:00+00:00",
                            "specialBookingAcceptance": "2023-06-13T00:00:00+00:00",
                            "serviceName": "French Asia Line 3",
                            "serviceCode": "FAL3",
                            "lineInstruction": false,
                            "vesselName": "APL SINGAPURA",
                            "feeder": false,
                            "voyageRef": "0FMD3W1MA",
                            "usVessel": false,
                            "departureDetails": {
                                "placeCode": "CNSHA",
                                "placeName": "SHANGHAI",
                                "placeCountryCode": "CN",
                                "placeCountryName": "CHINA",
                                "terminalCode": "YAN",
                                "terminalName": "YANGSHAN DEEP WATER PORT PHASE1 TER",
                                "port": true
                            },
                            "arrivalDetails": {
                                "placeCode": "BEANR",
                                "placeName": "ANTWERP",
                                "placeCountryCode": "BE",
                                "placeCountryName": "BELGIUM",
                                "terminalCode": "AGT",
                                "terminalName": "ANTWERP GATEWAY 1700",
                                "port": true
                            },
                            "co2": 0
                        }],
                        "offerId": "921fa440-b569-4679-9ff6-becfa60572e5",
                        "departureDateFlag": true,
                        "arrivalDateFlag": false,
                        "transitFlag": false,
                        "isLoading": false,
                        "canSelect": true,
                        "rewardsEarned": this.data.containers*33,
                        "placeOfDischargeLabel": "ANTWERP, BE",
                        "placeOfDischargeLabelCountry": "Belgium",
                        "placeOfLoadingLabel": "SHANGHAI, CN",
                        "placeOfLoadingLabelCountry": "China",
                        "surchargeDetails": {
                            "sizeType": "20ST",
                            "oceanFreight": {
                                "price": {"amount": 825, "currency": {"code": "USD"}},
                                "fixedByThePricer": false,
                                "convertedRate": 0,
                                "isManualCharge": false
                            },
                            "collectCharges": {"amount": 259, "currency": {"code": "USD", "name": "USD"}},
                            "prepaidCharges": {"amount": 97, "currency": {"code": "USD", "name": "USD"}},
                            "freightCharges": {"amount": 0, "currency": {"code": "USD", "name": "USD"}},
                            "perBLCharges": {"amount": 25, "currency": {"code": "USD", "name": "USD"}},
                            "oceanFreightDetails": ["Bunker surcharge NOS", "Ocean Carrier-Intl Ship & port Facility Security"],
                            "collectChargeDetails": [{
                                "price": {"amount": 240, "currency": {"code": "EUR", "name": "EUR"}},
                                "paymentMethod": "C",
                                "fixedByThePricer": false,
                                "chargeCode": "THC34",
                                "chargeName": "Terminal handl. ch  destination",
                                "convertedRate": 259,
                                "isManualCharge": false
                            }],
                            "prepaidChargeDetails": [{
                                "price": {"amount": 30, "currency": {"code": "CNY", "name": "CNY"}},
                                "paymentMethod": "P",
                                "fixedByThePricer": false,
                                "chargeCode": "SEA06",
                                "chargeName": "Sealing service export",
                                "convertedRate": 4,
                                "isManualCharge": false
                            }, {
                                "price": {"amount": 665, "currency": {"code": "CNY", "name": "CNY"}},
                                "paymentMethod": "P",
                                "fixedByThePricer": false,
                                "chargeCode": "THC58",
                                "chargeName": "Terminal handl ch origin",
                                "commentOnChargeRule": "If standard dimensions and container gross weight over 30.50 tons, THC rates CNY 1094 / 1635 / 2038 per 20’ / 40 ‘ / 45’  DRY\n",
                                "convertedRate": 93,
                                "isManualCharge": false
                            }],
                            "freightChargeDetails": [],
                            "oceanFreightChargeDetails": [{
                                "price": {"amount": 360, "currency": {"code": "USD", "name": "USD"}},
                                "fixedByThePricer": true,
                                "chargeCode": "BAF03",
                                "chargeName": "Bunker surcharge NOS",
                                "convertedRate": 360,
                                "isManualCharge": false
                            }, {
                                "price": {"amount": 14, "currency": {"code": "USD", "name": "USD"}},
                                "fixedByThePricer": true,
                                "chargeCode": "ISS01",
                                "chargeName": "Ocean Carrier-Intl Ship & port Facility Security",
                                "convertedRate": 14,
                                "isManualCharge": false
                            }],
                            "perBLChargeDetails": [{
                                "description": "Export Declaration Surcharge",
                                "rate": 25,
                                "convertedRate": 25,
                                "currency": "USD",
                                "paymentMethod": "P",
                                "hasFixed": false,
                                "code": "CUS16"
                            }],
                            "totalCharge": {"amount": 1181, "currency": {"code": "USD"}},
                            "allocation": true
                        }
                    },
                    {
                        "solutionNumber": 3,
                        "scheduleNumber": 1,
                        "scheduleDescription": "Service French Asia Line 2",
                        "vesselName": "COSCO SHIPPING SOLAR",
                        "voyage": "0FAEXW1MA",
                        "transitTime": "37",
                        "totalCO2": 0.92,
                        "departureDate": "2023-06-18T12:00:00+00:00",
                        "arrivalDate": "2023-07-25T18:00:00+00:00",
                        "bookingCutoffDate": "2023-06-16T13:00:00Z",
                        "vgmCutoffDate": "2023-06-16T13:00:00Z",
                        "portCutoffDate": "2023-06-16T13:00:00Z",
                        "cutoffLocation": "SHANGHAI",
                        "tranShipment": [],
                        "noOfLegs": 0,
                        "withOutOfferDisplay": false,
                        "quoteLines": [{
                            "quoteLineExternalId": "48165263",
                            "quoteLineId": 0,
                            "quotationReference": "11761-SPOT-ASIA_NE/EUR_IOI_OCEANIA-DR/OG-ALL",
                            "quoteLineType": "PL",
                            "exportMovementType": "Port",
                            "importMovementType": "Port",
                            "portOfLoading": "CNSHA",
                            "portOfDischarge": "BEANR",
                            "oversize": false,
                            "shipperOwnedContainer": false,
                            "hazardous": false,
                            "reefer": false,
                            "tariff": {"tarrifType": "PL", "basedRateType": "BOF", "dealPeriod": "SPOT"},
                            "equipments": [{
                                "code": "20ST",
                                "oceanFreightRate": 825,
                                "currencyCode": "USD",
                                "maxNetWeight": 0
                            }],
                            "shippingCompany": "0001",
                            "commodities": [{
                                "commodityType": "GRP",
                                "code": "FAK LISA (UPA)",
                                "name": "Freight All Kind"
                            }],
                            "freightOfAllKinds": true,
                            "nonOperatingReefer": false,
                            "validityFrom": "2023-06-15T00:00:00",
                            "validityTo": "2023-07-15T00:00:00",
                            "controlledAtmosphere": false,
                            "overLength": false,
                            "overWidth": false,
                            "overHeight": false,
                            "cargoType": "ST",
                            "routingComment": "[SCHEDULE:0FAEXW1MA]",
                            "exportConstruction": true,
                            "importConstruction": true,
                            "inlandExportConstructed": false,
                            "inlandImportConstructed": false,
                            "lineSequence": 0,
                            "fedralMaritimeControl": false,
                            "allowSpecialQuotation": false,
                            "spotValidityInDays": 28,
                            "underDeck": false,
                            "premium": false,
                            "solutionNumber": 3,
                            "scheduleNumber": 1,
                            "spotOffer": true,
                            "numberOfContainer": 1,
                            "spotNbContainer": 0,
                            "origin": "",
                            "destination": ""
                        }],
                        "routingLegs": [{
                            "legNumber": 1,
                            "cO2": 0,
                            "departureDate": "2023-06-18T12:00:00+00:00",
                            "arrivalDate": "2023-07-25T18:00:00+00:00",
                            "cutOffDate": "2023-06-16T13:00:00+00:00",
                            "vgmCutOffDate": "2023-06-16T13:00:00+00:00",
                            "standardBookingAcceptance": "2023-06-16T13:00:00+00:00",
                            "specialBookingAcceptance": "2023-06-14T13:00:00+00:00",
                            "serviceName": "French Asia Line 2",
                            "serviceCode": "FAL2",
                            "lineInstruction": false,
                            "vesselName": "COSCO SHIPPING SOLAR",
                            "feeder": false,
                            "voyageRef": "0FAEXW1MA",
                            "usVessel": false,
                            "departureDetails": {
                                "placeCode": "CNSHA",
                                "placeName": "SHANGHAI",
                                "placeCountryCode": "CN",
                                "placeCountryName": "CHINA",
                                "terminalCode": "YAN",
                                "terminalName": "YANGSHAN DEEP WATER PORT PHASE1 TER",
                                "port": true
                            },
                            "arrivalDetails": {
                                "placeCode": "BEANR",
                                "placeName": "ANTWERP",
                                "placeCountryCode": "BE",
                                "placeCountryName": "BELGIUM",
                                "terminalCode": "AGT",
                                "terminalName": "ANTWERP GATEWAY 1700",
                                "port": true
                            },
                            "co2": 0
                        }],
                        "offerId": "04b150be-b912-4f7f-b089-877d9a75a37b",
                        "departureDateFlag": false,
                        "arrivalDateFlag": true,
                        "transitFlag": false,
                        "isLoading": false,
                        "canSelect": false,
                        "rewardsEarned": this.data.containers*33,
                        "placeOfLoadingLabel": "SHANGHAI, CN",
                        "placeOfLoadingLabelCountry": "China",
                        "placeOfDischargeLabel": "ANTWERP, BE",
                        "placeOfDischargeLabelCountry": "Belgium",
                        "surchargeDetails": null
                    },
                    {
                        "solutionNumber": 2,
                        "scheduleNumber": 1,
                        "scheduleDescription": "Service French Asia Line 8",
                        "vesselName": "EVER GLOBE",
                        "voyage": "0SCC3W1MA",
                        "transitTime": "35",
                        "totalCO2": 0.64,
                        "departureDate": "2023-06-22T06:00:00+00:00",
                        "arrivalDate": "2023-07-27T22:00:00+00:00",
                        "bookingCutoffDate": "2023-06-19T18:00:00Z",
                        "vgmCutoffDate": "2023-06-19T18:00:00Z",
                        "portCutoffDate": "2023-06-19T18:00:00Z",
                        "cutoffLocation": "SHANGHAI",
                        "tranShipment": [],
                        "noOfLegs": 0,
                        "withOutOfferDisplay": false,
                        "quoteLines": [{
                            "quoteLineExternalId": "48165263",
                            "quoteLineId": 0,
                            "quotationReference": "11761-SPOT-ASIA_NE/EUR_IOI_OCEANIA-DR/OG-ALL",
                            "quoteLineType": "PL",
                            "exportMovementType": "Port",
                            "importMovementType": "Port",
                            "portOfLoading": "CNSHA",
                            "portOfDischarge": "BEANR",
                            "oversize": false,
                            "shipperOwnedContainer": false,
                            "hazardous": false,
                            "reefer": false,
                            "tariff": {"tarrifType": "PL", "basedRateType": "BOF", "dealPeriod": "SPOT"},
                            "equipments": [{
                                "code": "20ST",
                                "oceanFreightRate": 825,
                                "currencyCode": "USD",
                                "maxNetWeight": 0
                            }],
                            "shippingCompany": "0001",
                            "commodities": [{
                                "commodityType": "GRP",
                                "code": "FAK LISA (UPA)",
                                "name": "Freight All Kind"
                            }],
                            "freightOfAllKinds": true,
                            "nonOperatingReefer": false,
                            "validityFrom": "2023-06-15T00:00:00",
                            "validityTo": "2023-07-15T00:00:00",
                            "controlledAtmosphere": false,
                            "overLength": false,
                            "overWidth": false,
                            "overHeight": false,
                            "cargoType": "ST",
                            "routingComment": "[SCHEDULE:0SCC3W1MA]",
                            "exportConstruction": true,
                            "importConstruction": true,
                            "inlandExportConstructed": false,
                            "inlandImportConstructed": false,
                            "lineSequence": 0,
                            "fedralMaritimeControl": false,
                            "allowSpecialQuotation": false,
                            "spotValidityInDays": 28,
                            "underDeck": false,
                            "premium": false,
                            "solutionNumber": 2,
                            "scheduleNumber": 1,
                            "spotOffer": true,
                            "numberOfContainer": 1,
                            "spotNbContainer": 0,
                            "origin": "",
                            "destination": ""
                        }],
                        "routingLegs": [{
                            "legNumber": 1,
                            "cO2": 0,
                            "departureDate": "2023-06-22T06:00:00+00:00",
                            "arrivalDate": "2023-07-27T22:00:00+00:00",
                            "cutOffDate": "2023-06-19T18:00:00+00:00",
                            "vgmCutOffDate": "2023-06-19T18:00:00+00:00",
                            "standardBookingAcceptance": "2023-06-19T18:00:00+00:00",
                            "specialBookingAcceptance": "2023-06-17T18:00:00+00:00",
                            "serviceName": "French Asia Line 8",
                            "serviceCode": "FAL8",
                            "lineInstruction": false,
                            "vesselName": "EVER GLOBE",
                            "feeder": false,
                            "voyageRef": "0SCC3W1MA",
                            "usVessel": false,
                            "departureDetails": {
                                "placeCode": "CNSHA",
                                "placeName": "SHANGHAI",
                                "placeCountryCode": "CN",
                                "placeCountryName": "CHINA",
                                "terminalCode": "YAN",
                                "terminalName": "YANGSHAN DEEP WATER PORT PHASE1 TER",
                                "port": true
                            },
                            "arrivalDetails": {
                                "placeCode": "BEANR",
                                "placeName": "ANTWERP",
                                "placeCountryCode": "BE",
                                "placeCountryName": "BELGIUM",
                                "terminalCode": "AGT",
                                "terminalName": "ANTWERP GATEWAY 1700",
                                "port": true
                            },
                            "co2": 0
                        }],
                        "offerId": "3c2efa92-701b-4b98-ac9b-f29958789d7e",
                        "departureDateFlag": false,
                        "arrivalDateFlag": false,
                        "transitFlag": true,
                        "isLoading": false,
                        "canSelect": true,
                        "rewardsEarned": this.data.containers*33,
                        "placeOfLoadingLabel": "SHANGHAI, CN",
                        "placeOfLoadingLabelCountry": "China",
                        "placeOfDischargeLabel": "ANTWERP, BE",
                        "placeOfDischargeLabelCountry": "Belgium",
                        "surchargeDetails": {
                            "sizeType": "20ST",
                            "oceanFreight": {
                                "price": {"amount": 825, "currency": {"code": "USD"}},
                                "fixedByThePricer": false,
                                "convertedRate": 0,
                                "isManualCharge": false
                            },
                            "collectCharges": {"amount": 259, "currency": {"code": "USD", "name": "USD"}},
                            "prepaidCharges": {"amount": 97, "currency": {"code": "USD", "name": "USD"}},
                            "freightCharges": {"amount": 0, "currency": {"code": "USD", "name": "USD"}},
                            "perBLCharges": {"amount": 25, "currency": {"code": "USD", "name": "USD"}},
                            "oceanFreightDetails": ["Bunker surcharge NOS", "Ocean Carrier-Intl Ship & port Facility Security"],
                            "collectChargeDetails": [{
                                "price": {"amount": 240, "currency": {"code": "EUR", "name": "EUR"}},
                                "paymentMethod": "C",
                                "fixedByThePricer": false,
                                "chargeCode": "THC34",
                                "chargeName": "Terminal handl. ch  destination",
                                "convertedRate": 259,
                                "isManualCharge": false
                            }],
                            "prepaidChargeDetails": [{
                                "price": {"amount": 30, "currency": {"code": "CNY", "name": "CNY"}},
                                "paymentMethod": "P",
                                "fixedByThePricer": false,
                                "chargeCode": "SEA06",
                                "chargeName": "Sealing service export",
                                "convertedRate": 4,
                                "isManualCharge": false
                            }, {
                                "price": {"amount": 665, "currency": {"code": "CNY", "name": "CNY"}},
                                "paymentMethod": "P",
                                "fixedByThePricer": false,
                                "chargeCode": "THC58",
                                "chargeName": "Terminal handl ch origin",
                                "commentOnChargeRule": "If standard dimensions and container gross weight over 30.50 tons, THC rates CNY 1094 / 1635 / 2038 per 20’ / 40 ‘ / 45’  DRY\n",
                                "convertedRate": 93,
                                "isManualCharge": false
                            }],
                            "freightChargeDetails": [],
                            "oceanFreightChargeDetails": [{
                                "price": {"amount": 360, "currency": {"code": "USD", "name": "USD"}},
                                "fixedByThePricer": true,
                                "chargeCode": "BAF03",
                                "chargeName": "Bunker surcharge NOS",
                                "convertedRate": 360,
                                "isManualCharge": false
                            }, {
                                "price": {"amount": 14, "currency": {"code": "USD", "name": "USD"}},
                                "fixedByThePricer": true,
                                "chargeCode": "ISS01",
                                "chargeName": "Ocean Carrier-Intl Ship & port Facility Security",
                                "convertedRate": 14,
                                "isManualCharge": false
                            }],
                            "perBLChargeDetails": [{
                                "description": "Export Declaration Surcharge",
                                "rate": 25,
                                "convertedRate": 25,
                                "currency": "USD",
                                "paymentMethod": "P",
                                "hasFixed": false,
                                "code": "CUS16"
                            }],
                            "totalCharge": {"amount": 1181, "currency": {"code": "USD"}},
                            "allocation": true
                        }
                    },
                    {
                        "solutionNumber": 1,
                        "scheduleNumber": 2,
                        "scheduleDescription": "Service French Asia Line 3",
                        "vesselName": "CMA CGM VASCO DE GAMA",
                        "voyage": "0FMD5W1MA",
                        "transitTime": "42",
                        "totalCO2": 0.96,
                        "departureDate": "2023-06-24T18:00:00+00:00",
                        "arrivalDate": "2023-08-05T22:00:00+00:00",
                        "bookingCutoffDate": "2023-06-22T00:00:00Z",
                        "vgmCutoffDate": "2023-06-22T00:00:00Z",
                        "portCutoffDate": "2023-06-22T00:00:00Z",
                        "cutoffLocation": "SHANGHAI",
                        "tranShipment": [],
                        "noOfLegs": 0,
                        "withOutOfferDisplay": false,
                        "quoteLines": [{
                            "quoteLineExternalId": "48165263",
                            "quoteLineId": 0,
                            "quotationReference": "11761-SPOT-ASIA_NE/EUR_IOI_OCEANIA-DR/OG-ALL",
                            "quoteLineType": "PL",
                            "exportMovementType": "Port",
                            "importMovementType": "Port",
                            "portOfLoading": "CNSHA",
                            "portOfDischarge": "BEANR",
                            "oversize": false,
                            "shipperOwnedContainer": false,
                            "hazardous": false,
                            "reefer": false,
                            "tariff": {"tarrifType": "PL", "basedRateType": "BOF", "dealPeriod": "SPOT"},
                            "equipments": [{
                                "code": "20ST",
                                "oceanFreightRate": 825,
                                "currencyCode": "USD",
                                "maxNetWeight": 0
                            }],
                            "shippingCompany": "0001",
                            "commodities": [{
                                "commodityType": "GRP",
                                "code": "FAK LISA (UPA)",
                                "name": "Freight All Kind"
                            }],
                            "freightOfAllKinds": true,
                            "nonOperatingReefer": false,
                            "validityFrom": "2023-06-15T00:00:00",
                            "validityTo": "2023-07-15T00:00:00",
                            "controlledAtmosphere": false,
                            "overLength": false,
                            "overWidth": false,
                            "overHeight": false,
                            "cargoType": "ST",
                            "routingComment": "[SCHEDULE:0FMD5W1MA]",
                            "exportConstruction": true,
                            "importConstruction": true,
                            "inlandExportConstructed": false,
                            "inlandImportConstructed": false,
                            "lineSequence": 0,
                            "fedralMaritimeControl": false,
                            "allowSpecialQuotation": false,
                            "spotValidityInDays": 28,
                            "underDeck": false,
                            "premium": false,
                            "solutionNumber": 1,
                            "scheduleNumber": 2,
                            "spotOffer": true,
                            "numberOfContainer": 1,
                            "spotNbContainer": 0,
                            "origin": "",
                            "destination": ""
                        }],
                        "routingLegs": [{
                            "legNumber": 1,
                            "cO2": 0,
                            "departureDate": "2023-06-24T18:00:00+00:00",
                            "arrivalDate": "2023-08-05T22:00:00+00:00",
                            "cutOffDate": "2023-06-22T00:00:00+00:00",
                            "vgmCutOffDate": "2023-06-22T00:00:00+00:00",
                            "standardBookingAcceptance": "2023-06-22T00:00:00+00:00",
                            "specialBookingAcceptance": "2023-06-20T00:00:00+00:00",
                            "serviceName": "French Asia Line 3",
                            "serviceCode": "FAL3",
                            "lineInstruction": false,
                            "vesselName": "CMA CGM VASCO DE GAMA",
                            "feeder": false,
                            "voyageRef": "0FMD5W1MA",
                            "usVessel": false,
                            "departureDetails": {
                                "placeCode": "CNSHA",
                                "placeName": "SHANGHAI",
                                "placeCountryCode": "CN",
                                "placeCountryName": "CHINA",
                                "terminalCode": "YAN",
                                "terminalName": "YANGSHAN DEEP WATER PORT PHASE1 TER",
                                "port": true
                            },
                            "arrivalDetails": {
                                "placeCode": "BEANR",
                                "placeName": "ANTWERP",
                                "placeCountryCode": "BE",
                                "placeCountryName": "BELGIUM",
                                "terminalCode": "AGT",
                                "terminalName": "ANTWERP GATEWAY 1700",
                                "port": true
                            },
                            "co2": 0
                        }],
                        "offerId": "88df70ca-5b64-4900-814b-7a762aeb5c65",
                        "departureDateFlag": false,
                        "arrivalDateFlag": false,
                        "transitFlag": false,
                        "isLoading": false,
                        "canSelect": true,
                        "rewardsEarned": this.data.containers*33,
                        "placeOfLoadingLabel": "SHANGHAI, CN",
                        "placeOfLoadingLabelCountry": "China",
                        "placeOfDischargeLabel": "ANTWERP, BE",
                        "placeOfDischargeLabelCountry": "Belgium",
                        "surchargeDetails": {
                            "sizeType": "20ST",
                            "oceanFreight": {
                                "price": {"amount": 825, "currency": {"code": "USD"}},
                                "fixedByThePricer": false,
                                "convertedRate": 0,
                                "isManualCharge": false
                            },
                            "collectCharges": {"amount": 259, "currency": {"code": "USD", "name": "USD"}},
                            "prepaidCharges": {"amount": 97, "currency": {"code": "USD", "name": "USD"}},
                            "freightCharges": {"amount": 0, "currency": {"code": "USD", "name": "USD"}},
                            "perBLCharges": {"amount": 25, "currency": {"code": "USD", "name": "USD"}},
                            "oceanFreightDetails": ["Bunker surcharge NOS", "Ocean Carrier-Intl Ship & port Facility Security"],
                            "collectChargeDetails": [{
                                "price": {"amount": 240, "currency": {"code": "EUR", "name": "EUR"}},
                                "paymentMethod": "C",
                                "fixedByThePricer": false,
                                "chargeCode": "THC34",
                                "chargeName": "Terminal handl. ch  destination",
                                "convertedRate": 259,
                                "isManualCharge": false
                            }],
                            "prepaidChargeDetails": [{
                                "price": {"amount": 30, "currency": {"code": "CNY", "name": "CNY"}},
                                "paymentMethod": "P",
                                "fixedByThePricer": false,
                                "chargeCode": "SEA06",
                                "chargeName": "Sealing service export",
                                "convertedRate": 4,
                                "isManualCharge": false
                            }, {
                                "price": {"amount": 665, "currency": {"code": "CNY", "name": "CNY"}},
                                "paymentMethod": "P",
                                "fixedByThePricer": false,
                                "chargeCode": "THC58",
                                "chargeName": "Terminal handl ch origin",
                                "commentOnChargeRule": "If standard dimensions and container gross weight over 30.50 tons, THC rates CNY 1094 / 1635 / 2038 per 20’ / 40 ‘ / 45’  DRY\n",
                                "convertedRate": 93,
                                "isManualCharge": false
                            }],
                            "freightChargeDetails": [],
                            "oceanFreightChargeDetails": [{
                                "price": {"amount": 360, "currency": {"code": "USD", "name": "USD"}},
                                "fixedByThePricer": true,
                                "chargeCode": "BAF03",
                                "chargeName": "Bunker surcharge NOS",
                                "convertedRate": 360,
                                "isManualCharge": false
                            }, {
                                "price": {"amount": 14, "currency": {"code": "USD", "name": "USD"}},
                                "fixedByThePricer": true,
                                "chargeCode": "ISS01",
                                "chargeName": "Ocean Carrier-Intl Ship & port Facility Security",
                                "convertedRate": 14,
                                "isManualCharge": false
                            }],
                            "perBLChargeDetails": [{
                                "description": "Export Declaration Surcharge",
                                "rate": 25,
                                "convertedRate": 25,
                                "currency": "USD",
                                "paymentMethod": "P",
                                "hasFixed": false,
                                "code": "CUS16"
                            }],
                            "totalCharge": {"amount": 1181, "currency": {"code": "USD"}},
                            "allocation": true
                        }
                    },
                    {
                        "solutionNumber": 3,
                        "scheduleNumber": 2,
                        "scheduleDescription": "Service French Asia Line 2",
                        "vesselName": "COSCO SHIPPING LIBRA",
                        "voyage": "0FAEZW1MA",
                        "transitTime": "37",
                        "totalCO2": 0.92,
                        "departureDate": "2023-06-25T17:00:00+00:00",
                        "arrivalDate": "2023-08-01T18:00:00+00:00",
                        "bookingCutoffDate": "2023-06-23T08:00:00Z",
                        "vgmCutoffDate": "2023-06-23T08:00:00Z",
                        "portCutoffDate": "2023-06-23T08:00:00Z",
                        "cutoffLocation": "SHANGHAI",
                        "tranShipment": [],
                        "noOfLegs": 0,
                        "withOutOfferDisplay": false,
                        "quoteLines": [{
                            "quoteLineExternalId": "48165263",
                            "quoteLineId": 0,
                            "quotationReference": "11761-SPOT-ASIA_NE/EUR_IOI_OCEANIA-DR/OG-ALL",
                            "quoteLineType": "PL",
                            "exportMovementType": "Port",
                            "importMovementType": "Port",
                            "portOfLoading": "CNSHA",
                            "portOfDischarge": "BEANR",
                            "oversize": false,
                            "shipperOwnedContainer": false,
                            "hazardous": false,
                            "reefer": false,
                            "tariff": {"tarrifType": "PL", "basedRateType": "BOF", "dealPeriod": "SPOT"},
                            "equipments": [{
                                "code": "20ST",
                                "oceanFreightRate": 825,
                                "currencyCode": "USD",
                                "maxNetWeight": 0
                            }],
                            "shippingCompany": "0001",
                            "commodities": [{
                                "commodityType": "GRP",
                                "code": "FAK LISA (UPA)",
                                "name": "Freight All Kind"
                            }],
                            "freightOfAllKinds": true,
                            "nonOperatingReefer": false,
                            "validityFrom": "2023-06-15T00:00:00",
                            "validityTo": "2023-07-15T00:00:00",
                            "controlledAtmosphere": false,
                            "overLength": false,
                            "overWidth": false,
                            "overHeight": false,
                            "cargoType": "ST",
                            "routingComment": "[SCHEDULE:0FAEZW1MA]",
                            "exportConstruction": true,
                            "importConstruction": true,
                            "inlandExportConstructed": false,
                            "inlandImportConstructed": false,
                            "lineSequence": 0,
                            "fedralMaritimeControl": false,
                            "allowSpecialQuotation": false,
                            "spotValidityInDays": 28,
                            "underDeck": false,
                            "premium": false,
                            "solutionNumber": 3,
                            "scheduleNumber": 2,
                            "spotOffer": true,
                            "numberOfContainer": 1,
                            "spotNbContainer": 0,
                            "origin": "",
                            "destination": ""
                        }],
                        "routingLegs": [{
                            "legNumber": 1,
                            "cO2": 0,
                            "departureDate": "2023-06-25T17:00:00+00:00",
                            "arrivalDate": "2023-08-01T18:00:00+00:00",
                            "cutOffDate": "2023-06-23T08:00:00+00:00",
                            "vgmCutOffDate": "2023-06-23T08:00:00+00:00",
                            "standardBookingAcceptance": "2023-06-23T08:00:00+00:00",
                            "specialBookingAcceptance": "2023-06-21T08:00:00+00:00",
                            "serviceName": "French Asia Line 2",
                            "serviceCode": "FAL2",
                            "lineInstruction": false,
                            "vesselName": "COSCO SHIPPING LIBRA",
                            "feeder": false,
                            "voyageRef": "0FAEZW1MA",
                            "usVessel": false,
                            "departureDetails": {
                                "placeCode": "CNSHA",
                                "placeName": "SHANGHAI",
                                "placeCountryCode": "CN",
                                "placeCountryName": "CHINA",
                                "terminalCode": "YAN",
                                "terminalName": "YANGSHAN DEEP WATER PORT PHASE1 TER",
                                "port": true
                            },
                            "arrivalDetails": {
                                "placeCode": "BEANR",
                                "placeName": "ANTWERP",
                                "placeCountryCode": "BE",
                                "placeCountryName": "BELGIUM",
                                "terminalCode": "AGT",
                                "terminalName": "ANTWERP GATEWAY 1700",
                                "port": true
                            },
                            "co2": 0
                        }],
                        "offerId": "7a663c24-f58f-4f96-94b2-a35de56ff8a9",
                        "departureDateFlag": false,
                        "arrivalDateFlag": false,
                        "transitFlag": false,
                        "isLoading": false,
                        "canSelect": false,
                        "rewardsEarned": this.data.containers*33,
                        "placeOfLoadingLabel": "SHANGHAI, CN",
                        "placeOfLoadingLabelCountry": "China",
                        "placeOfDischargeLabel": "ANTWERP, BE",
                        "placeOfDischargeLabelCountry": "Belgium",
                        "surchargeDetails": null
                    }]
            }
            if (isFirst) {
                this.setData({
                    quoteLineList: quoteLineList.map((item) => {
                        return {
                            ...item,
                        }
                    }),
                    oldQuoteLineList:quoteLineList
                })
                console.log('quoteLineList', this.data.quoteLineList, JSON.stringify(this.data.quoteLineList))
                wx.pageScrollTo({
                    duration: 500,
                    scrollTop: 0
                })
            } else {
                this.setData({
                    quoteLineList: quoteLineList,
                    oldQuoteLineList:quoteLineList
                })
            }
            this.setData({
                isLoading: false
            })
        } else {
            quotationSort(params).then(res => {
                if (isFirst) {
                    this.setData({
                        quoteLineList: res.data.map((item) => {
                            return {
                                ...item,
                                isLoading: true,
                                canSelect: true,
                                rewardsEarned: null,
                            }
                        })
                    })
                    console.log('quoteLineList', this.data.quoteLineList, JSON.stringify(this.data.quoteLineList))
                    wx.pageScrollTo({
                        duration: 500,
                        scrollTop: 0
                    })
                    this.data.quoteLineList.forEach((item, index) => {
                        if (item.quoteLines) {
                            // 收货地
                            if (item.quoteLines[0].origin && item.quoteLines[0].origin !== item.quoteLines[0].portOfLoading) {
                                this.getPlacePoint(item.quoteLines[0].origin, item, 'placeOfReceiptLabel')
                            } else {
                                item.quoteLines[0].origin = ''
                            }
                            // 起运港
                            this.getPlacePoint(item.quoteLines[0].portOfLoading, item, 'placeOfLoadingLabel')
                            // 卸货港
                            this.getPlacePoint(item.quoteLines[0].portOfDischarge, item, 'placeOfDischargeLabel')
                            // 目的地
                            if (item.quoteLines[0].destination && item.quoteLines[0].destination !== item.quoteLines[0].portOfDischarge) {
                                this.getPlacePoint(item.quoteLines[0].destination, item, 'placeOfDeliveryLabel')
                            } else {
                                item.quoteLines[0].destination = ''
                            }
                        }
                        if (item.offerId !== "No-Offer-Found" && item.quoteLines && item.quoteLines.length) {
                            let params = {}
                            if (!item.quoteLines[0].quoteLineId) {
                                params = {
                                    "surchargeFromAqua": {
                                        "offerId": item.offerId,
                                        "traceId": this.data.traceId,
                                        "equipmentSizeType": this.data.equiptCode,
                                        "currencyCode": item.quoteLines[0].equipments[0].currencyCode,
                                        "loggedId": this.data.loggedId,
                                        "oceanFreightRate": item.quoteLines[0].equipments[0].oceanFreightRate,
                                        "nextDepartureScheduleNumber": item.scheduleNumber,
                                        "nextDepartureSolutionNumber": item.solutionNumber,
                                        "inlandExportConstructed": this.data.placeOfOrigin !== '' ? true : false,
                                        "inlandImportConstructed": this.data.finalPlaceOfDelivery !== '' ? true : false,
                                        "inlandPolicy": "throughRate"
                                    }
                                }
                            } else {
                                params = {
                                    "surchargeFromLara": {
                                        "quoteLineId": item.quoteLines[0].quoteLineId,
                                        "shippingCompany": item.quoteLines[0].shippingCompany,
                                        "equipments": item.quoteLines[0].equipments.filter(i => i.code === this.data.equipmentSize),
                                        "simulationDate": item.departureDate,
                                        "paymentMethod": null,
                                        "usContract": false,
                                        "portOfLoading": item.quoteLines[0].portOfLoading,
                                        "portOfDischarge": item.quoteLines[0].portOfDischarge,
                                        "loggedId": this.data.loggedId,
                                        "nextDepartureSolutionNumber": item.solutionNumber,
                                        "nextDepartureScheduleNumber": item.scheduleNumber,
                                        "quoteLineKey": item.quoteLines[0].qlKey
                                    }
                                }
                            }
                            setTimeout(() => {
                                if (!item.surchargeDetails && item.canSelect) {
                                    this.getQuotationSurchargeDetailFn(item, params, isFirst)
                                }
                            }, 300 * index);
                        } else {
                            item.isLoading = false
                            item.canSelect = false
                            item.surchargeDetails = null
                            this.setData({
                                quoteLineList: this.data.quoteLineList
                            })
                        }
                    })
                } else {
                    this.setData({
                        quoteLineList: res.data
                    })
                    console.log('res.data', res.data)
                }
                this.setData({
                    isLoading: false
                })
            }, () => {
                console.log([])
                this.setData({
                    quoteLineList: [],
                    isLoading: false
                })
            })
        }

    },

    getPlacePoint(pointCode, item, type) {
        fuzzyPointSearch({
            pointCode
        }).then(data => {
            item[type] = data.data.point.name + ', ' + data.data.country.code
            item[type + 'Country'] = data.data.country.name
            this.setData({
                quoteLineList: this.data.quoteLineList
            })
            this.setData({
                oldQuoteLineList: this.data.quoteLineList
            })
        }, () => {
            this.data.count++
            if (this.data.count <= 3) {
                this.getPlacePoint(pointCode, item, type)

            }
        })
    },

    getSeaEarnPoints(oceanFreight, totalCharge) {
        let that = this
        if (totalCharge.currency.code === 'USD') {
            return new Promise(function (resolve, reject) {
                let pointBalance = 0
                if (wx.getStorageSync('partnerList')[0].code === '0002130568') {
                    pointBalance = oceanFreight.price.amount * that.data.containers * 0.04
                    resolve(pointBalance)
                } else {
                    seaEarnPoints({
                        "baseAmount": oceanFreight.price.amount * that.data.containers,
                        "currencyType": totalCharge.currency.code,
                        "partnerCode": wx.getStorageSync('partnerList')[0].code,
                        "level": wx.getStorageSync('seaRewardData').level
                    }).then(result => {
                        pointBalance = result.data ? result.data.simulationResults[0].changeInPointsBalance : null
                        resolve(pointBalance)
                    })
                }

            })
        } else {
            return new Promise(function (resolve, reject) {
                let pointBalance = null
                resolve(pointBalance)
            })
        }


    },

    getQuotationSurchargeDetailFn(item, params, isFirst) {
        getQuotationSurchargeDetail(params, wx.getStorageSync('ccgId')).then(async (res) => {
            item.isLoading = false
            item.noOfContainersAvailable = res.data.allocationDetails ? res.data.allocationDetails.noOfContainersAvailable : 0
            const allocation = res.data.allocationDetails ? res.data.allocationDetails.allocation : true
            if (allocation) {
                if (res.data && res.data.surchargeDetails) {
                    item.surchargeDetails = res.data && res.data.surchargeDetails ? res.data.surchargeDetails[0] : null
                    item.surchargeDetails.allocation = allocation
                    item.canSelect = true
                    //新增计算获得积分数量
                    let points = null
                    if (this.data.memberStatus === 'Active') {
                        points = await this.getSeaEarnPoints(res.data.surchargeDetails[0].oceanFreight, res.data.surchargeDetails[0].totalCharge)
                    }
                    item.rewardsEarned = points
                } else {
                    item.surchargeDetails = null
                    item.canSelect = false
                }
            } else {
                item.surchargeDetails = null
                item.canSelect = false
            }

            this.setData({
                quoteLineList: this.data.quoteLineList
            })
            if (isFirst) {
                this.setData({
                    oldQuoteLineList: this.data.quoteLineList
                })
            }
        }, () => {
            this.data.porCount++
            if (this.data.porCount <= 3) {
                this.getQuotationSurchargeDetailFn(item, params, isFirst)
            }
        })
    },

    // 去详情
    toDetail(e) {
        let currentIndex = e.currentTarget.dataset.index;
        this.setData({
            currentIndex
        })
        if (this.data.quoteLineList[currentIndex].isLoading || !this.data.quoteLineList[currentIndex].surchargeDetails) return
        if (this.data.quoteLineList[currentIndex].noOfContainersAvailable) {
            this.setData({
                showRemind: true,
                hasContainers: this.data.quoteLineList[currentIndex].noOfContainersAvailable
            })
        } else {
            wx.navigateTo({
                url: `/pages/Quotation/Detail/index?index=${currentIndex}`,
            })
        }
    },

    onContinue() {
        this.setData({
            showRemind: false
        })
        wx.navigateTo({
            url: `/pages/Quotation/Detail/index?index=${this.data.currentIndex}&containers=${this.data.hasContainers}`,
        })
    },

    onClickHide() {
        this.setData({
            showRemind: false
        })
    }
})