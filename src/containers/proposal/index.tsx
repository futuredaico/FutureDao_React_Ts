/**
 * 发布提案
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
// import Button from '@/components/Button';
// import classnames from 'classnames';
import { History } from 'history';
// import { getQueryString } from '@/utils/function'
// import Editor from '@/components/braftEditor';
// import BraftEditor from 'braft-editor';
// import Select from '@/components/select';
interface IProps extends RouteComponentProps<{ projectId: string }>
{
    route: {
        [key: string]: any
    };
    history: History,
    intl: any
}

@inject('project', 'createproject', 'common')
@observer
class ProjectProposal extends React.Component<IProps, any> {
    public receiveOption = [
        {
            id:"1",
            name:'Issued by day'
        },
        {
            id:"2",
            name:'One-off'
        }
    ]
    public componentDidMount()
    {
        // const projectId =this.props.match.params['projectId'];
    }
    public render()
    {
        return (
            <div className="proposal-page">
                <div className="proposal-top">
                    <h2>发布提案</h2>
                </div>
                <div className="proposal-content">
                    <div className="proposal-title">
                        <h3>提案名称</h3>
                    </div>
                    
                   
                </div>
            </div>
        );
    }

}

export default injectIntl(ProjectProposal);
