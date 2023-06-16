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
        disabled:false,//开关按钮无法点击
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
        console.log(data)
        this.setData({
            receiptHaulage:data.receiptHaulage,
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

    onShow(){
        console.log('-------back--------',wx.getStorageSync('back'))
    },
    getSeaEarnPoints() {
        //this.data.oceanFreight为0不掉接口   rewardsEarned直接为0        data:{}返回值也为0
        if(this.data.quotationDetail.surchargeDetails.totalCharge.currency.code==='USD'){
            if(wx.getStorageSync('partnerList')[0].code === '0002130568'){
                this.setData({
                    rewardsEarned:Math.round(this.data.oceanFreight*0.04)
                })
                console.log('rewardsEarned',this.data.rewardsEarned)
            }else{
                seaEarnPoints({
                    "baseAmount": this.data.oceanFreight,
                    "currencyType": this.data.quotationDetail.surchargeDetails.totalCharge.currency.code,
                    "partnerCode": wx.getStorageSync('partnerList')[0].code,
                    "level": wx.getStorageSync('seaRewardData').level
                }).then(res => {
                    this.setData({
                        rewardsEarned: res.data ? res.data.simulationResults[0].changeInPointsBalance: null
                        // rewardsEarned: res.data ? res.data.simulationResults?res.data.simulationResults[0].changeInPointsBalance:0 : null
                    })
                })
            }

        }else {
            this.setData({
                rewardsEarned:null
            })
       }
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
            oceanFreight: surchargeDetails.oceanFreight.price.amount,
            moneyUsed:surchargeDetails.oceanFreight.price.amount,
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
        // if (this.data.burnRewards < wx.getStorageSync('seaRewardData').pointsBalance) {
        //     this.setData({
        //         burnRewards: this.data.finalPrice
        //     })
        // }
        if(wx.getStorageSync('seaRewardData').pointsBalance>this.data.oceanFreight){
            this.setData({
                burnRewards: this.data.oceanFreight
            })
        }
        if(!this.data.receiptHaulage&&wx.getStorageSync('partnerCode')==='0002130568'){
            this.setData({
                burnRewards: 0
            })
        }
        //不是主公司无法选择   burnRewards为0无法点击
        console.log('partnerCode-burnRewards',this.data.partnerCode,wx.getStorageSync('partnerCode'),this.data.partnerCode.indexOf(wx.getStorageSync('partnerCode')))
        console.log(this.data.partnerCode.indexOf(wx.getStorageSync('partnerCode'))===-1,this.data.burnRewards===0)
        console.log(this.data.burnRewards===0||this.data.partnerCode.indexOf(wx.getStorageSync('partnerCode'))===-1)
        if(this.data.burnRewards===0||this.data.partnerCode.indexOf(wx.getStorageSync('partnerCode'))===-1){
            this.setData({
                disabled: true
            })
        }else{
            this.setData({
                disabled: false
            })
        }
        // }
        if (this.data.memberStatus === 'Active') {
            this.getSeaEarnPoints()
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
            console.log(this.data.oceanFreight)
            if(wx.getStorageSync('partnerList')[0].code == '0002130568'){
                wx.navigateTo({
                    url: `/pages/Quotation/Result/index`,
                })
            }else{
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
                    //不是usd 不调取这个接口
                    console.log(1111111111111,wx.getStorageSync('seaRewardData').memberStatus === 'Active'&&this.data.rewardsEarned!==null&&wx.getStorageSync('partnerList')[0].code !== '0002130568')
                    if (wx.getStorageSync('seaRewardData').memberStatus === 'Active'&&this.data.rewardsEarned!==null) {
                        const data = {
                            effectiveDate: dayjs(new Date()).format('YYYY-MM-DD'),
                            baseAmountUsd: this.data.moneyUsed *this.data.containers,
                            includeBurn: this.data.useRewards,
                            quotationReference: res.data,
                            mainPartnerCode: wx.getStorageSync('partnerList')[0].code,
                            decidingParties:this.data.partnerCode,
                            shippingCompany:this.data.shippingCompany
                        }
                        console.log('data-----',data)
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
            }) }
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
        if (wx.getStorageSync('partnerList')[0].code == '0002130568') {
            const data = [{"termsandConditions":"Cargo value serenity - TC English - April 2023.pdf","productFamily":"insurance_serenity","isExistingVas":false,"confirmationNeeded":false,"isTandCRequired":true,"parentProductId":"SERENITY cargo value guarantee","featuredProduct":true,"isProductSelected":false,"chargeDetails":[{"calculationType":"UNI","personalizedValueLabel":"Please add the commercial cargo value to be secured","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":25,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"Guarantee up to USD 12 500 per container","conversionRate":0,"subscriptionMode":"cargoline","rateFrom":25,"chargeCode":"CVS01","maximumChargeableAmount":"0"},{"calculationType":"UNI","personalizedValueLabel":"Please add the commercial cargo value to be secured","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":49,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"Guarantee up to USD 25 000 per container","conversionRate":0,"subscriptionMode":"cargoline","rateFrom":49,"chargeCode":"CVS02","maximumChargeableAmount":"0"},{"calculationType":"UNI","personalizedValueLabel":"Please add the commercial cargo value to be secured","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":99,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"Guarantee up to USD 50 000 per container","conversionRate":0,"subscriptionMode":"cargoline","rateFrom":99,"chargeCode":"CVS03","maximumChargeableAmount":"0"},{"calculationType":"PRC","personalizedValueLabel":"Please enter the value (cargo and freight rate) of the shipment with a maximum of 500 000 USD per container","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":0,"cargoRate":0,"isShipperOwned":false,"cargoLineNumber":0}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per BL","chargeName":"Tailor-made offer","conversionRate":0,"subscriptionMode":"shipmentlevel","rateFrom":0.2,"chargeCode":"CVS00","maximumChargeableAmount":"0"}],"productName":"SERENITY cargo value guarantee","subscriptionAvailable":true,"taxRate":0,"productShortDescription":"Enjoy full compensation in case of cargo damage.","bestSeller":false,"productMainImage":"CMA CGM VAS_Digital_SERENITYcargoValueGuarantee V2 350x148px.jpg","productSheet":"SERENITY cargo value guarantee - Flyer English.pdf","currency":"USD","levelOfCharge":"Per Container","productDescription":"Did you know that in all carriers’ standard conditions, compensation for cargo damage is based on the weight or the number of parcels, not on the cargo value? There are many instances where you won’t get full satisfactory compensation. Our solution: With SERENITY Cargo Value Guarantee, no matter if we are liable or not, enjoy a fast claim process and get compensated on the declared cargo value and freight rate. (According to SERENITY Cargo Value Guarantee terms and conditions available on the website.) WARNING: FRESH FRUITS / LIVE ANIMALS ARE EXCLUDED"},{"productFamily":"ctr_preparation","isExistingVas":false,"confirmationNeeded":true,"isTandCRequired":false,"parentProductId":"BARLOCK security device","featuredProduct":false,"isProductSelected":false,"chargeDetails":[{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":80,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"BARLOCK security device","conversionRate":0,"subscriptionMode":"unitspercargoline","rateFrom":80,"chargeCode":"SEA07","maximumChargeableAmount":"0"}],"productName":"BARLOCK security device","subscriptionAvailable":true,"taxRate":0,"productShortDescription":"Add extra protection to keep your cargo safe.","bestSeller":false,"productMainImage":"D21897 CMA CGM BARLOCK security device Banner_PIM 350x148px.jpg","productSheet":"BARLOCK security device - Flyer English.pdf","currency":"USD","levelOfCharge":"Per Container","productDescription":"Theft issues can generate stress when it comes to transporting high-value cargoes. Protect your valuable products against theft during transportation. This steel security device allows you to reduce risks of cargo theft and all its consequences, reduce insurance fees and have a strong safety device simply delivered with your container."},{"termsandConditions":"SeaPriority GO_Terms and conditions_CMACGM_Sept20.pdf","productFamily":"GUA05","isExistingVas":false,"confirmationNeeded":false,"isTandCRequired":true,"parentProductId":"SEAPRIORITY go","featuredProduct":false,"isProductSelected":false,"chargeDetails":[{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":750,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"SEAPRIORITY go","conversionRate":0,"subscriptionMode":"cargoline","rateFrom":750,"chargeCode":"GUA05","maximumChargeableAmount":"0"}],"productName":"SEAPRIORITY go","subscriptionAvailable":true,"taxRate":0,"productShortDescription":"Enjoy a priority status at loading and transloading terminal.","bestSeller":false,"productMainImage":"CMA CGM VAS_Digital_SEAPRIORITYgo_PIM_350x148.jpg","productSheet":"SEAPRIORITY go - Flyer English.pdf","currency":"USD","levelOfCharge":"Per Container","productDescription":"Want to get your goods moving without any delay? By choosing SEAPRIORITY go you will benefit from: priority equipment availability, close tracking of the container to ensure priority for loading and money back guarantee."},{"termsandConditions":"ACT with CMA CGM - Terms and Conditions.pdf","productFamily":"actwithcmacgm_","isExistingVas":false,"confirmationNeeded":false,"isTandCRequired":false,"parentProductId":"ACT with CMA CGM+","featuredProduct":true,"isProductSelected":false,"chargeDetails":[{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":20,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"Carbon offset (Compensate your residual emissions)","conversionRate":0,"subscriptionMode":"unitspercargoline","rateFrom":20,"chargeCode":"ENV00","maximumChargeableAmount":"0"},{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":63,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"Mix-Biomethane (Reduce your carbon emissions by 25%)","conversionRate":0,"subscriptionMode":"unitspercargoline","rateFrom":63,"chargeCode":"ENV02","maximumChargeableAmount":"0"},{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":78,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"Mix-Biomethane + Carbon offset","conversionRate":0,"subscriptionMode":"unitspercargoline","rateFrom":78,"chargeCode":"ENV03","maximumChargeableAmount":"0"},{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":364,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"Biofuel+ (Reduce your carbon emissions by 84%)","conversionRate":0,"subscriptionMode":"unitspercargoline","rateFrom":364,"chargeCode":"ENV04","maximumChargeableAmount":"0"},{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":43,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"Mix-Biofuel (Reduce your carbon emissions by 10%)","conversionRate":0,"subscriptionMode":"unitspercargoline","rateFrom":43,"chargeCode":"ENV06","maximumChargeableAmount":"0"}],"productName":"ACT with CMA CGM+","subscriptionAvailable":true,"taxRate":0,"productShortDescription":"Reduce and offset your environmental footprint.","bestSeller":false,"productMainImage":"CMA CGM VAS_GREEN ACT_CONTROL MAIN 2021_Digital_350x148px_PIM.jpg","productSheet":"ACT One Pager Apr23.pdf","currency":"USD","levelOfCharge":"Per Container","productDescription":"The sustainable transport solutions ACT with CMA CGM+ have been designed to accelerate your own energy transition. You can measure and reduce your CO2 emissions of your shipments and complement your action by offsetting the remaining emissions."},{"termsandConditions":"TC SERENITY container guarantee - 14th version ENG.pdf","productFamily":"DTC01","isExistingVas":false,"confirmationNeeded":false,"isTandCRequired":true,"parentProductId":"SERENITY container guarantee (export)","featuredProduct":false,"isProductSelected":false,"chargeDetails":[{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":15,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"SERENITY Standard Container for Shipper","conversionRate":0,"subscriptionMode":"cargoline","rateFrom":15,"chargeCode":"DTC03","maximumChargeableAmount":"0"},{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":39,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"SERENITY Premium Container for Shipper","conversionRate":0,"subscriptionMode":"cargoline","rateFrom":39,"chargeCode":"DTC07","maximumChargeableAmount":"0"}],"productName":"SERENITY container guarantee (export)","subscriptionAvailable":true,"taxRate":0,"productShortDescription":"Avoid costs in case of damage to our containers.","bestSeller":true,"productMainImage":"CMA_CGM_VAS_DTC.jpg","productSheet":"SERENITY container guarantee - Flyer English.pdf","currency":"USD","levelOfCharge":"Per Container","productDescription":"Accidental events can damage our containers while under your responsibility and we normally ask you to pay the repair costs. Our Solution: With SERENITY Container Guarantee, you limit (Standard offer) or avoid (Premium offer) these relative repair costs. (According to SERENITY Container Guarantee terms and conditions available on the website.)"},{"termsandConditions":"TC SERENITY container guarantee - 14th version ENG.pdf","productFamily":"DTC01","isExistingVas":false,"confirmationNeeded":false,"isTandCRequired":true,"parentProductId":"SERENITY container guarantee (import)","featuredProduct":false,"isProductSelected":false,"chargeDetails":[{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":15,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"SERENITY Standard Container for Consignee","conversionRate":0,"subscriptionMode":"cargoline","rateFrom":15,"chargeCode":"DTC04","maximumChargeableAmount":"0"},{"calculationType":"UNI","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":39,"isShipperOwned":false,"currency":"USD","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per Container","chargeName":"SERENITY Premium Container for Consignee","conversionRate":0,"subscriptionMode":"cargoline","rateFrom":39,"chargeCode":"DTC08","maximumChargeableAmount":"0"}],"productName":"SERENITY container guarantee (import)","subscriptionAvailable":true,"taxRate":0,"productShortDescription":"Avoid costs in case of damage to our containers.","bestSeller":false,"productMainImage":"CMA_CGM_VAS_DTC.jpg","productSheet":"SERENITY container guarantee - Flyer English.pdf","currency":"USD","levelOfCharge":"Per Container","productDescription":"Accidental events can damage our containers while under your responsibility and we normally ask you to pay the repair costs. Our Solution: With SERENITY Container Guarantee, you limit (Standard offer) or avoid (Premium offer) these relative repair costs. (According to SERENITY Container Guarantee terms and conditions available on the website.)"},{"termsandConditions":"FREETIME Extended  TC March 2023.pdf","productFamily":"Detention_and_Demmurage","isExistingVas":false,"confirmationNeeded":false,"isTandCRequired":true,"parentProductId":"FREETIME extended (Detention & Demurrage)","featuredProduct":true,"isProductSelected":false,"chargeDetails":[{"calculationType":"UNI","expectedActions":"14_c_g_i","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":210,"isShipperOwned":false,"currency":"EUR","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"EUR","levelOfCharge":"Per Container","chargeName":"Up to 14 days at destination","conversionRate":1.0808,"subscriptionMode":"cargoline","rateFrom":210,"chargeCode":"DTM11","maximumChargeableAmount":"0"},{"calculationType":"UNI","expectedActions":"28_c_g_i","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":1530,"isShipperOwned":false,"currency":"EUR","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"EUR","levelOfCharge":"Per Container","chargeName":"Up to 28 days at destination","conversionRate":1.0808,"subscriptionMode":"cargoline","rateFrom":1530,"chargeCode":"DTM13","maximumChargeableAmount":"0"},{"calculationType":"UNI","expectedActions":"21_c_g_i","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":710,"isShipperOwned":false,"currency":"EUR","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"EUR","levelOfCharge":"Per Container","chargeName":"Up to 21 days at destination","conversionRate":1.0808,"subscriptionMode":"cargoline","rateFrom":710,"chargeCode":"DTM12","maximumChargeableAmount":"0"},{"calculationType":"UNI","expectedActions":"10_c_g_i","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":1,"cargoRate":60,"isShipperOwned":false,"currency":"EUR","cargoLineNumber":1,"levelOfCharge":"Per Container","commodityName":"Freight All Kind"}],"minimumChargeableAmount":"0","currency":"EUR","levelOfCharge":"Per Container","chargeName":"Up to 10 days at destination","conversionRate":1.0808,"subscriptionMode":"cargoline","rateFrom":60,"chargeCode":"DTM91","maximumChargeableAmount":"0"}],"productName":"FREETIME extended (Detention & Demurrage)","subscriptionAvailable":true,"taxRate":0,"productShortDescription":"Extend your merged D&D freetime at destination.","bestSeller":true,"productMainImage":"CMA CGM FREETIME extended Banner all sizes_PIM_350x148px.jpg","productSheet":"FREEETIME extended - Flyer English.pdf","currency":"EUR","levelOfCharge":"Per Container","productDescription":"Because your supply chain is different from the others, you may need more than the standard Freetime conditions. With FREETIME Extended, you can now extend the standard Merged Freetime conditions at destination at a preferred rate compared to the usual D&D fees. Choose the package the most adapted for your need: 10/14/21/28 days demurrage and detention."},{"termsandConditions":"LOCK MY PRICE option TC.pdf","productFamily":"LOK01","isExistingVas":false,"confirmationNeeded":false,"isTandCRequired":true,"parentProductId":"LOCK MY PRICE option","featuredProduct":false,"isProductSelected":false,"chargeDetails":[{"calculationType":"FIX","cargoLines":[{"isOOG":false,"isHazardous":false,"maxNoOfContainer":0,"cargoRate":0,"isShipperOwned":false,"cargoLineNumber":0}],"minimumChargeableAmount":"0","currency":"USD","levelOfCharge":"Per BL","chargeName":"LOCK MY PRICE option","conversionRate":0,"subscriptionMode":"shipmentlevel","rateFrom":50,"chargeCode":"LOK01","maximumChargeableAmount":"0"}],"productName":"LOCK MY PRICE option","subscriptionAvailable":true,"taxRate":0,"productShortDescription":"Hold your price for 72 hours.","bestSeller":false,"productMainImage":"LOCK MY PRICE PIM.jpg","productSheet":"SpotOn - Flyer English.pdf","currency":"USD","levelOfCharge":"Per BL","productDescription":"Want to keep the quotation conditions for an extended period of time? Thanks to our LOCK MY PRICE option, you can hold the pricing conditions for 72 hours and place your booking later."}]
            if (this.data.equipmentTypeSize === '20RF' || this.data.equipmentTypeSize === '40RH') {
                const i = data.findIndex(i => i.parentProductId === 'SEAPRIORITY go')
                if (i > -1) {
                    data.splice(i, 1)
                }
            }
            data.forEach(one => {
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
            const arr = data.filter(i => i.bestSeller).concat(data.filter(i => !i.bestSeller))
            this.setData({
                vasList: arr,
                noSelectVasList: arr.filter(i => !i.isProductSelected),
                subscribedServices: arr.filter(i => i.isProductSelected)
            })
            this.calculatedCharges()
        } else {
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
            console.log('res',res,JSON.stringify(res))
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
        }
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
            this.getSeaEarnPoints()
        }

    },

    prevent() {
        return
    }
})