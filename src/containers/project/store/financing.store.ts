import { observable, action } from 'mobx';
import common from '@/store/common';
import project from './project.store';
import * as Api from '../api/project.api'
import { IFinancingContent, IRewardContent } from '../interface/financing.interface';
import { CodeType } from '@/store/interface/common.interface';
class Financing {
  @observable public step: number = 1; // 融资管理的菜单选择
  @observable public stepOneStatus: number = 1;// 部署合约完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepTwoStatus: number = 0; // 设置回报完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepThreeStatus: number = 0; // 融资信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public financingContent: IFinancingContent = {
    projId:'',
    type: 'daico',
    platform: 'eth',
    tokenName: 'eth',
    adminAddress: '',
    projTokenName: '',
    projTokenSymbol: '',
    reserveTokenFlag: '1',
    reserveTokenInfo: {
      address: '',
      info: [{
        amt: undefined,
        days: undefined
      }]
    },
    deployContractFlag:'3',
    rewardSetFlag:'3',
    ratioSetFlag:'3',
    financeStartFlag:'3'
  }
  @observable public rewardContent: IRewardContent = {
    connectorName:'',
    connectTel:'',
    info:[
      {
        rewardId: '',
        rewardName: '',
        rewardDesc: '',
        price: '',
        limitFlag: '',
        limitMax: '',
        distributeTimeFlag: '',
        distributeTimeFixYes: '',
        distributeTimeFixNot:'',
        distributeWay: '',
        note: '',
        giftTokenName:'',
        hasSellCount:0
      }
    ]
  }
  @action public financingProject = async () => {
    let result: any = [];
    const params: string[] = [
      common.userId,
      common.token,
      project.projId,
      this.financingContent.type,
      this.financingContent.platform,
      this.financingContent.tokenName,
      this.financingContent.adminAddress,
      this.financingContent.projTokenName,
      this.financingContent.projTokenSymbol,
      this.financingContent.reserveTokenFlag,
      this.financingContent.reserveTokenFlag==='1'?JSON.stringify(this.financingContent.reserveTokenInfo):'{}',
    ]
    console.log(JSON.stringify(params));
    try
    {
      result = await Api.publishContract(params);
    } catch (e)
    {
      return false;
    }
    console.log(result)
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.getContractData();
    return true;
  }
  /**
   * 获取项目融资部署合约的详情
   */
  @action public getContractData = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.getContractData(common.userId,common.token,project.projId);
      console.log(result)
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    if(Object.keys(result[0].data).length  === 0){
      return false
    }
    this.financingContent = result[0].data;
    this.stepOneStatus=2;
    this.stepTwoStatus=3;
    this.stepThreeStatus=3;
    // if(this.financingContent.rewardSetFlag==='5'){
    //   this.stepTwoStatus=2;
    // }
    // if(this.createContent.connectEmail){
    //   this.stepThreeStatus=2;
    // }
    return true;
  }

  @action public getRewardData = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.getRewardData(common.userId,common.token,project.projId);
      console.log(result)
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    if(Object.keys(result[0].data).length  === 0){
      return false
    }
    this.rewardContent = result[0].data;
    return true;
  }
  @action public setReward = async () =>
  {
    let result: any = [];
    let info = JSON.stringify(this.rewardContent.info);
    if(this.rewardContent.info.length){
      info = '{}'
    }
    try
    {
      result = await Api.setReward(common.userId,common.token,project.projId,this.rewardContent.connectorName,this.rewardContent.connectTel,info);
      console.log(result)
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

export default new Financing();