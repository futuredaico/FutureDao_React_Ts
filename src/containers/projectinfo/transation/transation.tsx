/**
 * 项目交易
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
// import Toast from '@/components/Toast';
import RightTable from './transright';
// import * as formatTime from '@/utils/formatTime';
import { IProjectInfoProps } from '../interface/projectinfo.interface';
import Hint from '@/components/hint';
@observer
class ProjectTransation extends React.Component<IProjectInfoProps, any> {
    public state = {
        underPrice: 4,
        underBottom: 1,
        timeType: 1
    }
    public timeOption = [
        {
            id: 1,
            name: '1月'
        },
        {
            id: 2,
            name: '1周'
        }
    ]
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
    public componentDidMount()
    {
        this.props.transation.getProjContractInfoData();
    }
    public render()
    {
        return (
            <div className="transation-wrapper">
                {
                    this.props.transation.projContractInfo && (
                        <div className="contract-info">
                            <h3 className="title-h3">合约详情</h3>
                            <div className="three-row">
                                <span className="block-span"><span title="">项目代币名称：</span><strong>{this.props.transation.projContractInfo.tokenName.toLocaleUpperCase()}</strong></span>
                                <span className="block-span"><span title="智能合约已发行的可流通代币数量，不包含锁仓中的团队预留代币。购买代币会增加已发行数量，出售代币会减少已发行数量。"> 已发行数量：</span><strong>{this.props.transation.projContractInfo.tokenIssueTotal}</strong></span>
                                <span className="block-span"><span title="已锁仓的，项目团队在代币发售之前预先生成的代币。锁仓代币无法出售，但可以进行提案投票。">团队预留代币（锁仓）：</span><strong>{this.props.transation.projContractInfo.tokenUnlockNotAmount}</strong></span>
                                <span className="block-span"><span title="已解锁的，项目团队在代币发售之前预先生成的代币。已解锁代币可以出售，可以提案投票。">团队预留代币（已解锁）：</span><strong>{this.props.transation.projContractInfo.tokenUnlockYesAmount}</strong></span>
                                <span className="block-span"><span title="用来支持项目发展的资金，代币持有人可以通过提案投票决定资金用途。">治理池资金：</span><strong>{this.props.transation.projContractInfo.fundManagePoolTotal} {this.props.transation.projContractInfo.tokenName.toLocaleUpperCase()}</strong></span>
                                <span className="block-span"><span title="智能合约用来回购已发行代币的可用资金总量">储备池资金：</span><strong>{this.props.transation.projContractInfo.fundReservePoolTotal} {this.props.transation.projContractInfo.tokenName.toLocaleUpperCase()}</strong></span>
                                <span className="block-span"><span title="购买代币所花费的资金，其中一定比例会被智能合约储存起来当作回购代币的储备金。">储备比例：</span><strong>{this.props.transation.projContractInfo.fundReserveRatio}%</strong></span>
                                <span className="block-span"><span title="智能合约每多发行一个代币，发行下一个代币的价格会增涨一些。">价格增速：</span><strong>{this.props.transation.projContractInfo.priceRaiseSpeed} {this.props.transation.projContractInfo.tokenName.toLocaleUpperCase()}</strong></span>
                            </div>
                        </div>
                    )
                }
                
                <div className="trans-top">
                    <div className="trans-price">
                        <h3 className="title-h3">历史价格</h3>
                        <div className="right-toggle">
                            <ul className="title-ul">
                                {
                                    this.timeOption.map((item, index) =>
                                    {
                                        return (
                                            <li className={this.state.timeType === item.id ? "title-li active" : "title-li"} key={index} onClick={this.handleTimeChoice.bind(this, item)}>
                                                {item.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
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
                                        <li className={this.state.underBottom === item.id ? "title-li active" : "title-li"} key={index} onClick={this.handleHistoryType.bind(this, item)}>
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
                                <span className="li-th">资金</span>
                                <span className="li-th">代币数</span>
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
                                <span className="li-td">
                                    买入失败
                                    <Hint
                                        text="如果多个用户同时发起交易，会导致交易价格在短期内发生变化。当交易确认时与交易发出时的价差超过2%时，交易将被拒绝，资金会被退还。"
                                        hintType="right-hint"
                                    />
                                </span>
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
    private handleHistoryType = (item) =>
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
    private handleTimeChoice = (item) =>
    {
        this.setState({
            timeType: item.id
        })
    }
}

export default injectIntl(ProjectTransation);
