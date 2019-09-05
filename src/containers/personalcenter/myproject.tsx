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
interface IState
{
    projectMenuNum: number
}

@inject('myproject')
@observer
class MyProject extends React.Component<IMyProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public myprojectMenu = [
        {
            id: 1,
            name: this.intrl.myproject.follow
        },
        {
            id: 2,
            name: this.intrl.myproject.manager
        }
    ]
    public state = {
        projectMenuNum: 1
    }
    public componentDidMount()
    {
        this.props.myproject.getAttentionData();
        this.props.myproject.getSomethingCount();
    }
    public render()
    {
        return (
            <div className="myproject-page">
                <h2>{this.intrl.myproject.project}</h2>
                <div className="myproject-menu">
                    <ul className="title-ul">
                        {
                            this.myprojectMenu.map((item, index) =>
                            {
                                return (
                                    <li className={this.state.projectMenuNum === item.id ? "title-li active" : "title-li"} key={index} onClick={this.mapUnderline.bind(this, item)}>
                                        {item.name}&nbsp;&nbsp;{this.handleCountNumber(item.id)}
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
                                        <div className="attention-line" key={index} onClick={this.handleToProjectInfo.bind(this, item.projId)}>
                                            <img src={item.projConverUrl} alt="" className="attention-img" />
                                            <div className="attention-content">
                                                <strong className="attention-title">{item.projTitle}</strong>
                                                <div className="project-card">
                                                    {/* <Card text="以太坊" colortype="c-qpurple" /> */}
                                                    <Card text={this.handleDiffType(item.projType)} colortype="c-green" />
                                                </div>
                                                <div className="project-status">
                                                    {item.projState === ProjectState.Readying && <strong>{this.intrl.myproject.prepare}</strong>}
                                                    {item.projState === ProjectState.IdeaPub && <strong>{this.intrl.myproject.display}</strong>}
                                                    {/* {item.projState === ProjectState.CrowdFunding && <strong>众筹中</strong>}
                                                    {item.projState === ProjectState.Trading && <strong>交易中</strong>}
                                                    {item.projState === ProjectState.ClearUp && <strong>清退</strong>} */}
                                                    <span className="time-text">{formatTime.computeTime(item.lastUpdateTime, this.props.intl.locale)}</span>
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
                                        <div className="manager-line" key={index} onClick={this.handleToEditProject.bind(this, item.projId)}>
                                            <img src={item.projConverUrl} alt="" className="manager-img" />
                                            <div className="manager-right">
                                                <strong className="project-title">{item.projTitle}</strong>
                                                <div className="project-card">
                                                    {/* <Card text="以太坊" colortype="c-qpurple" /> */}
                                                    <Card text={this.handleDiffType(item.projType)} colortype="c-green" />
                                                </div>
                                                <div className="project-status">
                                                    {item.projState === ProjectState.Readying && <strong>{this.intrl.myproject.prepare}</strong>}
                                                    {item.projState === ProjectState.IdeaPub && <strong>{this.intrl.myproject.display}</strong>}
                                                    {/* {item.projState === ProjectState.CrowdFunding && <strong>众筹中</strong>}
                                                    {item.projState === ProjectState.Trading && <strong>交易中</strong>}
                                                    {item.projState === ProjectState.ClearUp && <strong>清退</strong>} */}
                                                    {item.projSubState === ProjSubState.Auditing && <strong className="green-text">{this.intrl.myproject.review}</strong>}
                                                    {/* {item.projSubState === ProjSubState.Preheating && <strong className="purple-text">众筹预热</strong>} */}
                                                    {item.projSubState === ProjSubState.AuditFailed && <strong className="red-text">{this.intrl.myproject.failed}</strong>}
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
    private handleCountNumber = (id: number) =>
    {
        if (id === 1)
        {
            return this.props.myproject.attentionCount
        } else
        {
            return this.props.myproject.manageCount
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
            return this.intrl.card.game
        } else if (type === ProjType.COMIC)
        {
            return this.intrl.card.animation
        } else if (type === ProjType.MOVIE)
        {
            return this.intrl.card.movies
        } else
        {
            return this.intrl.card.other
        }
    }
    // 跳转到项目详情页todo
    private handleToProjectInfo = (projId: string) =>
    {
        this.props.history.push('/projectinfo/' + projId);
    }
    // 跳转到项目编辑页
    private handleToEditProject = (projId: string) =>
    {
        this.props.history.push('/project/' + projId);
    }
}

export default injectIntl(MyProject);
