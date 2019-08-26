/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IProjectInfoProps, IDiscussList, IDiscussReplyList } from './interface/projectinfo.interface';
// import RightTable from './transright';
import * as formatTime from '@/utils/formatTime';
@observer
class UpdateInfo extends React.Component<IProjectInfoProps, any> {
    public state = {
        showDelet: false,
        updateDiscuss: '',
        updateReply: '',
        updateReplyOther: ''
    }
    public componentDidMount()
    {
        this.props.projectinfo.getUpdateInfo();
        this.handleGetUpdateDiscussList('');
    }
    public componentWillUnmount()
    {
        this.props.projectinfo.updateInfo = null;
    }
    public render()
    {
        if (!this.props.projectinfo.updateInfo)
        {
            return <div />;
        }
        return (
            <div className="updateinfo-wrapper">
                <div className="updateinfo-top" >
                    <div className="updateinfo-tips">
                        <span>{formatTime.format('yyyy-MM-dd ', this.props.projectinfo.updateInfo.lastUpdateTime.toString(), this.props.intl.locale)}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>#{this.props.projectinfo.updateInfo.rank}更新</span>
                        <img src={require('@/img/back.png')} alt="" onClick={this.handleBackUpdateList} className="back-img" />
                    </div>
                    <strong className="update-title">{this.props.projectinfo.updateInfo.updateTitle}</strong>
                    <div className="update-people">
                        <img src={this.props.projectinfo.updateInfo.headIconUrl ? this.props.projectinfo.updateInfo.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                        <strong>{this.props.projectinfo.updateInfo.username}</strong>
                        {
                            this.props.projectinfo.updateInfo.isMember && (
                                <div className="right-update">
                                    <span onClick={this.handleToUpdateEdit}>修改</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span onClick={this.handleShowDelete}>删除</span>
                                </div>
                            )
                        }

                    </div>
                    <div className="updateinfo-p" dangerouslySetInnerHTML={{ '__html': this.props.projectinfo.updateInfo.updateDetail }} />
                    {
                        this.props.projectinfo.updateInfo.isZan
                            ? <img src={require('@/img/zan.png')} className="zan-img" alt="zan.png" />
                            : <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" onClick={this.handleSendUpdateZanInfo} />
                    }
                    <span className="zan-span">{this.props.projectinfo.updateInfo.zanCount}</span>
                </div>
                <div className="message-wrapper" id="message">
                    <div className="updateinfo-tips">
                        <span>评论：{this.props.projectinfo.updateInfo.discussCount}</span>
                    </div>
                    {
                        (this.props.common.userInfo && (this.props.projectinfo.projInfo && (this.props.projectinfo.projInfo.isStar || this.props.projectinfo.projInfo.isSupport))) && (
                            <div className="textarea-wrapper">
                                <textarea
                                    name="message"
                                    id=""
                                    maxLength={400}
                                    style={{ resize: 'none' }}
                                    className="message-textarea"
                                    value={this.state.updateDiscuss}
                                    onChange={this.handleChangeUpdateDiscuss}
                                />
                                <div className="people-message">
                                    <img src={this.props.common.userInfo.headIconUrl ? this.props.common.userInfo.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                                    <strong>{this.props.common.userInfo.username}</strong>
                                    <Button text="发表评论" btnColor={this.state.updateDiscuss ? '' : 'gray-btn'} onClick={this.handleSendUpdateDiscuss} />
                                </div>
                            </div>
                        )
                    }
                    <div className="message-comment">
                        {
                            this.props.projectinfo.updateDiscussList.length > 0 && this.props.projectinfo.updateDiscussList.map((item: IDiscussList, index: number) =>
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
                                            <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" onClick={this.handleOpenUpdatReply.bind(this, item)} />
                                            {
                                                item.isZan
                                                    ? <img src={require('@/img/zan.png')} className="zan-img" alt="zan.png" />
                                                    : <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" onClick={this.handleSendUpdateZan.bind(this, item)} />
                                            }
                                            <span>{item.zanCount ? item.zanCount : ''}</span>
                                        </div>
                                        {
                                            (item.isShowReply && (this.props.projectinfo.projInfo && (this.props.projectinfo.projInfo.isSupport || this.props.projectinfo.projInfo.isStar))) && (
                                                <div className="comment-input">
                                                    <textarea
                                                        maxLength={500}
                                                        value={this.state.updateReply}
                                                        onChange={this.handleUpdatReplyDiscuss}
                                                        className="reply-textarea"
                                                    />
                                                    <Button text="回复" btnColor={this.state.updateReply ? '' : 'gray-btn'} onClick={this.handleSendUpdatReplyDiscuss.bind(this, item)} />
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
                                                                    <p><strong>回复 {replyItem.preUsername}：</strong>{replyItem.discussContent}</p>
                                                                    <span className="time-tips">{formatTime.computeTime(replyItem.time, this.props.intl.locale)}</span>
                                                                    <div className="right-other">
                                                                        <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" onClick={this.handleOpenUpdatReplyOther.bind(this, replyItem)} />
                                                                        {
                                                                            replyItem.isZan
                                                                                ? <img src={require('@/img/zan.png')} className="zan-img" alt="zan.png" />
                                                                                : <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" onClick={this.handleSendUpdateZan.bind(this, replyItem)} />
                                                                        }
                                                                        <span>{replyItem.zanCount ? replyItem.zanCount : ''}</span>
                                                                    </div>
                                                                    {
                                                                        (replyItem.isShowReply && (this.props.projectinfo.projInfo && (this.props.projectinfo.projInfo.isSupport || this.props.projectinfo.projInfo.isStar))) && (
                                                                            <div className="reply-input">
                                                                                <textarea
                                                                                    className="reply-textarea"
                                                                                    value={this.state.updateReplyOther}
                                                                                    onChange={this.handleUpdatReplyOther}
                                                                                />
                                                                                <Button text="回复" btnColor={this.state.updateReplyOther ? '' : 'gray-btn'} onClick={this.handleSendUpdatReplyOther.bind(this, item, replyItem)} />
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
                {
                    this.state.showDelet && (
                        <div className="delete-info-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">确认删除本次更新？</div>
                                <div className="delete-btn">
                                    <Button text="取消" btnColor="red-btn" onClick={this.handleShowDelete} />
                                    <Button text="确认" onClick={this.handleDeleteUpdate} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
    // 返回列表页
    private handleBackUpdateList = () =>
    {
        this.props.projectinfo.isShowUpdateInfo = false;
    }
    
    // 显示删除项目弹框
    private handleShowDelete = () =>
    {
        this.setState({
            showDelet: !this.state.showDelet
        })
    }
    // 删除更新
    private handleDeleteUpdate = () =>
    {
        this.props.projectinfo.deletUpdateInfo();
        this.props.projectinfo.isShowUpdateInfo = false;
        this.props.projectinfo.updateId = '';
        this.handleShowDelete();
        return true;
    }
    // 到发布更新
    private handleToUpdateEdit = () =>
    {
        // todo
        this.props.history.push('/project/update/' + this.props.projectinfo.projId + '?updateid=' + this.props.projectinfo.updateId)
    }
    // 更新日志的点赞
    private handleSendUpdateZanInfo = async () =>
    {
        const res = await this.props.projectinfo.sendUpdateZanInfo();
        if (res)
        {
            if (this.props.projectinfo.updateInfo)
            {
                this.props.projectinfo.updateInfo.isZan = true;
            }
        }
    }
    /**
     * 以下留言部分
     */
    // 获取列表
    private handleGetUpdateDiscussList = async (discussId: string) =>
    {
        await this.props.projectinfo.getUpdateDiscussList(discussId);
        if (this.props.projectinfo.updateDiscussList.length > 0)
        {
            this.props.projectinfo.updateDiscussList.map((item: IDiscussList) =>
            {
                if (item.subSize > 0)
                {
                    this.handleGetUpdateReplayList(item)
                }
            })
        }
    }
    // 获取回复列表
    private handleGetUpdateReplayList = async (item: IDiscussList) =>
    {
        const replyList = await this.props.projectinfo.getUpdateDiscussReplyList(item.childrenId);
        item.childredList = [...replyList]
    }
    // 留言输入
    private handleChangeUpdateDiscuss = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        this.setState({
            updateDiscuss: ev.target.value
        })
    }
    // 发表留言
    private handleSendUpdateDiscuss = async () =>
    {
        if (!this.state.updateDiscuss)
        {
            return false;
        }
        if (this.props.common.isVerifyEmail)
        {
            this.props.common.openNotificationWithIcon('error', '操作失败', '请验证邮箱之后在操作，谢谢');
            return false;
        }
        const res = await this.props.projectinfo.sendUpdateDiscuss('', this.state.updateDiscuss);
        if (res)
        {
            this.setState({
                updateDiscuss: ''
            })
            setTimeout(() =>
            {
                this.handleGetUpdateDiscussList('');
            }, 2000)
        }
        return true;
    }
    // 评论的点赞
    private handleSendUpdateZan = async (item: IDiscussList | IDiscussReplyList) =>
    {
        const res = await this.props.projectinfo.sendUpdateZan(item.discussId);
        if (res)
        {
            item.isZan = true;
            item.zanCount++;
        }
    }
    // 打开回复
    private handleOpenUpdatReply = (item: IDiscussList) =>
    {

        this.props.projectinfo.updateDiscussList.forEach((list: IDiscussList) =>
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
        // if (item.isShowReply)
        // {
        //     this.props.projectinfo.getUpdateDiscussReplyList(item.childrenId);
        // }
    }
    // 打开回复二级
    private handleOpenUpdatReplyOther = (replyItem: IDiscussReplyList) =>
    {
        this.props.projectinfo.updateDiscussList.forEach((list: IDiscussList) =>
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

        if (!this.state.updateReply)
        {
            return false;
        }
        this.props.projectinfo.sendUpdateDiscuss(item.discussId, this.state.updateReply);
        item.isShowReply = false;
        setTimeout(() => {
            this.handleGetUpdateReplayList(item);
        }, 2000);
        return true;
    }
    // 回复评论二级
    private handleSendUpdatReplyOther = (item: IDiscussList, replyItem: IDiscussReplyList) =>
    {
        if (!this.state.updateReplyOther)
        {
            return false;
        }
        this.props.projectinfo.sendUpdateDiscuss(replyItem.discussId, this.state.updateReplyOther);
        replyItem.isShowReply = false;
        setTimeout(() =>
        {
            this.handleGetUpdateReplayList(item);
        }, 2000)
        return true;
    }
}

export default injectIntl(UpdateInfo);
