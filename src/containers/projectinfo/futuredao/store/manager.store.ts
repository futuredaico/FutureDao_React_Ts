import { observable,  } from 'mobx';
// import * as Api from '../api/project.api';
// import common from '@/store/common';
// import { CodeType } from '@/store/interface/common.interface';

class IProjectManager
{
  @observable public menuNum = 1; // 菜单切换 1为项目详情，2为留言，3为更新日志，4为交易，5为治理
  
}

export default new IProjectManager();