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
import { ProposalType } from '../../interface/molochmanager.interface';
interface IState {
    showDeletBox: boolean, // 是否显示终止提案弹窗
    sendTime: string // 可批准成正式提案剩余时间
    isDoingSend: boolean // 是否正在发送请求交易
}

@observer
class MolochManagerInfo extends React.Component<IMolochInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        showDeletBox: false,
        sendTime: '',
        isDoingSend: false
    }
    public componentDidMount() {
        this.props.molochmanager.getMolochProposalDetail(this.props.molochinfo.projId);
        if (this.props.common.userInfo && this.props.molochmanager.proposalListItem) {
            this.props.molochmanager.getVoteData(this.props.molochinfo.projId, this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address)
        }
        if (this.props.molochmanager.proposalListItem && !this.props.molochmanager.proposalListItem.proposalQueueIndex) {
            this.handleComputeTimeIndex();
        }
        // 发起提案资格显示(委托人不是自己)
        if (this.props.molochmanager.proposalAddress && this.props.common.userInfo && this.props.common.userInfo.address && this.props.common.userInfo.address.toLocaleLowerCase() !== this.props.molochmanager.proposalAddress) {
            this.setState({
                sendTime: this.intrl.manager.no
            })
        }
    }
    public componentWillUnmount() {
        this.props.molochmanager.proposalInfo = null;
        this.props.molochmanager.proposalIndex = '';
        this.props.molochmanager.proposalListItem = null;
    }
    public render() {
        if (!this.props.molochmanager.proposalInfo || !this.props.molochmanager.proposalListItem) {
            return <div />;
        }
        return (
            <div className="manager-wrapper manager-info-wrapper">
                <div className="manager-left">
                    <h3 className="title-h3">
                        {this.props.molochmanager.proposalInfo.proposalTitle ? this.props.molochmanager.proposalInfo.proposalTitle : 'null'}
                        {!this.props.molochmanager.proposalListItem.proposalQueueIndex && this.props.molochmanager.proposalListItem.isMine && <span className="cancel-btn" onClick={this.handleToOpenStop}>{this.intrl.btn.cancelproposal}</span>}
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
                                this.props.molochmanager.proposalInfo.proposalDetail ? <p className="info-des" dangerouslySetInnerHTML={{ '__html': this.props.molochmanager.proposalInfo.proposalDetail }} /> : <p className="info-des">{this.intrl.projinfo.null}</p>
                            }
                            {/* 申请股份类型 */}
                            {
                                this.props.molochmanager.proposalInfo.proposalType === '0' && (
                                    <>
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
                                            <div className="iline-right ver-top">
                                                <div className="little-wrapper">
                                                    <span>{this.intrl.manager.shares}</span><br />
                                                    <span>{this.props.molochmanager.proposalInfo.sharesRequested}</span>
                                                </div>
                                                <div className="little-wrapper">
                                                    <span>{this.intrl.manager.lootshares}</span><br />
                                                    <span>{this.props.molochmanager.proposalInfo.lootRequested}</span>
                                                </div>
                                                <div className="little-wrapper">
                                                    <span>{this.props.molochmanager.proposalInfo.paymentRequestedSymbol && this.props.molochmanager.proposalInfo.paymentRequestedSymbol.toLocaleUpperCase()}</span><br />
                                                    <span>{this.props.molochmanager.proposalInfo.paymentRequested}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info-line">
                                            <div className="iline-left">
                                                <strong>{this.intrl.manager.gong2}</strong>
                                            </div>
                                            <div className="iline-right">
                                                <span>{this.props.molochmanager.proposalInfo.tributeOffered} {this.props.molochmanager.proposalInfo.tributeOfferedSymbol && this.props.molochmanager.proposalInfo.tributeOfferedSymbol.toLocaleUpperCase()}</span>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            {/* 添加支持代币类型 */}
                            {
                                this.props.molochmanager.proposalInfo.proposalType === '1' && (
                                    <div className="info-line">
                                        <div className="iline-left">
                                            <strong>{this.intrl.manager.addasset}</strong>
                                        </div>
                                        <div className="iline-right">
                                            <span>{this.props.molochmanager.proposalInfo.tributeToken}</span>
                                        </div>
                                    </div>
                                )
                            }
                            {/* 踢出成员类型 */}
                            {
                                this.props.molochmanager.proposalInfo.proposalType === '2' && (
                                    <div className="info-line">
                                        <div className="iline-left">
                                            <strong>{this.intrl.manager.kick}</strong>
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
                                )
                            }
                        </div>
                    </div>
                </div>
                {/* 页面右边部分 */}
                <div className="manager-right">
                    <div className="back-btn">
                        <img src={require('@/img/back.png')} alt="" onClick={this.handleBackManagerList} className="back-img" />
                    </div>
                    {
                        !this.props.molochmanager.proposalListItem.proposalQueueIndex && (
                            <>
                                {
                                    !this.state.sendTime
                                        ? (
                                            <Button text={this.intrl.btn.approve} btnSize="bg-bg-btn" onClick={this.handleToApproveProposal} />
                                        )
                                        : (
                                            <div className="notallow-wrapper">
                                                <span>{this.intrl.btn.approve}</span>
                                                <span className="sm-time">{this.state.sendTime}</span>
                                            </div>
                                        )
                                }
                            </>
                        )
                    }
                    {
                        this.props.molochmanager.proposalListItem.proposalState !== ProposalType.PreVote && <VoteBox {...this.props} />
                    }
                </div>
                {
                    this.state.showDeletBox && (
                        <div className="delete-info-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">{this.intrl.manager.canceltips}</div>
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
    // 打开取消提案窗口
    private handleToOpenStop = () => {
        this.setState({
            showDeletBox: true
        })
    }
    // 关闭取消提案窗口
    private handleToCloseStop = () => {
        this.setState({
            showDeletBox: false
        })
    }
    // 发送取消提案交易
    private handleStopProposal = async () => {
        // todo
        if (!this.props.common.userInfo) {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false;
        }
        if (!this.props.molochmanager.proposalIndex) {
            return false;
        }
        const res = await this.props.metamaskwallet.inintWeb3();
        if (res) {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
            const res2 = await this.props.molochmanager.stopProposalV2(this.props.molochmanager.proposalIndex, this.props.common.userInfo.address);
            if (res2) {
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
            } else {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
            }
        }
        this.handleToCloseStop();
        return true
    }
    // 返回列表页
    private handleBackManagerList = () => {
        this.props.molochinfo.isShowManagerInfo = false;
    }
    // 批准为正式提案
    private handleToApproveProposal = () => {
        if (this.state.isDoingSend) {
            return
        }
        // 验证是否登录
        if (!this.props.common.userInfo) {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
        } else {
            // 是否被别人委托了
            if (this.props.molochmanager.upAddress) {
                // 委托人资金为0了
                if (this.props.molochmanager.upBalance <= 0) {
                    this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, '您还不是成员，无权限批准提案');
                } else {
                    this.handleDoApprove();
                }
            } else {
                if (this.props.molochmanager.proposalBalance <= 0) {
                    this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, '您还不是成员，无权限批准提案');
                }
                else {
                    this.handleDoApprove();
                }
            }
        }
    }
    // 批准为正式提案调用
    private handleDoApprove = async () => {
        //
        await this.props.index.getDepositData(this.props.molochinfo.projId);
        if (!this.props.common.userInfo) {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false;
        }
        if (!this.props.molochmanager.proposalIndex) {
            return false;
        }
        this.setState({
            isDoingSend: true
        })
        const res = await this.props.metamaskwallet.inintWeb3();
        if (res) {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendchecktwo);
            await this.props.molochmanager.sponsorProposal(this.props.molochmanager.proposalIndex, this.props.common.userInfo.address, this.props.index.depositHash, this.props.index.proposalFee, (txid: string) => {
                if (txid) {
                    this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
                } else {
                    this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
                }
            });

        }
        this.setState({
            isDoingSend: false
        })
        return true
    }

    // 计算时间区间所在周期    
    private computeIndex = (newTime: number, createTime: number, betweenTime: number) => {
        // （当前时间-项目创建时间）/4.8*60*60----------向下取整
        const agoTime = newTime - createTime;
        console.log(agoTime / betweenTime)
        const index = Math.ceil(agoTime / betweenTime);
        return index
    }
    // 计算是否可批准正式提案剩余时间
    private handleComputeTimeIndex = () => {
        if (!this.props.molochmanager.contractInfo || !this.props.molochinfo.projInfo) {
            return false
        }
        // 项目如今所在周期
        // 当前时间
        const nowTime = new Date().getTime() / 1000;
        const nowTimeInt = parseInt(nowTime.toString(), 10);
        // 项目创建时间
        const startTime = this.props.molochinfo.projInfo.startTime;
        const betweenTime = parseInt(this.props.molochmanager.contractInfo.periodDuration, 10);
        console.log("betweenTime:" + betweenTime)
        const nowIndex = this.computeIndex(nowTimeInt, startTime, betweenTime);
        console.log("nowIndex:" + nowIndex);
        if (this.props.molochmanager.proposalList.length > 0) {
            // 获取最新的一个提案
            // const item: IMolochProposalList = this.props.molochmanager.proposalList[0];
            console.log("最新提案时间")
            // console.log(new Date())
            // console.log(new Date(item.timestamp * 1000))
            // const tianIndex = this.computeIndex(item.timestamp, startTime, betweenTime);
            console.log("tianIndex:" + this.props.molochmanager.latestProposalPeriod)
            if (parseInt(this.props.molochmanager.latestProposalPeriod, 10) >= nowIndex) {
                // 计算剩余的时间
                const latestIndexTime = (parseInt(this.props.molochmanager.latestProposalPeriod, 10) + 1) * betweenTime;
                const endTime = latestIndexTime + startTime;
                const remainTime = endTime - nowTime;
                console.log(remainTime)
                let h = 0;
                let m = 0;
                let s = 0;
                let str = '';
                if (remainTime >= 0) {
                    h = Math.floor(remainTime / (60 * 60) % 24);
                    m = Math.floor(remainTime / 60 % 60);
                    s = Math.floor(remainTime % 60);
                    if (h > 0) {
                        str = h + this.intrl.manager.hours;
                    }
                    if (m > 0) {
                        str = str + m + this.intrl.manager.min;
                    }
                    console.log(s)
                    if (s > 0) {
                        str = str + s + this.intrl.manager.second;
                    }
                }
                console.log('打印发提案剩余时间')
                console.log(str)
                this.setState({
                    sendTime: str
                })
            }
        }
        return true;
    }
}

export default injectIntl(MolochManagerInfo);
