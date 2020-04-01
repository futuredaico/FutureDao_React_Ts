/**
 * 项目详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
// import Pbottom from './pbottom';
import { IProjectInfoProps } from './interface/projectinfo.interface';
import TopRightV1 from './v1/topinfov1';
import TopRightV2 from './v2/topinfov2';
import PbottomV1 from './v1/pbottom';
import PbottomV2 from './v2/pbottom';

interface IState
{
    isShowVideo: boolean
}
@inject('projectinfo', 'common', 'update', 'transation', 'teemowallet', 'metamaskwallet')
@observer
class ProjectInfo extends React.Component<IProjectInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isShowVideo: false
    }
    public componentDidMount()
    {
        const projectId = this.props.match.params.projectId;
        this.props.projectinfo.projId = projectId;
        if (projectId)
        {
            this.props.projectinfo.getProjInfo(projectId);
            // this.props.projectinfo.getContractHash();
        }
    }
    public componentWillUnmount()
    {
        this.props.projectinfo.projId = '';
        this.props.projectinfo.menuNum = 1;
        this.props.projectinfo.isShowUpdateInfo = false;
        this.props.projectinfo.projInfo = null;
    }
    public render()
    {
        if (!this.props.projectinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="projectinfo-page">
                <div className="project-top">
                    <h2>{this.props.projectinfo.projInfo.projTitle}</h2>
                    <div className="ptop-left">
                        <div className="ptop-img">
                            {
                                this.state.isShowVideo ? <video src={this.props.projectinfo.projInfo.projVideoUrl} controls={true} autoPlay={true} />
                                    : <img src={this.props.projectinfo.projInfo.projCoverUrl ? this.props.projectinfo.projInfo.projCoverUrl : "https://futuredao-mainnet.oss-cn-hangzhou.aliyuncs.com/projdefault.png"} alt="" />
                            }
                            {
                                (this.props.projectinfo.projInfo.projVideoUrl && !this.state.isShowVideo) && <div className="play-btn" onClick={this.handlePlayVideo} />
                            }
                        </div>
                    </div>
                    {
                        this.props.projectinfo.projInfo.projState === 'ideapub' ? <TopRightV1 {...this.props} /> : <TopRightV2 {...this.props} />
                    }
                </div>
                {
                    this.props.projectinfo.projInfo.projState === 'ideapub' ? <PbottomV1 {...this.props} /> : <PbottomV2 {...this.props} />
                }
            </div >
        );
    }
    private handlePlayVideo = () =>
    {
        if (!this.state.isShowVideo)
        {
            this.setState({
                isShowVideo: true
            })
        }
    }
}
export default injectIntl(ProjectInfo)