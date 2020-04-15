import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import { CodeType } from '@/store/interface/common.interface';
import projectinfoStore from './projectinfo.store';
import * as formatTime from '@/utils/formatTime';
import { IHistoryPrice, ITransationList, ITokenBanlance } from '../interface/transation.interface';
import common from '@/store/common';
// import metamaskwallet from '@/store/metamaskwallet';
import { saveDecimal, toMyNumber, toNonExponential } from "@/utils/numberTool";
// import { IContractHash } from '../interface/projectinfo.interface';
// import { CONTRACT_CONFIG } from '@/config';
import { AbiItem } from 'web3-utils';
import { Web3Contract } from '@/utils/web3Contract';
import financingStore from '@/containers/manager/store/financing.store';
// import { IContractHash } from '../interface/projectinfo.interface';

class ProjectTransation
{
  @observable public tradeMenu: number = 1;
  @observable public historyPrice: IHistoryPrice = {
    buyInfo: [],
    sellInfo: [],
    timeInfo: []
  }
  @observable public transList: ITransationList[] = [];
  @observable public transCount: number = 0;
  @observable public transPage: number = 1;
  @observable public transPageSize: number = 10;
  @observable public hash = "";
  @observable public totalSupply: string = "";       // 发行量
  @observable public storeEth: string = "0";          // 存储池的金额
  @observable public tokenBalanceInfo: ITokenBanlance = {
    tokenAmt: "0",
    shareAmt: "0",
    availableAmt: "0",
    lockAmt: "0",
    chg24h: "0",
    lastBuyPrice: "0",
    lastSellPrice: "0"
  };
  @observable public assetDecimals:number = 0;
  @observable public slopeNum = 0;

  /**
   * 获取资产余额
   */
  @action public getCanUseBalance = async (addr: string, assetHash:string) =>
  {
    console.log("addr:",addr);
    console.log("assetHash:",assetHash)
    try
    {
      const tokenAbi = require('@/utils/contractFiles/ERC20.json') as AbiItem[];
      const tokenContract = new Web3Contract(tokenAbi, assetHash);
     
      const submitRes = await tokenContract.contractCall("balanceOf", [addr]).then((value)=>{
        return value
      });
      console.log(submitRes)
      const asset = await financingStore.getTokenInfo(assetHash);
      this.assetDecimals = parseFloat(asset.decimals);
      const decimal = -asset.decimals
      const num = toMyNumber(submitRes).mul(Math.pow(10, decimal));
      console.log(num)
      return num.value.toString()
    } catch (error)
    {
      console.log(error);
      throw error;
    }
  }
  @action public getSlopeData = async()=>{
    let hashStr = '';
    for (const item of projectinfoStore.hashList)
    {
      if (item.name === 'Co')
      {
        hashStr = item.hash
      }
    }
    
    console.log(hashStr)
    if (!hashStr)
    {
      return ''
    }
    try
    {
      const coAbi = require('@/utils/contractFiles/Co.json').abi as AbiItem[];
      const coContract = new Web3Contract(coAbi, hashStr);
      const submitRes = await coContract.contractCall("slope", []).then((value)=>{
        return value
      });
      console.log('submitRes:',submitRes)
      this.slopeNum = submitRes
      return submitRes
    } catch (error)
    {
      console.log(error);
      throw error;
    }
  }

  /**
   * 获取历史价格
   */
  @action public getHistoryData = async (type: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getHistoryPriceList(projectinfoStore.projId, type);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    if (Object.keys(result[0].data).length === 0)
    {
      this.historyPrice = {
        buyInfo: [],
        sellInfo: [],
        timeInfo: []
      }
      return false
    }
    const timeArr = result[0].data.timeInfo.map((item) =>
    {
      return formatTime.format('MM/dd hh:mm', item, common.language)
    })
    const arr = result[0].data.buyInfo.map((value: string) =>
    {
      return saveDecimal(value, 6)
    })
    const arr2 = result[0].data.sellInfo.map((value: string) =>
    {
      return saveDecimal(value, 6)
    })
    this.historyPrice.buyInfo = arr;
    this.historyPrice.sellInfo = arr2;
    this.historyPrice.timeInfo = timeArr
    return true;
  }
  /**
   * 获取交易记录
   */
  @action public getTxListData = async (addr: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getTxList(projectinfoStore.projId, addr, this.transPage, this.transPageSize);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    if (Object.keys(result[0].data).length === 0)
    {
      return false
    }
    this.transCount = result[0].data.count || 0;
    this.transList = result[0].data.list || [];
    return true;
  }
  /**
   * 获取资金池
   */
  @action public getTokenBalance = async (addr: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getTokenBalanceInfo(projectinfoStore.projId, addr);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.tokenBalanceInfo = result[0].data;
    return true;
  }

  // /**
  //  * 买入
  //  * @param addr 购买地址
  //  * @param minCount 最少能买多少
  //  * @param amount 购买金额
  //  */
  @action public buy = async (addr: string, minCount: string, amount: string, orderId: string, hash?: string) =>
  {
    let hashStr = '';
    if (hash)
    {
      hashStr = hash;
    } else
    {

      for (const item of projectinfoStore.hashList)
      {
        if (item.name === 'TradeFundPool')
        {
          hashStr = item.hash
        }
      }
    }
    console.log(hashStr)
    if (!hashStr)
    {
      return ''
    }
    try
    {
      let depositHash = ''
      if(projectinfoStore.projInfo){
        depositHash = projectinfoStore.projInfo.fundHash
      }
      const abi = require("utils/contractFiles/ERC20.json") as AbiItem[];
      const erc20Contract = new Web3Contract(abi, depositHash);
      

      const futuredaoAbi = require('@/utils/contractFiles/TradeFundPool.json').abi as AbiItem[];
      const futureContract = new Web3Contract(futuredaoAbi, hashStr);
      // futureContract.contractSend("start",[], { from: metamaskwallet.metamaskAddress });
      const minMount = 0
      const value = toMyNumber(amount).mul(Math.pow(10, this.assetDecimals)).value;
      
      const assetRes = erc20Contract.contractSend("approve", [hashStr, value], { from: addr });
      const assetTxid = await assetRes.onTransactionHash();
      console.log('assetTxid:',assetTxid)
      const submitRes = futureContract.contractSend("buy", [value,minMount, orderId], { from: addr });
      const subtxid = await submitRes.onTransactionHash();
      // export const buy = (addr: string, hash: string, minMount: number, token: number, amount: string) => {
      //       if (!common.userInfo) {
      //           return
      //       }
      //       return web3Tool.contractSend('fundPool', hash, 'buy', [minMount,token], { from: addr, to: hash, value: amount,gas: 5500000})
      //   }
      // web3Tool.contractSend('fundPool', hash, 'buy', [minMount,token], { from: addr, to: hash, value: amount,gas: 5500000})
      // const txid = await Api.buy(addr, hashStr, parseInt(minCount, 10), orderId, metamaskwallet.web3.utils.toWei(amount, "ether"));
      // console.log(submitRes)
      return subtxid;
      return ''
    } catch (error)
    {
      console.log(error);
      throw error;
    }
  }
  /**
   * 卖出
   * @param addr 卖出地址
   * @param count 卖出多少
   * @param minAmount 最少获得多少
   */
  @action public sell = async (addr: string, count: string, minAmount: string) =>
  {
    let hashStr = '';
    console.log(projectinfoStore.hashList)
    for (const item of projectinfoStore.hashList)
    {
      if (item.name === 'TradeFundPool')
      {
        hashStr = item.hash
      }
    }
    if (!hashStr)
    {
      return ''
    }
    try
    {
      const futuredaoAbi = require('@/utils/contractFiles/TradeFundPool.json').abi as AbiItem[];
      const futureContract = new Web3Contract(futuredaoAbi, hashStr);
      const amount = parseInt(count, 10);
      const minGasValue = toMyNumber(minAmount).mul(Math.pow(10, this.assetDecimals)).value
      const submitRes = futureContract.contractSend("sell", [amount,minGasValue], { from: addr });
      const subtxid = await submitRes.onTransactionHash();


      // export const sell = (addr: string, hash: string, count: number, minAmount: string) => {
      //   if (!common.userInfo) {
      //       return
      //   }
        // const minAmountNum = parseFloat(minAmount)
        // return web3Tool.contractSend('fundPool', hash, "sell", [count,minAmountNum], { from: addr ,gas: 5500000});
    // }
      // const txid = await Api.sell(addr, hashStr, parseInt(count, 10), metamaskwallet.web3.utils.toWei(minAmount, "ether"));
      return subtxid
    } catch (error)
    {
      console.log(error);
      throw error;
    }
  }
  /**
   * 计算购买代币需要花费多少
   * @param count 购买多少个代币
   */
  @action public computeBuyCountSpendPrice = (count: string) =>
  {
    if (!projectinfoStore.projInfo)
    {
      return '0'
    }
    // （ ( Y + 已发行代币数 )^2 - 已发行代币数^2）*( 1/斜率/2)
    if(!this.slopeNum){
      return '0'
    }
    const mycount = toMyNumber(count);
    const num1 = mycount.add(projectinfoStore.projInfo.hasIssueAmt).sqr();
    console.log(num1)
    const num2 = toMyNumber(projectinfoStore.projInfo.hasIssueAmt).sqr();
    console.log(num2)
    const num3 = toMyNumber(1).div(this.slopeNum).div(2).mul(1000);
    console.log(this.slopeNum)
    console.log(num3)
    const num4 = num1.sub(num2).mul(num3).add(0.000001);
    console.log(num4) 
    console.log(count)
    return toNonExponential(num4.value);
  }
  /**
   * 计算花费eth可以购买多少个代币
   * @param amount 花费多少钱（eth,dai,neo,gas...)
   */
  @action public computeSpendPriceBuyCount = (amount: string) =>
  {
    if (!projectinfoStore.projInfo)
    {
      return '0'
    }
    if(!this.slopeNum){
      return '0'
    }
    // (2x / （1/斜率） + 已发行代币数^2 )^0.5 - 已发行代币数
    const myamount = toMyNumber(amount);
    const num = toMyNumber(1).div(this.slopeNum).mul(1000)
    const num1 = myamount.mul(2).div(num);
    const num2 = toMyNumber(projectinfoStore.projInfo.hasIssueAmt).sqr();
    const num3 = parseFloat(num1.add(num2).toString());
    const num4 = Math.pow(num3, 0.5)
    const num5 = toMyNumber(num4).sub(projectinfoStore.projInfo.hasIssueAmt);
    return toNonExponential(num5.value);
  }
  /**
   * 已知要获得X个ETH，求需要出售多少个代币
   * @param amount 想要得到多少钱（eth,dai,neo,gas...)
   */
  @action public computeGetPriceSellCount = (amount: string) =>
  {
    if (!projectinfoStore.projInfo || parseFloat(projectinfoStore.projInfo.fundReservePoolTotal) === 0)
    {
      return '0'
    }
    // 已发行代币数-已发行代币数*（1-x/储备池资金数)^0.5
    const myamount = toMyNumber(amount);
    const num1 = myamount.div(projectinfoStore.projInfo.fundReservePoolTotal);
    let num2 = parseFloat(web3.toBigNumber(toMyNumber(1).sub(num1)).toString(10));
    let fuhao = ''
    if (num2 < 0)
    {
      fuhao = '-';
      num2 = Math.abs(num2);
    }
    const num3 = fuhao + Math.pow(num2, 0.5);
    const num4 = toMyNumber(num3).mul(projectinfoStore.projInfo.hasIssueAmt);
    const num5 = toMyNumber(projectinfoStore.projInfo.hasIssueAmt).sub(num4);
    return toNonExponential(num5.value);
  }
  /**
   * 已知要出售Y个代币，求能够获得多少ETH
   * @param count 出售多少个代币
   */
  @action public computeSellCountGetPriace = (count: string) =>
  {
    if (!projectinfoStore.projInfo || parseFloat(projectinfoStore.projInfo.hasIssueAmt) === 0)
    {
      return '0'
    }
    // 2*储备池资金数*Y *（1-Y/（2*已发行代币数））/ 已发行代币数
    const myamount = toMyNumber(count);
    const num1 = toMyNumber(projectinfoStore.projInfo.hasIssueAmt).mul(2);
    const num2 = toMyNumber(1).sub(myamount.div(num1));
    const num3 = num2.mul(myamount).mul(projectinfoStore.projInfo.fundReservePoolTotal).mul(2).div(projectinfoStore.projInfo.hasIssueAmt);

    console.log(toMyNumber(1).sub(toMyNumber(100).div(toMyNumber(500).mul(2))).mul(toMyNumber(100)).mul(10).mul(2).div(500))
    return toNonExponential(num3.value);
  }
}

export default new ProjectTransation();