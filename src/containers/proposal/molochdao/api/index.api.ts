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