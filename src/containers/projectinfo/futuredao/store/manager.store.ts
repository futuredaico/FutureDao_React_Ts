import { observable, action,  } from 'mobx';
import { IProjectContractInfo } from '../interface/manager.interface';
import * as Api from '../api/project.api';
// import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';

class IProjectManager
{
  @observable public contractShow:IProjectContractInfo|null = null;
  @action public getContractShowData = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.queryProjFinanceInfo(projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    if(Object.keys(result[0].data).length === 0){
      this.contractShow = null;
      return false
    }
    this.contractShow = result[0].data
    return true;
  }
}

export default new IProjectManager();