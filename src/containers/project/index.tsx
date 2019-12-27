/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { History } from 'history';
import "./index.less";
import { ICommonStore } from '@/store/interface/common.interface';
import { ICreateProjectStore } from './molochdao/interface/createproject.interface';

interface IProps extends RouteComponentProps<{ projectId: string }> {
    route: {
        [ key: string ]: any
    };
    history: History,
    intl: any,
    common: ICommonStore,
    createproject: ICreateProjectStore,
}
interface IState {
    showDeletProject: boolean
}

@inject('common', 'createproject')
@observer
class Project extends React.Component<IProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        showDeletProject: false,
    }

    public render() {
        return (
            <div className="create-project-index">
                <div className="index-title"><b>创建新DAO</b></div>
                <div className="project-module" onClick={this.handleShowCreateProjectInfo}>
                    <div className="module-title"><b>新的<br />MolochoDao</b></div>
                </div>
            </div>
        );
    }

    public handleShowCreateProjectInfo = () => {
        this.props.createproject.createProject();
    }
}

export default injectIntl(Project);
