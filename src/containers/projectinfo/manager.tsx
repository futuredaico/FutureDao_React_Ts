/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
// import Toast from '@/components/Toast';

@observer
class Manager extends React.Component<any, any> {
    public render()
    {
        return (
            <div className="manager-wrapper">
                <div className="manager-list-wrap" >
                    <div className="manager-left">
                        <div className="manager-title">
                            {/* <h3>{item.proposalName}</h3>
                            <span className="other-text">（ Time Required：{item.timeConsuming} Days ）</span> */}
                        </div>
                        <div className="manager-people">
                            <img src={require('@/img/h4.png')} alt="" className="people-img" />
                            {/* <span className="gray-text">{item.voter}</span> */}
                        </div>
                        <div className="manager-state">
                            <strong className="state-text">Status：</strong>
                            {/* {
                                item.proposalState === 0 && <span className="green-text">Voting</span>
                            }
                            {
                                item.proposalState === 1 && <span className="purple-text">Processing</span>
                            }
                            {
                                (item.proposalState === 2 || item.proposalState === 3) && <span className="gray-text">Completed</span>
                            } */}
                        </div>
                    </div>
                    <div className="manager-right">
                        <div className="manager-number">
                            <span>Amount Of Money Applied：</span><span className="purple-text">8888 ETH</span>
                        </div>
                        <div className="manager-votebox">
                            <div className="green-sai" style={{ "width": 50 + "%" }} />
                            <div className="red-sai" style={{ "width": 50 + "%" }} />
                            <span className="left-top">赞同：1135</span>
                            <span className="right-top">反对：447</span>
                        </div>
                    </div>
                </div>
                {/* <div className="manager-list-wrap">
                    <div className="manager-left">
                        <div className="manager-title">
                            <h3>网站搭建</h3>
                            <span className="other-text">（ 所需时间：15天 ）</span>
                        </div>
                        <div className="manager-people">
                            <img src={require('@/img/h4.png')} alt="" className="people-img"/>
                            <span className="gray-text">Benjamin Vosovic</span>
                        </div>
                        <div className="manager-state">
                            <strong className="state-text">状态：</strong>
                            <span className="gray-text">已完成</span>
                        </div>
                    </div>
                    <div className="manager-right">
                        <div className="manager-number">
                            <span>申请金额：</span><span className="purple-text">10,000 ETH</span>
                        </div>
                        <div className="manager-votebox">
                            <div className="green-sai qian-gray" style={{"width":"20%"}} />
                            <div className="red-sai shen-gray" style={{"width":"80%"}}  />
                            <span className="left-top">支持：19</span>
                            <span className="right-top">反对：1</span>
                        </div>
                    </div>
                </div> */}
            </div>
        );
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
