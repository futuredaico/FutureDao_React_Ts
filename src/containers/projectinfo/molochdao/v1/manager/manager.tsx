/**
 * 治理列表模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Card from '@/components/card';

import { IMolochInfoProps } from '../../interface/molochinfo.interface';
import { Pagination } from 'antd';
import { IMolochProposalList, ProposalType } from '../../interface/molochmanager.interface';
import { onCountRemainTime } from '@/utils/formatTime';
import ManagerRight from './rigthsize';


@observer
class MolochManager extends React.Component<IMolochInfoProps> {
    public intrl = this.props.intl.messages;
    public async componentDidMount()
    {
        await this.props.molochmanager.getMolochProposalList(this.props.molochinfo.projId);
        this.props.molochmanager.getContractInfo(this.props.molochinfo.projId)
        if (this.props.common.userInfo)
        {
            await this.props.molochmanager.getTokenBalance(this.props.molochinfo.projId, this.props.common.userInfo.address)
            await this.props.molochmanager.getUpStreamData(this.props.molochinfo.projId, this.props.common.userInfo.address)
        }
    }
    public componentWillUnmount(){
        this.props.molochmanager.proposalList = [];
        this.props.molochmanager.proposalCount = 0;
    }
    public render()
    {
        return (
            <div className="manager-wrapper">
                <div className="manager-left">
                    <div className="manager-list-type">
                        <ul className="title-ul">
                            <li className={this.props.molochmanager.proposalMenuNum === '1' ? "title-li active" : "title-li"} onClick={this.handleShowListType.bind(this, '1')}>
                                {this.intrl.manager.tian}
                            </li>
                        </ul>
                    </div>

                    {
                        this.props.molochmanager.proposalCount > 0 && this.props.molochmanager.proposalList.map((item: IMolochProposalList, index: number) =>
                        {
                            return (
                                <div className="manager-list" onClick={this.handleToInfo.bind(this, item)} key={index}>
                                    <div className="mcontent-top">
                                        {/* 标题 */}
                                        <div className="mcontent-title">
                                            {
                                                (this.props.common.userInfo && this.props.molochmanager.proposalBalance > 0) && (item.hasVote ? <Card text={this.intrl.manager.yesvote} colortype="block-gray" cardsize="sm-card" /> : <Card text={this.intrl.manager.novote} colortype="c-purple" cardsize="sm-card" />)
                                            }
                                            <strong className="mtitle">{item.proposalTitle ? item.proposalTitle : 'null'}</strong>
                                        </div>
                                        {/* 投票期 */}
                                        {
                                            item.proposalState === ProposalType.Voting && (
                                                <div className="transparent-toupiao">
                                                    <span className="big-text">{this.intrl.manager.voting}</span>&nbsp;&nbsp;
                                                    <span className="sm-text">{this.intrl.manager.other} {this.computeVoteTime(item)}</span>
                                                </div>
                                            )
                                        }
                                        {/* 公示期 */}
                                        {
                                            item.proposalState === ProposalType.Noting && (
                                                <div className="transparent-toupiao purple-gongshi">
                                                    <span className="big-text">{this.intrl.manager.showing}</span>&nbsp;&nbsp;
                                                    <span className="sm-text">{this.intrl.manager.other} {this.computeShowTime(item)}</span>
                                                </div>
                                            )
                                        }
                                        {/* 已通过 */}
                                        {
                                            item.proposalState === ProposalType.PassYes && <Card text={this.intrl.manager.pass} colortype="transparent-green" cardsize="md-sm-card" />
                                        }
                                        {/* 未通过 */}
                                        {
                                            item.proposalState === ProposalType.PassNot && <Card text={this.intrl.manager.notallow} colortype="transparent-red" cardsize="md-sm-card" />
                                        }
                                        {/* 待处理 */}
                                        {
                                            (item.proposalState === ProposalType.PassYes || item.proposalState === ProposalType.PassNot) && item.handleState === '0' && (
                                                <div className="notdo-wrapper">
                                                    <Card text={this.intrl.manager.doing} colortype="transparent-purple" cardsize="md-sm-card" />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="mcontent-down">
                                        {/* 贡献显示 */}
                                        <div className="mcontent-count">
                                            <span>{this.intrl.manager.request} </span>
                                            <strong className="count-right">{item.sharesRequested} {this.intrl.manager.gu}</strong>
                                            <span>{this.intrl.manager.gong} </span>
                                            <strong>{item.tributeOffered} {item.tributeOfferedSymbol.toLocaleUpperCase()}</strong>
                                        </div>
                                        {/* 投票比例显示 */}
                                        <div className="manager-votebox">
                                            <div className="green-sai" style={{ "width": this.computePercentage(item, true) + "%" }} />
                                            <div className="red-sai" style={{ "width": this.computePercentage(item, false) + "%" }} />
                                            <span className="left-top">{this.intrl.manager.agree}：{item.voteYesCount}</span>
                                            <span className="right-top">{this.intrl.manager.disagree}：{item.voteNotCount}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        this.props.molochmanager.proposalCount > 10 && (
                            <div className="proposal-page-warpper">
                                <Pagination showQuickJumper={true} defaultCurrent={1} defaultPageSize={this.props.molochmanager.proposalPageSize} total={this.props.molochmanager.proposalCount} onChange={this.handleChangeManagerPage} />
                            </div>
                        )
                    }
                </div>
                <ManagerRight {...this.props} />
            </div>
        );
    }
    // 选择查看什么类型的提案
    private handleShowListType = (num: string) =>
    {
        this.props.molochmanager.proposalMenuNum = num;
    }
    // 翻页
    private handleChangeManagerPage = (index: number) =>
    {
        this.props.molochmanager.proposalPage = index;
        this.props.molochmanager.getMolochProposalList(this.props.molochinfo.projId);
    }
    // 查看提案详情
    private handleToInfo = (item: IMolochProposalList) =>
    {
        this.props.molochinfo.isShowManagerInfo = true;
        this.props.molochmanager.proposalIndex = item.proposalIndex;
        this.props.molochmanager.proposalListItem = item;
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
        // 当前时间-提案创建时间=提案过去了的时间
        const agoTime = nowTimeInt - item.timestamp;
        if (this.props.molochinfo.projInfo)
        {
            // 项目投票时间长度
            const voteTime = parseFloat(this.props.molochinfo.projInfo.votePeriod);
            const endTime = voteTime - agoTime;
            if (endTime < 0)
            {
                return 'End'
            } else
            {
                return onCountRemainTime(endTime)
            }
        } else
        {
            return 'End'
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
            const graceTime = parseFloat(this.props.molochinfo.projInfo.notePeriod);
            const endTime = graceTime + voteTime - agoTime;
            if (endTime < 0)
            {
                return 'End'
            } else
            {
                return onCountRemainTime(endTime)
            }
        } else
        {
            return 'End'
        }
    }
    // 待处理倒计时
    // private computeProcessTime = (item: IMolochProposalList) =>
    // {
    //     // 公示剩余时间=公示时间+投票时间-（当前时间点-发布合约的时间点）
    //     const nowTime = new Date().getTime() / 1000;
    //     const nowTimeInt = parseInt(nowTime.toString(), 10);
    //     const agoTime = nowTimeInt - item.timestamp;
    //     if (this.props.molochinfo.projInfo)
    //     {
    //         const voteTime = parseFloat(this.props.molochinfo.projInfo.votePeriod);
    //         const graceTime = parseFloat(this.props.molochinfo.projInfo.notePeriod);
    //         const endTime = graceTime + voteTime - agoTime;
    //         if (endTime < 0)
    //         {
    //             return 'End'
    //         } else
    //         {
    //             return onCountRemainTime(endTime)
    //         }
    //     } else
    //     {
    //         return 'End'
    //     }
    // }
}

export default injectIntl(MolochManager);
