/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Card from '@/components/card';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../interface/molochinfo.interface';
import { Pagination } from 'antd';
import { IMolochProposalList, ProposalType } from '../interface/molochmanager.interface';
import {onCountRemainTime} from '@/utils/formatTime'

interface IState
{
    showListType: number
}

@observer
class MolochManager extends React.Component<IMolochInfoProps, IState> {
    public state: IState = {
        showListType: 1
    }
    public componentDidMount()
    {
        this.props.molochmanager.getMolochProposalList(this.props.molochinfo.projId);
    }
    public render()
    {
        return (
            <div className="manager-wrapper">
                <div className="manager-left">
                    <div className="manager-list-type">
                        <ul className="title-ul">
                            <li className={this.props.molochmanager.proposalMenuNum === 1 ? "title-li active" : "title-li"} onClick={this.handleShowListType.bind(this, 1)}>
                                正式提案
                            </li>
                            <li className={this.props.molochmanager.proposalMenuNum === 2 ? "title-li active" : "title-li"} onClick={this.handleShowListType.bind(this, 2)}>
                                预发布提案<span className="sm-graytime">（4小时30分钟后可用）</span>
                            </li>
                        </ul>
                    </div>
                    {
                        this.props.molochmanager.proposalCount > 0 && this.props.molochmanager.proposalList.map((item: IMolochProposalList, index: number) =>
                        {
                            return (
                                <div className="manager-list" onClick={this.handleToInfo.bind(this, item)} key={index}>
                                    <div className="mcontent-top">
                                        <div className="mcontent-title">
                                            {
                                                this.props.common.userInfo && (item.hasVote ? <Card text="已投票" colortype="block-gray" cardsize="sm-card" /> : <Card text="未投票" colortype="c-purple" cardsize="sm-card" />)
                                            }
                                            <strong className="mtitle">{item.proposalTitle}</strong>
                                        </div>
                                        {
                                            item.proposalState === ProposalType.voting && (
                                                <div className="transparent-toupiao">
                                                    <span className="big-text">投票中</span>&nbsp;&nbsp;
                                                    <span className="sm-text">剩余 {this.computeVoteTime(item)}</span>
                                                </div>
                                            )
                                        }
                                        {
                                            item.proposalState === ProposalType.showing && (
                                                <div className="transparent-toupiao purple-gongshi">
                                                    <span className="big-text">公示中</span>&nbsp;&nbsp;
                                                    <span className="sm-text">剩余 {this.computeShowTime(item)}</span>
                                                </div>
                                            )
                                        }
                                        {
                                            item.proposalState === ProposalType.pass && <Card text="已通过" colortype="transparent-green" cardsize="md-sm-card" />
                                        }
                                        {
                                            item.proposalState === ProposalType.fail && <Card text="未通过" colortype="transparent-red" cardsize="md-sm-card" />
                                        }
                                    </div>
                                    <div className="mcontent-down">
                                        <div className="mcontent-count">
                                            <span>要求 </span>
                                            <strong className="count-right">{item.sharesRequested} 股</strong>
                                            <span>贡献 </span>
                                            <strong>{item.tokenTribute} {item.tokenTributeSymbol.toLocaleUpperCase()}</strong>
                                        </div>
                                        <div className="manager-votebox">
                                            <div className="green-sai" style={{ "width": this.computePercentage(item, true) + "%" }} />
                                            <div className="red-sai" style={{ "width": this.computePercentage(item, false) + "%" }} />
                                            <span className="left-top">赞同：{item.yesShares}</span>
                                            <span className="right-top">反对：{item.noShares}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        this.props.molochmanager.proposalCount > 10 && (
                            <div className="member-page-warpper">
                                <Pagination showQuickJumper={true} defaultCurrent={1} defaultPageSize={this.props.molochmanager.proposalPageSize} total={this.props.molochmanager.proposalCount} onChange={this.handleChangeManagerPage} />
                            </div>
                        )
                    }
                </div>
                <div className="manager-right">
                    <Button text="发起预发布提案" btnSize="bg-bg-btn" onClick={this.handleToProposal} />
                    <h3 className="title-h3">退出</h3>
                    <div className="exit-wrapper">
                        <div className="exit-line">
                            <div className="exit-left">我的股数</div>
                            <div className="exit-right">
                                <input type="text" className="normal-exit-input readonly-input" readOnly={true} />
                                {/* <span className="asset-text">kk</span> */}
                            </div>
                        </div>
                        <div className="exit-line">
                            <div className="exit-left">退出股数</div>
                            <div className="exit-right">
                                <input type="text" className="normal-exit-input" />
                                {/* <span className="asset-text">ddd</span> */}
                                <span className="amount-text">价值：10 ETH</span>
                            </div>
                        </div>
                        <div className="doing-btn">
                            <Button text="立即退出" btnSize="buy-btn" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // 选择查看什么类型的提案
    private handleShowListType = (num: number) =>
    {
        this.props.molochmanager.proposalMenuNum = num;
    }
    // 翻页
    private handleChangeManagerPage = (index: number) =>
    {
        this.props.molochmanager.proposalPage = index;
        this.props.molochmanager.getMolochProposalList(this.props.molochinfo.projId);
    }
    // 发起提案
    private handleToProposal = () =>
    {
        this.props.history.push('/molochproposal/' + this.props.molochinfo.projId)
    }
    // 查看提案详情
    private handleToInfo = (item: IMolochProposalList) =>
    {
        this.props.molochinfo.isShowManagerInfo = true;
        this.props.molochmanager.proposalIndex = item.proposalIndex;
    }
    /**
     * 要修改数据
     */
    // private handleToOpenManager = (index: number) =>
    // {
    //     console.log("index", index);

    //     window.open(`/projectmanager/?hash=${molochinfoStore.voteHash}&index=${index}`)
    // }
    // 计算投票所占百分比
    private computePercentage = (item: IMolochProposalList, type: boolean) =>
    {
        const total = parseInt(item.yesShares, 10) + parseInt(item.noShares, 10);
        if (total === 0)
        {
            return 50;
        }
        else
        {
            // 支持
            if (type)
            {
                const percent = parseInt((parseInt(item.yesShares, 10) / total * 100).toString(), 10)
                return percent
            }// 反对
            else
            {
                const percent = parseInt((parseInt(item.noShares, 10) / total * 100).toString(), 10)
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
          const voteTime = this.props.molochinfo.projInfo.votePeriod;
          const endTime = voteTime - agoTime;
          return onCountRemainTime(endTime)
        }else{
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
          const voteTime = this.props.molochinfo.projInfo.votePeriod;
          const graceTime = this.props.molochinfo.projInfo.gracePeriod;
          const endTime = graceTime+voteTime - agoTime;
          return onCountRemainTime(endTime)
        }else{
            return ''
        }
    }
}

export default injectIntl(MolochManager);
