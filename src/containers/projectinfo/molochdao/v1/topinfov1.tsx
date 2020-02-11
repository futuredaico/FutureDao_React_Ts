/**
 * 项目详情页,上半部分
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps } from '../interface/molochinfo.interface';
// import { saveDecimal } from '@/utils/numberTool';
// import { toMyNumber, toNonExponential } from '@/utils/numberTool';
// import { when } from 'mobx';

@observer
class TopInfoV1 extends React.Component<IMolochInfoProps> {
    public intrl = this.props.intl.messages;
    // public componentDidMount()
    // {
    //     when(
    //         () => !!this.props.molochinfo.fundTotalList,
    //         () => this.computeEachShares()
    //     )
    // }
    public render()
    {
        if (!this.props.molochinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="ptop-right">
                <div className="topright-wrapper">
                    <div className="des-wrapper">
                        <strong className="title-strong">简介</strong>
                        <p className="gray-content">{this.props.molochinfo.projInfo.projBrief}</p>
                    </div>
                    <div className="other-wrapper">
                        <strong className="title-strong">版本信息</strong>
                        <p className="gray-content">{this.props.molochinfo.projInfo.projType==='moloch'?"MolochDao":"FutureDao"} {this.props.molochinfo.projInfo.projVersion}</p>
                        <div className="address-content">
                            <div className="flex-con">
                                <strong className="title-strong">合约地址</strong>
                                <strong className="purple-content">{this.props.molochinfo.projInfo.contractHash.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</strong>
                            </div>
                            <div className="flex-con">
                                <strong className="title-strong">DAO创建者</strong>
                                <strong className="purple-content">{this.props.molochinfo.projInfo.summonerAddress.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</strong>
                            </div>
                        </div>
                        <strong className="title-strong">官方网站</strong>
                            {
                                this.props.molochinfo.projInfo.officailWeb?<a className="weblink-purple" target="_blank" href={this.props.molochinfo.projInfo.officailWeb}>{this.props.molochinfo.projInfo.officailWeb}{this.props.molochinfo.projInfo.officailWeb}</a>
                                :<p className="gray-content">暂无</p>
                            }
                    </div>
               </div>
            </div>
        );
    }
    // private computeEachShares = () =>
    // {
    //     if (this.props.molochinfo.projInfo)
    //     {
    //         if (this.props.molochinfo.fundTotalList)
    //         {
    //             this.props.molochinfo.projInfo.valuePerShare = toNonExponential(toMyNumber(this.props.molochinfo.fundTotalList.list[0].fundTotal).div(this.props.molochinfo.projInfo.shares).value)
    //         } else
    //         {
    //             this.props.molochinfo.projInfo.valuePerShare = '0'
    //         }
    //     }
    // }
}
export default injectIntl(TopInfoV1)