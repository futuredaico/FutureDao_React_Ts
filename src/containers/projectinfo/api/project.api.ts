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
/**
 * 获取更新日志列表
 * @param projId 项目id
 * @param page 当前页
 * @param pageSize 每页显示条数
 */
export const getUpdateList = (projId:string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'queryUpdateList',
        params: [projId,page,pageSize]
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
export const getUpdateInfoById = (projId:string,proUpdateId:string,userId:string) =>
{
    const opts = {
        method: 'queryUpdate',
        params: [projId,proUpdateId,userId]
    }
    return request(opts);
}
/**
 * 关注项目
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 */
export const startAttention = (userId:string,token:string,projId:string) =>
{
    const opts = {
        method: 'startStarProj',
        params: [userId,token,projId]
    }
    return request(opts);
}
/**
 * 取消关注
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 */
export const cancelAttention = (userId:string,token:string,projId:string) =>
{
    const opts = {
        method: 'cancelStarProj',
        params: [userId,token,projId]
    }
    return request(opts);
}
/**
 * 看好项目
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 */
export const startSupport = (userId:string,token:string,projId:string) =>
{
    const opts = {
        method: 'startSupportProj',
        params: [userId,token,projId]
    }
    return request(opts);
}
/**
 * 获取项目成员信息
 * @param projId 项目id
 * @param page 当前页
 * @param pageSize 每页显示条数
 */
export const getTeamList = (projId:string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'queryProjTeamBrief',
        params: [projId,page,pageSize]
    }
    return request(opts);
}