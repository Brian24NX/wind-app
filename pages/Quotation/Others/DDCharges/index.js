// pages/Quotation/Others/D&D/index.js
import {
  ddCharge
} from '../../../../api/modules/quotation'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exportDate: '',
    importDate: '',
    portOfLoadingLabel: '',
    portOfDischargeLabel: '',
    exports: [],
    imports: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 2]
    const data = currentPage.data
    let params = {}
    if (options.from === 'myContracts') {
      this.setData({
        exportDate: data.simulationDate,
        importDate: data.simulationDate,
        portOfLoadingLabel: data.portOfLoading,
        portOfDischargeLabel: data.portOfDischarge
      })
      params = {
        portOfLoading: data.quotationDetail.initialPortOfLoading,
        portOfDischarge: data.quotationDetail.initalPortOfDischarge,
        equipmentSizeType: [data.quotationDetail.equipments[0].code],
        partnerCode: 'partnerCode'
      }
    } else {
      this.setData({
        exportDate: data.quotationDetail.departureDate,
        importDate: data.quotationDetail.arrivalDate,
        portOfLoadingLabel: data.portOfLoading,
        portOfDischargeLabel: data.portOfDischarge,
      })
      params = {
        portOfLoading: data.quotationDetail.quoteLines[0].portOfLoading,
        portOfDischarge: data.quotationDetail.quoteLines[0].portOfDischarge,
        equipmentSizeType: [data.equipmentTypeSize],
        partnerCode: 'partnerCode'
      }
    }
    
    ddCharge(params).then(res=>{
      console.log(res)
      if (res.data && res.data.length) {
        const data = res.data
        const imports = data.filter(i => (i.direction.code === 'I'))
        const exports = data.filter(i => (i.direction.code === 'E'))
        this.setData({
          imports,
          exports
        })
      }
    })
  }
})