import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import { CodeType } from '@/store/interface/common.interface';
import projectinfoStore from './projectinfo.store';
import * as formatTime from '@/utils/formatTime';
import { IProjectContractInfo, IHistoryPrice, ITransationList } from '../interface/transation.interface';
import common from '@/store/common';
import metamaskwallet from '@/store/metamaskwallet';
import { toMyNumber } from "@/utils/numberTool";


const defaultContract = {
  projId: "",
  tokenName: "",    // 项目代币名称
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
  @observable public hash="";
  @observable public totalSupply:string="";       // 发行量
  @observable public storeEth:string="0";          // 存储池的金额
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
      return false
    }
    const timeArr = result[0].data.timeInfo.map((item) =>
    {
      return formatTime.format('MM/dd hh:mm', item, common.language)
    })
    this.historyPrice = {
      buyInfo: result[0].data.buyInfo,
      sellInfo: result[0].data.sellInfo,
      timeInfo: timeArr
    };
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

  @action public buy = async (amount: string) =>
  {
    try
    {
      const txid = await Api.buy(this.hash, metamaskwallet.web3.utils.toWei(amount, "ether"));
      return txid;
    } catch (error)
    {
      console.log(error);
      throw error;
    }
  }

  @action public sell = async (amount: string) =>
  {
    try
    {
      // tslint:disable-next-line:radix
      const txid = await Api.sell(this.hash, parseInt(amount));
      return txid
    } catch (error)
    {
      throw error;
    }
  }

  /**
   * 根据eth计算买入的fnd数量
   * @param amount 
   * @param total 
   */
  @action public getBuyFndCountFromEther = async (amount: string) =>
  {
    const weiamount = web3.toWei(amount, "ether");
    const myamount = toMyNumber(weiamount);
    const total = toMyNumber(await Api.totalSupply(this.hash));
    const fndcount = myamount.mul(2).add(total.sqr().value).sqrt().sub(total.value);
    const count = fndcount.toString()
    const price = web3.fromWei(myamount.div(count).toString(), 'ether');
    // console.log('eth',amount);

    // console.log('wei',weiamount);
    // // console.log('斜率',slope);
    // console.log('发行量',total.value);
    // console.log('购买量',count);
    return { count, price };
  }

  /**
   * 根据eth计算买入的fnd数量
   * @param count 
   */
  @action public getPayEtherFromFndCount = async (count: string) =>
  {
    // // const slope =common.web3.utils.hexToNumberString((await getSlope(this.hash))._hex);
    // const countbn = common.web3.utils.toBN(count);
    // const totalbn = common.web3.utils.toBN(this.totalSupply);
    // // const slopebn = common.web3.utils.toBN(slope);
    // // const weicount = totalbn.add(countbn).sqr().mul(slopebn).sub(totalbn.sqr().mul(slopebn)).divn(2);
    // const weicount = totalbn.add(countbn).sqr().sub(totalbn.sqr()).divn(2);
    // console.log('wei count',weicount);
    const mycount = toMyNumber(count);
    const total = toMyNumber(await Api.totalSupply(this.hash));
    const weicount = total.add(mycount.value).sqr().sub(total.sqr()).div(2);
    const amount = web3.fromWei(weicount.toString(), "ether");
    const price = web3.fromWei(weicount.div(mycount).toString())
    // return common.web3.utils.fromWei(weicount.toString(),"ether");
    return { amount, price }
  }

  /**
   * 根据想要卖出的钱算出该卖的fnd的数量
   * @param amount Ether的数量
   */
  @action public getFndCountFromSellEther = async (amount: string) =>
  {
    // const weicount = common.web3.utils.toWei(amount.toString(),"ether");
    const weicount = web3.toWei(amount, "ether");
    const myamount = toMyNumber(weicount);
    const total = toMyNumber(await Api.totalSupply(this.hash));
    // const store = toMyNumber(common.web3.utils.toWei(this.storeEth,"ether"));
    const store = toMyNumber(web3.toWei(this.storeEth, "ether"));
    const x1 = store.sub(myamount).div(store).mul(total.sqr().value).sqrt()
    // console.log('x1',x1);        
    const count = total.sub(x1);
    // console.log('ether',amount);
    // console.log('wei',weicount);
    // console.log('发行量',total.toString());
    // console.log('存储池',store.toString());
    // console.log('FND 数量',count.toString());
    const price = web3.fromWei(myamount.div(count));
    return { count: count.value.toFixed(), price }
  }

  /**
   * 根据卖出的fnd数量算出得到的Ether
   * @param count fnd的数量
   */
  @action public getSellEtherFromFndCount = async (count: string) =>
  {
    const mycount = toMyNumber(count);
    const total = toMyNumber(this.totalSupply);
    // const store = toMyNumber(common.web3.utils.toWei(this.storeEth,"ether"));
    const store = toMyNumber(web3.toWei(this.storeEth, "ether"));
    if (store.value === 0)
    {
      return { amount: 0, price: 0 };
    }
    const x = total.sub(mycount).sqr().div(total.sqr()).mul(store);
    const amount = store.sub(x);

    const ether = web3.fromWei(amount.toString(), "ether");
    const price = web3.fromWei(amount.div(mycount));
    return { amount: ether, price };
  }
}

export default new ProjectTransation();