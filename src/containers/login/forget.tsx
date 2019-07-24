/**
 * 忘记密码页面
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
// import Button from '@/components/Button';
@observer
class ForgetPwd extends React.Component<any, any> {
    public state = {
        stepNum: true
    }
    public render()
    {
        return (
            <div className="normal-wrapper forget-wrapper">
                {
                    this.state.stepNum
                    ? (
                        <>
                            <Input placeholder="邮箱" />
                            <Button text="取消" btnColor="red-btn" />
                            <Button text="重置密码" onClick={this.handleResetPwd} />
                        </>
                    )
                    :(
                        <>
                        <div className="forget-tips">
                            <p>我们向您发送了一封重置密码的电子邮件，请按照邮件提示进行操作。</p>
                            <p>请确保邮件未归类入垃圾邮件。如果无法收到邮件，请查看<a href="#">帮助</a>。</p>
                        </div>
                        <Button text="完成"  onClick={this.handleComplete} />
                        </>
                    )
                }

            </div>
        );
    }
    private handleResetPwd =() => {
        this.setState({
            stepNum:false
        })
    }
    private handleComplete = () => {
        this.props.history.push('/load/login')
    }
}

export default injectIntl(ForgetPwd);
