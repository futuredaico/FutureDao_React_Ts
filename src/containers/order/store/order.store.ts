import { observable, action } from 'mobx';
import * as Api from '../api/order.api';
// import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { IRewardDetail } from '../interface/order.interface';
class Order
{
  @observable public orderMenu = 1; // 订单菜单切换 1为订单信息，2为订单创建，3为订单取消，4为订单确认付款
  @observable public projId: string = ''; // 项目ID
  @observable public rewardId:string = ''; // 礼包ID
  @observable public rewardDetail:IRewardDetail|null = null;

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
}

export default new Order();