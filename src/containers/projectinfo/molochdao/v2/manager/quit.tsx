/**
 * 退股模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../../interface/molochinfo.interface';
import { toMyNumber, saveDecimal } from '@/utils/numberTool';
import Hint from '@/components/hint';

interface IState
{
    valueShow:string  // 退出股数的价值显示
    exitShareInput:string // 退出股份的输入    
}

@observer
class QuitMolochProject extends React.Component<IMolochInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        valueShow:'',
        exitShareInput:''
    }
    public render()
    {
        if (!this.props.molochinfo.projInfo)
        {
            return null;
        }
        return (
                <>
                    <h3 className="title-h3">
                        {this.intrl.manager.quit}
                        <Hint
                            text="同时持有普通股份和无表决权股份时，优先退出无表决权股份。"
                            hintType="right-hint"
                        />
                    </h3>
                    <div className="exit-wrapper">
                        <div className="exit-line">
                            <div className="exit-left">{this.intrl.manager.mygu}</div>
                            <div className="exit-right">
                                <input type="text" className="normal-exit-input readonly-input" readOnly={true} value={this.props.molochmanager.proposalBalance} />
                            </div>
                        </div>
                        <div className="exit-line">
                            <div className="exit-left">{this.intrl.manager.quitgu}</div>
                            <div className="exit-right">
                                <input type="text" className="normal-exit-input" value={this.state.exitShareInput} onChange={this.handleChangeExitNumber} />
                                {
                                    this.state.exitShareInput && (
                                        <div className="value-wrapper">
                                            <span className="amount-text">{this.intrl.manager.value}：{this.state.valueShow} {this.props.molochinfo.projInfo.fundSymbol.toLocaleUpperCase()}</span>
                                            <div className="amount-box">
                                                <p>11.111 Eth</p>
                                                <p>11.111 Eth</p>
                                                <p>11.111 Eth</p>
                                            </div>
                                        </div>
                                    )
                                }
                                                         
                            </div>
                        </div>
                        <div className="doing-btn">
                            <Button text={this.intrl.btn.quit} btnSize="buy-btn" onClick={this.handleSendQuitShares} />
                        </div>
                    </div>
                </>
        );
    }
    // 退出股数的输入
    private handleChangeExitNumber = (ev: React.ChangeEvent<HTMLInputElement>)=>{
        
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        const reg = /^[0-9]*[1-9][0-9]*$/;
        if (value.toString().length > 0)
        {
            if (!reg.test(ev.target.value))
            {
                return false;
            }
        }
        const num = value-this.props.molochmanager.proposalBalance;
        this.setState({
            exitShareInput:num>0?this.props.molochmanager.proposalBalance.toString():value.toString()
        },()=>{
            // 计算价值
            // 退出股数的价值=退出股数*每股价值
            const everyNum = this.props.molochinfo.projInfo?this.props.molochinfo.projInfo.valuePerShare:0
            const exitValue = toMyNumber(this.state.exitShareInput).mul(everyNum).toString()
            this.setState({
                valueShow:parseFloat(saveDecimal(exitValue, 6)).toString()
            })
        })
        return true
    }
    // 发送退出股数请求
    private handleSendQuitShares =async ()=>{
        // 未登录
        if (!this.props.common.userInfo)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false;
        }
        // 未输入，输入为零
        if(!this.state.exitShareInput||parseFloat(this.state.exitShareInput)<=0){
            return false;
        }
        const res = await this.props.metamaskwallet.inintWeb3();
        if(res){
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
            // 0x4876164b90e82617fDf71feDaFF317E3ED0194ad
            const value = parseInt(this.state.exitShareInput,10);
            const res2 = await this.props.molochmanager.quitSharesV2(value,value, this.props.common.userInfo.address);
            if (res2)
            {
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
            } else
            {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
            }
            this.setState({
                exitShareInput:''
            })
        }
        return true;
    }
}

export default injectIntl(QuitMolochProject);
