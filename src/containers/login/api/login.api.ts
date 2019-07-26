import request from 'utils/request';

/**
 * 检查用户名
 * @param username 用户名
 */
export const checkUsername = (username: string) =>
{
    const opts = {
        method: 'checkUsername',
        params: [
            username
        ]
    }
    return request(opts);
}
/**
 * 检查邮箱
 * @param email 邮箱
 */
export const checkEmail = (email: string) =>
{
    const opts = {
        method: 'checkEmail',
        params: [
            email
        ]
    }
    return request(opts);
}
/**
 * 注册用户
 * @param username 用户名
 * @param email 邮箱
 * @param pwd 密码
 */
export const register = (username: string, email: string, pwd: string) =>
{
    const opts = {
        method: 'register',
        params: [
            username,
            email,
            pwd
        ]
    }
    return request(opts);
}

/**
 * 重置密码
 * @param email 邮箱
 */
export const resetPassword = (email: string) =>
{
    const opts = {
        method: 'resetPassword',
        params: [
            email
        ]
    }
    return request(opts);
}
/**
 * 验证重置密码
 * @param username 用户名
 * @param email 邮箱
 * @param pwd 密码
 * @param code 验证码
 */
export const verifyReset = (username: string, email: string,pwd:string, code: string) =>
{
    const opts = {
        method: 'verifyReset',
        params: [
            username,
            email,
            pwd,
            code
        ]
    }
    return request(opts);
}
