/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IMolochoInfoProps } from '../interface/MolochoInfo.interface';
import * as formatTime from 'utils/formatTime';
import { IProjectUpdate } from '../interface/update.interface';

@observer
class MolochoProjectUpdate extends React.Component<IMolochoInfoProps, any> {
    public intrl = this.props.intl.messages;
    public componentDidMount()
    {
        this.props.update.getUpdateData();
    }
    public render()
    {
        return (
            <div className="updatelist-wrapper">            
                {
                    this.props.update.projUpdateList.length > 0 
                    ? this.props.update.projUpdateList.map((item: IProjectUpdate, index: number) =>
                    {
                        return (
                            <div className="updatelist-list" onClick={this.handleToInfo.bind(this, item)} key={index}>
                                <h3 className="title-h3">{item.updateTitle}</h3>
                                <div className="updatelist-p" dangerouslySetInnerHTML={{ '__html': item.updateDetail }} />
                                {/* <p className="updatelist-p">{item.updateDetail}</p> */}
                                <span className="time-tips">{formatTime.format('MM/dd', item.lastUpdateTime.toString(), this.props.intl.locale)}</span>
                                <div className="right-other">
                                    <span>{this.intrl.projinfo.comments}：{item.discussCount}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span>{this.intrl.projinfo.zan}：{item.zanCount}</span>
                                </div>
                            </div>
                        )
                    })
                    :<div className="no-update">{this.intrl.projinfo.noupdate}</div>
                }
            </div>
        );
    }
    private handleToInfo = (item: IProjectUpdate) =>
    {
        this.props.projectinfo.isShowUpdateInfo = true;
        this.props.update.updateId = item.updateId;
    }
}

export default injectIntl(MolochoProjectUpdate);
