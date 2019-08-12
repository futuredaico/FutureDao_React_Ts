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
  // locale: any,
  common: ICommonStore,
}
@observer
export default class Header extends React.Component<IProps, any>{
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
              <li><Link to="/">发现项目</Link></li>
              <li>
                <a href="javascript:;" onClick={this.handleToCreateProject}>创建项目</a>
              </li>
            </ul>
          </div>
          <div className="header-right">
            <ul>
              {
                (!this.props.common.userInfo) && (
                  <li>
                    <span className="point-login" onClick={this.handleToLogin}>登陆 | </span>  <span className="point-login" onClick={this.handleToSignin}>注册</span>
                  </li>
                )
              }
              {
                (this.props.common.userInfo) && (
                  <li>
                    <div className="people-login">
                      <img src={this.props.common.userInfo.headIconUrl.replace('temp_', '')} alt="" className="people-img" />
                      {/* {
                        this.state.showManger && ( */}
                      <div className="people-manager">
                        <div className="people-trangle">
                          <div className="trangle" />
                        </div>
                        <div className="people-list">
                          <ul className="people-ul">
                            <li className="people-li" onClick={this.handleToPersonal}>个人中心</li>
                            <li className="people-li" onClick={this.handleToMyProject}>我的项目</li>
                            <li className="people-li" onClick={this.handleToLogout} >退出账号</li>
                          </ul>
                        </div>
                      </div>
                      {/* )
                      } */}
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
  private handleToCreateProject = () => {
    console.log(this.props.common.isVerifyEmail)
    if (!this.props.common.userInfo) {
      // 未登录
      this.handleToLogin();
    }else if(this.props.common.isVerifyEmail){
      // 邮箱未验证
      this.props.common.openNotificationWithIcon('error', '操作失败', '请验证邮箱后进行操作。');
    }
     else {
      // 正常访问
      window.location.href = '/project'
    }
  }
  // 登录
  private handleToLogin = () => {
    this.props.history.push('/load/login');
  }
  // 注册
  private handleToSignin = () => {
    this.props.history.push('/load/signin');
  }

  // private handleToShow = () => {
  //   this.setState({
  //     showManger: !this.state.showManger
  //   })
  // }

  // 进入个人中心
  private handleToPersonal = () => {
    // this.handleToShow();
    this.props.history.push('/personalcenter/userinfo')
  }
  // 进入我的项目
  private handleToMyProject = () => {
    // this.handleToShow();
    this.props.history.push('/personalcenter/myproject')
  }
  // 退出登录
  private handleToLogout = () => {
    // todo
    this.props.common.logoutFutureDao();
  }
}
// export default injectIntl(Header);