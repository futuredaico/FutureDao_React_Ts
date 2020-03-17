/**
 * 团队管理
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input, Pagination } from 'antd';
// import Select from '@/components/select';

import { IMemberList, ITeamList } from '../interface/editproject.interface'
import { IProjectProps } from '../interface/project.interface';

type Identity = 'admin' | 'member';
interface IState
{
    identityValue: Identity,
    showAdd: boolean, // 是否显示添加成员弹框
    showDelete: boolean, // 是否显示删除成员弹框
    inviteStr: string, // 想要邀请人的邮箱
    isSearching: boolean,// 是否正在搜索
    selectMember: IMemberList | null // 已经选择的成员
    isCanInvite: boolean, // 是否可以邀请成员
    deleteMember: IMemberList | null // 选择要删除的成员
}
@inject('project', 'editproject', 'common')
@observer
class EditMember extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        identityValue: 'admin',
        showAdd: false,
        showDelete: false,
        inviteStr: '',
        isSearching: false,
        selectMember: null,
        isCanInvite: false,
        deleteMember: null
    }
    // 下拉筛选
    // private identityOptions = [
    //     {
    //         id: 'admin',
    //         name: '管理',
    //     },
    //     {
    //         id: 'member',
    //         name: '成员',
    //     }
    // ]
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
                                            <span className="peo-name">{item.username}</span>
                                        </span>
                                        <span className="table-td">{item.address}</span>
                                        <span className="table-td admin-color">{item.role==='admin'?this.intrl.team.manager:this.intrl.team.member}</span>
                                        <span className="table-td">
                                            {
                                                !item.isMine && <Button text="退出" btnSize="sm-btn" btnColor="red-btn" />
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
                {/* {
                    this.state.isCanInvite && ( */}
                <div className="inline-enter-btn">
                    <Button text={this.intrl.btn.invite} btnSize="bg-btn" btnColor="white-btn" onClick={this.handleShowAddBox} />
                </div>
                {/* )
                } */}

                {
                    this.state.showAdd && (
                        <div className="invite-people-wrapper">
                            <div className="invite-content">
                                <div className="close-icon" onClick={this.handleShowAddBox}>
                                    <img src={require("@/img/close.png")} alt="" />
                                </div>
                                <div className="invite-title">{this.intrl.team.invitetitle}</div>
                                <div className="invite-input">
                                    {/* 补充邮箱 */}
                                    <Input placeholder={this.intrl.team.search} value={this.state.inviteStr} onChange={this.handleToEmailSearch} />
                                    {
                                        this.state.isSearching && (
                                            <div className="invite-select-list">
                                                <ul>
                                                    {
                                                        this.props.editproject.searchList.length === 0 && (
                                                            <li>
                                                                <span className="nodata-text">{this.intrl.team.notfound}</span>
                                                            </li>
                                                        )
                                                    }
                                                    {
                                                        this.props.editproject.searchList.length > 0 && this.props.editproject.searchList.map((item: IMemberList, index) =>
                                                        {
                                                            return (
                                                                <li key={index} onClick={this.handleSelectUser.bind(this, item)}>
                                                                    <img src={item.headIconUrl ? item.headIconUrl : require('@/img/default.png')} alt="" />
                                                                    <span className="name-text">{item.username}</span>
                                                                    <span>{item.email}</span>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                </div>
                                <Button text={this.intrl.btn.invite2} btnSize="bg-btn" onClick={this.handleInviteMemeber} btnColor={!this.state.selectMember ? 'gray-btn' : ''} />
                            </div>
                        </div>
                    )
                }
                {
                    this.state.showDelete && (
                        <div className="delete-people-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">{this.intrl.team.delete1} {this.state.deleteMember && this.state.deleteMember.username} {this.intrl.team.delete2}</div>
                                <div className="delete-btn">
                                    <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleCancelDelete} />
                                    <Button text={this.intrl.btn.comfirm} onClick={this.handleCheckDelete} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        );
    }
    private getList = ()=>{
        const projectId = this.props.match.params.projectId;
        this.props.editproject.getTeamList(projectId);
    }
    // 翻页
    private handleChangeTeamPage = (index: number) =>
    {
        this.props.editproject.teamPage = index;
        this.getList();
    }
    // 选中成员
    private handleSelectUser = (item: IMemberList) =>
    {
        this.setState({
            inviteStr: item.email,
            isSearching: false,
            selectMember: item
        })
    }
    // 发送邀请
    private handleInviteMemeber = () =>
    {
        if (!this.state.selectMember)
        {
            return false;
        }

        this.props.editproject.inviteMember(this.state.selectMember.userId);
        this.handleShowAddBox();
        this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendmsg);

        return true;
    }
    // 邀请成员输入
    private handleToEmailSearch = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        //
        this.setState({
            inviteStr: ev.target.value.trim(),
            isSearching: true,
            selectMember: null
        })
        if (!ev.target.value)
        {
            this.setState({
                isSearching: false
            })
        } else
        {
            this.searchMember(ev.target.value.trim());
        }
    }
    // 搜索成员
    private searchMember = (email: string) =>
    {
        this.props.editproject.searchMemberList(email)
    }
    // 下拉框选择
    // private onSelletCallback = (item: ITeamList, opt: any) => {
    //     console.log(item);
    //     console.log(opt)
    //     // todo
    //     // this.setState({
    //     //     identityValue: item.id
    //     // })
    // }

    // 打开新增成员弹框
    private handleShowAddBox = () =>
    {
        this.setState({
            showAdd: !this.state.showAdd,
            inviteStr: '',
            isSearching: false,
            selectMember: null
        })
    }
    // 打开删除成员弹框
    // private handleShowDelete = (item: IMemberList) =>
    // {
    //     this.setState({
    //         showDelete: !this.state.showDelete,
    //         deleteMember: item
    //     })
    // }
    private handleCancelDelete = () =>
    {
        this.setState({
            showDelete: !this.state.showDelete,
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
        await this.props.editproject.deleteMember(this.state.deleteMember.userId);
        this.handleCancelDelete();
        this.getList();
        return true;
    }
}

export default injectIntl(EditMember);
