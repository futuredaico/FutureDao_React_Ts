import { observable, action } from 'mobx';
import common from '@/store/common';
import project from './project.store';
// import * as Api from '../api/project.api'
import { IFinancingContent } from '../interface/financing.interface';
// import { CodeType } from '@/store/interface/common.interface';
class Financing {
  @observable public step: number = 1; // 融资管理的菜单选择
  @observable public stepOneStatus: number = 1;// 部署合约完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepTwoStatus: number = 0; // 设置回报完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepThreeStatus: number = 0; // 融资信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public financingContent: IFinancingContent = {
    financingType: 'daico',
    blockType: 'eth',
    assetType: 'eth',
    managerAddr: '',
    assetName: '',
    assetSimpleName: '',
    isSaveAsset: '1',
    saveAsset: {
      address: '',
      info: [{
        amt: undefined,
        days: undefined
      }]
    }
  }
  @action public financingProject = async () => {
    // let result: any = [];
    const params: string[] = [
      common.userId,
      common.token,
      project.projId,
      this.financingContent.financingType,
      this.financingContent.blockType,
      this.financingContent.assetType,
      this.financingContent.managerAddr,
      this.financingContent.assetName,
      this.financingContent.assetSimpleName,
      this.financingContent.isSaveAsset,
      this.financingContent.saveAsset.toString(),
    ]
    console.log(params);
    // try
    // {
    //   result = await Api.publishContract(params);
    // } catch (e)
    // {
    //   return false;
    // }
    // if (result[0].resultCode !== CodeType.success)
    // {
    //   return false
    // }

    return true;
  }
}

export default new Financing();