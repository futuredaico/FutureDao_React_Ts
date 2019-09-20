/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import ProjectDetail from './detail'
import UpdateList from './updatelist';
import RightTeam from './rightteam';
import UpdateInfo from './updateinfo';
import Transation from './transation';
import Manager from './manager';
import { IProjectInfoProps } from './interface/projectinfo.interface';
import classnames from 'classnames'

@observer
class Pbottom extends React.Component<IProjectInfoProps, { fixed: boolean }> {
  public intrl = this.props.intl.messages;
  public state = {
    fixed: false
  }
  private menuOne = [
    {
      id: 1,
      name: this.intrl.projinfo.info
    },
    {
      id: 2,
      name: this.intrl.projinfo.comment
    },
    {
      id: 3,
      name: this.intrl.projinfo.update
    },
    {
      id: 4,
      name: "交易"
    },
    {
      id: 5,
      name: "治理"
    }
  ]
  private pBottomTitle: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    if (this.pBottomTitle && this.pBottomTitle.current) {
      const refTop = this.pBottomTitle && this.pBottomTitle.current ? this.pBottomTitle.current.offsetTop : 0;
      this.onScrollFn.bind(this, refTop);
      window.addEventListener('scroll', this.onScrollFn.bind(this, refTop), false);
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollFn.bind(this))
  }

  public render() {
    return (
      <div className="project-bottom">
        <div className="pbottom-wrapper">
          <div className="pbottom-title-wrapper">
            <div className={classnames('pbottom-title', { fixed: this.state.fixed })} ref={this.pBottomTitle}>
              <ul className="title-ul">
                {
                  this.menuOne.map((item, index) => {
                    return (
                      <li className={this.props.projectinfo.menuNum === item.id ? "title-li active" : "title-li"} key={index} onClick={this.mapUnderline.bind(this, item)}>
                        {
                          item.id === 2 ? <a href="#message">{item.name + ' ' + this.handleNumCount(item.id)} </a> : item.name + ' ' + this.handleNumCount(item.id)
                        }
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className="pbottom-content">
            {
              this.props.projectinfo.isShowUpdateInfo && <UpdateInfo {...this.props} />
            }
            {
              !this.props.projectinfo.isShowUpdateInfo && (
                <>
                {
                  (this.props.projectinfo.menuNum === 1||this.props.projectinfo.menuNum===2||this.props.projectinfo.menuNum===3) && (
                    <>
                    <div className="pbottom-left">
                    {
                      (this.props.projectinfo.menuNum === 1||this.props.projectinfo.menuNum===2) && <ProjectDetail {...this.props} />
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
                  {
                    this.props.projectinfo.menuNum===4 && <Transation {...this.props}/>
                  }
                   {
                    this.props.projectinfo.menuNum===5 && <Manager {...this.props}/>
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
  private mapUnderline = (item) => {
    window.scrollTo(0,500);
    this.props.projectinfo.menuNum = item.id;
    this.props.projectinfo.isShowUpdateInfo = false;
    this.props.projectinfo.updateId = '';
    if (item.id === 2) {
      // todo
      window.location.hash = 'message'
    }
  }
  private handleNumCount = (id: number) => {
    if (id === 2) {
      return this.props.projectinfo.projInfo ? this.props.projectinfo.projInfo.discussCount : '';
    }
    if (id === 3) {
      return this.props.projectinfo.projInfo ? this.props.projectinfo.projInfo.updateCount : '';
    } else {
      return ''
    }
  }
  private onScrollFn(refTop: number) {
    const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollTop >= refTop) {
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
