/**
 * 发布提案
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { IMolochProposalProps } from './interface/index.interface';
import { renderRoutes } from 'react-router-config';

@inject('index', 'common', 'metamaskwallet', 'molochmanager')
@observer
class MolochProposal extends React.Component<IMolochProposalProps> {
    public intrl = this.props.intl.messages;
    public componentDidMount()
    {
        const projectId = this.props.match.params['projectId'];
        this.props.index.getFundData(projectId);
        this.props.molochmanager.getContractInfo(projectId);
    }
    public render()
    {
        return (
            <div className="proposal-page">
                <div className="proposal-wrapper">
                    <div className="proposal-top">
                        <h2>{this.intrl.proposal.title}</h2>
                    </div>
                    {
                        renderRoutes(this.props.route.children)
                    }
                </div>
            </div>
        );
    }
}

export default injectIntl(MolochProposal);
