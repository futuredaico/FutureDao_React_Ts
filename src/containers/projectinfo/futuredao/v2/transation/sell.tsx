import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import Button from '@/components/Button';
import { IProjectInfoProps } from '../../interface/projectinfo.interface';
import { saveDecimal, toMyNumber,toNonExponential } from '@/utils/numberTool';
import Hint from '@/components/hint';

interface IState
{
    sellPrice: string,  // 卖出所得金额（显示的数据）
    wholeSellPrice: string, // 卖出所得计算的花费(也就是完整的数据)
    sellCount: string,  // 卖出数量
    sellOnePrice: string,  // 卖出单价
    isCanSellBtn: boolean, // 是否可以卖出
    isShowBalance: boolean, // 是否显示余额
    isError: boolean, // 是否余额超支
    balance: string, // 当前连接账户余额    
    minSellPrice: string, // 至少获得多少资金（卖出）
    wholeMinSell: string, // 至少获得多少资金（卖出）(完整的数据)
    address: string // 当前登陆的地址
    idDoingSell:boolean // 是否点击了卖出按钮
}

@observer
export default class RightTable extends React.Component<IProjectInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        sellPrice: '',
        wholeSellPrice: '',
        sellCount: '',
        sellOnePrice: '',
        isCanSellBtn: false,
        isShowBalance: false,
        isError: false,
        balance: '0',
        minSellPrice: '',
        wholeMinSell: '',
        address: '',
        idDoingSell:false
    }
    public async componentDidMount()
    {
        this.handleCheckLinkWallet();
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
                    <div className="buy-left">卖出量</div>
                    <div className="buy-right">
                        <input type="text" className={this.state.isError ? "normal-buy-input input-otherpadding error-input" : "normal-buy-input input-otherpadding"} onChange={this.onChangeSellCount} value={this.state.sellCount} />
                        {
                            this.state.isShowBalance && <span className="amount-text">余额：{this.state.balance}</span>
                        }
                    </div>
                </div>
                <div className="buy-line">
                    <div className="buy-left">获得</div>
                    <div className="buy-right">
                        <input type="text" className="normal-buy-input" onChange={this.onChangeSellSpend} value={this.state.sellPrice} />
                        <span className="asset-text">{this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span>
                    </div>
                </div>
                <div className="buy-line">
                    <div className="buy-left">均价</div>
                    <div className="buy-right">
                        <input type="text" className="normal-buy-input readonly-input" readOnly={true} value={parseFloat(this.state.sellOnePrice) === 0 ? '0' : this.state.sellOnePrice} />
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
                        <p className="sm-p">您将出售 <span className="purple-text">{this.state.sellCount ? this.state.sellCount : '0'} {this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.tokenSymbol.toLocaleUpperCase()}</span></p>
                        <p className="sm-p">将至少会获得 <span className="purple-text">{this.state.sellPrice ? this.state.minSellPrice : '0'} {this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span></p>
                    </div>
                </div>
                <div className="doing-btn">
                    <Button text="Sell" btnColor={(this.state.isCanSellBtn && !this.state.isError) ? "red-red" : 'gray-btn'} btnSize="buy-btn" onClick={this.onSell} />
                </div>
            </div>
        )
    }
    private handleCheckLinkWallet = async () =>
    {
        if (this.props.common.userInfo)
        {
            
            // 检测是否连接钱包
            if (this.props.projectinfo.projInfo)
            {
                // 获取MetaMask钱包上登陆的地址
                await this.props.metamaskwallet.inintWeb3();
                const checkRes = await this.props.metamaskwallet.checkIsCurrendBindAddress();
                // 若与绑定的地址不一致
                if (!checkRes)
                {
                    this.setState({
                        isCanSellBtn: false,
                        isShowBalance: false
                    })
                    return false
                }
                if (!this.props.metamaskwallet.metamaskAddress)
                {
                    this.setState({
                        isCanSellBtn: false,
                        isShowBalance: false
                    })
                    return false;
                }
                // 获取可出售的持有余额
                await this.props.transation.getTokenBalance(this.props.metamaskwallet.metamaskAddress);

                this.setState({
                    isCanSellBtn: true,
                    isShowBalance: true,
                    balance: this.props.transation.tokenBalanceInfo.availableAmt,
                    address: this.props.metamaskwallet.metamaskAddress
                })
            }
        }
        else
        {
            // 假如没有登陆
            this.setState({
                isCanSellBtn: false,
                isShowBalance: false,
                address: ''
            })
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
        }
        return true;
    }
    // 检测出售的余额够不够
    private handleCheckSellBalance = () =>
    {
        const num1 = parseFloat(this.state.sellCount);
        const num2 = parseFloat(this.state.balance);
        if (num2 - num1 < 0)
        {
            this.setState({
                isError: true
            })
        }
    }
    // 卖出量的输入
    private onChangeSellCount = (ev: React.ChangeEvent<HTMLInputElement>) =>
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
            sellCount: value.toString(),
            isError: false
        }, async () =>
            {
                if (this.state.sellCount === '')
                {
                    this.setState({
                        sellPrice: '',
                        sellOnePrice: '',
                        wholeSellPrice: '',
                        minSellPrice: '0',
                        wholeMinSell: '0'
                    })
                } else
                {
                    this.handleCheckSellBalance();
                    // 计算出售代币获得多少eth, eth保留小数6位
                    const res = await this.props.transation.computeSellCountGetPriace(this.state.sellCount);
                    this.setState({
                        sellPrice: saveDecimal(res, 6),
                        wholeSellPrice: res
                    }, () =>
                        {
                            this.handleComputeOneSellPrice();
                            this.handleComputePriceDiff(this.state.wholeSellPrice);
                        })
                }

            })
        return true;
    }
    // 卖出的获得的输入
    private onChangeSellSpend = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        // 只能输入数字
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        this.setState({
            sellPrice: saveDecimal(value.toString(), 6),
            wholeSellPrice: saveDecimal(value.toString(), 6),
            isError: false
        }, async () =>
            {
                if (this.state.sellPrice === '')
                {
                    this.setState({
                        sellCount: '',
                        sellOnePrice: '',
                        minSellPrice: '0',
                        wholeSellPrice: ''
                    })
                } else
                {
                    if (parseFloat(this.state.sellPrice) === 0)
                    {
                        this.setState({
                            sellCount: '0',
                            sellOnePrice: '0',
                            wholeSellPrice: '0',
                            minSellPrice: '0'
                        })
                    } else
                    {
                        // 计算获得多少eth需卖出多少代币, 取整
                        const count = await this.props.transation.computeGetPriceSellCount(this.state.sellPrice);
                        this.setState({
                            sellCount: parseInt(count, 10).toString()
                        }, () =>
                            {
                                this.handleComputeOneSellPrice();
                                this.handleComputePriceDiff(this.state.sellPrice);
                                if (this.state.isShowBalance)
                                {
                                    // 有余额时
                                    this.handleCheckSellBalance()
                                }
                            })
                    }

                }
            })
        return true;
    }

    // 计算代币出售的均价
    private handleComputeOneSellPrice = () =>
    {
        let oneSellPrice = '0';
        if (this.state.sellCount && this.state.sellCount !== '0')
        {
            const sellNum = toMyNumber(this.state.sellPrice).div(this.state.sellCount);
            oneSellPrice =toNonExponential(sellNum.value);
        }
        this.setState({
            sellOnePrice: saveDecimal(oneSellPrice, 6)
        })
    }
    // 卖出
    private onSell = async () =>
    {
        if (this.state.isError)
        {
            return false
        }
        if (!this.state.sellCount || parseInt(this.state.sellCount, 10) === 0 || this.state.address === '')
        {
            return false;
        }
        if(this.state.idDoingSell){
            return false;
        }
        try
        {
            this.setState({
                idDoingSell:true
            })
            const txid = await this.props.transation.sell(this.state.address, this.state.sellCount, this.state.wholeMinSell);
            console.log(txid);
            this.setState({
                idDoingSell:false
            })
            if (!!txid)
            {
                this.props.common.openNotificationWithIcon('success', "操作成功", "卖出操作已发送，请等待确认");
                this.initState();
            } else
            {
                this.props.common.openNotificationWithIcon('error', "操作失败", "卖出操作失败");
            }
        } catch (error)
        {
            this.props.common.openNotificationWithIcon('error', "操作失败", "卖出操作失败");
        }
        return true
    }
    // 计算价格差
    private handleComputePriceDiff = (num: string) =>
    {
        if (parseFloat(num) === 0)
        {
            this.setState({
                minSellPrice: '0',
                wholeMinSell: '0'
            })
        } else
        {
            const price = toMyNumber(num).mul(0.98);
            const priceStr = toNonExponential(price.value);
            const sixPrice = saveDecimal(priceStr, 6);
            if (parseFloat(sixPrice) === 0)
            {
                this.setState({
                    minSellPrice: '0',
                    wholeMinSell: saveDecimal(priceStr, 18)
                })
            } else
            {
                this.setState({
                    minSellPrice: sixPrice,
                    wholeMinSell: saveDecimal(priceStr, 18)
                })
            }

        }

    }
    // 初始化state
    private initState = () =>
    {
        this.setState({
            sellPrice: '',
            wholeSellPrice: '',
            sellCount: '',
            sellOnePrice: '',
            isError: false,
            minSellPrice: '',
            wholeMinSell: '',
        })
    }
}

