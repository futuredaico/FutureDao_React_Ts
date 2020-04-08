/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IProjectInfoProps } from '../../interface/projectinfo.interface';
// import Hint from '@/components/hint';
import Vote from './vote';

@observer
class ManagerInfo extends React.Component<IProjectInfoProps, any> {
    public intrl = this.props.intl.messages;
    public state = {
        managerDiscuss: '',
        managerReply: '',
        managerReplyOther: '',
        isOpenStopBox: false,
        showDeletBox: false
    }
    public render()
    {
        return (
            <div className="manager-wrapper manager-info-wrapper">
                <div className="manager-left">
                    <h3 className="title-h3">
                        <span className="stop-card">已终止</span>
                        更改项目月供资金至6%，300-500DAI
                        <span className="cancel-btn" onClick={this.handleToOpenStop}>取消提案</span>
                    </h3>
                    <div className="manager-info">
                        {/* 提案人 */}
                        <div className="info-line">
                            <div className="iline-left">
                                <strong>{this.intrl.manager.proposer}</strong>
                            </div>
                            <div className="iline-right">
                                <img src={require('@/img/default.png')} alt="" className="people-headicon" />
                                <div className="people-swrap">
                                    <strong className="member-name">{this.intrl.user.shen}</strong>
                                    <span>asdfasdfasdfasdfasdfasdfasdfa</span>
                                </div>
                            </div>
                        </div>
                        {/* 提案具体详情 */}
                        <div className="proposal-info">

                            {/* 月供资金类型 */}
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>月供资金</strong>
                                </div>
                                <div className="iline-right">
                                    <strong className="purple-strong" >修改为：6%已募资金，最少300DAI，最多500DAI</strong>
                                </div>
                            </div>
                            <div>
                                <strong>补充说明</strong>
                            </div>
                            <p className="info-des">{this.intrl.projinfo.null}</p>
                        </div>
                    </div>
                </div>
                <div className="manager-right">
                    <div className="back-btn">
                        <img src={require('@/img/back.png')} alt="" onClick={this.handleBackManagerList} className="back-img" />
                    </div>
                    <Vote {...this.props} />
                    {/* <div className="stop-tips">
                        <p>本提案已被管理员终止，提案已作废。</p>
                        <p>如果您对处理结果有任何疑问，请与社区管理员沟通。</p>
                    </div>
                    <h3 className="title-h3">领取资金</h3>
                    <div className="settled-btn">
                        <Button text="结算提案" btnSize="vote-btn" />
                    </div>
                    <div className="getprice-box">
                        <div className="getprice-line">
                            <span className="gline-left">资金总额</span>
                            <span className="gline-right">100 DAI</span>
                        </div>
                        <div className="getprice-line">
                            <span className="gline-left">发放进度</span>
                            <span className="gline-right">4/10 天I</span>
                        </div>
                        <div className="getprice-line">
                            <span className="gline-left">已领取</span>
                            <span className="gline-right">0 DAI</span>
                        </div>
                        <div className="getprice-line">
                            <span className="gline-left">待领取</span>
                            <span className="gline-right">40 DAI</span>
                        </div>
                        <div className="getprice-btn">
                            <Button text="领取 40 DAI" btnSize="vote-btn" />
                        </div>
                    </div> */}
                    {/* <h3 className="title-h3">
                        投票
                        <Hint
                            text="同意票多于反对票且反对票不超过总票数的30%时，提案将被通过。"
                            hintType="right-hint"
                        />
                        <span className="title-gray">&nbsp;&nbsp;（ 剩余 15天23时59分59秒 ）</span>
                    </h3>
                    <div className="vote-box agree-vote disagree-vote">
                        <div className="vote-title">制作人工资支付的提案</div>
                        <div className="manager-votebox">
                            <div className="green-sai" style={{ "width": 60 + "%" }} />
                            <div className="red-sai" style={{ "width": 40 + "%" }} />
                            <span className="left-top">赞同：1135</span>
                            <span className="right-top">反对：447</span>
                        </div>
                        <div className="myvote">
                            <div className="myvote-title">
                                <strong>我的投票</strong>
                                <Hint
                                    text="用户每拥有一个可用代币可以投一票。投票后将根据已投票数对代币进行锁仓，本提案投票结束后可解锁对应代币。%时，提案将被通过。"
                                    hintType="right-hint"
                                />
                            </div>
                            <div className="myvote-sider">滚动</div>
                            <div className="myvote-btn">
                                <Button text="赞同 +20" btnColor="bright-green" />
                                <Button text="反对 +20" btnColor="bright-red" />                                
                            </div>
                            <Button text="赞同 +20" btnColor="gray-btn" btnSize="vote-btn" />
                        </div>
                    </div>
                    <div className="going-box">
                        <span>2019-08-08 12:12:12 开始执行</span><br />
                        <span className="small-str">（ 1/30已完成 ）</span>
                    </div>
                    <div className="fail-box">
                        <span>提案未通过</span>
                    </div> */}
                </div>
                {
                    this.state.isOpenStopBox && (
                        <div className="stop-wrapper">
                            <div className="stop-content">
                                <div className="stop-close">
                                    <img src={require('@/img/close2.png')} alt="close2.png" onClick={this.handleToCloseStop} className="close-icon" />
                                </div>
                                <div className="stop-title"><strong>终止提案</strong></div>
                                <span className="stop-span">终止理由</span>
                                <textarea name="stopinfo" className="stop-reason" />
                                <div className="stopbtn-wrap">
                                    <Button text="取消" btnColor="red-btn" btnSize="stop-btn" />
                                    <Button text="终止提案" btnSize="stop-btn" onClick={this.handleToShowCheckStop} />
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    this.state.showDeletBox && (
                        <div className="delete-info-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">确认取消此提案？</div>
                                <div className="delete-btn">
                                    <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleToCloseStop} />
                                    <Button text={this.intrl.btn.comfirm} onClick={this.handleStopProposal} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
    private handleToOpenStop = () =>
    {
        this.setState({
            isOpenStopBox: true
        })
    }
    private handleToCloseStop = () =>
    {
        this.setState({
            isOpenStopBox: false,
            showDeletBox: false
        })
    }
    private handleToShowCheckStop = () =>
    {
        this.setState({
            showDeletBox: true
        })
    }
    private handleStopProposal = () =>
    {
        // todo
        this.handleToCloseStop();
    }
    private handleBackManagerList = () =>
    {
        this.props.projectinfo.isShowManagerInfo = false;
    }
}

export default injectIntl(ManagerInfo);
