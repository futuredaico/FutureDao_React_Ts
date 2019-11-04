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
import { ProjectState } from '@/store/interface/common.interface';
interface IState
{
    isShowVideo: boolean
}
@inject('projectinfo', 'common', 'update','transation','teemowallet','metamaskwallet')
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
            this.props.projectinfo.getContractHash();
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
                        {/* 创意发布 */}
                        {
                            this.props.projectinfo.projInfo.projState === ProjectState.IdeaPub && (
                                <>
                                    <div className="right-big-text">
                                        <span className="big-purple-text">{this.props.projectinfo.projInfo.supportCount}</span>
                                        <span className="md-purple-text">{this.intrl.projinfo.people}</span>
                                        <span className="sm-purple-text">{this.intrl.projinfo.supporttips}</span>
                                    </div>
                                    <p className="gray-text">
                                        {this.intrl.projinfo.tips}
                                    </p>
                                    <div className="do-like">
                                        <div className={this.props.projectinfo.projInfo.isSupport ? 'dolike-btn dolike-gray-btn' : "dolike-btn"} onClick={this.handleToStartSupport}>
                                            <div className="dolike-img" />
                                            <span>{this.props.projectinfo.projInfo.isSupport ? this.intrl.btn.supported : this.intrl.btn.support}</span>
                                        </div>

                                        <div className="dolike-wrapper" onClick={this.handleToAttention}>
                                            {
                                                this.props.projectinfo.projInfo.isStar ? (
                                                    <>
                                                        <img src={require("@/img/guanzhu.png")} alt="" />
                                                        <span className="dolike-text">{this.intrl.projinfo.followed}</span>
                                                    </>
                                                )
                                                    : (
                                                        <>
                                                            <div className="no-dolike" />
                                                            <span>{this.intrl.projinfo.follow}</span>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    </div>
                                    <p className="sm-gray-text">{this.intrl.projinfo.begintime} {formatTime.format('yyyy-MM-dd ', this.props.projectinfo.projInfo.time.toString(), this.props.intl.locale)}</p>
                                </>
                            )
                        }
                        {/* 交易中 */}
                        {
                            this.props.projectinfo.projInfo.projState === ProjectState.Trading && (
                                <>
                                    <div className="going-wrapper">
                                        <div className="going-line">
                                            <div className="going-purple">
                                                <strong className="purple-big">{this.props.projectinfo.projInfo.hasSellAmt}</strong><strong className="purple-sm"> {this.props.projectinfo.projInfo.fundName.toLocaleUpperCase()}</strong>
                                            </div>
                                            <div className="going-gray">已售出</div>
                                        </div>
                                        <div className="going-line">
                                            <div className="going-normal">
                                                <strong>{this.props.projectinfo.projInfo.hasIssueAmt}</strong>
                                            </div>
                                            <div className="going-gray">发行代币</div>
                                        </div>
                                        <div className="going-line">
                                            <div className="going-normal">
                                                <strong>{this.props.projectinfo.projInfo.hasSupport}</strong>
                                            </div>
                                            <div className="going-gray">支持人数</div>
                                        </div>
                                    </div>
                                    <div className="do-like">
                                        <div className="dolike-btn" onClick={this.handleToOtherSupport}>
                                            <span>立即支持</span>
                                        </div>
                                        <div className="dolike-wrapper" onClick={this.handleToAttention}>
                                            {
                                                this.props.projectinfo.projInfo.isStar ? (
                                                    <>
                                                        <img src={require("@/img/guanzhu.png")} alt="" />
                                                        <span className="dolike-text">{this.intrl.projinfo.followed}</span>
                                                    </>
                                                )
                                                    : (
                                                        <>
                                                            <div className="no-dolike" />
                                                            <span>{this.intrl.projinfo.follow}</span>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    </div>
                                    <p className="sm-gray-text">本项目已在{this.props.projectinfo.projInfo.platform==='eth'?'以太坊':'Neo'}上发起代币融资</p>
                                </>
                            )
                        }
                        <div className="ptop-share">
                            <span>{this.intrl.projinfo.share}</span>
                            <div className="share-icon">
                                <a href={`https://twitter.com/intent/tweet?text=${this.props.projectinfo.projInfo.projName}&url=https://apidao.nel.group/api/share/${this.props.projectinfo.projId}/${this.props.common.network === "TestNet" ? 0 : 1}/0`} target="_blank"><div className="img-div twitter-icon" /></a>
                                <a href={`https://connect.qq.com/widget/shareqq/index.html?url=${window.location.href}?sharesource=qzone&title=${this.props.projectinfo.projInfo.projName}&summary=${this.props.projectinfo.projInfo.projBrief}`} target="_blank"><div className="img-div qq-icon" /></a>
                                <a href="javascript:;">
                                    <div className="img-div webchat-icon">
                                        <div className="qr-box">
                                            <QRCode value={window.location.href} size={80} />
                                        </div>
                                    </div>
                                </a>
                                <a href={`https://www.facebook.com/sharer.php?title=${this.props.projectinfo.projInfo.projName}&u=https://apidao.nel.group/api/share/${this.props.projectinfo.projId}/${this.props.common.network === "TestNet" ? 0 : 1}/1`} target="_blank"><div className="img-div fb-icon" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <Pbottom {...this.props} />
            </div >
        );
    }
    // 关注
    private handleToAttention = () =>
    {
        if (!this.props.common.userInfo)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }
        if (!this.props.projectinfo.projId || !this.props.projectinfo.projInfo)
        {
            return false;
        }
        if (this.props.common.isVerifyEmail)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.verifyerr);
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
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }
        if (!this.props.projectinfo.projId || !this.props.projectinfo.projInfo || this.props.projectinfo.projInfo.isSupport)
        {
            return false;
        }
        if (this.props.common.isVerifyEmail)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.verifyerr);
            return false;
        }
        const res = await this.props.projectinfo.startSupport();
        this.props.projectinfo.projInfo.isSupport = res;
        this.handleToAttention();
        return true;
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
    // 支持众筹详情产品预售页
    private handleToOtherSupport = () =>
    {
        //

        const url = process.env.REACT_APP_SERVER_ENV === 'DEV' ? '/test' : '';
        window.open(url + '/support/' + this.props.projectinfo.projId)
    }
}
export default injectIntl(ProjectInfo)