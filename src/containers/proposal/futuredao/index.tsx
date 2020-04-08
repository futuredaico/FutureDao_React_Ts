/**
 * 发布提案菜单页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { renderRoutes } from 'react-router-config';
import { IFutureProposalProps } from './interface/future.interface';

@inject('future','common','metamaskwallet')
@observer
class FutureProposal extends React.Component<IFutureProposalProps> {
    public intrl = this.props.intl.messages;
    // public componentDidMount()
    // {
    //     const projectId = this.props.match.params['projectId'];
    //     console.log(projectId)
    //     this.props.future.getFContractInfoData(projectId);
    // }
    public componentWillUnmount(){
        this.props.future.assetHash = ''; 
        this.props.future.assetSymble = ''; 
        this.props.future.assetDecimals = 0; 
        this.props.future.fContractInfo = null; 
    }
    public render()
    {
        return (
            <div className="proposal-page">
                <div className="proposal-wrapper">
                    {/* <div className="proposal-top">
                        <h2>{this.intrl.proposal.title}</h2>
                    </div> */}
                    {
                        renderRoutes(this.props.route.children)
                    }
                </div>
            </div>
        );
    }
}

export default injectIntl(FutureProposal);
