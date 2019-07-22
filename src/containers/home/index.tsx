/**
 * 主页布局
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Card from '@/components/card';
import Slider from '@/components/slider';
import { Pagination } from 'antd';
// import Toast from '@/components/Toast';

@observer
class Home extends React.Component<any, any> {
  public dataList = [
    {
      hash: 'tu1',
      voteHash: '',
      title: 'BIG GAME! "V fight white warrior"',
      imgIcon: require('@/img/tu1.png'),
      name: 'James D.',
      
      governPrice: '100000',
      storePrice: '200000',
      buyIn: 100,
      saleOut: 80,
      isUp: true,
      upDown: '10',
      isStop: true,
      crowdFundMoney: '1000',
      remaining: '12'
    },
    {
      hash: 'tu1',
      voteHash: '',
      title: "在线涂鸦工具《 Thank God！Let's Paint》办公解压轻巧sdfgsdfgsdgsdffg",
      imgIcon: require('@/img/tu3.png'),          
      governPrice: '100000',
      storePrice: '200000',
      buyIn: 100,
      saleOut: 80,
      isUp: true,
      upDown: '10',
      isStop: true,
      crowdFundMoney: '1000',
      remaining: '12'
    },
    {
      hash: 'tu1',
      voteHash: '',
      title: 'BIG GAME! "V fight white warrior在线涂鸦工具《 Thank God！Let',
      imgIcon: require('@/img/tu5.png'),          
      governPrice: '100000',
      storePrice: '200000',
      buyIn: 100,
      saleOut: 80,
      isUp: true,
      upDown: '10',
      isStop: true,
      crowdFundMoney: '1000',
      remaining: '12'
    },
    {
      hash: 'tu1',
      voteHash: '',
      title: 'BIG GAME! "V fight white warrior"',
      imgIcon: require('@/img/tu6.png'),          
      governPrice: '100000',
      storePrice: '200000',
      buyIn: 100,
      saleOut: 80,
      isUp: true,
      upDown: '10',
      isStop: true,
      crowdFundMoney: '1000',
      remaining: '12'
    }
  ]
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
            <div className="home-text">发现项目</div>
          </div>
          <div className="home-list-wrapper">
            <ul className="home-list-ul">
              {
                this.dataList.length > 0 && this.dataList.map((item, index) =>
                {
                  return (
                    <li className="home-list-li" key={index} onClick={this.handleToProjectInfo.bind(this, item.hash)}>
                      <div className="home-smallbox">
                        <div className="home-img">
                          <img src={item.imgIcon} alt="" />
                        </div>
                        <div className="home-des">
                          <div className="sbox-title">{item.title}</div>
                          <div className="sbox-card">
                            <Card text="游戏" colortype="c-green" />
                          </div>
                          {/* <div className="sbox-asset">                            
                            <div className="sbox-line">
                              <div className="sbox-line-left">已售出 3427股</div>
                              <div className="sbox-line-right">1120 人参与</div>                              
                            </div>
                            <div className="sbox-line">
                              <div className="sbox-line-left">255人 看好</div>
                            </div>
                            <div className="sbox-line">
                              <div className="sbox-line-left">5天后开启众筹</div>                             
                            </div>
                          </div> */}
                          <div className="sbox-doing">
                            <div className="sbox-toptext">300 ETH</div>
                            {/* toThousands(parseFloat(parseFloat(item.storePrice).toFixed(4)).toString()) */}
                            <Slider rate={300} />
                            <div className="sbox-topright">1120 支持者</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <div className="home-page-warpper">
              <Pagination showQuickJumper={true} defaultCurrent={1} total={50} onChange={this.handleChangePage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // 跳转到项目详情页todo
  private handleToProjectInfo = (id) =>
  {
    this.props.history.push('/project/' + id);
  }
  // 分页
  private handleChangePage = (index:number) => {
    console.log(index)
    // todo
  }
}

export default injectIntl(Home);
