import request from "@/utils/request";
/**
 * 获取项目详情基本信息
 * @param projId 项目ID
 */
export const getMolochProjInfo = (projId: string) =>
{
    const opts = {
        method: 'getProjdetailV3',
        params: [projId]
    }
    return request(opts);
}
/**
 * 查询该项目的所有资产
 * @param projId 项目ID
 * @param page 页码
 * @param pageSize 条数
 */
export const getMolochFundTotal = (projId: string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'getProjFundTotal',
        params: [projId,page,pageSize]
    }
    return request(opts);
}
/**
 * 查询项目最后更新者信息接口
 * @param projId 项目ID
 */
export const getLastUpdate = (projId: string) =>
{
    const opts = {
        method: 'getLastUpdatorInfo',
        params: [projId]
    }
    return request(opts);
}
/**
 * 获取eth的价格
 */
export const getMolochEthPrice = () =>
{
    const opts = {
        method: 'getProjBidPrice',
        params: []
    }
    return request(opts);
}
/**
 * 获取项目成员信息
 * @param projId 项目id
 * @param page 当前页
 * @param pageSize 每页显示条数
 * @param type 成员类型，0为查询总股数大于3的地址数，1为查询普通股（有投票权），2为查询无投票劝的
 */
export const getMemberList = (projId: string, page: number, pageSize: number,type:string) =>
{
    const opts = {
        method: 'getProjMemberListV3',
        params: [projId, page, pageSize,type]
    }
    return request(opts);
}
/**
 * 获取项目治理提案列表
 * @param projId 项目ID
 * @param page 
 * @param pageSize 
 * @param addr 地址
 * @param type 类型，0为预发布提案，1为正式提案，默认为1，可不填
 */
export const getProposalList = (projId: string, page: number, pageSize: number,addr:string,type:string) =>
{
    const opts = {
        method: 'getProjProposalListV3',
        params: [projId, page, pageSize,addr,type]
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
 * @param projId 项目ID
 * @param prevousId 上一条评论ID（可为空，表示一级评论）
 * @param discussStr 评论内容
 */
export const sendMolochDiscussToProj = (projId: string, prevousId: string, discussStr: string) =>
{
    const opts = {
        method: 'addMoloDiscuss',
        params: [projId, prevousId, discussStr]
    }
    return request(opts);
}
/**
 * 查询项目评论列表(获取一级评论列表接口)
 * @param projId 项目ID
 * @param page 当前页码
 * @param pageSize 每页条数
 */
export const getMolochDiscussList = (projId: string, page: number, pageSize: number) =>
{
    const opts = {
        method: 'getMoloDiscussList',
        params: [projId, page, pageSize]
    }
    return request(opts);
}
/**
 * 查询项目二级评论接口
 * @param childId 一级评论ID
 * @param page 分页索引
 * @param pageSize 分页大小
 */
export const getMolochDiscussChildList = (childId: string, page: number, pageSize: number) =>
{
    const opts = {
        method: 'getMoloSubDiscussList',
        params: [childId, page, pageSize]
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
 * @param projId 项目ID
 * @param discussId 评论ID
 */
export const sendMolochZanProj = (projId: string, discussId: string) =>
{
    const opts = {
        method: 'zanMoloDiscuss',
        params: [projId, discussId]
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
/**
 * 获取当前项目，当前用户的股份，以及当前项目的被委托人
 * @param addr 用户地址
 * @param projId 项目ID
 */
export const getTokenBalance = ( projId: string,addr: string) =>
{
    const opts = {
        method: 'getTokenBalance',
        params: [projId,addr]
    }
    return request(opts);
}
/**
 * 获取某个提案的投票详情
 * @param projId 项目id
 * @param proposalIndex 提案索引 
 * @param addr 当前地址
 */
export const getVoteInfo = ( projId: string,proposalIndex:string,addr: string) =>
{
    const opts = {
        method: 'getVoteInfo',
        params: [projId,proposalIndex,addr]
    }
    return request(opts);
}
/**
 * 获取合约hash，以及相关时间参数
 * @param projId 项目ID
 */
export const getContractInfo = ( projId: string) =>
{
    const opts = {
        method: 'queryContractInfo',
        params: [projId]
    }
    return request(opts);
}
/**
 * 获取委托人的地址以及股数
 * @param projId 项目ID
 * @param addr 登录地址
 */
export const getUpStreamInfo = ( projId: string,addr:string) =>
{
    const opts = {
        method: 'getTokenBalanceFromUpStream',
        params: [projId,addr]
    }
    return request(opts);
}