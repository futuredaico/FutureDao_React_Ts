/**
 * 项目详情页的详情模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Message from '../../message/detailmessage';
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
                <Message {...this.props} />
            </>
        )
    }
}

export default injectIntl(FutureDetail);
