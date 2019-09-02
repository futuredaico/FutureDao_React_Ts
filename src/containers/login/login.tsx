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
    public intrl = this.props.intl.messages;
    public state = {
        loginEmail: '',
        loginPwd: '',
        loginErr: false
    }
    public render()
    {
        return (
            <div className="normal-wrapper">
                <Input placeholder={this.intrl.login.email} value={this.state.loginEmail} onChange={this.handleOnChangeLoginEmail} />
                <label htmlFor="loginpwd">
                    <Input.Password placeholder={this.intrl.login.password} value={this.state.loginPwd} onChange={this.handleOnChangeLoginPwd} onPressEnter={this.handleToLogin} />
                    {
                        this.state.loginErr && (
                            <span className="err-msg">
                                <img src={require('@/img/attention.png')} alt="" />
                                {this.intrl.inputerr.loginerr}
                            </span>
                        )
                    }

                </label>
                <Button text={this.intrl.btn.login} onClick={this.handleToLogin} />
                <div className="gray-text-wrapper">
                    <span className="gray-text" onClick={this.handleForget} >{this.intrl.login.forgot}</span><br />
                    <span className="gray-text" onClick={this.handleSignin} >{this.intrl.login.signtips}</span>
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
