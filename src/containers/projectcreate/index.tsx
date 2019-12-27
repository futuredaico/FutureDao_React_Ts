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
                <div className="index-title"><b>创建新DAO</b></div>
                {
                    this.props.createproject.createStatus === 0 &&
                    <div className="router-wrapper">
                        {
                            renderRoutes(this.props.route.children)
                        }
                    </div>
                }
                {
                    this.props.createproject.createStatus > 0 &&

                    <div className="going-on-wrapper">
                        <div className="going-on-content going-on-edit">
                            <strong className="going-bigtext">正在发布DAO合约</strong>
                            {
                                (this.props.createproject.createStatus === 1) && (
                                    <>
                                        <div className="loading-going">
                                            <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} />} size="small" />
                                            <span>请等待...</span>
                                        </div>
                                        <p className="going-p">处理这些事物可能需要较长时间，取决于网络状态处理期间请勿关闭本页</p>
                                    </>
                                )
                            }
                            {
                                (this.props.createproject.createStatus === 2) && (
                                    <>
                                        <div className="done-going">
                                            <img src={require("@/img/done.png")} alt="" />
                                            <span>成功！</span>
                                        </div>
                                        <div className="goon-btn">
                                            <Button text="继续" btnSize="md-bg-btn" onClick={this.handleGoOn} />
                                        </div>
                                    </>
                                )
                            }
                            {
                                (this.props.createproject.createStatus === 3) && (
                                    <>
                                        <div className="done-going">
                                            <img src={require("@/img/done.png")} alt="" />
                                            <span>失败！</span>
                                        </div>
                                        <div className="goon-btn">
                                            <Button text="继续" btnSize="md-bg-btn" onClick={this.handleGoOn} />
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

    private handleGoOn = () => {
        this.props.createproject.createStatus = 0;
    }

}

export default injectIntl(Project);
