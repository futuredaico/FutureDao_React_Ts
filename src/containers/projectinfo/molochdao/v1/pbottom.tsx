/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import ProjectDetail from './detail/detail'
import Manager from './manager/manager';
import ManagerInfo from './manager/managerinfo';
import Member from './member/member';
import { IMolochInfoProps } from '../interface/molochinfo.interface';
import classnames from 'classnames';

@observer
class MolochPbottom extends React.Component<IMolochInfoProps, { fixed: boolean }> {
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
                <li className={this.props.molochinfo.menuNum === 1 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 1)}>
                  {this.intrl.projinfo.info}
                </li>
                <li className={this.props.molochinfo.menuNum === 2 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 2)}>
                  <a href="#message">{this.intrl.projinfo.comment + ' ' + this.handleNumCount(2)} </a>
                </li>
                <li className={this.props.molochinfo.menuNum === 3 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 3)}>
                  {this.intrl.projinfo.manager} 
                </li>
                <li className={this.props.molochinfo.menuNum === 4 ? "title-li active" : "title-li"} onClick={this.mapUnderline.bind(this, 4)}>
                  {this.intrl.projinfo.member} {this.handleNumCount(4)}
                </li>
              </ul>
            </div>
          </div>
          <div className="pbottom-content">
            {
              this.props.molochinfo.isShowManagerInfo && <ManagerInfo {...this.props} />
            }
            {
              (!this.props.molochinfo.isShowManagerInfo) && (
                <>
                  {
                    (this.props.molochinfo.menuNum === 1 || this.props.molochinfo.menuNum === 2) && (
                      <ProjectDetail {...this.props} />
                    )
                  }
                  {
                    this.props.molochinfo.menuNum === 3 && <Manager {...this.props} />
                  }
                  {
                    this.props.molochinfo.menuNum === 4 && <Member {...this.props} />
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
    this.props.molochinfo.menuNum = id;
    this.props.molochinfo.isShowUpdateInfo = false;
    this.props.molochinfo.isShowManagerInfo = false;
    if (id === 2)
    {
      // todo
      window.location.hash = 'message'
    }
    if (this.props.molochinfo.projId)
    {
        this.props.molochinfo.getMolochProjInfo(this.props.molochinfo.projId);
    }
  }
  private handleNumCount = (id: number) =>
  {
    if (id === 2)
    {
      return this.props.molochinfo.projInfo ? this.props.molochinfo.projInfo.discussCount : '';
    }
    else if (id === 4)
    {
      return this.props.molochinfo.projInfo ? this.props.molochinfo.projInfo.member : '';
    }else
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
export default injectIntl(MolochPbottom);
