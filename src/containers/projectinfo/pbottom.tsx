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

@observer
class Pbottom extends React.Component<IProjectInfoProps, any> {
    public menuOne = [
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
            name: '更新 12'
        }
    ]
    public render()
    {
        return (
            <div className="project-bottom">
                <div className="pbottom-wrapper">
                    <div className="pbottom-title">
                        <ul className="title-ul">
                            {
                                this.menuOne.map((item, index) =>
                                {
                                    return (
                                        <li className={this.props.projectinfo.menuNum === item.id ? "title-li active" : "title-li"} key={index} onClick={this.mapUnderline.bind(this, item)}>
                                            {
                                                item.id === 2 ? <a href="#message">{item.name}</a> : item.name
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
                                        <RightTeam />
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
    private mapUnderline = (item) =>
    {

        if (item.id === 2)
        {
            // todo
            window.location.hash = 'message'
        }
        this.props.projectinfo.menuNum = item.id
    }
}
export default injectIntl(Pbottom);
