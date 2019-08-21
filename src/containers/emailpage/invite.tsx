/**
 * 成员邀请验证
 */
import * as React from 'react';
import './index.less';
import { observer, inject } from 'mobx-react';
import { getQueryString } from '@/utils/function'
import Button from '@/components/Button';
import { IEmailCheckProps } from './interface/emailcheck.interface';

// interface IState
// {
//     username: string,
//     email: string,
//     projId:string,
//     code: string,
//     verifyRes: string | null,
//     invateStep:number
// }
@inject('emailcheck','common')
@observer
export default class InvifyCheck extends React.Component<IEmailCheckProps, any>
{
    public state = {
        username: getQueryString('username') || '',
        email: getQueryString('email') || '',
        projId:getQueryString('projId')|| '',
        verifyCode: getQueryString('verifyCode') || '',
        verifyRes:null,
        invateStep: 0 // 默认，1为同意，2为拒绝
    }
    public componentDidMount()
    {
        this.props.emailcheck.getProInfo(this.state.projId);
    }
    public render()
    {
        return (
            <div className="invite-container">
                <div className="invite-box">
                    {
                        this.state.invateStep === 0 && (
                            <>
                                <div className="invite-p">
                                    <img src={this.props.emailcheck.proInfo?(this.props.emailcheck.proInfo.adminHeadIconUrl?this.props.emailcheck.proInfo.adminHeadIconUrl:require('@/img/default.png')): require('@/img/default.png')} alt="" className="invite-img" />
                                    <strong>{this.props.emailcheck.proInfo&&this.props.emailcheck.proInfo.adminUsername}</strong>
                                    <span>邀请你加入项目</span>
                                    <strong>{this.props.emailcheck.proInfo&&this.props.emailcheck.proInfo.projName}</strong>
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
                                <p>你已成功加入项目 <strong>{this.props.emailcheck.proInfo&&this.props.emailcheck.proInfo.projName}</strong></p>
                                <span onClick={this.handleToGoMyProject}>前往查看</span>
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
    // 拒绝
    private handleRefuse = () =>
    {
        if(!this.state.projId){
            return false;
        }
        this.props.emailcheck.verifyInvify(this.state.username,this.state.email,this.state.projId,this.state.verifyCode,'0')
        this.setState({
            invateStep: 2
        })
        return true;
    }
    // 同意
    private handleAgree = () =>
    {
        if(!this.state.projId){
            return false;
        }
        this.props.emailcheck.verifyInvify(this.state.username,this.state.email,this.state.projId,this.state.verifyCode,'1')
        this.setState({
            invateStep: 1
        })
        return true;
    }
    // 进入我的项目
    private handleToGoMyProject = async ()=>{
        // 检查登陆状况
        await this.props.common.getLoginStatus();
        if(this.props.common.userInfo){
            this.props.history.push('/personalcenter/myproject')
        }else{
            this.props.history.push('/load/login')
        }
    }
}