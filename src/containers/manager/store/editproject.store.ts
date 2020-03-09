import { observable, action } from 'mobx'
import * as Api from '../api/project.api'
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { Web3Contract } from '@/utils/web3Contract';
import { AbiItem } from "web3-utils";
import metamaskwallet from '@/store/metamaskwallet';
import Moloch from '@/utils/Moloch';
import { IEditContent, IMemberList, ITeamList } from '../interface/editproject.interface';
class EditProject {
  @observable public editContent: IEditContent = {
    projId: '',
    projName: '',
    projTitle: '',
    projType: '',
    projConverUrl: '',
    projBrief: '',
    projVideoUrl: '',
    projDetail: '',
    connectEmail: '',
    officialWeb: '',
    community: '',
    projState: 'reading',
    projSubState: 'init',
    role: ''
  }
  @observable public searchList: IMemberList[] = []; // 查询成员列表
  @observable public teamList: ITeamList[] = []; // 项目成员列表
  /**
   * 编辑项目信息
   */
  @action public modifyProject = async () => {
    // let result: any = [];
    // const params: string[] = [
    //   common.userId,
    //   common.token,
    //   this.editContent.projName,
    //   this.editContent.projTitle,
    //   this.editContent.projType,
    //   this.editContent.projConverUrl,
    //   this.editContent.projBrief,
    // ]
    try {
      const abi = Moloch.abi as AbiItem[];
      const bytecode = Moloch.bytecode;
      const summoner = metamaskwallet.metamaskAddress;
      const approvedToken = common.token;
      const periodDuration = 120;
      const votingPeriodLength = 5;
      const gracePeriodLength = 5;
      const abortWindow = 2;
      const proposalDeposit = 1000000000;
      const dilutionBound = 3;
      const processingReward = 10000;
      const newContractInstance = await Web3Contract.deployContract(
        abi, bytecode, metamaskwallet.metamaskAddress,
        summoner,
        approvedToken,
        periodDuration,
        votingPeriodLength,
        gracePeriodLength,
        abortWindow,
        proposalDeposit,
        dilutionBound,
        dilutionBound,
        processingReward
      );
      console.log(newContractInstance);

      // result = await Api.createProj(params);
    } catch (e) {
      return false;
    }
    // if (result[ 0 ].resultCode !== CodeType.success) {
    //   return false
    // }
    // this.editContent.projId = result[ 0 ].data.projId
    return true;
  }
  /**
   * 修改项目
   */
  // @action public modifyProject = async (params: string[]) =>
  // {
  //   let result: any = [];

  //   try
  //   {
  //     result = await Api.modifyProj(params);
  //   } catch (e)
  //   {
  //     return false;
  //   }
  //   if (result[0].resultCode !== CodeType.success)
  //   {
  //     return false
  //   }
  //   this.getProject(this.editContent.projId);
  //   return true;
  // }
  /**
   * 获取项目信息
   */
  @action public getProject = async (projId: string) => {
    let result: any = [];

    try {
      result = await Api.getProj(common.userId, common.token, projId);
    } catch (e) {
      return false;
    }
    if (result[ 0 ].resultCode !== CodeType.success) {
      return false
    }
    this.editContent = result[ 0 ].data;
    return true;
  }
  /**
   * 获取成员列表
   */
  @action public getTeamList = async () => {
    let result: any = [];

    try {
      result = await Api.getMember(common.userId, common.token, this.editContent.projId, 1, 10);
    } catch (e) {
      return false;
    }
    if (result[ 0 ].resultCode !== CodeType.success) {
      return false
    }
    this.teamList = result[ 0 ].data.list;
    return true;
  }
  /**
   * 查询成员
   */
  @action public searchMemberList = async (memberEmail: string) => {
    let result: any = [];

    try {
      result = await Api.searchMember(common.userId, common.token, memberEmail, 1, 10);
    } catch (e) {
      return false;
    }
    if (result[ 0 ].resultCode !== CodeType.success) {
      return false
    }
    this.searchList = result[ 0 ].data.list;
    return true;
  }
  /**
   * 邀请成员
   */
  @action public inviteMember = async (memberId: string) => {
    let result: any = [];

    try {
      result = await Api.inviteMember(common.userId, common.token, memberId, this.editContent.projId);
    } catch (e) {
      return false;
    }
    if (result[ 0 ].resultCode !== CodeType.success) {
      return false
    }
    return true;
  }
  /**
   * 删除成员
   */
  @action public deleteMember = async (memberId: string) => {
    let result: any = [];
    try {
      result = await Api.deleteMember(common.userId, common.token, this.editContent.projId, memberId);
    } catch (e) {
      return false;
    }
    if (result[ 0 ].resultCode !== CodeType.success) {
      return false
    }
    return true;
  }
}

export default new EditProject();