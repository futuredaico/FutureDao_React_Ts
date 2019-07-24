/**
 * 注册项目
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
// import Button from '@/components/Button';
@observer
class SignIn extends React.Component<any, any> {
    public render()
    {
        return (
            <div className="normal-wrapper signin-wrapper">
                <label htmlFor="username">
                    <Input placeholder="用户名" className="red-input" />
                    <span className="err-msg"><img src={require('@/img/attention.png')} alt="" />用户名已被人使用</span>
                </label>
                <label htmlFor="email">
                    <Input placeholder="邮箱" className="red-input" />
                    <span className="err-msg"><img src={require('@/img/attention.png')} alt="" />该邮箱已注册</span>
                </label>
                <label htmlFor="pwd">
                    <Input.Password placeholder="密码" className="red-input" />
                    <span className="err-msg"><img src={require('@/img/attention.png')} alt="" />密码至少8位</span>
                </label>
                <Button text="注册" />
                <div className="gray-text-wrapper">
                    <span className="gray-text" onClick={this.handleLogin}>已有帐户？登陆</span>
                </div>
            </div>
        );
    }
    private handleLogin = () =>
    {
        this.props.history.push('/load/login')
    }
}

export default injectIntl(SignIn);
