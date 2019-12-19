/**
 * 一级标题菜单
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history'
import './index.less';
import { observer } from 'mobx-react';
import { ICommonStore } from '@/store/interface/common.interface';

interface IProps {
  history: History,
  locale: any,
  common: ICommonStore,
  notify: any
}
interface IState {
  showManger: boolean
}
@observer
export default class Header extends React.Component<IProps, IState>{
  public state = {
    showManger: false
  }
  public render() {
    return (
      <header className="header-wrap header-shadow">
        <div className="header-box">
          <div className="header-menu">
            <Link to="/"><img src={require('@/img/logo.png')} alt="logo.png" className="logo-icon" /></Link>
            <ul>
              <li><Link to="/">{this.props.locale.discover}</Link></li>
              {/* <li>
                <a href="javascript:;" onClick={this.handleToCreateProject}>{this.props.locale.creat}</a>
              </li> */}
            </ul>
          </div>
          <div className="header-right">
            <ul>
              {
                (!this.props.common.userInfo) && (
                  <li>
                    <span className="point-login" onClick={this.handleToLogin}>{this.props.locale.login} </span>
                  </li>
                )
              }
              {
                (this.props.common.userInfo) && (
                  <li>
                    <div className="people-login">
                      <img src={this.props.common.userInfo.headIconUrl ? this.props.common.userInfo.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                      <div className="people-manager">
                        <div className="people-trangle">
                          <div className="trangle" />
                        </div>
                        <div className="people-list">
                          <ul className="people-ul">
                            <li className="people-li" onClick={this.handleToPersonal}>{this.props.locale.center}</li>
                            {/* <li className="people-li" onClick={this.handleToMyProject}>{this.props.locale.myproject}</li> */}
                            <li className="people-li" onClick={this.handleToLogout} >{this.props.locale.exit}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </header>
    );
  }
  // 创建项目
  // private handleToCreateProject = () =>
  // {
  //   if (!this.props.common.userInfo)
  //   {
  //     // 未登录
  //     this.handleToLogin();
  //   } 
  //   else
  //   {
  //     // 正常访问
  //     const href = process.env.REACT_APP_SERVER_ENV === 'DEV' ? '/test' : '';
  //     window.location.href = href + '/project'
  //   }
  // }
  // 登录
  private handleToLogin = () => {
    // this.props.history.push('/load/login');
    this.props.common.loginFutureDao();
  }

  // 进入个人中心
  private handleToPersonal = () => {
    // this.handleToShow();
    this.props.history.push('/personalcenter/userinfo')
  }
  // 进入我的项目
  // private handleToMyProject = () =>
  // {
  //   // this.handleToShow();
  //   this.props.history.push('/personalcenter/myproject')
  // }
  // 退出登录
  private handleToLogout = () => {
    // todo
    this.props.common.logoutFutureDao();
  }
}
// export default injectIntl(Header);