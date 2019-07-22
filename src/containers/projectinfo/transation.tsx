/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import RightTable from './transright';
// import * as formatTime from '@/utils/formatTime';
@observer
class Transation extends React.Component<any, any> {
    public state = {
        underPrice: 4,
        underBottom: 1
    }
    public render()
    {
        return (
            <div className="transation-wrapper">
                <div className="trans-top">
                    <div className="trans-price">
                        <div className="trans-title">
                            <div className="trans-title-left">
                                Price Trend&nbsp;&nbsp;
                            <span className="gray-text">2019-6-17 10:30 Updated</span>
                            </div>
                            <div className="trans-title-right">
                                <ul className="title-ul">
                                    {/* {
                                        this.menuPrice.map((item, index) =>
                                        {
                                            return (
                                                <li className={this.state.underPrice === item.id ? "title-li active" : "title-li"} key={index} onClick={this.mapUnderline.bind(this, item)}>
                                                    {item.name}
                                                </li>
                                            )
                                        })
                                    } */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <RightTable />
                </div>
            </div>
        );
    }
    // 左边菜单选择
    // private mapUnderline = (item) =>
    // {
    //     this.setState({
    //         underPrice: item.id
    //     })
    // }

}

export default injectIntl(Transation);
