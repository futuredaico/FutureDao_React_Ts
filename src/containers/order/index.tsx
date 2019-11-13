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
import { saveDecimal, toMyNumber } from '../../utils/numberTool';
import * as Cookie from '@/utils/cookie';

// import * as formatTime from '@/utils/formatTime';
interface IState
{
    isCanBuyBtn: boolean, // 是否可购买(是否连接上钱包)
    isCheckOk: boolean, // 是否可购买(是否填写了相关信息)
    myBalance: string,   // 我的余额
    buyNum: string,  // 购买数量
    isMaxBuy: boolean, // 是否为最大购买数量
    spendPrice: string, // 花费的资金
    canGetCount: string // 可获得多少代币
    minBuyCount: string, // 最少可获得的代币
    contactName: string, // 联系人姓名
    contactTel: string, // 号码
    contactAddr: string, // 收货地址
    contactEmail: string, // 邮箱
    contactMsg: string, // 留言
}
@inject('order', 'common', 'projectinfo', 'transation', 'teemowallet', 'metamaskwallet')
@observer
class Order extends React.Component<IOrderProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        isCanBuyBtn: false,
        isCheckOk: false,
        myBalance: '0',
        buyNum: '1',
        isMaxBuy: false,
        spendPrice: '0',
        canGetCount: '0',
        minBuyCount: '0',
        contactName: '',
        contactTel: '',
        contactAddr: '',
        contactEmail: '',
        contactMsg: ''
    }
    public async componentDidMount()
    {
        const projectId = this.props.match.params.projectId;
        console.log(projectId)
        const rewardId = getQueryString('rewardid') || ''
        // const projectId = this.props.location.pathname.replace(this.props.match.path + '/', '');
        if (projectId && rewardId)
        {
            // const projId = projectId.split("/");
            this.props.order.projId = projectId;
            this.props.order.rewardId = rewardId;
            await this.props.projectinfo.getProjInfo(projectId);
            await this.props.order.getRewardInfo(rewardId);
            this.handleCheckLinkWallet();
            this.handleComputeGetData();
        }

    }
    public render()
    {
        if (!this.props.order.rewardDetail || !this.props.projectinfo.projInfo)
        {
            return null;
        }
        return (
            <>
                <div className="order-wrapper">
                    <h2 className="order-title">订单信息</h2>
                    <div className="order-info-box">
                        <div className="order-line">
                            <div className="oline-left">项目</div>
                            <div className="oline-right">{this.props.projectinfo.projInfo.projName}</div>
                        </div>
                        <div className="order-line">
                            <div className="oline-left">回报名称</div>
                            <div className="oline-right">{this.props.order.rewardDetail.rewardName}</div>
                        </div>
                        <div className="order-line">
                            <div className="oline-left">价格</div>
                            <div className="oline-right">{this.props.order.rewardDetail.price} {this.props.order.rewardDetail.fundName.toLocaleUpperCase()}</div>
                        </div>
                        <div className="order-line">
                            <div className="oline-left">购买数量</div>
                            <div className="oline-right">
                                {
                                    (this.state.buyNum && parseInt(this.state.buyNum, 10) > 1) ? <img src={require('@/img/minus-yes.png')} alt="" onClick={this.handleToMinusCount} className="count-icon left-cicon" /> : <img src={require('@/img/minus-no.png')} alt="" className="count-icon left-cicon" />
                                }
                                <input type="text" className="input-count" value={this.state.buyNum} onChange={this.handleChangeBuyCount} />
                                {
                                    this.state.isMaxBuy
                                        ? <img src={require('@/img/plus-no.png')} alt="" className="count-icon right-cicon" />
                                        : <img src={require('@/img/plus-yes.png')} alt="" onClick={this.handleToPlusCount} className="count-icon right-cicon" />
                                }
                            </div>
                        </div>
                        <div className="order-line">
                            <div className="oline-left">获得代币</div>
                            <div className="oline-right">{this.state.canGetCount}（ 估计 ）</div>
                        </div>
                        <div className="order-big-line">
                            <div className="oline-left">总价</div>
                            <div className="oline-right">{this.state.spendPrice}  {this.props.order.rewardDetail.fundName.toLocaleUpperCase()}</div>
                        </div>
                    </div>
                    {
                        this.props.order.rewardDetail.note !== '' && (
                            <div className="attention-please">
                                <img src={require("@/img/attention.png")} alt="" />
                                <span>注意：{this.props.order.rewardDetail.note}</span>
                            </div>
                        )
                    }

                    <h2 className="order-title">收货信息</h2>
                    <div className="order-info-box">
                        <div className="order-line order-line-input">
                            <div className="oline-left">联系人姓名 <span className="red-xin">*</span></div>
                            <div className="oline-right">
                                <input type="text" className="input-text" value={this.state.contactName} onChange={this.handleChangeName} maxLength={50} />
                            </div>
                        </div>
                        <div className="order-line order-line-input">
                            <div className="oline-left">手机号 <span className="red-xin">*</span></div>
                            <div className="oline-right">
                                <div className="input-str">
                                    <input type="text" className="input-text" value={this.state.contactTel} onChange={this.handleChangeTel} maxLength={50} />
                                </div>
                            </div>
                        </div>
                        {
                            this.props.order.rewardDetail.distributeWay === '1' && (
                                <div className="order-line order-line-input">
                                    <div className="oline-left">收货地址 <span className="red-xin">*</span></div>
                                    <div className="oline-right">
                                        <div className="input-str">
                                            <input type="text" className="input-text" value={this.state.contactAddr} onChange={this.handleChangeAddress} maxLength={50} />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="order-line order-line-input">
                            <div className="oline-left">联系邮箱</div>
                            <div className="oline-right">
                                <div className="input-str">
                                    <input type="text" className="input-text" maxLength={50} value={this.state.contactEmail} onChange={this.handleChangeEmail} />
                                </div>
                            </div>
                        </div>
                        <div className="order-line order-line-input">
                            <div className="oline-left">留言</div>
                            <div className="oline-right">
                                <div className="input-str">
                                    <input type="text" placeholder="您对商品有什么特殊要求" className="input-text" value={this.state.contactMsg} onChange={this.handleChangeMessage} maxLength={50} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="order-title">注意事项</h2>
                    <div className="attention-tips">
                        <p className="attention-p">付付款后您将直接转账给项目合约，项目合约会自动为您生成代币。付款成功后您的账户下会生成一份该礼包的订单，订单将由项目团队负责发货以及更新状态。</p>
                        <p className="attention-p">您的付款中将有30%用作代币回购的储备金，70%进入治理池用于支持项目发展。如果您持有项目代币，就可以通过投票决定治理池资金的用途。</p>
                        <p className="attention-p">FutureDao不会为项目做任何担保，也不会调查项目团队是否能够完成自己的承诺。为自己的承诺负责是项目团队应尽的责任。如果您对订单的发货过程有任何问题，请在社区内与项目团队进行沟通。在社区内表达意见、积极参与社区的治理投票，是您保障自身权利的重要渠道。</p>
                    </div>
                </div>
                <div className="order-footer">
                    <Button
                        text={"立即付款  " + this.state.spendPrice + " " + this.props.order.rewardDetail.fundName.toLocaleUpperCase()}
                        btnSize="bg-btn"
                        btnColor={(this.state.isCanBuyBtn && this.state.isCheckOk) ? '' : 'gray-btn'}
                        onClick={this.handleToCreateOrder}
                    />
                </div>
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
                const checkRes = await this.props.metamaskwallet.checkIsCurrendBindAddress();
                // 若与绑定的地址不一致
                if (!checkRes)
                {
                    this.setState({
                        isCanBuyBtn: false
                    })
                    return false
                }
                if (!this.props.metamaskwallet.metamaskAddress)
                {
                    this.setState({
                        isCanBuyBtn: false
                    })
                    return false;
                }
                // 如果存在（现在只获取了eth的余额）
                const ethBalance = await this.props.metamaskwallet.getMetamaskBalance();
                this.setState({
                    isCanBuyBtn: true,
                    myBalance: saveDecimal(ethBalance, 18)
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
                isCanBuyBtn: false
            })
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }
        return true;
    }
    // 减数量
    private handleToMinusCount = () =>
    {
        const num = parseInt(this.state.buyNum, 10);
        console.log(num)
        if (num <= 1)
        {
            this.setState({
                buyNum: '1',
                isMaxBuy: false
            }, () =>
                {
                    this.handleComputeGetData();
                    this.handleCheckAllInput();
                })
        } else
        {
            this.setState({
                buyNum: (num - 1).toString(),
                isMaxBuy: false
            }, () =>
                {
                    this.handleComputeGetData();
                    this.handleCheckAllInput();
                })
        }
    }
    // 加数量
    private handleToPlusCount = () =>
    {
        const num = parseInt(this.state.buyNum, 10);
        if (this.props.order.rewardDetail && this.props.order.rewardDetail.limitFlag === '0')
        {
            // 不限量
            this.setState({
                buyNum: (num + 1).toString(),
                isMaxBuy: false
            }, () =>
                {
                    this.handleComputeGetData();
                    this.handleCheckAllInput();
                })
        } else if (this.props.order.rewardDetail && this.props.order.rewardDetail.limitFlag === '1')
        {
            // 限量
            const addNum = num + 1;
            const maxNum = parseFloat(this.props.order.rewardDetail.limitMax) - parseFloat(this.props.order.rewardDetail.hasSellCount.toString())
            if (addNum >= maxNum)
            {
                this.setState({
                    buyNum: maxNum.toString(),
                    isMaxBuy: true
                }, () =>
                    {
                        this.handleComputeGetData();
                        this.handleCheckAllInput();
                    })
            } else
            {
                this.setState({
                    buyNum: (num + 1).toString(),
                    isMaxBuy: false
                }, () =>
                    {
                        this.handleComputeGetData();
                        this.handleCheckAllInput();
                    })
            }
        }
    }
    // 修改购买数量
    private handleChangeBuyCount = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        // 只能输入数字
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        const reg = /^[0-9]*[1-9][0-9]*$/;
        if (value.toString().length > 0)
        {
            if (!reg.test(ev.target.value))
            {
                return false;
            }
        }
        this.setState({
            buyNum: value.toString()
        }, () =>
            {
                this.handleComputeGetData();
                this.handleCheckAllInput();
            })
        return true
    }
    // 计算可获得的代币
    private handleComputeGetData = () =>
    {
        if (!this.props.order.rewardDetail)
        {
            return false
        }
        // 单价 X 数量
        const price = toMyNumber(this.props.order.rewardDetail.price).mul(this.state.buyNum);
        const priceStr = web3.toBigNumber(price).toString(10);
        this.handleCheckBalance(priceStr);
        const num = this.props.transation.computeSpendPriceBuyCount(priceStr);
        this.setState({
            spendPrice: priceStr,
            canGetCount: parseInt(num, 10).toString()
        })
        return true
    }
    // 检测花费的余额够不够
    private handleCheckBalance = (price: string) =>
    {
        const num1 = parseFloat(price);
        const num2 = parseFloat(this.state.myBalance);
        if (num2 - num1 < 0)
        {
            this.setState({
                isCheckOk: false
            })
        } else
        {
            this.setState({
                isCheckOk: true
            })
        }
    }
    // 联系人的输入
    private handleChangeName = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            contactName: ev.target.value
        }, () =>
            {
                this.handleCheckAllInput();
            })
    }
    // 号码的输入
    private handleChangeTel = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            contactTel: ev.target.value
        }, () =>
            {
                this.handleCheckAllInput();
            })
    }
    // 地址的输入
    private handleChangeAddress = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            contactAddr: ev.target.value
        }, () =>
            {
                this.handleCheckAllInput();
            })
    }
    // 邮箱的输入
    private handleChangeEmail = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            contactEmail: ev.target.value
        }, () =>
            {
                this.handleCheckAllInput();
            })
    }
    // 留言的输入
    private handleChangeMessage = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            contactMsg: ev.target.value
        }, () =>
            {
                this.handleCheckAllInput();
            })
    }
    // 创建订单
    private handleToCreateOrder = async () =>
    {
        if (!this.state.isCanBuyBtn || !this.state.isCheckOk)
        {
            return false;
        }
        const beforeRes = await this.handleBeforeCreateOrder();
        if (!beforeRes)
        {
            return false;
        }
        const res = await this.props.order.createOrder(this.state.buyNum, this.state.canGetCount, this.state.contactName, this.state.contactTel, this.state.contactAddr, this.state.contactEmail, this.state.contactMsg)
        if (res)
        {
            // 获得订单Id之后
            this.props.history.push('/order/'+this.props.order.projId+"?orderid="+this.props.order.orderId)
        } else
        {
            // 订单创建失败
            this.props.common.openNotificationWithIcon('error', "操作失败", "订单创建失败");
        }

        return true;
    }
    // 检查必填项
    private handleCheckAllInput = () =>
    {
        let isOk = true;
        if (!this.state.buyNum)
        {
            isOk = false;
        }
        if (!this.state.contactName)
        {
            isOk = false;
        }
        if (!this.state.contactTel)
        {
            isOk = false;
        }
        // 实物发放
        if (this.props.order.rewardDetail && this.props.order.rewardDetail.distributeWay === '1')
        {
            if (!this.state.contactAddr)
            {
                isOk = false;
            }
        }
        if (isOk)
        {
            this.setState({
                isCheckOk: true
            })
        } else
        {
            this.setState({
                isCheckOk: false
            })
        }
    }
    // 付款前的确认
    private handleBeforeCreateOrder = async () =>
    {
        // 检查购买的回报ID是否还在
        await this.props.order.getRewardInfo(this.props.order.rewardId);
        // 立即付款时检查购买礼包数量是否超过剩余礼包数量    
        if (!this.props.order.rewardDetail||(this.props.order.rewardDetail && this.props.order.rewardDetail.activeState==='0'))
        {
            this.props.common.openNotificationWithIcon('error', "操作失败", "该礼包已下架，请重新选购");
            return false
        }
        else if (this.props.order.rewardDetail && this.props.order.rewardDetail.limitFlag === '1')
        {
            const sellCount = parseFloat(this.props.order.rewardDetail.hasSellCount.toString());
            const maxCount = parseFloat(this.props.order.rewardDetail.limitMax);
            const buyCount = parseFloat(this.state.buyNum);
            const endCount = maxCount - sellCount;
            if (endCount - buyCount < 0)
            {
                this.props.common.openNotificationWithIcon('error', "操作失败", "礼包数量不足，当前剩余" + endCount + "个");
                return false
            }
        }
        return true;
    }
}
export default injectIntl(Order)