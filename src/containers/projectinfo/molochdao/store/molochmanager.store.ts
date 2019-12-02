import { observable,  } from 'mobx';
// import * as Api from './api/project.api';
// import common from '@/store/common';
// import { CodeType } from '@/store/interface/common.interface';

class IMolochManager
{
  @observable public proposalMenuNum:number = 1; // 菜单切换 1为正式提案，2为预发布提案
  
}

export default new IMolochManager();