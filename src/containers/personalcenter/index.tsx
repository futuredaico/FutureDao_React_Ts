/**
 * 个人中心
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import PersonEdit from './personedit';
import MyProject from './myproject';

@observer
class PersonalCenter extends React.Component<any, any> {
    public menuList = [
        {
            key: 1,
            name: "个人资料",
        },
        {
            key: 2,
            name: "我的项目"
        },
        {
            key: 3,
            name: "身份认证"
        }
    ]
    public state = {
        personalMenu: 1
    }
    public render()
    {
        return (
            <div className="personal-page">
                <div className="personal-content">
                    <div className="personal-left-menu">
                    <div className="left-menu-title">
                        <h2 className="h2-title">个人中心</h2>                        
                    </div>
                    <div className="left-menu-list">
                        <ul className="menu-list-ul">
                            {
                                this.menuList.map((item, index) =>
                                {
                                    return (
                                        <li className={this.state.personalMenu === item.key ? "menu-li li-active" : "menu-li"} key={index} onClick={this.mapUnderline.bind(this, item)}>
                                            {item.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="right-content">
                    {
                        this.state.personalMenu === 1 && <PersonEdit {...this.props} />
                    }
                    {
                        this.state.personalMenu === 2 && <MyProject {...this.props} />
                    }
                </div>
                </div>
                
            </div>
        );
    }
    // 菜单选择
    private mapUnderline = (item) =>
    {
        this.setState({
            personalMenu:item.key
        })
    }
}

export default injectIntl(PersonalCenter);
