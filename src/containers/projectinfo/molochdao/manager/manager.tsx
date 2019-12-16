/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Card from '@/components/card';
// import Button from '@/components/Button';
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
    public intrl = this.props.intl.messages;
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
                                {this.intrl.manager.tian}
                            </li>
                            {/* <li className={this.props.molochmanager.proposalMenuNum === 2 ? "title-li active" : "title-li"} onClick={this.handleShowListType.bind(this, 2)}>
                                预发布提案<span className="sm-graytime">（4小时30分钟后可用）</span>
                            </li> */}
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
                                                this.props.common.userInfo && (item.hasVote ? <Card text={this.intrl.manager.yesvote} colortype="block-gray" cardsize="sm-card" /> : <Card text={this.intrl.manager.novote} colortype="c-purple" cardsize="sm-card" />)
                                            }
                                            <strong className="mtitle">{item.proposalTitle}</strong>
                                        </div>
                                        {
                                            item.proposalState === ProposalType.voting && (
                                                <div className="transparent-toupiao">
                                                    <span className="big-text">{this.intrl.manager.voting}</span>&nbsp;&nbsp;
                                                    <span className="sm-text">{this.intrl.manager.other} {this.computeVoteTime(item)}</span>
                                                </div>
                                            )
                                        }
                                        {
                                            item.proposalState === ProposalType.showing && (
                                                <div className="transparent-toupiao purple-gongshi">
                                                    <span className="big-text">{this.intrl.manager.showing}</span>&nbsp;&nbsp;
                                                    <span className="sm-text">{this.intrl.manager.other} {this.computeShowTime(item)}</span>
                                                </div>
                                            )
                                        }
                                        {
                                            item.proposalState === ProposalType.pass && <Card text={this.intrl.manager.pass} colortype="transparent-green" cardsize="md-sm-card" />
                                        }
                                        {
                                            item.proposalState === ProposalType.fail && <Card text={this.intrl.manager.notallow} colortype="transparent-red" cardsize="md-sm-card" />
                                        }
                                    </div>
                                    <div className="mcontent-down">
                                        <div className="mcontent-count">
                                            <span>{this.intrl.manager.request} </span>
                                            <strong className="count-right">{item.sharesRequested} {this.intrl.manager.gu}</strong>
                                            <span>{this.intrl.manager.gong} </span>
                                            <strong>{item.tokenTribute} {item.tokenTributeSymbol.toLocaleUpperCase()}</strong>
                                        </div>
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
                {/* 页面右边部分 */}
                {/* <div className="manager-right">
                    <Button text="发起预发布提案" btnSize="bg-bg-btn" onClick={this.handleToProposal} />
                    <h3 className="title-h3">退出</h3>
                    <div className="exit-wrapper">
                        <div className="exit-line">
                            <div className="exit-left">我的股数</div>
                            <div className="exit-right">
                                <input type="text" className="normal-exit-input readonly-input" readOnly={true} />
                            </div>
                        </div>
                        <div className="exit-line">
                            <div className="exit-left">退出股数</div>
                            <div className="exit-right">
                                <input type="text" className="normal-exit-input" />
                                <span className="amount-text">价值：10 ETH</span>
                            </div>
                        </div>
                        <div className="doing-btn">
                            <Button text="立即退出" btnSize="buy-btn" />
                        </div>
                    </div>
                </div> */}
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
    // private handleToProposal = () =>
    // {
    //     this.props.history.push('/molochproposal/' + this.props.molochinfo.projId)
    // }
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
          const voteTime = parseFloat(this.props.molochinfo.projInfo.votePeriod);
          const graceTime = parseFloat(this.props.molochinfo.projInfo.notePreriod);
          const endTime = graceTime+voteTime - agoTime;
          return onCountRemainTime(endTime)
        }else{
            return ''
        }
    }
}

export default injectIntl(MolochManager);
