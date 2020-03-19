import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import { CodeType } from '@/store/interface/common.interface';
import { ITeamList, IEditProjectInfo } from '../interface/editproject.interface';
class EditProject
{
  @observable public editContent: IEditProjectInfo = {
    projId: '', // 项目ID
    projName: '',     // 项目名称
    projTitle: '',    // 项目标题  
    projBrief: '',    // 项目简介
    officialWeb: '',  // 官网
    projCoverUrl: '', // 项目封面
    projVideoUrl: '',// 视频介绍
    projDetail: '',   // 项目详情
    role: '',
    startFinanceFlag: 0
  }
  // @observable public searchList: IMemberList[] = []; // 查询成员列表
  @observable public teamList: ITeamList[] = []; // 项目成员列表
  @observable public teamCount:number = 0;
  @observable public teamPage:number = 1;
  @observable public teamPageSize:number = 15;
  /**
   * 修改项目
   */
  @action public modifyProject = async () =>
  {
    let result: any = [];
    const params = [
      this.editContent.projId,
      this.editContent.projBrief,
      this.editContent.officialWeb,
      this.editContent.projCoverUrl,
      this.editContent.projVideoUrl,
      this.editContent.projDetail
    ]
    try
    {
      result = await Api.modifyProj(params);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.getProject(this.editContent.projId);
    return true;
  }
  /**
   * 获取项目信息
   */
  @action public getProject = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getProj(projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.editContent = result[0].data;
    return true;
  }
  /**
   * 获取成员列表
   */
  @action public getTeamList = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getMember(projId, this.teamPage, this.teamPageSize);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.teamCount = result[0].data.count;
    this.teamList = result[0].data.list;
    return true;
  }
  /**
   * 邀请成员
   */
  @action public inviteMember = async (address: string, type: string,projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.inviteMember(address, type, projId);
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
  @action public deleteMember = async (address: string,projId:string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.deleteMember(address, projId);
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

export default new EditProject();