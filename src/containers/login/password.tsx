/**
 * 邮箱修改密码页面
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
import { getQueryString } from '@/utils/function'
import { IForgetProps } from './interface/forget.interface';
import { CodeType } from '@/store/interface/common.interface';
@inject('forget','common')
@observer
class PwdUpdate extends React.Component<IForgetProps, any> {
    public state = {
        username: getQueryString('username') || '',
        email: getQueryString('email') || '',
        code: getQueryString('verifyCode') || '',
        newPwd: '',
        newAgain: '',
        newPwdFlag: false, // 新密码的输入
        isSameInput: false // 两次输入不一致为true
    }
    public render()
    {
        return (
            <div className="normal-wrapper">
                <Input placeholder="邮箱" readOnly={true} value={this.state.email} />
                <label htmlFor="newpwd">
                    <Input.Password
                        placeholder="新密码"
                        value={this.state.newPwd}
                        className={this.state.newPwdFlag ? "red-password" : ''}
                        onChange={this.handleChangeNewPwd}
                        onBlur={this.handleToCheckPwd}
                    />
                    {
                        (this.state.newPwdFlag || this.props.forget.resetPwdCode) && (
                            <span className="err-msg">
                                <img src={require('@/img/attention.png')} alt="" />
                                {this.state.newPwdFlag && "密码至少8位"}
                                {this.props.forget.resetPwdCode === CodeType.invalidPasswordLen && "该密码不合法"}
                            </span>
                        )
                    }
                </label>
                <label htmlFor="newagain">
                    <Input.Password
                        placeholder="确认密码"
                        className={this.state.isSameInput ? "red-password" : ''}
                        value={this.state.newAgain}
                        onChange={this.handleChangeAgainPwd}
                        onBlur={this.handleCheckAgain}
                    />
                    {
                        this.state.isSameInput && (
                            <span className="err-msg">
                                <img src={require('@/img/attention.png')} alt="" />
                                两次密码不一致。
                        </span>
                        )
                    }
                </label>
                <Button
                    text="更改密码"
                    btnColor={(this.state.newPwd.length < 8 || this.state.newAgain.length < 8 || this.state.newPwdFlag || this.state.isSameInput) ? 'gray-btn' : ''}
                    onClick={this.handleVerifyReset}
                />
            </div>
        );
    }
    // 新密码的输入
    private handleChangeNewPwd = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.props.forget.resetPwdCode='';
        this.setState({
            newPwd: ev.target.value.trim(),
            newPwdFlag: false
        })
    }
    // 校验密码
    private handleToCheckPwd = () =>
    {
        const pwd = this.state.newPwd;
        if (pwd.length < 8)
        {
            this.setState({
                newPwdFlag: true
            })
        }
    }
    // 再次输入密码
    private handleChangeAgainPwd = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            newAgain: ev.target.value.trim(),
        })

    }
    // 校验密码是否一致
    private handleCheckAgain = () =>
    {
        if (this.state.newPwd !== this.state.newAgain)
        {
            this.setState({
                isSameInput: true
            })
        } else
        {
            this.setState({
                isSameInput: false
            })
        }
    }
    // 重置密码
    private handleVerifyReset = async () =>
    {
        if (this.state.newPwd.length < 8 || this.state.newAgain.length < 8 || this.state.newPwdFlag || this.state.isSameInput)
        {
            return false;
        }
        const res = await this.props.forget.verifyResetPassword(this.state.username,this.state.email,this.state.newPwd,this.state.code)
        if(res){
            this.props.common.openNotificationWithIcon('success', '操作成功', '密码修改成功');
            this.props.common.loginFutureDao(this.state.email,this.state.newPwd);
            this.props.history.push('/')
        }
        return true;
    }
}

export default injectIntl(PwdUpdate);
