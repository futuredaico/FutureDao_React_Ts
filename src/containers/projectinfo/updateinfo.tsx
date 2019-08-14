/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
import { IProjectInfoProps } from './interface/projectinfo.interface';
// import RightTable from './transright';
import * as formatTime from '@/utils/formatTime';
@observer
class UpdateInfo extends React.Component<IProjectInfoProps, any> {
    public state = {
        underPrice: 4,
        underBottom: 1,
        showDelet:false
    }
    public componentDidMount()
    {
        this.props.projectinfo.getUpdateInfo()
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
                        <img src={this.props.projectinfo.updateInfo.headIconUrl.replace('temp_', '')} alt="" />
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
                    <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" />
                    <span className="zan-span">{this.props.projectinfo.updateInfo.zanCount}</span>
                </div>
                <div className="message-wrapper" id="message">
                    <div className="updateinfo-tips">
                        <span>评论：{this.props.projectinfo.updateInfo.discussCount}</span>
                    </div>
                    <div className="textarea-wrapper">
                        <textarea name="message" id="" rows={4} style={{ resize: 'none' }} className="message-textarea" />
                        <div className="people-message">
                            <img src={require('@/img/default.png')} alt="" />
                            <strong>Lilith</strong>
                            <Button text="发表评论" />
                        </div>
                    </div>
                    <div className="message-comment">
                        <div className="comment-list">
                            <div className="comment-people">
                                <img src={require('@/img/default.png')} alt="" />
                                <strong>XXXXX</strong>
                            </div>
                            <p>应该可以为游戏招揽不少用户，但资金用途说明不够清晰，请补充一下！</p>
                            <span className="time-tips">10h ago</span>
                            <div className="right-other">
                                <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" />
                                <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" />
                                <span>12</span>
                            </div>
                            <div className="comment-input">
                                <Input placeholder="Basic usage" />
                                <Button text="回复" />
                            </div>
                        </div>
                        <div className="comment-list">
                            <div className="comment-people">
                                <img src={require('@/img/default.png')} alt="" />
                                <strong>XXXXX</strong>
                            </div>
                            <p>应该可以为游戏招揽不少用户，但资金用途说明不够清晰，请补充一下！</p>
                            <span className="time-tips">10h ago</span>
                            <div className="right-other">
                                <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" />
                                <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" />
                                <span>12</span>
                            </div>
                            <div className="comment-input">
                                <Input placeholder="Basic usage" />
                                <Button text="回复" />
                            </div>
                            <div className="reply-comment">
                                <div className="reply-people">
                                    <img src={require('@/img/default.png')} alt="" />
                                    <strong>XXXXX</strong>
                                </div>
                                <p>应该可以为游戏招揽不少用户，但资金用途说明不够清晰，请补充一下！</p>
                                <span className="time-tips">10h ago</span>
                                <div className="right-other">
                                    <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" />
                                    <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" />
                                    <span>12</span>
                                </div>
                                <div className="reply-input">
                                    <Input placeholder="Basic usage" />
                                    <Button text="回复" />
                                </div>
                            </div>
                        </div>
                        <div className="comment-list">
                            <div className="comment-people">
                                <img src={require('@/img/default.png')} alt="" />
                                <strong>XXXXX</strong>
                            </div>
                            <p>应该可以为游戏招揽不少用户，但资金用途说明不够清晰，请补充一下！</p>
                            <span className="time-tips">10h ago</span>
                            <div className="right-other">
                                <img src={require('@/img/message-un.png')} className="message-img" alt="message-un.png" />
                                <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" />
                                <span>12</span>
                            </div>
                        </div>
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
    private handleShowDelete = () => {
        this.setState({
            showDelet: !this.state.showDelet
        })
    }
    // 删除更新
    private handleDeleteUpdate = () => {
        this.props.projectinfo.deletUpdateInfo();
        this.props.projectinfo.isShowUpdateInfo = false;
        this.props.projectinfo.updateId = '';
        this.handleShowDelete();
        return true;
    }
    
    // private handleDeleteUpdate = () =>
    // {
    //     this.props.projectinfo.deletUpdateInfo();
    // }
    // 到发布更新
    private handleToUpdateEdit = () =>
    {
        // todo
        this.props.history.push('/project/update/'+this.props.projectinfo.projId+'?updateid='+this.props.projectinfo.updateId)
    }
}

export default injectIntl(UpdateInfo);
