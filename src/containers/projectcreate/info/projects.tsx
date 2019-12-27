/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { ICreateProjectProps } from '../interface/createproject.interface';
interface IState {
    isEdit: boolean
}

@inject('createproject', 'common', 'project')
@observer
class CreateProject extends React.Component<ICreateProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public render() {
        return (
            <div className="project-module" onClick={this.handleShowCreateProjectInfo}>
                <div className="module-title"><b>新的<br />MolochoDao</b></div>
            </div>
        );
    }
    public handleShowCreateProjectInfo = () => {
        this.props.history.push("/create/moloch")
    }
}

export default injectIntl(CreateProject);