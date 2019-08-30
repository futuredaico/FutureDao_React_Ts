/**
 * 主页布局
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Card from '@/components/card';
// import Slider from '@/components/slider';
import { Pagination } from 'antd';
import { IHomeProps, IProjList } from './interface/home.interface';
import { ProjType } from '@/store/interface/common.interface';

@inject('home')
@observer
class Home extends React.Component<IHomeProps, any> {
  public intrl = this.props.intl.messages;
  public componentDidMount()
  {
    this.props.home.getProjList();
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
        {/* <div className="index-banner-box swiper-container" id="banner-swiper">
          <div className="swiper-wrapper">
            <div className="banner-text one-text swiper-slide">
              <div className="text-content">
                <img src={require("@/img/banner1.png")} alt="" onClick={this.handleToProjectInfo.bind(this,'tu2')} />
              </div>
            </div>
            <div className="banner-text two-text swiper-slide">
              <div className="text-content">
                <img src={require("@/img/banner2.png")} alt="" />
              </div>
            </div>
          </div>
          <div className="swiper-pagination" id="banner-pagination" />
        </div> */}
        <div className="index-content-wrapper">
          <div className="home-title">
            <div className="home-text">{this.intrl.home.discover}</div>
          </div>
          <div className="home-list-wrapper">
            <ul className="home-list-ul">
              {
                this.props.home.projListCount > 0 && this.props.home.projList.map((item: IProjList, index) =>
                {
                  return (
                    <li className="home-list-li" key={index} onClick={this.handleToProjectInfo.bind(this, item.projId)}>
                      <div className="home-smallbox">
                        <div className="home-img">
                          <img src={item.projConverUrl} alt="" />
                        </div>
                        <div className="home-des">
                          <div className="sbox-title">{item.projTitle}</div>
                          <div className="sbox-card">
                            <Card text={this.handleDiffType(item.projType)} colortype={this.handleDiffColor(item.projType)} />
                          </div>
                          <div className="sbox-showtype">
                            <div className="showtype-text"><strong>{this.intrl.home.display}</strong></div>
                            <div className="kanhao-count">{item.supportCount}{this.intrl.home.supporttips}</div>
                          </div>
                          {/* <div className="sbox-line">
                              <div className="sbox-line-left">已售出 3427股</div>
                              <div className="sbox-line-right">1120 人参与</div>                              
                            </div> */}
                          {/* <div className="sbox-line">
                              <div className="sbox-line-left">5天后开启众筹</div>                             
                            </div> */}
                          <div className="sbox-doing">
                            {/* <div className="sbox-toptext">300 ETH</div> */}
                            {/* toThousands(parseFloat(parseFloat(item.storePrice).toFixed(4)).toString()) */}
                            {/* <Slider rate={300} /> */}
                            {/* <div className="sbox-topright">{item.supportCount} 支持者</div> */}
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <div className="home-page-warpper">
              <Pagination showQuickJumper={true} defaultCurrent={1} defaultPageSize={this.props.home.projListPageSize} total={this.props.home.projListCount} onChange={this.handleChangePage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // 跳转到项目详情页todo
  private handleToProjectInfo = (id) =>
  {
    this.props.history.push('/projectinfo/' + id);
  }
  // 分页
  private handleChangePage = (index: number) =>
  {
    console.log(index)
    this.props.home.projListPage = index;
    this.props.home.getProjList();
    // todo
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
  private handleDiffColor = (type: string) =>
  {
    //
    if (type === ProjType.GAME)
    {
      return 'c-green'
    } else if (type === ProjType.COMIC)
    {
      return 'c-red'
    } else if (type === ProjType.MOVIE)
    {
      return 'c-gray'
    } else
    {
      return 'c-purple'
    }
  }
}

export default injectIntl(Home);
