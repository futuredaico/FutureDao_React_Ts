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
 */
export const modifyEmail = (userId: string,token:string,email:string) =>
{
    const opts = {
        method: 'modifyEmail',
        params: [
            userId,
            token,
            email
        ]
    }
    return request(opts);
}