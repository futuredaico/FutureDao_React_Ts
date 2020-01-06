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
import QuitProject from './quit';
import { Input } from 'antd';

interface IState
{
    showEntrust: boolean,  // 显示委托窗口
    addrInput: string, // 权限委托的地址
    addrBtn: boolean, // 权限委托的确认按钮
    sendTime: string // 可发起提案剩余时间
}

@observer
class ManagerRightSizeV2 extends React.Component<IMolochInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        showEntrust: false,
        addrInput: '',
        addrBtn: false,
        sendTime: ''
    }
    public async componentDidMount()
    {
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
            <div className="manager-right">
                {
                    (!!!this.state.sendTime || (this.props.molochmanager.upAddress && this.props.molochmanager.upBalance > 0)) ? <Button text={this.intrl.btn.proposal} btnSize="bg-bg-btn" onClick={this.handleToProposal} />
                        : (
                            <div className="notallow-wrapper">
                                <span>发起预发布提案</span>
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
                    this.props.history.push('/sendproposalv2/menu/' + this.props.molochinfo.projId)
                }
            } else
            {
                if (this.props.molochmanager.proposalBalance <= 0)
                {
                    this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.membererr);
                }
                else
                {
                    this.props.history.push('/sendproposalv2/menu/' + this.props.molochinfo.projId)
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

export default injectIntl(ManagerRightSizeV2);
