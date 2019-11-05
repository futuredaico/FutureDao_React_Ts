import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { IProjectInfoProps } from '../interface/projectinfo.interface';
import { saveDecimal } from '../../../utils/numberTool';
import Buy from './buy';
import Sell from './sell';

interface IState
{
    underRight: number
}

@observer
export default class RightTable extends React.Component<IProjectInfoProps, IState> {
    public state: IState = {
        underRight: 1
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
        this.handleGetTokenData();
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
                                    <div className="strong-text">{parseFloat(buyNum) === 0 ? '0' : buyNum} {this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}/股</div>
                                </div>
                                <div className="line-right">
                                    <div className="small-gray">最近卖出价</div>
                                    <div className="strong-text">{parseFloat(sellNum) === 0 ? '0' : sellNum} {this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}/股</div>
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
                        <Buy {...this.props}/>
                    )
                }
                {
                    this.state.underRight === 3 && (
                        <Sell {...this.props}/>
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
            this.handleGetTokenData();
        }
    }
    // 获取资金池的数据
    private handleGetTokenData = () =>
    {
        if (this.props.common.userInfo && this.props.projectinfo.projInfo)
        {
            if (this.props.projectinfo.projInfo.platform === 'eth')
            {
                this.props.transation.getTokenBalance(this.props.common.userInfo.ethAddress);
            } else if (this.props.projectinfo.projInfo.platform === 'neo')
            {
                this.props.transation.getTokenBalance(this.props.common.userInfo.neoAddress);
            }
        } else
        {
            this.props.transation.getTokenBalance('');
        }
    }
}

