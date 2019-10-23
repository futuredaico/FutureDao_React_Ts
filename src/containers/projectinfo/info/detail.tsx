/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IProjectInfoProps, IDiscussList, IDiscussReplyList } from '../interface/projectinfo.interface';
import * as formatTime from '@/utils/formatTime';
import { ProjectState } from '@/store/interface/common.interface';
interface IState
{
    discussInput: string,
    replyInput: string,
    replyInputOther: string,
}
@observer
class ProjectDetail extends React.Component<IProjectInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        discussInput: '',
        replyInput: '',
        replyInputOther: '',
    }
    public componentDidMount()
    {
        this.handleGetDataList('');
    }
    public render()
    {
        if (!this.props.projectinfo.projInfo)
        {
            return null;
        }
        return (
            <>
                <div className="projectdetail-wrapper">
                    <h3 className="title-h3">{this.intrl.projinfo.info}</h3>
                    <div className="detail-p" dangerouslySetInnerHTML={{ '__html': this.props.projectinfo.projInfo.projDetail }} />                    
                </div>
                <div className="message-wrapper" id="message">
                    <h3 className="title-h3">{this.intrl.projinfo.comment}</h3>
                    {
                        (this.props.common.userInfo && this.props.projectinfo.projInfo.isSupport)||(this.props.common.userInfo && this.props.projectinfo.projInfo.projState!==ProjectState.IdeaPub)
                            ? (
                                <div className="textarea-wrapper">
                                    <textarea
                                        name="message"
                                        id=""
                                        maxLength={400}
                                        style={{ resize: 'none' }}
                                        className="message-textarea hei-textarea"
                                        value={this.state.discussInput}
                                        onChange={this.handleChangeDiscuss}
                                    />
                                    <div className="people-message">
                                        <img src={this.props.common.userInfo.headIconUrl ? this.props.common.userInfo.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                                        <strong>{this.props.common.userInfo.username}</strong>
                                        <Button text={this.intrl.btn.comment} btnColor={this.state.discussInput ? '' : 'gray-btn'} onClick={this.handleSendDiscuss} />
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
                    {
                        this.props.projectinfo.projInfo.discussCount !== 0 && (
                            <div className="message-comment">
                                {
                                    this.props.projectinfo.projDiscussList.map((item: IDiscussList, index: number) =>
                                    {
                                        return (
                                            <div className="comment-list" key={index}>
                                                <div className="comment-people">
                                                    <img src={item.headIconUrl ? item.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                                                    <strong>{item.username}</strong>
                                                </div>
                                                <p>{item.discussContent}</p>
                                                <span className="time-tips">{formatTime.computeTime(item.time, this.props.intl.locale)}</span>
                                                <div className="right-other">
                                                    <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" onClick={this.handleOpenReply.bind(this, item)} />
                                                    {
                                                        item.isZan
                                                            ? <img src={require('@/img/zan.png')} className="zan-img" alt="zan.png" />
                                                            : <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" onClick={this.handleSendZan.bind(this, item)} />
                                                    }
                                                    <span>{item.zanCount ? item.zanCount : ''}</span>
                                                </div>
                                                {
                                                    (item.isShowReply && (this.props.projectinfo.projInfo && (this.props.projectinfo.projInfo.isSupport || this.props.projectinfo.projInfo.isStar))) && (
                                                        <div className="comment-input">
                                                            <textarea
                                                                maxLength={500}
                                                                value={this.state.replyInput}
                                                                onChange={this.handleReplyDiscuss}
                                                                className="reply-textarea"
                                                            />
                                                            <Button text={this.intrl.btn.reply} btnColor={this.state.replyInput ? '' : 'gray-btn'} onClick={this.handleSendReplyDiscuss.bind(this, item)} />
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
                                                                                <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" onClick={this.handleOpenReplyOther.bind(this, replyItem)} />
                                                                                {
                                                                                    replyItem.isZan
                                                                                        ? <img src={require('@/img/zan.png')} className="zan-img" alt="zan.png" />
                                                                                        : <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" onClick={this.handleSendZan.bind(this, replyItem)} />
                                                                                }
                                                                                <span>{replyItem.zanCount ? replyItem.zanCount : ''}</span>
                                                                            </div>
                                                                            {
                                                                                (replyItem.isShowReply && (this.props.projectinfo.projInfo && (this.props.projectinfo.projInfo.isSupport || this.props.projectinfo.projInfo.isStar))) && (
                                                                                    <div className="reply-input">
                                                                                        <textarea
                                                                                            maxLength={500}
                                                                                            className="reply-textarea"
                                                                                            value={this.state.replyInputOther}
                                                                                            onChange={this.handleReplyOther}
                                                                                        />
                                                                                        <Button text={this.intrl.btn.reply} btnColor={this.state.replyInputOther ? '' : 'gray-btn'} onClick={this.handleSendReplyOther.bind(this, item, replyItem)} />
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
                        )
                    }
                </div>
            </>
        )
    }
    // 获取留言列表
    private handleGetDataList = async (discussId: string) =>
    {
        await this.props.projectinfo.getProjDiscussList(discussId);
        if (this.props.projectinfo.projDiscussList.length > 0)
        {
            this.props.projectinfo.projDiscussList.map((item: IDiscussList) =>
            {
                if (item.subSize > 0)
                {
                    this.handleGetReplayList(item)
                }
            })
        }
    }
    // 获取回复列表
    private handleGetReplayList = async (item: IDiscussList) =>
    {
        const replyList = await this.props.projectinfo.getProjDiscussReplyList(item.childrenId);
        item.childredList = [...replyList]
    }
    // 留言输入
    private handleChangeDiscuss = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        this.setState({
            discussInput: ev.target.value
        })
    }
    // 发表留言
    private handleSendDiscuss = async () =>
    {
        if (!this.state.discussInput)
        {
            return false;
        }
        const checkRes = this.handleCheckOption();
        if (!checkRes)
        {
            return false;
        }
        const res = await this.props.projectinfo.sendProjDiscuss('', this.state.discussInput);
        if (res)
        {
            this.setState({
                discussInput: ''
            })
            setTimeout(() =>
            {
                this.handleGetDataList('');
            }, 2000)
        }
        return true;
    }
    // 一切操作之前的验证 
    private handleCheckOption = () =>
    {
        // 验证是否登陆
        if (!this.props.common.userInfo)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }
        // 验证是否验证过邮箱
        if (this.props.common.isVerifyEmail)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.verifyerr);
            return false;
        }
        // 验证是否支持了项目
        if (this.props.projectinfo.projInfo && !this.props.projectinfo.projInfo.isSupport)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.supporterr);
            return false
        }
        return true
    }
    // 点赞
    private handleSendZan = async (item: IDiscussList | IDiscussReplyList) =>
    {
        const checkRes = this.handleCheckOption();
        if (!checkRes)
        {
            return false;
        }
        const res = await this.props.projectinfo.sendProZan(item.discussId);
        if (res)
        {
            item.isZan = true;
            item.zanCount++;
        }
        return true
    }
    // 打开回复
    private handleOpenReply = (item: IDiscussList) =>
    {
        const checkRes = this.handleCheckOption();
        if (!checkRes)
        {
            return false;
        }
        this.props.projectinfo.projDiscussList.forEach((list: IDiscussList) =>
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
            discussInput: '',
            replyInput: '',
            replyInputOther: ''
        })
        return true;
    }
    // 打开回复二级
    private handleOpenReplyOther = (replyItem: IDiscussReplyList) =>
    {
        const checkRes = this.handleCheckOption();
        if (!checkRes)
        {
            return false;
        }
        this.props.projectinfo.projDiscussList.forEach((list: IDiscussList) =>
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
            discussInput: '',
            replyInput: '',
            replyInputOther: ''
        })
        return true;
    }
    // 回复评论一级输入
    private handleReplyDiscuss = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        this.setState({
            replyInput: ev.target.value
        })
    }
    // 回复评论输入（二级）
    private handleReplyOther = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        this.setState({
            replyInputOther: ev.target.value
        })
    }
    // 回复评论一级
    private handleSendReplyDiscuss = (item: IDiscussList) =>
    {
        if (!this.state.replyInput)
        {
            return false;
        }
        this.props.projectinfo.sendProjDiscuss(item.discussId, this.state.replyInput);
        item.isShowReply = false;
        setTimeout(() =>
        {
            this.handleGetReplayList(item);
        }, 2000);
        return true;
    }
    // 回复评论二级
    private handleSendReplyOther = (item: IDiscussList, replyItem: IDiscussReplyList) =>
    {
        if (!this.state.replyInputOther)
        {
            return false;
        }
        this.props.projectinfo.sendProjDiscuss(replyItem.discussId, this.state.replyInputOther);
        replyItem.isShowReply = false;
        setTimeout(() =>
        {
            this.handleGetReplayList(item);
        }, 2000)
        return true;
    }
}

export default injectIntl(ProjectDetail);