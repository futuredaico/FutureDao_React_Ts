/**
 * 创建项目
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { History } from 'history';

interface IProps extends RouteComponentProps<{ projectId: string }> {
    route: {
        [key: string]: any
    };
    history: History,
    intl: any
}
interface IState {
    showDeletProject: boolean
}

@observer
class Project extends React.Component<IProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        showDeletProject: false,
    }

    public render() {
        return (
            
            <div>收到罚单</div>
        );
    }
}

export default injectIntl(Project);
