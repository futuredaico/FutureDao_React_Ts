/**
 * 项目详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Pbottom from './pbottom';
import Button from '@/components/Button';
import { IProjectInfoProps } from './interface/projectinfo.interface';

@inject('projectinfo')
@observer
class ProjectInfo extends React.Component<IProjectInfoProps, any> {
    public componentDidMount()
    {
        const projectId = this.props.match.params.projectId;
        if (projectId)
        {
            this.props.projectinfo.getProjInfo(projectId);
        }
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
                    <p className="title-p">{this.props.projectinfo.projInfo.projBrief}</p>
                    <div className="ptop-left">
                        <div className="ptop-img">
                            <img src={this.props.projectinfo.projInfo.projConverUrl} alt="" />
                        </div>
                    </div>
                    <div className="ptop-right">
                        <div className="right-big-text">
                            <span className="big-gray-text">{this.props.projectinfo.projInfo.supportCount}</span> 人看好
                        </div>
                        <p className="gray-text">
                            这个项目只是发布了创意，还没有启动融资，如果你看好这个创意，点击下面的”看好“，给作者一点鼓励吧。
                        </p>
                        <div className="do-like">
                            <Button text={this.props.projectinfo.projInfo.isSupport ? '已看好' : "看好"} btnColor={this.props.projectinfo.projInfo.isSupport ? 'gray-btn' : ''} />
                            <div className="dolike-wrapper">
                                {
                                    this.props.projectinfo.projInfo.isStar? (
                                        <>
                                            <img src={require("@/img/like2.png")} alt="" />
                                            <span className="dolike-text">已关注</span>
                                        </>
                                    )
                                    :(
                                        <>
                                            <div className="no-dolike" />
                                            <span>关注</span>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <div className="ptop-share">
                            <span>分享项目到</span>
                            <div className="share-icon">
                                <div className="img-div twitter-icon" />
                                <div className="img-div qq-icon" />
                                <div className="img-div webchat-icon" />
                                <div className="img-div fb-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <Pbottom {...this.props} />
            </div>
        );
    }
}
export default injectIntl(ProjectInfo)