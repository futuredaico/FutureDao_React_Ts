/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { IProjectInfoProps } from './interface/projectinfo.interface';

@observer
class UpdateList extends React.Component<IProjectInfoProps, any> {
    public render()
    {
        return (
            <div className="updatelist-wrapper">
                <div className="updatelist-list" onClick={this.handleToInfo}>
                    <h3>Alpha版本已完成，即将开启测试</h3>
                    <p className="updatelist-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                    <span className="time-tips">12月31日</span>
                    <div className="right-other">
                        <span>评论：12</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>赞：12</span>
                    </div>
                </div>
                <div className="updatelist-list">
                    <h3>Alpha版本已完成，即将开启测试</h3>
                    <p className="updatelist-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                    <span className="time-tips">12月31日</span>
                    <div className="right-other">
                        <span>评论：12</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>赞：12</span>
                    </div>
                </div>
                <div className="updatelist-list">
                    <h3>Alpha版本已完成，即将开启测试</h3>
                    <p className="updatelist-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                    <span className="time-tips">12月31日</span>
                    <div className="right-other">
                        <span>评论：12</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>赞：12</span>
                    </div>
                </div>
            </div>
        );
    }   
    private handleToInfo = ()=>{
        this.props.projectinfo.isShowUpdateInfo = true;
    }
}

export default injectIntl(UpdateList);
