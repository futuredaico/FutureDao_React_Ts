import { observable, action,  } from 'mobx';
import { IProjectContractInfo, IProjProposalList } from '../interface/manager.interface';
import * as Api from '../api/project.api';
// import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';

class IProjectManager
{
  @observable public contractShow:IProjectContractInfo|null = null;
  @observable public proposalList:IProjProposalList[] = [];
  @observable public proposalCount:number = 0;
  @observable public proposalPage:number = 1;
  @observable public proposalSize:number = 15;
  /**
   * 获取合约相关信息
   */
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
  @action public getProposalList = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.queryProjProposalList(projId,this.proposalPage,this.proposalSize);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    
    this.proposalList = result[0].data.list||[];
    this.proposalCount = result[0].data.count||0;
    return true;
  }
}

export default new IProjectManager();