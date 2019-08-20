import request from 'utils/request';
import { RcFile } from 'antd/lib/upload';
// 上传文件图片之类的
export const uploadFile = (file: RcFile) => {
  const formData = new FormData();
  formData.append('file', file);
  const opts = {
    method: 'file',
    params: formData,
    baseUrl: 'file',
    isUpload: true
  }
  return request(opts)
}

/**
 * 获取用户信息
 * @param userId 用户Id
 * @param token 令牌
 */
export const getUserInfo = (userId: string, token: string) => {
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
export const login = (email: string, pwd: string) => {
  const opts = {
    method: 'login',
    params: [
      email,
      pwd
    ]
  }
  return request(opts);
}
/**
 * 重新发送验证邮箱
 * @param userId 用户ID
 * @param token
 */
export const reSendVerify = (userId: string, token: string) => {
  const opts = {
    method: 'reSendVerify',
    params: [
      userId,
      token
    ]
  }
  return request(opts);
}
