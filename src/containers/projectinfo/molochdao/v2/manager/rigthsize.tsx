/**
 * 治理列表页面右边部分
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../../interface/molochinfo.interface';
import QuitProject from './quit';
import { Input } from 'antd';

interface IState
{
    showEntrust: boolean,  // 显示委托窗口
    addrInput: string, // 权限委托的地址
    addrBtn: boolean, // 权限委托的确认按钮
}

@observer
class ManagerRightSizeV2 extends React.Component<IMolochInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        showEntrust: false,
        addrInput: '',
        addrBtn: false
    }
    public render()
    {
        return (
            <div className="manager-right">
                <Button text="发起预发布提案" btnSize="bg-bg-btn" onClick={this.handleToProposal} />
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
        // 验证是否登录
        if (!this.props.common.userInfo)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
        } else
        {
            this.props.history.push('/proposalv2/menu/' + this.props.molochinfo.projId);
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
            const res2 = await this.props.molochmanager.changeDelegateKeyV2(this.props.common.userInfo.address, this.props.common.userInfo.address);
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
            const res2 = await this.props.molochmanager.changeDelegateKeyV2(this.state.addrInput, this.props.common.userInfo.address);
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

}

export default injectIntl(ManagerRightSizeV2);
