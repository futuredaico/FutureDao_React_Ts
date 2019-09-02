/**
 * 忘记密码页面
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
import { CodeType } from '@/store/interface/common.interface';
import { IForgetProps } from './interface/forget.interface';
// import Button from '@/components/Button';
@inject('forget','common')
@observer
class ForgetPwd extends React.Component<IForgetProps, any> {
    public intrl = this.props.intl.messages;
    public state = {
        stepNum: true,
        forgetEmail: '',
        forgetFlag: false,// 重置是否成功
    }
    public render()
    {
        return (
            <div className="normal-wrapper forget-wrapper">
                {
                    this.state.stepNum
                        ? (
                            <>
                                <label>
                                    <Input
                                        placeholder={this.intrl.login.email}
                                        value={this.state.forgetEmail}
                                        onChange={this.handleOnChangeForgetEmail}
                                        onBlur={this.handleCheckEmail}
                                    />
                                    {
                                        ((this.props.forget.forgetEmailCode !== CodeType.emailHasRegisted) && (this.props.forget.forgetEmailCode)) && (
                                            <span className="err-msg">
                                                <img src={require('@/img/attention.png')} alt="" />
                                                {this.props.forget.forgetEmailCode === CodeType.invalidEmail && this.intrl.inputerr.emailerr2}
                                                {this.props.forget.forgetEmailCode === CodeType.success && this.intrl.inputerr.emailerr1}
                                            </span>
                                        )
                                    }
                                </label>
                                <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleToLogin} />
                                <Button text={this.intrl.btn.reset} onClick={this.handleResetPwd} btnColor={this.props.forget.forgetEmailCode !== CodeType.emailHasRegisted ? 'gray-btn' : ''} />
                            </>
                        )
                        : (
                            <>
                                <div className="forget-tips">
                                    <p>{this.intrl.forget.sendmsg}</p>
                                    <p>{this.intrl.forget.sendmsg2}<a href="#">{this.intrl.forget.sendmsg3}</a>。</p>
                                </div>
                                <Button text={this.intrl.btn.finish} onClick={this.handleToLogin} />
                            </>
                        )
                }

            </div>
        );
    }
    // 输入邮箱
    private handleOnChangeForgetEmail = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            forgetEmail: ev.target.value,
        })
        this.props.forget.forgetEmailCode= '';
    }
    // 校验是否注册过的邮箱
    private handleCheckEmail = () =>
    {
        // todo
        if(!this.state.forgetEmail){
            return
        }
        this.props.forget.checkEmail(this.state.forgetEmail);
    }
    // 返回登录页
    private handleToLogin = () =>
    {
        this.props.history.push('/load/login')
    }
    // 重置密码
    private handleResetPwd = () =>
    {
        // todo
        if (this.props.forget.forgetEmailCode !== CodeType.emailHasRegisted)
        {
            return
        }
        this.props.forget.resetPassword(this.state.forgetEmail);
        this.setState({
            stepNum: false
        })
    }
}

export default injectIntl(ForgetPwd);
