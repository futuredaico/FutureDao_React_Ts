import { observable, action } from 'mobx';
import * as Api from '../api/order.api';
import {getProjectContractHash} from '../../projectinfo/api/project.api';
// import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { IRewardDetail, ICreateOrderInfo } from '../interface/order.interface';
import common from '@/store/common';
class Order
{
  @observable public orderMenu = 1; // 订单菜单切换 1为订单信息，2为订单创建，3为订单取消，4为订单确认付款
  @observable public projId: string = ''; // 项目ID
  @observable public rewardId:string = ''; // 礼包ID
  @observable public rewardDetail:IRewardDetail|null = null;
  @observable public orderId:string = '';  // 订单ID
  @observable public hash:string = ''; // 交易的合约hash
  @observable public orderInfo:ICreateOrderInfo|null = null; // 订单详情的部分数据
  @observable public timeTen:NodeJS.Timer | null = null; // 倒计时定时器

  /**
   * 获取项目基本详情
   */
  @action public getRewardInfo = async (rewardId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getRewardInfo(rewardId);
    } catch (e)
    {
      this.rewardDetail = null;
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      this.rewardDetail = null;
      return false
    }
    this.rewardDetail = result[0].data[0]
    return true;
  }
  /**
   * 创建订单
   */
  @action public createOrder = async (buyCount:string,getCount:string,name:string,tel:string,addr:string,email:string,msg:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.createOrder(common.userId,common.token,this.projId,this.rewardId,buyCount,getCount,name,tel,addr,email,msg);
    } catch (e)
    {
      this.orderId = '';
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      this.orderId = '';
      return false
    }
    this.orderId = result[0].data.orderId
    return true;
  }
  /**
   * 确认支付订单
   */
  @action public confirmBuyOrder = async (txid: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.confirmBuyOrder(common.userId,common.token,this.orderId,txid);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    return true;
  }
  /**
   * 取消订单
   */
  @action public cancelBuyOrder = async (orderId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.cancelBuyOrder(common.userId,common.token,orderId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    return true;
  }
  /**
   * 获取订单详情
   */
  @action public getBuyOrder = async (projId:string,orderId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getOrderInfo(common.userId,common.token,projId,orderId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.orderInfo = result[0].data||null;
    return true;
  }
  /**
   * 获取项目的合约hash
   */
  @action public getTradeHash = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await getProjectContractHash(projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    for (const item of result[0].data)
    {
      if (item.contractName === 'TradeFundPool')
      {
        this.hash = item.contractHash
      }
    }
    return true;
  }
}

export default new Order();