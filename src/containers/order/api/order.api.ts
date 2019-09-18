import request from 'utils/request';
/**
 * 获取项目详情基本信息
 * @param projId 项目ID
 * @param userId 用户ID
 */
export const getProjInfo = (projId:string,userId:string) =>
{
    const opts = {
        method: 'queryProjDetail',
        params: [projId,userId]
    }
    return request(opts);
}