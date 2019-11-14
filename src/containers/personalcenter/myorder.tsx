/**
 * 发布更新
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
import { IMyOrderProps, IOrderList } from './interface/myorder.interface';
import { OrderCode } from '@/store/interface/common.interface';
import { Pagination } from 'antd';
import * as formatTime from 'utils/formatTime';
import EventHandler from 'utils/event';
interface IState
{
    orderMenu: number,
    orderType: string,
    isShowSendBox: boolean,
    timeCount: string,  // 计时
    searchTxidFlag: boolean,
}
@inject('common', 'myorder', 'order', 'transation')
@observer
class MyOrder extends React.Component<IMyOrderProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        orderMenu: 1,
        orderType: '1',
        isShowSendBox: false,
        timeCount: '',
        searchTxidFlag: false
    };
    public componentDidMount()
    {
        this.props.myorder.getMyOrderList();
        EventHandler.add(this.globalClick);
    }
    public componentWillUnmount()
    {
        EventHandler.remove(this.globalClick);
        this.props.myorder.orderCount = 0;
        this.props.myorder.orderDetail = null;
        this.props.myorder.orderPage = 1;
        this.props.myorder.timeSet = null;
        this.props.myorder.orderList = [];
        this.props.order.rewardDetail = null;
    }
    public render()
    {
        return (
            <div className="myorder-wrapper">
                <h2>我的订单</h2>
                {
                    !this.props.myorder.isShowInfo && (
                        <>
                            <div className="order-table-title">
                                <ul>
                                    <li>产品</li>
                                    <li>单价</li>
                                    <li>数量</li>
                                    <li>总价</li>
                                    <li>状态</li>
                                </ul>
                            </div>
                            <div className="order-table-content">
                                {
                                    this.props.myorder.orderCount > 0 && this.props.myorder.orderList.map((item: IOrderList, index: number) =>
                                    {
                                        return (
                                            <div className="order-table-line" key={index}>
                                                <div className="order-line-top">
                                                    <span className="order-time">日期：{formatTime.format('yyyy-MM-dd hh:mm', item.time.toString(), this.props.intl.locale)}</span>
                                                    <span>订单号： {item.orderId}</span>
                                                </div>
                                                <ul className="order-table-box">
                                                    <li>
                                                        <span className="order-name">{item.projName}</span>
                                                        <span className="order-backtitle">{item.rewardName}</span>
                                                    </li>
                                                    <li><span>{item.price} {item.priceUnit.toLocaleUpperCase()}</span></li>
                                                    <li><span>{item.amount}</span></li>
                                                    <li><span>{item.totalCost} {item.totalCostUnit.toLocaleUpperCase()}</span></li>
                                                    <li>
                                                        {
                                                            item.orderState === OrderCode.WaitingPay && <span>等待付款</span>
                                                        }
                                                        {
                                                            item.orderState === OrderCode.WaitingConfirm && <span>等待确认</span>
                                                        }
                                                        {
                                                            item.orderState === OrderCode.WaitingDeliverGoods && <span>等待发货</span>
                                                        }
                                                        {
                                                            item.orderState === OrderCode.hasDeliverGoods && <span>已发货</span>
                                                        }
                                                        {
                                                            item.orderState === OrderCode.Canceled && <span>取消订单</span>
                                                        }
                                                        {
                                                            item.orderState === OrderCode.PayTimeout && <span>付款超时</span>
                                                        }
                                                        {
                                                            item.orderState === OrderCode.TxFailed && <span>交易失败</span>
                                                        }
                                                        <span className="order-purple" onClick={this.handleOpenOrderInfo.bind(this, item)}>订单详情</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    this.props.myorder.orderCount > 5 && (
                                        <div className="myorder-page-warpper">
                                            <Pagination showQuickJumper={true} defaultCurrent={1} defaultPageSize={this.props.myorder.orderPageSize} total={this.props.myorder.orderCount} onChange={this.handleChangeMyOrderPage} />
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    )
                }
                {
                    this.props.myorder.isShowInfo && this.props.myorder.orderDetail && (
                        <div className="manager-orderinfo-wrapper">
                            <div className="orderinfo-top">
                                <strong className="gray-text">订单列表</strong>
                                <span className="trangle" />
                                <strong>订单详情</strong>
                            </div>
                            <strong className="orderinfo-title first-title">当前订单状态</strong>
                            {
                                this.props.myorder.orderDetail.orderState === OrderCode.WaitingPay && (
                                    <div className="orderinfo-gray-box">
                                        <strong className="orderinfo-status">等待付款</strong>
                                        <span className="orderinfo-span">请在{this.state.timeCount}内付款，否则订单将自动取消</span>
                                        <div className="check-wrapper-btn">
                                            <Button text="取消订单" btnColor="red-btn" onClick={this.handleToCancelOrder} />
                                            <Button text="立即付款" />
                                        </div>
                                    </div>
                                )
                            }
                            {
                                this.props.myorder.orderDetail.orderState === OrderCode.WaitingConfirm && (
                                    <div className="orderinfo-gray-box">
                                        <strong className="orderinfo-status">等待确认</strong>
                                        <span className="orderinfo-span">付款交易已发出，等待链上确认</span>
                                    </div>
                                )
                            }
                            {
                                this.props.myorder.orderDetail.orderState === OrderCode.WaitingDeliverGoods && (
                                    <div className="orderinfo-gray-box">
                                        <strong className="orderinfo-status">等待发货</strong>
                                        <span className="orderinfo-span">付款成功。等待卖家发货。</span>
                                        <p className="orderinfo-p">卖家延期未发货请与卖家进行沟通。申请退款需要卖家同意，请与卖家达成一致后再申请退款。</p>
                                    </div>
                                )
                            }
                            {
                                this.props.myorder.orderDetail.orderState === OrderCode.hasDeliverGoods && (
                                    <div className="orderinfo-gray-box">
                                        <strong className="orderinfo-status">已发货</strong>
                                        <span className="orderinfo-span">卖家已发货，交易完成</span>
                                        <p className="orderinfo-p">收货有问题请与卖家进行沟通。</p>
                                    </div>
                                )
                            }
                            {
                                this.props.myorder.orderDetail.orderState === OrderCode.Canceled && (
                                    <div className="orderinfo-gray-box">
                                        <strong className="orderinfo-status">交易关闭</strong>
                                        <span className="orderinfo-span">您已取消订单</span>
                                    </div>
                                )
                            }
                            {
                                this.props.myorder.orderDetail.orderState === OrderCode.PayTimeout && (
                                    <div className="orderinfo-gray-box">
                                        <strong className="orderinfo-status">交易关闭</strong>
                                        <span className="orderinfo-span">付款超时</span>
                                    </div>
                                )
                            }
                            {
                                this.props.myorder.orderDetail.orderState === OrderCode.TxFailed && (
                                    <>
                                        <div className="orderinfo-gray-box">
                                            <strong className="orderinfo-status">交易失败</strong>
                                            <span className="orderinfo-span">付款失败，订单已取消，请重新购买。</span>
                                        </div>
                                        {
                                            this.state.searchTxidFlag
                                                ? (
                                                    <div className="orderinfo-idinput">
                                                        <Input placeholder="输入付款的交易ID" className="search-orderid" />
                                                        <Button text="重新检查" />
                                                    </div>
                                                )
                                                : (
                                                    <div className="orderinfo-idinput">
                                                        <span className="gray-text">付款状态有误？</span><span className="purple-text" onClick={this.handleShowSearch}>手动输入交易ID重新检测。</span>
                                                    </div>
                                                )
                                        }

                                    </>
                                )
                            }

                            <strong className="orderinfo-title">收货信息</strong>
                            <div className="orderinfo-gray-box recieve-addr">
                                <span className="orderinfo-span">收货人：<strong>{this.props.myorder.orderDetail.connectorName}</strong></span>
                                <span className="orderinfo-span">手机：<strong>{this.props.myorder.orderDetail.connectorTel}</strong></span>
                                <span className="orderinfo-span">邮箱：<strong>{this.props.myorder.orderDetail.connectorEmail ? this.props.myorder.orderDetail.connectorEmail : '-'}</strong></span>
                                <span className="orderinfo-span">收货地址：<strong>{this.props.myorder.orderDetail.connectorAddress ? this.props.myorder.orderDetail.connectorAddress : '-'}</strong></span>
                                <span className="orderinfo-span">留言：<strong>{this.props.myorder.orderDetail.connectorMessage ? this.props.myorder.orderDetail.connectorMessage : '-'}</strong></span>
                            </div>
                            <strong className="orderinfo-title">卖家信息</strong>
                            <div className="orderinfo-gray-box recieve-addr">
                                <span className="orderinfo-span">发货人：<strong>{this.props.myorder.orderDetail.senderName}</strong></span>
                                <span className="orderinfo-span">联系方式：<strong>{this.props.myorder.orderDetail.senderTel}</strong></span>
                                <span className="orderinfo-span">发货信息：<strong>{this.props.myorder.orderDetail.senderNote ? this.props.myorder.orderDetail.senderNote : '暂无'}</strong></span>
                            </div>
                            <strong className="orderinfo-title">订单信息</strong>
                            <div className="order-id-line">
                                <span>订单号 {this.props.myorder.orderDetail.orderId}</span>
                                <span className="right-time">创建日期：{formatTime.format('yyyy-MM-dd ', this.props.myorder.orderDetail.time.toString(), this.props.intl.locale)}</span>
                            </div>
                            <div className="orderinfo-table-wrapper">
                                <ul>
                                    <li>
                                        <strong className="orderinfo-name">{this.props.myorder.orderDetail.projName}</strong>
                                        <div className="orderinfo-backtitle">
                                            {this.props.myorder.orderDetail.rewardName}
                                            {
                                                this.props.order.rewardDetail && (
                                                    <div className="orderinfo-order-box">
                                                        <p>{this.props.order.rewardDetail.rewardDesc}</p>
                                                        <p>预计交货  {this.props.order.rewardDetail.distributeTimeFlag === "1" ? this.props.order.rewardDetail.distributeTimeFixYes : this.props.order.rewardDetail.distributeTimeFixNot + "天内"}</p>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </li>
                                    <li>
                                        <span className="info-table-th">价格</span>
                                        <span className="info-table-td">{this.props.myorder.orderDetail.price} {this.props.myorder.orderDetail.priceUnit.toLocaleUpperCase()}</span>
                                    </li>
                                    <li>
                                        <span className="info-table-th">数量</span>
                                        <span className="info-table-td">{this.props.myorder.orderDetail.amount}</span>
                                    </li>
                                    <li>
                                        <span className="info-table-th">总价</span>
                                        <span className="info-table-td">{this.props.myorder.orderDetail.totalCost} {this.props.myorder.orderDetail.totalCostUnit.toLocaleUpperCase()}</span>
                                    </li>
                                </ul>
                                <div className="right-sumprice">共支付：{this.props.myorder.orderDetail.totalCost} {this.props.myorder.orderDetail.totalCostUnit.toLocaleUpperCase()}</div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
    // 显示列表
    // private handleShowList = () =>
    // {
    //     this.props.myorder.isShowInfo = false
    // }
    // 取消显示查询框
    private globalClick = () =>
    {
        this.setState({
            searchTxidFlag: false,
        })
    }    
    // 显示查询txid输入框
    private handleShowSearch = () =>
    {
        this.setState({
            searchTxidFlag: true
        })
    }
    // 取消订单
    private handleToCancelOrder = () =>
    {
        this.props.order.cancelBuyOrder();
        if (this.props.myorder.timeSet)
        {
            clearInterval(this.props.myorder.timeSet);
            this.props.myorder.timeSet = null;
        }
    }

    // 重新检测
    // 立即付款

    // 获取单个订单详情
    private handleOpenOrderInfo = (item: IOrderList) =>
    {
        this.props.myorder.orderDetail = null;
        this.props.myorder.isShowInfo = true;
        this.props.myorder.getMyOrderDetail(item.projId, item.orderId);
        if (item.orderState === OrderCode.WaitingPay)
        {
            this.mathTime(item.time)
        }
        this.props.order.getRewardInfo(item.rewardId);
    }
    // 交易列表的分页
    private handleChangeMyOrderPage = (index: number) =>
    {
        this.props.myorder.orderPage = index;
        this.props.myorder.getMyOrderList();
    }
    // 倒计时
    private mathTime = (createTime: number) =>
    {
        const min10 = 600; // 10分钟
        const current = new Date().getTime() / 1000;
        if (createTime > current)
        {
            createTime = current;
        }
        const lastTime = createTime + min10; // 倒计时结束点的秒

        this.props.myorder.timeSet = setInterval(() =>
        {
            // 每次 定时器触发都活取下当前时间 注意 除以1000 换算成秒
            const currentTime = new Date().getTime() / 1000;
            // 计算差值时间
            const diff = lastTime - currentTime;
            // 差值小于等于0 就关定时器 并吧 state num 设置成 ‘’
            if (diff <= 0)
            {
                if (this.props.myorder.timeSet)
                {
                    clearInterval(this.props.myorder.timeSet);
                    this.props.myorder.timeSet = null;
                }

                this.setState({
                    timeCount: ''
                })
                // this.handleToCancelOrder();
                return;
            }

            // 计算 分 秒 转整数
            const min = parseInt((diff / 60).toString(), 10);
            const sec = parseInt((diff % 60).toString(), 10);

            // 赋值。这里注意下 1-9 的时候 前面 补个 0
            this.setState({
                timeCount: (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
            }, () =>
                {
                    console.log(this.state.timeCount)
                })

        }, 1000)
    }


}

export default injectIntl(MyOrder);
