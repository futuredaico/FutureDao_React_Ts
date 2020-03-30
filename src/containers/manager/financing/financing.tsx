/**
 * 融资管理
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IProjectProps } from '../interface/project.interface';
import StartFinancing from './start';
import Settlement from './settlement';
import { Spin, Icon } from 'antd';
import Button from '@/components/Button';

@inject('project', 'financing', 'common', 'metamaskwallet')
@observer
class FinancingManager extends React.Component<IProjectProps> {
    public intrl = this.props.intl.messages;
    public componentWillUnmount()
    {
        this.props.financing.contractList = [
            {
                id: '1',
                name: '其他',
                projId: ''
            }
        ];
        this.props.financing.molochId = '';
        this.props.financing.assetList = null;
        this.props.financing.assetOption = [];
        //         @observable public isStartContract: boolean = false;
    }
    public render()
    {

        return (
            <div className="financing-page">
                <div className="big-title"><strong>融资管理</strong></div>
                {
                    this.props.financing.isStartContract ? <Settlement {...this.props} /> : <StartFinancing {...this.props} />
                }
                {/* <StartFinancing {...this.props} /> */}
                {/* <Settlement {...this.props} /> */}
                {
                    this.props.financing.startStatus > 0 &&
                    <div className="going-on-wrapper">
                        <div className="going-on-content going-on-edit">
                            <strong className="going-bigtext">正在部署配置融资合约</strong>
                            {/* 正在部署合约 */}
                            {
                                (this.props.financing.startStatus === 1) && (
                                    <>
                                        <div className="loading-going">
                                            <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} />} size="small" />
                                            <span>执行交易 {this.props.financing.tradeStep}/{this.props.financing.tradeTotal}</span>
                                        </div>
                                        <p className="going-p">{this.intrl.create.tips2}</p>
                                        <p className="going-p">处理期间请勿刷新或关闭本页</p>
                                    </>
                                )
                            }
                            {/* 合约部署成功 */}
                            {
                                (this.props.financing.startStatus === 2) && (
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
                                (this.props.financing.startStatus === 3) && (
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
    private handleGoRetry = () =>
    {
        this.props.financing.startStatus = 0;
    }

    // 项目创建成功跳转到对应的项目详情页
    private handleGoIndex = () =>
    {
        this.props.financing.isStartContract = true;
        this.props.financing.startStatus = 0;
    }
}

export default injectIntl(FinancingManager);
