/**
 * 我的项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
// import Card from '@/components/card';
import { Pagination } from 'antd';
import { IMyProjectProps, IMyprojectList } from './interface/myproject.interface';
// import * as formatTime from 'utils/formatTime';
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
            name: '参与中'
        },
        {
            id: 2,
            name: this.intrl.myproject.follow
        },
        {
            id: 3,
            name: this.intrl.myproject.manager
        }
    ]
    public state = {
        projectMenuNum: 1
    }
    public componentDidMount()
    {
        this.props.myproject.getAtJoinData();
        // this.props.myproject.getSomethingCount();
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
                        <div className="myproject-list">
                            {
                                this.props.myproject.joinCount > 0 && this.props.myproject.joinList.map((item: IMyprojectList, index: number) =>
                                {
                                    return (
                                        <li className="myproject-list-li" key={index} onClick={this.handleToProjectInfo.bind(this, item)}>
                                          <div className="myproject-smallbox">
                                            <div className="myproject-img">
                                              {
                                                item.projCoverUrl ? <img src={item.projCoverUrl} alt="" /> : <img src={require("@/img/projdefault.png")} alt="" />
                                              }
                                            </div>
                                            <div className="myproject-des">
                                              <div className="sbox-title">{item.projName}</div>
                                              <div className="sbox-des">{item.projBrief ? item.projBrief : '暂无简介'}</div>
                                              {
                                                item.projType === 'future'
                                                  ? (
                                                    <>
                                                      {
                                                        item.projState === 'ideapub' ? (
                                                          <div className="sbox-line">
                                                            <div className="sbox-line-left">创意展示</div>
                                                          </div>
                                                        ) : (
                                                            <div className="sbox-line">
                                                              <div className="sbox-line-left">{item.shares} 代币</div>
                                                              <div className="sbox-line-right">{item.members} {this.intrl.home.member}</div>
                                                            </div>
                                                          )
                                                      }
                                                    </>)
                                                  : (
                                                    <div className="sbox-line">
                                                      <div className="sbox-line-left">{item.shares} {this.intrl.home.gu}</div>
                                                      <div className="sbox-line-right">{item.members} {this.intrl.home.member}</div>
                                                    </div>
                                                  )
                                              }
                                            </div>
                                          </div>
                                        </li>
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
                        <div className="myproject-list">
                            {
                                this.props.myproject.attentionCount > 0 && this.props.myproject.attentionList.map((item: IMyprojectList, index: number) =>
                                {
                                    return (
                                        <li className="myproject-list-li" key={index} onClick={this.handleToProjectInfo.bind(this, item)}>
                                          <div className="myproject-smallbox">
                                            <div className="myproject-img">
                                              {
                                                item.projCoverUrl ? <img src={item.projCoverUrl} alt="" /> : <img src={require("@/img/projdefault.png")} alt="" />
                                              }
                                            </div>
                                            <div className="myproject-des">
                                              <div className="sbox-title">{item.projName}</div>
                                              <div className="sbox-des">{item.projBrief ? item.projBrief : '暂无简介'}</div>
                                              {
                                                item.projType === 'future'
                                                  ? (
                                                    <>
                                                      {
                                                        item.projState === 'ideapub' ? (
                                                          <div className="sbox-line">
                                                            <div className="sbox-line-left">创意展示</div>
                                                          </div>
                                                        ) : (
                                                            <div className="sbox-line">
                                                              <div className="sbox-line-left">{item.shares} 代币</div>
                                                              <div className="sbox-line-right">{item.members} {this.intrl.home.member}</div>
                                                            </div>
                                                          )
                                                      }
                                                    </>)
                                                  : (
                                                    <div className="sbox-line">
                                                      <div className="sbox-line-left">{item.shares} {this.intrl.home.gu}</div>
                                                      <div className="sbox-line-right">{item.members} {this.intrl.home.member}</div>
                                                    </div>
                                                  )
                                              }
                                            </div>
                                          </div>
                                        </li>
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
                    this.state.projectMenuNum === 3 && (
                        <div className="myproject-list">
                            {
                                this.props.myproject.manageCount > 0 && this.props.myproject.manageList.map((item: IMyprojectList, index: number) =>
                                {
                                    return (
                                        <li className="myproject-list-li" key={index} onClick={this.handleToProjectInfo.bind(this, item)}>
                                          <div className="myproject-smallbox">
                                            <div className="myproject-img">
                                              {
                                                item.projCoverUrl ? <img src={item.projCoverUrl} alt="" /> : <img src={require("@/img/projdefault.png")} alt="" />
                                              }
                                            </div>
                                            <div className="myproject-des">
                                              <div className="sbox-title">{item.projName}</div>
                                              <div className="sbox-des">{item.projBrief ? item.projBrief : '暂无简介'}</div>
                                              {
                                                item.projType === 'future'
                                                  ? (
                                                    <>
                                                      {
                                                        item.projState === 'ideapub' ? (
                                                          <div className="sbox-line">
                                                            <div className="sbox-line-left">创意展示</div>
                                                          </div>
                                                        ) : (
                                                            <div className="sbox-line">
                                                              <div className="sbox-line-left">{item.shares} 代币</div>
                                                              <div className="sbox-line-right">{item.members} {this.intrl.home.member}</div>
                                                            </div>
                                                          )
                                                      }
                                                    </>)
                                                  : (
                                                    <div className="sbox-line">
                                                      <div className="sbox-line-left">{item.shares} {this.intrl.home.gu}</div>
                                                      <div className="sbox-line-right">{item.members} {this.intrl.home.member}</div>
                                                    </div>
                                                  )
                                              }
                                            </div>
                                          </div>
                                        </li>
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
        this.props.myproject.joinPage = 1;
        if(item.id ===1){
            this.props.myproject.getAtJoinData();
        }
        else if (item.id === 2)
        {
            this.props.myproject.getAttentionData();
        } else if(item.id === 3)
        {
            this.props.myproject.getManagerData();
        }
    }
    private handleCountNumber = (id: number) =>
    {
        if (id === 1)
        {
            return this.props.myproject.joinCount
        }
        if (id === 2)
        {
            return this.props.myproject.attentionCount
        } else if(id === 3)
        {
            return this.props.myproject.manageCount
        }else{
            return ''
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
    // private handleDiffType = (type: string) =>
    // {
    //     //
    //     if (type === ProjType.GAME)
    //     {
    //         return this.intrl.card.game
    //     } else if (type === ProjType.COMIC)
    //     {
    //         return this.intrl.card.animation
    //     } else if (type === ProjType.MOVIE)
    //     {
    //         return this.intrl.card.movies
    //     } else
    //     {
    //         return this.intrl.card.other
    //     }
    // }
    // 跳转到项目详情页
    private handleToProjectInfo = (projId: string) =>
    {
        this.props.history.push('/projectinfo/' + projId);
    }
    // 跳转到项目编辑页
    // private handleToEditProject = (projId: string) =>
    // {
    //     this.props.history.push('/project/' + projId);
    // }
}

export default injectIntl(MyProject);
