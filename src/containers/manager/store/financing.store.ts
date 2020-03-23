import {observable, action} from 'mobx';
import * as Api from '../api/project.api';
import { CodeType } from '@/store/interface/common.interface';
class FinancingManager {
  @observable public isStartContract:boolean = false;
  @observable public projId = '';
  @observable public updateId = '';
  @observable public isEdit:boolean = false; // true为编辑状态，false为创建状态

  /**
   * 项目融资时查询参与中的项目组织信息
   */
  @action public getContractList = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getReserverAddress(1,100);
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

export default new FinancingManager();