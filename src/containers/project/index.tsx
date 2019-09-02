/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
import Button from '@/components/Button';
import classnames from 'classnames';
import { ProjectState, ProjSubState, ICommonStore } from '@/store/interface/common.interface';
import { renderRoutes } from 'react-router-config';
import { History } from 'history';
import { IProjectStore } from './interface/project.interface';
import { ICreateProjectStore } from './interface/createproject.interface';
import { getQueryString } from '@/utils/function'

interface IProps extends RouteComponentProps<{ projectId: string }> {
    route: {
        [key: string]: any
    };
    history: History,
    project: IProjectStore,
    createproject: ICreateProjectStore,
    common:ICommonStore,
    intl: any
}

@inject('project', 'createproject','common')
@observer
class Project extends React.Component<IProps, any> {
    public intrl = this.props.intl.messages;
    public state = {
        showDeletProject: false,
    }

    public componentDidMount() {
        const projectId = this.props.location.pathname.replace(this.props.match.path + '/', '');
        if (projectId && projectId !== '/project') {
            this.props.project.projId = projectId;
            this.props.project.isEdit = !!projectId;            
        }
    }
    public render() {
        const createClassName = classnames('menu-li',
            { 'li-active': this.mapChildClick(/\/project(?!(\/update|\/begin))/i) ? true : false }
        );
        const updateClassName = classnames('menu-li',
            { 'li-active': this.mapChildClick(/project\/update/i) ? true : false },
            { 'li-notallow': (this.props.createproject.createContent.projState === ProjectState.Readying || this.props.createproject.createContent.projSubState === ProjSubState.Auditing) ? true : false }
        );
        const beginClassName = classnames('menu-li',
            { 'li-active': this.mapChildClick(/project\/begin/i) ? true : false },
            { 'li-notallow': true }
        );
        const deleteClassName = classnames('menu-li',
            // { 'li-active': this.props.project.menuNum === 4 },
            { 'li-notallow': this.props.createproject.createContent.role !== 'admin' ? true : false }
        );
        return (
            <div className="create-page">
                {this.props.project.isEdit && (
                    <div className="create-left-menu">
                        <div className="left-menu-title">
                            <h2 className="h2-title">{!!this.props.createproject.createContent.projTitle ? this.props.createproject.createContent.projTitle : '项目名称'} <img src={require("@/img/back.png")} alt="" className="back-img" onClick={this.handleGoBackPersonMenager} /></h2>
                        </div>
                        <div className="left-menu-list">
                            <ul className="menu-list-ul">
                            <li className={createClassName} onClick={this.mapUnderline.bind(this, '/project')}>{this.intrl.edit.editinfo}</li>
                                <li className={updateClassName} onClick={this.mapUnderline.bind(this, '/project/update')}>{this.intrl.update.update}</li>
                                <li className={beginClassName} onClick={this.mapUnderline.bind(this, '/project/begin')}>{this.intrl.start.start}</li>
                                <li className={deleteClassName} onClick={this.mapUnderline.bind(this, '/project/delete')}>{this.intrl.delete.deletetitle}</li>
                            </ul>
                        </div>
                    </div>
                )
                }
                <div className="right-content">
                    {
                        renderRoutes(this.props.route.children)
                    }
                </div>
                {
                    this.state.showDeletProject && (
                        <div className="delete-people-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">{this.intrl.delete.deletetips}<br/>{this.intrl.delete.deletetips2}</div>
                                <div className="delete-btn">
                                    <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleShowDeleteProject} />
                                    <Button text={this.intrl.btn.comfirm} onClick={this.handleCheckDelete} />
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        );
    }
    // 菜单选择
    private mapUnderline = (str: string) => {
        if(str === '/project'){
            const updateId = getQueryString('updateid');
            if(updateId){
                window.location.href = str + '/' + this.props.project.projId;
            }else{
                this.props.history.push(str + '/' + this.props.project.projId);
            }
        }
        else if(str === '/project/update'){
            //
            if((this.props.createproject.createContent.projState === ProjectState.Readying || this.props.createproject.createContent.projSubState === ProjSubState.Auditing)){
                return false;
            }else{
                this.props.history.push(str + '/' + this.props.project.projId);
            }
        }
        else if(str === '/project/begin'){
            return false;
        }
        else if(str === '/project/delete'){
            if(this.props.createproject.createContent.role!=='admin'){
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.adminerr);
            }else{
                this.handleShowDeleteProject();
            }
        }
        else{
            this.props.history.push(str + '/' + this.props.project.projId);
        }
        return true;
    }
    // 菜单选择样式
    private mapChildClick = (path) => {
        return path.test(this.props.history.location.pathname)
    }
    // 显示删除项目弹框
    private handleShowDeleteProject = () => {
        this.setState({
            showDeletProject: !this.state.showDeletProject
        })
    }
    // 确认删除
    private handleCheckDelete = async () => {
        
        const projectId = this.props.location.pathname.replace(this.props.match.path + '/', '');
        if (projectId) {
            const res = await this.props.project.deleteMember(projectId);
            if(res){
                this.handleShowDeleteProject();
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.deletesuccess);
                this.handleGoBackPersonMenager();
            }else{
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.deleteerr);
            }
        } else {
            return false;
        }
        return true;
    }
    // 跳到我的项目-管理中页面
    private handleGoBackPersonMenager = () => {
        this.props.history.push('/personalcenter/myproject');
    }
}

export default injectIntl(Project);
