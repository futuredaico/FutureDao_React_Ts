import request from 'utils/request';

/**
 * 验证注册
 * @param username 用户名
 */
export const verifyRegister = (username: string, email: string, code: string) =>
{
    const opts = {
        method: 'verifyRegister',
        params: [
            username, 
            email, 
            code
        ]
    }
    return request(opts);
}
/**
 * 邀请成员
 * @param username 用户名
 * @param email 邮箱
 * @param projId 项目ID
 * @param code 验证码
 * @param res 同意或拒绝（1表示同意，0表示拒绝）
 */
export const verifyInvite = (username: string, email: string, projId:string,code:string,res:string) =>
{
    const opts = {
        method: 'verifyInvite',
        params: [
            username, 
            email, 
            projId,
            code,
            res
        ]
    }
    return request(opts);
}
/**
 * 获取项目的一些信息
 */
export const getProInfo = ( projId:string) =>
{
    const opts = {
        method: 'getProjInfo',
        params: [
            projId
        ]
    }
    return request(opts);
}