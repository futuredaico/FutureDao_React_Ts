/**
 * 发布提案的类型选择
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IMolochProposalProps } from '../interface/index.interface';
import { Link } from 'react-router-dom';

interface IState{
    projId:string // 项目ID
}
@inject('index', 'common', 'metamaskwallet', 'molochmanager')
@observer
class MolochProposalMenu extends React.Component<IMolochProposalProps,IState> {
    public intrl = this.props.intl.messages;
    public state:IState = {
        projId:''
    }
    public componentDidMount()
    {
        this.setState({
            projId:this.props.match.params['projectId']||''
        }) 
    }
    public render()
    {
        return (
            <div className="proposal-content">
                <Link to={"/proposalv2/apply/"+this.state.projId} className="type-box-wrapper">
                    <div className="middle-box">{this.intrl.proposal.apply}</div>
                </Link>
                <Link to={"/proposalv2/kick/"+this.state.projId} className="type-box-wrapper" >
                    <div className="middle-box">{this.intrl.proposal.kick}</div>
                </Link>
                <Link to={"/proposalv2/token/"+this.state.projId} className="type-box-wrapper">
                    <div className="middle-box">{this.intrl.proposal.addasset}</div>
                </Link>
            </div>
        );
    }
}

export default injectIntl(MolochProposalMenu);
