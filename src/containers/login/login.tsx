/**
 * 登陆项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
import { ICommonStore } from '@/store/interface/common.interface';
import { RouteComponentProps } from "react-router";
export interface ILoginProps extends RouteComponentProps
{
    common: ICommonStore
    intl: any
}
@inject('common')
@observer
class Login extends React.Component<ILoginProps, any> {
    public state = {
        loginEmail: '',
        loginPwd: '',
        loginErr: false
    }
    public render()
    {
        return (
            <div className="normal-wrapper">
                <Input placeholder="邮箱" value={this.state.loginEmail} onChange={this.handleOnChangeLoginEmail} />
                <label htmlFor="loginpwd">
                    <Input.Password placeholder="登陆密码" value={this.state.loginPwd} onChange={this.handleOnChangeLoginPwd} onPressEnter={this.handleToLogin} />
                    {
                        this.state.loginErr && (
                            <span className="err-msg">
                                <img src={require('@/img/attention.png')} alt="" />
                                邮箱或密码输入错误
                            </span>
                        )
                    }

                </label>
                <Button text="登陆" onClick={this.handleToLogin} />
                <div className="gray-text-wrapper">
                    <span className="gray-text" onClick={this.handleForget} >忘记密码?</span><br />
                    <span className="gray-text" onClick={this.handleSignin} >还没有帐户？点击立即注册</span>
                </div>
            </div>
        );
    }
    // 邮箱输入
    private handleOnChangeLoginEmail = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            loginEmail: ev.target.value,
            loginErr: false
        })
    }
    // 密码输入
    private handleOnChangeLoginPwd = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            loginPwd: ev.target.value,
            loginErr: false
        })
    }
    // 登录
    private handleToLogin = async () =>
    {
        if (!this.state.loginEmail || !this.state.loginPwd)
        {
            return
        }
        const res = await this.props.common.loginFutureDao(this.state.loginEmail, this.state.loginPwd);
        if (!res)
        {
            this.setState({
                loginErr: true
            })
            return
        }
        this.props.history.push('/')
    }
    // 忘记密码
    private handleForget = () =>
    {
        this.props.history.push('/load/forgetpwd')
    }
    // 立即注册
    private handleSignin = () =>
    {
        this.props.history.push('/load/signin')
    }
}

export default injectIntl(Login);
