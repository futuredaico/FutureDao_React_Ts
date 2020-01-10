/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { renderRoutes } from 'react-router-config';
import { injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { History } from 'history';
import "./index.less";
import { ICreateProjectStore } from './interface/createproject.interface';
import { Spin, Icon } from 'antd';
import Button from '@/components/Button';

interface IProps extends RouteComponentProps<{ projectId: string }> {
    route: {
        [ key: string ]: any
    };
    history: History,
    intl: any,
    createproject: ICreateProjectStore
}
interface IState {
    showDeletProject: boolean
}

@inject('createproject')
@observer
class Project extends React.Component<IProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        showDeletProject: false,
    }

    public render() {
        return (
            <div className="create-project-index">
                <div className="index-title"><b>{this.intrl.create.bigtitle}</b></div>
                <div className="router-wrapper" hidden={this.props.createproject.createStatus !== 0}>
                    {
                        renderRoutes(this.props.route.children)
                    }
                </div>
                {
                    this.props.createproject.createStatus > 0 &&

                    <div className="going-on-wrapper">
                        <div className="going-on-content going-on-edit">
                            <strong className="going-bigtext">{this.intrl.create.doingtips}</strong>
                            {
                                (this.props.createproject.createStatus === 1) && (
                                    <>
                                        <div className="loading-going">
                                            <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} />} size="small" />
                                            <span>{this.intrl.create.waiting}</span>
                                        </div>
                                        <p className="going-p">{this.intrl.create.tips2}</p>
                                        <p className="going-p">{this.intrl.create.tips3}</p>
                                    </>
                                )
                            }
                            {
                                (this.props.createproject.createStatus === 2) && (
                                    <>
                                        <div className="done-going">
                                            <img src={require("@/img/done.png")} width={14} alt="" />
                                            <span>{this.intrl.create.success}</span>
                                        </div>
                                        <div className="goon-btn">
                                            <Button text={this.intrl.btn.continue} btnSize="md-bg-btn" onClick={this.handleGoIndex} />
                                        </div>
                                    </>
                                )
                            }
                            {
                                (this.props.createproject.createStatus === 3) && (
                                    <>
                                        <div className="done-going">
                                            <img src={require("@/img/close.png")} alt="" width={18} />
                                            <span>{this.intrl.create.fail}</span>
                                        </div>
                                        <div className="goon-btn">
                                            <Button text={this.intrl.btn.again} btnSize="md-bg-btn" onClick={this.handleGoRetry} />
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    </div>
                }
            </div>
        );
    }

    // 项目创建失败，显示创建页面，保留数据
    private handleGoRetry = () => {
        this.props.createproject.createStatus = 0;
    }

    // 项目创建成功跳转到对应的项目详情页
    private handleGoIndex = () => {
        // if (process.env.REACT_APP_SERVER_ENV === 'DEV') {
        //     this.props.history.push('/test/molochinfo/' + this.props.createproject.projectID);
        // } else {
        //     this.props.history.push('/molochinfo/' + this.props.createproject.projectID);
        // }
        this.props.createproject.createStatus = 0;
        this.props.history.push('/molochinfo/' + this.props.createproject.projectID);
    }

}

export default injectIntl(Project);
