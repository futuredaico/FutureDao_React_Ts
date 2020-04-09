import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import Button from '@/components/Button';
import { IProjectInfoProps } from '../../interface/projectinfo.interface';
import { saveDecimal, toMyNumber,toNonExponential } from '@/utils/numberTool';
import Hint from '@/components/hint';

interface IState
{
    buyPrice: string,   // 买入花费（显示的数据）
    wholeBuyPrice: string, // 计算出来的花费(也就是完整的数据)
    buyCount: string,   // 买入数量
    buyOnePrice: string,   // 买入花费单价
    isCanBuyBtn: boolean, // 是否可以买入
    isShowBalance: boolean, // 是否显示余额
    isError: boolean, // 是否余额超支
    balance: string, // 当前连接账户余额（显示的数据）
    wholeBalance: string, // 当前连接账户余额(也就是完整的数据)
    minBuyCount: string,   // 至少获得多少代币（买入）
    address:string, // 当前登陆的地址
    idDoingBuy:boolean // 是否点击了按钮
}

@observer
export default class RightTable extends React.Component<IProjectInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        buyPrice: '',
        wholeBuyPrice: '',
        buyCount: '',
        buyOnePrice: '',
        isCanBuyBtn: false,
        isShowBalance: false,
        isError: false,
        balance: '0',
        wholeBalance: '0',
        minBuyCount: '',
        address:'',
        idDoingBuy:false
    }
    public componentDidMount()
    {
        this.handleCheckLinkWallet();
    }
    public componentDidCatch(error, info) {
        console.log(error)
        // const isNewError = (error.toString() !== this.state.prevError.toString());// should only run once
        // if (isNewError) {//判断两次错误不一致才再次执行，不然一直循环
        //   this.logErrorToMyService(error, info);
        //   this.setState({ prevError: error });
        // }
      }
    public render()
    {
        if (!this.props.projectinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="tran-des buy-in">
                <div className="buy-line">
                    <div className="buy-left">买入量</div>
                    <div className="buy-right">
                        <input type="text" className="normal-buy-input input-otherpadding" onChange={this.onChangeBuyCount} value={this.state.buyCount} />
                    </div>
                </div>
                <div className="buy-line">
                    <div className="buy-left">花费</div>
                    <div className="buy-right">
                        <input type="text" className={this.state.isError ? "normal-buy-input error-input" : "normal-buy-input"} onChange={this.onChangeBuySpend} value={this.state.buyPrice} />
                        <span className="asset-text">{this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span>
                        {
                            this.state.isShowBalance && <span className="amount-text">余额：{this.state.balance} {this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span>
                        }
                    </div>
                </div>
                <div className="buy-line">
                    <div className="buy-left">均价</div>
                    <div className="buy-right">
                        <input type="text" className="normal-buy-input readonly-input" readOnly={true} value={parseFloat(this.state.buyOnePrice) === 0 ? '0' : this.state.buyOnePrice} />
                        <span className="asset-text">{this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span>
                    </div>
                </div>
                <div className="attention-wrapper">
                    <Hint
                        text="由于代币价格一直在变化，实际成交价会与计算价格略有差异，差异超过2%时交易将会失败。"
                        hintType="top-hint"
                        type='2'
                    />
                    <div className="attention-textdiv">
                        <p className="sm-p">您将花费 <span className="purple-text">{this.state.buyPrice ? this.state.buyPrice : '0'} {this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span></p>
                        <p className="sm-p">将至少会获得 <span className="purple-text">{this.state.buyCount ? this.state.minBuyCount : '0'} {this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.tokenSymbol.toLocaleUpperCase()}</span></p>
                    </div>
                </div>
                <div className="doing-btn">
                    <Button text="Buy" btnColor={(this.state.isCanBuyBtn && !this.state.isError) ? "green-btn" : 'gray-btn'} btnSize="buy-btn" onClick={this.onBuy} />
                </div>
            </div>

        )
    }
    // 检验是否连接了钱包
    private handleCheckLinkWallet = async () =>
    {
        if (this.props.common.userInfo)
        {
            
            // 检测是否连接钱包
            if (this.props.projectinfo.projInfo)
            {
                // 获取MetaMask钱包上登陆的地址
                await this.props.metamaskwallet.inintWeb3();
                
                if (!this.props.metamaskwallet.metamaskAddress)
                {
                    this.setState({
                        isCanBuyBtn: false,
                        isShowBalance: false
                    })
                    return false;
                }
                let balance = '';
                if(this.props.projectinfo.projInfo){                   
                    balance = await this.props.transation.getCanUseBalance(this.props.metamaskwallet.metamaskAddress,this.props.projectinfo.projInfo.fundHash);
                    this.props.transation.getSlopeData();
                } 
                console.log(balance)
                this.setState({
                    isCanBuyBtn: true,
                    isShowBalance: true,
                    balance: balance?saveDecimal(balance, 6):"0",
                    wholeBalance: saveDecimal(balance, 18),
                    address:this.props.metamaskwallet.metamaskAddress
                })
            }
            
        }
        else
        {
            // 假如没有登陆
            this.setState({
                isCanBuyBtn: false,
                isShowBalance: false,
                balance:"0",
                wholeBalance:"0",
                address:''
            })
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }
        return true;
    }
    // 买入量的输入
    private onChangeBuyCount = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        // 只能输入数字，整数
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
        this.setState({
            buyCount: value.toString()
        }, () =>
            {
                if (this.state.buyCount === '')
                {
                    this.setState({
                        buyPrice: '',
                        wholeBuyPrice: '',
                        buyOnePrice: '',
                        minBuyCount: '0'
                    })
                } else
                {
                    // 计算购买代币需要花费多少eth, eth保留小数6位显示
                    const res = this.props.transation.computeBuyCountSpendPrice(this.state.buyCount);
                    this.setState({
                        buyPrice: saveDecimal(res, 6),
                        wholeBuyPrice: saveDecimal(res, 18),
                        isError: false
                    }, () =>
                        {
                            this.handleComputeOneBuyPrice();
                            this.handleComputePriceDiff(this.state.buyCount);
                            if (this.state.isShowBalance)
                            {
                                // 有余额时
                                this.handleCheckBalance()
                            }
                        })
                }
            })
        return true;
    }
    // 检测花费的余额够不够
    private handleCheckBalance = () =>
    {
        const num1 = parseFloat(this.state.wholeBuyPrice);
        const num2 = parseFloat(this.state.wholeBalance);
        if (num2 - num1 < 0)
        {
            this.setState({
                isError: true
            })
        }
    }

    // 买入的花费的输入
    private onChangeBuySpend = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        // 只能输入数字
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }

        this.setState({
            buyPrice: saveDecimal(value.toString(), 6),
            wholeBuyPrice: saveDecimal(value.toString(), 6),
            isError: false
        }, () =>
            {
                if (this.state.buyPrice === '')
                {
                    this.setState({
                        buyCount: '',
                        buyOnePrice: '',
                        wholeBuyPrice: '',
                        minBuyCount: '0'
                    })
                } else
                {
                    if (parseFloat(this.state.buyPrice) === 0)
                    {
                        this.setState({
                            buyCount: '0',
                            buyOnePrice: '0',
                            wholeBuyPrice: '0',
                            minBuyCount: '0'
                        })
                    } else
                    {
                        if (this.state.isShowBalance)
                        {
                            // 有余额时
                            this.handleCheckBalance()
                        }
                        // 计算花费多少eth购买得到多少代币, 取整
                        const count = this.props.transation.computeSpendPriceBuyCount(this.state.buyPrice);
                        this.setState({
                            buyCount: parseInt(count, 10).toString()
                        }, () =>
                            {
                                this.handleComputeOneBuyPrice();
                                this.handleComputePriceDiff(this.state.buyCount);
                            });
                    }
                }
            })
        return true;
    }
    // 计算代币买入的均价
    private handleComputeOneBuyPrice = () =>
    {
        if (parseFloat(this.state.buyCount) === 0)
        {
            this.setState({
                buyOnePrice: '0'
            })
        } else
        {
            const buyNum = toMyNumber(this.state.buyPrice).div(this.state.buyCount);
            const oneBuyPrice = toNonExponential(buyNum.value);
            this.setState({
                buyOnePrice: saveDecimal(oneBuyPrice, 6)
            })
        }
    }

    // 买入
    private onBuy = async () =>
    {
        if (this.state.isError)
        {
            return false;
        }
        if (!this.state.buyCount || parseInt(this.state.buyCount, 10) === 0||this.state.address==='')
        {
            return false;
        }
        if(this.state.idDoingBuy){
            return false;
        }
        try
        {
            // 点击了
            this.setState({
                idDoingBuy:true
            })
            const txid = await this.props.transation.buy(this.state.address,this.state.minBuyCount, this.state.wholeBuyPrice,"0");
            console.log(txid);
            this.setState({
                idDoingBuy:false
            })
            if(!!txid){
                this.props.common.openNotificationWithIcon('success', "操作成功", "买入操作已发送，请等待确认");
                this.initState();
            }else{
                this.props.common.openNotificationWithIcon('error', "操作失败", "买入操作失败");
            }            
        } catch (error)
        {
            console.log("err",error)
            this.props.common.openNotificationWithIcon('error', "操作失败", "买入操作失败");
        }
        return true;
    }
    // 计算价格差
    private handleComputePriceDiff = (num: string) =>
    {
        if (parseFloat(num) === 0)
        {
            this.setState({
                minBuyCount: '0'
            })
        }
        const count = toMyNumber(num).mul(0.98);
        const intNum =toNonExponential(count.value);
        this.setState({
            minBuyCount: parseInt(intNum, 10).toString()
        })
    }
    // 初始化state
    private initState = ()=>{
        this.setState({
            buyPrice: '',
            wholeBuyPrice: '',
            buyCount: '',
            buyOnePrice: '',
            isError: false,
            minBuyCount: '',
        })
    }
}

