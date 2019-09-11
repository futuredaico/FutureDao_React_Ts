import { observable, action } from 'mobx';
import * as Api from '../api/support.api';
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
class Support
{
  @observable public supportMenu = 1; // 菜单切换 1为列表，2为订单，3为订单确认页
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

export default new Support();