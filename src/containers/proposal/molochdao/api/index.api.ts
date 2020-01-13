import request from "@/utils/request";
/**
 * 获取项目接收的代币
 * @param projId 项目ID
 */
export const getMoloProjAssetInfo = (projId: string) =>
{
    const opts = {
        method: 'getProjFundInfo',
        params: [projId]
    }
    return request(opts);
}
/**
 * 获取押金信息
 * @param projId 项目ID
 */
export const getMoloProjDeposit = (projId: string) =>
{
    const opts = {
        method: 'getProjDeposit4MultiAsset',
        params: [projId]
    }
    return request(opts);
}
/**
 * 查询项目支持资产
 * @param projId 项目ID
 * @param page 页码
 * @param size 数量
 */
export const getMoloProjFuntList = (projId:string,page:number,size:number)=>{
    const opts = {
        method: 'getProjFundInfo4MultiAsset',
        params: [projId,page,size]
    }
    return request(opts);
}