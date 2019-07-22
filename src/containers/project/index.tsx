/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import CreateProject from './createproject';
import UpdateProject from './updateproject';
import { IProjectProps } from './interface/project.interface';

@inject('project', 'createproject')
@observer
class Project extends React.Component<IProjectProps, any> {
    public menuList = [
        {
            key: 1,
            name: "编辑项目资料",
        },
        {
            key: 2,
            name: "发布更新"
        },
        {
            key: 3,
            name: "启动融资"
        },
        {
            key: 4,
            name: "删除项目"
        },
    ]
    public render()
    {
        return (
            <div className="create-page">
                {this.props.createproject.step !== 1 && (
                    <div className="create-left-menu">
                        <div className="left-menu-title">
                            <h2 className="h2-title">我是项目名称</h2>
                            <img src={require("@/img/back.png")} alt="" className="back-img" />
                        </div>
                        <div className="left-menu-list">
                            <ul className="menu-list-ul">
                                {
                                    this.menuList.map((item, index) =>
                                    {
                                        return (
                                            <li className={this.props.project.menuNum === item.key ? "menu-li li-active" : "menu-li"} key={index} onClick={this.mapUnderline.bind(this, item)}>
                                                {item.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                )
                }
                <div className="right-content">
                    {
                        this.props.project.menuNum === 1 && <CreateProject {...this.props} />
                    }
                    {
                        this.props.project.menuNum === 2 && <UpdateProject {...this.props} />
                    }
                </div>
            </div>
        );
    }
    // 菜单选择
    private mapUnderline = (item) =>
    {
        this.props.project.menuNum = item.key
    }
}

export default injectIntl(Project);
