import request from "@/utils/request";
/**
 * 获取项目详情基本信息
 * @param projId 项目ID
 * @param userId 用户ID
 */
export const getMolochProjInfo = (projId: string, userId: string) =>
{
    const opts = {
        method: 'getProjdetailV3',
        params: [projId, userId]
    }
    return request(opts);
}
/**
 * 获取项目成员信息
 * @param projId 项目id
 * @param page 当前页
 * @param pageSize 每页显示条数
 */
export const getMemberList = (projId: string, page: number, pageSize: number) =>
{
    const opts = {
        method: 'getProjMemberListV3',
        params: [projId, page, pageSize]
    }
    return request(opts);
}
/**
 * 获取项目治理提案列表
 * @param projId 项目ID
 * @param page 
 * @param pageSize 
 * @param addr 地址
 */
export const getProposalList = (projId: string, page: number, pageSize: number,addr:string) =>
{
    const opts = {
        method: 'getProjProposalListV3',
        params: [projId, page, pageSize,addr]
    }
    return request(opts);
}
/**
 * 获取提案详情
 * @param projId 项目ID
 * @param proposalId 提案索引
 */
export const getProposalDetail = (projId: string, proposalId:string) =>
{
    const opts = {
        method: 'getProjProposalDetailV3',
        params: [projId, proposalId]
    }
    return request(opts);
}

/**
 * 发送项目的评论
 * @param userId 用户id
 * @param token 
 * @param projId 项目ID
 * @param prevousId 上一条评论ID（可为空，表示一级评论）
 * @param discussStr 评论内容
 */
export const sendDiscussToProj = (userId: string, token: string, projId: string, prevousId: string, discussStr: string) =>
{
    const opts = {
        method: 'addProjDiscuss',
        params: [userId, token, projId, prevousId, discussStr]
    }
    return request(opts);
}
/**
 * 查询项目评论列表
 * @param projId 项目ID
 * @param discussId 评论ID（为空表示查询一级评论）
 * @param userId 用户id
 * @param page 当前页码
 * @param pageSize 每页条数
 */
export const getProjDiscussList = (projId: string, discussId: string, userId: string, page: number, pageSize: number) =>
{
    const opts = {
        method: 'getProjSubDiscussList',
        params: [projId, discussId, userId, page, pageSize]
    }
    return request(opts);
}
/**
 * 查询项目二级评论接口
 * @param childId 一级评论ID
 * @param userId 用户ID
 * @param page 分页索引
 * @param pageSize 分页大小
 */
export const getProjDiscussChildList = (childId: string, userId: string, page: number, pageSize: number) =>
{
    const opts = {
        method: 'getProjSubChildDiscussList',
        params: [childId, userId, page, pageSize]
    }
    return request(opts);
}
/**
 * 发送更新日志的评论
 * @param userId 用户id
 * @param token 
 * @param projId 项目ID
 * @param updateId 更新日志ID
 * @param prevousId 上一条评论ID（可为空，表示一级评论）
 * @param discussStr 评论内容
 */
export const sendDiscussToUpdate = (userId: string, token: string, projId: string, updateId: string, prevousId: string, discussStr: string) =>
{
    const opts = {
        method: 'addUpdateDiscuss',
        params: [userId, token, projId, updateId, prevousId, discussStr]
    }
    return request(opts);
}
/**
 * 查询更新日志的评论列表
 * @param updateId 更新ID
 * @param discussId 评论ID（为空表示查询一级评论）
 * @param userId 用户id
 * @param page 当前页码
 * @param pageSize 每页条数 
 */
export const getUpdateDiscussList = (updateId: string, discussId: string, userId: string, page: number, pageSize: number) =>
{
    const opts = {
        method: 'getUpdateSubDiscussList',
        params: [updateId, discussId, userId, page, pageSize]
    }
    return request(opts);
}
/**
 * 查询更新日志二级评论接口
 * @param childId 一级评论ID
 * @param userId 用户ID
 * @param page 分页索引
 * @param pageSize 分页大小
 */
export const getUpdateDiscussChildList = (childId: string, userId: string, page: number, pageSize: number) =>
{
    const opts = {
        method: 'getUpdateSubChildDiscussList',
        params: [childId, userId, page, pageSize]
    }
    return request(opts);
}
/**
 * 点赞项目评论
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 * @param discussId 评论ID
 */
export const sendZanProj = (userId: string, token: string, projId: string, discussId: string) =>
{
    const opts = {
        method: 'zanProjDiscuss',
        params: [userId, token, projId, discussId]
    }
    return request(opts);
}
/**
 * 点赞更新评论
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 * @param updateId 更新ID
 * @param discussId 评论ID
 */
export const sendZanUpdate = (userId: string, token: string, projId: string, updateId: string, discussId: string) =>
{
    const opts = {
        method: 'zanUpdateDiscuss',
        params: [userId, token, projId, updateId, discussId]
    }
    return request(opts);
}
/**
 * 点赞该条更新日志
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 * @param updateId 更新ID
 */
export const sendZanUpdateInfo = (userId: string, token: string, projId: string, updateId: string) =>
{
    const opts = {
        method: 'zanUpdate',
        params: [userId, token, projId, updateId]
    }
    return request(opts);
}