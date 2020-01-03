/**
 * 项目详情页,上半部分
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps } from '../interface/molochinfo.interface';
import { saveDecimal } from '@/utils/numberTool';

@observer
class TopInfoV1 extends React.Component<IMolochInfoProps> {
    public intrl = this.props.intl.messages;

    public render()
    {
        if (!this.props.molochinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="ptop-right">
                <div className="going-wrapper">
                    <div className="going-line">
                        <div className="going-purple">
                            <strong className="purple-big">{parseFloat(saveDecimal(this.props.molochinfo.projInfo.fundTotal, 6))}</strong><strong className="purple-sm"> {this.props.molochinfo.projInfo.fundSymbol.toLocaleUpperCase()}</strong>
                        </div>
                        <div className="going-gray">{this.intrl.projinfo.asset}</div>
                    </div>
                    <div className="going-line">
                        <div className="going-normal">
                            <strong>{this.props.molochinfo.projInfo.shares}</strong>
                        </div>
                        <div className="going-gray">{this.intrl.projinfo.total}</div>
                    </div>
                    <div className="going-line">
                        <div className="going-normal">
                            <strong>{parseFloat(saveDecimal(this.props.molochinfo.projInfo.valuePerShare, 6))}</strong>
                        </div>
                        <div className="going-gray">{this.intrl.projinfo.every}</div>
                    </div>
                </div>
                {
                    this.props.molochinfo.projInfo.officailWeb && (
                        <div className="ptop-weblink">
                            <a className="weblink-purple" target="_blank" href={this.props.molochinfo.projInfo.officailWeb}>{this.props.molochinfo.projInfo.officailWeb}</a>
                            <p className="gray-str">{this.intrl.projinfo.website}</p>
                        </div>
                    )
                }
            </div>
        );
    }
}
export default injectIntl(TopInfoV1)