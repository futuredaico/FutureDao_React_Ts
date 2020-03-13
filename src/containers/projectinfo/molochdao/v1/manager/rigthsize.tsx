/**
 * 治理列表页面右边部分
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../../interface/molochinfo.interface';
import { IMolochProposalList } from '../../interface/molochmanager.interface';
import { Input } from 'antd';
import { when } from 'mobx';

interface IState
{
    showEntrust: boolean,  // 显示委托窗口
    addrInput: string, // 权限委托的地址
    addrBtn: boolean, // 权限委托的确认按钮
    sendTime: string // 可发起提案剩余时间
}

@observer
class ManagerRigthSize extends React.Component<IMolochInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        showEntrust: false,
        addrInput: '',
        addrBtn: false,
        sendTime: ''
    }
    public async componentDidMount()
    {
        // 发起提案资格显示(委托人不是自己)
        if (this.props.molochmanager.proposalAddress && this.props.common.userInfo && this.props.common.userInfo.address && this.props.common.userInfo.address.toLocaleLowerCase() !== this.props.molochmanager.proposalAddress)
        {
            this.setState({
                sendTime: this.intrl.manager.no
            })
        }
        when(
            () => this.props.molochmanager.proposalList.length > 0,
            () => this.handleComputeTimeIndex()
        )
    }
    public render()
    {
        return (
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
    // 发起提案(变成预发布提案)
    private handleToProposal = () =>
    {
        // 验证是否登录
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
                    this.props.history.push('/proposalv1/' + this.props.molochinfo.projId)
                }
            } else
            {
                if (this.props.molochmanager.proposalBalance <= 0)
                {
                    this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.membererr);
                }
                else
                {
                    this.props.history.push('/proposalv1/' + this.props.molochinfo.projId)
                }
            }
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
        const res = await this.props.metamaskwallet.inintWeb3();
        if (res)
        {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
            const res2 = await this.props.molochmanager.changeDelegateKey(this.props.common.userInfo.address, this.props.common.userInfo.address);
            if (res2)
            {
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
            } else
            {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
            }
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
        const res = await this.props.metamaskwallet.inintWeb3();
        if (res)
        {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
            // 0x4876164b90e82617fDf71feDaFF317E3ED0194ad
            const res2 = await this.props.molochmanager.changeDelegateKey(this.state.addrInput, this.props.common.userInfo.address);
            if (res2)
            {
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
            } else
            {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
            }
            this.handleToCloseEntrust();
        }
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
        // （当前时间-项目创建时间）/间隔时间段         
        // （4.8*60*60----------向下取整）
        const agoTime = newTime - createTime;
        const index = Math.ceil(agoTime / betweenTime);
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

        const nowIndex = this.computeIndex(nowTimeInt, startTime, betweenTime);
        if (this.props.molochmanager.proposalList.length > 0)
        {
            // 获取最新的一个提案
            const item: IMolochProposalList = this.props.molochmanager.proposalList[0];
            console.log("打印最新提案数据")
            // console.log(JSON.stringify(this.props.molochmanager.proposalList[0]))
            console.log(this.props.molochmanager.proposalList[0].proposalTitle)
            const tianIndex = this.computeIndex(item.timestamp, startTime, betweenTime);
            console.log("nowIndex:" + nowIndex);
            console.log("tianIndex:" + tianIndex)
            console.log("betweenTime:" + betweenTime)
            if (nowIndex < tianIndex)
            {
                // 计算剩余的时间
                const latestIndexTime = (nowIndex + 2) * betweenTime;
                const endTime = latestIndexTime + startTime;
                const remainTime = endTime - nowTime;
                console.log(remainTime)
                this.computeCountTime(remainTime);
            }
            else if (nowIndex === tianIndex)
            {
                // 计算剩余的时间
                const latestIndexTime = (nowIndex + 1) * betweenTime;
                const endTime = latestIndexTime + startTime;
                const remainTime = endTime - nowTime;
                console.log(remainTime)
                this.computeCountTime(remainTime);
            }
        }
        return true;
    }
    private computeCountTime = (remainTime: number) =>
    {
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

export default injectIntl(ManagerRigthSize);
