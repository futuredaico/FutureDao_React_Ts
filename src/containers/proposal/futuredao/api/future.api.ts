import request from "@/utils/request";
/**
 * 查询futuredao的支持代币信息
 * @param projId 项目id
 */
export const getProjFundAndTokenInfo = (projId:string)=>{
    const opts = {
        method: 'getProjFundAndTokenInfo',
        params: [projId]
    }
    return request(opts);
}
/**
 * 查询融资合约信息
 * @param projId 项目id
 */
export const getFContractInfo = (projId:string)=>{
    const opts = {
        method: 'getFContractInfo',
        params: [projId]
    }
    return request(opts);
}