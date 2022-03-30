const { getRequest } = require('../http')

// 获取首页数据
export const GetHomeData = (params) => {
  return getRequest('/getHome')
}
// 获取航线查询数据
export const routingFinder=(params)=>{
  let obj={
    placeOfDischarge:params.placeOfDischarge,
    placeOfLoading:params.placeOfLoading 
  }
  return getRequest('/api/miniapp/routing-finder',obj)
}
// 获取货物追踪数据
export const shipmentTracking=(params)=>{
    let obj={
      shipmentRef:params.shipmentRef,
      eqpid:params.eqpid
    }
    console.log(obj);
    return getRequest('/api/miniapp/shipment-tracking',obj)
}