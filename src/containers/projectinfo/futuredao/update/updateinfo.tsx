/**
 * 更新详情
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IProjectInfoProps, IDiscussList } from '../interface/projectinfo.interface';
// import UpdateMessage from './message';
import * as formatTime from '@/utils/formatTime';
interface IState
{
    showDelet: boolean,
    updateDiscuss: string,
    updateReply: string,
    updateReplyOther: string
}
@observer
class UpdateInfo extends React.Component<IProjectInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        showDelet: false,
        updateDiscuss: '',
        updateReply: '',
        updateReplyOther: ''
    }
    public componentDidMount()
    {
        this.props.update.getUpdateInfo();
        this.handleGetUpdateDiscussList('');
    }
    public componentWillUnmount()
    {
        this.props.update.updateInfo = null;
        this.props.update.updateId = '';
    }
    public render()
    {
        if (!this.props.update.updateInfo)
        {
            return <div />;
        }
        return (
            <div className="updateinfo-wrapper">
                <div className="updateinfo-top" >
                    <div className="updateinfo-tips">
                        <span>{formatTime.format('yyyy-MM-dd ', this.props.update.updateInfo.lastUpdateTime.toString(), this.props.intl.locale)}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>#{this.props.update.updateInfo.rank} {this.intrl.projinfo.update}</span>
                        <img src={require('@/img/back.png')} alt="" onClick={this.handleBackUpdateList} className="back-img" />
                    </div>
                    <strong className="update-title">{this.props.update.updateInfo.updateTitle}</strong>
                    <div className="update-people">
                        <img src={this.props.update.updateInfo.headIconUrl ? this.props.update.updateInfo.headIconUrl : require('@/img/default.png')} alt="" className="people-img" />
                        <strong>{this.props.update.updateInfo.username}</strong>
                        {/* {
                            this.props.update.updateInfo.isMember && (
                                <div className="right-update">
                                    <span onClick={this.handleToUpdateEdit}>{this.intrl.projinfo.edit}</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span onClick={this.handleShowDelete}>{this.intrl.projinfo.delete}</span>
                                </div>
                            )
                        } */}

                    </div>
                    <div className="updateinfo-p" dangerouslySetInnerHTML={{ '__html': this.props.update.updateInfo.updateDetail }} />
                    {
                        this.props.update.updateInfo.isZan
                            ? <img src={require('@/img/zan.png')} className="zan-img" alt="zan.png" />
                            : <img src={require('@/img/zan-un.png')} className="zan-img" alt="zan-un.png" onClick={this.handleSendUpdateZanInfo} />
                    }
                    <span className="zan-span">{this.props.update.updateInfo.zanCount}</span>
                </div>
                {/* <UpdateMessage {...this.props} /> */}
            </div>
        );
    }
    // 返回列表页
    private handleBackUpdateList = () =>
    {
        this.props.projectinfo.isShowUpdateInfo = false;
    }
    // 更新日志的点赞
    private handleSendUpdateZanInfo = async () =>
    {
        const checkRes = this.handleCheckOption();
        if (!checkRes)
        {
            return false;
        }
        const res = await this.props.update.sendUpdateZanInfo();
        if (res)
        {
            if (this.props.update.updateInfo)
            {
                this.props.update.updateInfo.isZan = true;
            }
        }
        return true;
    }
    /**
     * 以下留言部分
     */
    // 获取列表
    private handleGetUpdateDiscussList = async (discussId: string) =>
    {
        await this.props.update.getUpdateDiscussList(discussId);
        if (this.props.update.updateDiscussList.length > 0)
        {
            this.props.update.updateDiscussList.map((item: IDiscussList) =>
            {
                if (item.subSize > 0)
                {
                    this.handleGetUpdateReplayList(item)
                }
            })
        }
    }
    // 获取回复列表
    private handleGetUpdateReplayList = async (item: IDiscussList) =>
    {
        const replyList = await this.props.update.getUpdateDiscussReplyList(item.childrenId);
        item.childredList = [...replyList]
    }
    // 一切操作之前的验证 
    private handleCheckOption = () =>
    {
        // 验证是否登陆
        if (!this.props.common.userInfo)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }
        
        // 验证是否支持了项目
        if (this.props.projectinfo.projInfo )
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.supporterr);
            return false
        }
        return true
    }
}

export default injectIntl(UpdateInfo);
