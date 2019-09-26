/**
 * 发布更新
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
import Select from '@/components/select';
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
class OrderProject extends React.Component<any, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isShowInfo: false,
        orderMenu: 1,
        orderType: '1',
        isShowSendBox: false
    };
    private orderOptions = [
        {
            id: "1",
            name: "实物商品",
        },
        {
            id: "2",
            name: "虚拟商品",
        }
    ]
    public render()
    {
        return (
            <div className="pro-order-wrapper">
                <h3 className="right-title">订单管理</h3>
                {
                    !this.state.isShowInfo && (
                        <>
                            <div className="order-menu">
                                <ul className="title-ul">
                                    <li className={this.state.orderMenu === 1 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 1)}>
                                        待发货
                                    </li>
                                    <li className={this.state.orderMenu === 2 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 1)}>
                                        已发货
                                    </li>
                                </ul>
                                <div className="output-btn">
                                    <Button text="导出收货人信息" />
                                </div>
                            </div>
                            <div className="order-search-wrapper">
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">收件人名称</span>
                                    <Input className="search-input-order" />
                                </div>
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">买家名称</span>
                                    <Input className="search-input-order" />
                                </div>
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">订单编号</span>
                                    <Input className="search-input-order" />
                                </div>
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">订单类型</span>
                                    <Select options={this.orderOptions} text='' onCallback={this.handleChoiceOrderType} defaultValue={this.state.orderType} />
                                </div>
                                <Button text="搜索" btnColor="white-btn" />
                            </div>
                            <div className="order-table-title">
                                <ul>
                                    <li>产品</li>
                                    <li>单价</li>
                                    <li>数量</li>
                                    <li>实付款</li>
                                    <li>买家</li>
                                    <li>交易状况</li>
                                    <li>操作</li>
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
                                        <li><span>莉莉萨</span></li>
                                        <li><span>待发货</span></li>
                                        <li>
                                            <Button text="发货" btnSize="csm-btn" onClick={this.handleOpenSendBox} />
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
                                <strong>订单详情</strong>
                            </div>
                            <strong className="orderinfo-title">当前订单状态</strong>
                            <div className="orderinfo-gray-box">
                                <strong className="orderinfo-status">待发货/已发货</strong>
                                <span className="orderinfo-span">买家已付款，请及时发货/等待买家收货</span>
                            </div>
                            <strong className="orderinfo-title">收货信息</strong>
                            <div className="orderinfo-gray-box recieve-addr">
                                <span className="orderinfo-span">收货人：<strong>莉莉萨</strong></span>
                                <span className="orderinfo-span">手机：<strong>12312341234</strong></span>
                                <span className="orderinfo-span">收货地址：<strong>上海市XX区XX路123号501</strong></span>
                                <span className="orderinfo-span">留言：<strong>留言留言留言留言留言留言留言留言留言</strong></span>
                            </div>
                            <strong className="orderinfo-title">发货信息</strong>
                            <div className="orderinfo-gray-box">
                                <span className="orderinfo-span">暂未发货</span>
                                <Button text="发货" />
                            </div>
                            <strong className="orderinfo-title">订单信息</strong>
                            <div className="order-id-line">
                                <span>订单号 1234567890</span>
                                <span className="right-time">创建日期：2019/9/9</span>
                            </div>
                            <div className="orderinfo-table-wrapper">
                                div.table
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
    private mapUnderline = (num: number) =>
    {
        this.setState({
            orderMenu: num
        })
    }
    private handleChoiceOrderType = (item) =>
    {
        this.setState({
            orderType: item.id
        })
    }
    private handleOpenOrderInfo = () =>
    {
        this.setState({
            isShowInfo: true
        })
    }
    private handleOpenSendBox = () =>
    {
        this.setState({
            isShowSendBox: true
        })
    }
    private handleCloseSendBox = () =>
    {
        this.setState({
            isShowSendBox: false
        })
    }
}

export default injectIntl(OrderProject);
