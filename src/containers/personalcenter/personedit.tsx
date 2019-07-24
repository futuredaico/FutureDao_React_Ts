/**
 * 个人中心
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
import classnames from 'classnames';

@observer
class PersonalEidt extends React.Component<any, any> {
    public state = {
        isEditDes: false, // 个人简介
        isEditEmail: false, // 邮箱
        isEditPwd: false, // 密码
        isEditStatus: false, // 总的编辑
    }
    public render()
    {
        const infoClassName = classnames('person-info', this.state.isEditStatus ? 'gray-status' : '');
        const desClassName = classnames('info-line', this.state.isEditDes ? 'active-eidt' : '');
        const emailClassName = classnames('info-line', this.state.isEditEmail ? 'active-eidt' : '');
        const pwdClassName = classnames('info-line', this.state.isEditEmail ? 'active-eidt' : '');

        return (
            <div className="personedit-page">
                <h2>个人资料</h2>
                <div className="person-picture">
                    <div className="person-img">
                        <img src={require('@/img/h5.png')} alt="" />
                    </div>
                    <div className="person-name-img">
                        <strong className="person-name">James</strong>
                        <Button text="修改头像" btnColor="white-purple" />
                    </div>
                </div>
                <div className={infoClassName}>
                    <div className={desClassName}>
                        <div className="edit-title">
                            <strong>个人简介</strong>
                            {
                                !this.state.isEditDes && <div className="edit-img" onClick={this.handleEditPerson.bind(this, 1)} />
                            }
                            {/* <div className="edit-img" onClick={this.handleEditPerson.bind(this, 1)} /> */}
                        </div>
                        {
                            this.state.isEditDes
                                ? (
                                    <>
                                        <textarea name="person-des" id="" rows={10} className="edit-textarea" />
                                        <div className="personedit-btn">
                                            <Button text="取消" btnColor="red-btn" onClick={this.handleCancelEdit} />
                                            <Button text="确认修改" />
                                        </div>
                                    </>
                                )
                                : <div className="person-p">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean euismod bibendum laoreet.
                                    Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
                                    Proin sodales pulvinar tempor.
                                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean euismod bibendum laoreet.
                                    Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
                                    Proin sodales pulvinar tempor.
                                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                </div>
                        }

                        {/* 这家伙很懒，什么都没留下。 */}

                    </div>
                    <div className={emailClassName}>
                        <div className="edit-title">
                            <strong>邮箱</strong>
                            {
                                !this.state.isEditEmail && <div className="edit-img" onClick={this.handleEditPerson.bind(this, 2)} />
                            }
                        </div>
                        {
                            this.state.isEditEmail
                                ? (
                                    <>
                                        <Input placeholder="新邮箱" className="edit-input" />
                                        <Input.Password placeholder="确认密码" className="edit-pwd" />
                                        <div className="personedit-btn">
                                            <Button text="取消" btnColor="red-btn" onClick={this.handleCancelEdit} />
                                            <Button text="确认修改" />
                                        </div>
                                    </>
                                )
                                : <span>123456@163.com</span>
                        }


                    </div>
                    <div className={pwdClassName}>
                        <div className="edit-title">
                            <strong>密码</strong>
                            {
                                !this.state.isEditPwd && <div className="edit-img" onClick={this.handleEditPerson.bind(this, 3)} />
                            }

                        </div>
                        {
                            this.state.isEditPwd
                                ? (
                                    <>
                                        <Input placeholder="旧密码" className="edit-input" />
                                        <Input.Password placeholder="新密码" className="edit-pwd" />
                                        <div className="personedit-btn">
                                            <Button text="取消" btnColor="red-btn" onClick={this.handleCancelEdit} />
                                            <Button text="确认修改" />
                                        </div>
                                    </>
                                )
                                : <span>********</span>
                        }


                    </div>
                </div>
            </div>
        );
    }
    // 点击编辑个人简介
    // 点击编辑邮箱
    // 点击编辑密码
    private handleEditPerson = (num: number) =>
    {
        if (this.state.isEditStatus)
        {
            return
        }
        this.setState({
            isEditDes: num === 1 ? true : false,
            isEditEmail: num === 2 ? true : false,
            isEditPwd: num === 3 ? true : false,
            isEditStatus: true
        })
    }
    // 取消编辑
    private handleCancelEdit = () =>
    {
        this.setState({
            isEditDes: false,
            isEditEmail: false,
            isEditPwd: false,
            isEditStatus: false
        })
    }
}

export default injectIntl(PersonalEidt);
