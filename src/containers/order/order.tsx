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
// import { saveDecimal, toMyNumber } from '../../utils/numberTool';
import * as Cookie from '@/utils/cookie';

interface IState
{
    isCanBuyBtn: boolean, // 是否可购买(是否连接上钱包)
    address:string, // 当前连接的钱包地址
    minBuyCount:string, // 至少可获得
    timeCount:string, // 计时时间
}
@inject('order', 'common', 'projectinfo', 'transation', 'teemowallet', 'metamaskwallet')
@observer
class Order extends React.Component<IOrderProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        isCanBuyBtn: false,
        address:'',
        minBuyCount:'0',
        timeCount:''
    }
    public async componentDidMount()
    {
        const projectId = this.props.match.params.projectId;
        const orderId = getQueryString('orderid') || ''
        if (projectId && orderId)
        {
            this.props.order.projId = projectId;
            this.props.order.orderId = orderId;
            this.props.order.getTradeHash(projectId);
            await this.props.order.getBuyOrder(projectId,orderId);
            if(this.props.order.orderInfo){
                this.mathTime(this.props.order.orderInfo.time);
            }
            
            this.handleCheckLinkWallet();
        }
        
    }
    public render()
    {
        if(!this.props.order.orderInfo){
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
                                    <Button
                                        text="关闭本页"
                                        btnSize="md-bg-btn"
                                        onClick={this.handleToCancelOrder}
                                    />
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
                                    <Button
                                        text="关闭本页"
                                        btnSize="md-bg-btn"
                                        btnColor="white-purple"
                                        onClick={this.handleToCancelOrder}
                                    />
                                    <Button
                                        text="我的订单"
                                        btnSize="md-bg-btn"
                                        onClick={this.handleToCancelOrder}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        );
    }
    // 检验是否连接了钱包
    private handleCheckLinkWallet = async () =>
    {
        const user = Cookie.getCookie("user")
        if (user)
        {
            if (this.props.common.isVerifyEmail)
            {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.verifyerr);
                return false;
            }
            // 检测是否连接钱包
            if (this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.platform === 'eth')
            {
                // 获取MetaMask钱包上登陆的地址
                await this.props.metamaskwallet.inintWeb3();
                await this.props.metamaskwallet.checkIsCurrendBindAddress();
                
                if (!this.props.metamaskwallet.metamaskAddress)
                {
                    this.setState({
                        isCanBuyBtn: false
                    })
                    return false;
                }
                this.setState({
                    address: this.props.metamaskwallet.metamaskAddress
                })
            }
            else if (this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.platform === 'neo')
            {
                // 获取Teemo钱包上登陆的地址                
            }
        }
        else
        {
            // 假如没有登陆
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
    private mathTime = (createTime:number) => {
        console.log(createTime)
        console.log(new Date(createTime*1000));
        console.log(new Date())
        const min10 = 600; // 10分钟
        // const ctime = createTime/1000;
        const lastTime = createTime + min10; // 倒计时结束点的秒
    
        const timer = window.setInterval(() => {
          // 每次 定时器触发都活取下当前时间 注意 除以1000 换算成秒
          const currentTime = new Date().getTime() / 1000;
          // 计算差值时间
          let diff = lastTime - currentTime;
          // 差值小于等于0 就关定时器 并吧 state num 设置成 ‘’
          if(diff>600){
              diff = 600;
          }
          if (diff <= 0) {
            clearInterval(timer)
            this.setState({
              timeCount: ''
            })
            return;
          }
    
          // 计算 分 秒 转整数
          const min = parseInt((diff / 60).toString(), 10);
          const sec = parseInt((diff % 60).toString(), 10);
    
          // 赋值。这里注意下 1-9 的时候 前面 补个 0
          this.setState({
            timeCount: (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
          },()=>{
              console.log(this.state.timeCount)
          })
    
        }, 1000)
      }
    // 取消订单
    private handleToCancelOrder = () =>
    {
        this.props.order.orderMenu = 3;
    }
    // 计算价格差
    // private handleComputePriceDiff = (num: string) =>
    // {
    //     if (parseFloat(num) === 0)
    //     {
    //         this.setState({
    //             minBuyCount: '0'
    //         })
    //     }
    //     const count = toMyNumber(num).mul(0.98);
    //     const intNum = web3.toBigNumber(count).toString(10);
    //     this.setState({
    //         minBuyCount: parseInt(intNum, 10).toString()
    //     })
    // }
    // 10分钟倒计时
    // private handleComputeTenMinute = (startTime:string) => {
    //     let maxtime = 10 * 60; // 10分钟
    //     if (maxtime >= 0) {
    //       const minutes = Math.floor(maxtime / 60);
    //       const seconds = Math.floor(maxtime % 60);
    //       const msg = "距离结束还有" + minutes + "分" + seconds + "秒";
    //       document.all["timer"].innerHTML = msg;
    //         maxtime--;
    //     } else{
    //       clearInterval(timer);
    //       alert("时间到，结束!");
    //     }
    //   timer = setInterval("CountDown()", 1000); 
    // }
}
export default injectIntl(Order)