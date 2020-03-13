/**
 * 修改更新或发布更新
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
import Editor from '@/components/braftEditor';
import BraftEditor from 'braft-editor';
import { getQueryString } from '@/utils/function'
import { IProjectProps } from '../interface/project.interface';

interface IState
{
    updateTitle: string, // 标题
    detailString: string, // 文本编辑内容
    detailStr: string,  // 传给接口的参数
    isHasEdit: boolean, // 判断详情是否输入了内容
    updateId: string  // 更新日志的ID
}

@observer
class SendModify extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        updateTitle: '',
        detailString: '',
        detailStr: '',
        isHasEdit: false,
        updateId: getQueryString('updateid') || ''
    }
    public async componentDidMount()
    {
        const projectId = this.props.match.params.projectId;
        // this.props.project.projId = projectId;
        if (projectId)
        {
            // this.props.createproject.getProject(projectId);
            if (this.state.updateId)
            {
                //   await this.props.updateproject.getUpdateInfo(projectId, this.state.updateId);
                //   if (this.props.updateproject.updateInfo)
                //   {  
                //     this.setState({
                //       updateTitle: this.props.updateproject.updateInfo.updateTitle,
                //       detailString: BraftEditor.createEditorState(this.props.updateproject.updateInfo.updateDetail),
                //       detailStr: this.props.updateproject.updateInfo.updateDetail
                //     })
                //   }
            }
        }
    }

    public render()
    {
        // const oneClassName = classnames('step-tab',
        //     { 'edit-tab': this.props.editproject.step === 1 },
        //     { 'success-tab': this.props.editproject.stepOneStatus === 2 }
        // );

        return (
            <>
                <div className="inline-title">
                    <strong>{this.intrl.update.title}</strong>
                </div>
                <div className="inline-enter">
                    <Input maxLength={80} value={this.state.updateTitle} onChange={this.handleChangeTitle} />
                </div>
                <div className="inline-title">
                    <strong>{this.intrl.update.info}</strong>
                </div>
                <div className="inline-enter">
                    <div style={{ width: 750, minHeight: 500, maxHeight: 1000 }}>
                        <Editor
                            onChange={this.onChangeEditorValue}
                            value={this.state.detailString}
                        />
                    </div>
                </div>
                <div className="inline-btn">
                    <Button
                        text="取消"
                        btnSize="stop-btn"
                        btnColor={(!this.state.isHasEdit || !this.state.updateTitle) ? 'red-btn' : 'red-btn'}
                        onClick={this.handleSendUpdate}
                    />
                    <Button
                        text="保存"
                        btnSize="stop-btn"
                        btnColor={(!this.state.isHasEdit || !this.state.updateTitle) ? 'gray-btn' : ''}
                        onClick={this.handleSendUpdate}
                    />
                </div>
            </>
        );
    }
    // 标题更新
    private handleChangeTitle = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        //
        this.setState({
            updateTitle: ev.target.value
        })
    }
    // 详情更新
    private onChangeEditorValue = (value: any) =>
    {
        // todo
        const text = value.toText()
        if (text !== "")
        {
            this.setState({
                detailString: BraftEditor.createEditorState(value),
                detailStr: BraftEditor.createEditorState(value).toHTML().replace(/\s\s/g, '&nbsp;&nbsp;'),
                isHasEdit: true
            })
        } else
        {
            this.setState({
                detailString: '',
                detailStr: '',
                isHasEdit: false
            })
        }
    }
    // 发布更新
    private handleSendUpdate = async () =>
    {
        if (!this.state.updateTitle || !this.state.isHasEdit)
        {
            return false;
        }
        const params = this.props.match.params;
        const projectId = params["projectId"];
        if (!projectId)
        {
            return false;
        }
        if (this.state.updateId)
        {
            // const res = await this.props.updateproject.modifyUpdateInfo(projectId, this.state.updateId, this.state.updateTitle, this.state.detailStr);
            // if (res)
            // {
            //     this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.updatetips);
            // } else
            // {
            //     this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.updateerr);
            // }
        }
        else
        {
            // const res = await this.props.updateproject.sendUpdate(projectId, this.state.updateTitle, this.state.detailStr);
            // if (res)
            // {
            //     this.setState({
            //         updateTitle: '',
            //         detailString: BraftEditor.createEditorState(''),
            //         detailStr: '',
            //         isHasEdit: false
            //     })
            // }
        }

        return true
    }
}

export default injectIntl(SendModify);
