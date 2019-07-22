/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';

@observer
class Manager extends React.Component<any, any> {
    public render()
    {
        return (
            <div className="manager-wrapper">

                <div className="manager-list-wrap">
                    <div className="manager-left">
                        <div className="manager-title">
                            {/* <h3>{item.proposalName}</h3> */}
                            {/* <span className="other-text">（ Time Required：{item.timeConsuming} Days ）</span> */}
                        </div>
                        <div className="manager-people">
                            {/* <img src={require('@/img/h4.png')} alt="" className="people-img" /> */}
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
                            {/* <span>Amount Of Money Applied：</span><span className="purple-text">{item.value} ETH</span> */}
                        </div>
                        <div className="manager-votebox">
                            {/* <div className="green-sai" style={{ "width": this.computePercentage(item, true) + "%" }} />
                            <div className="red-sai" style={{ "width": this.computePercentage(item, false) + "%" }} />
                            <span className="left-top">Yes：{item.voteYesCount}</span>
                            <span className="right-top">No：{item.voteNotCount}</span> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }   
}

export default injectIntl(Manager);
