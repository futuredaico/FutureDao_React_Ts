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
 * @param userId 用户ID
 * @param token 标记
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
export const createOrder = (userId:string,token:string,projId:string,rewardId:string,buyCount:string,getCount:string,name:string,tel:string,addr:string,email:string,msg:string)=>
{
    const opts = {
        method: 'initBuyOrder',
        params: [userId,token,projId,rewardId,buyCount,getCount,name,tel,addr,email,msg]
    }
    return request(opts);
}
/**
 * 确认支付接口
 * @param userId 用户ID
 * @param token 标记
 * @param orderId 订单ID
 * @param txid 交易ID
 */
export const confirmBuyOrder =(userId:string,token:string,orderId:string,txid:string)=>{
    const opts = {
        method:'confirmBuyOrder',
        params:[userId,token,orderId,txid]
    }
    return request(opts);
}
/**
 * 取消购买订单接口
 * @param userId 用户ID
 * @param token 标记
 * @param orderId 订单ID
 */
export const cancelBuyOrder =(userId:string,token:string,orderId:string)=>{
    const opts = {
        method:'cancelBuyOrder',
        params:[userId,token,orderId]
    }
    return request(opts);
}
/**
 * 获取订单详情
 * @param userId 用户ID
 * @param token 标记
 * @param projId 项目ID
 * @param orderId 订单ID
 */
export const getOrderInfo =(userId:string,token:string,projId:string,orderId:string)=>{
    const opts = {
        method:'queryBuyOrder',
        params:[userId,token,projId,orderId]
    }
    return request(opts);
}