/**
 * 发布更新列表
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IProjectProps } from '../interface/project.interface';
import UpdateInfo from './showinfo';
import SendModify from './sendmodify';

@inject('project', 'updateproject', 'common')
@observer
class UpdateManager extends React.Component<IProjectProps> {
    public intrl = this.props.intl.messages;
    public componentWillUnmount()
    {
        this.props.updateproject.updateType = 1;
    }

    public render()
    {
        return (
            <div className="update-page">
                <div className="big-title">
                    <strong className={this.props.updateproject.updateType !== 1 ? "big-gray-text" : 'normal-text'} onClick={this.handleGoList}>更新管理</strong>
                    {
                        this.props.updateproject.updateType === 2 && (
                            <>
                                <span className="trangle-san" />
                                <strong>查看更新</strong>
                            </>
                        )
                    }
                    {
                        this.props.updateproject.updateType === 3 && (
                            <>
                                <span className="trangle-san" />
                                <strong>修改更新</strong>
                            </>
                        )
                    }
                    {
                        this.props.updateproject.updateType === 4 && (
                            <>
                                <span className="trangle-san" />
                                <strong>发布更新</strong>
                            </>
                        )
                    }
                    {
                        this.props.updateproject.updateType === 1 && (
                            <Button
                                text="发布更新"
                                onClick={this.handleToOpenUpdate}
                            />
                        )
                    }
                </div>
                {
                    (this.props.updateproject.updateType === 1 || this.props.updateproject.updateType === 2) ? <UpdateInfo {...this.props} /> : <SendModify {...this.props} />
                }
            </div>
        );
    }
    // 返回列表
    private handleGoList = () =>
    {
        this.props.updateproject.updateType = 1;
        this.props.updateproject.updateInfo = null;
    }
    // 发布更新
    private handleToOpenUpdate = () =>
    {
        this.props.updateproject.updateType = 4;
    }
}

export default injectIntl(UpdateManager);
