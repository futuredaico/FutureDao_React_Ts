// 整体布局
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Header from '@/containers/header';
// import { zh_CN, en_US } from '@/language';
import store from '@/store/common';
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
    lang: store.language === 'en' ? 'en' : 'zh', // zh为中，en为英
  }
  // 切换语言
  public onChangeLanguage = (lang: string) => {
    if (lang === "zh") {
      store.setLanguage('zh');
      sessionStorage.setItem('language', 'zh');
      this.setState({
        lang: 'zh'
      })
    } else {
      store.setLanguage('en');
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
    if (/load/.test(location.pathname)) {
      CommonStore.footer = false;
      return;
    }
    CommonStore.footer = true;
  }
}
