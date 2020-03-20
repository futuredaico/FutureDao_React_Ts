/**
 * 项目详情页,上半部分,创意发布阶段
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IProjectInfoProps } from '../interface/projectinfo.interface';
import Button from '@/components/Button';

@observer
class TopInfoV1 extends React.Component<IProjectInfoProps> {
    public intrl = this.props.intl.messages;
    
    public render()
    {
        if (!this.props.projectinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="ptop-right">
                <div className="topright-wrapper">
                    <div className="des-wrapper">
                        <strong className="title-strong">{this.intrl.projinfo.summary}</strong>
                        <p className="gray-content">{this.props.projectinfo.projInfo.projBrief}</p>
                    </div>
                    <div className="other-wrapper">
                        <div className="version-left">
                            <strong className="title-strong">{this.intrl.projinfo.version}</strong>
                            <p className="gray-content">{this.props.projectinfo.projInfo.projType === 'moloch' ? "MolochDao" : "FutureDao"} {this.props.projectinfo.projInfo.projVersion}</p>
                        </div>
                        <div className="dolike-wrapper" onClick={this.handleToAttention}>
                            {
                                this.props.projectinfo.projInfo.isStar ? (
                                    <>
                                        <Button
                                            text={this.intrl.projinfo.followed}
                                            onClick={this.handleToAttention}
                                        />
                                    </>
                                )
                                    : (
                                        <>
                                            <Button
                                                text={this.intrl.projinfo.follow}
                                                onClick={this.handleToAttention}
                                            />
                                        </>
                                    )
                            }
                        </div>
                        <div className="tips-content">
                            <span className="sm-gray-content">该项目仅展示了创意，暂未发布合约</span>
                        </div>
                        <strong className="title-strong">{this.intrl.projinfo.website}</strong>
                        {
                            this.props.projectinfo.projInfo.officialWeb ? <a className="weblink-purple" target="_blank" href={this.props.projectinfo.projInfo.officialWeb}>{this.props.projectinfo.projInfo.officialWeb}</a>
                                : <p className="gray-content">{this.intrl.projinfo.null}</p>
                        }
                    </div>
                </div>
            </div>
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
}
export default injectIntl(TopInfoV1)