import request from "@/utils/request";
import web3Tool from "@/utils/web3Tool";
import common from "@/store/common";
// import { CONTRACT_CONFIG } from "@/config";
// import { AbiItem } from "web3-utils";
/**
 * 获取项目详情基本信息
 * @param projId 项目ID
 * @param userId 用户ID
 */
export const getProjInfo = (projId: string, userId: string) =>
{
    const opts = {
        method: 'queryProjDetail',
        params: [projId, userId]
    }
    return request(opts);
}
/**
 * 获取更新日志列表
 * @param projId 项目id
 * @param page 当前页
 * @param pageSize 每页显示条数
 */
export const getUpdateList = (projId: string, page: number, pageSize: number) =>
{
    const opts = {
        method: 'queryUpdateList',
        params: [projId, page, pageSize]
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
export const deleteUpdate = (userId: string, token: string, projId: string, proUpdateId: string) =>
{
    const opts = {
        method: 'deleteUpdate',
        params: [userId, token, projId, proUpdateId]
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
export const getUpdateInfoById = (projId: string, proUpdateId: string, userId: string) =>
{
    const opts = {
        method: 'queryUpdate',
        params: [projId, proUpdateId, userId]
    }
    return request(opts);
}
/**
 * 关注项目
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 */
export const startAttention = (userId: string, token: string, projId: string) =>
{
    const opts = {
        method: 'startStarProj',
        params: [userId, token, projId]
    }
    return request(opts);
}
/**
 * 取消关注
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 */
export const cancelAttention = (userId: string, token: string, projId: string) =>
{
    const opts = {
        method: 'cancelStarProj',
        params: [userId, token, projId]
    }
    return request(opts);
}
/**
 * 看好项目
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 */
export const startSupport = (userId: string, token: string, projId: string) =>
{
    const opts = {
        method: 'startSupportProj',
        params: [userId, token, projId]
    }
    return request(opts);
}
/**
 * 获取项目成员信息
 * @param projId 项目id
 * @param page 当前页
 * @param pageSize 每页显示条数
 */
export const getTeamList = (projId: string, page: number, pageSize: number) =>
{
    const opts = {
        method: 'queryProjTeamBrief',
        params: [projId, page, pageSize]
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
/**
 * 获取交易合约详情数据的统计
 * @param projId 项目ID
 */
export const getProjContract = (projId: string) =>
{
    const opts = {
        method: 'queryProjContract',
        params: [projId]
    }
    return request(opts);
}
/**
 * 获取代币历史价格
 * @param projId 项目Id
 * @param type 截取时间 “w”为1周，“m”为1月
 */
export const getHistoryPriceList = (projId: string, type: string) =>
{
    const opts = {
        method: 'queryTokenHistPrice',
        params: [projId, type]
    }
    return request(opts);
}
/**
 * 查询项目购买价格和出售价格
 * @param projId 项目ID
 */
export const getTokenPrice = (projId: string) =>
{
    const opts = {
        method: 'queryTokenPrice',
        params: [projId]
    }
    return request(opts);
}
/**
 * 获取项目礼包列表
 * @param projId 项目Id
 */
export const getRewardList = (projId: string) =>
{
    const opts = {
        method: 'queryRewardList',
        params: [projId]
    }
    return request(opts);
}

/**
 * 查询预留代币
 * @param projId 项目ID
 */
export const getReserveToken = (projId: string) =>
{
    const opts = {
        method: 'queryReserveToken',
        params: [projId]
    }
    return request(opts);
}
/**
 * 
 * @param projId 项目ID
 * @param addr 地址
 * @param page 分页索引
 * @param size 分页大小
 */
export const getTxList = (projId: string, addr: string, page: number, size: number) =>
{
    const opts = {
        method: 'queryTxList',
        params: [projId, addr, page, size]
    }
    return request(opts);
}
/**
 * 获取资金池里的数据
 * @param projId 项目ID
 * @param addr 地址
 */
export const getTokenBalanceInfo = (projId: string, addr: string) =>
{
    const opts = {
        method: 'queryTokenBalanceInfo',
        params: [projId, addr]
    }
    return request(opts);
}

/**
 * 购买
 * @param hash 项目hash
 * @param count 购买数量
 * @param token 标识
 * @param amount 金额
 */
export const buy = (hash: string, count:any,token:any,amount: any) =>
{
    if (!common.userInfo)
    {
        return
    }
    console.log('fundPool'+'*****'+ hash+'*****'+ 'buy'+'*****'+ [count+'*****'+token]+'*****'+ common.userInfo.ethAddress+'*****'+ hash+'*****'+ amount );
    return web3Tool.contractSend('fundPool', hash, 'buy', [count,token], { from: common.userInfo.ethAddress, to: hash, value: amount,gas: 5500000})
}

/**
 * 卖出方法
 * @param hash 
 * @param amount 
 */
export const sell = (hash: string, amount: any) =>
{
    if (!common.userInfo)
    {
        return
    }
    return web3Tool.contractSend('fundPool', hash, "sell", [amount], { from: common.userInfo.ethAddress });
}

/**
 * 根据hash获得项目股份的购买斜率
 * @param hash 
 */
export const getSlope = (hash: string) =>
{
    return web3Tool.contractCall('fundPool', hash, "slope");
}

export const getFndBalancesByAddress = (hash: string, address: string) =>
{
    return web3Tool.contractCall('fundPool', hash, 'balances', [address]);
}

export const getProjectContractHash = (projId: string) =>
{
    const opts = {
        method: 'queryContractHash',
        params: [projId]
    }
    return request(opts);
}