/**
 * 邮箱验证
 */
import * as React from 'react';
// import Button from '@/components/Button';
import './index.less';
import { observer } from 'mobx-react';
import { getQueryString } from '@/utils/function'
import Button from '@/components/Button';


@observer
export default class EmailCheck extends React.Component
{
    public state = {
        addr: getQueryString('addr') || '',
        email: getQueryString('email') || '',
        code: getQueryString('code') || '',
        invateStep: 0 // 默认，1为同意，2为拒绝
    }
    // public componentDidMount()
    // {
    //     this.props.setting.verifyEmail(this.state.addr, this.state.email, this.state.code)
    // }
    public render()
    {
        return (
            <div className="invite-container">
                <div className="invite-box">
                    {
                        this.state.invateStep === 0 && (
                            <>
                                <div className="invite-p">
                                    <img src={require('@/img/h5.png')} alt="" className="invite-img" />
                                    <strong>XXXXX</strong>
                                    <span>邀请你加入项目</span>
                                    <strong>项目名称</strong>
                                    <span>的团队</span>
                                </div>
                                <Button text="拒绝" btnColor="red-btn" onClick={this.handleRefuse} />
                                <Button text="同意" onClick={this.handleAgree} />
                            </>
                        )
                    }
                    {
                        this.state.invateStep === 1 && (
                            <div className="next-box">
                                <img src={require('@/img/bigyes.png')} alt="" className="next-img" />
                                <p>你已成功加入项目 <strong>项目名称</strong></p>
                                <a href="/personalcenter">前往查看</a>
                            </div>
                        )
                    }
                    {
                        this.state.invateStep === 2 && (
                            <div className="next-box">
                                <img src={require('@/img/bigno.png')} alt="" className="next-img" />
                                <p>你已拒绝该邀请</p>
                                <a href="/">返回首页</a>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
    private handleRefuse = () =>
    {
        this.setState({
            invateStep: 2
        })
    }
    private handleAgree = () =>
    {
        this.setState({
            invateStep: 1
        })
    }
}