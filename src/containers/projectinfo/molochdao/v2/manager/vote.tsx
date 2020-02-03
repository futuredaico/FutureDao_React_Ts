/**
 * 投票模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../../interface/molochinfo.interface';
import { IMolochProposalList, ProposalType } from '../../interface/molochmanager.interface';
import { onCountRemainTime } from '@/utils/formatTime';
import classnames from 'classnames';

interface IState {
    isVoteEnd: boolean, // 投票时间已经结束
}
@observer
class MolochManagerVote extends React.Component<IMolochInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        isVoteEnd: false
    }
    public render() {
        if (!this.props.molochmanager.proposalInfo || !this.props.molochmanager.proposalListItem) {
            return <div />;
        }
        const voteClassName = classnames('vote-box', {
            'agree-vote': this.props.molochmanager.proposalListItem.proposalState === ProposalType.PassYes ? true : false,
            'disagree-vote': this.props.molochmanager.proposalListItem.proposalState === ProposalType.PassNot ? true : false,
        })
        return (
            <>
                <h3 className="title-h3">
                    {this.intrl.manager.vote}
                </h3>
                <div className={voteClassName}>
                    <div className="vote-title">{this.props.molochmanager.proposalInfo.proposalTitle ? this.props.molochmanager.proposalInfo.proposalTitle : 'null'}</div>
                    <div className="manager-votebox">
                        <div className="green-sai" style={{ "width": this.computePercentage(this.props.molochmanager.proposalListItem, true) + "%" }} />
                        <div className="red-sai" style={{ "width": this.computePercentage(this.props.molochmanager.proposalListItem, false) + "%" }} />
                        <span className="left-top">{this.intrl.manager.agree}：{this.props.molochmanager.proposalListItem.voteYesCount}</span>
                        <span className="right-top">{this.intrl.manager.disagree}：{this.props.molochmanager.proposalListItem.voteNotCount}</span>
                    </div>
                    <div className="myvote">
                        <div className="myvote-title">
                            <strong>{this.intrl.manager.myvote}</strong>
                        </div>
                        <div className="myvote-btn">

                            {
                                this.props.molochmanager.voteInfo.voteType === '' && (
                                    <>
                                        {
                                            this.props.molochmanager.proposalListItem.proposalState === ProposalType.Voting ? (
                                                <>
                                                    {
                                                        this.computeVoteTime(this.props.molochmanager.proposalListItem) === 'End' ? (
                                                            <Button text={this.intrl.manager.over} btnColor="gray-btn" btnSize="vote-btn" />
                                                        ) : (
                                                                <>
                                                                    {
                                                                        this.props.molochmanager.upAddress
                                                                            ? (
                                                                                <>
                                                                                    {
                                                                                        this.props.molochmanager.upBalance <= 0 ? (
                                                                                            <Button text={this.intrl.manager.notenough} btnColor="gray-btn" btnSize="vote-btn" />
                                                                                        )
                                                                                            : (
                                                                                                <>
                                                                                                    <Button text={this.intrl.manager.agree} btnColor="bright-green" onClick={this.handeToVoteYes} />
                                                                                                    <Button text={this.intrl.manager.disagree} btnColor="bright-red" onClick={this.handeToVoteNo} />
                                                                                                </>
                                                                                            )
                                                                                    }
                                                                                </>
                                                                            )
                                                                            : (
                                                                                <>
                                                                                    {
                                                                                        parseFloat(this.props.molochmanager.voteInfo.balance) === 0 ? (
                                                                                            <Button text={this.intrl.manager.notenough} btnColor="gray-btn" btnSize="vote-btn" />
                                                                                        )
                                                                                            : (
                                                                                                <>
                                                                                                    <Button text={this.intrl.manager.agree} btnColor="bright-green" onClick={this.handeToVoteYes} />
                                                                                                    <Button text={this.intrl.manager.disagree} btnColor="bright-red" onClick={this.handeToVoteNo} />
                                                                                                </>
                                                                                            )
                                                                                    }
                                                                                </>
                                                                            )
                                                                    }
                                                                </>
                                                            )
                                                    }
                                                </>
                                            )
                                                : <Button text={this.intrl.manager.novote} btnColor="gray-btn" btnSize="vote-btn" />
                                        }

                                    </>
                                )
                            }
                            {
                                this.props.molochmanager.voteInfo.voteType === '1' && <Button text={this.intrl.manager.agree} btnColor="gray-btn" btnSize="vote-btn" />
                            }
                            {
                                this.props.molochmanager.voteInfo.voteType === '2' && <Button text={this.intrl.manager.disagree} btnColor="gray-btn" btnSize="vote-btn" />
                            }
                        </div>
                    </div>
                </div>
                {
                    this.props.molochmanager.proposalListItem.proposalState === ProposalType.Voting && (
                        <div className="going-box">
                            <strong className="left-str">{this.intrl.manager.voting}</strong><br />
                            <span className="small-right-str">{this.intrl.manager.time}：{this.computeVoteTime(this.props.molochmanager.proposalListItem)}</span>
                        </div>
                    )
                }
                {
                    this.props.molochmanager.proposalListItem.proposalState === ProposalType.Noting && (
                        <div className="going-box">
                            <strong className="left-str">{this.intrl.manager.showing}</strong><br />
                            <span className="small-right-str">{this.intrl.manager.time}：{this.computeShowTime(this.props.molochmanager.proposalListItem)}</span>
                        </div>
                    )
                }
                {
                    (this.props.molochmanager.proposalListItem.proposalState === ProposalType.PassYes || this.props.molochmanager.proposalListItem.proposalState === ProposalType.PassNot || this.props.molochmanager.proposalListItem.proposalState === ProposalType.HandleTimeOut || this.props.molochmanager.proposalListItem.proposalState === ProposalType.Handling) && (
                        this.props.molochmanager.proposalListItem.handleState === '0'
                            ? <Button text={this.intrl.btn.do} btnSize="bg-bg-btn" onClick={this.handleProcessProposal} />
                            : (
                                <>
                                    {
                                        this.props.molochmanager.proposalListItem.proposalState === ProposalType.PassYes && (
                                            <div className="going-box pass-str">
                                                <strong>提案已通过</strong>
                                            </div>
                                        )
                                    }
                                    {
                                        this.props.molochmanager.proposalListItem.proposalState === ProposalType.PassNot && (
                                            <div className="going-box fail-str">
                                                <strong>提案未通过</strong>
                                            </div>
                                        )
                                    }
                                </>
                            )
                    )
                }
            </>
        );
    }
    // 投赞同票 1是true
    private handeToVoteYes = async () => {
        if (!this.props.common.userInfo) {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false;
        }
        if (!this.props.molochmanager.proposalListItem) {
            return false;
        }
        // 是否被别人委托了
        if (this.props.molochmanager.upAddress) {
            // 委托人资金为0了
            if (this.props.molochmanager.upBalance <= 0) {
                return false
            }
        } else {
            if (this.props.molochmanager.proposalBalance <= 0) {
                return false
            }
        }
        const res = await this.props.metamaskwallet.inintWeb3();
        if (res) {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
            const res2 = await this.props.molochmanager.applyYesVoteV2(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address);
            if (res2) {
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
            } else {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
            }
        }

        return true
    }
    // 投反对票 2是false
    private handeToVoteNo = async () => {
        if (!this.props.common.userInfo) {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false;
        }
        if (!this.props.molochmanager.proposalListItem) {
            return false;
        }
        // 是否被别人委托了
        if (this.props.molochmanager.upAddress) {
            // 委托人资金为0了
            if (this.props.molochmanager.upBalance <= 0) {
                return false
            }
        } else {
            if (this.props.molochmanager.proposalBalance <= 0) {
                return false
            }
        }
        const res = await this.props.metamaskwallet.inintWeb3();
        if (res) {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
            const res2 = await this.props.molochmanager.applyNoVoteV2(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address);
            if (res2) {
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
            } else {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
            }
        }
        return true
    }
    // 处理提案
    private handleProcessProposal = async () => {
        if (!this.props.common.userInfo) {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false;
        }
        if (!this.props.molochmanager.proposalListItem) {
            return false;
        }
        const res = await this.props.metamaskwallet.inintWeb3();
        if (res) {
            let res2 = false;
            if (this.props.molochmanager.proposalListItem.proposalType === '0') {
                // 申请股份的处理
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
                res2 = await this.props.molochmanager.processProposalV2(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address);
            } else if (this.props.molochmanager.proposalListItem.proposalType === '1') {
                // 添加代币的处理
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
                res2 = await this.props.molochmanager.processWhiteListProposal(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address);
            } else if (this.props.molochmanager.proposalListItem.proposalType === '2') {
                // 踢人的处理
                // 处于处理期间，踢人并清退某人的资产
                if (this.props.molochmanager.proposalListItem.proposalState === ProposalType.Handling && this.props.molochmanager.proposalInfo) {
                    this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendchecktwo);
                    res2 = await this.props.molochmanager.processKickAndProposal(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.molochmanager.proposalInfo.applicant, this.props.common.userInfo.address);
                } else {
                    // 超过处理器时的处理踢人的提案
                    this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
                    res2 = await this.props.molochmanager.processKickProposal(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address);
                }
            }
            if (res2) {
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
            } else {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
            }
        }
        return true
    }
    /**
     * 踢人的处理
     */
    // private handleKickPeople = async () => {

    //     return true;
    // }

    // 计算投票所占百分比
    private computePercentage = (item: IMolochProposalList, type: boolean) => {
        const total = item.voteYesCount + item.voteNotCount;
        if (total === 0) {
            return 50;
        }
        else {
            // 支持
            if (type) {
                const percent = item.voteYesCount / total * 100
                return percent
            }// 反对
            else {
                const percent = item.voteNotCount / total * 100
                return percent
            }
        }
    }
    // 计算投票倒计时
    private computeVoteTime = (item: IMolochProposalList) => {
        const nowTime = new Date().getTime() / 1000;
        const nowTimeInt = parseInt(nowTime.toString(), 10);
        const agoTime = nowTimeInt - item.timestamp;
        if (this.props.molochinfo.projInfo) {
            const voteTime = parseFloat(this.props.molochinfo.projInfo.votePeriod);
            const endTime = voteTime - agoTime;
            if (endTime < 0) {
                return 'End'
            } else {
                return onCountRemainTime(endTime)
            }
        } else {
            return 'End'
        }

        // 投票时间-（当前时间点-创建提案时间）=剩余时间      
    }
    // 计算公示倒计时
    private computeShowTime = (item: IMolochProposalList) => {
        // 公示剩余时间=公示时间+投票时间-（当前时间点-发布合约的时间点）
        const nowTime = new Date().getTime() / 1000;
        const nowTimeInt = parseInt(nowTime.toString(), 10);
        const agoTime = nowTimeInt - item.timestamp;
        if (this.props.molochinfo.projInfo) {
            const voteTime = parseFloat(this.props.molochinfo.projInfo.votePeriod);
            const graceTime = parseFloat(this.props.molochinfo.projInfo.notePeriod);
            const endTime = graceTime + voteTime - agoTime;
            if (endTime < 0) {
                return 'End'
            } else {
                return onCountRemainTime(endTime)
            }
        } else {
            return 'End'
        }
    }
}

export default injectIntl(MolochManagerVote);
