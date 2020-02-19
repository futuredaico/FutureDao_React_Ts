import { action } from 'mobx';
import * as Api from '../api/updateinfo.api';
import { CodeType } from '@/store/interface/common.interface';

class MolochUpdateInfo  {

  @action public saveUpdateProject = async (projId: string,des:string,detail:string,imgUrl:string,website:string) => {
    let result: any = [];

    try {
      result = await Api.modifyProjInfo(projId,des,detail,imgUrl,website);
    } catch (e) {
      return false;
    }
    if (result[0].resultCode !== CodeType.success) {
      return false
    }
    return true;
  }
}

export default new MolochUpdateInfo();