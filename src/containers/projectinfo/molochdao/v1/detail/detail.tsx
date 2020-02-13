/**
 * 项目详情页的详情模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps } from '../../interface/molochinfo.interface';
import Message from '../../message/detailmessage';

@observer
class MolochDetail extends React.Component<IMolochInfoProps> {
    public intrl = this.props.intl.messages;
    public render()
    {
        return (
            <>
                <div className="projectdetail-wrapper">
                    <h3 className="title-h3">{this.intrl.projinfo.info}</h3>
                    {
                        (this.props.molochinfo.projInfo&&this.props.molochinfo.projInfo.projDetail) ? <div className="detail-p" dangerouslySetInnerHTML={{ '__html': this.props.molochinfo.projInfo.projDetail }} /> : <div className="detail-p">{this.intrl.projinfo.null}</div>
                    }
                </div>
                <Message {...this.props} />
            </>
        )
    }
}

export default injectIntl(MolochDetail);
