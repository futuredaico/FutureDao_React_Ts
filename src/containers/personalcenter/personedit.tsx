/**
 * 个人中心
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input, Upload } from 'antd';
import classnames from 'classnames';
import { IPersonProps } from './interface/personedit.interface';
import { CodeType } from '@/store/interface/common.interface';
import { RcFile } from 'antd/lib/upload';
@inject('personedit', 'common')
@observer
class PersonalEidt extends React.Component<IPersonProps, any> {
    public state = {
        imageUrl: this.props.common.userInfo ? this.props.common.userInfo.headIconUrl.replace('temp_', '') : null,
        isEditDes: false, // 个人简介
        isEditEmail: false, // 邮箱
        isEditPwd: false, // 密码
        isEditStatus: false, // 总的编辑
        briefTextarea: '', // 个人简介内容
        emailInput: '', // 新的邮箱
        emailPwd: '',   // 修改邮箱输入的密码
        oldPwd: '',      // 旧密码
        newPwd: '',      // 新密码
        isSaveEmail: false,  // 确认邮箱修改
        isSavePwd: false, // 确认密码修改
    }

    public render()
    {
        const infoClassName = classnames('person-info', this.state.isEditStatus ? 'gray-status' : '');
        const desClassName = classnames('info-line', this.state.isEditDes ? 'active-eidt' : '');
        const emailClassName = classnames('info-line', this.state.isEditEmail ? 'active-eidt' : '');
        const pwdClassName = classnames('info-line', this.state.isEditPwd ? 'active-eidt' : '');

        return (
            <div className="personedit-page">
                <h2>个人资料</h2>
                <div className="person-picture">
                    <div className="person-img">
                        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="" /> : <div className="no-img" />}
                    </div>
                    <div className="person-name-img">
                        <strong className="person-name">{this.props.common.userInfo && this.props.common.userInfo.username}</strong>
                        {/* <Button text="修改头像" btnColor="white-purple" /> */}
                        <Upload
                            name="avatar"
                            // listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={this.beforeUpload}
                        >
                            修改头像
                        </Upload>
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
                                        <textarea
                                            name="person-des"
                                            rows={10}
                                            className="edit-textarea"
                                            value={this.state.briefTextarea}
                                            maxLength={400}
                                            onChange={this.handleToChangeDes}
                                        />
                                        <div className="personedit-btn">
                                            <Button text="取消" btnColor="red-btn" onClick={this.handleCancelEdit} />
                                            <Button text="确认修改" onClick={this.handleToSaveDrief} />
                                        </div>
                                    </>
                                )
                                : <div className="person-p">
                                    {
                                        (this.props.common.userInfo && this.props.common.userInfo.brief !== '') ? this.props.common.userInfo.brief : '这家伙很懒，什么都没留下。'
                                    }
                                </div>
                        }
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
                                        <Input
                                            placeholder="新邮箱"
                                            className="edit-input"
                                            value={this.state.emailInput}
                                            onChange={this.handleToChangeEmail}
                                            onBlur={this.handleTocheckEmail}
                                        />
                                        <Input.Password
                                            placeholder="确认密码"
                                            className="edit-pwd"
                                            value={this.state.emailPwd}
                                            onChange={this.handleToEnterPwd}
                                        />
                                        {
                                            this.props.personedit.newEmailCode && (
                                                <span className="err-msg">
                                                    <img src={require('@/img/attention.png')} alt="" />
                                                    {this.props.personedit.newEmailCode === CodeType.invalidEmail && "邮箱格式不正确"}
                                                    {this.props.personedit.newEmailCode === CodeType.emailHasRegisted && "邮箱已被注册"}
                                                    {this.props.personedit.newEmailCode === CodeType.passwordError && "密码错误"}
                                                </span>
                                            )
                                        }
                                        <div className="personedit-btn">
                                            <Button text="取消" btnColor="red-btn" onClick={this.handleCancelEdit} />
                                            <Button text="确认修改" onClick={this.handleToSaveNewEmail} btnColor={(this.state.isSaveEmail && this.state.emailPwd) ? '' : 'gray-btn'} />
                                        </div>
                                    </>
                                )
                                : <span>{this.props.common.userInfo && this.props.common.userInfo.email}</span>
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
                                        <Input.Password
                                            placeholder="旧密码"
                                            className="edit-input"
                                            value={this.state.oldPwd}
                                            onChange={this.handleToChangeOldPwd}
                                        />
                                        <Input.Password
                                            placeholder="新密码"
                                            className="edit-pwd"
                                            value={this.state.newPwd}
                                            onChange={this.handleToChangeNewPwd}
                                        />
                                        {
                                            this.props.personedit.newPwdCode && (
                                                <span className="err-msg">
                                                    <img src={require('@/img/attention.png')} alt="" />
                                                    {this.props.personedit.newPwdCode === CodeType.invalidPasswordLen && "密码长度不少于8位"}
                                                    {this.props.personedit.newPwdCode === CodeType.passwordError && "密码错误"}
                                                </span>
                                            )
                                        }
                                        <div className="personedit-btn">
                                            <Button text="取消" btnColor="red-btn" onClick={this.handleCancelEdit} />
                                            <Button text="确认修改" onClick={this.handleToSaveNewPwd} btnColor={(this.state.oldPwd && this.state.newPwd) ? '' : 'gray-btn'} />
                                        </div>
                                    </>
                                )
                                : <span>******</span>
                        }
                    </div>
                </div>
            </div>
        );
    }
    // 限制图片上传大小与格式
    private beforeUpload(file: RcFile)
    {
        if (file.size / 1024 / 1024 < 3)
        {
            return false;
        }
        // todo commonStore
        const res = this.props.common.uploadFile(file);
        if (res)
        {
            this.setState({
                imageUrl: res['url']
            })
        }
        return false;
    }
    // 输入个人简介
    private handleToChangeDes = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        //
        this.setState({
            briefTextarea: ev.target.value.trim()
        })
    }
    // 确认修改个人简历
    private handleToSaveDrief = async () =>
    {
        const res = await this.props.personedit.updateUserBrief(this.state.briefTextarea);
        if (res)
        {
            this.props.common.openNotificationWithIcon('success', '操作成功', '个人简历成功');
        }
        else
        {
            this.props.common.openNotificationWithIcon('error', '操作失败', '个人简历失败');
        }
        this.handleCancelEdit();
    }
    // 输入新的邮箱
    private handleToChangeEmail = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.props.personedit.newEmailCode = '';
        this.setState({
            emailInput: ev.target.value.trim()
        })
    }
    // 邮箱验证
    private handleTocheckEmail = async () =>
    {
        if (!this.state.emailInput)
        {
            return
        }
        const res = await this.props.personedit.checkEmail(this.state.emailInput);
        // const re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,10}$/;
        if (res)
        {
            this.setState({
                isSaveEmail: true
            })
        } else
        {
            this.setState({
                isSaveEmail: false
            })
        }
    }
    // 修改邮箱时的密码输入
    private handleToEnterPwd = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.props.personedit.newEmailCode = '';
        this.setState({
            emailPwd: ev.target.value.trim()
        })
    }
    // 确认修改新的邮箱
    private handleToSaveNewEmail = async () =>
    {
        if (!this.state.emailInput || !this.state.emailPwd || !this.state.isSaveEmail)
        {
            return
        }
        const res = await this.props.personedit.updateUserEmail(this.state.emailInput, this.state.emailPwd);
        if (res)
        {
            this.props.common.openNotificationWithIcon('success', '操作成功', '邮箱已修改，请重新验证');
            this.handleCancelEdit();
        }
        else
        {
            this.props.common.openNotificationWithIcon('error', '操作失败', '修改邮箱失败');
        }
    }

    // 输入旧密码密码
    private handleToChangeOldPwd = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.props.personedit.newPwdCode = '';
        this.setState({
            oldPwd: ev.target.value.trim()
        })
    }
    // 输入新的密码
    private handleToChangeNewPwd = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            newPwd: ev.target.value.trim()
        })
    }
    // 确认修改密码
    private handleToSaveNewPwd = async () =>
    {
        if (!this.state.oldPwd || !this.state.newPwd)
        {
            return
        }
        const res = await this.props.personedit.updatePwd(this.state.oldPwd, this.state.newPwd);

        if (res)
        {
            this.props.common.openNotificationWithIcon('success', '操作成功', '密码已修改');
            this.handleCancelEdit();
            // this.props.common.logoutFutureDao();
            // this.props.history.push('/load/login');
        }
        else
        {
            this.props.common.openNotificationWithIcon('error', '操作失败', '修改密码失败');
        }

    }
    // 点击进行编辑
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
            isEditStatus: false,
            emailInput: '',
            emailPwd: '',
            oldPwd: '',
            newPwd: '',
            isSaveEmail: false,
            isSavePwd: false,
        })
        this.props.personedit.newEmailCode = '';
        this.props.personedit.newPwdCode = '';
    }
}

export default injectIntl(PersonalEidt);
