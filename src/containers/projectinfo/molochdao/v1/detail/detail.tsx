/**
 * 项目详情页的详情模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps } from '../../interface/molochinfo.interface';
import Message from '../../message/detailmessage';
import * as formatTime from 'utils/formatTime';

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
                <div className="updatedetail-wrapper" title="修改DAO信息" onClick={this.handleGoUpdate}>
                    <span>编辑于 {formatTime.format('yyyy-MM-dd hh:mm:ss', this.props.molochinfo.updateTime.toString(), this.props.intl.locale)}&nbsp;&nbsp;&nbsp;&nbsp;由{this.props.molochinfo.updatePeople}</span>
                </div>
                <Message {...this.props} />
            </>
        )
    }
    // 修改信息
    private handleGoUpdate = ()=>{
        this.props.history.push('/update/' + this.props.molochinfo.projId)
    }
}

export default injectIntl(MolochDetail);
