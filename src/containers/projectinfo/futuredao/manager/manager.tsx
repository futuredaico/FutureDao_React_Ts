/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Card from '@/components/card';
import Button from '@/components/Button';
import { IProjectInfoProps } from '../interface/projectinfo.interface';

@observer
class Manager extends React.Component<IProjectInfoProps, any> {
    public render()
    {
        return (
            <div className="manager-wrapper">
                <div className="manager-left">
                    <div className="manager-list" onClick={this.handleToInfo}>
                        <div className="mcontent-top">
                            <div className="mcontent-title">
                                <Card text="已投票" colortype="block-gray" cardsize="sm-card" />
                                <strong className="mtitle">FableWood Returns - The 5 New Magnetic  Woo--den Animals!FableWood Returns - The 5 New Magnetic  Woo--den Animals!</strong>
                            </div>
                            {/* <Card text="已通过" colortype="transparent-green" cardsize="md-sm-card" /> */}
                            <div className="transparent-toupiao">
                                <span className="big-text">投票中</span>&nbsp;&nbsp;
                                <span className="sm-text">剩余 8d12h12m12s</span>
                            </div>
                        </div>
                        <div className="mcontent-down">
                            <div className="mcontent-people">
                                <img src={require("@/img/default.png")} className="mpeople-img" alt="" />
                                <span>某某某某</span>
                            </div>
                            {/* <div className="start-time">
                                <span className="time-text">2019-08-08 12:12:12 开始执行</span>
                                <br/>                              
                                <span className="sm-complete">（ 1/30已完成 ）</span>
                            </div> */}
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
                    <div className="govern-price">
                        <span>治理池资金</span>
                        <span className="purple-price">145 ETH</span>
                    </div>
                    <Button text="发起提案" btnSize="bg-bg-btn" onClick={this.handleToProposal} />
                    <div className="manager-des">
                        <strong>提案是什么</strong>
                        <p>提案是社区成员进行自治的方式。</p>
                        <p>提案内容包括对项目资金的使用，以及清退项目资金。</p>
                        <p>所有代币持有者都可以通过投票的方式同意或拒绝一项提案。最终结果由多数票决定。</p>
                        <p>提案会在智能合约上运行，以保证投票的公正性。</p>
                        <strong className="top-mar">谁可以发起提案</strong>
                        <p>项目代币持有者可以花费0.01ETH发起提案，发起提案需要额外锁仓1ETH，锁仓费用将在提案投票结束后退还。</p>
                        <p>发提案前请与社区提前沟通好，以避免无人响应提案被拒。</p>
                        <p>每个项目每天可以发起5个提案。如果当天已有5个提案被提出，您将无法发起提案。</p>
                    </div>
                </div>
            </div>
        );
    }
    private handleToProposal = () => {
        this.props.history.push('/fproposal/menu/'+this.props.projectinfo.projId)
    }
    private handleToInfo = () => {
        this.props.projectinfo.isShowManagerInfo = true;
    }
    /**
     * 要修改数据
     */
    // private handleToOpenManager = (index: number) =>
    // {
    //     console.log("index", index);

    //     window.open(`/projectmanager/?hash=${projectinfoStore.voteHash}&index=${index}`)
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

export default injectIntl(Manager);
