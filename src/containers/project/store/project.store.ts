import {observable, action} from 'mobx';
import * as Api from '../api/project.api';
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
class CreateProject {
  @observable public menuNum = 1;
  @observable public projId = '';
  @observable public updateId = '';

  /**
   * 删除项目
   */
  @action public deleteMember = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.deleteProject(common.userId,common.token,projId);
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