import { observable, action } from 'mobx'
import { ICreateContent, IMemberList, ITeamList } from '../interface/createproject.interface';
import * as Api from '../api/project.api'
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
class CreateProject
{
  @observable public step = 1; // 编辑项目的菜单选择
  @observable public stepOneStatus = 1;// 基础信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepTwoStatus = 0; // 详细信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepThreeStatus = 0; // 详细信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public createContent: ICreateContent = {
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
    projState:'reading',
    projSubState:'init',
    role:''
  }
  @observable public searchList:IMemberList[] = []; // 查询成员列表
  @observable public teamList:ITeamList[] = []; // 项目成员列表
  /**
   * 创建项目
   */
  @action public createProject = async () =>
  {
    let result: any = [];
    const params: string[] = [
      common.userId,
      common.token,
      this.createContent.projName,
      this.createContent.projTitle,
      this.createContent.projType,
      this.createContent.projConverUrl,
      this.createContent.projBrief,
    ]
    try
    {
      result = await Api.createProj(params);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.createContent.projId = result[0].data.projId
    return true;
  }
  /**
   * 修改基础信息
   */
  @action public modifyStepOne = async (params: string[]) =>
  {
    let result: any = [];

    try
    {
      result = await Api.modifyProjName(params);
    } catch (e)
    {
      return false;
    }
    console.log(result)
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.getProject(this.createContent.projId);
    return true;
  }
  /**
   * 修改详情模块
   */
  @action public modifyStepTwo = async (params: string[]) =>
  {
    let result: any = [];

    try
    {
      result = await Api.modifyProjVideo(params);
    } catch (e)
    {
      return false;
    }
    console.log(result)
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.getProject(this.createContent.projId);
    return true;
  }
  /**
   * 修改团队模块
   */
  @action public modifyStepThree = async (params: string[]) =>
  {
    let result: any = [];

    try
    {
      result = await Api.modifyProjEmail(params);
    } catch (e)
    {
      return false;
    }
    console.log(result)
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.getProject(this.createContent.projId);
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
  //   console.log(result)
  //   if (result[0].resultCode !== CodeType.success)
  //   {
  //     return false
  //   }
  //   this.getProject(this.createContent.projId);
  //   return true;
  // }
  /**
   * 获取项目信息
   */
  @action public getProject = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getProj(common.userId,common.token,projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.createContent = result[0].data;
    this.stepOneStatus=2;
    this.stepTwoStatus=3;
    this.stepThreeStatus=3;
    if(this.createContent.projDetail){
      this.stepTwoStatus=2;
    }
    if(this.createContent.connectEmail){
      this.stepThreeStatus=2;
    }
    return true;
  }
  /**
   * 获取成员列表
   */
  @action public getTeamList = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.getMember(common.userId,common.token,this.createContent.projId,1,10);
    } catch (e)
    {
      return false;
    }
    console.log(result)
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.teamList = result[0].data.list;
    return true;
  }
  /**
   * 查询成员
   */
  @action public searchMemberList = async (memberEmail:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.searchMember(common.userId,common.token,memberEmail,1,10);
    } catch (e)
    {
      return false;
    }
    console.log(result)
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.searchList = result[0].data.list;
    return true;
  }
  /**
   * 邀请成员
   */
  @action public inviteMember = async (memberId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.inviteMember(common.userId,common.token,memberId,this.createContent.projId);
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
  /**
   * 删除成员
   */
  @action public deleteMember = async (memberId:string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.deleteMember(common.userId,common.token,this.createContent.projId,memberId);
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

  @action public commitProjectAudit = async ()=>{
    let result: any = [];

    try
    {
      result = await Api.commitProject(common.userId,common.token,this.createContent.projId);
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

export default new CreateProject();