import {observable} from 'mobx'
class ProjectInfo {
  @observable public menuNum = 1;
  @observable public isShowUpdateInfo = false;
}

export default new ProjectInfo();