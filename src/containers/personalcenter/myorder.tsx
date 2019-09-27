/**
 * 发布更新
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
// import { getQueryString } from '@/utils/function'
interface IState
{
    isShowInfo: boolean,
    orderMenu: number,
    orderType: string,
    isShowSendBox: boolean
}
@inject('common', 'updateproject', 'createproject', 'project')
@observer
class MyOrder extends React.Component<any, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isShowInfo: false,
        orderMenu: 1,
        orderType: '1',
        isShowSendBox: false
    };
    public render()
    {
        return (
            <div className="myorder-wrapper">
                <h2>我的订单</h2>
                {
                    !this.state.isShowInfo && (
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
                                <div className="order-table-line">
                                    <div className="order-line-top">
                                        <span className="order-time">日期：2019/9/9  11:30</span>
                                        <span>订单号： 1234567890</span>
                                    </div>
                                    <ul className="order-table-box">
                                        <li>
                                            <span className="order-name">SS历险记SS历险记SS历险记SS历险记SS历</span>
                                            <span className="order-backtitle">回报标题回报标题回报标题回报标题回报标题</span>
                                        </li>
                                        <li><span>1000.0000 DAI</span></li>
                                        <li><span>1</span></li>
                                        <li><span>1000.0000 DAI</span></li>
                                        <li>
                                            <span>等待确认</span>
                                            <span className="order-purple" onClick={this.handleOpenOrderInfo}>订单详情</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    this.state.isShowInfo && (
                        <div className="manager-orderinfo-wrapper">
                            <div className="orderinfo-top">
                                <strong className="gray-text">订单列表</strong>
                                <span className="trangle" />
                                <strong>订单详情</strong>
                            </div>
                            <strong className="orderinfo-title first-title">当前订单状态</strong>
                            <div className="orderinfo-gray-box">
                                <strong className="orderinfo-status">等待确认/等待发货</strong>
                                <span className="orderinfo-span">付款交易已发出，等待链上确认/等待买家收货</span>
                                <p className="orderinfo-p">卖家延期未发货请与卖家进行沟通。申请退款需要卖家同意，请与卖家达成一致后再申请退款。</p>
                            </div>
                            <div className="orderinfo-gray-box">
                                <strong className="orderinfo-status">等待付款</strong>
                                <span className="orderinfo-span">请在9:59内付款，否则订单将自动取消</span>
                                <div className="check-wrapper-btn">
                                    <Button text="取消订单" btnColor="red-btn" />
                                    <Button text="立即付款" />
                                </div>
                            </div>
                            <div className="orderinfo-gray-box">
                                <strong className="orderinfo-status">交易失败</strong>
                                <span className="orderinfo-span">付款失败，订单已取消，请重新购买。</span>
                            </div>
                            <div className="orderinfo-idinput">
                                <span className="gray-text">付款状态有误？</span><span className="purple-text">手动输入交易ID重新检测。</span>
                            </div>
                            <div className="orderinfo-idinput">
                                <Input placeholder="输入付款的交易ID" className="search-orderid" />
                                <Button text="重新检查" />
                            </div>
                            <strong className="orderinfo-title">收货信息</strong>
                            <div className="orderinfo-gray-box recieve-addr">
                                <span className="orderinfo-span">收货人：<strong>莉莉萨</strong></span>
                                <span className="orderinfo-span">手机：<strong>12312341234</strong></span>
                                <span className="orderinfo-span">邮箱：<strong>1234567890@163.com</strong></span>
                                <span className="orderinfo-span">收货地址：<strong>上海市XX区XX路123号501</strong></span>
                                <span className="orderinfo-span">留言：<strong>留言留言留言留言留言留言留言留言留言</strong></span>
                            </div>
                            <strong className="orderinfo-title">卖家信息</strong>
                            <div className="orderinfo-gray-box recieve-addr">
                                <span className="orderinfo-span">发货人：<strong>莉莉萨</strong></span>
                                <span className="orderinfo-span">联系方式：<strong>12312341234</strong></span>
                                <span className="orderinfo-span">发货信息：<strong>暂无</strong></span>
                            </div>
                            <strong className="orderinfo-title">订单信息</strong>
                            <div className="order-id-line">
                                <span>订单号 1234567890</span>
                                <span className="right-time">创建日期：2019/9/9</span>
                            </div>
                            <div className="orderinfo-table-wrapper">
                                <ul>
                                    <li>
                                        <strong className="orderinfo-name">SS历险记SS历险记SS历险记SS历险记SS历</strong>
                                        <div className="orderinfo-backtitle">
                                            回报标题回报标题回报标题回报标题回报标题
                                            <div className="orderinfo-order-box">
                                                <p>回报说明Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                                                <p>回报1X1</p>
                                                <p>回报2X1</p>
                                                <p>预计交货  2019年9月</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="info-table-th">价格</span>
                                        <span className="info-table-td">1 ETH</span>
                                    </li>
                                    <li>
                                        <span className="info-table-th">数量</span>
                                        <span className="info-table-td">10</span>
                                    </li>
                                    <li>
                                        <span className="info-table-th">总价</span>
                                        <span className="info-table-td">10 ETH</span>
                                    </li>
                                </ul>
                                <div className="right-sumprice">共支付：10 ETH</div>
                            </div>
                        </div>
                    )
                }
                {
                    this.state.isShowSendBox && (
                        <div className="send-order-wrapper">
                            <div className="send-order-content">
                                <div className="send-order-close">
                                    <img src={require('@/img/close2.png')} alt="close2.png" onClick={this.handleCloseSendBox} className="close-icon" />
                                </div>
                                <div className="send-order-title"><strong>确认发货</strong></div>
                                <span className="send-order-span">填写发货信息</span>
                                <textarea name="sendinfo" className="send-order-reason" />
                                <div className="sendbtn-wrap">
                                    <Button text="取消" btnColor="red-btn" btnSize="stop-btn" />
                                    <Button text="确认发货" btnSize="stop-btn" onClick={this.handleCloseSendBox} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
    private handleOpenOrderInfo = () =>
    {
        this.setState({
            isShowInfo: true
        })
    }
    private handleCloseSendBox = () =>
    {
        this.setState({
            isShowSendBox: false
        })
    }
}

export default injectIntl(MyOrder);
