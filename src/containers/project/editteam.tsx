/**
 * 创建项目
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
import Select from '@/components/select';
import { ICreateProjectProps, ITeamList, IMemberList } from './interface/createproject.interface'

type Identity = 'admin' | 'member';
interface IState {
    identityValue: Identity,
    showAdd: boolean, // 是否显示添加成员弹框
    showDelete: boolean, // 是否显示删除成员弹框
    inviteStr: string, // 想要邀请人的邮箱
    isSearching: boolean,// 是否正在搜索
    selectMember: IMemberList | null // 已经选择的成员
}

@observer
class CreateProject extends React.Component<ICreateProjectProps, IState> {
    public state: IState = {
        identityValue: 'admin',
        showAdd: false, // 是否显示添加成员弹框
        showDelete: false, // 是否显示删除成员弹框
        inviteStr: '', // 想要邀请人的邮箱
        isSearching: false,// 是否正在搜索
        selectMember: null // 已经选择的成员
    }
    // 下拉筛选
    private identityOptions = [
        {
            id: 'admin',
            name: '管理',
        },
        {
            id: 'member',
            name: '成员',
        }
    ]
    public componentDidMount() {
        // 区分是新建项目还是管理项目
        this.props.createproject.getTeamList();
    }
    public render() {
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
                            this.props.createproject.teamList.map((item: ITeamList, index) => {
                                return (
                                    <li className="table-li" key={index}>
                                        <span className="table-td">
                                            <img src={item.headIconUrl.replace('temp_', '')} alt="" className="people-img" />
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

                                        {/* <span className="table-td admin-color">管理</span> */}
                                        <span className="table-td">
                                            <Select
                                                defaultValue={item.role}
                                                options={this.identityOptions}
                                                text=''
                                                onCallback={this.onSelletCallback.bind(this, item)}
                                            />
                                        </span>
                                        <span className="table-td">
                                            <Button text="删除" btnSize="sm-btn" btnColor="red-btn" onClick={this.handleShowDelete} />
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="inline-enter-btn">
                    <Button text="+ 邀请新成员" btnSize="bg-btn" btnColor="white-btn" onClick={this.handleShowAddBox} />
                </div>
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
                                                        this.props.createproject.searchList.length > 0 && this.props.createproject.searchList.map((item: IMemberList, index) => {
                                                            return (
                                                                <li key={index} onClick={this.handleSelectUser.bind(this, item)}>
                                                                    <img src={item.headIconUrl.replace('temp_', '')} alt="" />
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
                                <Button text="邀请" btnSize="bg-btn" onClick={this.handleInviteMemeber} />
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
                                    <Button text="取消" btnColor="red-btn" onClick={this.handleShowDelete} />
                                    <Button text="确认" onClick={this.handleCheckDelete} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        );
    }
    private handleSelectUser = (item: IMemberList) => {
        this.setState({
            inviteStr: item.email,
            isSearching: false,
            selectMember: item
        })
    }

    private handleInviteMemeber = () => {
        if (!this.state.selectMember) {
            return false;
        }

        this.props.createproject.inviteMember(this.state.selectMember.userId)

        return true;
    }
    // 邀请成员输入
    private handleToEmailSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        //
        this.setState({
            inviteStr: ev.target.value.trim(),
            isSearching: true
        })
        if (!ev.target.value) {
            this.setState({
                isSearching: false
            })
        } else {
            this.searchMember(ev.target.value.trim());
        }
    }
    private searchMember = (email: string) => {
        this.props.createproject.searchMemberList(email)
    }
    // 下拉框选择
    private onSelletCallback = (item: ITeamList, opt: any) => {
        console.log(item);
        console.log(opt)
        // todo
        // this.setState({
        //     identityValue: item.id
        // })
    }
    // 打开新增成员弹框
    private handleShowAddBox = () => {
        this.setState({
            showAdd: !this.state.showAdd
        })
    }
    // 打开删除成员弹框
    private handleShowDelete = () => {
        this.setState({
            showDelete: !this.state.showDelete
        })
    }
    // 确认删除
    private handleCheckDelete = () => {
        this.handleShowDelete();
    }
}

export default injectIntl(CreateProject);
