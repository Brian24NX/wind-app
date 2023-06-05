// pages/Quotation/Detail/index.js
const languageUtil = require('../../../utils/languageUtils')
import {
    vasLists,
    createQuotationQuotation,
    seaEarnPoints, seaQuotationCreation,
} from '../../../api/modules/quotation';

const dayjs = require("dayjs");
import {writeOperationLog} from '../../../api/modules/home'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        languageContent: {},
        vasLanguageContent: {},
        seaReward: {},
        language: 'zh',
        baseUrl: '',
        languageCode: '',
        todayDate: '',
        isFirst: true,
        scrollTop: 0,//控制上滑距离
        otherList: [{
            icon: '/assets/img/instantQuote/other_1@2x.png',
            label: 'localCharge',
            url: "/pages/Quotation/Others/LocalCharges/index",
            show: true
        }, {
            icon: '/assets/img/instantQuote/other_2@2x.png',
            label: 'DDSM',
            url: "/pages/Quotation/Others/DDCharges/index",
            show: true
        }, {
            icon: '/assets/img/instantQuote/other_3@2x.png',
            label: 'SpotOn',
            url: "/pages/Quotation/Others/SpotOn/index",
            show: true
        }, {
            icon: '/assets/img/instantQuote/other_4@2x.png',
            label: 'addInfo',
            url: "/pages/Quotation/Others/AdditionalInformation/index",
            show: true
        }],
        fromLabel: "",
        fromCode: '',
        toLabel: '',
        toCode: '',
        quotationDetail: {},
        totalChargeAmount: 0,
        equipmentTypeSize: '',
        equipmentTypeName: '',
        weight: '',
        containers: '',
        commodityName: '',
        shippingCompany: '',
        simulationDate: '',
        traceId: '',
        portOfLoading: '',
        portOfLoadingLabel: '',
        portOfDischarge: '',
        portOfDischargeLabel: '',
        placeOfOrigin: '',
        finalPlaceOfDelivery: '',
        partnerCode: [],
        vasList: [],
        subscribedServices: [],
        noSelectVasList: [],
        showVas: false,
        isUs: false,
        isSocAgree: false,
        shipperOwnedContainer: false,
        showError: false,
        foldContainerRate: true,
        foldBLRate: true,
        foldQuoteDetail: true,
        foldSoc: true,
        burnRewards: 0,
        rewardsEarned: null,   //海里
        useRewards: false,//是否抵扣海里
        finalPrice: 0,    //总计 （订阅）
        rewardsLevel: '',
        memberStatus: '',
        addMoney: 0, //增值订阅服务的总额
        count: 0,   //获取vas超过三次接口不调用
        oceanFreight: 0,//oceanFreight的值
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: languageUtil.languageVersion().lang.page.qutationResult.title2
        })
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 2]
        const data = currentPage.data
        const languages = languageUtil.languageVersion().lang.page
        this.setData({
            languageContent: languages.qutationResult,
            vasLanguageContent: languages.vas,
            language: languages.langue,
            seaReward: languageUtil.languageVersion().lang.page.seaReward,
            isUs: data.isUs,
            languageCode: languages.langue === 'zh' ? 'zh_CN' : 'en_US',
            baseUrl: "https://www.cma-cgm.com/static/ecommerce/VASAssets/" + (languages.langue === 'zh' ? 'zh_CN' : 'en_US') + "/",
            partnerCode: data.partnerCode,
            todayDate: this.getDate(),
            portOfLoading: data.portOfLoading,
            portOfLoadingLabel: data.portOfLoadingLabel,
            portOfDischarge: data.portOfDischarge,
            portOfDischargeLabel: data.portOfDischargeLabel,
            placeOfOrigin: data.placeOfOrigin,
            finalPlaceOfDelivery: data.finalPlaceOfDelivery,
            transMode: wx.getStorageSync('transMode'),
            shipperOwnedContainer: data.shipperOwnedContainer,
            isSocAgree: wx.getStorageSync('isSocAgree') ? wx.getStorageSync('isSocAgree') : false,
            rewardsLevel: wx.getStorageSync('seaRewardData').level,
            burnRewards: wx.getStorageSync('seaRewardData').pointsBalance,
            memberStatus: wx.getStorageSync('seaRewardData').memberStatus,
            containers: data.containers
        })
        this.setDefaultInfo(options.index, options.containers)
        if (!this.data.isUs) {
            this.getVasList()
        }
    },

    getSeaEarnPoints(amount) {
        seaEarnPoints({
            "baseAmount": this.data.oceanFreight,
            "currencyType": this.data.quotationDetail.surchargeDetails.totalCharge.currency.code,
            "partnerCode": wx.getStorageSync('partnerList')[0].code,
            "level": wx.getStorageSync('seaRewardData').level
        }).then(res => {
            this.setData({
                rewardsEarned: res.data ? res.data.simulationResults[0].changeInPointsBalance : null
            })
        })
    },

    setDefaultInfo(index, containers) {
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 2]
        const data = currentPage.data
        let quotationDetail = data.quoteLineList[index]
        if (quotationDetail.surchargeDetails.oceanFreight.paymentMethod === 'Collect') {
            quotationDetail.surchargeDetails.collectChargeDetails = quotationDetail.surchargeDetails.collectChargeDetails.concat(quotationDetail.surchargeDetail.freightChargeDetails)
            quotationDetail.surchargeDetails.freightChargeDetails = []
            quotationDetail.surchargeDetails.collectCharges.amount += quotationDetail.surchargeDetails.freightCharges.amount
            quotationDetail.surchargeDetails.freightCharges.amount = 0
        }
        quotationDetail.surchargeDetails.oceanFreightDetailsLabel = quotationDetail.surchargeDetails.oceanFreightDetails.join(' / ')
        quotationDetail.surchargeDetails.oceanFreight.isChecked = true
        quotationDetail.surchargeDetails.freightCharges.isChecked = true
        quotationDetail.surchargeDetails.prepaidCharges.isChecked = true
        quotationDetail.surchargeDetails.collectCharges.isChecked = true
        this.data.otherList[2].show = quotationDetail.quoteLines[0].spotOffer
        this.setData({
            fromLabel: data.fromLabel,
            fromCode: data.fromCode,
            toLabel: data.toLabel,
            toCode: data.toCode,
            receiptHaulage: data.receiptHaulage,
            deliveryHaulage: data.deliveryHaulage,
            shippingCompany: data.shippingCompany,
            quotationDetail,
            simulationDate: data.simulationDate,
            traceId: data.traceId,
            otherList: this.data.otherList
        })
        this.calculatedCharges()
        const currentPage2 = pages[pages.length - 3]
        const data2 = currentPage2.data
        this.setData({
            equipmentTypeSize: data2.equiptCode,
            equipmentTypeName: data2.equipmentTypeName,
            weight: data2.weight,
            containers: containers || data2.containers,
            commodityName: data2.commodityName,
            equipmentSize: data2.equiptCode,
            equipmentTypeDescription: data2.equipmentTypeName
        })
    },

    previewVas() {
        if (!this.data.subscribedServices.length) return
        this.setData({
            showVas: !this.data.showVas
        })
    },

    // 折叠
    zhedie(e) {
        this.setData({
            [e.currentTarget.dataset.type]: !this.data[e.currentTarget.dataset.type]
        })
    },

    calculatedCharges() {
        const surchargeDetails = this.data.quotationDetail.surchargeDetails
        this.setData({
            oceanFreight: surchargeDetails.oceanFreight.price.amount
        })
        let addMoney = 0
        let totalChargeAmount = 0
        console.log('oceanFreight', this.data.oceanFreight)
        if (surchargeDetails.oceanFreight.isChecked) {
            totalChargeAmount = totalChargeAmount + surchargeDetails.oceanFreight.price.amount
        }
        if (surchargeDetails.freightCharges.isChecked) {
            totalChargeAmount = totalChargeAmount + surchargeDetails.freightCharges.amount
        }
        if (surchargeDetails.prepaidCharges.isChecked) {
            totalChargeAmount = totalChargeAmount + surchargeDetails.prepaidCharges.amount
        }
        if (surchargeDetails.collectCharges.isChecked) {
            totalChargeAmount = totalChargeAmount + surchargeDetails.collectCharges.amount
        }
        //订阅的数组
        totalChargeAmount = totalChargeAmount || this.data.quotationDetail.surchargeDetails.totalCharge.amount
        this.data.subscribedServices.forEach(i => {
            if (i.seletcedProduct.levelOfCharge === 'Per Container' && !i.seletcedProduct.isInclude) {
                totalChargeAmount = totalChargeAmount + i.seletcedProduct.amount
                addMoney = addMoney + i.seletcedProduct.amount
            }
        })

        if (this.data.useRewards) {
            this.setData({
                finalPrice: totalChargeAmount * this.data.containers - this.data.burnRewards,
                addMoney: addMoney,
                totalChargeAmount: totalChargeAmount,
                oceanFreight: this.data.oceanFreight * this.data.containers - this.data.burnRewards
            })
        } else {
            this.setData({
                finalPrice: totalChargeAmount * this.data.containers,
                addMoney: addMoney,
                totalChargeAmount: totalChargeAmount,
                oceanFreight: this.data.oceanFreight * this.data.containers
            })
        }
        // console.log(this.data.burnRewards, wx.getStorageSync('seaRewardData').pointsBalance)
        //注释掉的0002130568模拟数据
        // if (wx.getStorageSync('partnerList')[0].code == '0002130568') {
        //     this.setData({
        //         burnRewards: 260,
        //     })
        // } else {
        console.log(this.data.burnRewards < wx.getStorageSync('seaRewardData').pointsBalance,this.data.burnRewards,wx.getStorageSync('seaRewardData').pointsBalance)
        if (this.data.burnRewards < wx.getStorageSync('seaRewardData').pointsBalance) {
            this.setData({
                burnRewards: this.data.finalPrice
            })
        }
        if(wx.getStorageSync('seaRewardData').pointsBalance>this.data.oceanFreight){
            this.setData({
                burnRewards: this.data.oceanFreight
            })
        }
        // }
        if (this.data.memberStatus === 'Active') {
            this.getSeaEarnPoints(this.data.finalPrice)
        }
    },

    changeCheck(e) {
        console.log(e)
        this.data.quotationDetail.surchargeDetails[e.currentTarget.dataset.id].isChecked = !this.data.quotationDetail.surchargeDetails[e.currentTarget.dataset.id].isChecked
        this.setData({
            quotationDetail: this.data.quotationDetail
        })
        this.calculatedCharges()
    },

    toOther(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.item.url,
        })
    },

    openAdditionalService() {
        this.selectComponent("#additionalServices").onClickOpen()
    },

    toLineDetail() {
        wx.navigateTo({
            url: '/pages/Quotation/LineDetail/index',
        })
    },

    toRemind() {
        wx.navigateTo({
            url: '/pages/Quotation/Others/Remind/index',
        })
    },

    back() {
        this.setData({
            isFirst: true,
        })
        wx.pageScrollTo({
            duration: 300,
            scrollTop: 0
        })
    },

    checkBoxToggle({
                       currentTarget
                   }) {
        const keys = currentTarget.dataset.keys;
        this.setData({
            [keys]: !this.data[keys],
        })
        if (!this.data.isSocAgree) {
            this.setData({
                showError: true
            })
        } else {
            this.setData({
                showError: false
            })
        }
        wx.setStorageSync('isSocAgree', this.data.isSocAgree)
    },

    submit() {
        if (this.data.shipperOwnedContainer !== this.data.isSocAgree) {
            this.setData({
                showError: true,
                foldSoc: false
            })
            wx.pageScrollTo({
                duration: 500,
                scrollTop: 2000
            })
            return
        }
        if (this.data.isFirst) {
            this.setData({
                isFirst: false
            })
            wx.pageScrollTo({
                duration: 300,
                scrollTop: 0
            })
        } else {
            let params = {}
            let vasChargeDetails = []
            this.data.subscribedServices.forEach(item => {
                vasChargeDetails.push({
                    "calculationType": item.seletcedProduct.calculationType || '',
                    "cargoLines": item.seletcedProduct.cargoLines,
                    "chargeCode": item.seletcedProduct.chargeCode,
                    "chargeName": item.seletcedProduct.chargeName,
                    "currency": item.seletcedProduct.currency,
                    "description": item.seletcedProduct.subscriptionMode || '',
                    "expectedActions": item.expectedActions,
                    "hasChargeSelected": true,
                    "levelOfCharge": item.seletcedProduct.levelOfCharge,
                    "maximumChargeableAmount": item.seletcedProduct.minimumChargeableAmount || '',
                    "minimumChargeableAmount": item.seletcedProduct.maximumChargeableAmount || '',
                    "rateFrom": item.seletcedProduct.rateFrom,
                    "subscribedAmount": (item.seletcedProduct.levelOfCharge === 'Per BL' && item.seletcedProduct.calculationType !== 'FIX') ? item.seletcedProduct.amount : item.seletcedProduct.rateFrom,
                    "subscriptionMode": item.seletcedProduct.subscriptionMode || ''
                })
            })
            if (this.data.useRewards && this.data.burnRewards && this.data.burnRewards !== 0) {
                vasChargeDetails.push({
                    "calculationType": 'FIX',
                    "cargoLines": null,
                    "chargeCode": 'REB75',
                    "chargeName": null,
                    "currency": 'USD',
                    "description": null,
                    "expectedActions": null,
                    "hasChargeSelected": true,
                    "levelOfCharge": 'Per BL',
                    "maximumChargeableAmount": 0,
                    "minimumChargeableAmount": 0,
                    "rateFrom": 0,
                    "subscribedAmount": -this.data.burnRewards,
                    "subscriptionMode": ''
                })
            }
            if (this.data.quotationDetail.quoteLines[0].quoteLineId) {
                params = {
                    "createLaraSpecialQuotation": {
                        "affiliates": this.data.partnerCode,
                        "simulationDate": this.data.simulationDate,
                        "equipmentSizeType": this.data.equipmentTypeSize,
                        "numberOfContainers": this.data.containers,
                        "weightPerContainer": this.data.weight,
                        "polCountryCode": this.data.portOfLoading.substring(0, 2),
                        "podCountryCode": this.data.portOfDischarge.substring(0, 2),
                        "allowSpecialQuotation": this.data.quotationDetail.quoteLines[0].allowSpecialQuotation,
                        "spotValidityInDays": this.data.quotationDetail.quoteLines[0].spotValidityInDays,
                        "routingComment": this.data.quotationDetail.quoteLines[0].routingComment,
                        "voyageRef": this.data.quotationDetail.voyage,
                        "arrivalDate": this.data.quotationDetail.arrivalDate,
                        "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
                        "placeOfOrigin": this.data.placeOfOrigin || null,
                        "quoteLineId": "string",
                        "portOfLoading": this.data.portOfLoading,
                        "portOfDischarge": this.data.portOfDischarge,
                        "initialPortOfLoading": this.data.portOfLoading,
                        "initalPortOfDischarge": this.data.portOfDischarge,
                        "traceId": this.data.quotationDetail.traceId,
                        vasChargeDetails
                    }
                }
            } else {
                params = {
                    "createAquaSpecialQuotation": {
                        "affiliates": this.data.partnerCode,
                        "simulationDate": this.data.simulationDate,
                        "numberOfContainers": this.data.containers,
                        "weightPerContainer": this.data.weight,
                        "equipmentSizeType": this.data.equipmentTypeSize,
                        "polCountryCode": this.data.portOfLoading.substring(0, 2),
                        "podCountryCode": this.data.portOfDischarge.substring(0, 2),
                        "allowSpecialQuotation": this.data.quotationDetail.quoteLines[0].allowSpecialQuotation,
                        "spotValidityInDays": this.data.quotationDetail.quoteLines[0].spotValidityInDays,
                        "routingComment": this.data.quotationDetail.quoteLines[0].routingComment,
                        "arrivalDate": this.data.quotationDetail.arrivalDate,
                        "finalPlaceOfDelivery": this.data.finalPlaceOfDelivery || null,
                        "placeOfOrigin": this.data.placeOfOrigin || null,
                        "voyageRef": this.data.quotationDetail.voyage,
                        "offerId": this.data.quotationDetail.offerId,
                        "traceId": this.data.traceId,
                        "shippingCompany": this.data.shippingCompany,
                        vasChargeDetails
                    }
                }
            }
            createQuotationQuotation(params, wx.getStorageSync('ccgId')).then(res => {
                const userInfo = wx.getStorageSync('userInfo')
                if (res.data) {
                    const params = {
                        "account": userInfo.email,
                        "ccgid": userInfo.ccgId,
                        "company": userInfo.company,
                        "nickname": userInfo.firstName + userInfo.lastName,
                        "operationType": "SpotOn",
                        "shipmentRef": res.data ? res.data : '-'
                    }
                    writeOperationLog(params).then(result => {
                        console.log('SpotOn日志记录成功')
                    })

                    if (wx.getStorageSync('seaRewardData').memberStatus == 'Active') {
                        const data = {
                            effectiveDate: dayjs(new Date()).format('YYYY-MM-DD'),
                            baseAmountUsd: this.data.oceanFreight,
                            includeBurn: this.data.useRewards,
                            quotationReference: res.data,
                            partnerCode: wx.getStorageSync('partnerList')[0].code,
                            shippingCompany:this.data.shippingCompany
                        }
                        console.log('--------------', data)
                        seaQuotationCreation(data).then(res => {
                            console.log(res)
                        })
                    }
                    wx.navigateTo({
                        url: `/pages/Quotation/Result/index?quotationId=${res.data}`,
                    })

                } else {
                    wx.showToast({
                        title: this.data.languageContent.createFail,
                    })
                }
            })
        }
    },

    booking() {
        wx.navigateTo({
            url: `/packageBooking/pages/Search/index?pol=${this.data.portOfLoading}&polLabel=${this.data.portOfLoadingLabel}&pod=${this.data.portOfDischarge}&podLabel=${this.data.portOfDischargeLabel}&quotationReference=${this.data.quotationDetail.quoteLines[0].quotationReference || ''}`,
        })
    },

    getVasList() {
        const quoteLine = this.data.quotationDetail.quoteLines[0]
        const shippingCompany = quoteLine.shippingCompany
        const bookingParties = []
        this.data.partnerCode.forEach(i => {
            bookingParties.push({
                "partnerCode": i,
                "bookingParty": true,
                "role": "BKG",
                "name": ""
            })
        })
        let subscribedCharges = []
        const surchargeDetails = this.data.quotationDetail.surchargeDetails
        const a = surchargeDetails.collectChargeDetails.filter(i => i.fixedByThePricer).map(i => {
            return {
                code: i.chargeCode,
                currency: surchargeDetails.collectCharges.currency.code,
                rateFrom: i.convertedRate
            }
        })
        const b = surchargeDetails.freightChargeDetails.filter(i => i.fixedByThePricer).map(i => {
            return {
                code: i.chargeCode,
                currency: surchargeDetails.freightCharges.currency.code,
                rateFrom: i.convertedRate
            }
        })
        const c = surchargeDetails.oceanFreightChargeDetails.filter(i => i.fixedByThePricer).map(i => {
            return {
                code: i.chargeCode,
                currency: surchargeDetails.oceanFreight.price.currency.code,
                rateFrom: i.convertedRate
            }
        })
        const d = surchargeDetails.prepaidChargeDetails.filter(i => i.fixedByThePricer).map(i => {
            return {
                code: i.chargeCode,
                currency: surchargeDetails.prepaidCharges.currency.code,
                rateFrom: i.convertedRate
            }
        })
        subscribedCharges = subscribedCharges.concat(a).concat(b).concat(c).concat(d)
        //注释掉的模拟数据
        // if (wx.getStorageSync('partnerList')[0].code == '0002130568') {
        //     const data = [
        //         {
        //             "termsandConditions": "TC - BESC revue SP260122 - Final.pdf",
        //             "productFamily": "logistics_services",
        //             "isExistingVas": false,
        //             "confirmationNeeded": false,
        //             "isTandCRequired": true,
        //             "parentProductId": "EASY IMPORT documentation",
        //             "featuredProduct": false,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 265,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 265,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "EASY IMPORT documentation",
        //                 "unsubscriptionDisableForAll": true,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "CTN01"
        //             }],
        //             "productName": "EASY IMPORT documentation",
        //             "subscriptionAvailable": true,
        //             "taxRate": 0,
        //             "productShortDescription": "Simplify your exports to West Africa",
        //             "bestSeller": false,
        //             "productMainImage": "SHIPFIN sea freight financing PIM.jpg",
        //             "productSheet": "EASY IMPORT documentation - Flyer English.pdf",
        //             "currency": "USD",
        //             "levelOfCharge": "Per Container",
        //             "productDescription": "Facilitate  your  procedures  thanks  to  the  preparation  of  your  Electronic  Cargo  Tracking Note by our services. The BESC/ECTN is an imperative document for any export to the countries of this region."
        //         },
        //         {
        //             "productFamily": "logistics_services",
        //             "isExistingVas": false,
        //             "confirmationNeeded": false,
        //             "isTandCRequired": false,
        //             "parentProductId": "CUSTOMS CLEARANCE solutions Export",
        //             "contactEmail": "ho.kgibaud@cma-cgm.com",
        //             "featuredProduct": false,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "FIX",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 0,
        //                     "cargoRate": 0,
        //                     "isShipperOwned": false,
        //                     "cargoLineNumber": 0
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 25,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per BL",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "CUSTOMS CLEARANCE solutions Export",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "shipmentlevel",
        //                 "chargeCode": "CT001"
        //             }],
        //             "productName": "CUSTOMS CLEARANCE solutions Export",
        //             "subscriptionAvailable": true,
        //             "taxRate": 0,
        //             "productShortDescription": "Let CMA CGM handle your customs clearance processes. \n",
        //             "bestSeller": false,
        //             "productMainImage": "SHIPFIN sea freight financing PIM.jpg",
        //             "productSheet": "CUSTOMS CLEARANCE solutions - Flyer English.pdf",
        //             "currency": "USD",
        //             "levelOfCharge": "Per BL",
        //             "productDescription": "With our dedicated team of customs clearance experts at CEVA, we offer fast and reliable import and export customs facilitation services. Whether you need us to perform customs entry for each harmonized tariff code or to complete your AES filings, we’ve got you covered!\n"
        //         },
        //         {
        //             "termsandConditions": "Cargo value serenity - TC English -  CMA CGM Group June 2022.pdf",
        //             "productFamily": "insurance_serenity",
        //             "isExistingVas": false,
        //             "confirmationNeeded": false,
        //             "isTandCRequired": true,
        //             "parentProductId": "SERENITY cargo value guarantee",
        //             "featuredProduct": true,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "TEU",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 50,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 50,
        //                 "maximumChargeableAmount": "0",
        //                 "personalizedValueLabel": "test cn",
        //                 "unsubscriptionDisableForLTA": true,
        //                 "unsubscriptionDisableForQSPOT": true,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "Guarantee up to USD 25 000 per container",
        //                 "unsubscriptionDisableForAll": true,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "CVS01"
        //             }, {
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 49,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 49,
        //                 "maximumChargeableAmount": "0",
        //                 "personalizedValueLabel": "test cn",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "保证每个容器高达50000美元",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "CVS02"
        //             }, {
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 99,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 99,
        //                 "maximumChargeableAmount": "0",
        //                 "personalizedValueLabel": "test cn",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "test",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "CVS03"
        //             }, {
        //                 "calculationType": "PRC",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 0,
        //                     "cargoRate": 0,
        //                     "isShipperOwned": false,
        //                     "cargoLineNumber": 0
        //                 }],
        //                 "minimumChargeableAmount": "100",
        //                 "conversionRate": 0,
        //                 "rateFrom": 0.2,
        //                 "maximumChargeableAmount": "300",
        //                 "personalizedValueLabel": "test cn",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": true,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per BL",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "每个集装箱的个性化保证",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "CVS00"
        //             }],
        //             "productName": "SERENITY cargo value guarantee",
        //             "subscriptionAvailable": true,
        //             "taxRate": 0,
        //             "productShortDescription": "节省时间和金钱",
        //             "bestSeller": false,
        //             "productMainImage": "CMA CGM FREETIME extended Banner all sizes_PIM_350x148px.jpg",
        //             "currency": "USD",
        //             "levelOfCharge": "Per Container",
        //             "productDescription": "忘记测量员，行政手续，与承运人的无休止的法律纠纷，\n与您的银行的不愉快讨论，负面的商业影响。\n•全面的服务：门到门保证您的货物价值。\n•无中间人/无第三方：您只有一个联系点：CMA CGM\n•没有更多无休止的法律纠纷：可靠与否，CMA CGM将赔偿您的全部赔偿\n保证价值\n•全球援助：您将受益于最了解您的人的全力支持\n装船。\n•无论发生什么事情或谁负有责任，您都将获得赔偿。"
        //         },
        //         {
        //             "productFamily": "COLD_TREATMENT",
        //             "isExistingVas": false,
        //             "confirmationNeeded": false,
        //             "isTandCRequired": false,
        //             "parentProductId": "COLD TREATMENT services",
        //             "contactEmail": "ho.kgibaud@cma-cgm.com",
        //             "featuredProduct": false,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 351,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 351,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "Guarantee up to USD 50 000",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "CTG02"
        //             }],
        //             "productName": "COLD TREATMENT services",
        //             "subscriptionAvailable": false,
        //             "taxRate": 0,
        //             "productShortDescription": "保持你的头部凉爽\n冷处理是确保灭绝昆虫和幼虫的过程。这个流程 在某些国家/地区必须出口农产品。",
        //             "bestSeller": false,
        //             "productMainImage": "CMA CGM VAS_Digital_BILLofLADING V2 350x148px.jpg",
        //             "productSheet": "COLD TREATMENT services - Flyer English.pdf",
        //             "currency": "USD",
        //             "levelOfCharge": "Per Container",
        //             "productDescription": "我们的冷处理保证可以补偿因冷处理失败而产生的以下后果，特别是如果您的货物被目的地的植物检疫机构拒收：\n•货物损坏\n•第二次冷处理过程的额外费用\n•额外费用（存储，堵塞费用，手续费......）\n•利润损失\n•重新计算费用"
        //         },
        //         {
        //             "productFamily": "ctr_preparation",
        //             "isExistingVas": false,
        //             "confirmationNeeded": true,
        //             "isTandCRequired": false,
        //             "parentProductId": "BARLOCK security device",
        //             "featuredProduct": false,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 80,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 80,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": true,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "BARLOCK security device",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "unitspercargoline",
        //                 "chargeCode": "SEA07"
        //             }],
        //             "productName": "BARLOCK security device",
        //             "subscriptionAvailable": true,
        //             "taxRate": 0,
        //             "productShortDescription": "\nAdd extra protection to keep your cargo safe.",
        //             "bestSeller": true,
        //             "productMainImage": "CMA CGM VAS_Digital_BILLofLADING V2 350x148px.jpg",
        //             "productSheet": "BARLOCK security device - Flyer.pdf",
        //             "currency": "USD",
        //             "levelOfCharge": "Per Container",
        //             "productDescription": "在运输高价值货物时，盗窃问题会产生压力。\n通过在您的集装箱门上添加钢筋锁，使得最终盗贼更加困难和长时间打开，并在运输过程中尽可能保证您的货物安全。\n\n酒吧锁将帮助您节省成本并避免复杂的保险索赔。\n\n由于钢筋锁，我们在烟草行业的客户之一在18个月内将事故从4减少到0。\n\n酒吧锁将在整个过程中保持密封状态，并且只能使用圆形钢锯在目的地打开。\n\n要订购带有常规安全封条的带锁条的容器 - 请咨询当地代表！\n\n降低风险和成本\n降低货物盗窃的风险及其后果\n降低保险费\n只需随容器一起提供强大的安全装置"
        //         },
        //         {
        //             "termsandConditions": "Flyers_Paperless_BL_11032019.pdf",
        //             "productFamily": "paperless_bl",
        //             "isExistingVas": false,
        //             "confirmationNeeded": false,
        //             "isTandCRequired": false,
        //             "parentProductId": "BILL OF LADING paperless",
        //             "featuredProduct": false,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "FIX",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 0,
        //                     "cargoRate": 0,
        //                     "isShipperOwned": false,
        //                     "cargoLineNumber": 0
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 55,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per BL",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "BILL OF LADING paperless",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "shipmentlevel",
        //                 "chargeCode": "EBL10"
        //             }],
        //             "productName": "BILL OF LADING paperless",
        //             "subscriptionAvailable": true,
        //             "taxRate": 0,
        //             "productShortDescription": "使用无纸提单（B / L），加快您的导入/导出过程，节省时间，快递和邮资成本，只需点击一下即可将您的提单转移到下一方！",
        //             "bestSeller": false,
        //             "productMainImage": "CMA CGM VAS_Digital_BILLofLADING V2 350x148px.jpg",
        //             "productSheet": "BILL OF LADING paperless - Flyer English.pdf",
        //             "currency": "USD",
        //             "levelOfCharge": "Per BL",
        //             "productDescription": "主要特点\n•不需要纸张或帖子！\n•各方之间的即时转移\n•立即向承运人投降\n•与纸质提单具有相同的法律价值\n•所有转账都是安全的\n•不再丢失文件"
        //         },
        //         {
        //             "termsandConditions": "TC SERENITY container guarantee - 12th version ENG.pdf",
        //             "productFamily": "DTC01",
        //             "isExistingVas": false,
        //             "confirmationNeeded": false,
        //             "isTandCRequired": true,
        //             "parentProductId": "SERENITY container guarantee (export)",
        //             "featuredProduct": false,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 55,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 55,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "Standard Guarantee for Shipper",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "DTC03"
        //             }, {
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 61,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 61,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "Premium Guarantee for Shipper",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "DTC07"
        //             }],
        //             "productName": "SERENITY container guarantee (export)",
        //             "subscriptionAvailable": true,
        //             "taxRate": 0,
        //             "productShortDescription": "Avoid costs in case of damage to our containers ",
        //             "bestSeller": false,
        //             "productMainImage": "SHIPFIN sea freight financing PIM.jpg",
        //             "productSheet": "SERENITY container guarantee_ENG Flyer_A4_HR.pdf",
        //             "currency": "USD",
        //             "levelOfCharge": "Per Container",
        //             "productDescription": "Accidental events may damage our containers while under your responsibility. With SERENITY Container Guarantee, you limit or avoid the relative repair costs."
        //         },
        //         {
        //             "termsandConditions": "TC SERENITY container guarantee - 12th version ENG.pdf",
        //             "productFamily": "DTC01",
        //             "isExistingVas": false,
        //             "confirmationNeeded": false,
        //             "isTandCRequired": true,
        //             "parentProductId": "SERENITY container guarantee (import)",
        //             "featuredProduct": false,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 8,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 8,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "Standard Guarantee for Consignee",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "DTC04"
        //             }, {
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 39,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 39,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "Premium Guarantee for Consignee",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "DTC08"
        //             }],
        //             "productName": "SERENITY container guarantee (import)",
        //             "subscriptionAvailable": true,
        //             "taxRate": 0,
        //             "productShortDescription": "Avoid costs in case of damage to our containers ",
        //             "bestSeller": false,
        //             "productMainImage": "LOCK MY PRICE PIM.jpg",
        //             "productSheet": "SERENITY container guarantee_ENG Flyer_A4_HR.pdf",
        //             "currency": "USD",
        //             "levelOfCharge": "Per Container",
        //             "productDescription": "Accidental events may damage our containers while under your responsibility. With SERENITY Container Guarantee, you limit or avoid the relative repair costs."
        //         },
        //         {
        //             "termsandConditions": "FREETIME Extended  - TC English -  JUNE22_ CMACNC.pdf",
        //             "productFamily": "Detention_and_Demmurage",
        //             "isExistingVas": false,
        //             "confirmationNeeded": false,
        //             "isTandCRequired": true,
        //             "parentProductId": "FREETIME extended (Detention & Demurrage)",
        //             "featuredProduct": true,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 210,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "EUR",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0.9924990199,
        //                 "rateFrom": 210,
        //                 "maximumChargeableAmount": "0",
        //                 "expectedActions": "14_c_g_i",
        //                 "unsubscriptionDisableForLTA": true,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "EUR",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "14天免舱柜租（D&D）费（包含常规免费天数）",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "DTM11"
        //             }, {
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 1610,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "EUR",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0.9924990199,
        //                 "rateFrom": 1610,
        //                 "maximumChargeableAmount": "0",
        //                 "expectedActions": "28_w_g_i",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "EUR",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "Up to 28 days at destination",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "DTM13"
        //             }, {
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 710,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "EUR",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0.9924990199,
        //                 "rateFrom": 710,
        //                 "maximumChargeableAmount": "0",
        //                 "expectedActions": "21_c_g_i",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "EUR",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "21天免舱柜租（D&D）费（包含常规免费天数）",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "DTM12"
        //             }],
        //             "productName": "FREETIME extended (Detention & Demurrage)",
        //             "subscriptionAvailable": true,
        //             "taxRate": 0,
        //             "productShortDescription": "Extend your Detention freetime at destination.",
        //             "bestSeller": true,
        //             "productMainImage": "CMA CGM FREETIME extended Banner all sizes_PIM_350x148px.jpg",
        //             "productSheet": "FREETIME extended Flyer English.pdf",
        //             "currency": "EUR",
        //             "levelOfCharge": "Per Container",
        //             "productDescription": "需要更多时间来为您的供应链提供更大的弹性？随着CNC的免滞箱费&滞港费（D&D）升级，与常规的D&D费用相比，您现在能以更优惠的价格延长您在目的地的免费时间（D&D）。"
        //         },
        //         {
        //             "termsandConditions": "FREETIME Extended  - TC English -  JUNE22_ CMACNC.pdf",
        //             "productFamily": "Detention_and_Demmurage",
        //             "isExistingVas": false,
        //             "confirmationNeeded": false,
        //             "isTandCRequired": true,
        //             "parentProductId": "FREETIME extended (Demurrage only)",
        //             "featuredProduct": true,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 1234,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 1234,
        //                 "maximumChargeableAmount": "0",
        //                 "expectedActions": "7_c_m_i",
        //                 "unsubscriptionDisableForLTA": true,
        //                 "unsubscriptionDisableForQSPOT": true,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "07 days bundle (Including Standard Free Days)",
        //                 "unsubscriptionDisableForAll": true,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "DEM90"
        //             }],
        //             "productName": "FREETIME extended (Demurrage only)",
        //             "subscriptionAvailable": true,
        //             "taxRate": 0,
        //             "productShortDescription": "Extend your Demurrage Free Time at destination",
        //             "bestSeller": true,
        //             "productMainImage": "CMA CGM FREETIME extended Banner all sizes_PIM_350x148px.jpg",
        //             "productSheet": "FREETIME extended - Flyer English Dic21.pdf",
        //             "currency": "USD",
        //             "levelOfCharge": "Per Container",
        //             "productDescription": "Need more time to enable greater flexibility for your supply chain? With CNC’s DEMURRAGE - FREE TIME UPGRADE, you can now extend your Demurrage Free Time at destination at a preferred rate compared to the usual demurrage charges"
        //         },
        //         {
        //             "termsandConditions": "TC SERENITY container guarantee - 12th version ENG.pdf",
        //             "productFamily": "STF",
        //             "isExistingVas": false,
        //             "confirmationNeeded": true,
        //             "isTandCRequired": true,
        //             "parentProductId": "SHIPFIN extended credit",
        //             "contactEmail": "ho.kgibaud@cma-cgm.com",
        //             "featuredProduct": false,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "UNI",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "equipmentTypeDescription": "20尺干货标准集装箱",
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 1,
        //                     "cargoRate": 50,
        //                     "isShipperOwned": false,
        //                     "equipmentSize": "20ST",
        //                     "currency": "USD",
        //                     "cargoLineNumber": 1,
        //                     "levelOfCharge": "Per Container",
        //                     "commodityName": "Freight All Kind"
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 50,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": false,
        //                 "unsubscriptionDisableForQSPOT": false,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per Container",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "SHIPFIN extended credit",
        //                 "unsubscriptionDisableForAll": false,
        //                 "subscriptionMode": "cargoline",
        //                 "chargeCode": "FIT01"
        //             }],
        //             "productName": "SHIPFIN extended credit",
        //             "subscriptionAvailable": false,
        //             "taxRate": 0,
        //             "productShortDescription": "Cover your sea freight invoice. ",
        //             "bestSeller": false,
        //             "productMainImage": "SHIPFIN sea freight financing PIM.jpg",
        //             "productSheet": "SHIPFIN sea freight financing - Flyer English.pdf",
        //             "currency": "USD",
        //             "levelOfCharge": "Per Container",
        //             "productDescription": "<p>SHIPFIN sea freight financing allows you to pay your freight invoice up to 30 days after vessel departure.<br></p>"
        //         },
        //         {
        //             "termsandConditions": "LOCK MY PRICE OPTION T&C Jan23.pdf",
        //             "productFamily": "LockMyPrice",
        //             "isExistingVas": false,
        //             "confirmationNeeded": false,
        //             "isTandCRequired": true,
        //             "parentProductId": "LOCK MY PRICE option",
        //             "featuredProduct": false,
        //             "isProductSelected": false,
        //             "chargeDetails": [{
        //                 "calculationType": "FIX",
        //                 "cargoLines": [{
        //                     "isOOG": false,
        //                     "isHazardous": false,
        //                     "maxNoOfContainer": 0,
        //                     "cargoRate": 0,
        //                     "isShipperOwned": false,
        //                     "cargoLineNumber": 0
        //                 }],
        //                 "minimumChargeableAmount": "0",
        //                 "conversionRate": 0,
        //                 "rateFrom": 70,
        //                 "maximumChargeableAmount": "0",
        //                 "unsubscriptionDisableForLTA": true,
        //                 "unsubscriptionDisableOn": ["ClickAndBook"],
        //                 "unsubscriptionDisableForQSPOT": true,
        //                 "currency": "USD",
        //                 "levelOfCharge": "Per BL",
        //                 "unsubscriptionDisableForUSContract": false,
        //                 "chargeName": "LOCK MY PRICE option",
        //                 "unsubscriptionDisableForAll": true,
        //                 "subscriptionMode": "shipmentlevel",
        //                 "chargeCode": "LOK01"
        //             }],
        //             "productName": "LOCK MY PRICE option",
        //             "subscriptionAvailable": true,
        //             "taxRate": 0,
        //             "productShortDescription": "Hold your price for 72 hours.",
        //             "bestSeller": false,
        //             "productMainImage": "LOCK MY PRICE PIM.jpg",
        //             "productSheet": "SpotOn - Flyer English.pdf",
        //             "currency": "USD",
        //             "levelOfCharge": "Per BL",
        //             "productDescription": "<p class=\"MsoNormal\">Want to keep the quotation conditions for an extended period\nof time? Thanks to our LOCK MY PRICE option, you can hold the\npricing conditions for 72 hours and place your booking later.<o:p></o:p></p>"
        //         }
        //     ]
        //     if (this.data.equipmentTypeSize === '20RF' || this.data.equipmentTypeSize === '40RH') {
        //         const i = data.findIndex(i => i.parentProductId === 'SEAPRIORITY go')
        //         if (i > -1) {
        //             data.splice(i, 1)
        //         }
        //     }
        //     data.forEach(one => {
        //         if (one.isProductSelected) {
        //             // console.log(subscribedCharges)
        //             const index = subscribedCharges.findIndex(i => one.chargeDetails[0].chargeCode === i.code)
        //             one.levelOfCharge = 'Per Container'
        //             one.currency = subscribedCharges[index].currency
        //             one.chargeDetails[0].currency = subscribedCharges[index].currency
        //             one.chargeDetails[0].rateFrom = subscribedCharges[index].rateFrom
        //             one.chargeDetails[0].amount = subscribedCharges[index].rateFrom
        //             one.chargeDetails[0].levelOfCharge = 'Per Container'
        //             one.chargeDetails[0].isInclude = true
        //             one.seletcedProduct = one.chargeDetails[0]
        //         }
        //         one.minPrice = Math.min.apply(Math, one.chargeDetails.filter(i => i.levelOfCharge === one.levelOfCharge).map(item => {
        //             return item.rateFrom
        //         }))
        //         if (one.levelOfCharge === 'Per BL' && one.chargeDetails[0].calculationType !== 'FIX') {
        //             one.minPrice = '%'
        //         }
        //     })
        //     const arr = data.filter(i => i.bestSeller).concat(data.filter(i => !i.bestSeller))
        //     this.setData({
        //         vasList: arr,
        //         noSelectVasList: arr.filter(i => !i.isProductSelected),
        //         subscribedServices: arr.filter(i => i.isProductSelected)
        //     })
        //     this.calculatedCharges()
        // } else {
        vasLists({
            "shippingCompany": shippingCompany === "0001" ? 'CMACGM' : shippingCompany === '0002' ? 'ANL' : shippingCompany === '0011' ? 'CHENGLIE' : 'APL',
            "placeReceipt": this.data.placeOfOrigin,
            "portLoading": this.data.portOfLoading,
            "portDischarge": this.data.portOfDischarge,
            "placeDelivery": this.data.finalPlaceOfDelivery,
            "placeOfPayment": this.data.portOfDischarge,
            "importMovementType": quoteLine.importMovementType.toLocaleUpperCase(),
            "importHaulageMode": "MERCHANT",
            "exportMovementType": quoteLine.exportMovementType.toLocaleUpperCase(),
            "exportHaulageMode": "MERCHANT",
            "applicationDate": this.data.quotationDetail.departureDate,
            "locale": this.data.languageCode,
            "channel": "PRI",
            "typeOfBl": "Negotiable",
            "bookingParties": bookingParties,
            "cargoes": [{
                "cargoNumber": 1,
                "packageCode": this.data.equipmentTypeSize,
                "equipmentSize": this.data.equipmentTypeSize,
                "equipmentTypeDescription": this.data.equipmentTypeName,
                "packageBookedQuantity": this.data.containers,
                "commodityCode": quoteLine.commodities[0].code,
                "commodityName": quoteLine.commodities[0].name,
                "totalNetWeight": 1,
                "uomWeight": "TNE",
                "hazardous": false,
                "oversize": false,
                "refrigerated": false,
                "shipperOwned": false
            }],
            "currency": surchargeDetails.totalCharge.currency.code,
            subscribedCharges: subscribedCharges.map(i => i.code)
        }).then(res => {
            console.log('res',res)
            if (this.data.equipmentTypeSize === '20RF' || this.data.equipmentTypeSize === '40RH') {
                const i = res.data.findIndex(i => i.parentProductId === 'SEAPRIORITY go')
                if (i > -1) {
                    res.data.splice(i, 1)
                }
            }
            res.data.forEach(one => {
                if (one.isProductSelected) {
                    // console.log(subscribedCharges)
                    const index = subscribedCharges.findIndex(i => one.chargeDetails[0].chargeCode === i.code)
                    one.levelOfCharge = 'Per Container'
                    one.currency = subscribedCharges[index].currency
                    one.chargeDetails[0].currency = subscribedCharges[index].currency
                    one.chargeDetails[0].rateFrom = subscribedCharges[index].rateFrom
                    one.chargeDetails[0].amount = subscribedCharges[index].rateFrom
                    one.chargeDetails[0].levelOfCharge = 'Per Container'
                    one.chargeDetails[0].isInclude = true
                    one.seletcedProduct = one.chargeDetails[0]
                }
                one.minPrice = Math.min.apply(Math, one.chargeDetails.filter(i => i.levelOfCharge === one.levelOfCharge).map(item => {
                    return item.rateFrom
                }))
                if (one.levelOfCharge === 'Per BL' && one.chargeDetails[0].calculationType !== 'FIX') {
                    one.minPrice = '%'
                }
            })
            console.log(res.data)
            const arr = res.data.filter(i => i.bestSeller).concat(res.data.filter(i => !i.bestSeller))
            console.log(arr,arr.filter(i => !i.isProductSelected))
            this.setData({
                vasList: arr,
                noSelectVasList: arr.filter(i => !i.isProductSelected),
                subscribedServices: arr.filter(i => i.isProductSelected)
            })
            this.calculatedCharges()
        }, () => {
            this.data.count++
            if (this.data.count <= 3) {
                this.getVasList()
            }
        })
        // }
    },
    toSelect(e) {
        wx.navigateTo({
            url: '/pages/VAS/Detail/index?productId=' + encodeURIComponent(e.currentTarget.dataset.productid),
        })
    },

    setSubscribedServices(detail) {
        const index = this.data.vasList.findIndex(i => i.parentProductId === detail.parentProductId)
        this.data.vasList[index] = detail
        this.setData({
            vasList: this.data.vasList,
            subscribedServices: this.data.vasList.filter(i => i.isProductSelected),
            noSelectVasList: this.data.vasList.filter(i => !i.isProductSelected)
        })
        this.calculatedCharges()
    },


    editSubscribe(e) {
        wx.navigateTo({
            url: '/pages/VAS/Detail/index?productId=' + encodeURIComponent(e.currentTarget.dataset.productid),
        })
    },

    deleteSubscribe(e) {
        const index = this.data.vasList.findIndex(i => i.productName === e.currentTarget.dataset.productid)
        this.data.vasList[index].isProductSelected = false
        delete this.data.vasList[index].seletcedProduct
        this.setData({
            vasList: this.data.vasList,
            subscribedServices: this.data.vasList.filter(i => i.isProductSelected),
            noSelectVasList: this.data.vasList.filter(i => !i.isProductSelected)
        })
        if (!this.data.subscribedServices.length) {
            this.setData({
                showVas: false
            })
        }
        this.calculatedCharges()
    },

    closeBg() {
        this.setData({
            showVas: false
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

    switchRewards(e) {

        if (e.detail) {
            this.setData({
                useRewards: e.detail,
                finalPrice: this.data.finalPrice - this.data.burnRewards,
                oceanFreight: this.data.oceanFreight - this.data.burnRewards

            })
        } else {
            this.setData({
                useRewards: e.detail,
                finalPrice: this.data.finalPrice + this.data.burnRewards,
                oceanFreight: this.data.oceanFreight + this.data.burnRewards
            })
        }
        console.log(e.detail, this.data.oceanFreight, this.data.finalPrice)
        if (this.data.finalPrice === 0) {
            this.setData({
                rewardsEarned: 0
            })
        } else {
            this.getSeaEarnPoints(this.data.finalPrice)
        }

    },

    prevent() {
        return
    }
})