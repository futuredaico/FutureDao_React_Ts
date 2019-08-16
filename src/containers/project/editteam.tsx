/**
 * 创建项目
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
// import Select from '@/components/select';
import { ICreateProjectProps, ITeamList, IMemberList } from './interface/createproject.interface'

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
    deleteMember:IMemberList | null // 选择要删除的成员
}

@observer
class CreateProject extends React.Component<ICreateProjectProps, IState> {
    public state: IState = {
        identityValue: 'admin',
        showAdd: false,
        showDelete: false,
        inviteStr: '',
        isSearching: false,
        selectMember: null,
        isCanInvite: false,
        deleteMember:null
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
        await this.props.createproject.getTeamList();
        this.props.createproject.teamList.forEach((item: ITeamList) =>
        {
            if (item.userId === this.props.common.userId)
            {
                if (item.role === 'admin')
                {
                    this.setState({
                        isCanInvite: true
                    })
                } else
                {
                    this.setState({
                        isCanInvite: false
                    })
                }
            }
        })
    }
    public render()
    {
        // const oneClassName = classnames('step-tab',
        //     { 'edit-tab': this.props.createproject.step === 1 },
        //     { 'success-tab': this.props.createproject.stepOneStatus === 2 }
        // );

        return (
            <>
                <div className="inline-title">
                    <strong>团队成员</strong>&nbsp;&nbsp;
          <span className="tips-text">（ 暂未接受邀请的成员信息不会对外公示 ）</span>
                </div>
                <div className="inline-enter">
                    <ul className="inline-table">
                        <li className="table-li">
                            <span className="table-th">头像/名称</span>
                            <span className="table-th">认证状态</span>
                            <span className="table-th">身份</span>
                            <span className="table-th">管理</span>
                        </li>
                        {
                            this.props.createproject.teamList.map((item: ITeamList, index) =>
                            {
                                return (
                                    <li className="table-li" key={index}>
                                        <span className="table-td">
                                            <img src={item.headIconUrl?item.headIconUrl:require('@/img/default.png')} alt="" className="people-img" />
                                            <span className="peo-name">{item.username}</span>
                                        </span>
                                        {
                                            item.authenticationState === 'not' && <span className="table-td gray-color">未认证</span>
                                        }
                                        {
                                            item.authenticationState === 'person' && <span className="table-td gray-color">个人认证</span>
                                        }
                                        {
                                            item.authenticationState === 'company' && <span className="table-td gray-color">企业认证</span>
                                        }
                                        {
                                            item.role === 'admin' ? (
                                                <>
                                                    <span className="table-td admin-color">管理</span>
                                                    <span className="table-td" />
                                                </>
                                            )
                                                : (
                                                    <>
                                                        <span className="table-td">成员</span>
                                                        <span className="table-td">
                                                            {
                                                                this.state.isCanInvite && <Button text="删除" btnSize="sm-btn" btnColor="red-btn" onClick={this.handleShowDelete.bind(this,item)} />
                                                            }                                                            
                                                        </span>
                                                    </>
                                                )
                                        }
                                        {/* <span className="table-td">
                                            <Select
                                                defaultValue={item.role}
                                                options={this.identityOptions}
                                                text=''
                                                onCallback={this.onSelletCallback.bind(this, item)}
                                            />
                                        </span> */}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    this.state.isCanInvite && (
                        <div className="inline-enter-btn">
                            <Button text="+ 邀请新成员" btnSize="bg-btn" btnColor="white-btn" onClick={this.handleShowAddBox} />
                        </div>
                    )
                }

                {
                    this.state.showAdd && (
                        <div className="invite-people-wrapper">
                            <div className="invite-content">
                                <div className="close-icon" onClick={this.handleShowAddBox}>
                                    <img src={require("@/img/close.png")} alt="" />
                                </div>
                                <div className="invite-title">邀请成员加入项目</div>
                                <div className="invite-input">
                                    {/* 补充邮箱 */}
                                    <Input placeholder="使用E-mail进行搜索" value={this.state.inviteStr} onChange={this.handleToEmailSearch} />
                                    {
                                        this.state.isSearching && (
                                            <div className="invite-select-list">
                                                <ul>
                                                    {
                                                        this.props.createproject.searchList.length === 0 && (
                                                            <li>
                                                                <span className="nodata-text">未找到该用户</span>
                                                            </li>
                                                        )
                                                    }
                                                    {
                                                        this.props.createproject.searchList.length > 0 && this.props.createproject.searchList.map((item: IMemberList, index) =>
                                                        {
                                                            return (
                                                                <li key={index} onClick={this.handleSelectUser.bind(this, item)}>
                                                                    <img src={item.headIconUrl?item.headIconUrl:require('@/img/default.png')} alt="" />
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
                                <Button text="邀请" btnSize="bg-btn" onClick={this.handleInviteMemeber} btnColor={!this.state.selectMember?'gray-btn':''} />
                            </div>
                        </div>
                    )
                }
                {
                    this.state.showDelete && (
                        <div className="delete-people-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">确认将 XXX 移除团队？</div>
                                <div className="delete-btn">
                                    <Button text="取消" btnColor="red-btn" onClick={this.handleCancelDelete} />
                                    <Button text="确认" onClick={this.handleCheckDelete} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        );
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

        this.props.createproject.inviteMember(this.state.selectMember.userId);
        this.handleShowAddBox();
        this.props.common.openNotificationWithIcon('success', '操作成功', '邀请邮件已发出。');
        
        return true;
    }
    // 邀请成员输入
    private handleToEmailSearch = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        //
        this.setState({
            inviteStr: ev.target.value.trim(),
            isSearching: true,
            selectMember:null
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
        this.props.createproject.searchMemberList(email)
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
    private handleShowDelete = (item:IMemberList) =>
    {
        this.setState({
            showDelete: !this.state.showDelete,
            deleteMember:item
        })
    }
    private handleCancelDelete = () =>{
        this.setState({
            showDelete: !this.state.showDelete,
            deleteMember:null
        })
    }
    // 确认删除
    private handleCheckDelete =async () =>
    {
        if(!this.state.deleteMember){
            return false;
        }
        await this.props.createproject.deleteMember(this.state.deleteMember.userId);
        this.handleCancelDelete();
        this.props.createproject.getTeamList();
        return true;
    }
}

export default injectIntl(CreateProject);
