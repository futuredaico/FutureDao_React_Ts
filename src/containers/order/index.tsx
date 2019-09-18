/**
 * 支持众筹、产品预售页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { IOrderProps } from './interface/order.interface';
import Button from '@/components/Button';
// import * as formatTime from '@/utils/formatTime';
interface IState
{
    isShowVideo: boolean
}
@inject('order', 'common')
@observer
class Order extends React.Component<IOrderProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isShowVideo: false
    }
    public componentDidMount()
    {
        // const projectId = this.props.match.params.projectId;
    }
    public render()
    {
        return (
            <>
                {
                    this.props.order.orderMenu === 1 && (
                        <>
                            <div className="order-wrapper">
                                <h2 className="order-title">订单信息</h2>
                                <div className="order-info-box">
                                    <div className="order-line">
                                        <div className="oline-left">项目</div>
                                        <div className="oline-right">SS历险记</div>
                                    </div>
                                    <div className="order-line">
                                        <div className="oline-left">回报名称</div>
                                        <div className="oline-right">ZHE SHI YI GE HUI BAO BIAO TI</div>
                                    </div>
                                    <div className="order-line">
                                        <div className="oline-left">价格</div>
                                        <div className="oline-right">10 DAI</div>
                                    </div>
                                    <div className="order-line">
                                        <div className="oline-left">购买数量</div>
                                        <div className="oline-right">
                                            <img src="" alt="" />
                                            <input type="text" className="input-count" />
                                            <img src="" alt="" />
                                        </div>
                                    </div>
                                    <div className="order-line">
                                        <div className="oline-left">获得代币</div>
                                        <div className="oline-right">14（ 估计 ）</div>
                                    </div>
                                    <div className="order-big-line">
                                        <div className="oline-left">总价</div>
                                        <div className="oline-right">10 DAI</div>
                                    </div>
                                </div>
                                <div className="attention-please">
                                    <img src={require("@/img/attention.png")} alt="" />
                                    <span>注意：本产品中国海外无法发货</span>
                                </div>
                                <h2 className="order-title">收货信息</h2>
                                <div className="order-info-box">
                                    <div className="order-line order-line-input">
                                        <div className="oline-left">联系人姓名 <span className="red-xin">*</span></div>
                                        <div className="oline-right">
                                            <input type="text" className="input-text" />

                                        </div>
                                    </div>
                                    <div className="order-line order-line-input">
                                        <div className="oline-left">手机号 <span className="red-xin">*</span></div>
                                        <div className="oline-right">
                                            <div className="input-str">
                                                <input type="text" className="input-text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-line order-line-input">
                                        <div className="oline-left">收货地址 <span className="red-xin">*</span></div>
                                        <div className="oline-right">
                                            <div className="input-str">
                                                <input type="text" className="input-text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-line order-line-input">
                                        <div className="oline-left">联系邮箱</div>
                                        <div className="oline-right">
                                            <div className="input-str">
                                                <input type="text" className="input-text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-line order-line-input">
                                        <div className="oline-left">留言</div>
                                        <div className="oline-right">
                                            <div className="input-str">
                                                <input type="text" placeholder="您对商品有什么特殊要求" className="input-text" />
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
                                    text="立即付款  10 DAI"
                                    btnSize="bg-btn"
                                    onClick={this.handleToCreateOrder}
                                />
                            </div>
                        </>
                    )
                }
                {
                    this.props.order.orderMenu === 2 && (
                        <div className="order-create-wrapper">
                            <div className="order-create-content">
                                <h1 className="ocreate-title">订单已创建</h1>
                                <div className="ocreate-content">
                                    <div className="content-line">
                                        <div className="cline-left">转账给</div>
                                        <div className="cline-right">0xA73359ca0d82d0971b7c84662e3109C88E710BFF</div>
                                    </div>
                                    <div className="content-line">
                                        <div className="cline-left">转账金额</div>
                                        <div className="cline-right">0.1 ETH</div>
                                    </div>
                                    <div className="content-line">
                                        <div className="cline-left">手续费</div>
                                        <div className="cline-right">0.0021 ETH</div>
                                    </div>
                                </div>
                                <p className="ocreate-p">请在钱包中确认交易</p>
                                <p className="ocreate-p">请在 <span className="purple-span">9:59</span> 内确认付款，否则订单将自动取消</p>
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
                    this.props.order.orderMenu === 3 && (
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
                    this.props.order.orderMenu === 4 && (
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
    private handleToCreateOrder = () =>
    {
        this.props.order.orderMenu = 2;
    }
    private handleToCancelOrder = () =>
    {
        this.props.order.orderMenu = 3;
    }
}
export default injectIntl(Order)