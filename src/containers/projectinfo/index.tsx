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

@inject('projectinfo', 'common')
@observer
class ProjectInfo extends React.Component<IProjectInfoProps, any> {
    public componentDidMount()
    {
        const projectId = this.props.match.params.projectId;
        this.props.projectinfo.projId = projectId;
        if (projectId)
        {
            this.props.projectinfo.getProjInfo(projectId);
            this.props.projectinfo.getUpdateData();
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
                            <Button
                                text={this.props.projectinfo.projInfo.isSupport ? '已看好' : "看好"}
                                btnColor={this.props.projectinfo.projInfo.isSupport ? 'gray-btn' : ''}
                                onClick={this.handleToStartSupport}
                            />
                            <div className="dolike-wrapper" onClick={this.handleToAttention}>
                                {
                                    this.props.projectinfo.projInfo.isStar ? (
                                        <>
                                            <img src={require("@/img/like2.png")} alt="" />
                                            <span className="dolike-text">已关注</span>
                                        </>
                                    )
                                        : (
                                            <>
                                                <div className="no-dolike" />
                                                <span>关注</span>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                        {/* <div className="ptop-share">
                            <span>分享项目到</span>
                            <div className="share-icon">
                                <div className="img-div twitter-icon" />
                                <div className="img-div qq-icon" />
                                <div className="img-div webchat-icon" />
                                <div className="img-div fb-icon" />
                            </div>
                        </div> */}
                    </div>
                </div>
                <Pbottom {...this.props} />
            </div>
        );
    }
    // 关注
    private handleToAttention = () =>
    {
        if (!this.props.common.userInfo)
        {
            this.props.history.push('/load/login');
            return false
        }
        if (!this.props.projectinfo.projId || !this.props.projectinfo.projInfo)
        {
            return false;
        }
        if (this.props.common.isVerifyEmail)
        {
            this.props.common.openNotificationWithIcon('error', '操作失败', '请验证邮箱之后在操作，谢谢');
            return false;
        }
        if (this.props.projectinfo.projInfo.isStar)
        {
            this.props.projectinfo.cancelAttention();
        } else
        {
            this.props.projectinfo.startAttention();
        }
        this.props.projectinfo.projInfo.isStar = !this.props.projectinfo.projInfo.isStar
        return true;
    }
    // 看好
    private handleToStartSupport = async () =>
    {
        if (!this.props.common.userInfo)
        {
            this.props.history.push('/load/login');
            return false
        }
        if (!this.props.projectinfo.projId || !this.props.projectinfo.projInfo || this.props.projectinfo.projInfo.isSupport)
        {
            return false;
        }
        if (this.props.common.isVerifyEmail)
        {
            this.props.common.openNotificationWithIcon('error', '操作失败', '请验证邮箱之后在操作，谢谢');
            return false;
        }
        const res = await this.props.projectinfo.startSupport();
        this.props.projectinfo.projInfo.isSupport = res;
        return true;
    }
    
}
export default injectIntl(ProjectInfo)