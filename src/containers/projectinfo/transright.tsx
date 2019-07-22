import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
@observer
export default class RightTable extends React.Component<any, any> {
    public state = {
        underRight: 2,
        buySpend: '',
        buyCount: '',
        buyPrice: '',
        sellSpend: '',
        sellCount: '',
        sellPrice: '',
        BuyingPrice:'',     // Trade Info 当前买入价
        SellingPrice:'',    // Trade Info 当前卖出价
        MyEquityValue:'',   // 我当前的股份价值ETH
    }
    public menuRight = [
        {
            id: 1,
            name: 'Trade Info'
        },
        {
            id: 2,
            name: 'Buy'
        },
        {
            id: 3,
            name: 'Sell'
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
                            <div className="right-line">
                                <div className="right-line-left">
                                    <div className="small-gray">Buying Price</div>
                                </div>
                                <div className="right-line-right">
                                    <div className="big-purple">{this.state.BuyingPrice} ETH</div>
                                </div>
                            </div>
                            <div className="right-line">
                                <div className="right-line-left">
                                    <div className="small-gray">Selling Price</div>
                                </div>
                                <div className="right-line-right">
                                    <div className="big-purple">{this.state.SellingPrice} ETH</div>
                                </div>
                            </div>
                            <div className="right-line">
                                <div className="right-line-left">
                                    <div className="small-gray">Total Shares</div>
                                </div>
                                <div className="right-line-right">
                                    {/* <div className="big-purple">{projectinfoStore.totalSupply}</div> */}
                                </div>
                            </div>
                            <div className="right-line">
                                <div className="right-line-left">
                                    <div className="small-gray">Change</div>
                                </div>
                                <div className="right-line-right">
                                {/* {projectinfoStore.perFrom24h.includes('-')?
                                <div className="big-red">- {projectinfoStore.perFrom24h.replace('-','')}%</div>:
                                <div className="big-green">+ {projectinfoStore.perFrom24h}%</div>
                                } */}
                                </div>
                            </div>
                            <div className="right-line">
                                <div className="right-line-left">
                                    <div className="small-gray">My Shares</div>
                                </div>
                                <div className="right-line-right">
                                    {/* <div className="big-purple">{projectinfoStore.fndBalances}</div> */}
                                </div>
                            </div>
                            <div className="right-line">
                                <div className="right-line-left">
                                    <div className="small-gray">My Equity Value</div>
                                </div>
                                <div className="right-line-right">
                                    <div className="big-purple">{this.state.MyEquityValue} ETH</div>
                                </div>
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
    }
    
}

