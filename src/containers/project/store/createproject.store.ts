import {observable} from 'mobx'
class CreateProject {
  @observable public step = 1;
}

export default new CreateProject();