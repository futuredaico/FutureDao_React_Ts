/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { ICreateProjectProps } from '../interface/createproject.interface';
interface IState
{
    isEdit: boolean
}

@inject('createproject', 'common')
@observer
class CreateProject extends React.Component<ICreateProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public render()
    {
        return (
            <>
                <div className="project-module" onClick={this.handleShowCreateProjectInfo}>
                    <div className="module-title"><b>{this.intrl.create.new}<br />MolochoDao</b></div>
                </div>
                <div className="project-module" onClick={this.handleShowCreateFutureDao}>
                    <div className="module-title"><b>{this.intrl.create.new}<br />FutureDao</b></div>
                </div>
            </>
        );
    }
    public handleShowCreateProjectInfo = () =>
    {
        this.props.history.push("/create/moloch")
    }
    public handleShowCreateFutureDao = () => {
        this.props.history.push("/create/future")
    }
}

export default injectIntl(CreateProject);