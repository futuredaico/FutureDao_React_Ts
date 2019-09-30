import { observable } from 'mobx'
import { IFinancingContent } from '../interface/financing.interface';
class Financing
{
  @observable public step:number = 1; // 融资管理的菜单选择
  @observable public stepOneStatus:number = 1;// 部署合约完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepTwoStatus:number = 0; // 设置回报完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepThreeStatus:number = 0; // 融资信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public financingContent:IFinancingContent = {
    financingType:'daico',
    blockType:"",
    assetType:'',
    managerAddr:'',
    assetName:'',
    assetSimpleName:'',
    isSaveAsset:'1',
    saveAsset:[]
  }
}

export default new Financing();