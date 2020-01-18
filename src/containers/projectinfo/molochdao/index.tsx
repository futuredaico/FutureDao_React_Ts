/**
 * 项目详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import PbottomV1 from './v1/pbottom';
import PbottomV2 from './v2/pbottom';
import { IMolochInfoProps } from './interface/molochinfo.interface';
import TopRightV1 from './v1/topinfov1';
import TopRightV2 from './v2/topinfov2';

interface IState
{
    isShowVideo: boolean
}
@inject('molochinfo', 'common', 'teemowallet', 'metamaskwallet', 'molochmanager','index')
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
        this.props.molochinfo.isShowManagerInfo = false;
        this.props.molochinfo.projInfo = null;
        this.props.molochmanager.proposalAddress = '';
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
                                    this.props.molochinfo.projInfo.projCoverUrl ? <img src={this.props.molochinfo.projInfo.projCoverUrl} alt="" /> : <img src={require("@/img/projdefault.png")} alt="" />
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
                        {
                            this.props.molochinfo.projInfo.projVersion.includes('1.0') ? <TopRightV1 {...this.props} /> : <TopRightV2 {...this.props} />
                        }
                        {/*  */}

                    </div>
                </div>
                {
                    this.props.molochinfo.projInfo.projVersion.includes('1.0') ? <PbottomV1 {...this.props} /> : <PbottomV2 {...this.props} />
                }
            </div >
        );
    }
}
export default injectIntl(MolochInfo)