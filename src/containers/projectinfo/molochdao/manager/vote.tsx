/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../interface/molochinfo.interface';
import { IMolochProposalList, ProposalType } from '../interface/molochmanager.interface';
import { onCountRemainTime } from '@/utils/formatTime';
import classnames from 'classnames';

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
    public render()
    {
        if (!this.props.molochmanager.proposalInfo || !this.props.molochmanager.proposalListItem)
        {
            return <div />;
        }
        const voteClassName = classnames('vote-box', {
            'agree-vote': this.props.molochmanager.proposalListItem.proposalState === ProposalType.pass ? true : false,
            'disagree-vote': this.props.molochmanager.proposalListItem.proposalState === ProposalType.fail ? true : false,
        })
        return (
            <>
                <h3 className="title-h3">
                    投票
                    </h3>
                <div className={voteClassName}>
                    <div className="vote-title">{this.props.molochmanager.proposalInfo.proposalTitle ? this.props.molochmanager.proposalInfo.proposalTitle : 'null'}</div>
                    <div className="manager-votebox">
                        <div className="green-sai" style={{ "width": this.computePercentage(this.props.molochmanager.proposalListItem, true) + "%" }} />
                        <div className="red-sai" style={{ "width": this.computePercentage(this.props.molochmanager.proposalListItem, false) + "%" }} />
                        <span className="left-top">赞同：{this.props.molochmanager.proposalListItem.voteYesCount}</span>
                        <span className="right-top">反对：{this.props.molochmanager.proposalListItem.voteNotCount}</span>
                    </div>
                    <div className="myvote">
                        <div className="myvote-title">
                            <strong>我的投票</strong>
                        </div>
                        <div className="myvote-btn">
                            {
                                this.props.molochmanager.voteInfo.voteType === '' && (
                                    <>
                                        {
                                            parseFloat(this.props.molochmanager.voteInfo.balance) === 0 ? (
                                                <Button text="没有足够的票" btnColor="gray-btn" btnSize="vote-btn" />
                                            )
                                                : (
                                                    <>
                                                        <Button text="赞同" btnColor="bright-green" onClick={this.handeToVoteYes} />
                                                        <Button text="反对" btnColor="bright-red" onClick={this.handeToVoteNo} />
                                                    </>
                                                )
                                        }
                                    </>
                                )
                            }
                            {
                                this.props.molochmanager.voteInfo.voteType === '1' && <Button text="赞同" btnColor="gray-btn" btnSize="vote-btn" />
                            }
                            {
                                this.props.molochmanager.voteInfo.voteType === '2' && <Button text="反对" btnColor="gray-btn" btnSize="vote-btn" />
                            }
                        </div>
                    </div>
                </div>
                {
                    this.props.molochmanager.proposalListItem.proposalState === ProposalType.voting && (
                        <div className="going-box">
                            <strong className="left-str">投票中</strong><br />
                            <span className="small-right-str">剩余时间：{this.computeVoteTime(this.props.molochmanager.proposalListItem)}</span>
                        </div>
                    )
                }
                {
                    this.props.molochmanager.proposalListItem.proposalState === ProposalType.showing && (
                        <div className="going-box">
                            <strong className="left-str">公示中</strong><br />
                            <span className="small-right-str">剩余时间：{this.computeShowTime(this.props.molochmanager.proposalListItem)}</span>
                        </div>
                    )
                }
                {
                    (this.props.molochmanager.proposalListItem.proposalState === ProposalType.pass || this.props.molochmanager.proposalListItem.proposalState === ProposalType.fail) && (
                        this.props.molochmanager.proposalListItem.handleState === '0' ? <Button text="处理提案" btnSize="bg-bg-btn" /> : <Button text="已处理" btnSize="bg-bg-btn" btnColor="gray-btn" />
                    )
                }
            </>
        );
    }
    // 投赞同票 1是true
    private handeToVoteYes =async ()=>{
        if(!this.props.common.userInfo||!this.props.molochmanager.proposalIndex){
            return false
        }
        await this.props.metamaskwallet.inintWeb3();
        await this.props.molochmanager.applyYesVote(this.props.molochmanager.proposalIndex,this.props.common.userInfo.address);
        return true
    }
    // 投反对票 2是false
    private handeToVoteNo = async()=>{
        if(!this.props.common.userInfo||!this.props.molochmanager.proposalIndex){
            return false
        }
        await this.props.metamaskwallet.inintWeb3();
        await this.props.molochmanager.applyNoVote(this.props.molochmanager.proposalIndex,this.props.common.userInfo.address);
        return true
    }

    // 计算投票所占百分比
    private computePercentage = (item: IMolochProposalList, type: boolean) =>
    {
        const total = item.voteYesCount + item.voteNotCount;
        if (total === 0)
        {
            return 50;
        }
        else
        {
            // 支持
            if (type)
            {
                const percent = item.voteYesCount / total * 100
                return percent
            }// 反对
            else
            {
                const percent = item.voteNotCount / total * 100
                return percent
            }
        }
    }
    // 计算投票倒计时
    private computeVoteTime = (item: IMolochProposalList) =>
    {
        const nowTime = new Date().getTime() / 1000;
        const nowTimeInt = parseInt(nowTime.toString(), 10);
        const agoTime = nowTimeInt - item.timestamp;
        if (this.props.molochinfo.projInfo)
        {
            const voteTime = parseFloat(this.props.molochinfo.projInfo.votePeriod);
            const endTime = voteTime - agoTime;
            return onCountRemainTime(endTime)
        } else
        {
            return ''
        }

        // 投票时间-（当前时间点-创建提案时间）=剩余时间      
    }
    // 计算公示倒计时
    private computeShowTime = (item: IMolochProposalList) =>
    {
        // 公示剩余时间=公示时间+投票时间-（当前时间点-发布合约的时间点）
        const nowTime = new Date().getTime() / 1000;
        const nowTimeInt = parseInt(nowTime.toString(), 10);
        const agoTime = nowTimeInt - item.timestamp;
        if (this.props.molochinfo.projInfo)
        {
            const voteTime = parseFloat(this.props.molochinfo.projInfo.votePeriod);
            const graceTime = parseFloat(this.props.molochinfo.projInfo.notePreriod);
            const endTime = graceTime + voteTime - agoTime;
            return onCountRemainTime(endTime)
        } else
        {
            return ''
        }
    }
}

export default injectIntl(MolochManagerInfo);
