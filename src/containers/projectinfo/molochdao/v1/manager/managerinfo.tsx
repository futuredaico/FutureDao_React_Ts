/**
 * 治理模块的详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../../interface/molochinfo.interface';
import VoteBox from './vote';

@observer
class MolochManagerInfo extends React.Component<IMolochInfoProps, any> {
    public intrl = this.props.intl.messages;
    public state = {
        managerDiscuss: '',
        managerReply: '',
        managerReplyOther: '',
        isOpenStopBox: false,
        showDeletBox: false
    }
    public componentDidMount()
    {
        this.props.molochmanager.getMolochProposalDetail(this.props.molochinfo.projId);
        if(this.props.common.userInfo){
            this.props.molochmanager.getVoteData(this.props.molochinfo.projId,this.props.molochmanager.proposalIndex,this.props.common.userInfo.address)
        }        
    }
    public componentWillUnmount()
    {
        this.props.molochmanager.proposalInfo = null;
        this.props.molochmanager.proposalIndex = '';
        this.props.molochmanager.proposalListItem = null;
    }
    public render()
    {
        if (!this.props.molochmanager.proposalInfo)
        {
            return <div />;
        }
        return (
            <div className="manager-wrapper manager-info-wrapper">
                <div className="manager-left">
                    <h3 className="title-h3">
                        {this.props.molochmanager.proposalInfo.proposalTitle?this.props.molochmanager.proposalInfo.proposalTitle:'null'}
                        {/* <span className="cancel-btn" onClick={this.handleToOpenStop}>取消提案</span> */}
                    </h3>
                    <div className="manager-info">
                        {/* 提案人 */}
                        <div className="info-line">
                            <div className="iline-left">
                                <strong>{this.intrl.manager.proposer}</strong>
                            </div>
                            <div className="iline-right">
                                {
                                    this.props.molochmanager.proposalInfo.headIconUrl ? <img src={this.props.molochmanager.proposalInfo.headIconUrl} alt="" className="people-headicon" />
                                        : <img src={require('@/img/default.png')} alt="" className="people-headicon" />
                                }
                                <div className="people-swrap">
                                    <strong className="member-name">{this.props.molochmanager.proposalInfo.username ? this.props.molochmanager.proposalInfo.username : this.intrl.user.shen}</strong>
                                    <span>{this.props.molochmanager.proposalInfo.proposer}</span>
                                </div>
                            </div>
                        </div>
                        {/* 提案具体详情 */}
                        <div className="proposal-info">
                            <div>
                                <strong>{this.intrl.manager.detail}</strong>
                            </div>
                            {
                                this.props.molochmanager.proposalInfo.proposalDetail ? <p className="info-des" dangerouslySetInnerHTML={{ '__html': this.props.molochmanager.proposalInfo.proposalDetail }} /> : <p className="info-des">暂无说明</p>
                            }
                            {/* 申请股份类型 */}
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>{this.intrl.manager.applicant}</strong>
                                </div>
                                <div className="iline-right">
                                    {
                                        this.props.molochmanager.proposalInfo.applicantHeadIconUrl ? <img src={this.props.molochmanager.proposalInfo.applicantHeadIconUrl} alt="" className="people-headicon" />
                                            : <img src={require('@/img/default.png')} alt="" className="people-headicon" />
                                    }
                                    <div className="people-swrap">
                                        <strong className="member-name">{this.props.molochmanager.proposalInfo.applicantUsername ? this.props.molochmanager.proposalInfo.applicantUsername : this.intrl.user.shen}</strong>
                                        <span>{this.props.molochmanager.proposalInfo.applicant}</span>
                                    </div>
                                </div>
                            </div>                            
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>{this.intrl.manager.apply}</strong>
                                </div>
                                <div className="iline-right">
                                    <span>{this.props.molochmanager.proposalInfo.sharesRequested}</span>
                                </div>
                            </div>
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>{this.intrl.manager.gong2}</strong>
                                </div>
                                <div className="iline-right">
                                    <span>{this.props.molochmanager.proposalInfo.tributeOffered} {this.props.molochmanager.proposalInfo.tributeOfferedSymbol.toLocaleUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 页面右边部分 */}
                <div className="manager-right">
                    <div className="back-btn">
                        <img src={require('@/img/back.png')} alt="" onClick={this.handleBackManagerList} className="back-img" />
                    </div>
                    <VoteBox {...this.props} />
                </div>
                {
                    this.state.showDeletBox && (
                        <div className="delete-info-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">确认取消此提案？</div>
                                <div className="delete-btn">
                                    <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleToCloseStop} />
                                    <Button text={this.intrl.btn.comfirm} onClick={this.handleStopProposal} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
    // 取消提案
    // private handleToOpenStop = () => {
    //     this.setState({
    //         showDeletBox: true
    //     })
    // }
    private handleToCloseStop = () =>
    {
        this.setState({
            isOpenStopBox: false,
            showDeletBox: false
        })
    }
    // private handleToShowCheckStop = () => {
    //     this.setState({
    //         showDeletBox:true
    //     })
    // }
    private handleStopProposal = () =>
    {
        // todo
        this.handleToCloseStop();
    }
    // 返回列表页
    private handleBackManagerList = () => {
        this.props.molochinfo.isShowManagerInfo = false;
    }
}

export default injectIntl(MolochManagerInfo);
