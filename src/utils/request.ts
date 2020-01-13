import Axios, { AxiosRequestConfig } from 'axios';
import { CodeType } from '@/store/interface/common.interface';
import common from '@/store/common';

interface IOpts {
  method: string, // 接口名
  params: any[] | FormData, // 参数
  isGET?: boolean, // 是否是get 请求（默认请求是post）
  baseUrl?: string, // 如果是common 则 取 baseCommonUrl（默认 baseUrl）
  getAll?: boolean, // 是否获取所有返回结果
  isUpload?: boolean, // 是否上传
}

// 1.开发环境：
// apidaodev.nel.group/api/testnet

// 2.测试环境：
// apidaotest.nel.group/api/testnet

// 3.主网环境:
// apidao.nel.group/api/mainnet

const network: string = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'testnet' : 'mainnet';
const baseCommonUrl: string = "https://api.nel.group/api/" + network;
// https://apidao.nel.group/api/ V1版的请求地址
const baseUrl: string =process.env.REACT_APP_SERVER_ENV === 'DEV' ? "https://apidaodev.nel.group/api/" + network : "apidao.nel.group/api/mainnet" + network;
// const fileUrl: string = "https://apidao.nel.group/api/file/" + network;
const fileUrl: string = "https://apioss.nel.group/api/file/" + network;
const videoUrl: string = "https://apioss.nel.group/api/file/" + network + 'bi';

const makeRpcPostBody = (method: string, params: any): {} => {

  const body = {};
  body["jsonrpc"] = "2.0";
  body["id"] = 1;
  body["method"] = method;
  body["params"] = params;
  return body;
}
const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  }
}
export default function request(opts: IOpts): Promise<any> {
  let url = baseUrl;
  if (opts.baseUrl === 'common') {
    url = baseCommonUrl;
  }
  if (opts.baseUrl === 'file') {
    url = fileUrl;
  }
  if (opts.baseUrl === 'video') {
    url = videoUrl;
  }
  const params = makeRpcPostBody(opts.method, opts.params);
  let args: AxiosRequestConfig = {
    url,
    method: opts.isGET ? 'GET' : 'POST',
    [opts.isGET ? 'params' : 'data']: opts.method ? params : JSON.stringify(params),
    ...defaultConfig,
  }
  if (opts.isUpload) {
    args = {
      url,
      method: 'POST',
      data: opts.params,
      ...defaultConfig,
    }
  }
  args.withCredentials = true;
  return new Promise((resolve, reject) => {
    Axios(args)
      .then((data: any) => {
        if (data.data.result) {
          if (opts.getAll) {
            resolve(data.data);
            return;
          }
          if (!!data.data.result.length) {
            if (data.data.result[0].resultCode === CodeType.invalidLoginInfo || data.data.result[0].resultCode === CodeType.notFindUserInfo) {
              // 无效的登录信息(即用户名/邮箱/密码错误)/没有找到用户信息
              if (common.language === 'en') {
                common.openNotificationWithIcon('error', 'Operation failed', 'The login status is abnormal, please log in again.');
              } else {
                common.openNotificationWithIcon('error', '操作失败', '登录状态异常，请重新登录');
              }
            } else if (data.data.result[0].resultCode === CodeType.invalidAccessToken || data.data.result[0].resultCode === CodeType.expireAccessToken) {
              if (common.language === 'en') {
                common.openNotificationWithIcon('error', 'Operation failed', 'Login timed out, please log in again');
              } else {
                common.openNotificationWithIcon('error', '操作失败', '登录超时，请重新登录');
              }
            }
          }
          resolve(data.data.result);
          return;
        }
        else if (data.data.error["code"] === -1) {
          reject(data.data.error);
        }
        reject(data.data.error);
      })
      .catch((err: any) => { reject(err) });
  });
}
