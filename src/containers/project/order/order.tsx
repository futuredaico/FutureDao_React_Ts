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
import { IOrderProjectProps, IOrderProjectList } from '../interface/orderproject.interface';
import * as formatTime from 'utils/formatTime';
import { OrderCode } from '@/store/interface/common.interface';
import { Pagination } from 'antd';

interface IState
{
    orderMenu: number,        // 菜单切换
    orderType: string,        // 订单类型，（示）
    isShowSendBox: boolean,   // 发货弹窗标记
    recipientsName:string,    // 收件人名称
    buyName:string,   // 买家名称
    orderStr:string,  // 订单编号
    sendType:number   // 订单类型（传入接口的）
}
@inject('common', 'orderproject', 'project','order')
@observer
class OrderProject extends React.Component<IOrderProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state:IState = {
        orderMenu: 0,
        orderType: "0",
        isShowSendBox: false,
        recipientsName:'',
        buyName:'',
        orderStr:'',
        sendType:0
    };
    private orderOptions = [
        {
            id: "0",
            name: "虚拟商品",            
        },
        {
            id: "1",
            name: "实物商品",
        }
    ]
    public componentDidMount()
    {        
        const projectId = this.props.match.params.projectId;
        this.props.project.projId = projectId;
        this.handleGetListData();
    }
    public componentWillUnmount(){
        this.props.orderproject.orderProjCount = 0;
        this.props.orderproject.orderProjDetail = null;
        this.props.orderproject.orderProjPage = 1;
        this.props.orderproject.orderProjList = [];
        this.props.order.rewardDetail = null;
    }
    public render()
    {
        return (
            <div className="pro-order-wrapper">
                <h3 className="right-title">订单管理</h3>
                {
                    !this.props.orderproject.isShowOprojInfo && (
                        <>
                            <div className="order-menu">
                                <ul className="title-ul">
                                    <li className={this.state.orderMenu === 0 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 0)}>
                                        待发货
                                    </li>
                                    <li className={this.state.orderMenu === 1 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 1)}>
                                        已发货
                                    </li>
                                </ul>
                                <div className="output-btn">
                                    <Button text="导出收货人信息" onClick={this.handleDownloadMesssage} />
                                </div>
                            </div>
                            <div className="order-search-wrapper">
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">收件人名称</span>
                                    <Input className="search-input-order" value={this.state.recipientsName} onChange={this.handleChangeRecipients} />
                                </div>
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">买家名称</span>
                                    <Input className="search-input-order" value={this.state.buyName} onChange={this.handleChangeBuyName} />
                                </div>
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">订单编号</span>
                                    <Input className="search-input-order" value={this.state.orderStr} onChange={this.handleChangeOrderStr} />
                                </div>
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">订单类型</span>
                                    <Select options={this.orderOptions} text='' onCallback={this.handleChoiceOrderType} defaultValue={this.state.orderType} />
                                </div>
                                <Button text="搜索" btnColor="white-btn" onClick={this.handleSearchList} />
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
                                {
                                    this.props.orderproject.orderProjCount > 0 && this.props.orderproject.orderProjList.map((item: IOrderProjectList, index: number) =>
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
                                                    <li><span>{item.connectorName}</span></li>
                                                    <li>
                                                        {
                                                            item.orderState === OrderCode.WaitingPay && <span>待付款</span>
                                                        }
                                                        {
                                                            item.orderState === OrderCode.WaitingConfirm && <span>待确认</span>
                                                        }
                                                        {
                                                            item.orderState === OrderCode.WaitingDeliverGoods && <span>待发货</span>
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
                                                    </li>
                                                    {/* <li><span>待发货</span></li> */}
                                                    <li>
                                                        <Button text="发货" btnSize="csm-btn" onClick={this.handleOpenSendBox} />
                                                        <span className="order-purple" onClick={this.handleOpenOrderInfo.bind(this,item)}>订单详情</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            {
                                    this.props.orderproject.orderProjCount > 5 && (
                                        <div className="orderproject-page-warpper">
                                            <Pagination 
                                                showQuickJumper={true} 
                                                defaultCurrent={1} 
                                                defaultPageSize={this.props.orderproject.orderProjPageSize} 
                                                total={this.props.orderproject.orderProjCount} 
                                                onChange={this.handleChangeOrderProjectPage} 
                                            />
                                        </div>
                                    )
                            }
                        </>
                    )
                }
                {
                    this.props.orderproject.isShowOprojInfo && this.props.orderproject.orderProjDetail && (
                        <div className="manager-orderinfo-wrapper">
                            <div className="orderinfo-top">
                                <strong className="gray-text">订单列表</strong>
                                <span className="trangle" />
                                <strong>订单详情</strong>
                            </div>
                            <strong className="orderinfo-title first-title">当前订单状态</strong>
                            {
                                this.props.orderproject.orderProjDetail.orderState === OrderCode.WaitingDeliverGoods && (
                                    <div className="orderinfo-gray-box">
                                        <strong className="orderinfo-status">待发货</strong>
                                        <span className="orderinfo-span">买家已付款，请及时发货</span>
                                    </div>
                                )
                            }
                            {
                                this.props.orderproject.orderProjDetail.orderState === OrderCode.hasDeliverGoods && (
                                    <div className="orderinfo-gray-box">
                                        <strong className="orderinfo-status">已发货</strong>
                                        <span className="orderinfo-span">等待买家收货</span>
                                    </div>
                                )
                            }
                            <strong className="orderinfo-title">收货信息</strong>
                            <div className="orderinfo-gray-box recieve-addr">
                                <span className="orderinfo-span">收货人：<strong>{this.props.orderproject.orderProjDetail.connectorName}</strong></span>
                                <span className="orderinfo-span">手机：<strong>{this.props.orderproject.orderProjDetail.connectorTel}</strong></span>
                                <span className="orderinfo-span">收货地址：<strong>{this.props.orderproject.orderProjDetail.connectorAddress ? this.props.orderproject.orderProjDetail.connectorAddress : '-'}</strong></span>
                                <span className="orderinfo-span">留言：<strong>{this.props.orderproject.orderProjDetail.connectorMessage ? this.props.orderproject.orderProjDetail.connectorMessage : '-'}</strong></span>
                            </div>
                            <strong className="orderinfo-title">发货信息</strong>
                            {
                                this.props.orderproject.orderProjDetail.orderState === OrderCode.WaitingDeliverGoods && (
                                    <div className="orderinfo-gray-box">
                                        <span className="orderinfo-span">暂未发货</span>
                                        <Button text="发货" onClick={this.handleOpenSendBox} />
                                    </div>
                                )
                            }
                            {
                                this.props.orderproject.orderProjDetail.orderState === OrderCode.hasDeliverGoods && (
                                    <div className="orderinfo-gray-box">
                                        <span className="orderinfo-span">{this.props.orderproject.orderProjDetail.senderNote?this.props.orderproject.orderProjDetail.senderNote:'暂无'}</span>
                                        <Button text="修改发货信息" onClick={this.handleOpenSendBox} />
                                    </div>
                                )   
                            }
                            
                            <strong className="orderinfo-title">订单信息</strong>
                            <div className="order-id-line">
                                <span>订单号 {this.props.orderproject.orderProjDetail.orderId}</span>
                                <span className="right-time">创建日期：{formatTime.format('yyyy-MM-dd ', this.props.orderproject.orderProjDetail.time.toString(), this.props.intl.locale)}</span>
                            </div>
                            <div className="orderinfo-table-wrapper">
                                <ul>
                                    <li>
                                        <strong className="orderinfo-name">{this.props.orderproject.orderProjDetail.projName}</strong>
                                        <div className="orderinfo-backtitle">
                                            {this.props.orderproject.orderProjDetail.rewardName}
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
                                        <span className="info-table-td">{this.props.orderproject.orderProjDetail.price} {this.props.orderproject.orderProjDetail.priceUnit.toLocaleUpperCase()}</span>
                                    </li>
                                    <li>
                                        <span className="info-table-th">数量</span>
                                        <span className="info-table-td">{this.props.orderproject.orderProjDetail.amount}</span>
                                    </li>
                                    <li>
                                        <span className="info-table-th">总价</span>
                                        <span className="info-table-td">{this.props.orderproject.orderProjDetail.totalCost} {this.props.orderproject.orderProjDetail.totalCostUnit.toLocaleUpperCase()}</span>
                                    </li>
                                </ul>
                                <div className="right-sumprice">共支付：{this.props.orderproject.orderProjDetail.totalCost} {this.props.orderproject.orderProjDetail.totalCostUnit.toLocaleUpperCase()}</div>
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
                                    <Button text="取消" btnColor="red-btn" btnSize="stop-btn" onClick={this.handleCloseSendBox} />
                                    <Button text="确认发货" btnSize="stop-btn" onClick={this.handleSendGoods} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
    // 导出收货人信息
    private handleDownloadMesssage = async ()=>{
        //
        await this.props.orderproject.exportFile(this.props.project.projId);
        window.open(this.props.orderproject.exportLink)
    }
    private handleGetListData = () => {
        this.props.orderproject.getOrderProjectList(this.state.orderMenu,this.state.buyName,this.state.orderStr,this.state.sendType);
    }
    private handleSearchList = ()=>{
        this.props.orderproject.orderProjPage = 1;
        this.handleGetListData();
    }
    // 切换选项
    private mapUnderline = (num: number) =>
    {
        this.setState({
            orderMenu: num,
            orderType: "0",
            recipientsName:'',
            buyName:'',
            orderStr:'',
            sendType:0
        })
    }
    // 选择
    private handleChoiceOrderType = (item) =>
    {
        this.setState({
            orderType: item.id,
            sendType:item.id==='0'?0:1
        })
    }
    // 获取单个订单详情
    private handleOpenOrderInfo = (item:IOrderProjectList) =>
    {
        this.props.orderproject.orderProjDetail = null;
        this.props.orderproject.isShowOprojInfo = true;
        this.props.orderproject.getOrderProjectDetail(item.projId, item.orderId);
        this.props.order.getRewardInfo(item.rewardId);
    }
    // 打开发货弹窗
    private handleOpenSendBox = () =>
    {
        this.setState({
            isShowSendBox: true
        })
    }
    // 关闭发货弹窗
    private handleCloseSendBox = () =>
    {
        this.setState({
            isShowSendBox: false
        })
    }
    // 发货
    private handleSendGoods = ()=>{
        // this.props.
        this.handleCloseSendBox();
    }
    // 翻页
    private handleChangeOrderProjectPage=(index:number)=>{
        //
        this.props.orderproject.orderProjPage = index;
        this.handleGetListData();
    }
    // 收件人名称输入
    private handleChangeRecipients = (ev: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            recipientsName: ev.target.value
        })
    }
    private handleChangeBuyName = (ev: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            buyName: ev.target.value
        })
    }
    private handleChangeOrderStr = (ev: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            orderStr: ev.target.value
        })
    }
}

export default injectIntl(OrderProject);
