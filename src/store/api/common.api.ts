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
// 上传视频
export const uploadVideo = (file: RcFile) => {
  const formData = new FormData();
  formData.append('file', file);
  const opts = {
    method: 'file',
    params: formData,
    baseUrl: 'video',
    isUpload: true
  }
  return request(opts)
}

/**
 * 获取用户信息
 * @param userId 用户ID
 * @param token 令牌
 * @param flag  v3版本标识，0表示非v3版本，1表示v3版本
 */
export const getUserInfo = () => {
  const opts = {
    method: 'getUserInfoV3',
    params: []
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
/**
 * 获取签名的随机数
 * @param address 钱包地址
 */
export const getLoginNonce = (address: string) => {
  const opts = {
    method: 'getLoginNonceV3',
    params: [address]
  }
  return request(opts);
}
/**
 * 验证登录
 * @param address 钱包地址
 * @param data 签名数据
 */
export const validateLogin = (address: string, data: string) => {
  const opts = {
    method: 'validateLoginV3',
    params: [address,data]
  }
  return request(opts);
}

export const loginOut = () => {
  const opts = {
    method: 'logoutV3',
    params: []
  }
  return request(opts);
}
import axios, { AxiosInstance } from "axios";
// import { IAssetData, IGasPrices, IParsedTx } from "./types";

const api: AxiosInstance = axios.create({
  baseURL: "https://ethereum-api.xyz",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// export async function apiGetAccountAssets(address: string, chainId: number): Promise<IAssetData[]> {
//   const response = await api.get(`/account-assets?address=${address}&chainId=${chainId}`);
//   const { result } = response.data;
//   return result;
// }

// export async function apiGetAccountTransactions(
//   address: string,
//   chainId: number,
// ): Promise<IParsedTx[]> {
//   const response = await api.get(`/account-transactions?address=${address}&chainId=${chainId}`);
//   const { result } = response.data;
//   return result;
// }

export const apiGetAccountNonce = async (address: string, chainId: number): Promise<string> => {
  const response = await api.get(`/account-nonce?address=${address}&chainId=${chainId}`);
  const { result } = response.data;
  return result;
};

export const apiGetGasPrices = async (): Promise<any> => {
  const response = await api.get(`/gas-prices`);
  const { result } = response.data;
  return result;
};
