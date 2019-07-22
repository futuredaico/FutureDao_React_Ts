/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Transation from './transation'
import Manager from './manager';
@observer
class Pbottom extends React.Component<any, any> {
    public state = {
        underLineNum: 2
    }
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
                <div className="pbottom-title">
                    <ul className="title-ul">
                        {
                            this.menuOne.map((item, index) =>
                            {
                                return (
                                    <li className={this.state.underLineNum === item.id ? "title-li active" : "title-li"} key={index} onClick={this.mapUnderline.bind(this, item)}>
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="pbottom-content">
                    {
                        this.state.underLineNum === 2 && <Transation {...this.props} />
                    }
                    {
                        this.state.underLineNum === 3 && <Manager {...this.props}  />
                    }
                </div>
            </div>
        );
    }
    // 菜单选择
    private mapUnderline = (item) =>
    {
        this.setState({
            underLineNum: item.id
        })
    }
}
export default injectIntl(Pbottom);
