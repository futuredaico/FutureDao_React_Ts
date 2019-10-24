import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import { CodeType } from '@/store/interface/common.interface';
import projectinfoStore from './projectinfo.store';
import * as formatTime from '@/utils/formatTime';
import { IProjectContractInfo, IHistoryPrice } from '../interface/transation.interface';
import common from '@/store/common';
const defaultContract = {
  projId:"",
  tokenName:"",    // 项目代币名称
  tokenIssueTotal:"0",  // 发行总额
  tokenUnlockNotAmount:"0",  // 未解锁总额
  tokenUnlockYesAmount:"0",  // 已解锁总额
  fundManagePoolTotal:"0",  // 治理池金额
  fundReservePoolTotal:"0",  // 储备池总额
  fundReserveRatio:"0",  // 存储金比例
  priceRaiseSpeed:"0"  // 价格增速
}
class ProjectTransation
{
  @observable public projContractInfo:IProjectContractInfo|null = null;
  @observable public historyPrice:IHistoryPrice = {
    buyInfo:[],
    sellInfo:[],
    timeInfo:[]
  }
  // public data = {
  //   list: [
  //     {
  //       "name": "Buying",
  //       "data": [1, 2, 3, 4, 5, 6]
  //     },
  //     {
  //       "name": "Selling",
  //       "data": [1, 2, 3, 4, 5, 6]
  //     }
  //   ]
  // }
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
    if (Object.keys(result[0].data).length === 0) {
      this.projContractInfo = defaultContract;
      return false
    }
    this.projContractInfo = result[0].data;
    return true;
  }
  @action public getHistoryData = async (type:string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getHistoryPriceList(projectinfoStore.projId,type);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    if (Object.keys(result[0].data).length === 0) {      
      return false
    }
    const timeArr = result[0].data.timeInfo.map((item)=>{
      return formatTime.format('MM/dd hh:mm', item, common.language)
    })
    // console.log(JSON.stringify(timeArr))
    this.historyPrice = {
      buyInfo:result[0].data.buyInfo,
      sellInfo:result[0].data.sellInfo,
      timeInfo:timeArr
    };
    // console.log(JSON.stringify(this.historyPrice))
    return true;
  }
}

export default new ProjectTransation();