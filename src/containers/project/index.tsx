/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
// import CreateProject from './createproject';
// import UpdateProject from './updateproject';
// import { IProjectProps } from './interface/project.interface';
import Button from '@/components/Button';
import classnames from 'classnames';
import { ProjectState, ProjSubState } from '@/store/interface/common.interface';
import { renderRoutes } from 'react-router-config';
import { History } from 'history';
import { IProjectStore } from './interface/project.interface';
import { ICreateProjectStore } from './interface/createproject.interface';

interface IProps extends RouteComponentProps<{ projectId: string,updateId:string }>
{
    route: {
        [key: string]: any
    };
    history: History,
    project: IProjectStore,
    createproject: ICreateProjectStore,
    intl: any
}

@inject('project', 'createproject')
@observer
class Project extends React.Component<IProps, any> {

    public state = {
        showDeletProject: false,
    }
    public componentDidMount(){
        const projectId = this.props.match.params.projectId;
        const updateId = this.props.match.params.updateId;
        console.log(projectId)
        this.props.project.projId = projectId;
        this.props.project.updateId = updateId;
    }
    public render()
    {
        const createClassName = classnames('menu-li',
            { 'li-active': this.mapChildClick('/project') ? true : false }
        );
        const updateClassName = classnames('menu-li',
            { 'li-active': this.mapChildClick('/project/update') ? true : false },
            { 'li-notallow': (this.props.createproject.createContent.projState === ProjectState.Readying || this.props.createproject.createContent.projSubState === ProjSubState.Auditing) ? true : false }
        );
        const beginClassName = classnames('menu-li',
            { 'li-active': this.mapChildClick('/project/begin') ? true : false },
            { 'li-notallow': true }
        );
        const deleteClassName = classnames('menu-li',
            // { 'li-active': this.props.project.menuNum === 4 },
            { 'li-notallow': this.props.createproject.createContent.role !== 'admin' ? true : false }
        );
        return (
            <div className="create-page">
                {this.props.createproject.step !== 1 && (
                    <div className="create-left-menu">
                        <div className="left-menu-title">
                            <h2 className="h2-title">{!!this.props.createproject.createContent.projTitle ? this.props.createproject.createContent.projTitle : '项目名称'} <img src={require("@/img/back.png")} alt="" className="back-img" onClick={this.handleGoBackPersonMenager} /></h2>
                        </div>
                        <div className="left-menu-list">
                            <ul className="menu-list-ul">
                                <li className={createClassName} onClick={this.mapUnderline.bind(this, '/project')}>编辑项目资料</li>
                                <li className={updateClassName} onClick={this.mapUnderline.bind(this, '/project/update')}>发布更新</li>
                                <li className={beginClassName} onClick={this.mapUnderline.bind(this, '/project/begin')}>启动融资</li>
                                <li className={deleteClassName} onClick={this.mapUnderline.bind(this, '/project/delete')}>删除项目</li>

                            </ul>
                        </div>
                    </div>
                )
                }
                <div className="right-content">
                    {
                        renderRoutes(this.props.route.children)
                    }
                    {/* {
                        this.props.project.menuNum === 1 && <CreateProject {...this.props} />
                    }
                    {
                        this.props.project.menuNum === 2 && <UpdateProject {...this.props} />
                    } */}
                </div>
                {
                    this.state.showDeletProject && (
                        <div className="delete-people-wrapper">
                            <div className="delete-content">
                                <div className="delete-text">删除项目将清除所有相关数据是否继续？</div>
                                <div className="delete-btn">
                                    <Button text="取消" btnColor="red-btn" onClick={this.handleShowDeleteProject} />
                                    <Button text="确认" onClick={this.handleCheckDelete} />
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
        console.log(this.props.project.projId)
        if(str === '/project'){
            this.props.history.push(str+'/'+this.props.project.projId);
            return true;
        }
        // if (str === '/project/update' && (this.props.createproject.createContent.projState === ProjectState.Readying || this.props.createproject.createContent.projSubState === ProjSubState.Auditing))
        // {
        //     return false;
        // }
        // if (str === '/project/begin')
        // {
        //     return false;
        // }
        // else if (str === 'project/detele' && this.props.createproject.createContent.role !== 'admin')
        // {
        //     return false
        // } 
        // else if (str === 'project/detele')
        // {
        //     this.handleShowDeleteProject();
        //     return true;
        // }
        this.props.history.push(str);
        // this.props.project.menuNum = num
        return true;
    }
    // 菜单选择样式
    private mapChildClick = (path) =>
    {
        if (path instanceof Array)
        {
            for (const i in path)
            {
                if (new RegExp(path[i], 'i').test(this.props.history.location.pathname))
                {
                    return true;
                }
            }
        }
        if (path === this.props.history.location.pathname)
        {
            return true;
        }
        return false;
    }
    // 显示删除项目弹框
    private handleShowDeleteProject = () =>
    {
        this.setState({
            showDeletProject: !this.state.showDeletProject
        })
    }
    // 确认删除
    private handleCheckDelete = () =>
    {
        const projectId = this.props.match.params.projectId;
        if (projectId)
        {
            this.props.project.deleteMember(projectId);
        } else
        {
            return false;
        }
        this.handleShowDeleteProject();
        return true;
    }
    // 跳到我的项目-管理中页面
    private handleGoBackPersonMenager = () =>
    {
        this.props.history.push('/personalcenter/myproject');
    }
}

export default injectIntl(Project);
