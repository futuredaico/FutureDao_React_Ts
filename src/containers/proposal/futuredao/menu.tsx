/**
 * 发布提案的类型选择
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { IFutureProposalProps } from './interface/future.interface';

interface IState
{
    projId: string // 项目ID
}
@inject('future')
@observer
class FutureProposalMenu extends React.Component<IFutureProposalProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        projId: ''
    }
    public componentDidMount()
    {

        const projectId = this.props.match.params['projectId'];
        console.log(projectId)
        this.props.future.getFContractInfoData(projectId);
        this.setState({
            projId: projectId || ''
        })
    }
    public render()
    {
        if(!this.props.future.fContractInfo){
            return null
        }
        return (
            <>
                <div className="proposal-top">
                    <h2>选择要发布的提案类型</h2>
                </div>
                <div className="proposal-graytips">
                    发起提案需要支付0.01ETH的结算费用和0.1ETH的押金。结算费用将支付给提案结算人，押金将在提案结束后返还。
                </div>
                <div className="proposal-content">
                    <Link to={"/fproposal/month/" + this.state.projId} className="type-box-wrapper">
                        <div className="middle-box">
                            修改项目月供额度<br />
                            当前 {this.props.future.fContractInfo.faucetJA[0].percent}%，
                            {this.props.future.fContractInfo.faucetJA[0].min}
                            {this.props.future.fContractInfo.fundSymbol.toLocaleUpperCase()}~
                            {this.props.future.fContractInfo.faucetJA[0].max}
                            {this.props.future.fContractInfo.fundSymbol.toLocaleUpperCase()}
                        </div>
                    </Link>
                    <Link to={"/fproposal/quit/" + this.state.projId} className="type-box-wrapper" >
                        <div className="middle-box">清退资金</div>
                    </Link>
                </div>
            </>
        );
    }
}

export default injectIntl(FutureProposalMenu);
