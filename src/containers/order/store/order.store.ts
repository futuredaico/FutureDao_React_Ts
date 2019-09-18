import { observable, action } from 'mobx';
import * as Api from '../api/order.api';
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
class Order
{
  @observable public orderMenu = 1; // 订单菜单切换 1为订单信息，2为订单创建，3为订单取消，4为订单确认付款
  @observable public projId: string = ''; // 项目ID

  /**
   * 获取项目基本详情
   */
  @action public getProjInfo = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getProjInfo(projId, common.userId);
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
}

export default new Order();