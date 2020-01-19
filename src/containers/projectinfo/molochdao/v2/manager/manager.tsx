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
import { toMyNumber } from '@/utils/numberTool';

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
        this.handleComputeTimeIndex()
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
                            <li className={this.props.molochmanager.proposalMenuNum === '0' ? "title-li active" : "title-li"} onClick={this.handleShowListType.bind(this, '0')}>
                                预发布提案
                                {/* <span className="sm-graytime">（4小时30分钟后可用）</span> */}
                            </li>
                        </ul>
                    </div>
                    {
                        this.props.molochmanager.proposalMenuNum === '1' && (
                            <>
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
                                                    {/* 待处理期 */}
                                                    {
                                                        item.proposalState === ProposalType.Handling && (
                                                            <div className="transparent-toupiao green-willdo">
                                                                <span className="big-text">待处理</span>&nbsp;&nbsp;
                                                                <span className="sm-text">{this.intrl.manager.other} {this.computeProcessTime(item)}</span>
                                                            </div>
                                                        )
                                                    }
                                                    {/* 已通过 */}
                                                    {
                                                        item.proposalState === ProposalType.PassYes && <Card text={this.intrl.manager.pass} colortype="transparent-green" cardsize="md-sm-card" />
                                                    }
                                                    {/* 未通过 */}
                                                    {
                                                        (item.proposalState === ProposalType.PassNot || item.proposalState === ProposalType.HandleTimeOut) && (
                                                            <>
                                                                <Card text={this.intrl.manager.notallow} colortype="transparent-gray" cardsize="md-sm-card" />
                                                                {/* 未处理 */}
                                                                {
                                                                    item.handleState === '0' && (
                                                                        <div className="notdo-wrapper">
                                                                            <Card text={this.intrl.manager.doing} colortype="transparent-red" cardsize="md-sm-card" />
                                                                        </div>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className="mcontent-down mcontentv2-down">
                                                    {/* 贡献显示 */}
                                                    {
                                                        item.proposalType === '0' && (
                                                            <div className="mcontent-count">
                                                                <div>
                                                                    <span>{this.intrl.manager.request} </span>
                                                                    <strong className="count-right">{item.sharesRequested} {this.intrl.manager.gu} {item.lootRequested}无表决权股</strong>
                                                                </div>
                                                                <span>{this.intrl.manager.gong} </span>
                                                                <strong>{item.tributeOffered} {item.tributeOfferedSymbol && item.tributeOfferedSymbol.toLocaleUpperCase()}</strong>
                                                            </div>
                                                        )
                                                    }

                                                    {/* 支持代币 */}
                                                    {
                                                        item.proposalType === '1' && (
                                                            <div className="mcontent-count">
                                                                <div>
                                                                    <span>添加支持代币</span>
                                                                </div>
                                                                <strong>{item.tributeToken}</strong>
                                                            </div>
                                                        )
                                                    }
                                                    {/* 踢出成员 */}
                                                    {
                                                        item.proposalType === '2' && (
                                                            <div className="mcontent-count">
                                                                <div>
                                                                    <span>踢出成员</span>
                                                                </div>
                                                                <strong>{item.applicant}</strong>
                                                            </div>
                                                        )
                                                    }
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
                            </>
                        )
                    }
                    {
                        this.props.molochmanager.proposalMenuNum === '0' && (
                            <>
                                {
                                    this.props.molochmanager.proposalCount > 0 && this.props.molochmanager.proposalList.map((item: IMolochProposalList, index: number) =>
                                    {
                                        return (
                                            <div className="manager-list manager-ready-list" onClick={this.handleToInfo.bind(this, item)} key={index}>
                                                <div className="mcontent-top">
                                                    <div className="mcontent-title">
                                                        <span className="title-gray">#{item.proposalIndex}</span>&nbsp;&nbsp;&nbsp;
                                                        <strong className="mtitle">{item.proposalTitle ? item.proposalTitle : 'null'}</strong>
                                                    </div>
                                                    {
                                                        item.isMine && <Card text="我的" colortype="transparent-purple" cardsize="md-sm-card" />
                                                    }
                                                </div>
                                                <div className="mcontent-down mcontentv2-down">
                                                    {/* 贡献显示 */}
                                                    {
                                                        item.proposalType === '0' && (
                                                            <div className="mcontent-count">
                                                                <div>
                                                                    <span>{this.intrl.manager.request} </span>
                                                                    <strong className="count-right">{item.sharesRequested} {this.intrl.manager.gu} {item.lootRequested}无表决权股</strong>
                                                                </div>
                                                                <span>{this.intrl.manager.gong} </span>
                                                                <strong>{item.tributeOffered} {item.tributeOfferedSymbol && item.tributeOfferedSymbol.toLocaleUpperCase()}</strong>
                                                            </div>
                                                        )
                                                    }

                                                    {/* 支持代币 */}
                                                    {
                                                        item.proposalType === '1' && (
                                                            <div className="mcontent-count">
                                                                <div>
                                                                    <span>添加支持代币</span>
                                                                </div>
                                                                <strong>{item.tributeToken}</strong>
                                                            </div>
                                                        )
                                                    }
                                                    {/* 踢出成员 */}
                                                    {
                                                        item.proposalType === '2' && (
                                                            <div className="mcontent-count">
                                                                <div>
                                                                    <span>踢出成员</span>
                                                                </div>
                                                                <strong>{item.applicant}</strong>
                                                            </div>
                                                        )
                                                    }
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
                            </>
                        )
                    }

                </div>
                <ManagerRight {...this.props} />
            </div>
        );
    }
    private computeIndex = (newTime: number, createTime: number, betweenTime: number) =>
    {
        // （当前时间-项目创建时间）/间隔时间段         
        // （4.8*60*60----------向下取整）
        const agoTime = newTime - createTime;
        const index = Math.ceil(agoTime / betweenTime);
        return index
    }
    private handleComputeTimeIndex = () =>
    {
        if (!this.props.molochmanager.contractInfo || !this.props.molochinfo.projInfo)
        {
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
        if (this.props.molochmanager.proposalList.length > 0)
        {
            // 获取最新的一个提案
            const item: IMolochProposalList = this.props.molochmanager.proposalList[0];
            console.log("打印最新提案数据")
            console.log(JSON.stringify(this.props.molochmanager.proposalList[0]))
            console.log(this.props.molochmanager.proposalList[0].startingPeriod)
            console.log("最新提案时间")
            console.log(new Date())
            console.log(new Date(item.timestamp * 1000))
            const tianIndex = this.computeIndex(item.timestamp, startTime, betweenTime);
            console.log("nowIndex:" + nowIndex);
            console.log("tianIndex:" + tianIndex)
            if (nowIndex === tianIndex)
            {
                // 计算剩余的时间
                const latestIndexTime = (nowIndex + 1) * betweenTime;
                const endTime = latestIndexTime + startTime;
                const remainTime = endTime - nowTime;
                console.log(remainTime)
                let h = 0;
                let m = 0;
                let s = 0;
                let str = '';
                if (remainTime >= 0)
                {
                    h = Math.floor(remainTime / (60 * 60) % 24);
                    m = Math.floor(remainTime / 60 % 60);
                    s = Math.floor(remainTime % 60);
                    if (h > 0)
                    {
                        str = h + this.intrl.manager.hours;
                    }
                    if (m > 0)
                    {
                        str = str + m + this.intrl.manager.min;
                    }
                    console.log(s)
                    if (s > 0)
                    {
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
    // 选择查看什么类型的提案
    private handleShowListType = (num: string) =>
    {
        this.props.molochmanager.proposalMenuNum = num;
        this.props.molochmanager.proposalPage = 1;
        this.props.molochmanager.proposalList = [];
        this.props.molochmanager.getMolochProposalList(this.props.molochinfo.projId);
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
    // 计算处理期倒计时
    private computeProcessTime = (item: IMolochProposalList) =>
    {
        // 处理期剩余时间=投票时间+公示时间+处理时间-（当前时间-发布合约的时间点）
        const nowTime = new Date().getTime() / 1000;
        const nowTimeInt = parseInt(nowTime.toString(), 10);
        const agoTime = nowTimeInt - item.timestamp;
        if (this.props.molochinfo.projInfo)
        {
            const voteTime = parseFloat(this.props.molochinfo.projInfo.votePeriod);
            const graceTime = parseFloat(this.props.molochinfo.projInfo.notePeriod);
            let processTime = 0;
            if (this.props.molochmanager.contractInfo)
            {
                processTime = toMyNumber(this.props.molochmanager.contractInfo.emergencyExitWait).mul(this.props.molochmanager.contractInfo.periodDuration).value;
            }
            // const processTime = parseFloat(this.props.molochinfo.projInfo)
            const endTime = processTime + graceTime + voteTime - agoTime;
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
}

export default injectIntl(MolochManager);
