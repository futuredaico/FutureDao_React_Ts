/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IProjectInfoProps, IDiscussList, IDiscussReplyList } from '../interface/projectinfo.interface';
import Hint from '@/components/hint';
import * as formatTime from '@/utils/formatTime';

@observer
class ManagerInfo extends React.Component<IProjectInfoProps, any> {
    public intrl = this.props.intl.messages;
    public state = {
        managerDiscuss: '',
        managerReply: '',
        managerReplyOther: '',
        isOpenStopBox: false,
        showDeletBox:false
    }
    public render()
    {
        return (
            <div className="manager-wrapper manager-info-wrapper">
                <div className="manager-left">
                    <h3 className="title-h3">
                        <span className="stop-card">已终止</span>
                        制作人工资支付的提案
                        <span className="cancel-btn" onClick={this.handleToOpenStop}>取消提案</span>
                    </h3>
                    <div className="manager-info">
                        <div className="info-line">
                            <div className="iline-left">
                                <strong>处理人</strong>
                            </div>
                            <div className="iline-right">
                                <img src={require('@/img/default.png')} alt="" className="people-headicon" />
                                <span className="people-name">某某某</span>
                            </div>
                        </div>
                        <div>
                            <strong>终止理由</strong>
                        </div>
                        <p className="stop-des">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. </p>
                        <div>
                            <strong>终止内容</strong>
                        </div>
                        {/* 终止时显示  className="stop-infocontent" */}
                        <div className="stop-infocontent">
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>提案人</strong>
                                </div>
                                <div className="iline-right">
                                    <img src={require('@/img/default.png')} alt="" className="people-headicon" />
                                    <span className="people-name">某某某</span>
                                </div>
                            </div>
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>申请资金</strong>
                                </div>
                                <div className="iline-right">
                                    <span>10 ETH</span>
                                </div>
                            </div>
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>接受人</strong>
                                </div>
                                <div className="iline-right">
                                    <img src={require('@/img/default.png')} alt="" className="people-headicon" />
                                    <span className="people-name">某某某</span>
                                    <span className="addr-str">AZqYuFAHkNkvvdCViZvdQG3uaPpGffZiD7</span>
                                </div>
                            </div>
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>发放方式</strong>
                                </div>
                                <div className="iline-right">
                                    <span>每天发放1ETH，共10天</span>
                                </div>
                            </div>
                            <div>
                                <strong>详情</strong>
                            </div>
                            <p className="info-des">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>执行结果</strong>
                                </div>
                                <div className="iline-right">
                                    <span>未执行</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="message-wrapper">
                        <h3 className="title-h3">{this.intrl.projinfo.comment}</h3>
                        {
                            (this.props.common.userInfo && this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.isSupport)
                                ? (
                                    <div className="textarea-wrapper">
                                        <textarea
                                            name="message"
                                            id=""
                                            maxLength={400}
                                            style={{ resize: 'none' }}
                                            className="message-textarea"
                                            value={this.state.managerDiscuss}
                                            onChange={this.handleChangeManagerDiscuss}
                                        />
                                        <div className="people-message">
                                            <img src={this.props.common.userInfo.headIconUrl ? this.props.common.userInfo.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                                            <strong>{this.props.common.userInfo.username}</strong>
                                            <Button text={this.intrl.btn.comment} btnColor={this.state.managerDiscuss ? '' : 'gray-btn'} />
                                        </div>
                                    </div>
                                )
                                : <div className="textarea-wrapper">
                                    <textarea
                                        name="message"
                                        id=""
                                        maxLength={400}
                                        style={{ resize: 'none' }}
                                        className="message-textarea hei-textarea"
                                        readOnly={true}
                                        value={this.intrl.projinfo.textarea}
                                    />
                                    {
                                        this.props.common.userInfo && (
                                            <div className="people-message">
                                                <img src={this.props.common.userInfo.headIconUrl ? this.props.common.userInfo.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                                                <strong>{this.props.common.userInfo.username}</strong>
                                            </div>
                                        )
                                    }
                                </div>
                        }
                        <div className="message-comment">
                            {
                                this.props.update.updateDiscussList.length > 0 && this.props.update.updateDiscussList.map((item: IDiscussList, index: number) =>
                                {
                                    return (
                                        <div className="comment-list" key={index}>
                                            <div className="comment-people">
                                                <img src={item.headIconUrl ? item.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                                                <strong>{item.username}</strong>
                                            </div>
                                            <p>{item.discussContent}</p>
                                            {/* <span className="time-tips">{formatTime.computeTime(item.time.toString(), this.props.intl.locale)} {this.props.intl.locale === 'en'?' ago':'前更新'}</span> */}
                                            <div className="right-other">
                                                <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" onClick={this.handleOpenUpdatReply.bind(this, item)} />
                                                {
                                                    item.isZan
                                                        ? <img src={require('@/img/zan.png')} className="zan-img" alt="zan.png" />
                                                        : <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" onClick={this.handleSendManagerZan.bind(this, item)} />
                                                }
                                                <span>{item.zanCount ? item.zanCount : ''}</span>
                                            </div>
                                            {
                                                (item.isShowReply && (this.props.projectinfo.projInfo && (this.props.projectinfo.projInfo.isSupport || this.props.projectinfo.projInfo.isStar))) && (
                                                    <div className="comment-input">
                                                        <textarea
                                                            maxLength={500}
                                                            value={this.state.managerReply}
                                                            onChange={this.handleUpdatReplyDiscuss}
                                                            className="reply-textarea"
                                                        />
                                                        <Button text={this.intrl.btn.reply} btnColor={this.state.managerReply ? '' : 'gray-btn'} onClick={this.handleSendUpdatReplyDiscuss.bind(this, item)} />
                                                    </div>
                                                )
                                            }
                                            {
                                                (item.childredList.length > 0) && (
                                                    <div className="reply-comment">
                                                        {
                                                            item.childredList.map((replyItem: IDiscussReplyList, num: number) =>
                                                            {
                                                                return (
                                                                    <div className="reply-list" key={num}>
                                                                        <div className="reply-people">
                                                                            <img src={replyItem.headIconUrl ? replyItem.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                                                                            <strong>{replyItem.username}</strong>
                                                                        </div>
                                                                        <p><strong>{this.intrl.projinfo.reply} {replyItem.preUsername}：</strong>{replyItem.discussContent}</p>
                                                                        <span className="time-tips">{formatTime.computeTime(replyItem.time.toString(), this.props.intl.locale)} {this.props.intl.locale === 'en'?' ago':'前更新'}</span>
                                                                        <div className="right-other">
                                                                            <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" onClick={this.handleOpenUpdatReplyOther.bind(this, replyItem)} />
                                                                            {
                                                                                replyItem.isZan
                                                                                    ? <img src={require('@/img/zan.png')} className="zan-img" alt="zan.png" />
                                                                                    : <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" onClick={this.handleSendManagerZan.bind(this, replyItem)} />
                                                                            }
                                                                            <span>{replyItem.zanCount ? replyItem.zanCount : ''}</span>
                                                                        </div>
                                                                        {
                                                                            (replyItem.isShowReply && (this.props.projectinfo.projInfo && (this.props.projectinfo.projInfo.isSupport || this.props.projectinfo.projInfo.isStar))) && (
                                                                                <div className="reply-input">
                                                                                    <textarea
                                                                                        className="reply-textarea"
                                                                                        value={this.state.managerReplyOther}
                                                                                        onChange={this.handleUpdatReplyOther}
                                                                                    />
                                                                                    <Button text={this.intrl.btn.reply} btnColor={this.state.managerReplyOther ? '' : 'gray-btn'} onClick={this.handleSendUpdatReplyOther.bind(this, item, replyItem)} />
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="manager-right">
                    <div className="back-btn">
                        <img src={require('@/img/back.png')} alt="" onClick={this.handleBackManagerList} className="back-img" />
                    </div>
                    <div className="stop-tips">
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
                    </div>
                    <h3 className="title-h3">
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
                            {/* <div className="myvote-sider">滚动</div> */}
                            {/* <div className="myvote-btn">
                                <Button text="赞同 +20" btnColor="bright-green" />
                                <Button text="反对 +20" btnColor="bright-red" />                                
                            </div> */}
                            <Button text="赞同 +20" btnColor="gray-btn" btnSize="vote-btn" />
                        </div>
                    </div>
                    <div className="going-box">
                        <span>2019-08-08 12:12:12 开始执行</span><br />
                        <span className="small-str">（ 1/30已完成 ）</span>
                    </div>
                    <div className="fail-box">
                        <span>提案未通过</span>
                    </div>
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
            showDeletBox:false
        })
    }
    private handleToShowCheckStop = () => {
        this.setState({
            showDeletBox:true
        })
    }
    private handleStopProposal = () => {
        // todo
        this.handleToCloseStop();
    }
    private handleBackManagerList = () =>
    {
        this.props.projectinfo.isShowManagerInfo = false;
    }
    // 留言输入
    private handleChangeManagerDiscuss = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        this.setState({
            managerDiscuss: ev.target.value
        })
    }
    // // 获取列表
    // private handleGetManagerDiscussList = async (discussId: string) =>
    // {
    //     await this.props.projectinfo.getUpdateDiscussList(discussId);
    //     if (this.props.projectinfo.updateDiscussList.length > 0)
    //     {
    //         this.props.projectinfo.updateDiscussList.map((item: IDiscussList) =>
    //         {
    //             if (item.subSize > 0)
    //             {
    //                 this.handleGetManagerReplyList(item)
    //             }
    //         })
    //     }
    // }
    // 获取回复列表
    private handleGetManagerReplyList = async (item: IDiscussList) =>
    {
        const replyList = await this.props.update.getUpdateDiscussReplyList(item.childrenId);
        item.childredList = [...replyList]
    }
    // 一切操作之前的验证 
    private handleCheckOption = () =>
    {
        // 验证是否登录
        if (!this.props.common.userInfo)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }        
        // 验证是否支持了项目
        if (this.props.projectinfo.projInfo && !this.props.projectinfo.projInfo.isSupport)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.supporterr);
            return false
        }
        return true
    }
    // 发表留言
    // private handleSendUpdateDiscuss = async () =>
    // {
    //     if (!this.state.updateDiscuss)
    //     {
    //         return false;
    //     }
    //     const res = await this.props.projectinfo.sendUpdateDiscuss('', this.state.updateDiscuss);
    //     if (res)
    //     {
    //         this.setState({
    //             updateDiscuss: ''
    //         })
    //         setTimeout(() =>
    //         {
    //             this.handleGetUpdateDiscussList('');
    //         }, 2000)
    //     }
    //     return true;
    // }
    // 评论的点赞
    private handleSendManagerZan = async (item: IDiscussList | IDiscussReplyList) =>
    {
        const checkRes = this.handleCheckOption();
        if (!checkRes)
        {
            return false;
        }
        const res = await this.props.update.sendUpdateZan(item.discussId);
        if (res)
        {
            item.isZan = true;
            item.zanCount++;
        }
        return true;
    }
    // 打开回复
    private handleOpenUpdatReply = (item: IDiscussList) =>
    {
        const checkRes = this.handleCheckOption();
        if (!checkRes)
        {
            return false;
        }
        this.props.update.updateDiscussList.forEach((list: IDiscussList) =>
        {
            if (list.discussId === item.discussId)
            {
                item.isShowReply = !item.isShowReply;
            } else
            {
                list.isShowReply = false;
            }
        })
        this.setState({
            updateDiscuss: '',
            updateReply: '',
            updateReplyOther: ''
        })
        return true;
    }
    // 打开回复二级
    private handleOpenUpdatReplyOther = (replyItem: IDiscussReplyList) =>
    {
        const checkRes = this.handleCheckOption();
        if (!checkRes)
        {
            return false;
        }
        this.props.update.updateDiscussList.forEach((list: IDiscussList) =>
        {
            list.isShowReply = false;
            list.childredList.forEach((replyList: IDiscussReplyList) =>
            {
                if (replyList.discussId === replyItem.discussId)
                {
                    replyItem.isShowReply = !replyItem.isShowReply;
                } else
                {
                    replyList.isShowReply = false;
                }
            })
        })
        this.setState({
            updateDiscuss: '',
            updateReply: '',
            updateReplyOther: ''
        })
        return true;
    }
    // 回复评论一级输入
    private handleUpdatReplyDiscuss = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        this.setState({
            updateReply: ev.target.value
        })
    }
    // 回复评论输入（二级）
    private handleUpdatReplyOther = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        this.setState({
            updateReplyOther: ev.target.value
        })
    }
    // 回复评论一级
    private handleSendUpdatReplyDiscuss = (item: IDiscussList) =>
    {
        if (!this.state.managerReply)
        {
            return false;
        }
        this.props.update.sendUpdateDiscuss(item.discussId, this.state.managerReply);
        item.isShowReply = false;
        setTimeout(() =>
        {
            this.handleGetManagerReplyList(item);
        }, 2000);
        return true;
    }
    // 回复评论二级
    private handleSendUpdatReplyOther = (item: IDiscussList, replyItem: IDiscussReplyList) =>
    {
        if (!this.state.managerReplyOther)
        {
            return false;
        }
        this.props.update.sendUpdateDiscuss(replyItem.discussId, this.state.managerReplyOther);
        replyItem.isShowReply = false;
        setTimeout(() =>
        {
            this.handleGetManagerReplyList(item);
        }, 2000)
        return true;
    }
}

export default injectIntl(ManagerInfo);
