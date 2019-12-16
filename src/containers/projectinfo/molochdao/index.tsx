/**
 * 项目详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Pbottom from './pbottom';
import { IMolochInfoProps } from './interface/molochinfo.interface';
import { saveDecimal } from '@/utils/numberTool';

interface IState
{
    isShowVideo: boolean
}
@inject('molochinfo', 'common', 'teemowallet', 'metamaskwallet','molochmanager')
@observer
class MolochInfo extends React.Component<IMolochInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isShowVideo: false
    }
    public componentDidMount()
    {
        const projectId = this.props.match.params.projectId;
        this.props.molochinfo.projId = projectId;
        if (projectId)
        {
            this.props.molochinfo.getMolochProjInfo(projectId);
        }
    }
    public componentWillUnmount()
    {
        this.props.molochinfo.projId = '';
        this.props.molochinfo.menuNum = 1;
        this.props.molochinfo.isShowUpdateInfo = false;
        this.props.molochinfo.projInfo = null;
    }
    public render()
    {
        if (!this.props.molochinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="molochinfo-page">
                <div className="project-top">
                    <h2>{this.props.molochinfo.projInfo.projName}</h2>
                    <p className="title-p">{this.props.molochinfo.projInfo.projBrief}</p>
                    <div className="img-data">
                        <div className="ptop-left">
                            <div className="ptop-img">
                                {
                                    this.props.molochinfo.projInfo.projCoverUrl ? <img src={this.props.molochinfo.projInfo.projCoverUrl} alt="" />:<img src={require("@/img/projdefault.png")} alt="" />
                                }
                                {/* {
                                    this.state.isShowVideo ? <video src={this.props.molochinfo.projInfo.projVideoUrl} controls={true} autoPlay={true} />
                                        : 
                                }
                                {
                                    (this.props.molochinfo.projInfo.projVideoUrl && !this.state.isShowVideo) && <div className="play-btn" onClick={this.handlePlayVideo} />
                                } */}
                            </div>
                        </div>
                        <div className="ptop-right">
                            <div className="going-wrapper">
                                <div className="going-line">
                                    <div className="going-purple">
                                        <strong className="purple-big">{saveDecimal(this.props.molochinfo.projInfo.fundTotal, 6)}</strong><strong className="purple-sm"> {this.props.molochinfo.projInfo.fundSymbol.toLocaleUpperCase()}</strong>
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
                                        <strong>{this.props.molochinfo.projInfo.valuePerShare}</strong>
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
                    </div>

                </div>
                <Pbottom {...this.props} />
            </div >
        );
    }
}
export default injectIntl(MolochInfo)