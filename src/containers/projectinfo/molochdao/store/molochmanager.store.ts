import { observable, action } from 'mobx';
import * as Api from '../api/moloch.api';
import common from '@/store/common';
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
      // console.log(toJS(this.proposalInfo).proposalDetail.replace(/\\n/gi, "---"), this.proposalInfo.proposalDetail.replace(/\\n/gi, "---"))
    }

    return true;
  }
}

export default new IMolochManager();