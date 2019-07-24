/**
 * 登陆项目
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
// import Button from '@/components/Button';
@observer
class Login extends React.Component<any, any> {
    public render()
    {
        return (
            <div className="normal-wrapper">
                <Input placeholder="邮箱" />
                <Input placeholder="登陆密码" />
                <Button text="登陆" />
                <div className="gray-text-wrapper">
                    <span className="gray-text" onClick={this.handleForget} >忘记密码?</span><br/>
                    <span className="gray-text" onClick={this.handleSignin} >还没有帐户？点击立即注册</span>
                </div>
            </div>
        );
    }
    private handleForget = () => {
        this.props.history.push('/load/forgetpwd')
    }
    private handleSignin = () => {
        this.props.history.push('/load/signin')
    }
}

export default injectIntl(Login);
