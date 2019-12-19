import { observable, action } from 'mobx';
import * as Api from '../api/moloch.api';
import common from '@/store/common';
import MetamasktTool from '@/utils/metamasktool';
import { CodeType } from '@/store/interface/common.interface';
import { IMolochProposalList, IMolochProposalDetail } from '../interface/molochmanager.interface';

class IMolochManager {
  @observable public proposalMenuNum: number = 1; // 菜单切换 1为正式提案，2为预发布提案
  @observable public proposalPage: number = 1;
  @observable public proposalPageSize: number = 10;
  @observable public proposalList: IMolochProposalList[] = []; // 提案列表
  @observable public proposalCount: number = 0; // 提案总数
  @observable public proposalInfo: IMolochProposalDetail | null = null; // 提案详情
  @observable public proposalIndex: string = ""; // 提案索引
  @observable public proposalBalance:number = 0; // 项目占股数量
  @observable public proposalAddress:string = ''; // 委托人

  /**
   * 获取提案列表
   */
  @action public getMolochProposalList = async (projId: string) => {
    let result: any = [];
    const addr = common.userInfo ? common.userInfo.address : ''
    try {
      result = await Api.getProposalList(projId, this.proposalPage, this.proposalPageSize, addr);
    } catch (e) {
      return false;
    }
    if (result[0].resultCode !== CodeType.success) {
      return false
    }
    this.proposalCount = result[0].data.count || 0;
    this.proposalList = result[0].data.list || []
    return true;
  }

  /**
   * 获取提案详情
   */
  @action public getMolochProposalDetail = async (projId: string) => {
    let result: any = [];
    try {
      result = await Api.getProposalDetail(projId, this.proposalIndex);
    } catch (e) {
      return false;
    }
    if (result[0].resultCode !== CodeType.success) {
      return false
    }
    this.proposalInfo = result[0].data || null;
    if (this.proposalInfo) {
      this.proposalInfo.proposalDetail = this.proposalInfo.proposalDetail.replace(/\\n/gi, "<br/>");
    }

    return true;
  }
  /**
   * 获取委托人，股份数量
   */
  @action public getTokenBalance = async (projId:string,addr:string)=>{
    let result: any = [];
    try {
      result = await Api.getTokenBalance(projId,addr);
    } catch (e) {
      return false;
    }
    if (result[0].resultCode !== CodeType.success) {
      return false
    }
    this.proposalBalance = result[0].data.balance||0;
    this.proposalAddress = result[0].data.newDelegateKey||''

    return true;
  }
  /**
   * 权限委托
   */
  @action public changeDelegateKey = async (addr:string,myaddr:string)=>{
    // moloch：0x2df40cccfb741e6bca684544821aaaccef217e46
    // usdt:0x38e5ccf55d19e54e8c4fbf55ff81462727ccf4e7
    const contractHash = '0x2df40cccfb741e6bca684544821aaaccef217e46';
    try {
      await MetamasktTool.contractSend( contractHash, 'updateDelegateKey', [addr],{from:myaddr})
    } catch (e) {
      return false;
    }
    return true
  }
}

export default new IMolochManager();