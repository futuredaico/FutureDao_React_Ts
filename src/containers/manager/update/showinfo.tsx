/**
 * 查看更新
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IProjectProps } from '../interface/project.interface';
import { IUpdateList } from '../interface/updateproject.interface';
import * as formatTime from 'utils/formatTime';

interface IState
{
    showType: number,
}

@observer
class UpdateInfo extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        showType: 0,
    }
    public componentDidMount()
    {
        this.props.updateproject.getUpdateList(this.props.project.projId)
    }


    public render()
    {
        // const oneClassName = classnames('step-tab',
        //     { 'edit-tab': this.props.editproject.step === 1 },
        //     { 'success-tab': this.props.editproject.stepOneStatus === 2 }
        // );

        return (
            <div className="updateinfo-page">
                {
                    this.props.updateproject.updateType === 1 && (
                        <>
                            {
                                this.props.updateproject.updateCount > 0 && this.props.updateproject.updateList.map((item: IUpdateList, index: number) =>
                                {
                                    return (
                                        <div key={index} className="update-listbox">
                                            <h4 onClick={this.handleGetUpdateInfo.bind(this,item)}>{item.updateTitle}</h4>
                                            {
                                                item.updateDetail ? <div className="detail-p" dangerouslySetInnerHTML={{ '__html': item.updateDetail }} /> : <div className="detail-p">{this.intrl.projinfo.null}</div>
                                            }
                                            <span className="sm-gray">{formatTime.format('MM-dd', item.lastUpdateTime.toString(), this.props.intl.locale)}</span>
                                        </div>
                                    )
                                })
                            }
                        </>
                    )
                }
                {
                    this.props.updateproject.updateType === 2 && this.props.updateproject.updateInfo && (
                        <>
                            <h4>{this.props.updateproject.updateInfo.updateTitle}</h4>
                            <div className="people-line">
                                <img src={this.props.updateproject.updateInfo.heanIconUrl?this.props.updateproject.updateInfo.heanIconUrl:require('@/img/default.png')} alt="" />
                                <span>{this.props.updateproject.updateInfo.username?this.props.updateproject.updateInfo.username:this.intrl.user.shen}</span>
                                <div className="update-btn-wrapper">
                                    <span className="gray-span" onClick={this.handleToDeleteUpdate}>删除</span>
                                    <span className="gray-span" onClick={this.handleToUpdate}>修改</span>
                                </div>
                            </div>
                            {
                                this.props.updateproject.updateInfo.updateDetail ? <div className="detail-p" dangerouslySetInnerHTML={{ '__html': this.props.updateproject.updateInfo.updateDetail }} /> : <div className="detail-p">{this.intrl.projinfo.null}</div>
                            }
                            <span className="sm-gray">{formatTime.format('MM-dd', this.props.updateproject.updateInfo.lastUpdateTime.toString(), this.props.intl.locale)}</span>
                        </>
                    )
                }
            </div>
        );
    }
    // 查看详情
    private handleGetUpdateInfo = (item:IUpdateList)=>{
        this.props.updateproject.getUpdateInfo(this.props.project.projId,item.updateId);
        this.props.updateproject.updateType = 2;
    }
    // 删除更新
    private handleToDeleteUpdate = async ()=>{
        if(this.props.updateproject.updateInfo){
            const res = await this.props.updateproject.deleteUpdate(this.props.project.projId,this.props.updateproject.updateInfo.updateId);
            if(res){
                this.props.updateproject.updateType = 1;
                this.props.updateproject.updateInfo =null;
            }
        }        
    }
    // 修改更新
    private handleToUpdate = ()=>{
        this.props.updateproject.updateType = 3;
    }
}

export default injectIntl(UpdateInfo);
