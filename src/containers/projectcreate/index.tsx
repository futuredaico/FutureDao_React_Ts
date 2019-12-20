/**
 * 创建项目
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import { renderRoutes } from 'react-router-config';
import { injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { History } from 'history';
import "./index.less";

interface IProps extends RouteComponentProps<{ projectId: string }>
{
    route: {
        [key: string]: any
    };
    history: History,
    intl: any,
}
interface IState
{
    showDeletProject: boolean
}

@observer
class Project extends React.Component<IProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        showDeletProject: false,
    }

    public render()
    {
        return (
            <div className="create-project-index">
                <div className="index-title"><b>创建新DAO</b></div>
                <div className="project-module" onClick={this.handleShowCreateProjectInfo}>
                    <div className="module-title"><b>新的<br />MolochoDao</b></div>
                </div>
                <div className="router-wrapper">
                    {
                        renderRoutes(this.props.route.children)
                    }
                </div>
            </div>
        );
    }

    public handleShowCreateProjectInfo = () =>
    {
        this.props.history.push("/create/moloch")
    }
}

export default injectIntl(Project);
