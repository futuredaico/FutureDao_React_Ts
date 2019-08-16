import request from 'utils/request';
/**
 * 修改用户头像
 * @param userId 用户ID
 * @param token 
 * @param imgStr 头像url
 */
export const modifyUserIcon = (userId: string,token:string,imgStr:string) =>
{
    const opts = {
        method: 'modifyUserIcon',
        params: [
            userId,
            token,
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