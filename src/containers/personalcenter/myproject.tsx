/**
 * 我的项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Pagination } from 'antd';
import { IMyProjectProps, IMyprojectList } from './interface/myproject.interface';
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
  public state:IState = {
    projectMenuNum: 1
  }
  public componentDidMount()
  {
    this.props.myproject.getSomethingCount();
    this.props.myproject.getAtJoinData();
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
                this.props.myproject.joinCount > 6 && (
                  <div className="list-page-warpper">
                    <Pagination showQuickJumper={true} defaultPageSize={this.props.myproject.joinPageSize} defaultCurrent={1} total={this.props.myproject.joinCount} onChange={this.handleChangeJoinPage} />
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
                    <li className="myproject-list-li" key={index}>
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
                      <div className="dosomething-wrapper">
                          <div className="two-btnbox">
                            <Button text="管理" btnColor="white-btn" onClick={this.handleToEditProject.bind(this,item)} />
                            <Button text="查看" btnColor="white-btn" onClick={this.handleToProjectInfo.bind(this,item)} />
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
    if (item.id === 1)
    {
      this.props.myproject.getAtJoinData();
    }
    else if (item.id === 2)
    {
      this.props.myproject.getAttentionData();
    } else if (item.id === 3)
    {
      this.props.myproject.getManagerData();
    }
  }
  // 显示数量
  private handleCountNumber = (id: number) =>
  {
    if (id === 1)
    {
      return this.props.myproject.joinCount
    }
    if (id === 2)
    {
      return this.props.myproject.attentionCount
    } else if (id === 3)
    {
      return this.props.myproject.manageCount
    } else
    {
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
  // 参与中项目的分页
  private handleChangeJoinPage = (index: number) =>
  {
    this.props.myproject.joinPage = index;
    this.props.myproject.getAtJoinData();
  }
  // 跳转到项目详情页
  private handleToProjectInfo = (item: IMyprojectList) =>
  {
    if(item.projType === 'future'){
      this.props.history.push('/futureinfo/' + item.projId);
    }else{
      this.props.history.push('/molochinfo/' + item.projId);
    } 
  }
  // 跳转到项目编辑页
  private handleToEditProject = (item: IMyprojectList) =>
  {
    if(item.projType === 'future'){
      this.props.history.push('/project/edit/' + item.projId);
    }else{
      this.props.history.push('/molochinfo/' + item.projId);
    } 
  }
}

export default injectIntl(MyProject);
