import { observable, action } from 'mobx';
import project from './project.store';
import * as Api from '../api/project.api'
import { IRewardContent, IRewardInfo } from '../interface/reward.interface';
import { CodeType } from '@/store/interface/common.interface';

class Financing {
    @observable public priceSimple:string ='';
  @observable public rewardContent: IRewardContent = {
    connectorName: '',
    connectorTel: '',
    info: [
      {
        rewardId: '',
        rewardName: '',
        rewardDesc: '',
        price: '',
        priceUnits:'',
        limitFlag: '',
        limitMax: '',
        distributeTimeFlag: '',
        distributeTimeFixYes: '',
        distributeTimeFixNot: '',
        distributeWay: '',
        note: '',
      }
    ]
  }
  /**
   * 查询价格的单位
   */
  @action public getProjectAsset = async () =>
  {
    let result: any = [];
    try
    {
      result = await Api.getProjFundAndTokenInfo(project.projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
        this.priceSimple = result[0].data.fundSymbol || '';
    return true;
  }
  /**
   * 查询回报信息
   */
  @action public getRewardData = async () => {
    let result: any = [];

    try {
      result = await Api.getRewardData(project.projId);
      console.log(result)
    } catch (e) {
      return false;
    }
    if (result[0].resultCode !== CodeType.success) {
      return false
    }
    if (Object.keys(result[0].data).length === 0) {
      return false
    }
    this.rewardContent = result[0].data;
    return true;
  }
  /**
   * 设置回报
   */
  @action public setReward = async () => {
    let result: any = [];
    this.rewardContent.info.map((item: IRewardInfo) => {
      item.price = parseFloat(item.price).toString();
      item.priceUnits = this.priceSimple;
    })    
    const list = this.rewardContent.info.map((item:IRewardInfo)=>{
      return {
        rewardId: item.rewardId,
        rewardName: item.rewardName,
        rewardDesc: item.rewardDesc,
        price: item.price,
        priceUnits:item.priceUnits,
        limitFlag: item.limitFlag,
        limitMax: item.limitMax,
        distributeTimeFlag: item.distributeTimeFlag,
        distributeTimeFixYes: item.distributeTimeFixYes,
        distributeTimeFixNot: item.distributeTimeFixNot,
        distributeWay: item.distributeWay,
        note: item.note,
      }
    })
    const info = {
      info: list
    }
    const infoStr = JSON.stringify(info);
    console.log(infoStr)
    try {
      result = await Api.setReward( project.projId, this.rewardContent.connectorName, this.rewardContent.connectorTel, infoStr);
      console.log(result)
    } catch (e) {
      return false;
    }
    if (result[0].resultCode !== CodeType.success) {
      return false
    }
    return true;
  }
}

export default new Financing();