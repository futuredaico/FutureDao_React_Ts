import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import Button from '@/components/Button';
// import Toast from '@/components/Toast';
@observer
export default class RightTable extends React.Component<any, any> {
    public state = {
        underRight: 1,
        buySpend: '',
        buyCount: '',
        buyPrice: '',
        sellSpend: '',
        sellCount: '',
        sellPrice: '',
        BuyingPrice: '',     // Trade Info 当前买入价
        SellingPrice: '',    // Trade Info 当前卖出价
        MyEquityValue: '',   // 我当前的股份价值ETH
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
    public render()
    {
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
                                    <div className="small-gray">买入价</div>
                                    <div className="strong-text">100 DAI/股</div>
                                </div>
                                <div className="line-right">
                                    <div className="small-gray">卖出价</div>
                                    <div className="strong-text">60 DAI/股</div>
                                </div>
                            </div>
                            <div className="tran-line">
                                <div className="line-left">
                                    <div className="small-gray">已发行代币数</div>
                                    <div className="strong-text">100</div>
                                </div>
                                <div className="line-right">
                                    <div className="small-gray">24h涨跌幅</div>
                                    <div className="strong-text big-red">- 8%</div>
                                </div>
                            </div>
                            <div className="tran-line">
                                <div className="line-left">
                                    <div className="small-gray">可用股数</div>
                                    <div className="strong-text">12</div>
                                </div>
                                <div className="line-right">
                                    <div className="small-gray">锁定股数</div>
                                    <div className="strong-text">12</div>
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
                                    <input type="text" className="normal-buy-input" />
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
                                    <input type="text" className="normal-buy-input readonly-input" readOnly={true} onChange={this.onChangeBuyCount} value={this.state.buyCount} />
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
                                    <input type="text" className="normal-buy-input" value={this.state.sellPrice} />
                                    
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
                                    <input type="text" className="normal-buy-input readonly-input" readOnly={true} onChange={this.onChangeSellCount} value={this.state.sellCount} />
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
    private initTradeInfo = () =>
    {
        //
    }
    private onChangeBuySpend = (event: any) =>
    {
        // 

    }
    private onChangeBuyCount = (event: any) =>
    {
        // 
    }
    private onChangeSellSpend = (event: any) =>
    {
        // 
    }
    private onChangeSellCount = (event: any) =>
    {
        //
    }
    private onBuy = async () =>
    {
        // 
    }
    private onSell = async () =>
    {
        //
    }
}

