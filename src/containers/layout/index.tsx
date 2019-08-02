// 整体布局
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Header from '@/containers/header';
// import { zh_CN, en_US } from '@/language';
import CommonStore from '@/store/common';
import ScrollToTop from '@/components/scrolltotop';
import './index.less';
import Footer from '../footer';

export default class LayoutIndex extends React.Component<any, any> {
  public static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired
    }).isRequired
  }
  public state = {
    lang: CommonStore.language === 'en' ? 'en' : 'zh', // zh为中，en为英
  }
  // 切换语言
  public onChangeLanguage = (lang: string) => {
    if (lang === "zh") {
      CommonStore.setLanguage('zh');
      sessionStorage.setItem('language', 'zh');
      this.setState({
        lang: 'zh'
      })
    } else {
      CommonStore.setLanguage('en');
      sessionStorage.setItem('language', 'en');
      this.setState({
        lang: 'en'
      })
    }
  }
  public componentDidMount() {
    // 初始化先匹配一次
    this.onMapping();
    // listen 路由改变，重新匹配一次
    this.context.router.history.listen(() => {
      this.onMapping();
    });
  }

  public render() {
    return (
      <div className="layout-container">
        <ScrollToTop>
          <Header
            history={this.context.router.history}
            // locale={this.state.lang === 'en' ? en_US.header : zh_CN.header}
            common={CommonStore}
          />
          <div className="layout-main">
            {CommonStore.isVerifyEmail&&<div className="verify-wrapper">小提示：  我们需要验证你的电子邮件地址。请点击我们发送的邮件里的链接。  <strong className="send-email">重新发送</strong></div>}
            {this.props.children}
          </div>
          <Footer
            // locale={this.state.lang === 'en' ? en_US.header : zh_CN.header}
            common={CommonStore}
            onChangeLanguage={this.onChangeLanguage}
          />
        </ScrollToTop>
      </div>
    );
  }

  private onMapping() {
    if (/load/.test(location.pathname) || (/inviteteam/.test(location.pathname))) {
      CommonStore.footer = false;
      return;
    }
    CommonStore.footer = true;
  }
}
