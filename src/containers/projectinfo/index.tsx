/**
 * 项目详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Pbottom from './pbottom';
import { IProjectInfoProps } from './interface/projectinfo.interface';
import * as formatTime from '@/utils/formatTime';
import QRCode from 'qrcode.react';
interface IState {
    isShowVideo: boolean
}
@inject('projectinfo', 'common')
@observer
class ProjectInfo extends React.Component<IProjectInfoProps, IState> {
    public state = {
        isShowVideo: false
    }
    public componentDidMount() {
        const projectId = this.props.match.params.projectId;
        this.props.projectinfo.projId = projectId;
        if (projectId) {
            this.props.projectinfo.getProjInfo(projectId);
        }
    }
    public componentWillUnmount() {
        this.props.projectinfo.projId = '';
        this.props.projectinfo.menuNum = 1;
        this.props.projectinfo.isShowUpdateInfo = false;
        this.props.projectinfo.projInfo = null;
    }
    public render() {
        if (!this.props.projectinfo.projInfo) {
            return null;
        }
        return (
            <div className="projectinfo-page">
                <div className="project-top">
                    <h2>{this.props.projectinfo.projInfo.projTitle}</h2>
                    <p className="title-p">{this.props.projectinfo.projInfo.projBrief}</p>
                    <div className="ptop-left">
                        <div className="ptop-img">
                            {
                                this.state.isShowVideo ? <video src={this.props.projectinfo.projInfo.projVideoUrl} controls={true} autoPlay={true} />
                                    : <img src={this.props.projectinfo.projInfo.projConverUrl} alt="" />
                            }
                            {
                                (this.props.projectinfo.projInfo.projVideoUrl && !this.state.isShowVideo) && <div className="play-btn" onClick={this.handlePlayVideo} />
                            }
                        </div>
                    </div>
                    <div className="ptop-right">
                        <div className="right-big-text">
                            <span className="big-purple-text">{this.props.projectinfo.projInfo.supportCount}</span>
                            <span className="md-purple-text">人</span>
                            <span className="sm-purple-text">看好这个项目</span>
                        </div>
                        <p className="gray-text">
                            这个项目只是发布了项目，还没有开始出售产品，如果你看好这个项目，点击下面的“看好”，给作者一点鼓励吧。
                        </p>
                        <div className="do-like">
                            <div className={this.props.projectinfo.projInfo.isSupport ? 'dolike-btn dolike-gray-btn' : "dolike-btn"} onClick={this.handleToStartSupport}>
                                <div className="dolike-img" />
                                <span>{this.props.projectinfo.projInfo.isSupport ? '已看好' : "看好"}</span>
                            </div>
                            <div className="dolike-wrapper" onClick={this.handleToAttention}>
                                {
                                    this.props.projectinfo.projInfo.isStar ? (
                                        <>
                                            <img src={require("@/img/guanzhu.png")} alt="" />
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
                        <p className="sm-gray-text">该项目创建于 {formatTime.format('yyyy-MM-dd ', this.props.projectinfo.projInfo.time.toString(), this.props.intl.locale)}</p>
                        <div className="ptop-share">
                            <span>分享项目到</span>
                            <div className="share-icon">
                                <a href={`https://twitter.com/share?text=FutureDAO&url=${window.location.href}`} target="_blank"><div className="img-div twitter-icon" /></a>
                                <a href={`https://connect.qq.com/widget/shareqq/index.html?url=${window.location.href}?sharesource=qzone&title=${'FutureDAO'}&summary=${'我是简洁'}`} target="_blank"><div className="img-div qq-icon" /></a>
                                <a href="javascript:;">
                                    <div className="img-div webchat-icon">
                                        <div className="qr-box">
                                            <QRCode value={window.location.href} size={80} />
                                        </div>
                                    </div>
                                </a>
                                <a href={`https://www.facebook.com/sharer.php?title=FutureDAO&u=${window.location.href}`} target="_blank"><div className="img-div fb-icon" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <Pbottom {...this.props} />
            </div >
        );
    }
    // 关注
    private handleToAttention = () => {
        if (!this.props.common.userInfo) {
            this.props.common.openNotificationWithIcon('error', '操作失败', '请登录之后在操作，谢谢');
            return false
        }
        if (!this.props.projectinfo.projId || !this.props.projectinfo.projInfo) {
            return false;
        }
        if (this.props.common.isVerifyEmail) {
            this.props.common.openNotificationWithIcon('error', '操作失败', '请验证邮箱之后在操作，谢谢');
            return false;
        }
        if (this.props.projectinfo.projInfo.isStar) {
            this.props.projectinfo.cancelAttention();
        } else {
            this.props.projectinfo.startAttention();
        }
        this.props.projectinfo.projInfo.isStar = !this.props.projectinfo.projInfo.isStar
        return true;
    }
    // 看好
    private handleToStartSupport = async () => {
        if (!this.props.common.userInfo) {
            this.props.common.openNotificationWithIcon('error', '操作失败', '请登录之后在操作，谢谢');
            return false
        }
        if (!this.props.projectinfo.projId || !this.props.projectinfo.projInfo || this.props.projectinfo.projInfo.isSupport) {
            return false;
        }
        if (this.props.common.isVerifyEmail) {
            this.props.common.openNotificationWithIcon('error', '操作失败', '请验证邮箱之后在操作，谢谢');
            return false;
        }
        const res = await this.props.projectinfo.startSupport();
        this.props.projectinfo.projInfo.isSupport = res;
        this.handleToAttention();
        return true;
    }
    private handlePlayVideo = () => {
        if (!this.state.isShowVideo) {
            this.setState({
                isShowVideo: true
            })
        }
    }
}
export default injectIntl(ProjectInfo)