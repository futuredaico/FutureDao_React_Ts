/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
// import RightTable from './transright';
// import * as formatTime from '@/utils/formatTime';
@observer
class ProjectDetail extends React.Component<any, any> {
    public state = {
        underPrice: 4,
        underBottom: 1
    }
    public render()
    {
        return (
            <>
                <div className="projectdetail-wrapper">
                    <h3>项目详情</h3>
                    <p className="detail-p">当然知道，我以前养过一条中华田园犬，特别聪明。有一次我放学我爸来接我，来的很早，让她在车里待着，她就一直不出声的坐在地上，后来我爸把她放出来，她自己跑到树坑尿尿，憋了一下午都没上厕所。我放学之后抱着她想让她坐在椅子上。</p>
                    <img src={require('@/img/tu2.png')} alt="" className="detail-img" />
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
