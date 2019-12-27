/**
 * 个人中心
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { renderRoutes } from 'react-router-config';
import './index.less';
import { injectIntl } from 'react-intl';
import { History } from 'history';
import { IMyOrderStore } from './interface/myorder.interface';
interface IProps
{
    route: {
        [key: string]: any
    };
    history: History,
    intl: any,
    myorder: IMyOrderStore
}
@inject('myorder')
@observer
class PersonalCenter extends React.Component<IProps, any> {
    public intrl = this.props.intl.messages;
    public render()
    {
        return (
            <div className="personal-page">
                <div className="personal-content">
                    <div className="personal-left-menu">
                        <div className="left-menu-title">
                            <h2 className="h2-title">{this.intrl.user.center}</h2>
                        </div>
                        <div className="left-menu-list">
                            <ul className="menu-list-ul">
                                <li className={this.mapChildClick('/personalcenter/userinfo') ? "menu-li li-active" : "menu-li"} onClick={this.mapUnderline.bind(this, '/personalcenter/userinfo')}>
                                    {this.intrl.user.info}
                                </li>
                                {/* <li className={this.mapChildClick('/personalcenter/myproject') ? "menu-li li-active" : "menu-li"} onClick={this.mapUnderline.bind(this, '/personalcenter/myproject')}>
                                    {this.intrl.myproject.project}
                                </li> */}
                                {/* <li className="menu-li">
                                身份认证
                                </li> */}
                                {/* <li className={this.mapChildClick('/personalcenter/myorder') ? "menu-li li-active" : "menu-li"} onClick={this.mapUnderline.bind(this, '/personalcenter/myorder')}>我的订单</li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="right-content">
                        {
                            renderRoutes(this.props.route.children)
                        }
                    </div>
                </div>

            </div>
        );
    }
    // 菜单选择
    private mapUnderline = (str: string) =>
    {
        this.props.myorder.isShowInfo = false;
        this.props.myorder.orderPage = 1;
        
        if(str === '/personalcenter/myorder'){
            const pathname = this.props.history.location.pathname;
            if(pathname.includes('/personalcenter/myorder')){
                console.log(2)
                this.props.myorder.getMyOrderList();
            }else{
                this.props.history.push(str);
            } 
        }
        else{
            this.props.history.push(str);
        }        
    }
    // 菜单选择样式
    private mapChildClick = (path) =>
    {
        if (path instanceof Array)
        {
            for (const i in path)
            {
                if (new RegExp(path[i], 'i').test(this.props.history.location.pathname))
                {
                    return true;
                }
            }
        }
        if (path === this.props.history.location.pathname)
        {
            return true;
        }
        return false;
    }
}

export default injectIntl(PersonalCenter);
