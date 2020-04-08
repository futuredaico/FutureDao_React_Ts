/**
 * 项目交易
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
// import Toast from '@/components/Toast';
import RightTable from './transright';
import * as formatTime from '@/utils/formatTime';
import { IProjectInfoProps } from '../../interface/projectinfo.interface';
import Hint from '@/components/hint';
import chartsOptions from './historyechart';
import Echarts from 'echarts';
import { Pagination } from 'antd';
import { ITransationList } from '../../interface/transation.interface';
import { saveDecimal } from '@/utils/numberTool';

interface IState
{
    underBottom: number, // 交易列表的菜单
    timeType: string, // 历史价格的时间选择
}
@observer
class ProjectTransation extends React.Component<IProjectInfoProps, IState> {
    public state: IState = {
        underBottom: 1,
        timeType: "w"
    }
    private myCahrt: Echarts.ECharts | null = null;
    private timeOption = [
        {
            id: "m",
            name: '1月'
        },
        {
            id: "w",
            name: '1周'
        }
    ]
    private menuBottom = [
        {
            id: 1,
            name: '全部记录'
        },
        {
            id: 2,
            name: '我的记录'
        }
    ]
    public async componentDidMount()
    {
        this.handleGetPriceData();
        this.handleGetData();
    }
    public componentWillUnmount()
    {
        if (this.myCahrt)
        {
            this.myCahrt.dispose();
        }
    }
    public render()
    {
        if (!this.props.projectinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="transation-wrapper">
                <div className="trans-top">
                    <div className="trans-price">
                        <h3 className="title-h3">历史价格</h3>
                        <div className="right-toggle">
                            <ul className="title-ul">
                                {
                                    this.timeOption.map((item, index) =>
                                    {
                                        return (
                                            <li className={this.state.timeType === item.id ? "title-li active" : "title-li"} key={index} onClick={this.handleTimeChoice.bind(this, item)}>
                                                {item.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="trans-echart" id="transEcharts" />
                    </div>
                    <RightTable {...this.props} />
                </div>
                <div className="trans-Bottom-table">
                    <div className="bottom-title">
                        <ul className="title-ul">
                            {
                                this.menuBottom.map((item, index) =>
                                {
                                    return (
                                        <li className={this.state.underBottom === item.id ? "title-li active" : "title-li"} key={index} onClick={this.handleHistoryType.bind(this, item)}>
                                            {item.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="bottom-table">
                        <ul className="table-ul">
                            <li className="table-li-th">
                                <span className="li-th">时间</span>
                                <span className="li-th">交易ID</span>
                                <span className="li-th">区块高度</span>
                                <span className="li-th">操作地址</span>
                                <span className="li-th">操作</span>
                                <span className="li-th">资金</span>
                                <span className="li-th">代币数</span>
                            </li>
                            {
                                this.props.transation.transCount === 0 && (
                                    <li className="table-li-td">
                                        <span className="nodata-td">没有相关数据</span>
                                    </li>
                                )
                            }
                            {
                                this.props.transation.transCount > 0 && this.props.transation.transList.map((item: ITransationList, index: number) =>
                                {
                                    return (
                                        <li className="table-li-td" key={index}>
                                            <span className="li-td">{formatTime.format('yyyy/MM/dd | hh:mm:ss', item.blockTime.toString(), this.props.intl.locale)}</span>
                                            <span className="li-td purple-text">{item.transactionHash.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</span>
                                            <span className="li-td">{item.blockNumber}</span>
                                            <span className="li-td purple-text">{item.address.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</span>
                                            {
                                                item.event === 'OnSell' && <span className="li-td red-text">卖出</span>
                                            }
                                            {
                                                item.event === 'OnBuy' && <span className="li-td green-text">买入</span>
                                            }
                                            {
                                                item.event === 'BuyFail' && (
                                                    <span className="li-td">
                                                        买入失败
                                                            <Hint
                                                            text="如果多个用户同时发起交易，会导致交易价格在短期内发生变化。当交易确认时与交易发出时的价差超过2%时，交易将被拒绝，资金会被退还。"
                                                            hintType="right-hint"
                                                        />
                                                    </span>
                                                )
                                            }
                                            {
                                                item.event === 'SellFail' && (
                                                    <span className="li-td">
                                                        卖出失败
                                                            <Hint
                                                            text="如果多个用户同时发起交易，会导致交易价格在短期内发生变化。当交易确认时与交易发出时的价差超过2%时，交易将被拒绝，资金会被退还。"
                                                            hintType="right-hint"
                                                        />
                                                    </span>
                                                )
                                            }
                                            <span className="li-td">{saveDecimal(item.fundAmt, 6)} {this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</span>
                                            {
                                                item.event === 'OnBuy' && <span className="li-td green-text">+{item.tokenAmt}</span>
                                            }
                                            {
                                                item.event === 'OnSell' && <span className="li-td red-text">-{item.tokenAmt}</span>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    {
                        this.props.transation.transCount > 10 && (
                            <div className="transtation-page-warpper">
                                <Pagination showQuickJumper={true} defaultCurrent={1} defaultPageSize={this.props.transation.transPageSize} total={this.props.transation.transCount} onChange={this.handleChangeTransPage} />
                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
    // 获取历史价格数据
    private handleGetPriceData = async () =>
    {
        this.myCahrt = null;
        await this.props.transation.getHistoryData(this.state.timeType)
        const echartsEl = document.getElementById('transEcharts') as HTMLDivElement;
        if (echartsEl)
        {
            const myChart = Echarts.init(echartsEl);
            chartsOptions.xAxis.data = this.props.transation.historyPrice.timeInfo;
            chartsOptions.series[0].data = this.props.transation.historyPrice.buyInfo;
            chartsOptions.series[1].data = this.props.transation.historyPrice.sellInfo;
            chartsOptions.yAxis.name = this.props.projectinfo.projInfo ? this.props.projectinfo.projInfo.fundName.toLocaleUpperCase() + '/单位' : '';
            myChart.setOption(chartsOptions as any)
            this.myCahrt = myChart;
        }
    }

    // 获取交易列表数据
    private handleGetData = () =>
    {
        this.props.transation.transList = [];
        let addr = '';
        if (this.state.underBottom === 2)
        {
            // if (this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.platform === 'eth')
            // {
            //     if (this.props.common.userInfo)
            //     {
            //         addr = this.props.common.userInfo.address;
            //     }
            // } else if (this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.platform === 'neo')
            // {
            if (this.props.common.userInfo)
            {
                addr = this.props.common.userInfo.address;
            }
            // }
        }
        this.props.transation.getTxListData(addr);
    }

    // 底部菜单选择
    private handleHistoryType = (item) =>
    {
        this.setState({
            underBottom: item.id
        }, () =>
        {
            this.props.transation.transPage = 1;
            this.props.transation.transCount = 0;
            this.handleGetData();
        })
    }
    // 选择查看历史价格时间段
    private handleTimeChoice = (item) =>
    {
        this.setState({
            timeType: item.id
        }, () =>
        {
            //
            this.handleGetPriceData();
        })
    }
    // 交易列表的分页
    private handleChangeTransPage = (index: number) =>
    {
        this.props.transation.transPage = index;
        this.handleGetData();
    }
}

export default injectIntl(ProjectTransation);
