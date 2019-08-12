/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { IProjectInfoProps, IProjectUpdate } from './interface/projectinfo.interface';
import * as formatTime from 'utils/formatTime';

@observer
class UpdateList extends React.Component<IProjectInfoProps, any> {
    public componentDidMount()
    {
        this.props.projectinfo.getUpdateData();
    }
    public render()
    {
        return (
            <div className="updatelist-wrapper">
                {
                    this.props.projectinfo.projUpdateList.length > 0 && this.props.projectinfo.projUpdateList.map((item: IProjectUpdate, index: number) =>
                    {
                        return (
                            <div className="updatelist-list" onClick={this.handleToInfo.bind(this, item)} key={index}>
                                <h3>{item.updateTitle}</h3>
                                <div className="updatelist-p" dangerouslySetInnerHTML={{'__html': item.updateDetail}} />
                                {/* <p className="updatelist-p">{item.updateDetail}</p> */}
                                <span className="time-tips">{formatTime.format('MM/dd', item.lastUpdateTime.toString(), this.props.intl.locale)}</span>
                                <div className="right-other">
                                    <span>评论：{item.discussCount}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span>赞：{item.zanCount}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
    private handleToInfo = (item: IProjectUpdate) =>
    {
        this.props.projectinfo.isShowUpdateInfo = true;
        this.props.projectinfo.updateId = item.updateId;
    }
}

export default injectIntl(UpdateList);
