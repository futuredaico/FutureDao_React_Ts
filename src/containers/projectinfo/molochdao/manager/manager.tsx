/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Card from '@/components/card';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../interface/molochinfo.interface';
interface IState
{
    showListType: number
}

@observer
class MolochManager extends React.Component<IMolochInfoProps, IState> {
    public state: IState = {
        showListType: 1
    }
    public render()
    {
        return (
            <div className="manager-wrapper">
                <div className="manager-left">
                    <div className="manager-list-type">
                        <ul className="title-ul">
                            <li className={this.state.showListType === 1 ? "title-li active" : "title-li"} onClick={this.handleShowListType.bind(this, 1)}>
                                正式提案
                            </li>
                            <li className={this.state.showListType === 2 ? "title-li active" : "title-li"} onClick={this.handleShowListType.bind(this, 2)}>
                                预发布提案<span className="sm-graytime">（4小时30分钟后可用）</span>
                            </li>
                        </ul>
                    </div>
                    <div className="manager-list" onClick={this.handleToInfo}>
                        <div className="mcontent-top">
                            <div className="mcontent-title">
                                <Card text="未投票" colortype="c-purple" cardsize="sm-card" />
                                <Card text="已投票" colortype="block-gray" cardsize="sm-card" />
                                <strong className="mtitle">FableWood Returns - The 5 New Magnetic  Woo--den Animals!FableWood Returns - The 5 New Magnetic  Woo--den Animals!</strong>
                            </div>
                            {/* <Card text="已通过" colortype="transparent-green" cardsize="md-sm-card" /> */}
                            {/* <Card text="已通过" colortype="transparent-red" cardsize="md-sm-card" /> */}
                            <div className="transparent-toupiao">
                                <span className="big-text">投票中</span>&nbsp;&nbsp;
                                <span className="sm-text">剩余 8d12h12m12s</span>
                            </div>
                        </div>
                        <div className="mcontent-down">
                            <div className="mcontent-count">
                                <span>要求 </span>
                                <strong className="count-right">1000 股</strong>
                                <span>贡献 </span>
                                <strong>1000 DAI</strong>
                            </div>
                            <div className="manager-votebox">
                                <div className="green-sai" style={{ "width": 60 + "%" }} />
                                <div className="red-sai" style={{ "width": 40 + "%" }} />
                                <span className="left-top">赞同：1135</span>
                                <span className="right-top">反对：447</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="manager-right">
                    <Button text="发起预发布提案" btnSize="bg-bg-btn" onClick={this.handleToProposal} />
                    <h3 className="title-h3">退出</h3>
                    <div className="exit-wrapper">
                        <div className="exit-line">
                            <div className="exit-left">我的股数</div>
                            <div className="exit-right">
                                <input type="text" className="normal-exit-input readonly-input" readOnly={true} />
                                {/* <span className="asset-text">kk</span> */}
                            </div>
                        </div>
                        <div className="exit-line">
                            <div className="exit-left">退出股数</div>
                            <div className="exit-right">
                                <input type="text" className="normal-exit-input" />
                                {/* <span className="asset-text">ddd</span> */}
                                <span className="amount-text">价值：10 ETH</span>
                            </div>
                        </div>
                        <div className="doing-btn">
                            <Button text="立即退出" btnSize="buy-btn" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // 选择查看什么类型的提案
    private handleShowListType = (num: number) =>
    {
        this.setState({
            showListType: num
        })
    }
    private handleToProposal = () =>
    {
        this.props.history.push('/molochproposal/' + this.props.molochinfo.projId)
    }
    private handleToInfo = () =>
    {
        this.props.molochinfo.isShowManagerInfo = true;
    }
    /**
     * 要修改数据
     */
    // private handleToOpenManager = (index: number) =>
    // {
    //     console.log("index", index);

    //     window.open(`/projectmanager/?hash=${molochinfoStore.voteHash}&index=${index}`)
    // }
    // private computePercentage = (item: IManagerTxList, type: boolean) =>
    // {
    //     const total = item.voteYesCount + item.voteNotCount;
    //     if (total === 0)
    //     {
    //         return 50;
    //     }
    //     else
    //     {
    //         // 支持
    //         if (type)
    //         {
    //             const percent = parseInt((item.voteYesCount / total * 100).toString(), 10)
    //             return percent
    //         }// 反对
    //         else
    //         {
    //             const percent = parseInt((item.voteNotCount / total * 100).toString(), 10)
    //             return percent
    //         }
    //     }
    // }
}

export default injectIntl(MolochManager);
