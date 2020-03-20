/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import ProjectDetail from '../info/detail'
import UpdateList from '../update/updatelist';
import RightTeam from './detail/rightteam';
import UpdateInfo from '../update/updateinfo';
import ManagerInfo from '../manager/managerinfo';
import { IProjectInfoProps } from '../interface/projectinfo.interface';
import classnames from 'classnames';

@observer
class Pbottom extends React.Component<IProjectInfoProps, { fixed: boolean }> {
  public intrl = this.props.intl.messages;
  public state = {
    fixed: false,
  }
  private pBottomTitle: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount()
  {
    if (this.pBottomTitle && this.pBottomTitle.current)
    {
      const refTop = this.pBottomTitle && this.pBottomTitle.current ? this.pBottomTitle.current.offsetTop : 0;
      this.onScrollFn.bind(this, refTop);
      window.addEventListener('scroll', this.onScrollFn.bind(this, refTop), false);
    }
  }

  public componentWillUnmount()
  {
    window.removeEventListener('scroll', this.onScrollFn.bind(this));
  }

  public render()
  {
    return (
      <div className="project-bottom">
        <div className="pbottom-wrapper">
          <div className="pbottom-title-wrapper">
            <div className={classnames('pbottom-title', { fixed: this.state.fixed })} ref={this.pBottomTitle}>
              <ul className="title-ul">
                <li className={this.props.projectinfo.menuNum === 1 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 1)}>
                  {this.intrl.projinfo.info}
                </li>
                <li className={this.props.projectinfo.menuNum === 2 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 2)}>
                  <a href="#message">{this.intrl.projinfo.comment + ' ' + this.handleNumCount(2)} </a>
                </li>
                <li className={this.props.projectinfo.menuNum === 3 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 3)}>
                  {this.intrl.projinfo.update + ' ' + this.handleNumCount(3)}
                </li>
              </ul>
            </div>
          </div>
          <div className="pbottom-content">
            {
              this.props.projectinfo.isShowUpdateInfo && <UpdateInfo {...this.props} />
            }
            {
              this.props.projectinfo.isShowManagerInfo && <ManagerInfo {...this.props} />
            }
            {
              (!this.props.projectinfo.isShowUpdateInfo && !this.props.projectinfo.isShowManagerInfo) && (
                <>
                  {
                    (this.props.projectinfo.menuNum === 1 || this.props.projectinfo.menuNum === 2 || this.props.projectinfo.menuNum === 3) && (
                      <>
                        <div className="pbottom-left">
                          {
                            (this.props.projectinfo.menuNum === 1 || this.props.projectinfo.menuNum === 2) && <ProjectDetail {...this.props} />
                          }
                          {
                            this.props.projectinfo.menuNum === 3 && <UpdateList {...this.props} />
                          }
                        </div>
                        <div className="pbottom-right">
                          <RightTeam {...this.props} />
                        </div>
                      </>
                    )
                  }
                </>
              )
            }

          </div>
        </div>

      </div>
    );
  }
  // 菜单选择
  private mapUnderline = (id: number) =>
  {
    window.scrollTo(0, 500);
    this.props.projectinfo.menuNum = id;
    this.props.projectinfo.isShowUpdateInfo = false;
    this.props.projectinfo.isShowManagerInfo = false;
    this.props.update.updateId = '';
    if (id === 2)
    {
      // todo
      window.location.hash = 'message'
    }
  }
  private handleNumCount = (id: number) =>
  {
    if (id === 2)
    {
      return this.props.projectinfo.projInfo ? this.props.projectinfo.projInfo.discussCount : '';
    }
    else if (id === 3)
    {
      return this.props.projectinfo.projInfo ? this.props.projectinfo.projInfo.updateCount : '';
    }
    else
    {
      return ''
    }
  }
  private onScrollFn(refTop: number)
  {
    const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollTop >= refTop)
    {
      this.setState({
        fixed: true
      })
      return;
    }

    this.setState({
      fixed: false
    })
  }
}
export default injectIntl(Pbottom);
