import {observable, action} from 'mobx';
import * as Api from '../api/project.api';
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { IProjectInfo } from '../interface/projectinfo.interface';
class ProjectInfo {
  @observable public menuNum = 1;
  @observable public isShowUpdateInfo = false;
  @observable public projInfo:IProjectInfo|null = null;
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
}

export default new ProjectInfo();