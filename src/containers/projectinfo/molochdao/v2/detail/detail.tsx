/**
 * 项目详情页的详情模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import Message from '../../message/detailmessage';
import { IMolochInfoProps } from '../../interface/molochinfo.interface';

@observer
class MolochDetail extends React.Component<IMolochInfoProps> {
    public intrl = this.props.intl.messages;

    public render()
    {
        if (!this.props.molochinfo.projInfo)
        {
            return null;
        }
        return (
            <>
            {
                console.log(this.props.molochinfo.projInfo)
            }
                <div className="projectdetail-wrapper">
                    <h3 className="title-h3">{this.intrl.projinfo.info}</h3>
                    <div className="contract-projectinfo">
                        <p>合约地址：{this.props.molochinfo.projInfo.contractHash}</p>
                        <p>创建者：{this.props.molochinfo.projInfo.summonerAddress}</p>
                    </div>
                    {
                        this.props.molochinfo.projInfo.projDetail ? <div className="detail-p" dangerouslySetInnerHTML={{ '__html': this.props.molochinfo.projInfo.projDetail }} /> : <div className="detail-p">暂无详情</div>
                    }
                </div>
                <Message {...this.props} />
            </>
        )
    }
}

export default injectIntl(MolochDetail);
