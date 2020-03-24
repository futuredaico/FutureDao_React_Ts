/**
 * 发现页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Pagination } from 'antd';
import { IHomeProps, IMolochProjList } from './interface/home.interface';


@inject('home')
@observer
class Home extends React.Component<IHomeProps, any> {
  public intrl = this.props.intl.messages;
  public componentDidMount()
  {
    this.props.home.getMolochProjList();
  }
  public componentWillUnmount()
  {
    this.props.home.projList = [];
    this.props.home.projListCount = 0;
    this.props.home.projListPage = 1;
  }
  public render()
  {
    return (
      <div className="index-page">
        <div className="index-content-wrapper">
          <div className="home-title">
            <div className="home-text">{this.intrl.home.discover}</div>
          </div>
          <div className="home-list-wrapper">
            <ul className="home-list-ul">
              {
                this.props.home.projListCount > 0 && this.props.home.projList.map((item: IMolochProjList, index) =>
                {
                  return (
                    <li className="home-list-li" key={index} onClick={this.handleToProjectInfo.bind(this, item)}>
                      <div className="home-smallbox">
                        <div className="home-img">
                          {
                            item.projCoverUrl ? <img src={item.projCoverUrl} alt="" /> : <img src="https://futuredao-mainnet.oss-cn-hangzhou.aliyuncs.com/projdefault_s.png" alt="" />
                          }
                        </div>
                        <div className="home-des">
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
            </ul>
            {
              this.props.home.projListCount > 12 && (
                <div className="home-page-warpper">
                  <Pagination
                    showQuickJumper={true}
                    defaultCurrent={1}
                    defaultPageSize={this.props.home.projListPageSize}
                    total={this.props.home.projListCount}
                    onChange={this.handleChangePage} />
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
  // 跳转到项目详情页todo
  private handleToProjectInfo = (item: IMolochProjList) =>
  {
    if(item.projType === 'future'){
      this.props.history.push('/futureinfo/' + item.projId);
    }else{
      this.props.history.push('/molochinfo/' + item.projId);
    }    
  }
  // 分页
  private handleChangePage = (index: number) =>
  {
    this.props.home.projListPage = index;
    this.props.home.getMolochProjList();
  }
}

export default injectIntl(Home);
