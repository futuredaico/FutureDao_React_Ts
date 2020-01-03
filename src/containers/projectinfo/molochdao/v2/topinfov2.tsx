/**
 * 项目详情页，上半部分
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps } from '../interface/molochinfo.interface';
import { saveDecimal } from '@/utils/numberTool';

@observer
class TopInfoV2 extends React.Component<IMolochInfoProps> {
    public intrl = this.props.intl.messages;
    public render()
    {
        if (!this.props.molochinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="ptop-right ptopv2-right">
                <div className="going-wrapper">
                    <div className="going-line">
                        <div className="going-gray">{this.intrl.projinfo.asset}</div>
                        <div className="going-purple">
                            <strong className="purple-big">{parseFloat(saveDecimal(this.props.molochinfo.projInfo.fundTotal, 6))} {this.props.molochinfo.projInfo.fundSymbol.toLocaleUpperCase()}</strong>
                            <br />
                            <strong className="purple-big">12345678.1234 ETH</strong><br />
                            <strong className="purple-big">12345 ETH</strong>
                            <div className="show-all">
                                <span>全部</span>
                                <span className="trage" />
                            </div>
                        </div>
                    </div>
                    <div className="going-line">
                        <div className="going-gray">{this.intrl.projinfo.total}</div>
                        <div className="going-normal">
                            <strong>{this.props.molochinfo.projInfo.shares}</strong>
                        </div>
                    </div>
                    <div className="going-line">
                        <div className="going-gray">{this.intrl.projinfo.every}</div>
                        <div className="going-normal">
                            <strong>≈ $ {parseFloat(saveDecimal(this.props.molochinfo.projInfo.valuePerShare, 6))}</strong>
                            <div className="everyshare-box">
                                <p>11.111 Eth</p>
                                <p>11.111 Eth</p>
                                <p>11.111 Eth</p>
                            </div>
                        </div>
                    </div>
                    {
                        this.props.molochinfo.projInfo.officailWeb && (
                            <div className="going-line">
                                <div className="going-gray">{this.intrl.projinfo.website}</div>
                                <a className="weblink-purple" target="_blank" href={this.props.molochinfo.projInfo.officailWeb}>{this.props.molochinfo.projInfo.officailWeb}</a>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        );
    }
}
export default injectIntl(TopInfoV2)