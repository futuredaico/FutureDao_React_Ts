/**
 * 项目详情页,上半部分
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps } from '../interface/molochinfo.interface';
import { saveDecimal } from '@/utils/numberTool';
import { toMyNumber, toNonExponential } from '@/utils/numberTool';
import { when } from 'mobx';

@observer
class TopInfoV1 extends React.Component<IMolochInfoProps> {
    public intrl = this.props.intl.messages;
    public componentDidMount(){
        when(
            () => !!this.props.molochinfo.fundTotalList,
            () => this.computeEachShares()
        )        
    }
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
                            <strong className="purple-big">
                                {
                                    this.props.molochinfo.fundTotalList
                                    ? saveDecimal(this.props.molochinfo.fundTotalList.list[0].fundTotal, 4)
                                    : 0
                                }
                            </strong>
                            <strong className="purple-sm"> 
                                {
                                    this.props.molochinfo.fundTotalList
                                    ? this.props.molochinfo.fundTotalList.list[0].fundSymbol.toLocaleUpperCase()
                                    : ''
                                }
                            </strong>
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
                            <strong>{parseFloat(saveDecimal(this.props.molochinfo.projInfo.valuePerShare, 2))}</strong>
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
    private computeEachShares = ()=>{
        if(this.props.molochinfo.projInfo){
            if(this.props.molochinfo.fundTotalList){
                this.props.molochinfo.projInfo.valuePerShare = toNonExponential(toMyNumber(this.props.molochinfo.fundTotalList.list[0].fundTotal).div(this.props.molochinfo.projInfo.shares).value)
            }else{
                this.props.molochinfo.projInfo.valuePerShare = '0'
            }
        }
    }
}
export default injectIntl(TopInfoV1)