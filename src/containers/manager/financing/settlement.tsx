/**
 * 结算月供
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
// import { Input } from 'antd';
// import Select from '@/components/select';
import { IProjectProps } from '../interface/project.interface';

type Identity = 'admin' | 'member';
interface IState
{
    identityValue: Identity,
}

@observer
class Settlement extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        identityValue: 'admin',
    }
    public render()
    {
        if(!this.props.financing.fContractInfo){
            return null
        }
        return (
            <div className="financing-content">
                <div className="inline-title">
                    <strong>融资信息</strong>
                </div>
                <div className="content-box">
                    <div className="content-line">
                        <span className="span-left">融资代币</span>
                        <span className="span-right">{this.props.financing.fContractInfo.fundSymbol.toLocaleUpperCase()}</span>
                    </div>
                    <div className="content-line">
                        <span className="span-left">接收组织</span>
                        <span className="span-right">{this.props.financing.fContractInfo.recvAddress}</span>
                    </div>
                </div>
                <div className="title-cut">
                    <strong>项目代币</strong>
                </div>
                <div className="two-content-box">
                    <div className="content-box">
                        <div className="content-line">
                            <span className="span-left">代币名称</span>
                            <span className="span-right">{this.props.financing.fContractInfo.tokenName}</span>
                        </div>
                    </div>
                    <div className="content-box">
                        <div className="content-line">
                            <span className="span-left">代币符号</span>
                            <span className="span-right">{this.props.financing.fContractInfo.tokenSymbol}</span>
                        </div>
                    </div>
                </div>
                <div className="title-cut">
                    <strong>投资信息</strong>
                </div>
                <div className="two-content-box">
                    <div className="content-box">
                        <div className="content-line">
                            <span className="span-left">每月转入比例</span>
                            <span className="span-right">{this.props.financing.fContractInfo.faucetJA[0].percent}%</span>
                        </div>
                        <div className="content-line">
                            <span className="span-left">最大转入金额</span>
                            <span className="span-right">{this.props.financing.fContractInfo.faucetJA[0].max} {this.props.financing.fContractInfo.fundSymbol.toLocaleUpperCase()}</span>
                        </div>
                        <div className="content-line">
                            <span className="span-left">已募集资金</span>
                            <span className="span-right">{this.props.financing.fContractInfo.fundTotal} {this.props.financing.fContractInfo.fundSymbol.toLocaleUpperCase()}</span>
                        </div>
                    </div>
                    <div className="content-box">
                        <div className="content-line">
                            <span className="span-left">最小转入金额</span>
                            <span className="span-right">{this.props.financing.fContractInfo.faucetJA[0].min} {this.props.financing.fContractInfo.fundSymbol.toLocaleUpperCase()}</span>
                        </div>
                        <div className="content-line">
                            <span className="span-left">储备金比例</span>
                            <span className="span-right">{this.props.financing.fContractInfo.reserveRundRatio}%</span>
                        </div>
                        <div className="content-line">
                            <span className="span-left">代币发行储备金</span>
                            <span className="span-right">{this.props.financing.fContractInfo.fundReserveTotal} {this.props.financing.fContractInfo.fundSymbol.toLocaleUpperCase()}</span>
                        </div>
                    </div>
                </div>
                <div className="inline-btn">
                    <Button
                        text="结算月供"
                        btnSize="bg-btn"
                    />
                </div>
            </div>
        );
    }
}

export default injectIntl(Settlement);
