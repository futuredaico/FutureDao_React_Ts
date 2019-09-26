// 整体布局
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Header from '@/containers/header';
import { zh_CN, en_US } from '@/language';
import CommonStore from '@/store/common';
import ScrollToTop from '@/components/scrolltotop';
import './index.less';
import Footer from '../footer';
import VerifyMail from './verifymail';

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
  public onChangeLanguage = (lang: string) =>
  {
    if (lang === "zh")
    {
      CommonStore.setLanguage('zh');
      localStorage.setItem('futuredaolang', 'zh');      
      this.setState({
        lang: 'zh'
      })
    } else
    {
      CommonStore.setLanguage('en');
      localStorage.setItem('futuredaolang', 'en');
      this.setState({
        lang: 'en'
      })
    }
  }
  public componentDidMount()
  {
    // 初始化先匹配一次
    this.onMapping();
    // listen 路由改变，重新匹配一次
    this.context.router.history.listen(() =>
    {
      this.onMapping();
    });
  }

  public render()
  {
    return (
      <div className="layout-container">
        <ScrollToTop>
          <Header
            history={this.context.router.history}
            locale={this.state.lang === 'en' ? en_US.header : zh_CN.header}
            notify={this.state.lang === 'en' ? en_US.notify : zh_CN.notify}
            common={CommonStore}
          />
          <div className="layout-main">
            <VerifyMail common={CommonStore} locale={this.state.lang === 'en' ? en_US.email : zh_CN.email} />
            {this.props.children}
          </div>
          <Footer
            locale={this.state.lang === 'en' ? en_US.footer : zh_CN.footer}
            common={CommonStore}
            onChangeLanguage={this.onChangeLanguage}
          />
        </ScrollToTop>
      </div>
    );
  }

  private onMapping()
  {
    if (/load/.test(location.pathname) || (/inviteteam/.test(location.pathname))|| (/support/.test(location.pathname))|| (/giftorder/.test(location.pathname)))
    {
      CommonStore.footer = false;
      return;
    }
    CommonStore.footer = true;
  }
}
