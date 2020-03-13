/**
 * 查看更新
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IProjectProps } from '../interface/project.interface';

type Identity = 'admin' | 'member';
interface IState
{
    identityValue: Identity,
}

@observer
class UpdateInfo extends React.Component<IProjectProps, IState> {
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
            <div className="updateinfo-page">
                <h4>Alpha版本已完成，即将开启测试</h4>
                <div className="people-line">
                    <img src={require('@/img/default.png')} alt=""/>
                    <span>dddd</span>
                    <div className="update-btn-wrapper">
                        <span className="gray-span">删除</span>
                        <span className="gray-span">修改</span>
                    </div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                <span className="sm-gray">12月31日</span>
            </div>
        );
    }

}

export default injectIntl(UpdateInfo);
