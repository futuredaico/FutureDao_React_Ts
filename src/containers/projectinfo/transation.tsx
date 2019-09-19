/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
// import Toast from '@/components/Toast';
import RightTable from './transright';
// import * as formatTime from '@/utils/formatTime';
import { IProjectInfoProps } from './interface/projectinfo.interface';
// import projectinfoStore from './store/projectinfo.store';
@observer
class Transation extends React.Component<IProjectInfoProps, any> {
    public state = {
        underPrice: 4,
        underBottom: 1
    }

    public menuBottom = [
        {
            id: 1,
            name: '我的记录'
        },
        {
            id: 2,
            name: '全部记录'
        }
    ]
    public render()
    {
        return (
            <div className="transation-wrapper">
                <div className="trans-top">
                    <div className="trans-price">
                        <h3 className="title-h3">历史价格</h3>
                        <div className="trans-echart">
                            折线图
                        </div>
                    </div>
                    <RightTable />
                </div>
                <div className="trans-Bottom-table">
                    <div className="bottom-title">
                        <ul className="title-ul">
                            {
                                this.menuBottom.map((item, index) =>
                                {
                                    return (
                                        <li className={this.state.underBottom === item.id ? "title-li active" : "title-li"} key={index} onClick={this.mapBottomUnderline.bind(this, item)}>
                                            {item.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="bottom-table">
                        <ul className="table-ul">
                            <li className="table-li-th">
                                <span className="li-th">时间</span>
                                <span className="li-th">交易ID</span>
                                <span className="li-th">区块高度</span>
                                <span className="li-th">操作地址</span>
                                <span className="li-th">操作</span>
                                <span className="li-th">数量</span>
                                <span className="li-th">总股数</span>
                            </li>
                            <li className="table-li-td">
                                <span className="li-td">9-11 11:30</span>
                                <span className="li-td purple-text">0x7f...abf6</span>
                                <span className="li-td">2223333</span>
                                <span className="li-td purple-text">AZ1u...s5Bg</span>
                                <span className="li-td green-text">买入</span>
                                <span className="li-td">2 ETH</span>
                                <span className="li-td green-text">+112</span>
                            </li>
                            <li className="table-li-td">
                                <span className="li-td">6-17 21:21</span>
                                <span className="li-td purple-text">0x7f...abf6</span>
                                <span className="li-td">3829889</span>
                                <span className="li-td purple-text">AZ1u...s5Bg</span>
                                <span className="li-td red-text">卖出</span>
                                <span className="li-td">9900 ETH</span>
                                <span className="li-td red-text">- 1001 </span>
                            </li>
                            <li className="table-li-td">
                                <span className="li-td">6-17 21:21</span>
                                <span className="li-td purple-text">0x7f...abf6</span>
                                <span className="li-td">3829889</span>
                                <span className="li-td purple-text">AZ1u...s5Bg</span>
                                <span className="li-td">利润回购</span>
                                <span className="li-td">9900 ETH</span>
                                <span className="li-td red-text">- 1001 </span>
                            </li>
                        </ul>
                    </div>
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

    // 底部菜单选择
    private mapBottomUnderline = (item) =>
    {
        // if (item.id === 2)
        // {
        //     projectinfoStore.getMyTrades();
        // }
        // else
        // {
        //     projectinfoStore.getProjectTxList()
        // }
        this.setState({
            underBottom: item.id
        })
    }
}

export default injectIntl(Transation);
