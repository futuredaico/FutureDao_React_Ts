import {action, observable} from 'mobx';
import * as Api from '../api/project.api'
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { IProjUpdateInfo } from '@/containers/projectinfo/futuredao/interface/update.interface';
class CreateProject {
  @observable public updateInfo:IProjUpdateInfo|null = null;
  @action public sendUpdate = async (projId:string,title:string,detail:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.sendUpdate(common.userId,common.token,projId,title,detail);
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
   * 获取更新日志详情
   */
  @action public getUpdateInfo = async (projId:string,updateId:string)=>{
    let result: any = [];
    try{
      result = await Api.getUpdateInfoById(projId,updateId,common.userId);
    }catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.updateInfo = result[0].data;
    return true;
  }
  /**
   * 修改更新日志详情
   */
  @action public modifyUpdateInfo = async (projId:string,updateId:string,title:string,detail:string)=>{
    let result: any = [];
    try{
      result = await Api.modifyUpdate(common.userId,common.token,projId,updateId,title,detail);
    }catch (e)
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