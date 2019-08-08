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
import UpdateInfo from './updateinfo'
import { IProjectInfoProps } from './interface/projectinfo.interface';
import classnames from 'classnames'

@observer
class Pbottom extends React.Component<IProjectInfoProps, { fixed: boolean }> {
  public state = {
    fixed: false
  }
  private menuOne = [
    {
      id: 1,
      name: '项目详情'
    },
    {
      id: 2,
      name: '留言 233'
    },
    {
      id: 3,
      name: '更新'
    }
  ]
  private pBottomTitle: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    // console.log(this.pBottomTitle.current);
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
          <div className={classnames('pbottom-title', { fixed: this.state.fixed })} ref={this.pBottomTitle}>
            <ul className="title-ul">
              {
                this.menuOne.map((item, index) => {
                  return (
                    <li className={this.props.projectinfo.menuNum === item.id ? "title-li active" : "title-li"} key={index} onClick={this.mapUnderline.bind(this, item)}>
                      {
                        item.id === 2 ? <a href="#message">{item.name}</a> : item.name+' ' +this.handleNumCount(item.id)
                      }
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="pbottom-content">
            {
              this.props.projectinfo.isShowUpdateInfo && <UpdateInfo {...this.props} />
            }
            {
              !this.props.projectinfo.isShowUpdateInfo && (
                <>
                  <div className="pbottom-left">
                    {
                      this.props.projectinfo.menuNum !== 3 && <ProjectDetail {...this.props} />
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

          </div>
        </div>

      </div>
    );
  }
  // 菜单选择
  private mapUnderline = (item) => {

    if (item.id === 2) {
      // todo
      window.location.hash = 'message'
    }
    this.props.projectinfo.menuNum = item.id
  }
  private handleNumCount = (id:number)=>{
    if(id===3){
      return this.props.projectinfo.projUpdateCount
    }else{
      return ''
    }
  }
  private onScrollFn(refTop: number) {
    // console.log(refTop);
    const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(currentScrollTop);
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
