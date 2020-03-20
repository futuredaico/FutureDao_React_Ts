/**
 * 项目详情页的详情模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Message from '../../message/detailmessage';
// import * as formatTime from 'utils/formatTime';
import { IProjectInfoProps } from '../../interface/projectinfo.interface';

@observer
class FutureDetail extends React.Component<IProjectInfoProps> {
    public intrl = this.props.intl.messages;
    public render() {
        return (
            <>
                <div className="projectdetail-wrapper">
                    <h3 className="title-h3">{this.intrl.projinfo.info}</h3>
                    {
                        (this.props.projectinfo.projInfo && this.props.projectinfo.projInfo.projDetail) ? <div className="detail-p" dangerouslySetInnerHTML={{ '__html': this.props.projectinfo.projInfo.projDetail }} /> : <div className="detail-p">{this.intrl.projinfo.null}</div>
                    }
                </div>
                {/* <div className="updatedetail-wrapper" title={this.intrl.projinfo.divtips} onClick={this.handleGoUpdate}>
                    <span>{this.intrl.projinfo.spantips} {formatTime.format('yyyy-MM-dd hh:mm:ss', this.props.projectinfo.updateTime.toString(), this.props.intl.locale)}&nbsp;&nbsp;&nbsp;&nbsp;{this.intrl.projinfo.you}{this.props.projectinfo.updatePeople}</span>
                </div> */}
                <Message {...this.props} />
            </>
        )
    }
    // 修改信息
    // private handleGoUpdate = async () => {
    //     // 验证是否登录
    //     if (!this.props.common.userInfo) {
    //         this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
    //     }
    //     else {
    //         await this.props.molochmanager.getTokenBalance(this.props.projectinfo.projId, this.props.common.userInfo.address);
    //         console.log(this.props.molochmanager.proposalBalance)
    //         if (this.props.molochmanager.proposalBalance <= 0) {
    //             this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.membererr2);
    //         }
    //         else {
    //             this.props.history.push('/update/' + this.props.projectinfo.projId)
    //         }
    //     }
    // }
}

export default injectIntl(FutureDetail);
