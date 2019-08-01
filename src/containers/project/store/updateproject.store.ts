import {action} from 'mobx';
import * as Api from '../api/project.api'
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
class CreateProject {
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
}

export default new CreateProject();