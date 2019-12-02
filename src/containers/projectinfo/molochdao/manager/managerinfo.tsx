/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../interface/molochinfo.interface';
import VoteBox from './vote';

@observer
class MolochManagerInfo extends React.Component<IMolochInfoProps, any> {
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
                        这是一个提案标题
                        <span className="cancel-btn" onClick={this.handleToOpenStop}>取消提案</span>
                    </h3>
                    <div className="manager-info">
                        <div className="info-line">
                            <div className="iline-left">
                                <strong>提案人</strong>
                            </div>
                            <div className="iline-right">
                                <img src={require('@/img/default.png')} alt="" className="people-headicon" />
                                <div className="people-swrap">
                                    <strong className="member-name">神秘人</strong>
                                    <span>0xac9ba…875e</span>
                                </div>
                            </div>
                        </div>
                        <div className="proposal-info">
                            <div>
                                <strong>提案说明</strong>
                            </div>
                            <p className="info-des">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>要求股份</strong>
                                </div>
                                <div className="iline-right">
                                    <span>1000</span>
                                </div>
                            </div>
                            <div className="info-line">
                                <div className="iline-left">
                                    <strong>贡献</strong>
                                </div>
                                <div className="iline-right">
                                    <span>1000 DAI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="message-wrapper">
                        <h3 className="title-h3">{this.intrl.projinfo.comment}</h3>
                        {
                            (this.props.common.userInfo && this.props.molochinfo.projInfo )
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
                        {/* 留言模块 */}
                        <div className="message-comment">
                            {/* {
                                this.props.update.updateDiscussList.length > 0 && this.props.update.updateDiscussList.map((item: IDiscussList, index: number) =>
                                {
                                    return (
                                        <div className="comment-list" key={index}>
                                            <div className="comment-people">
                                                <img src={item.headIconUrl ? item.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                                                <strong>{item.username}</strong>
                                            </div>
                                            <p>{item.discussContent}</p>
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
                                                (item.isShowReply && (this.props.molochinfo.projInfo && (this.props.molochinfo.projInfo.isSupport || this.props.molochinfo.projInfo.isStar))) && (
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
                                                                        <span className="time-tips">{formatTime.computeTime(replyItem.time, this.props.intl.locale)}</span>
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
                                                                            (replyItem.isShowReply && (this.props.molochinfo.projInfo && (this.props.molochinfo.projInfo.isSupport || this.props.molochinfo.projInfo.isStar))) && (
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
                            } */}
                        </div>
                    </div>
                </div>
                <div className="manager-right">
                    <div className="back-btn">
                        <img src={require('@/img/back.png')} alt="" onClick={this.handleBackManagerList} className="back-img" />
                    </div>
                    <Button text="批准为正式提案" btnSize="bg-bg-btn"/>
                    <Button text="批准为正式提案" btnSize="bg-bg-btn" btnColor="gray-btn" />
                    {/* （ 4小时48分钟后可用 ） */}
                    <VoteBox {...this.props} />
                </div>
            </div>
        );
    }
    private handleToOpenStop = () =>
    {
        this.setState({
            isOpenStopBox: true
        })
    }
    private handleBackManagerList = () =>
    {
        this.props.molochinfo.isShowManagerInfo = false;
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
    //     await this.props.molochinfo.getUpdateDiscussList(discussId);
    //     if (this.props.molochinfo.updateDiscussList.length > 0)
    //     {
    //         this.props.molochinfo.updateDiscussList.map((item: IDiscussList) =>
    //         {
    //             if (item.subSize > 0)
    //             {
    //                 this.handleGetManagerReplyList(item)
    //             }
    //         })
    //     }
    // }
    // 获取回复列表
    // private handleGetManagerReplyList = async (item: IDiscussList) =>
    // {
    //     const replyList = await this.props.update.getUpdateDiscussReplyList(item.childrenId);
    //     item.childredList = [...replyList]
    // }
    // // 一切操作之前的验证 
    // private handleCheckOption = () =>
    // {
    //     // 验证是否登陆
    //     if (!this.props.common.userInfo)
    //     {
    //         this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
    //         return false
    //     }        
    //     // 验证是否支持了项目
    //     if (this.props.molochinfo.projInfo && !this.props.molochinfo.projInfo.isSupport)
    //     {
    //         this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.supporterr);
    //         return false
    //     }
    //     return true
    // }
    // 发表留言
    // private handleSendUpdateDiscuss = async () =>
    // {
    //     if (!this.state.updateDiscuss)
    //     {
    //         return false;
    //     }
    //     const res = await this.props.molochinfo.sendUpdateDiscuss('', this.state.updateDiscuss);
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
    // private handleSendManagerZan = async (item: IDiscussList | IDiscussReplyList) =>
    // {
    //     const checkRes = this.handleCheckOption();
    //     if (!checkRes)
    //     {
    //         return false;
    //     }
    //     const res = await this.props.update.sendUpdateZan(item.discussId);
    //     if (res)
    //     {
    //         item.isZan = true;
    //         item.zanCount++;
    //     }
    //     return true;
    // }
    // // 打开回复
    // private handleOpenUpdatReply = (item: IDiscussList) =>
    // {
    //     const checkRes = this.handleCheckOption();
    //     if (!checkRes)
    //     {
    //         return false;
    //     }
    //     this.props.update.updateDiscussList.forEach((list: IDiscussList) =>
    //     {
    //         if (list.discussId === item.discussId)
    //         {
    //             item.isShowReply = !item.isShowReply;
    //         } else
    //         {
    //             list.isShowReply = false;
    //         }
    //     })
    //     this.setState({
    //         updateDiscuss: '',
    //         updateReply: '',
    //         updateReplyOther: ''
    //     })
    //     return true;
    // }
    // // 打开回复二级
    // private handleOpenUpdatReplyOther = (replyItem: IDiscussReplyList) =>
    // {
    //     const checkRes = this.handleCheckOption();
    //     if (!checkRes)
    //     {
    //         return false;
    //     }
    //     this.props.update.updateDiscussList.forEach((list: IDiscussList) =>
    //     {
    //         list.isShowReply = false;
    //         list.childredList.forEach((replyList: IDiscussReplyList) =>
    //         {
    //             if (replyList.discussId === replyItem.discussId)
    //             {
    //                 replyItem.isShowReply = !replyItem.isShowReply;
    //             } else
    //             {
    //                 replyList.isShowReply = false;
    //             }
    //         })
    //     })
    //     this.setState({
    //         updateDiscuss: '',
    //         updateReply: '',
    //         updateReplyOther: ''
    //     })
    //     return true;
    // }
    // // 回复评论一级输入
    // private handleUpdatReplyDiscuss = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    // {
    //     this.setState({
    //         updateReply: ev.target.value
    //     })
    // }
    // // 回复评论输入（二级）
    // private handleUpdatReplyOther = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    // {
    //     this.setState({
    //         updateReplyOther: ev.target.value
    //     })
    // }
    // // 回复评论一级
    // private handleSendUpdatReplyDiscuss = (item: IDiscussList) =>
    // {
    //     if (!this.state.managerReply)
    //     {
    //         return false;
    //     }
    //     this.props.update.sendUpdateDiscuss(item.discussId, this.state.managerReply);
    //     item.isShowReply = false;
    //     setTimeout(() =>
    //     {
    //         this.handleGetManagerReplyList(item);
    //     }, 2000);
    //     return true;
    // }
    // // 回复评论二级
    // private handleSendUpdatReplyOther = (item: IDiscussList, replyItem: IDiscussReplyList) =>
    // {
    //     if (!this.state.managerReplyOther)
    //     {
    //         return false;
    //     }
    //     this.props.update.sendUpdateDiscuss(replyItem.discussId, this.state.managerReplyOther);
    //     replyItem.isShowReply = false;
    //     setTimeout(() =>
    //     {
    //         this.handleGetManagerReplyList(item);
    //     }, 2000)
    //     return true;
    // }
}

export default injectIntl(MolochManagerInfo);
