/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IProjectInfoProps, IDiscussList, IDiscussReplyList } from './interface/projectinfo.interface';
import * as formatTime from '@/utils/formatTime';
@observer
class ProjectDetail extends React.Component<IProjectInfoProps, any> {
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
                    <h3>项目详情</h3>
                    {/* <p>{this.props.projectinfo.projInfo.projDetail}</p> */}
                    <div className="detail-p" dangerouslySetInnerHTML={{ '__html': this.props.projectinfo.projInfo.projDetail }} />
                    {/* <img src={require('@/img/tu2.png')} alt="" className="detail-img" /> */}
                </div>
                <div className="message-wrapper" id="message">
                    <h3>留言</h3>
                    {
                        (this.props.common.userInfo && (this.props.projectinfo.projInfo.isStar || this.props.projectinfo.projInfo.isSupport)) && (
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
                                    <img src={this.props.common.userInfo.headIconUrl ? this.props.common.userInfo.headIconUrl.replace('temp_', '') : require('@/img/default.png')} alt="" />
                                    <strong>{this.props.common.userInfo.username}</strong>
                                    <Button text="发表评论" btnColor={this.state.discussInput ? '' : 'gray-btn'} onClick={this.handleSendDiscuss} />
                                </div>
                            </div>
                        )
                    }
                    <div className="message-comment">
                        {
                            this.props.projectinfo.projDiscussList.length > 0 && this.props.projectinfo.projDiscussList.map((item: IDiscussList, index: number) =>
                            {
                                return (

                                    <div className="comment-list" key={index}>
                                        <div className="comment-people">
                                            <img src={item.headIconUrl ? item.headIconUrl.replace('temp_', '') : require('@/img/default.png')} alt="" />
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
                                                    <Button text="回复" btnColor={this.state.replyInput ? '' : 'gray-btn'} onClick={this.handleSendReplyDiscuss.bind(this, item)} />
                                                </div>
                                            )
                                        }
                                        {
                                            (item.isShowReply && item.subSize > 0) && (
                                                <div className="reply-comment">
                                                    {
                                                        this.props.projectinfo.projDiscussReplyList.map((replyItem: IDiscussReplyList, num: number) =>
                                                        {
                                                            return (
                                                                <div className="reply-list" key={num}>
                                                                    <div className="reply-people">
                                                                        <img src={replyItem.headIconUrl ? replyItem.headIconUrl.replace('temp_', '') : require('@/img/default.png')} alt="" />
                                                                        <strong>{replyItem.username}</strong>
                                                                    </div>
                                                                    <p><strong>回复 {replyItem.preUsername}：</strong>{replyItem.discussContent}</p>
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
                                                                                    className="reply-textarea"
                                                                                    value={this.state.replyInputOther}
                                                                                    onChange={this.handleReplyOther}
                                                                                />
                                                                                <Button text="回复" btnColor={this.state.replyInputOther ? '' : 'gray-btn'} onClick={this.handleSendReplyOther.bind(this, item, replyItem)} />
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
            </>
        );
    }
    // 获取列表
    private handleGetDataList = (discussId: string) =>
    {
        this.props.projectinfo.getProjDiscussList(discussId);
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
        if (this.props.common.isVerifyEmail)
        {
            this.props.common.openNotificationWithIcon('error', '操作失败', '请验证邮箱之后在操作，谢谢');
            return false;
        }
        const res = await this.props.projectinfo.sendProjDiscuss('', this.state.discussInput);
        if (res)
        {
            this.setState({
                discussInput: ''
            })
        }
        return true;
    }
    // 点赞
    private handleSendZan = async (item: IDiscussList | IDiscussReplyList) =>
    {
        const res = await this.props.projectinfo.sendProZan(item.discussId);
        if (res)
        {
            item.isZan = true;
        }
    }
    // 打开回复
    private handleOpenReply = (item: IDiscussList) =>
    {

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
        if (item.isShowReply)
        {
            this.props.projectinfo.getProjDiscussReplyList(item.childrenId);
        }
    }
    // 打开回复二级
    private handleOpenReplyOther = (item: IDiscussReplyList) =>
    {
        this.props.projectinfo.projDiscussReplyList.forEach((list: IDiscussReplyList) =>
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
            this.props.projectinfo.getProjDiscussReplyList(item.childrenId);
        }, 2000)
        return true;
    }
}

export default injectIntl(ProjectDetail);
