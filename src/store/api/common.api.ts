import request from 'utils/request';
import { RcFile } from 'antd/lib/upload';

export const uploadFile = (file:RcFile)=>{
  const formData = new FormData();
  formData.append('xxxx', file);
  const opts = {
    method:'todo',
    params:formData
  }
  return request(opts)
}

/**
 * 获取用户信息
 * @param userId 用户Id
 * @param token 令牌
 */
export const getUserInfo = (userId:string,token:string) =>
{
    const opts = {
        method: 'getUserInfo',
        params: [
          userId,
          token
        ]
    }
    return request(opts);
}

/**
 * 登录
 * @param email 邮箱
 * @param pwd 密码
 */
export const login = (email: string, pwd: string) =>
{
    const opts = {
        method: 'login',
        params: [
            email,
            pwd
        ]
    }
    return request(opts);
}