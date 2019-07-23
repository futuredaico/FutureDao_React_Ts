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
// import * as formatTime from '@/utils/formatTime';
@observer
class UpdateInfo extends React.Component<IProjectInfoProps, any> {
    public state = {
        underPrice: 4,
        underBottom: 1
    }
    public render()
    {
        return (
            <div className="updateinfo-wrapper">
                <div className="updateinfo-top" >
                    <div className="updateinfo-tips">
                        <span>2019-09-01</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>#3更新</span>
                        <img src={require('@/img/back.png')} alt="" onClick={this.handleBackUpdateList} className="back-img" />
                    </div>
                    <strong className="update-title">Alpha版本已完成，即将开启测试</strong>
                    <div className="update-people">
                        <img src={require('@/img/h5.png')} alt="" />
                        <strong>Lilith</strong>
                        <div className="right-update">
                            <span>修改</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>删除</span>
                        </div>
                    </div>
                    <p className="updateinfo-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                    <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" />
                    <span className="zan-span">12</span>
                </div>
                <div className="message-wrapper" id="message">
                    <div className="updateinfo-tips">
                        <span>评论：12</span>
                    </div>
                    <div className="textarea-wrapper">
                        <textarea name="message" id="" rows={4} style={{ resize: 'none' }} className="message-textarea" />
                        <div className="people-message">
                            <img src={require('@/img/h5.png')} alt="" />
                            <strong>Lilith</strong>
                            <Button text="发表评论" />
                        </div>
                    </div>
                    <div className="message-comment">
                        <div className="comment-list">
                            <div className="comment-people">
                                <img src={require('@/img/h5.png')} alt="" />
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
                                <img src={require('@/img/h5.png')} alt="" />
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
                                    <img src={require('@/img/h5.png')} alt="" />
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
                                <img src={require('@/img/h5.png')} alt="" />
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
            </div>
        );
    }
    private handleBackUpdateList = () => {
        this.props.projectinfo.isShowUpdateInfo = false;
    }
}

export default injectIntl(UpdateInfo);
