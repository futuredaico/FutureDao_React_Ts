import { observable, action, computed } from 'mobx';
import common from '@/store/common';
import project from './project.store';
import * as Api from '../api/project.api'
import { IFinancingContent, IRewardContent, IRewardInfo } from '../interface/financing.interface';
import { CodeType } from '@/store/interface/common.interface';
class Financing {
  @observable public step: number = 1; // 融资管理的菜单选择
  @observable public stepOneStatus: number = 1;// 部署合约完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepTwoStatus: number = 0; // 设置回报完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepThreeStatus: number = 0; // 融资信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public timer: NodeJS.Timer | null = null;
  @observable public financingContent: IFinancingContent = {
    projId: '',
    type: 'daico',
    platform: 'eth',
    tokenName: '',
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
    deployContractFlag: '3',
    rewardSetFlag: '3',
    ratioSetFlag: '3',
    financeStartFlag: '3'
  }
  @observable public rewardContent: IRewardContent = {
    connectorName: '',
    connectTel: '',
    info: [
      {
        rewardId: '',
        rewardName: '',
        rewardDesc: '',
        price: '',
        limitFlag: '',
        limitMax: '',
        distributeTimeFlag: '',
        distributeTimeFixYes: '',
        distributeTimeFixNot: '',
        distributeWay: '',
        note: '',
        giftTokenName: '',
        hasSellCount: 0
      }
    ]
  }
  @observable public poolTotal:number = 20; // 已融资金
  @observable public ratio:string = '0'; // 储备金比例
  @computed get totalAmt() {
    const result = this.financingContent.reserveTokenInfo.info.map(v => v.amt).reduce((v1: number, v2: number) => (v1 + v2))
    return result || 0;
  }
  @computed get totalDays() {
    const result = this.financingContent.reserveTokenInfo.info.map(v => v.days).reduce((v1: number, v2: number) => (v1 + v2))
    return result || 0;
  }
  /**
   * 部署合约
   */
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
      this.financingContent.reserveTokenFlag === '1' ? JSON.stringify(this.financingContent.reserveTokenInfo) : '{}',
    ]
    console.log(JSON.stringify(params));
    try {
      result = await Api.publishContract(params);
    } catch (e) {
      return false;
    }
    if (result[0].resultCode !== CodeType.success) {
      return false
    }
    return true;
  }
  /**
   * 获取项目融资部署合约的详情
   */
  @action public getContractData = async () => {
    let result: any = [];

    try {
      result = await Api.getContractData(common.userId, common.token, project.projId);
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
    this.financingContent = result[0].data;
    // 3为可编辑状态,2为编辑已保存状态，0为不可编辑状态
    this.stepOneStatus = 2;
    this.stepTwoStatus = 3;
    this.stepThreeStatus = 3;
    if(this.financingContent.rewardSetFlag==='5'){
      this.stepTwoStatus=2;
    }
    if(this.financingContent.ratioSetFlag==='5'){
      this.stepThreeStatus=2;
    }
    return true;
  }
  /**
   * 查询回报信息
   */
  @action public getRewardData = async () => {
    let result: any = [];

    try {
      result = await Api.getRewardData(common.userId, common.token, project.projId);
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
    this.rewardContent.info.map((item:IRewardInfo)=>{
      item.price = parseFloat(item.price).toString();
    })
    const info = {
      info: this.rewardContent.info
    }
    const infoStr = JSON.stringify(info)
    console.log(infoStr)
    try {
      result = await Api.setReward(common.userId, common.token, project.projId, this.rewardContent.connectorName, this.rewardContent.connectTel, infoStr);
      console.log(result)
    } catch (e) {
      return false;
    }
    if (result[0].resultCode !== CodeType.success) {
      return false
    }
    return true;
  }
  /**
   * 查询已融资金
   */
  @action public getFinanceFund = async () => {
    let result: any = [];

    try {
      result = await Api.getFinanceFund(common.userId, common.token, project.projId);
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
    this.poolTotal = result[0].data.poolTotal;
    return true;
  }
  /**
   * 查询储备金比例
   */
  @action public getReserveFund = async () => {
    let result: any = [];

    try {
      result = await Api.getReserveFund(common.userId, common.token, project.projId);
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
    this.ratio = result[0].data.ratio;
    return true;
  }
  /**
   * 设置并修改储备金比例
   */
  @action public saveReserveFundRatio = async (ratio:string) => {
    let result: any = [];

    try {
      result = await Api.saveReserveFundRatio(common.userId, common.token, project.projId,ratio);
      console.log(result)
    } catch (e) {
      return false;
    }
    if (result[0].resultCode !== CodeType.success) {
      return false
    }
    
    return true;
  }
  /**
   * 启动融资
   */
  @action public startFanance = async () => {
    let result: any = [];
    try {
      result = await Api.startFinance(common.userId, common.token, project.projId);
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