/**
 * 项目详情页，上半部分
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps } from '../interface/molochinfo.interface';


interface IState {
    showAllAsset: boolean
}

@observer
class TopInfoV2 extends React.Component<IMolochInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        showAllAsset: false
    }
    public render() {
        if (!this.props.molochinfo.projInfo) {
            return null;
        }
        // const listClassName = classnames('going-purple', { 'show-list-asset': this.state.showAllAsset })
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
}
export default injectIntl(TopInfoV2)