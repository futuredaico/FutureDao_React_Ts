import request from 'utils/request';
/**
 * 修改用户头像
 * @param userId 用户ID
 * @param token 
 * @param imgStr 头像url
 */
export const modifyUserIcon = (imgStr:string) =>
{
    const opts = {
        method: 'modifyUserIconV3',
        params: [
            imgStr
        ]
    }
    return request(opts);
}
/**
 * 修改用户简介
 * @param userId 用户ID
 * @param token 
 * @param str 简介
 */
export const modifyUserBrief = (userId: string,token:string,str:string) =>
{
    const opts = {
        method: 'modifyUserBrief',
        params: [
            userId,
            token,
            str
        ]
    }
    return request(opts);
}
/**
 * 修改用户密码
 * @param userId 用户ID
 * @param token 
 * @param pwd 旧密码
 * @param newpwd 新密码
 */
export const modifyPassword = (userId: string,token:string,pwd:string,newpwd:string) =>
{
    const opts = {
        method: 'modifyPassword',
        params: [
            userId,
            token,
            pwd,
            newpwd
        ]
    }
    return request(opts);
}
/**
 * 修改邮箱
 * @param userId 用户ID
 * @param token 
 * @param email 新邮箱
 * @param pwd 密码
 */
export const modifyEmail = (userId: string,token:string,email:string,pwd:string) =>
{
    const opts = {
        method: 'modifyEmail',
        params: [
            userId,
            token,
            email,
            pwd
        ]
    }
    return request(opts);
}
export const getMangeProjCount = (userId: string,token:string) =>
{
    const opts = {
        method: 'getStarMangeProjCount',
        params: [
            userId,
            token
        ]
    }
    return request(opts);
}

/**
 * 获取管理中项目列表
 * @param userId 用户id
 * @param token 访问令牌
 * @param page 分页索引
 * @param pageSize 分页大小
 */
export const getManagerList = (userId: string,token:string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'queryProjListAtManage',
        params: [
            userId,
            token,
            page,
            pageSize
        ]
    }
    return request(opts);
}
/**
 * 获取关注中的项目列表
 * @param userId 用户id
 * @param token 访问令牌
 * @param page 分页索引
 * @param pageSize 分页大小
 */
export const getAttentionList = (userId: string,token:string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'queryProjListAtStar',
        params: [
            userId,
            token,
            page,
            pageSize
        ]
    }
    return request(opts);
}
/**
 * 用户绑定钱包地址
 * @param userId 用户id
 * @param token 访问令牌
 * @param type 地址类型 eth,neo
 * @param address 地址
 */
export const bindAddress = (userId: string,token:string,type:string,address:string) =>
{
    const opts = {
        method: 'bindAddress',
        params: [
            userId,
            token,
            type,
            address
        ]
    }
    return request(opts);
}
/**
 * 查询我的订单列表
 * @param userId 用户id
 * @param token 访问令牌
 * @param page 当前页面
 * @param pageSize 每页显示行数
 */
export const getMyorderList = (userId: string,token:string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'queryBuyOrderList',
        params: [
            userId,token,page,pageSize
        ]
    }
    return request(opts);
}
/**
 * 查询订单详情
 * @param userId 用户id
 * @param token 访问令牌
 * @param projId 项目ID
 * @param orderId 订单ID
 */
export const getMyorderDetail = (userId: string,token:string,projId:string,orderId:string) =>
{
    const opts = {
        method: 'queryBuyOrder',
        params: [
            userId,token,projId,orderId
        ]
    }
    return request(opts);
}
/**
 * 修改用户名
 * @param username 用户名
 */
export const updateUsername = (username:string) =>
{
    const opts = {
        method: 'modifyUserNameV3',
        params: [
            username
        ]
    }
    return request(opts);
}