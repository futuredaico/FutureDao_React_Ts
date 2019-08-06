import request from 'utils/request';
export const getProjInfo = (projId:string,userId:string) =>
{
    const opts = {
        method: 'queryProjDetail',
        params: [projId,userId]
    }
    return request(opts);
}
/**
 * 删除项目的更新
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 * @param proUpdateId 项目更新ID
 */
export const deleteUpdate = (userId:string,token:string,projId:string,proUpdateId:string) =>
{
    const opts = {
        method: 'deleteUpdate',
        params: [userId,token,projId,proUpdateId]
    }
    return request(opts);
}
/**
 * 修改更新日志
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 * @param proUpdateId 项目更新ID
 * @param title 
 * @param detail 
 */
export const modifyUpdate = (userId:string,token:string,projId:string,proUpdateId:string,title:string,detail:string) =>
{
    const opts = {
        method: 'modifyUpdate',
        params: [userId,token,projId,proUpdateId,title,detail]
    }
    return request(opts);
}
/**
 * 根据更新ID查询项目更新日志
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 * @param proUpdateId 项目更新ID
 */
export const getUpdateInfoById = (userId:string,token:string,projId:string,proUpdateId:string) =>
{
    const opts = {
        method: 'queryUpdate',
        params: [userId,token,projId,proUpdateId]
    }
    return request(opts);
}