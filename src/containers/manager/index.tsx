/**
 * 管理项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import classnames from 'classnames';
import { renderRoutes } from 'react-router-config';
import { IProjectProps } from './interface/project.interface';
import { ProjectRole } from './interface/editproject.interface';
// import { when } from 'mobx';
// import { getQueryString } from '@/utils/function'


interface IState
{
    showDeletProject: boolean
}

@inject('project', 'editproject', 'common')
@observer
class Project extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        showDeletProject: false,
    }

    public componentDidMount()
    {
        const projectId = this.props.location.pathname.replace(this.props.match.path + '/', '');
        if (projectId && projectId !== '/project') {
            const projId = projectId.split("/");
            if (projId.length > 1) {
                this.props.editproject.getProject(projId[3]);
                this.props.project.projId = projId[3];
            } else {
                this.props.editproject.getProject(projId[0]);
                this.props.project.projId = projId[0];
            }
        }   
    }
    public componentWillUnmount()
    {
        this.props.editproject.editContent = {
            projId: '',
            projName: '',
            projTitle: '',
            projBrief: '',
            officialWeb: '',
            projCoverUrl: '',
            projVideoUrl: '',
            projDetail: '',
            role:'',
            startFinanceFlag:0
        }
    }
    public render()
    {
        const createClassName = classnames('menu-li',
            { 'li-active': this.mapChildClick(/\/project(?!(\/update|\/financing|\/order|\/team))/i) ? true : false }
        );
        const teamClassName = classnames('menu-li',
            { 'li-active': this.mapChildClick(/project\/team/i) ? true : false },
            { 'li-notallow': (this.props.editproject.editContent.role !== ProjectRole.admin ) ? true : false }
        );
        const updateClassName = classnames('menu-li',
            { 'li-active': this.mapChildClick(/project\/update/i) ? true : false },
            { 'li-notallow': (this.props.editproject.editContent.role !== ProjectRole.admin ) ? true : false }
        );        
        const financingClassName = classnames('menu-li',
            { 'li-active': this.mapChildClick(/project\/financing/i) ? true : false },
            { 'li-notallow': (this.props.editproject.editContent.role !== ProjectRole.admin ) ? true : false }
        );
        // const orderClassName = classnames('menu-li',
        //     { 'li-active': this.mapChildClick(/project\/order/i) ? true : false },
        //     { 'li-notallow': false }
        // );
        const deleteClassName = classnames('menu-li',
            // { 'li-active': this.props.project.menuNum === 4 },
            { 'li-notallow': this.props.editproject.editContent.role !== 'admin' ? true : false }
        );
        return (
            <div className="create-page">
                {/* {this.props.project.isEdit && ( */}
                <div className="create-left-menu">
                    <div className="left-menu-title">
                        <h2 className="h2-title">{!!this.props.editproject.editContent.projTitle ? this.props.editproject.editContent.projName : '项目名称'} <img src={require("@/img/back.png")} alt="" className="back-img" onClick={this.handleGoBackPersonMenager} /></h2>
                    </div>
                    <div className="left-menu-list">
                        <ul className="menu-list-ul">
                            <li className={createClassName} onClick={this.mapUnderline.bind(this, '/project/edit')}>{this.intrl.edit.editinfo}</li>
                            <li className={teamClassName} onClick={this.mapUnderline.bind(this, '/project/team')}>团队管理</li>                            
                            <li className={updateClassName} onClick={this.mapUnderline.bind(this, '/project/update')}>{this.intrl.update.update}</li>
                            <li className={financingClassName} onClick={this.mapUnderline.bind(this, '/project/financing')}>融资管理</li>
                            {/* <li className={orderClassName} onClick={this.mapUnderline.bind(this, '/project/order')}>订单管理</li> */}
                            <li className={deleteClassName} onClick={this.mapUnderline.bind(this, '/project/delete')}>{this.intrl.delete.deletetitle}</li>
                        </ul>
                    </div>
                </div>
                {/* )
                } */}
                <div className="right-content">
                    {
                        renderRoutes(this.props.route.children)
                    }
                </div>
                {
                    this.state.showDeletProject && (
                        <div className="delete-people-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">{this.intrl.delete.deletetips}<br />{this.intrl.delete.deletetips2}</div>
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
    private mapUnderline = (str: string) =>
    {
        if (str === '/project/edit')
        {
            // const updateId = getQueryString('updateid');
            // if (updateId) {
            //     window.location.href = str + '/' + this.props.project.projId;
            // } else {

            // }
            this.props.history.push(str + '/' + this.props.project.projId);
        }
        // else if (str === '/project/update')
        // {
        //     //
        //     if ((this.props.editproject.editContent.role === ProjectRole.admin || this.props.editproject.editContent.projSubState === ProjSubState.Auditing))
        //     {
        //         return false;
        //     } else
        //     {
        //         this.props.history.push(str + '/' + this.props.project.projId);
        //     }
        // }
        // else if (str === '/project/financing')
        // {
        //     if (this.props.editproject.editContent.role === ProjectRole.admin || this.props.editproject.editContent.projSubState === ProjSubState.Auditing)
        //     {
        //         this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, "此项目现在暂时还不能进行启动融资");
        //         return false;
        //     }
        //     else if (this.props.editproject.editContent.role !== 'admin')
        //     {
        //         this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.adminerr);
        //         return false;
        //     }
        //     else
        //     {
        //         this.props.history.push(str + '/' + this.props.project.projId);
        //     }
        // }
        else if (str === '/project/delete')
        {
            if (this.props.editproject.editContent.role !== ProjectRole.admin)
            {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.adminerr);
            }
            else if (this.props.editproject.editContent.startFinanceFlag === 1)
            {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, '项目已启动融资不可删除');
            }
            else
            {
                this.handleShowDeleteProject();
            }
        }
        else if (str === '/project/order')
        {
            // this.props.orderproject.isShowOprojInfo = false;
            // this.props.orderproject.orderProjPage = 1;
            // console.log(this.props.history.location.pathname);
            // const pathname = this.props.history.location.pathname
            // if(pathname.includes('/project/order')){
            //     this.props.orderproject.orderMenu = 0;
            //     this.props.orderproject.orderType = '0';
            //     this.props.orderproject.buyName = '';
            //     this.props.orderproject.orderStr = '';
            //     this.props.orderproject.sendType= 0;
            //     this.props.orderproject.getOrderProjectList(0,'','',0);
            // }else{
            //     this.props.history.push(str + '/' + this.props.project.projId);
            // }   
            return false;
        }
        else
        {
            this.props.history.push(str + '/' + this.props.project.projId);
        }
        return true;
    }
    // 菜单选择样式
    private mapChildClick = (path) =>
    {
        return path.test(this.props.history.location.pathname)
    }
    // 显示删除项目弹框
    private handleShowDeleteProject = () =>
    {
        this.setState({
            showDeletProject: !this.state.showDeletProject
        })
    }
    // 确认删除
    private handleCheckDelete = async () =>
    {

        const res = await this.props.project.deleteMember(this.props.project.projId);
        if (res)
        {
            this.handleShowDeleteProject();
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.deletesuccess);
            this.handleGoBackPersonMenager();
        } else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.deleteerr);
        }
        
        return true;
    }
    // 跳到我的项目-管理中页面
    private handleGoBackPersonMenager = () =>
    {
        this.props.history.push('/personalcenter/myproject');
    }
}

export default injectIntl(Project);
