/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
import { IProjectInfoProps, IDiscussList, IDiscussReplyList } from './interface/projectinfo.interface';
import * as formatTime from '@/utils/formatTime';
@observer
class ProjectDetail extends React.Component<IProjectInfoProps, any> {
    public state = {
        discussInput: '',
        replyInput:'',
        replyInputOther:'',
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
                        this.props.common.userInfo && (
                            <div className="textarea-wrapper">
                                <textarea
                                    name="message"
                                    id=""
                                    maxLength={400}
                                    style={{ resize: 'none' }}
                                    className="message-textarea"
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
                                            item.isShowReply && (
                                                <div className="comment-input">
                                                    <Input placeholder="Basic usage" value={this.state.replyInput} onChange={this.handleReplyDiscuss} />
                                                    <Button text="回复" btnColor={this.state.replyInput?'':'gray-btn'} onClick={this.handleSendReplyDiscuss.bind(this,item,1)}  />
                                                </div>
                                            )
                                        }
                                        {
                                            (item.isShowReply && item.subSize > 0) && this.props.projectinfo.projDiscussReplyList.map((replyItem: IDiscussReplyList, num: number) =>
                                            {
                                                return (
                                                    <div className="reply-comment" key={num}>
                                                        <div className="reply-people">
                                                            <img src={replyItem.headIconUrl ? replyItem.headIconUrl.replace('temp_', '') : require('@/img/default.png')} alt="" />
                                                            <strong>{replyItem.username}</strong>
                                                        </div>
                                                        <p>应该可以为游戏招揽不少用户，但资金用途说明不够清晰，请补充一下！</p>
                                                        <span className="time-tips">{formatTime.computeTime(replyItem.time, this.props.intl.locale)}</span>
                                                        <div className="right-other">
                                                            <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" />
                                                            {
                                                                replyItem.isZan
                                                                    ? <img src={require('@/img/zan.png')} className="zan-img" alt="zan.png" />
                                                                    : <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" onClick={this.handleSendZan.bind(this, replyItem)} />
                                                            }
                                                            <span>{replyItem.zanCount ? replyItem.zanCount : ''}</span>
                                                        </div>
                                                        <div className="reply-input">
                                                            <Input placeholder="Basic usage" value={this.state.replyInputOther} onChange={this.handleReplyOther} />
                                                            <Button text="回复" btnColor={this.state.replyInputOther?'':'gray-btn'} onClick={this.handleSendReplyDiscuss.bind(this,replyItem,2)} />
                                                        </div>
                                                    </div>
                                                )
                                            })
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
    private handleSendZan = async (item: IDiscussList) =>
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
        item.isShowReply = !item.isShowReply;
    }
    private handleReplyDiscuss = (ev:React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            replyInput:ev.target.value
        })
    }
    private handleReplyOther = (ev:React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            replyInputOther:ev.target.value
        })
    }
    private handleSendReplyDiscuss = (item:IDiscussList|IDiscussReplyList,type:number) => {
        //
        if(type === 1){
            if(!this.state.replyInput){
                return false;
            }
            this.props.projectinfo.sendProjDiscuss(item.discussId,this.state.replyInput)
        }else{
            if(!this.state.replyInputOther){
                return false;
            }
            this.props.projectinfo.sendProjDiscuss(item.discussId,this.state.replyInputOther)
        }
        
        return true;
    }
}

export default injectIntl(ProjectDetail);
