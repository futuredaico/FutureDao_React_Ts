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
import { Pagination, Input } from 'antd';
import { IMolochProposalList, ProposalType } from '../interface/molochmanager.interface';
import { onCountRemainTime } from '@/utils/formatTime';
import QuitProject from './quit';

interface IState
{
    showListType: number,
    showEntrust: boolean,  // 显示委托窗口
    addrInput: string, // 权限委托的地址
    addrBtn: boolean, // 权限委托的确认按钮
    sendTime: string // 可发起提案剩余时间
}

@observer
class MolochManager extends React.Component<IMolochInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        showListType: 1,
        showEntrust: false,
        addrInput: '',
        addrBtn: false,
        sendTime: ''
    }
    public async componentDidMount()
    {
        await this.props.molochmanager.getMolochProposalList(this.props.molochinfo.projId);
        this.props.molochmanager.getContractInfo(this.props.molochinfo.projId)
        if (this.props.common.userInfo)
        {
            await this.props.molochmanager.getTokenBalance(this.props.molochinfo.projId, this.props.common.userInfo.address)
            await this.props.molochmanager.getUpStreamData(this.props.molochinfo.projId, this.props.common.userInfo.address)
        }
        this.handleComputeTimeIndex();
        // 发起提案资格显示(委托人不是自己)
        if (this.props.molochmanager.proposalAddress && this.props.common.userInfo && this.props.common.userInfo.address && this.props.common.userInfo.address.toLocaleLowerCase() !== this.props.molochmanager.proposalAddress)
        {
            this.setState({
                sendTime: this.intrl.manager.no
            })
        }
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
                            <li className={this.props.molochmanager.proposalMenuNum === 2 ? "title-li active" : "title-li"} onClick={this.handleShowListType.bind(this, 2)}>
                                预发布提案<span className="sm-graytime">（4小时30分钟后可用）</span>
                            </li>
                        </ul>
                    </div>
                    {
                        this.props.molochmanager.proposalMenuNum === 1 && (
                            <>
                                {
                                    this.props.molochmanager.proposalCount > 0 && this.props.molochmanager.proposalList.map((item: IMolochProposalList, index: number) =>
                                    {
                                        return (
                                            <div className="manager-list" onClick={this.handleToInfo.bind(this, item)} key={index}>
                                                <div className="mcontent-top">
                                                    <div className="mcontent-title">
                                                        {
                                                            (this.props.common.userInfo && this.props.molochmanager.proposalBalance > 0) && (item.hasVote ? <Card text={this.intrl.manager.yesvote} colortype="block-gray" cardsize="sm-card" /> : <Card text={this.intrl.manager.novote} colortype="c-purple" cardsize="sm-card" />)
                                                        }
                                                        <strong className="mtitle">{item.proposalTitle ? item.proposalTitle : 'null'}</strong>
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
                                                    {
                                                        (item.proposalState === ProposalType.pass || item.proposalState === ProposalType.fail) && item.handleState === '0' && <Card text={this.intrl.manager.doing} colortype="transparent-purple" cardsize="md-sm-card" />
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
                            </>
                        )
                    }
                    {
                        this.props.molochmanager.proposalMenuNum === 2 && (
                            <></>
                        )
                    }

                </div>
                {/* 页面右边部分 */}
                <div className="manager-right">
                    {
                        (!!!this.state.sendTime || (this.props.molochmanager.upAddress && this.props.molochmanager.upBalance > 0)) ? <Button text={this.intrl.btn.proposal} btnSize="bg-bg-btn" onClick={this.handleToProposal} />
                            : (
                                <div className="notallow-wrapper">
                                    <span>{this.intrl.btn.proposal}</span>
                                    <span className="sm-time">{this.state.sendTime}</span>
                                </div>
                            )
                    }
                    {
                        this.props.molochmanager.proposalBalance > 0 && (
                            <div className="entrust-btn">
                                {
                                    (this.props.molochmanager.proposalAddress === '' || (this.props.common.userInfo && this.props.common.userInfo.address && this.props.common.userInfo.address.toLocaleLowerCase() === this.props.molochmanager.proposalAddress))
                                        ? <Button text={this.intrl.btn.weituo} btnSize="bg-bg-btn" onClick={this.handleToShowEntrust} />
                                        : <Button text={this.intrl.btn.cweituo} btnSize="bg-bg-btn" onClick={this.handleToCancelEntrust} />
                                }
                            </div>
                        )
                    }
                    <QuitProject {...this.props} />
                </div>
                {
                    this.state.showEntrust && (
                        <div className="entrust-wrapper">
                            <div className="entrust-content">
                                <div className="entrust-close">
                                    <img src={require('@/img/close2.png')} alt="close2.png" onClick={this.handleToCloseEntrust} className="close-icon" />
                                </div>
                                <div className="entrust-title"><strong>{this.intrl.btn.weituo}</strong></div>
                                <div className="entrust-write">
                                    <span className="entrust-span">{this.intrl.manager.address}</span>
                                    <Input
                                        value={this.state.addrInput}
                                        onChange={this.handleChangeAddrInput}
                                        onBlur={this.handleCheckAddrByMetamask}
                                    />
                                    <p className="entrust-tips"><span className="red-type">*</span><span className="gray-text">{this.intrl.manager.tips}</span></p>
                                    <div className="entrustbtn-wrap">
                                        <Button text={this.intrl.btn.comfirm} btnSize="stop-btn" onClick={this.handleComfirmEntrust} btnColor={this.state.addrBtn ? '' : 'gray-btn'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
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
    // 发起提案(变成预发布提案)
    private handleToProposal = () =>
    {
        // 验证是否登陆
        if (!this.props.common.userInfo)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
        } else
        {
            // 是否被别人委托了
            if (this.props.molochmanager.upAddress)
            {
                // 委托人资金为0了
                if (this.props.molochmanager.upBalance <= 0)
                {
                    this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.membererr);
                } else
                {
                    this.props.history.push('/molochproposal/' + this.props.molochinfo.projId)
                }
            } else
            {
                if (this.props.molochmanager.proposalBalance <= 0)
                {
                    this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.membererr);
                }
                else
                {
                    this.props.history.push('/molochproposal/' + this.props.molochinfo.projId)
                }
            }
        }

    }
    // 查看提案详情
    private handleToInfo = (item: IMolochProposalList) =>
    {
        this.props.molochinfo.isShowManagerInfo = true;
        this.props.molochmanager.proposalIndex = item.proposalIndex;
        this.props.molochmanager.proposalListItem = item;
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
    // 委托地址的输入
    private handleChangeAddrInput = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            addrInput: ev.target.value.trim()
        }, () =>
        {
            this.handleCheckAddrByMetamask();
        })
    }
    // 校验输入地址格式是否正确（meta mask的地址）
    private handleCheckAddrByMetamask = () =>
    {
        const res = web3.isAddress(this.state.addrInput);
        this.setState({
            addrBtn: res
        })
    }
    // 取消权限委托
    private handleToCancelEntrust = async () =>
    {
        if (!this.props.common.userInfo)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }
        await this.props.metamaskwallet.inintWeb3();
        const res = await this.props.molochmanager.changeDelegateKey(this.props.common.userInfo.address, this.props.common.userInfo.address);
        if (res)
        {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
        } else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
        }
        return true;
    }
    // 打开权限委托窗口
    private handleToShowEntrust = () =>
    {
        this.setState({
            showEntrust: true
        })
    }
    // 确认权限委托
    private handleComfirmEntrust = async () =>
    {
        if (!this.state.addrBtn)
        {
            return false;
        }
        if (!this.props.common.userInfo)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }

        await this.props.metamaskwallet.inintWeb3();
        // 0x4876164b90e82617fDf71feDaFF317E3ED0194ad
        const res = await this.props.molochmanager.changeDelegateKey(this.state.addrInput, this.props.common.userInfo.address);
        if (res)
        {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
        } else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
        }
        this.handleToCloseEntrust();
        return true;
    }
    // 关闭权限委托窗口
    private handleToCloseEntrust = () =>
    {
        //
        this.setState({
            showEntrust: false
        })
    }
    // 计算时间区间所在周期    
    private computeIndex = (newTime: number, createTime: number, betweenTime: number) =>
    {
        // （当前时间-项目创建时间）/4.8*60*60----------向下取整
        const agoTime = newTime - createTime;
        const index = Math.floor(agoTime / betweenTime);
        return index
    }
    // 计算是否可发起提案
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
        console.log("nowIndex:" + nowIndex);
        if (this.props.molochmanager.proposalList.length > 0)
        {
            // 获取最新的一个提案
            const item: IMolochProposalList = this.props.molochmanager.proposalList[0];
            console.log("最新提案时间")
            console.log(new Date())
            console.log(new Date(item.timestamp * 1000))
            const tianIndex = this.computeIndex(item.timestamp, startTime, betweenTime);
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
}

export default injectIntl(MolochManager);
