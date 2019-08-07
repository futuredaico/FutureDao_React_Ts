/**
 * 个人中心
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Card from '@/components/card';
import { Pagination } from 'antd';
import { IMyProjectProps, IProjAttentionList, IProjManagerList } from './interface/myproject.interface';
import { ProjType, ProjectState, ProjSubState } from '@/store/interface/common.interface';
import * as formatTime from 'utils/formatTime';

@inject('myproject')
@observer
class MyProject extends React.Component<IMyProjectProps, any> {
    public myprojectMenu = [
        {
            id: 1,
            name: '关注中'
        },
        {
            id: 2,
            name: '管理中'
        }
    ]
    public state = {
        projectMenuNum: 1
    }
    public componentDidMount()
    {
        this.props.myproject.getAttentionData();
    }
    public render()
    {
        return (
            <div className="myproject-page">
                <h2>我的项目</h2>
                <div className="myproject-menu">
                    <ul className="title-ul">
                        {
                            this.myprojectMenu.map((item, index) =>
                            {
                                return (
                                    <li className={this.state.projectMenuNum === item.id ? "title-li active" : "title-li"} key={index} onClick={this.mapUnderline.bind(this, item)}>
                                        {item.name}&nbsp;&nbsp;
                                        {this.state.projectMenuNum === 1 && this.props.myproject.attentionCount}
                                        {this.state.projectMenuNum === 2 && this.props.myproject.manageCount}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    this.state.projectMenuNum === 1 && (
                        <div className="attention-list">
                            {
                                this.props.myproject.attentionCount > 0 && this.props.myproject.attentionList.map((item: IProjAttentionList, index: number) =>
                                {
                                    return (
                                        <div className="attention-line" key={index} onClick={this.handleToProjectInfo.bind(this,item.projId)}>
                                            <img src={item.projConverUrl} alt="" className="attention-img" />
                                            <div className="attention-content">
                                                <strong className="attention-title">{item.projTitle}</strong>
                                                <div className="project-card">
                                                    {/* <Card text="以太坊" colortype="c-qpurple" /> */}
                                                    <Card text={this.handleDiffType(item.projType)} colortype="c-green" />
                                                </div>
                                                <div className="project-status">
                                                    {item.projState === ProjectState.Readying && <span>准备中</span>}
                                                    {item.projState === ProjectState.IdeaPub && <span>创意发布</span>}
                                                    {item.projState === ProjectState.CrowdFunding && <span>众筹中</span>}
                                                    {item.projState === ProjectState.Trading && <span>交易中</span>}
                                                    {item.projState === ProjectState.ClearUp && <span>清退</span>}
                                                    <span className="time-text">{formatTime.computeTime(item.lastUpdateTime, this.props.intl.locale)}更新</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                this.props.myproject.attentionCount > 6 && (
                                    <div className="list-page-warpper">
                                        <Pagination showQuickJumper={true} defaultPageSize={this.props.myproject.attentionPageSize} defaultCurrent={1} total={this.props.myproject.attentionCount} onChange={this.handleChangeAttentionPage} />
                                    </div>
                                )
                            }

                        </div>
                    )
                }
                {
                    this.state.projectMenuNum === 2 && (
                        <div className="manager-list">
                            {
                                this.props.myproject.manageCount > 0 && this.props.myproject.manageList.map((item: IProjManagerList, index: number) =>
                                {
                                    return (
                                        <div className="manager-line" key={index} onClick={this.handleToEditProject.bind(this,item.projId)}>
                                            <img src={item.projConverUrl} alt="" className="manager-img" />
                                            <div className="manager-right">
                                                <strong className="project-title">{item.projTitle}</strong>
                                                <div className="project-card">
                                                    {/* <Card text="以太坊" colortype="c-qpurple" /> */}
                                                    <Card text={this.handleDiffType(item.projType)} colortype="c-green" />
                                                </div>
                                                <div className="project-status">
                                                    {item.projState === ProjectState.Readying && <span>准备中</span>}
                                                    {item.projState === ProjectState.IdeaPub && <span>创意发布</span>}
                                                    {item.projState === ProjectState.CrowdFunding && <span>众筹中</span>}
                                                    {item.projState === ProjectState.Trading && <span>交易中</span>}
                                                    {item.projState === ProjectState.ClearUp && <span>清退</span>}
                                                    {item.projSubState === ProjSubState.Auditing && <span className="green-text">审核中</span>}
                                                    {item.projSubState === ProjSubState.Preheating && <span className="purple-text">众筹预热</span>}
                                                    {item.projSubState === ProjSubState.AuditFailed && <span className="red-text">审核失败</span>}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                this.props.myproject.manageCount > 5 && (
                                    <div className="list-page-warpper">
                                        <Pagination showQuickJumper={true} defaultPageSize={this.props.myproject.managerPageSize} defaultCurrent={1} total={this.props.myproject.manageCount} onChange={this.handleChangeManagerPage} />
                                    </div>
                                )
                            }

                        </div>
                    )
                }
            </div>
        );
    }
    // 菜单选择
    private mapUnderline = (item) =>
    {
        this.setState({
            projectMenuNum: item.id
        })
        this.props.myproject.attentionPage = 1;
        this.props.myproject.managerPage = 1;
        if (item.id === 1)
        {
            this.props.myproject.getAttentionData();
        } else
        {
            this.props.myproject.getManagerData();
        }
    }
    // 管理项目的分页
    private handleChangeManagerPage = (index: number) =>
    {
        this.props.myproject.managerPage = index;
        this.props.myproject.getManagerData();
    }
    // 关注项目的分页
    private handleChangeAttentionPage = (index: number) =>
    {
        this.props.myproject.managerPage = index;
        this.props.myproject.getAttentionData();
    }
    // 区分项目类别
    private handleDiffType = (type: string) =>
    {
        //
        if (type === ProjType.GAME)
        {
            return '游戏'
        } else if (type === ProjType.COMIC)
        {
            return '动漫'
        } else if (type === ProjType.MOVIE)
        {
            return '电影'
        } else
        {
            return '其他'
        }
    }
    // 跳转到项目详情页todo
    private handleToProjectInfo = (projId:string) =>
    {
        this.props.history.push('/projectinfo/' + projId);
    }
    // 跳转到项目编辑页
    private handleToEditProject = (projId:string)=>{
        this.props.history.push('/project/' + projId);
    }
}

export default injectIntl(MyProject);
