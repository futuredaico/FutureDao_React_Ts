/**
 * 发布更新列表
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IProjectProps } from '../interface/project.interface';
import UpdateInfo from './showinfo';
import SendModify from './sendmodify';

type Identity = 'admin' | 'member';
interface IState
{
    identityValue: Identity,
}

@observer
class UpdateManager extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        identityValue: 'admin',
    }


    public render()
    {
        // const oneClassName = classnames('step-tab',
        //     { 'edit-tab': this.props.editproject.step === 1 },
        //     { 'success-tab': this.props.editproject.stepOneStatus === 2 }
        // );

        return (
            <div className="update-page">
                <div className="big-title">
                    <strong>更新管理</strong>
                    <Button
                        text="发布更新"
                        onClick={this.handleToOpenUpdate}
                    />
                </div>
                {/* <div className="update-list-wrapper">
                    <div className="list-one">
                        <h4>Alpha版本已完成，即将开启测试</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                        <span className="sm-gray">12月31日</span>
                    </div>
                    <div className="list-one">
                        <h4>Alpha版本已完成，即将开启测试</h4>    
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                        <span className="sm-gray">12月31日</span>
                    </div>
                </div> */}
                <UpdateInfo {...this.props} />
                <SendModify {...this.props} />
            </div>
        );
    }
    // 发布更新
    private handleToOpenUpdate = () =>
    {
        //
    }
}

export default injectIntl(UpdateManager);
