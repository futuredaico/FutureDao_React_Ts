import { observable,action } from 'mobx';
import * as Api from '../api/updateinfo.api';
import { CodeType } from '@/store/interface/common.interface';
import { IMolochInfo } from '@/containers/projectinfo/molochdao/interface/molochinfo.interface';

class MolochUpdateInfo  {
  @observable public projInfo: IMolochInfo | null = null; // 项目详情
  /**
   * 保存修改详情内容
   */
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
  /**
   * 获取项目基本详情
   */
  @action public getMolochProjInfo = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getMolochProjInfo(projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.projInfo = result[0].data || null;
    return true;
  }
}

export default new MolochUpdateInfo();