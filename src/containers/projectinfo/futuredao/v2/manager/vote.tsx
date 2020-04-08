/**
 * 投票模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Hint from '@/components/hint';
// import { IMolochInfoProps } from '../../interface/molochinfo.interface';
// import { onCountRemainTime } from '@/utils/formatTime';
// import classnames from 'classnames';
import { IProjectInfoProps } from '../../interface/projectinfo.interface';

interface IState {
    isVoteEnd: boolean, // 投票时间已经结束
}
@observer
class MolochManagerVote extends React.Component<IProjectInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        isVoteEnd: false
    }
    public render() {
        // const voteClassName = classnames('vote-box', {
        //     'agree-vote': this.props.molochmanager.proposalListItem.proposalState === ProposalType.PassYes ? true : false,
        //     'disagree-vote': (this.props.molochmanager.proposalListItem.proposalState === ProposalType.PassNot || this.props.molochmanager.proposalListItem.proposalState === ProposalType.HandleTimeOut) ? true : false,
        // })
        return (
            <>
                <h3 className="title-h3">
                        投票
                        {/* <Hint
                            text="同意票多于反对票且反对票不超过总票数的30%时，提案将被通过。"
                            hintType="right-hint"
                        /> */}
                        <span className="title-gray">&nbsp;&nbsp;（ 剩余 15天23时59分59秒 ）</span>
                    </h3>
                    <div className="vote-box agree-vote disagree-vote">
                        <div className="vote-title">制作人工资支付的提案</div>
                        <div className="manager-votebox">
                            <div className="green-sai" style={{ "width": 60 + "%" }} />
                            <div className="red-sai" style={{ "width": 40 + "%" }} />
                            <span className="left-top">赞同：1135</span>
                            <span className="right-top">反对：447</span>
                        </div>
                        <div className="myvote">
                            <div className="myvote-title">
                                <strong>我的投票</strong>
                                <Hint
                                    text="用户每拥有一个可用代币可以投一票。投票后将根据已投票数对代币进行锁仓，本提案投票结束后可解锁对应代币。%时，提案将被通过。"
                                    hintType="right-hint"
                                />
                            </div>
                            <div className="myvote-sider">滚动</div>
                            <div className="myvote-btn">
                                <Button text="赞同 +20" btnColor="bright-green" />
                                <Button text="反对 +20" btnColor="bright-red" />                                
                            </div>
                            <Button text="赞同 +20" btnColor="gray-btn" btnSize="vote-btn" />
                        </div>
                    </div>
                    {/* <div className="going-box">
                        <span>2019-08-08 12:12:12 开始执行</span><br />
                        <span className="small-str">（ 1/30已完成 ）</span>
                    </div>
                    <div className="fail-box">
                        <span>提案未通过</span>
                    </div> */}

                {/* {
                    this.props.molochmanager.proposalListItem.proposalState === ProposalType.UpComing && (
                        <div className="going-box">
                            <strong className="left-str">{this.intrl.manager.willstart}</strong><br />
                            <span className="small-right-str">{this.intrl.manager.time}：{this.computeCanVoteTime(this.props.molochmanager.proposalListItem)}</span>
                        </div>
                    )
                }
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
                                                <strong>{this.intrl.manager.passed}</strong>
                                            </div>
                                        )
                                    }
                                    {
                                        (this.props.molochmanager.proposalListItem.proposalState === ProposalType.PassNot || this.props.molochmanager.proposalListItem.proposalState === ProposalType.HandleTimeOut) && (
                                            <div className="going-box fail-str">
                                                <strong>{this.intrl.manager.fail}</strong>
                                            </div>
                                        )
                                    }
                                </>
                            )
                    )
                } */}
            </>
        );
    }
    // 投赞同票 1是true
    // private handeToVoteYes = async () => {
    //     if (!this.props.common.userInfo) {
    //         this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
    //         return false;
    //     }
        // if (!this.props.molochmanager.proposalListItem) {
        //     return false;
        // }
        // // 是否被别人委托了
        // if (this.props.molochmanager.upAddress) {
        //     // 委托人资金为0了
        //     if (this.props.molochmanager.upBalance <= 0) {
        //         return false
        //     }
        // } else {
        //     if (this.props.molochmanager.proposalBalance <= 0) {
        //         return false
        //     }
        // }
        // const res = await this.props.metamaskwallet.inintWeb3();
        // if (res) {
        //     this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
        //     const res2 = await this.props.molochmanager.applyYesVoteV2(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address);
        //     if (res2) {
        //         this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
        //     } else {
        //         this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
        //     }
        // }

    //     return true
    // }
    // // 投反对票 2是false
    // private handeToVoteNo = async () => {
    //     if (!this.props.common.userInfo) {
    //         this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
    //         return false;
    //     }
        // if (!this.props.molochmanager.proposalListItem) {
        //     return false;
        // }
        // // 是否被别人委托了
        // if (this.props.molochmanager.upAddress) {
        //     // 委托人资金为0了
        //     if (this.props.molochmanager.upBalance <= 0) {
        //         return false
        //     }
        // } else {
        //     if (this.props.molochmanager.proposalBalance <= 0) {
        //         return false
        //     }
        // }
        // const res = await this.props.metamaskwallet.inintWeb3();
        // if (res) {
        //     this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
        //     const res2 = await this.props.molochmanager.applyNoVoteV2(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address);
        //     if (res2) {
        //         this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
        //     } else {
        //         this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
        //     }
        // }
    //     return true
    // }
    // // 处理提案
    // private handleProcessProposal = async () => {
    //     if (!this.props.common.userInfo) {
    //         this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
    //         return false;
    //     }
        // if (!this.props.molochmanager.proposalListItem) {
        //     return false;
        // }
        // const res = await this.props.metamaskwallet.inintWeb3();
        // if (res) {
        //     let res2 = false;
        //     let flag = true;
        //     if (this.props.molochmanager.proposalListItem.proposalType === '0') {
        //         // 申请股份的处理
        //         this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
        //         res2 = await this.props.molochmanager.processProposalV2(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address);
        //     } else if (this.props.molochmanager.proposalListItem.proposalType === '1') {
        //         // 添加代币的处理
        //         this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
        //         res2 = await this.props.molochmanager.processWhiteListProposal(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address);
        //     } else if (this.props.molochmanager.proposalListItem.proposalType === '2') {
        //         // 踢人的处理
        //         // 处于处理期间，踢人并清退某人的资产
        //         if (this.props.molochmanager.proposalListItem.proposalState === ProposalType.Handling && this.props.molochmanager.proposalInfo) {
        //             flag = false;
        //             this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendchecktwo);
        //             await this.props.molochmanager.processKickAndProposal(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.molochmanager.proposalInfo.applicant, this.props.common.userInfo.address, (txid: string) => {
        //                 if (txid) {
        //                     this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
        //                 } else {
        //                     this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
        //                 }
        //             });
        //         } else {
        //             // 超过处理器时的处理踢人的提案
        //             this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
        //             res2 = await this.props.molochmanager.processKickProposal(this.props.molochmanager.proposalListItem.proposalQueueIndex, this.props.common.userInfo.address);
        //         }
        //     }
        //     if (flag) {
        //         if (res2) {
        //             this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
        //         } else {
        //             this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
        //         }
        //     }
        // }
    //     return true
    // }

    // 计算投票所占百分比
    // private computePercentage = (item: IMolochProposalList, type: boolean) => {
    //     const total = item.voteYesCount + item.voteNotCount;
    //     if (total === 0) {
    //         return 50;
    //     }
    //     else {
    //         // 支持
    //         if (type) {
    //             const percent = item.voteYesCount / total * 100
    //             return percent
    //         }// 反对
    //         else {
    //             const percent = item.voteNotCount / total * 100
    //             return percent
    //         }
    //     }
    // }
    // 计算投票倒计时
    // private computeVoteTime = (item: IMolochProposalList) => {
    //     const nowTime = new Date().getTime() / 1000;
    //     const nowTimeInt = parseInt(nowTime.toString(), 10);
    //     const agoTime = nowTimeInt - item.timestamp;
    //     if (this.props.molochinfo.projInfo) {
    //         const voteTime = parseFloat(this.props.molochinfo.projInfo.votePeriod);
    //         const endTime = voteTime - agoTime;
    //         if (endTime < 0) {
    //             return 'End'
    //         } else {
    //             return onCountRemainTime(endTime)
    //         }
    //     } else {
    //         return 'End'
    //     }

    //     // 投票时间-（当前时间点-创建提案时间）=剩余时间      
    // }
    // 计算公示倒计时
    // private computeShowTime = (item: IMolochProposalList) => {
    //     // 公示剩余时间=公示时间+投票时间-（当前时间点-发布合约的时间点）
    //     const nowTime = new Date().getTime() / 1000;
    //     const nowTimeInt = parseInt(nowTime.toString(), 10);
    //     const agoTime = nowTimeInt - item.timestamp;
    //     if (this.props.molochinfo.projInfo) {
    //         const voteTime = parseFloat(this.props.molochinfo.projInfo.votePeriod);
    //         const graceTime = parseFloat(this.props.molochinfo.projInfo.notePeriod);
    //         const endTime = graceTime + voteTime - agoTime;
    //         if (endTime < 0) {
    //             return 'End'
    //         } else {
    //             return onCountRemainTime(endTime)
    //         }
    //     } else {
    //         return 'End'
    //     }
    // }
    // 计算可投票倒计时
    // private computeCanVoteTime = (item: IMolochProposalList) => {
    //     if (!this.props.molochmanager.contractInfo || !this.props.molochinfo.projInfo) {
    //         return false
    //     }
    //     const nowTime = new Date().getTime() / 1000;
    //     const nowTimeInt = parseInt(nowTime.toString(), 10);
    //     // 周期间隔时间（单位：秒）
    //     const betweenTime = parseInt(this.props.molochmanager.contractInfo.periodDuration, 10);
    //     // 下一个周期开始时间=下一个周期耗时+项目创建时间
    //     const latestIndexTime = (parseInt(item.startingPeriod.toString(), 10) + 1) * betweenTime;
    //     const startTime = this.props.molochinfo.projInfo.startTime;
    //     const endTime = latestIndexTime + startTime;
    //     // 可投票剩余时间 = 下一个周期的开始时间-当前时间
    //     const countTime = endTime - nowTimeInt;
    //     if (countTime < 0) {
    //         return 'End'
    //     } else {
    //         return onCountRemainTime(countTime)
    //     }
    // }
}

export default injectIntl(MolochManagerVote);
