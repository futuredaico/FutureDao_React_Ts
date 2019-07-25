/**
 * 一级标题菜单
 */
import * as React from 'react';
import './index.less';
import zh from '@/img/zh.png';
import en from '@/img/en.png';
import { observer } from 'mobx-react';
import { ICommonStore } from '@/store/interface/common.interface';

interface IProps {
  // locale: any,
  common: ICommonStore
  onChangeLanguage: (lang: string) => void;
}
@observer
export default class Footer extends React.Component<IProps, any>
{
  public state = {
    isShowLanguage: false,
    languageText: this.props.common.language === 'en' ? "En" : "中",
    languageImg: this.props.common.language === 'en' ? en : zh,
  }
  public render() {
    if (!this.props.common.footer) {
      return null;
    }
    return (
      <footer>
        <div className="footer-wrapper">
          <div className="footer-left">
            <div className="footer-list">
              <ul>
                <li className="footer-li">
                  <strong>关于</strong>
                  <span>关于我们</span>
                </li>
                <li className="footer-li">
                  <strong>支持</strong>
                  <span>项目发起流程</span>
                  <span>常见问题</span>
                  <span>帮助中心</span>
                </li>
                <li className="footer-li">
                  <strong>条款</strong>
                  <span>用户协议</span>
                  <span>隐私政策</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relation-list">
            <div className="language-toggle" id="language">
              <label onClick={this.toggleLanguage}>
                <div className="language-content">
                  {/* <span className="lang-text">{this.state.languageText}</span> */}
                  <img src={this.state.languageImg} alt="zh.png" className="img-icon" />
                </div>
              </label>
              {
                this.state.isShowLanguage && (
                  <div className="select-wrap" id="selectlang" onClick={this.toggleLanguage}>
                    <ul>
                      <li><a onClick={this.onClickChinese} href="javascript:;">中文</a></li>
                      <li><a onClick={this.onClickEnglish} href="javascript:;">English</a></li>
                    </ul>
                  </div>
                )
              }
            </div>
            <ul>
              <li className="img-icon">
                <a href="https://twitter.com/NewEconoLab" target="_blank" className="img-twitter" />
              </li>
              {/* <li className="img-icon" id="qqfooter">
                                <a href="#qqfooter" className="img-qq" />
                            </li> */}
              <li className="img-icon" id="wechatfooter">
                <a href="#wechatfooter" className="img-wechat" />
              </li>
              <li className="img-icon">
                <a href="https://github.com/NewEconoLab" target="_blank" className="img-git" />
              </li>
            </ul>
          </div>

        </div>
        <div className="footer-msg">
          <span>© 2019 FutureDAO</span>
        </div>
      </footer>
    );
  }
  // 是否显示语言
  public toggleLanguage = (e) => {
    this.setState({
      isShowLanguage: !this.state.isShowLanguage,
    })
    e.stopPropagation();
  }
  // 切换英文
  private onClickEnglish = () => {
    this.setState({
      languageText: "En",
      languageImg: en,
    })
    this.props.onChangeLanguage('en');
  }
  // 切换中文
  private onClickChinese = () => {
    this.setState({
      languageText: "中",
      languageImg: zh,
    })
    this.props.onChangeLanguage('zh');
  }
}
