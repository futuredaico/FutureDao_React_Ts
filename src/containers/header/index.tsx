/**
 * 一级标题菜单
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history'
import './index.less';
import { observer } from 'mobx-react';
import { ICommonStore } from '@/store/interface/common.interface';

interface IProps
{
  history: History,
  // locale: any,
  common: ICommonStore,
}
@observer
export default class Header extends React.Component<IProps, any>{
  public state = {
    showManger: false
  }
  public render()
  {
    return (
      <header className="header-wrap header-shadow">
        <div className="header-box">
          <div className="header-menu">
            <Link to="/"><img src={require('@/img/logo.png')} alt="logo.png" className="logo-icon" /></Link>            
            <ul>
              <li><Link to="/">发现项目</Link></li>
              <li>
                <Link to="/createproject">创建项目</Link>
              </li>
            </ul>
          </div>
          <div className="header-right">
            <ul>
              <li>
                  <span className="point-login">登陆 | 注册</span>
              </li>
              <li>
                <div className="people-login">
                  <img src={require('@/img/h5.png')} alt="" className="people-img" onClick={this.handleToShow} />
                  {
                    this.state.showManger && (
                      <div className="people-manager">
                        <div className="people-trangle">
                          <div className="trangle" />
                        </div>
                        <div className="people-list">
                          <ul className="people-ul">
                            <li className="people-li">个人中心</li>
                            <li className="people-li">我的项目</li>
                            <li className="people-li">退出账号</li>
                          </ul>
                        </div>
                      </div>
                    )
                  }
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
  // 登录与登出
  // private onGoLogin = () =>
  // {
  //   this.props.common.login();
  // }
  private handleToShow = () =>
  {
    this.setState({
      showManger: !this.state.showManger
    })
  }
}
// export default injectIntl(Header);