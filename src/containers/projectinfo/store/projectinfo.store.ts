import {observable, action} from 'mobx';
import * as Api from '../api/project.api';
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { IProjectInfo, IProjectUpdate, IProjectTeam } from '../interface/projectinfo.interface';
class ProjectInfo {
  @observable public menuNum = 1;
  @observable public isShowUpdateInfo = false;
  @observable public projInfo:IProjectInfo|null = null;
  @observable public projId:string = '';
  @observable public projUpdateCount:number = 0;
  @observable public projUpdateList:IProjectUpdate[] = [];
  @observable public projTeamList:IProjectTeam[] = [];
  @observable public updateInfo:IProjectUpdate|null = null;
  /**
   * 获取项目基本详情
   */
  @action public getProjInfo = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getProjInfo(projId,common.userId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.projInfo = result[0].data;
    console.log(this.projInfo)
    return true;
  }
  /**
   * 添加关注
   */
  @action public startAttention = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.startAttention(common.userId,common.token,this.projId);
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
   * 取消关注 
   */
  @action public cancelAttention = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.cancelAttention(common.userId,common.token,this.projId);
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
   * 看好
   */
  @action public startSupport = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.startSupport(common.userId,common.token,this.projId);
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
   * 获取更新日志
   */
  @action public getUpdateData = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.getUpdateList(this.projId,1,100);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.projUpdateCount = result[0].data.count;
    this.projUpdateList = result[0].data.list;
    return true;
  }
  /**
   * 获取团队信息
   */
  @action public getTeamData = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.getTeamList(this.projId,1,100);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.projTeamList = result[0].data.list;
    return true;
  }
}

export default new ProjectInfo();