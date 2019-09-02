/**
 * 注册项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
import { ISignInProps } from './interface/signin.interface';
import { CodeType } from '@/store/interface/common.interface';

@inject('signin','common')
@observer
class SignIn extends React.Component<ISignInProps, any> {
    public intrl = this.props.intl.messages;
    public state = {
        usernameValue: '',
        emailValue:'',
        pwdValue:'',
        pwdFlag:false
    }
    public componentWillUnmount(){
        this.props.signin.usernameCode = '';
        this.props.signin.emailCode = '';
        this.props.signin.pwdCode = '';
    }
    public render()
    {
        return (
            <div className="normal-wrapper signin-wrapper">
                <label htmlFor="username">
                    <Input
                        placeholder={this.intrl.sign.username}
                        className={this.props.signin.usernameCode ? "red-input" : ''}
                        value={this.state.usernameValue}
                        onChange={this.handleOnChangeUsername}
                        onBlur={this.handleToCheckUsername}
                    />
                    {
                        this.props.signin.usernameCode && (
                            <span className="err-msg">
                                <img src={require('@/img/attention.png')} alt="" />
                                {this.props.signin.usernameCode === CodeType.invalidUsername && this.intrl.inputerr.usererr1}
                                {this.props.signin.usernameCode === CodeType.usernameHasRegisted  && this.intrl.inputerr.usererr2}
                            </span>
                        )
                    }
                </label>
                <label htmlFor="email">
                    <Input 
                        placeholder={this.intrl.login.email} 
                        className={this.props.signin.emailCode ? "red-input" : ''}
                        value={this.state.emailValue}
                        onChange={this.handleOnChangeEmail}
                        onBlur={this.handleToCheckEmail}
                    />
                    {
                        this.props.signin.emailCode && (
                            <span className="err-msg">
                                <img src={require('@/img/attention.png')} alt="" />
                                {this.props.signin.emailCode === CodeType.invalidEmail && this.intrl.inputerr.eformaterr}
                                {this.props.signin.emailCode === CodeType.emailHasRegisted  && this.intrl.inputerr.emailerr1}
                            </span>
                        )
                    }
                    {/* <span className="err-msg"><img src={require('@/img/attention.png')} alt="" />该邮箱已注册</span> */}
                </label>
                <label htmlFor="pwd">
                    <Input.Password 
                        placeholder={this.intrl.sign.pwd}
                        className={this.state.pwdFlag ? "red-password" : ''}
                        value={this.state.pwdValue}
                        onChange={this.handleOnChangePwd}
                        onBlur={this.handleToCheckPwd}
                    />
                    {
                        (this.state.pwdFlag || this.props.signin.pwdCode) && (
                            <span className="err-msg">
                                <img src={require('@/img/attention.png')} alt="" />
                                {this.state.pwdFlag && this.intrl.inputerr.pwderr}
                                {this.props.signin.pwdCode === CodeType.invalidPasswordLen   && this.intrl.inputerr.pwderr3}
                            </span>
                        )
                    }
                    {/* <span className="err-msg"><img src={require('@/img/attention.png')} alt="" />密码至少8位</span> */}
                </label>
                <Button text={this.intrl.btn.sign} btnColor={(this.props.signin.usernameCode || this.props.signin.emailCode || this.props.signin.pwdCode || this.state.pwdFlag || this.state.pwdValue.length<8)?'gray-btn':''} onClick={this.handleToSignIn} />
                <div className="gray-text-wrapper">
                    <span className="gray-text" onClick={this.handleLogin}>{this.intrl.sign.gologin}</span>
                </div>
            </div>
        );
    }
    // 输入用户名
    private handleOnChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.props.signin.usernameCode = ""
        this.setState({
            usernameValue: e.target.value.trim()
        })
    }
    // 校验用户名
    private handleToCheckUsername = () =>
    {
        this.props.signin.checkUsername(this.state.usernameValue)
    }
    // 输入邮箱
    private handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.props.signin.emailCode = ""
        this.setState({
            emailValue: e.target.value.trim()
        })
    }
    // 校验邮箱
    private handleToCheckEmail = () =>
    {
        this.props.signin.checkEmail(this.state.emailValue)
    }
    // 输入密码
    private handleOnChangePwd = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.props.signin.pwdCode = ""
        this.setState({
            pwdValue: e.target.value.trim(),
            pwdFlag:false
        })
    }
    // 校验密码
    private handleToCheckPwd = () =>
    {
        // this.props.signin.checkUsername(this.state.usernameValue)
        const pwd = this.state.pwdValue;
        if(pwd.length<8){
            this.setState({
                pwdFlag:true
            })
        }
    }
    // 跳到登录
    private handleLogin = () =>
    {
        this.props.history.push('/load/login')
    }
    // 注册并登录
    private handleToSignIn = async () => {
        
        if(this.props.signin.usernameCode || this.props.signin.emailCode || this.props.signin.pwdCode || this.state.pwdFlag){
            return
        }
        if(!this.state.usernameValue || !this.state.emailValue ||this.state.pwdValue.length<8){
            return
        }
        const res = await this.props.signin.registerUser(this.state.usernameValue,this.state.emailValue,this.state.pwdValue);
        // todo 登录
        if(res){
            this.props.common.loginFutureDao(this.state.emailValue,this.state.pwdValue);
            this.props.history.push('/')
        }        
    }
}

export default injectIntl(SignIn);
