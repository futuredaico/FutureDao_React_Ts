/**
 * 邮箱验证
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
// import Button from '@/components/Button';
import './index.less';
import { observer } from 'mobx-react';
import { getQueryString } from '@/utils/function'
// import { ISettingProps } from '../myaccount/interface/setting.interface';


// @inject('setting', 'common')
@observer
export default class EmailCheck extends React.Component {
    public state = {
        addr: getQueryString('addr') || '',
        email: getQueryString('email') || '',
        code: getQueryString('code') || '',
    }
    // public componentDidMount()
    // {
    //     this.props.setting.verifyEmail(this.state.addr, this.state.email, this.state.code)
    // }
    public render()
    {
        return (
            <div className="emailcheck-container">
                {/* {
                    this.props.setting.verifyResult === '0000' && ( */}
                        <div className="success-email">
                            <img src={require('@/img/success.png')} className="success-icon" alt="" />
                            <p className="addr-p">邮箱验证成功</p>
                            <Link to="/" className="back-home">返回首页</Link>
                        </div>
                    {/* )
                }
                {
                    (this.props.setting.verifyResult !== '' && this.props.setting.verifyResult !== '0000') && (
                        <div className="fail-email">
                            <img src={require('@/img/fail.png')} className="fail-icon" alt="" />
                            <p>该链接已经失效。</p>
                        </div>
                    )
                } */}
            </div>
        )
    }

}