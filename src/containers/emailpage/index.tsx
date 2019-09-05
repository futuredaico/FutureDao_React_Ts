/**
 * 邮箱验证
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import './index.less';
import { observer, inject } from 'mobx-react';
import { getQueryString } from '@/utils/function'
import { IEmailCheckProps } from './interface/emailcheck.interface';
interface IState
{
    username: string,
    email: string,
    code: string,
    verifyRes: string | null,
}
@inject('emailcheck', 'common')
@observer
export default class EmailCheck extends React.Component<IEmailCheckProps, IState> {
    public state = {
        username: getQueryString('username') || '',
        email: getQueryString('email') || '',
        code: getQueryString('verifyCode') || '',
        verifyRes: null,
    }
    public async componentDidMount()
    {
        const res = await this.props.emailcheck.verifyRegister(this.state.username, this.state.email, this.state.code);
        this.setState({
            verifyRes: res ? '1' : '2'
        })
    }
    public render()
    {
        if (!this.state.verifyRes)
        {
            return null
        }
        return (
            <div className="email-wrapper">
                <div className="emailcheck-container">
                    {
                        this.state.verifyRes === '1' && (
                            <div className="success-email">
                                <img src={require('@/img/success.png')} className="success-icon" alt="" />
                                <p className="addr-p">邮箱验证成功</p>
                                <Link to="/" className="back-home">返回首页</Link>
                            </div>
                        )
                    }
                    {
                        this.state.verifyRes === '2' && (
                            <div className="fail-email">
                                <img src={require('@/img/fail.png')} className="fail-icon" alt="" />
                                <p>该链接已经失效。</p>
                            </div>
                        )
                    }
                </div>
            </div>

        )
    }

}