/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IMolochoInfoProps, IDiscussList, IDiscussReplyList } from '../interface/MolochoInfo.interface';
// import RightTable from './transright';
import * as formatTime from '@/utils/formatTime';
interface IState
{
    showDelet: boolean,
    updateDiscuss: string,
    updateReply: string,
    updateReplyOther: string
}
@observer
class MolochoUpdateInfo extends React.Component<IMolochoInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        showDelet: false,
        updateDiscuss: '',
        updateReply: '',
        updateReplyOther: ''
    }
    public componentDidMount()
    {
        this.props.update.getUpdateInfo();
        this.handleGetUpdateDiscussList('');
    }
    public componentWillUnmount()
    {
        this.props.update.updateInfo = null;
    }
    public render()
    {
        if (!this.props.update.updateInfo)
        {
            return <div />;
        }
        return (
            <div className="updateinfo-wrapper">
                <div className="updateinfo-top" >
                    <div className="updateinfo-tips">
                        <span>{formatTime.format('yyyy-MM-dd ', this.props.update.updateInfo.lastUpdateTime.toString(), this.props.intl.locale)}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>#{this.props.update.updateInfo.rank} {this.intrl.projinfo.update}</span>
                        <img src={require('@/img/back.png')} alt="" onClick={this.handleBackUpdateList} className="back-img" />
                    </div>
                    <strong className="update-title">{this.props.update.updateInfo.updateTitle}</strong>
                    <div className="update-people">
                        <img src={this.props.update.updateInfo.headIconUrl ? this.props.update.updateInfo.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                        <strong>{this.props.update.updateInfo.username}</strong>
                        {
                            this.props.update.updateInfo.isMember && (
                                <div className="right-update">
                                    <span onClick={this.handleToUpdateEdit}>{this.intrl.projinfo.edit}</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span onClick={this.handleShowDelete}>{this.intrl.projinfo.delete}</span>
                                </div>
                            )
                        }

                    </div>
                    <div className="updateinfo-p" dangerouslySetInnerHTML={{ '__html': this.props.update.updateInfo.updateDetail }} />
                    {
                        this.props.update.updateInfo.isZan
                            ? <img src={require('@/img/zan.png')} className="zan-img" alt="zan.png" />
                            : <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" onClick={this.handleSendUpdateZanInfo} />
                    }
                    <span className="zan-span">{this.props.update.updateInfo.zanCount}</span>
                </div>
                <div className="message-wrapper">
                    <div className="updateinfo-tips">
                        <span>{this.intrl.projinfo.comments}：{this.props.update.updateInfo.discussCount}</span>
                    </div>
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
                                        value={this.state.updateDiscuss}
                                        onChange={this.handleChangeUpdateDiscuss}
                                    />
                                    <div className="people-message">
                                        <img src={this.props.common.userInfo.headIconUrl ? this.props.common.userInfo.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                                        <strong>{this.props.common.userInfo.username}</strong>
                                        <Button text={this.intrl.btn.comment} btnColor={this.state.updateDiscuss ? '' : 'gray-btn'} onClick={this.handleSendUpdateDiscuss} />
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
                                                    <Button text={this.intrl.btn.reply} btnColor={this.state.updateReply ? '' : 'gray-btn'} onClick={this.handleSendUpdatReplyDiscuss.bind(this, item)} />
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
                                                                                <Button text={this.intrl.btn.reply} btnColor={this.state.updateReplyOther ? '' : 'gray-btn'} onClick={this.handleSendUpdatReplyOther.bind(this, item, replyItem)} />
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
                                <div className="delete-text">{this.intrl.projinfo.deletetips}</div>
                                <div className="delete-btn">
                                    <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleShowDelete} />
                                    <Button text={this.intrl.btn.comfirm} onClick={this.handleDeleteUpdate} />
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
        this.props.update.deletUpdateInfo();
        this.props.projectinfo.isShowUpdateInfo = false;
        this.props.update.updateId = '';
        this.handleShowDelete();
        return true;
    }
    // 到发布更新
    private handleToUpdateEdit = () =>
    {
        // todo
        this.props.history.push('/project/update/' + this.props.projectinfo.projId + '?updateid=' + this.props.update.updateId)
    }
    // 更新日志的点赞
    private handleSendUpdateZanInfo = async () =>
    {
        const checkRes = this.handleCheckOption();
        if (!checkRes)
        {
            return false;
        }
        const res = await this.props.update.sendUpdateZanInfo();
        if (res)
        {
            if (this.props.update.updateInfo)
            {
                this.props.update.updateInfo.isZan = true;
            }
        }
        return true;
    }
    /**
     * 以下留言部分
     */
    // 获取列表
    private handleGetUpdateDiscussList = async (discussId: string) =>
    {
        await this.props.update.getUpdateDiscussList(discussId);
        if (this.props.update.updateDiscussList.length > 0)
        {
            this.props.update.updateDiscussList.map((item: IDiscussList) =>
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
        const replyList = await this.props.update.getUpdateDiscussReplyList(item.childrenId);
        item.childredList = [...replyList]
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
        
        // 验证是否支持了项目
        if (this.props.projectinfo.projInfo && !this.props.projectinfo.projInfo.isSupport)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.supporterr);
            return false
        }
        return true
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
        const res = await this.props.update.sendUpdateDiscuss('', this.state.updateDiscuss);
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
        if (!this.state.updateReply)
        {
            return false;
        }
        this.props.update.sendUpdateDiscuss(item.discussId, this.state.updateReply);
        item.isShowReply = false;
        setTimeout(() =>
        {
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
        this.props.update.sendUpdateDiscuss(replyItem.discussId, this.state.updateReplyOther);
        replyItem.isShowReply = false;
        setTimeout(() =>
        {
            this.handleGetUpdateReplayList(item);
        }, 2000)
        return true;
    }
}

export default injectIntl(MolochoUpdateInfo);
