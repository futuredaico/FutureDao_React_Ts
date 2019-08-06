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
// import * as formatTime from '@/utils/formatTime';
@observer
class ProjectDetail extends React.Component<IProjectInfoProps, any> {
    public state = {
        underPrice: 4,
        underBottom: 1
    }
    public render()
    {
        if(!this.props.projectinfo.projInfo){
            return null;
        }
        return (
            <>
                <div className="projectdetail-wrapper">
                    <h3>项目详情</h3>
                    <p className="detail-p">{this.props.projectinfo.projInfo.projDetail}</p>                    
                    {/* <img src={require('@/img/tu2.png')} alt="" className="detail-img" /> */}
                </div>
                <div className="message-wrapper" id="message">
                    <h3>留言</h3>
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
            </>
        );
    }

}

export default injectIntl(ProjectDetail);
