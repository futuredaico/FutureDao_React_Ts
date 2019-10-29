import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import Button from '@/components/Button';
import { IProjectInfoProps } from '../interface/projectinfo.interface';
interface IState
{
    underRight: number,
    buySpend: string,   // 买入花费
    buyCount: string,   // 买入数量
    buyPrice: string,   // 买入花费单价
    sellSpend: string,  // 卖出所得金额
    sellCount: string,  // 卖出数量
    sellPrice: string,  // 卖出所得单价
    buyingPrice: string,     // Trade Info 当前买入价
    sellingPrice: string,    // Trade Info 当前卖出价
    myEquityValue: string,   // 我当前的股份价值ETH
}

@observer
export default class RightTable extends React.Component<IProjectInfoProps, IState> {
    public state:IState = {
        underRight: 1,
        buySpend: '',
        buyCount: '',
        buyPrice: '',
        sellSpend: '',
        sellCount: '',
        sellPrice: '',
        buyingPrice: '',     
        sellingPrice: '',    
        myEquityValue: '',
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
    public componentDidMount(){
        this.props.transation.getTokenBalance('');
    }
    public render()
    {
        if (!this.props.projectinfo.projInfo)
        {
            return null;
        }
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
                                    <div className="strong-text">{this.props.transation.tokenBalanceInfo.lastBuyPrice.toString()} {this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}/股</div>
                                </div>
                                <div className="line-right">
                                    <div className="small-gray">最近卖出价</div>
                                    <div className="strong-text">{this.props.transation.tokenBalanceInfo.lastSellPrice.toString()} {this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}/股</div>
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
                                    <input type="text" className="normal-buy-input" onChange={this.onChangeBuyCount} value={this.state.buyCount} />
                                </div>
                            </div>
                            <div className="buy-line">
                                <div className="buy-left">花费</div>
                                <div className="buy-right">
                                    <input type="text" className="normal-buy-input" onChange={this.onChangeBuySpend} value={this.state.buySpend} />
                                    <span className="asset-text">DAI</span>
                                </div>
                            </div>
                            <div className="buy-line">
                                <div className="buy-left">均价</div>
                                <div className="buy-right">
                                    <input type="text" className="normal-buy-input readonly-input" readOnly={true} value={this.state.buyPrice} />
                                    <span className="asset-text">DAI</span>
                                </div>
                            </div>
                            <div className="doing-btn">
                                <Button text="Buy" btnColor="green-btn" btnSize="buy-btn" onClick={this.onBuy} />
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
                                    <input type="text" className="normal-buy-input" onChange={this.onChangeSellCount} value={this.state.sellCount} />

                                </div>
                            </div>
                            <div className="buy-line">
                                <div className="buy-left">获得</div>
                                <div className="buy-right">
                                    <input type="text" className="normal-buy-input" onChange={this.onChangeSellSpend} value={this.state.sellSpend} />
                                    <span className="asset-text">DAI</span>
                                </div>
                            </div>
                            <div className="buy-line">
                                <div className="buy-left">均价</div>
                                <div className="buy-right">
                                    <input type="text" className="normal-buy-input readonly-input" readOnly={true} value={this.state.sellPrice} />
                                    <span className="asset-text">DAI</span>
                                </div>
                            </div>
                            <div className="doing-btn">
                                <Button text="Sell" btnColor="red-red" btnSize="buy-btn" onClick={this.onSell} />
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
            underRight: item.id
        })
        if (item.id === 1)
        {
            this.initTradeInfo()
        }
    }
    // 初始化数据
    private initTradeInfo = () =>
    {
        this.props.transation.getPayEtherFromFndCount('1')
            .then(value =>
            {
                console.log(value)
                this.setState({ buyingPrice: value.amount })
            })
        this.props.transation.getSellEtherFromFndCount('1')
            .then(value =>
            {
                this.setState({ sellingPrice: value.amount })
            })
        this.props.transation.getSellEtherFromFndCount(this.props.transation.fndBalances)
            .then(value =>
            {
                this.setState({ myEquityValue: value.amount })
            })
    }
    // 买入的花费
    private onChangeBuySpend = (event: any) =>
    {
        this.setState({ buySpend: event.target.value }, () =>
        {
            if (parseFloat(this.state.buySpend) > 0)
            {
                console.log('buySpend', parseFloat(this.state.buySpend).toString());

                this.props.transation.getBuyFndCountFromEther(parseFloat(this.state.buySpend).toString())
                    .then(value =>
                    {
                        this.setState({ buyCount: parseFloat(value.count).toFixed().toString(), buyPrice: value.price })
                    })
            }
            else
            {
                this.setState({ buyCount: '', buyPrice: '' })
            }
        })

    }
    // 买入量的输入
    private onChangeBuyCount = (event: any) =>
    {
        this.setState({ buyCount: event.target.value }, () =>
        {
            if (parseFloat(this.state.buyCount) > 0)
            {
                const arr = this.state.buyCount.split('.');
                if (arr.length > 1 && arr[1].length > 17)
                {
                    arr[1] = arr[1].substr(0, 17);
                    const count = arr.join('.'); this.setState({ buyCount: count })
                    this.props.transation.getPayEtherFromFndCount(count)
                        .then(value =>
                        {
                            this.setState({ buySpend: value.amount, buyPrice: value.price });
                        })
                }
                else
                {
                    this.props.transation.getPayEtherFromFndCount(parseFloat(this.state.buyCount).toString())
                        .then(value =>
                        {
                            this.setState({ buySpend: value.amount, buyPrice: value.price });
                        })
                }
            }
            else
            {
                this.setState({ buySpend: '', buyPrice: '' });
            }
        })
    }
    // 卖出的获得
    private onChangeSellSpend = (event: any) =>
    {
        this.setState({ sellSpend: event.target.value }, () =>
        {
            let sellspend = parseFloat(this.state.sellSpend)
            if (sellspend > 0)
            {
                console.log('sellspend', sellspend);

                if (parseFloat(this.props.transation.storeEth) < sellspend)
                {
                    sellspend = parseFloat(this.props.transation.storeEth);
                    this.setState({ sellSpend: sellspend.toString() })
                }
                this.props.transation.getFndCountFromSellEther(sellspend.toString())
                    .then(value =>
                    {
                        this.setState({
                            sellCount: value.count, sellPrice: value.price
                        })
                    });
            }
            else
            {
                this.setState({
                    sellCount: '', sellPrice: ''
                })
            }
        })
    }
    // 卖出量的输入
    private onChangeSellCount = (event: any) =>
    {
        this.setState({ sellCount: event.target.value }, () =>
        {
            if (parseFloat(this.state.sellCount) > 0)
            {
                this.props.transation.getSellEtherFromFndCount(parseFloat(this.state.sellCount).toString())
                    .then(value =>
                    {
                        this.setState({
                            sellSpend: value.amount, sellPrice: value.price
                        })
                    });
            }
            else
            {
                this.setState({
                    sellSpend: '', sellPrice: ''
                })
            }
        })
    }
    // 买入
    private onBuy = async () =>
    {
        try
        {
            const txid = await this.props.transation.buy(this.state.buySpend);
            console.log(txid);
            this.props.common.openNotificationWithIcon('success', "操作成功", "买入成功");
        } catch (error)
        {
            this.props.common.openNotificationWithIcon('error', "操作失败", "买入失败");
        }
    }
    // 卖出
    private onSell = async () =>
    {
        try
        {
            const txid = await this.props.transation.sell(this.state.sellCount);
            console.log(txid);
            this.props.common.openNotificationWithIcon('success', "操作成功", "卖出成功");
        } catch (error)
        {
            this.props.common.openNotificationWithIcon('error', "操作失败", "卖出失败");
        }
    }
}

