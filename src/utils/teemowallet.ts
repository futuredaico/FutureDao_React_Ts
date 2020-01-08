import TeemoWallet from "@/store/teemowallet";
import common from "@/store/common";
import hashConfig from "@/config/hash.config";
// tslint:disable-next-line:no-reference
/// <reference path="./inject.d.ts" />
/**
 * 获得账户信息
 */
export function getAccount()
{
  if (!window['Teemo'])
  {
    if (common.language === 'zh')
    {
      common.openNotificationWithIcon('error', "操作失败", "请登陆Teemo。");
    } else
    {
      common.openNotificationWithIcon('error', "Operation failed", "Please login Teemo wallet.");
    }
    return;
  }
  return new Promise((resolve, reject) =>
  {
    Teemo.NEO.getAccount()
      .then(result =>
      {
        resolve(result);
      })
      .catch(error =>
      {
        console.log(error);
        TeemoWallet.isLoginFlag = 2;
        if (common.language === 'zh')
        {
          common.openNotificationWithIcon('error', "操作失败", "请手动登陆Teemo钱包");
        } else
        {
          common.openNotificationWithIcon('error', "Operation failed", "请手动登陆Teemo钱包");
        }
        return false;
      })
  })
}
/**
 * 获得余额信息
 */
export function getBalance()
{
  if (!window['Teemo'])
  {
    if (common.language === 'zh')
    {
      common.openNotificationWithIcon('error', "操作失败", "请登陆Teemo。");
    } else
    {
      common.openNotificationWithIcon('error', "Operation failed", "Please login Teemo wallet.");
    }
    return;
  }
  const params: BalanceRequest = {
    address: TeemoWallet.teemoAddress,   // 你要查询的地址
    assets: [hashConfig.ID_GAS.toString()], // 不填则默认查四个资产 NEO　GAS　NNC NNK 可能之后要改一下
    // fetchUTXO 可以不填的
  }
  // 获得余额的参数
  const data: GetBalanceArgs = {
    network: common.network,
    params: params
  }
  return new Promise((resolve, reject) =>
  {
    Teemo.NEO.getBalance(data) // 获得余额的方法
      .then(result =>
      {
        resolve(result);
      })
      .catch(error =>
      {
        console.log(error);
        return false;
      })
  })
}
/**
 * 发送单个交易
 * @param params 
 */
export function invoke(params: InvokeArgs)
{
  if (!window['Teemo'])
  {
    if (common.language === 'zh')
    {
      common.openNotificationWithIcon('error', "操作失败", "请登陆Teemo。");
    } else
    {
      common.openNotificationWithIcon('error', "Operation failed", "Please login Teemo wallet.");
    }
    return;
  }
  return new Promise((resolve, reject) =>
  {
    Teemo.NEO.invoke(params)
      .then(result =>
      {
        console.log(result);
        console.log("交易成功：" + result.txid);
        resolve(result);
      })
      .catch(error =>
      {
        console.log("哎呀，交易失败了");
        console.log(error);
        if (error.type === "CANCELED")
        {
          if (common.language === 'zh')
          {
            common.openNotificationWithIcon('error', "操作失败", "您拒绝了本次操作");
          } else
          {
            common.openNotificationWithIcon('error', "Operation failed", "You have rejected this operation");
          }
        }
        return false;
      })
  })
}
/**
 * 发送合并交易
 * @param params 
 */
export function invokeGroup(params: InvokeGroup)
{
  if (!window['Teemo'])
  {
    if (common.language === 'zh')
    {
      common.openNotificationWithIcon('error', "操作失败", "请登陆Teemo。");
    } else
    {
      common.openNotificationWithIcon('error', "Operation failed", "Please login Teemo wallet.");
    }
    return;
  }
  return new Promise((resolve, reject) =>
  {
    Teemo.NEO.invokeGroup(params)
      .then(result =>
      {
        console.log(result);
        console.log("交易成功：" + result[0].txid);
        resolve(result);
      })
      .catch(error =>
      {
        console.log("==============进入了异常流程");
        console.log(error);
        if (error.type === "CANCELED")
        {
          if (common.language === 'zh')
          {
            common.openNotificationWithIcon('error', "操作失败", "您拒绝了本次操作");
          } else
          {
            common.openNotificationWithIcon('error', "Operation failed", "You have rejected this operation");
          }
        }

        // reject(error);
        return error;
      })
  })
}
/**
 * 检测网络变换
 * @param params 
 */
export function getApplicationLog(params: string)
{
  if (!window['Teemo'])
  {
    if (common.language === 'zh')
    {
      common.openNotificationWithIcon('error', "操作失败", "请登陆Teemo。");
    } else
    {
      common.openNotificationWithIcon('error', "Operation failed", "Please login Teemo wallet.");
    }
    return;
  }
  const data: GetApplicationLogArgs = {
    // network:"TestNet",
    txid: params
  }
  return new Promise((resolve, reject) =>
  {
    Teemo.NEO.getApplicationLog(data) // 获得余额的方法
      .then(result =>
      {
        console.log(result);
        // document.getElementById("getApplicationLog_R").innerText = JSON.stringify(result, null, 2);
        resolve();
      })
      .catch(error =>
      {
        console.log(error);
        reject();
      })
  })
}