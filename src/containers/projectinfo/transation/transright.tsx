import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import Button from '@/components/Button';
import { IProjectInfoProps } from '../interface/projectinfo.interface';
import { saveDecimal } from '../../../utils/numberTool';
import Hint from '@/components/hint';

interface IState
{
    underRight: number,
    buyPrice: string,   // 买入花费
    buyCount: string,   // 买入数量
    buyOnePrice: string,   // 买入花费单价
    sellPrice: string,  // 卖出所得金额
    sellCount: string,  // 卖出数量
    sellOnePrice: string,  // 卖出单价
    buyingPrice: string,     // Trade Info 当前买入价
    sellingPrice: string,    // Trade Info 当前卖出价
    myEquityValue: string,   // 我当前的股份价值ETH
    isCanBuyBtn: boolean, // 是否可以买入
    isCanSellBtn: boolean, // 是否可以卖出
    isShowBalance:boolean, // 是否显示余额
    isError:boolean // 是否余额超支
    balance:string // 当前连接账户余额
}

@observer
export default class RightTable extends React.Component<IProjectInfoProps, IState> {
    public state: IState = {
        underRight: 1,
        buyPrice: '',
        buyCount: '',
        buyOnePrice: '',
        sellPrice: '',
        sellCount: '',
        sellOnePrice: '',
        buyingPrice: '',
        sellingPrice: '',
        myEquityValue: '',
        isCanBuyBtn: false,
        isCanSellBtn: false,
        isShowBalance:false,
        isError:false,
        balance:'0'
    }
    public menuRight = [
        {
            id: 1,
            name: '资金池'
        },
        {
            id: 2,
            name: '买入'
        },
        {
            id: 3,
            name: '卖出'
        }
    ]
    public async componentDidMount()
    {
        if (this.props.common.userInfo && this.props.projectinfo.projInfo)
        {
            if (this.props.projectinfo.projInfo.platform === 'eth')
            {
                this.props.transation.getTokenBalance(this.props.metamaskwallet.metamaskAddress);
            } else if (this.props.projectinfo.projInfo.platform === 'neo')
            {
                this.props.transation.getTokenBalance(this.props.teemowallet.teemoAddress);
            }
        } else
        {
            this.props.transation.getTokenBalance('');
        }        
        // 计算单个代币预计花费多少
        const oneBuyPrice = await this.props.transation.computeBuyCountSpendPrice('1');
        // 鸡蛋单个代币出售得多少
        const oneSellPrice = await this.props.transation.computeSellCountGetPriace('1');
        this.setState({
            buyOnePrice: saveDecimal(oneBuyPrice, 6),
            sellOnePrice:saveDecimal(oneSellPrice,6)
        })
    }
    public render()
    {
        if (!this.props.projectinfo.projInfo)
        {
            return null;
        }
        const buyNum = saveDecimal(this.props.transation.tokenBalanceInfo.lastBuyPrice, 6);
        const sellNum = saveDecimal(this.props.transation.tokenBalanceInfo.lastSellPrice, 6);
        return (
            <div className="trans-right-table">
                <div className="right-title">
                    <ul className="title-ul">
                        {
                            this.menuRight.map((item, index) =>
                            {
                                return (
                                    <li className={this.state.underRight === item.id ? "title-li active" : "title-li"} key={index} onClick={this.mapRightUnderline.bind(this, item)}>
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    this.state.underRight === 1 && (
                        <div className="tran-des">
                            <div className="tran-line">
                                <div className="line-left">
                                    <div className="small-gray">最近买入价</div>
                                    <div className="strong-text">{parseFloat(buyNum)===0?'0':buyNum} {this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}/股</div>
                                </div>
                                <div className="line-right">
                                    <div className="small-gray">最近卖出价</div>
                                    <div className="strong-text">{parseFloat(sellNum)===0?'0':sellNum} {this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}/股</div>
                                </div>
                            </div>
                            <div className="tran-line">
                                <div className="line-left">
                                    <div className="small-gray">已发行代币数</div>
                                    <div className="strong-text">{this.props.projectinfo.projInfo.hasIssueAmt}</div>
                                </div>
                                <div className="line-right">
                                    <div className="small-gray">24h涨跌幅</div>
                                    {
                                        parseFloat(this.props.transation.tokenBalanceInfo.chg24h.toString()) > 0
                                            ? <div className="strong-text big-green">+ {this.props.transation.tokenBalanceInfo.chg24h.toString()}%</div>
                                            : <div className="strong-text big-red">- {this.props.transation.tokenBalanceInfo.chg24h.toString()}%</div>
                                    }
                                </div>
                            </div>
                            <div className="tran-line">
                                <div className="line-left">
                                    <div className="small-gray">可用股数</div>
                                    <div className="strong-text">{this.props.transation.tokenBalanceInfo.availableAmt}</div>
                                </div>
                                <div className="line-right">
                                    <div className="small-gray">锁定股数</div>
                                    <div className="strong-text">{this.props.transation.tokenBalanceInfo.lockAmt}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    this.state.underRight === 2 && (
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
                                    <input type="text" className={this.state.isError?"normal-buy-input error-input":"normal-buy-input"} onChange={this.onChangeBuySpend} value={this.state.buyPrice} />
                                    <span className="asset-text">{this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span>
                                    {
                                        this.state.isShowBalance && <span className="amount-text">余额：{this.state.balance} {this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span>
                                    }                                    
                                </div>
                            </div>
                            <div className="buy-line">
                                <div className="buy-left">均价</div>
                                <div className="buy-right">
                                    <input type="text" className="normal-buy-input readonly-input" readOnly={true} value={parseFloat(this.state.buyOnePrice)===0?'0':this.state.buyOnePrice} />
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
                                    <p className="sm-p">您将花费 <span className="purple-text">{this.state.buyPrice?this.state.buyPrice:'0'} {this.props.projectinfo.projInfo&&this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span></p>
                                    <p className="sm-p">将至少会获得 <span className="purple-text">{this.state.buyCount?this.state.buyCount:'0'} {this.props.transation.projContractInfo&&this.props.transation.projContractInfo.tokenName.toLocaleUpperCase()}</span></p>
                                </div>
                            </div>
                            <div className="doing-btn">
                                <Button text="Buy" btnColor={(this.state.isCanBuyBtn&&!this.state.isError) ? "green-btn" : 'gray-btn'} btnSize="buy-btn" onClick={this.onBuy} />
                            </div>
                        </div>
                    )
                }
                {
                    this.state.underRight === 3 && (
                        <div className="tran-des buy-in">
                            <div className="buy-line">
                                <div className="buy-left">卖出量</div>
                                <div className="buy-right">
                                    <input type="text" className={this.state.isError?"normal-buy-input input-otherpadding error-input":"normal-buy-input input-otherpadding"} onChange={this.onChangeSellCount} value={this.state.sellCount} />
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
                                    <input type="text" className="normal-buy-input readonly-input" readOnly={true} value={parseFloat(this.state.sellOnePrice)===0?'0':this.state.sellOnePrice} />
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
                                    <p className="sm-p">您将出售 <span className="purple-text">{this.state.sellCount?this.state.sellCount:'0'} {this.props.transation.projContractInfo&&this.props.transation.projContractInfo.tokenName.toLocaleUpperCase()}</span></p>
                                    <p className="sm-p">将至少会获得 <span className="purple-text">{this.state.sellPrice?this.state.sellPrice:'0'} {this.props.projectinfo.projInfo&&this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span></p>
                                </div>
                            </div>
                            <div className="doing-btn">
                                <Button text="Sell" btnColor={(this.state.isCanSellBtn&&!this.state.isError) ? "red-red" : 'gray-btn'} btnSize="buy-btn" onClick={this.onSell} />
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
    // 右边菜单选择
    private mapRightUnderline = (item) =>
    {
        this.setState({
            underRight: item.id,
            isCanBuyBtn: false,
            isCanSellBtn: false,
            isError:false
        })
        if (item.id !== 1)
        {
            this.handleCheckLinkWallet();
        }
    }
    // 检验是否连接了钱包
    private handleCheckLinkWallet = async () =>
    {
        if (this.props.common.userInfo)
        {
            // 检测是否连接钱包
            if (this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.platform === 'neo')
            {
                // 获取Teemo钱包上登陆的地址
                await this.props.teemowallet.loginTeemo();
                if (!this.props.teemowallet.teemoAddress)
                {
                    return false;
                }
                // 如果存在
                this.setState({
                    isCanBuyBtn: true,
                    isCanSellBtn: true,
                    isShowBalance:true
                })
            }
            else
            {
                // 获取MetaMask钱包上登陆的地址
                await this.props.metamaskwallet.inintWeb3();
                if (!this.props.metamaskwallet.metamaskAddress)
                {
                    return false;
                }
                // 如果存在
                const ethBalance = await this.props.metamaskwallet.getMetamaskBalance();
                this.setState({
                    isCanBuyBtn: true,
                    isCanSellBtn: true,
                    isShowBalance:true,
                    balance:ethBalance
                })                
            }
        }
        else
        {
            // 假如没有登陆
            this.setState({
                isCanBuyBtn: false,
                isCanSellBtn: false,
                isShowBalance:false
            })
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
        this.setState({ buyCount: value.toString() }, async () =>
        {
            if (this.state.buyCount === '')
            {
                this.setState({ buyPrice: '' })
            } else
            {
                // 计算购买代币需要花费多少eth, eth保留小数6位
                const res = await this.props.transation.computeBuyCountSpendPrice(this.state.buyCount);
                this.setState({
                    buyPrice: saveDecimal(res, 6),
                    isError:false
                },()=>{
                    if(this.state.isShowBalance){
                        // 有余额时
                        this.handleCheckBalance()
                    }
                })
            }

        })
        return true;
    }
    // 检测花费的余额够不够
    private handleCheckBalance = ()=>{
        const num1 = parseFloat(this.state.buyPrice);
        const num2 = parseFloat(this.state.balance);
        if(num2-num1<0){
            this.setState({
                isError:true
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
            isError:false
        }, async () =>
            {
                if (this.state.buyPrice === '')
                {
                    this.setState({ buyCount: '' })
                } else
                {
                    // 计算花费多少eth购买得到多少代币, 取整
                    const count = await this.props.transation.computeSpendPriceBuyCount(this.state.buyPrice);
                    this.setState({ buyCount: parseInt(count, 10).toString() });
                    if(this.state.isShowBalance){
                        // 有余额时
                        this.handleCheckBalance()
                    }
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
            sellPrice: saveDecimal(value.toString(), 6)
        }, async () =>
            {
                if (this.state.sellPrice === '')
                {
                    this.setState({ sellCount: '' })
                } else
                {
                    // 计算获得多少eth需卖出多少代币, 取整
                    const count = await this.props.transation.computeGetPriaceSellCount(this.state.sellPrice);
                    this.setState({ sellCount: parseInt(count, 10).toString() })
                }
            })
        return true;
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
        this.setState({ sellCount: value.toString() }, async () =>
        {
            if (this.state.sellCount === '')
            {
                this.setState({ sellPrice: '' })
            } else
            {
                // 计算出售代币获得多少eth, eth保留小数6位
                const res = await this.props.transation.computeSellCountGetPriace(this.state.sellCount);
                this.setState({
                    sellPrice: saveDecimal(res, 6)
                })
            }

        })
        return true;
    }
    // 买入
    private onBuy = async () =>
    {
        if(this.state.isError){
            return false
        }
        // try
        // {
        //     const txid = await this.props.transation.buy(this.state.buyPrice);
        //     console.log(txid);
        //     this.props.common.openNotificationWithIcon('success', "操作成功", "买入成功");
        // } catch (error)
        // {
        //     this.props.common.openNotificationWithIcon('error', "操作失败", "买入失败");
        // }
        return true;
    }
    // 卖出
    private onSell = async () =>
    {
        if(this.state.isError){
            return false
        }
        // try
        // {
        //     const txid = await this.props.transation.sell(this.state.sellCount);
        //     console.log(txid);
        //     this.props.common.openNotificationWithIcon('success', "操作成功", "卖出成功");
        // } catch (error)
        // {
        //     this.props.common.openNotificationWithIcon('error', "操作失败", "卖出失败");
        // }
        return true
    }
}

