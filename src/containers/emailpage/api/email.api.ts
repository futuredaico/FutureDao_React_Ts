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