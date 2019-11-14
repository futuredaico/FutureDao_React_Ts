import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import { CodeType } from '@/store/interface/common.interface';
import projectinfoStore from './projectinfo.store';
import * as formatTime from '@/utils/formatTime';
import { IProjectContractInfo, IHistoryPrice, ITransationList, ITokenBanlance } from '../interface/transation.interface';
import common from '@/store/common';
import metamaskwallet from '@/store/metamaskwallet';
import { toMyNumber, saveDecimal } from "@/utils/numberTool";
// import { IContractHash } from '../interface/projectinfo.interface';
// import { CONTRACT_CONFIG } from '@/config';
// import { AbiItem } from 'web3-utils';
// import { IContractHash } from '../interface/projectinfo.interface';


const defaultContract = {
  projId: "",
  tokenSymbol: "",    // 项目代币名称
  tokenIssueTotal: "0",  // 发行总额
  tokenUnlockNotAmount: "0",  // 未解锁总额
  tokenUnlockYesAmount: "0",  // 已解锁总额
  fundManagePoolTotal: "0",  // 治理池金额
  fundReservePoolTotal: "0",  // 储备池总额
  fundReserveRatio: "0",  // 存储金比例
  priceRaiseSpeed: "0"  // 价格增速
}
class ProjectTransation
{
  @observable public tradeMenu:number=1;
  @observable public projContractInfo: IProjectContractInfo | null = null;
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
  /**
   * 获取项目合约详情
   */
  @action public getProjContractInfoData = async () =>
  {
    let result: any = [];
    try
    {
      result = await Api.getProjContract(projectinfoStore.projId);
    } catch (e)
    {
      this.projContractInfo = defaultContract;
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      this.projContractInfo = defaultContract;
      return false
    }
    if (Object.keys(result[0].data).length === 0)
    {
      this.projContractInfo = defaultContract;
      return false
    }
    this.projContractInfo = result[0].data;
    return true;
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
  @action public buy = async (addr:string,minCount: string,amount:string,orderId:number) =>
  {
    let hashStr = '';

    for (const item of projectinfoStore.hashList) {
      if(item.contractName === 'TradeFundPool'){
        hashStr = item.contractHash
      }
    }

    if(!hashStr){
      return ''
    }
    try
    {
      const txid = await Api.buy(addr,hashStr, parseInt(minCount,10),orderId,metamaskwallet.web3.utils.toWei(amount,"ether"));
      console.log(txid)
      return txid;
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
    for (const item of projectinfoStore.hashList)
    {
      if (item.contractName === 'TradeFundPool')
      {
        hashStr = item.contractHash
      }
    }
    if (!hashStr)
    {
      return ''
    }
    try
    {
      const txid = await Api.sell(addr, hashStr, parseInt(count, 10), metamaskwallet.web3.utils.toWei(minAmount, "ether"));
      return txid
    } catch (error)
    {
      console.log(error);
      throw error;
    }
  }
  /**
   * 计算购买代币需要花费多少eth
   * @param count 购买多少个代币
   */
  @action public computeBuyCountSpendPrice = (count: string) =>
  {
    if (!projectinfoStore.projInfo)
    {
      return '0'
    }
    // （ ( Y + 已发行代币数 )^2 - 已发行代币数^2）*0.0000000005
    const mycount = toMyNumber(count);
    const num1 = mycount.add(projectinfoStore.projInfo.hasIssueAmt).sqr();
    const num2 = toMyNumber(projectinfoStore.projInfo.hasIssueAmt).sqr();
    const num3 = num1.sub(num2).mul(0.0000000005).add(0.000001);
    // console.log(toMyNumber(10).add(0).sqr().sub(toMyNumber(0).sqr()).mul(0.0000000005))
    // console.log(web3.toBigNumber(toMyNumber(10).add(0).sqr().sub(toMyNumber(0).sqr()).mul(0.0000000005)).toString(10))
    return web3.toBigNumber(num3).toString(10);
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
    // (2x / 0.000000001 + 已发行代币数^2 )^0.5 - 已发行代币数
    const myamount = toMyNumber(amount);
    const num1 = myamount.mul(2).div(0.000000001);
    const num2 = toMyNumber(projectinfoStore.projInfo.hasIssueAmt).sqr();
    const num3 = parseFloat(web3.toBigNumber(num1.add(num2)).toString(10));
    const num4 = Math.pow(num3, 0.5)
    const num5 = toMyNumber(num4).sub(projectinfoStore.projInfo.hasIssueAmt);
    // 130601.60406562978
    // console.log(toMyNumber(Math.pow(parseFloat(web3.toBigNumber(toMyNumber(8.7).mul(2).div(0.000000001).add(toMyNumber(1314).sqr())).toString(10)),0.5)).sub(1314))
    return web3.toBigNumber(num5).toString(10);
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
    // console.log(toMyNumber(500).sub(toMyNumber(Math.pow(parseFloat(web3.toBigNumber(toMyNumber(1).sub(toMyNumber(3.6).div(10))).toString(10)), 0.5)).mul(500)))    
    return web3.toBigNumber(num5).toString(10);
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
    return web3.toBigNumber(num3).toString(10);
  }
}

export default new ProjectTransation();