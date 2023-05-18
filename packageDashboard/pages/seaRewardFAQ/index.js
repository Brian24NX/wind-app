// packageDashboard/pages/seaRewardFAQ/index.js
const languageUtils = require('../../../utils/languageUtils')
import {
    seaRewardFAQ
} from '../../api/modules/dashboard'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        languageContent: {},
        language: 'zh',
        noData: false,
        loading: false,
        noMore: false,
        list: [],
        selected: 0,
        foldRate: true,
        foldRate2: true,
        foldRate3: true,
        foldRate4: true,
        foldRate5: true,
        foldRate6: true,
        scrollLeft: 0,
        categoryId: 0,
        scrollViewWidth: 0,
        categoryList: [
            {text: 'My Nautical Miles', value: 0},
            {text: 'My Reward & Rank', value: 1},
            {text: 'My Sea Reward account', value: 2},
            {text: 'Enrolment & Registration', value: 3},
        ],
        listItem: [
            [
                {
                    title: 'What are Nautical Miles?',
                    content: ' Nautical Miles is the currency of the loyalty program that you will cumulate all long your booking journey.' +
                        'The Nautical Miles are calculated regarding the amount of Ocean Freight purchased during your SpotOn booking.' +
                        '\nFrom quotation to invoice generation you will be able to collect a simulation of Nautical Miles.' +
                        '\nOnce the invoice is paid Nautical Miles will be definitively credited to your Sea Reward account. Those Nautical Miles are called "Earned" Nautical Miles.' +
                        '\nThen you will be able to use a proposed amount of "Earned" Nautical Miles on your next SpotOn quotations in order to get a discount in dollar (1 Nautical Miles = 1$). Those Nautical Miles will be considered "pending" Nautical Miles until invoice generation.' +
                        '\nOnce the invoice is paid those "engaged" Nautical Miles will be considered as "used" Nautical Miles and will give you the discount associated in dollar on your final invoice.',
                    isShow: true
                },
                {
                    title: 'Where do I find my current Nautical Miles balance ?',
                    content: 'You can check your earned Nautical Miles in your "Sea Reward Dashboard" page.',
                    isShow: true
                },
                {
                    title: 'Why my Nautical Miles are not credited in my account?',
                    content: 'The invoice might be not paid or still processing.',
                    isShow: true
                },
                {
                    title: 'When will I receive the Nautical Miles I have earned?',
                    content: 'For each SpotOn booking, your "earned" Nautical Miles will be credited to your Sea Reward account at invoice payment.',
                    isShow: true
                },
                {
                    title: 'When my used Nautical Miles are removed from my account?',
                    content: 'For each SpotOn booking, your "used" Nautical Miles will be removed from your Sea Reward account at invoice payment.',
                    isShow: true
                },
                {
                    title: 'How long are my Nautical Miles valid?',
                    content: 'Nautical Miles have a period of validity of 12 months.',
                    isShow: true
                },
                {
                    title: 'Do I earn Nautical Miles on all quotations?',
                    content: 'You can cumulate Nautical Miles on all your SpotOn quotations saved (excluding all shipments with Split/ Merge/ Part Load).',
                    isShow: true
                },
                {
                    title: 'How can I use my Nautical Miles to have a discount?',
                    content: 'You can cumulate Nautical Miles on all your SpotOn quotations saved (excluding all shipments with Split/ Merge/ Part Load).',
                    isShow: true
                },
                {
                    title: 'How can I use my Nautical Miles to have a discount?',
                    content: 'You will be able to use your Nautical Miles available in your balance when placing your quotation on SpotOn.',
                    isShow: true
                },
                {
                    title: 'Why dont I have Nautical Miles in my dashboard anymore?',
                    content: 'The Nautical Miles are collected by all the contacts belonging to the same company. But, only the main contact(s) of the company can use them.',
                    isShow: true
                },
                {
                    title: 'I have Nautical Miles in my Sea Reward account but I can\'t use them. Why can\'t I use them?',
                    content: 'There are two main use cases when a contact of company wont be able to use its Nautical Miles:' +
                        '\n1) When the rank of the company is Lieutenant (you can only earn Nautical Miles, in Sea Reward program the benefit to use Nautical Miles is available starting Captain rank and above.' +
                        '\n2) The contact has placed a quotation but he is not recorded as main contact of the company. So, the contact will be able to earn Nautical Miles but not use Nautical Miles.',
                    isShow: true
                },
                {
                    title: 'How can I start earning Nautical Miles?',
                    content: 'To start earning Nautical Nautical Miles you just need to place a quotation on SpotOn.',
                    isShow: true
                },
                {
                    title: 'Can I spend Nautical Miles for another business partner?',
                    content: 'You only can spend the Nautical Miles available in the balance of your main partner account.',
                    isShow: true
                },
                {
                    title: 'Do I earn Nautical Miles on a booking where I used Nautical Miles?',
                    content: 'Yes, you will only earn Nautical Miles based on Ocean Freight amount minus the amount of dollar used at quotation stage.',
                    isShow: true
                },
                {
                    title: 'How many miles will I earn on my bookings? ',
                    content: 'You earn Nautical Miles according your rank and the ocean freight amount. Access to "Sea Reward Information" page to find out the number of Nautical Miles you can earn according your rank.',
                    isShow: true
                },
                {
                    title: 'Why the Nautical Miles earned are different from the estimate shown?',
                    content: 'There are some use cases when you will gain fewer Nautical Miles than the Nautical Miles estimated during your quotation journey:\n1) Adding more Teus between quotation and invoice stages, the amount of Ocean Freight will increase and the amount of potential Nautical Miles "earn" will increase accordingly.\n2) Removing Teus between quotation and invoice stages, the amount of Ocean Freight will decrease and the amount of potential Nautical Miles "earn will decrease accordingly.',
                    isShow: true
                },
            ],
            [
                {
                    title: 'What is a Sea Reward rank?',
                    content: 'You can find all the information about the different rank of the program in the "Sea Reward Information" page.',
                    isShow: true
                },
                {
                    title: 'Where can I find out what I need to do to reach a higher rank?',
                    content: 'You can find all the information about the program including the rank criterias information on the "Sea Reward Information" page.',
                    isShow: true
                },
                {
                    title: 'When my rank is updated?',
                    content: 'Sea reward rank is re-evaluated each quarter. At the start of each quarter, customer rank is updated based on the 6 previous months activity on SpotOn. (e.g. Update date is Jan 10th, your activity will be calculated on the previous period from 1 July to 31 December) ',
                    isShow: true
                },
            ],
            [
                {
                    title: 'What is a Parent Company means of the Sea Reward program?',
                    content: 'The Parent Company brings together all the companies that make it up. The rank is calculated at the parent company level and all the companies of this parent company contribute to the status through their activity on SpotOn.',
                    isShow: true
                },
                {
                    title: 'Do I earn Nautical Miles on a booking where I used Nautical Miles?',
                    content: 'Yes, you can earn & use Nautical Miles on the same booking.',
                    isShow: true
                },
                {
                    title: 'What is a Parent Company means of the Sea Reward program?',
                    content: 'The Parent Company brings together all the companies that make it up. The rank is calculated at the parent company level and all the companies of this parent company contribute to the status through their activity on SpotOn.',
                    isShow: true
                },
                {
                    title: 'Can I spend Nautical Miles for another company?',
                    content: 'You can only spend Nautical Miles on the company account on which you earned Nautical Miles.',
                    isShow: true
                },
                {
                    title: 'What a "main partner" means for the Sea Reward program?',
                    content: 'The "main partner" is a contact/user who is able to activate the Sea Reward account of the company, earn and use Nautical Miles. If you would like to know if you are a main partner, access to the "Sea Reward Dashboard" page and check if you have the tag "main partner" in the customer account scrolling list, you will be able to see which company you are link as main.',
                    isShow: true
                },
                {
                    title: 'Why I can\'t see the Dashboard of one of the BP linked to me?',
                    content: 'It means that you have no business partner company linked to your eCommerce account.',
                    isShow: true
                }
            ],
            [
                {
                    title: 'How do I know my account is already activated?',
                    content: 'You will see your rank on the "SpotOn" page and you can access to the "Sea Reward Dashboard" page.',
                    isShow: true
                },
                {
                    title: 'Why can\'t I register to Sea Reward account ?',
                    content: 'Maybe your current commercial agreement doesn\'t allow you to join Sea Reward program. If a customer with an existing commercial agreement wishes to join the Sea Reward Program, the customer should contact its commercial point.',
                    isShow: true
                }
            ]
        ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        console.log(this.data.categoryList, this.data.listItem)
        this.initLanguage()
        if (!this.data.scrollViewWidth) {
            wx.createSelectorQuery().select('.categoryList').boundingClientRect((rect) => {
                this.setData({
                    scrollViewWidth: Math.round(rect.width),
                })
            }).exec()
        }
    },

    initLanguage() {
        const language = languageUtils.languageVersion()
        this.setData({
            languageContent: language.lang.page.seaRewardFAQ,
            language: language.lang.page.langue
        })
        wx.setNavigationBarTitle({
            title: language.lang.page.seaRewardFAQ.title,
        })
    },

    // 切换分类
    changeCategory(e) {
        const categoryId = e.currentTarget.dataset.id
        this.setData({
            categoryId
        })
        wx.createSelectorQuery().select('#categoryId-' + categoryId).boundingClientRect((rect) => {
            this.setData({
                scrollLeft: e.currentTarget.offsetLeft - this.data.scrollViewWidth / 2 + rect.width / 2
            })
        }).exec()
    },
    Information(){
        wx.navigateTo({
            url: '/pages/SeaInfoPage/index',
        })
    },
    spotOn(){
        wx.switchTab({
            url: '/pages/Quotation/Search/index',
        })
    },
    SeaReward(){
        wx.navigateTo({
            url: '/packageDashboard/pages/seaRewards/index',
        })
    },
    // 折叠
    zhedie(e) {
        this.data.listItem[this.data.categoryId][e.currentTarget.dataset.index].isShow = !this.data.listItem[this.data.categoryId][e.currentTarget.dataset.index].isShow
        this.setData({
            listItem: this.data.listItem
        })
    },
})