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
    isShowSendBox: boolean,   // 发货弹窗标记
    recipientsName:string,    // 收件人名称
    noteStr:string, // 发货备注    
    orderItemOrderId:string, // 发货的订单ID
}
@inject('common', 'orderproject', 'project','order')
@observer
class OrderProject extends React.Component<IOrderProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state:IState = {
        isShowSendBox: false,
        recipientsName:'',
        noteStr:'',
        orderItemOrderId:''
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
                                    <li className={this.props.orderproject.orderMenu === 0 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 0)}>
                                        待发货
                                    </li>
                                    <li className={this.props.orderproject.orderMenu === 1 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 1)}>
                                        已发货
                                    </li>
                                </ul>
                                <div className="output-btn">
                                    <Button text="导出收货人信息" onClick={this.handleDownloadMesssage} />
                                </div>
                            </div>
                            <div className="order-search-wrapper">
                                {/* <div className="order-search-smallbox">
                                    <span className="search-type-text">收件人名称</span>
                                    <Input className="search-input-order" value={this.state.recipientsName} onChange={this.handleChangeRecipients} />
                                </div> */}
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">买家名称</span>
                                    <Input className="search-input-order" value={this.props.orderproject.buyName} onChange={this.handleChangeBuyName} />
                                </div>
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">订单编号</span>
                                    <Input className="search-input-order" value={this.props.orderproject.orderStr} onChange={this.handleChangeOrderStr} />
                                </div>
                                <div className="order-search-smallbox">
                                    <span className="search-type-text">订单类型</span>
                                    <Select options={this.orderOptions} text='' onCallback={this.handleChoiceOrderType} defaultValue={this.props.orderproject.orderType} />
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
                                                        {
                                                            item.orderState === OrderCode.WaitingDeliverGoods && <Button text="发货" btnSize="csm-btn" onClick={this.handleOpenSendBox.bind(this,item.orderId)} />
                                                        }                                                        
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
                                        <Button text="发货" onClick={this.handleOpenSendBox.bind(this,this.props.orderproject.orderProjDetail.orderId)} />
                                    </div>
                                )
                            }
                            {
                                this.props.orderproject.orderProjDetail.orderState === OrderCode.hasDeliverGoods && (
                                    <div className="orderinfo-gray-box">
                                        <span className="orderinfo-span">{this.props.orderproject.orderProjDetail.senderNote?this.props.orderproject.orderProjDetail.senderNote:'暂无'}</span>
                                        <Button text="修改发货信息" onClick={this.handleOpenSendBox.bind(this,this.props.orderproject.orderProjDetail.orderId,this.props.orderproject.orderProjDetail.senderNote)} />
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
                                <textarea name="sendinfo" className="send-order-reason" value={this.state.noteStr} onChange={this.handleChangeNoteStr} maxLength={500} />
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
    // 获取列表
    private handleGetListData = () => {
        this.props.orderproject.getOrderProjectList(this.props.orderproject.orderMenu,this.props.orderproject.buyName,this.props.orderproject.orderStr,this.props.orderproject.sendType);
    }
    // 搜索列表
    private handleSearchList = ()=>{
        this.props.orderproject.orderProjPage = 1;
        this.handleGetListData();
    }
    // 切换选项
    private mapUnderline = (num: number) =>
    {
        this.props.orderproject.orderMenu = num;
        this.props.orderproject.orderType = '0';
        this.props.orderproject.buyName = '';
        this.props.orderproject.orderStr = '';
        this.props.orderproject.sendType= 0;
        this.handleGetListData();
    }
    // 选择
    private handleChoiceOrderType = (item) =>
    {
        this.props.orderproject.orderType = item.id;
        this.props.orderproject.sendType= item.id==='0'?0:1;
    }
    // 获取单个订单详情
    private handleOpenOrderInfo = (item:IOrderProjectList) =>
    {
        this.props.orderproject.orderProjDetail = null;
        this.props.orderproject.isShowOprojInfo = true;
        this.props.orderproject.getOrderProjectDetail(item.projId, item.orderId);
        this.props.order.getRewardInfo(item.rewardId);
    }
    private handleChangeNoteStr = (ev: React.ChangeEvent<HTMLTextAreaElement>)=>{
        this.setState({
            noteStr:ev.target.value
        })
    }
    // 打开发货弹窗
    private handleOpenSendBox = (orderId:string,note?:string) =>
    {
        this.setState({
            isShowSendBox: true,
            orderItemOrderId:orderId,
            noteStr:note?note:''
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
    private handleSendGoods = async ()=>{
        const projectId = this.props.match.params.projectId;
        if(!projectId||!this.state.orderItemOrderId||!this.state.noteStr){
            return false
        }
        // console.log(this.state.orderItemOrderId)
        await this.props.orderproject.sendGoods(projectId,this.state.orderItemOrderId,this.state.noteStr);     
        this.handleCloseSendBox();     
        if(this.props.orderproject.isShowOprojInfo){
            console.log(this.state.orderItemOrderId)
            this.props.orderproject.getOrderProjectDetail(projectId, this.state.orderItemOrderId);
        }else{
            this.handleGetListData();
        }   
           
        return true
    }
    // 翻页
    private handleChangeOrderProjectPage=(index:number)=>{
        //
        this.props.orderproject.orderProjPage = index;
        this.handleGetListData();
    }
    // 收件人名称输入
    // private handleChangeRecipients = (ev: React.ChangeEvent<HTMLInputElement>)=>{
    //     this.setState({
    //         recipientsName: ev.target.value
    //     })
    // }
    // 买家名称输入
    private handleChangeBuyName = (ev: React.ChangeEvent<HTMLInputElement>)=>{
        this.props.orderproject.buyName = ev.target.value;
    }
    // 订单编号输入
    private handleChangeOrderStr = (ev: React.ChangeEvent<HTMLInputElement>)=>{
        this.props.orderproject.orderStr = ev.target.value
    }
}

export default injectIntl(OrderProject);
