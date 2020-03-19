/**
 * 团队管理
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input, Pagination } from 'antd';
import Select from '@/components/select';

import { ITeamList, ProjectRole } from '../interface/editproject.interface'
import { IProjectProps } from '../interface/project.interface';

type Identity = 'admin' | 'member';
interface IState
{
    identityValue: Identity, // 成员身份
    showAdd: boolean, // 是否显示添加成员弹框
    showDelete: boolean, // 是否显示删除成员弹框
    isCanInvite: boolean, // 是否可以邀请成员
    deleteMember: ITeamList | null // 选择要删除的成员
    addrValue: string // 成员地址
    addrFlag: boolean // 地址格式是否正确
    showQuit: boolean // 是否显示退出弹框
    quitStr: string // 退出的提示
}
@inject('project', 'editproject', 'common')
@observer
class EditMember extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        identityValue: 'admin',
        showAdd: false,
        showDelete: false,
        isCanInvite: false,
        deleteMember: null,
        addrValue: '',
        addrFlag: true,
        showQuit: false,
        quitStr: ''
    }
    // 下拉筛选
    private identityOptions = [
        {
            id: 'admin',
            name: '管理',
        }
        // {
        //     id: 'member',
        //     name: '团队成员',
        // }
    ]
    public async componentDidMount()
    {
        this.getList();
        // this.props.editproject.teamList.forEach((item: ITeamList) =>
        // {
        //     if (item.userId === this.props.common.userId)
        //     {
        //         if (item.role === 'admin')
        //         {
        //             this.setState({
        //                 isCanInvite: true
        //             })
        //         } else
        //         {
        //             this.setState({
        //                 isCanInvite: false
        //             })
        //         }
        //     }
        // })
    }
    public render()
    {
        // const oneClassName = classnames('step-tab',
        //     { 'edit-tab': this.props.editproject.step === 1 },
        //     { 'success-tab': this.props.editproject.stepOneStatus === 2 }
        // );

        return (
            <>
                <div className="big-title"><strong>{this.intrl.team.team}</strong></div>
                <div className="inline-enter">
                    <ul className="inline-table">
                        <li className="table-li">
                            <span className="table-th">{this.intrl.team.avatar}</span>
                            <span className="table-th">地址</span>
                            <span className="table-th">{this.intrl.team.status}</span>
                            <span className="table-th">{this.intrl.team.manager}</span>
                        </li>
                        {
                            this.props.editproject.teamCount > 0 && this.props.editproject.teamList.map((item: ITeamList, index: number) =>
                            {
                                return (
                                    <li className="table-li" key={index}>
                                        <span className="table-td">
                                            <span className="peo-name">{item.username ? item.username : this.intrl.user.shen}</span>
                                        </span>
                                        <span className="table-td">{item.address}</span>
                                        <span className="table-td admin-color">{item.role === ProjectRole.admin ? this.intrl.team.manager : this.intrl.team.member}</span>
                                        <span className="table-td">
                                            {/* {
                                                item.isMine ? <Button text="退出" btnSize="sm-btn" btnColor="red-btn" onClick={this.handleShowQuit.bind(this,item)}   />
                                                :(
                                                    <>
                                                        {
                                                            item.role!== ProjectRole.admin && this.props.editproject.editContent.role === ProjectRole.admin && <Button text="踢出" btnSize="sm-btn" btnColor="red-btn" onClick={this.handleShowDelete.bind(this,item)} />
                                                        }
                                                    </>
                                                )
                                            } */}
                                            {
                                                item.role !== ProjectRole.admin && this.props.editproject.editContent.role === ProjectRole.admin && <Button text="踢出" btnSize="sm-btn" btnColor="red-btn" onClick={this.handleShowDelete.bind(this, item)} />
                                            }
                                        </span>
                                    </li>
                                )
                            })
                        }

                    </ul>
                    {
                        this.props.editproject.teamCount > 15 && (
                            <div className="list-page-warpper">
                                <Pagination showQuickJumper={true} defaultPageSize={this.props.editproject.teamPageSize} defaultCurrent={1} total={this.props.editproject.teamCount} onChange={this.handleChangeTeamPage} />
                            </div>
                        )
                    }
                </div>
                {
                    this.props.editproject.editContent.role === ProjectRole.admin && (
                        <div className="inline-enter-btn">
                            <Button text={this.intrl.btn.invite} btnSize="bg-btn" btnColor="white-btn" onClick={this.handleShowAddBox} />
                        </div>
                    )
                }

                {
                    this.state.showAdd && (
                        <div className="invite-people-wrapper">
                            <div className="invite-content">
                                <div className="invite-title">{this.intrl.team.invitetitle}</div>
                                <div className="invite-form">
                                    <div className="invite-text">
                                        <strong>成员地址</strong>
                                    </div>
                                    <div className="invite-input">
                                        <Input
                                            value={this.state.addrValue}
                                            onChange={this.handleChangInviteAddr}
                                            className={(this.state.addrValue && !this.state.addrFlag) ? "err-active" : ''}
                                        />
                                        {
                                            (this.state.addrValue && !this.state.addrFlag) && <span className="err-span">地址填写错误</span>
                                        }
                                    </div>
                                </div>
                                <div className="invite-form">
                                    <div className="invite-text">
                                        <strong>身份</strong>
                                    </div>
                                    <div className="invite-input">
                                        <Select
                                            defaultValue={this.identityOptions[1].id}
                                            options={this.identityOptions}
                                            text=''
                                            onCallback={this.onSelletCallback}
                                        />
                                    </div>
                                </div>
                                <Button
                                    text={this.intrl.btn.cancel}
                                    onClick={this.handleShowAddBox}
                                    btnSize="md-bg-btn"
                                    btnColor='red-btn'
                                />
                                <Button
                                    text={this.intrl.btn.invite2}
                                    onClick={this.handleInviteMemeber}
                                    btnSize="md-bg-btn"
                                    btnColor={(this.state.addrValue && !this.state.addrFlag) ? 'gray-btn' : ''}
                                />
                            </div>
                        </div>
                    )
                }
                {
                    this.state.showDelete && (
                        <div className="delete-people-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">{this.intrl.team.delete1} {(this.state.deleteMember && this.state.deleteMember.username) ? this.state.deleteMember.username : this.intrl.user.shen} {this.intrl.team.delete2}</div>
                                <div className="delete-btn">
                                    <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleCancelDoSomething} />
                                    <Button text={this.intrl.btn.comfirm} onClick={this.handleCheckDelete} />
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* {
                    this.state.showQuit && (
                        <div className="delete-people-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">{this.intrl.team.delete1} {(this.state.deleteMember && this.state.deleteMember.username)?this.state.deleteMember.username:this.intrl.user.shen} {this.intrl.team.delete2}</div>
                                <div className="delete-btn">
                                    <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleCancelDoSomething} />
                                    <Button text={this.intrl.btn.comfirm} onClick={this.handleCheckDelete} />
                                </div>
                            </div>
                        </div>
                    )
                } */}
            </>
        );
    }
    private getList = () =>
    {
        const projectId = this.props.match.params.projectId;
        this.props.editproject.getTeamList(projectId);
    }
    // 翻页
    private handleChangeTeamPage = (index: number) =>
    {
        this.props.editproject.teamPage = index;
        this.getList();
    }
    // 地址的输入
    private handleChangInviteAddr = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            addrValue: ev.target.value.trim(),
        }, () =>
        {
            this.handleChangeAddrByMetamask();
        })
    }
    // 地址格式验证
    private handleChangeAddrByMetamask = () =>
    {
        const res = web3.isAddress(this.state.addrValue);
        console.log(res)
        this.setState({
            addrFlag: res
        })
    }
    // 发送邀请
    private handleInviteMemeber = () =>
    {
        if (this.state.addrValue && !this.state.addrFlag)
        {
            return false;
        }

        this.props.editproject.inviteMember(this.state.addrValue, this.state.identityValue,this.props.project.projId);
        this.handleShowAddBox();
        this.getList();

        return true;
    }
    // 角色选择
    private onSelletCallback = (item) =>
    {
        this.setState({
            identityValue: item.id
        })
    }

    // 打开新增成员弹框
    private handleShowAddBox = () =>
    {
        this.setState({
            showAdd: !this.state.showAdd
        })
    }
    // 打开删除成员弹框
    private handleShowDelete = (item: ITeamList) =>
    {
        this.setState({
            showDelete: !this.state.showDelete,
            deleteMember: item
        })
    }
    // 打开退出弹框
    // private handleShowQuit = (item:ITeamList)=>{
    //     this.setState({
    //         showQuit: !this.state.showQuit,
    //         deleteMember: item
    //     })
    // }
    // 取消删除
    private handleCancelDoSomething = () =>
    {
        this.setState({
            showQuit: false,
            showDelete: false,
            deleteMember: null
        })
    }
    // 确认删除
    private handleCheckDelete = async () =>
    {
        if (!this.state.deleteMember)
        {
            return false;
        }
        await this.props.editproject.deleteMember(this.state.deleteMember.address,this.props.project.projId);
        this.handleCancelDoSomething();
        this.getList();
        return true;
    }
}

export default injectIntl(EditMember);
