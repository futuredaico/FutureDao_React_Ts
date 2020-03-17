import {observable, action} from 'mobx';
import * as Api from '../api/project.api';
import { CodeType } from '@/store/interface/common.interface';
class CreateProject {
  @observable public menuNum = 1;
  @observable public projId = '';
  @observable public updateId = '';
  @observable public isEdit:boolean = false; // true为编辑状态，false为创建状态

  /**
   * 删除项目
   */
  @action public deleteMember = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.deleteProject(projId);
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