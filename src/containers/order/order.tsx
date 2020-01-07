/**
 * 支持众筹、产品预售页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { IOrderProps } from './interface/order.interface';
import Button from '@/components/Button';
import { getQueryString } from '@/utils/function';
import { toMyNumber } from '../../utils/numberTool';
import * as Cookie from '@/utils/cookie';
import { OrderCode } from '@/store/interface/common.interface';
// import * as format from '@/utils/formatTime';

interface IState
{
    isCanBuyBtn: boolean, // 是否可购买(是否连接上钱包)
    address: string, // 当前连接的钱包地址
    minBuyCount: string, // 至少可获得
    timeCount: string, // 计时时间
}
@inject('order', 'common', 'projectinfo', 'transation', 'teemowallet', 'metamaskwallet')
@observer
class Order extends React.Component<IOrderProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        isCanBuyBtn: false,
        address: '',
        minBuyCount: '0',
        timeCount: ''
    }
    public async componentDidMount()
    {
        const projectId = this.props.match.params.projectId;
        const orderId = getQueryString('orderid') || ''
        if (projectId && orderId)
        {
            this.props.order.projId = projectId;
            this.props.order.orderId = orderId;
            await this.props.projectinfo.getProjInfo(projectId);
            this.props.order.getTradeHash(projectId);
            await this.props.order.getBuyOrder(projectId, orderId);
            if (this.props.order.orderInfo && this.props.order.orderInfo.orderState===OrderCode.WaitingConfirm)
            {
                this.props.order.orderMenu=3;
            }else if (this.props.order.orderInfo && this.props.order.orderInfo.orderState===OrderCode.Canceled){
                this.props.order.orderMenu=2;
            }
            else if(this.props.order.orderInfo ){
                this.handleComputePriceDiff(this.props.order.orderInfo.totalCost)
                this.mathTime(this.props.order.orderInfo.time);
                this.handleCheckLinkWallet();
            }
            
        }

    }
    public componentWillUnmount(){
        if(this.props.order.timeTen){
            clearInterval(this.props.order.timeTen);
            this.props.order.timeTen = null;
        }
    }
    public render()
    {
        if (!this.props.order.orderInfo)
        {
            return null;
        }
        return (
            <>
                {
                    this.props.order.orderMenu === 1 && (
                        <div className="order-create-wrapper">
                            <div className="order-create-content">
                                <h1 className="ocreate-title">订单已创建</h1>
                                <div className="ocreate-content">
                                    <div className="content-line">
                                        <div className="cline-left">转账给</div>
                                        <div className="cline-right">{this.props.order.hash}</div>
                                    </div>
                                    <div className="content-line">
                                        <div className="cline-left">转账金额</div>
                                        <div className="cline-right">{this.props.order.orderInfo.totalCost} {this.props.order.orderInfo.priceUnit.toLocaleUpperCase()}</div>
                                    </div>
                                </div>
                                <p className="ocreate-p">请在钱包中确认交易</p>
                                <p className="ocreate-p">请在 <span className="purple-span">{this.state.timeCount}</span> 内确认付款，否则订单将自动取消</p>
                                <div className="step-btn">
                                    <Button
                                        text="取消订单"
                                        btnSize="md-bg-btn"
                                        onClick={this.handleToCancelOrder}
                                    />
                                </div>

                            </div>
                        </div>
                    )
                }
                {
                    this.props.order.orderMenu === 2 && (
                        <div className="order-cancel-wrapper">
                            <div className="order-cancel-content">
                                <h1 className="ocancel-title">订单已取消</h1>
                                <div className="step-btn">
                                    <a href="javascript:window.opener=null;window.close();" className="close-link">关闭本页</a>                                    
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    this.props.order.orderMenu === 3 && (
                        <div className="order-check-wrapper">
                            <div className="order-check-content">
                                <h1 className="ocheck-title">付款确认中</h1>
                                <p className="ocheck-p">等待链上确认付款结果</p>
                                <p className="ocheck-p">您可以在“我的订单”中查看进度</p>
                                <div className="step-btn">
                                    <a href="javascript:window.opener=null;window.close();" className="close-link white-purple">关闭本页</a>                                     
                                    <Button
                                        text="我的订单"
                                        btnSize="md-bg-btn"
                                        onClick={this.handleToGoMyOrder}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        );
    }
    // 检验是否连接了钱包，并付款
    private handleCheckLinkWallet = async () =>
    {
        const user = Cookie.getCookie("user");
        if (user)
        {
            // 检测是否连接钱包
            if (this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.platform === 'eth')
            {
                // 获取MetaMask钱包上登录的地址
                await this.props.metamaskwallet.inintWeb3();
                await this.props.metamaskwallet.checkIsCurrendBindAddress();

                if (this.props.metamaskwallet.metamaskAddress)
                {
                    if(!this.props.order.orderInfo)
                    {
                        return false
                    }
                    // 如果用户拒绝了交易，弹出气泡：您已拒绝交易。并自动取消订单，进入【订单已取消】页面。
                    try
                    {
                        const intOrderId = parseInt(this.props.order.orderInfo.orderId,10);
                        const txid = await this.props.transation.buy(this.props.metamaskwallet.metamaskAddress,this.state.minBuyCount,this.props.order.orderInfo.totalCost,intOrderId,this.props.order.hash)     
                        console.log(txid);
                        if(!!txid){
                            this.props.common.openNotificationWithIcon('success', "操作成功", "买入操作已发送，请等待确认");
                            this.props.order.orderMenu=3;
                            this.props.order.confirmBuyOrder(txid);
                            if(this.props.order.timeTen){
                                clearInterval(this.props.order.timeTen);
                                this.props.order.timeTen = null;
                            }  
                        }else{
                            this.props.common.openNotificationWithIcon('error', "操作失败", "买入操作失败");
                        }            
                    } catch (error)
                    {
                        console.log("err",error)
                        this.handleToCancelOrder();
                        this.props.common.openNotificationWithIcon('error', "操作失败", "订单已取消");
                    }                    
                }
                
            }
            else if (this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.platform === 'neo')
            {
                // 获取Teemo钱包上登录的地址                
            }
        }
        else
        {
            // 假如没有登录
            this.setState({
                isCanBuyBtn: false,
                address: ''
            })
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }
        return true;
    }
    // 10分钟倒计时
    private mathTime = (createTime: number) =>
    {
        console.log(createTime)
        console.log(new Date(createTime * 1000));
        console.log(new Date())
        const min10 = 600; // 10分钟
        const current = new Date().getTime() / 1000;
        if(createTime>current){
            createTime=current;
        }
        const lastTime = createTime + min10; // 倒计时结束点的秒

        this.props.order.timeTen = setInterval(() =>
        {
            // 每次 定时器触发都活取下当前时间 注意 除以1000 换算成秒
            const currentTime = new Date().getTime() / 1000;
            // 计算差值时间
            const diff = lastTime - currentTime;
            // 差值小于等于0 就关定时器 并吧 state num 设置成 ‘’
            if (diff <= 0)
            {
                if(this.props.order.timeTen){
                    clearInterval(this.props.order.timeTen);
                    this.props.order.timeTen = null;
                }                
                this.setState({
                    timeCount: ''
                })
                this.props.order.orderMenu = 2;
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
    // 取消订单
    private handleToCancelOrder = () =>
    {
        const res = this.props.order.cancelBuyOrder(this.props.order.orderId);
        if(res){
            if(this.props.order.timeTen){
                clearInterval(this.props.order.timeTen);
                this.props.order.timeTen = null;
            }
            this.props.order.orderMenu = 2;
        }
        
    }
    // 关闭订单页
    // private handleToCloseOrder = () => {
    //     console.log(1)
    //     window.close();
    // }
    // 计算价格差,计算至少可获得多少代币
    private handleComputePriceDiff = (price: string) =>
    {
        const num = this.props.transation.computeSpendPriceBuyCount(price);
        const numInt = parseInt(num, 10)
        if (numInt=== 0)
        {
            this.setState({
                minBuyCount: '0'
            })
        }
        const count = toMyNumber(num).mul(0.98);
        const intNum = web3.toBigNumber(count).toString(10);
        this.setState({
            minBuyCount: parseInt(intNum, 10).toString()
        })
    }
    private handleToGoMyOrder = ()=>{
        this.props.history.push('/personalcenter/myorder');
    }
}
export default injectIntl(Order)