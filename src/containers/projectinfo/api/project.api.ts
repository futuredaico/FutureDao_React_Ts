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
/**
 * 发送评论
 * @param userId 用户id
 * @param token 
 * @param projId 项目ID
 * @param prevousId 上一条评论ID（可为空，表示一级评论）
 * @param discussStr 评论内容
 */
export const sendDiscussToProj = (userId:string,token:string,projId:string,prevousId:string,discussStr:string) =>
{
    const opts = {
        method: 'addProjDiscuss',
        params: [userId,token,projId,prevousId,discussStr]
    }
    return request(opts);
}
/**
 * 查询项目评论列表
 * @param projId 项目ID
 * @param discussId 评论ID（为空表示查询一级评论）
 * @param page 当前页码
 * @param pageSize 每页条数
 */
export const getProjDiscussList = (projId:string,discussId:string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'getProjSubDiscussList',
        params: [projId,discussId,page,pageSize]
    }
    return request(opts);
}
/**
 * 
 * @param userId 
 * @param token 
 * @param projId 
 * @param updateId 
 * @param prevousId 
 * @param discussStr 
 */
export const sendDiscussToUpdate = (userId:string,token:string,projId:string,updateId:string,prevousId:string,discussStr:string) =>
{
    const opts = {
        method: 'addUpdateDiscuss',
        params: [userId,token,projId,updateId,prevousId,discussStr]
    }
    return request(opts);
}
export const getUpdateDiscussList = (projId:string,discussId:string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'getUpdateSubDiscussList',
        params: [projId,discussId,page,pageSize]
    }
    return request(opts);
}