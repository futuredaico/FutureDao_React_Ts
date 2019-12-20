/**
 * 退股模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../interface/molochinfo.interface';
import { toMyNumber } from '@/utils/numberTool';

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
                    <h3 className="title-h3">退出</h3>
                    <div className="exit-wrapper">
                        <div className="exit-line">
                            <div className="exit-left">我的股数</div>
                            <div className="exit-right">
                                <input type="text" className="normal-exit-input readonly-input" readOnly={true} value={this.props.molochmanager.proposalBalance} />
                            </div>
                        </div>
                        <div className="exit-line">
                            <div className="exit-left">退出股数</div>
                            <div className="exit-right">
                                <input type="text" className="normal-exit-input" value={this.state.exitShareInput} onChange={this.handleChangeExitNumber} />
                                {
                                    this.state.exitShareInput && <span className="amount-text">价值：{this.state.valueShow} {this.props.molochinfo.projInfo.fundSymbol.toLocaleUpperCase()}</span>
                                }                                
                            </div>
                        </div>
                        <div className="doing-btn">
                            <Button text="立即退出" btnSize="buy-btn" />
                        </div>
                    </div>
                </>
        );
    }
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
                valueShow:exitValue
            })
        })
        return true
    }
}

export default injectIntl(QuitMolochProject);
