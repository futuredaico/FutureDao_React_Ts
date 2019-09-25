import { observable } from 'mobx'
class Financing
{
  @observable public step = 1; // 融资管理的菜单选择
  @observable public stepOneStatus = 1;// 部署合约完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepTwoStatus = 0; // 设置回报完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepThreeStatus = 0; // 融资信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  
}

export default new Financing();