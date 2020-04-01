import request from 'utils/request';
/**
 * 获取回报详情的基本信息
 * @param rewardId 礼包ID
 */
export const getRewardInfo = (rewardId:string) =>
{
    const opts = {
        method: 'queryRewardDetail',
        params: [rewardId]
    }
    return request(opts);
}
/**
 * 创建订单，获取订单ID
 * @param projId 项目ID
 * @param rewardId 礼包ID
 * @param buyCount 购买数量
 * @param getCount 获得代币数量
 * @param name 联系人姓名
 * @param tel 联系人电话
 * @param addr 联系人地址
 * @param email 邮箱
 * @param msg 留言
 */
export const createOrder = (projId:string,rewardId:string,buyCount:string,getCount:string,name:string,tel:string,addr:string,email:string,msg:string)=>
{
    const opts = {
        method: 'initBuyOrder',
        params: [projId,rewardId,buyCount,getCount,name,tel,addr,email,msg]
    }
    return request(opts);
}
/**
 * 确认支付接口
 * @param orderId 订单ID
 * @param txid 交易ID
 */
export const confirmBuyOrder =(orderId:string,txid:string)=>{
    const opts = {
        method:'confirmBuyOrder',
        params:[orderId,txid]
    }
    return request(opts);
}
/**
 * 取消购买订单接口
 * @param orderId 订单ID
 */
export const cancelBuyOrder =(orderId:string)=>{
    const opts = {
        method:'cancelBuyOrder',
        params:[orderId]
    }
    return request(opts);
}
/**
 * 获取订单详情
 * @param projId 项目ID
 * @param orderId 订单ID
 */
export const getOrderInfo =(projId:string,orderId:string)=>{
    const opts = {
        method:'queryBuyOrder',
        params:[projId,orderId]
    }
    return request(opts);
}