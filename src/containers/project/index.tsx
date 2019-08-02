/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import CreateProject from './createproject';
import UpdateProject from './updateproject';
import { IProjectProps } from './interface/project.interface';
import Button from '@/components/Button';
import classnames from 'classnames';
import { ProjectState, ProjSubState } from '@/store/interface/common.interface';

@inject('project', 'createproject', 'common', 'updateproject')
@observer
class Project extends React.Component<IProjectProps, any> {

    public state = {
        showDeletProject: false,
    }
    public render()
    {
        const createClassName = classnames('menu-li',
            { 'li-active': this.props.project.menuNum === 1 ? true : false }
        );
        const updateClassName = classnames('menu-li',
            { 'li-active': this.props.project.menuNum === 2 ? true : false },
            { 'li-notallow': (this.props.createproject.createContent.projState === ProjectState.Readying || this.props.createproject.createContent.projSubState === ProjSubState.Auditing) ? true : false }
        );
        const beginClassName = classnames('menu-li',
            { 'li-active': this.props.project.menuNum === 3 ? true : false },
            { 'li-notallow': true }
        );
        const deleteClassName = classnames('menu-li',
            { 'li-active': this.props.project.menuNum === 4 },
            { 'li-notallow': this.props.createproject.createContent.role!=='admin'  ? true : false}
        );
        return (
            <div className="create-page">
                {this.props.createproject.step !== 1 && (
                    <div className="create-left-menu">
                        <div className="left-menu-title">
                            <h2 className="h2-title">我是项目名称 <img src={require("@/img/back.png")} alt="" className="back-img" onClick={this.handleGoBackPersonMenager} /></h2>
                        </div>
                        <div className="left-menu-list">
                            <ul className="menu-list-ul">
                                <li className={createClassName} onClick={this.mapUnderline.bind(this, 1)}>编辑项目资料</li>
                                <li className={updateClassName} onClick={this.mapUnderline.bind(this, 2)}>发布更新</li>
                                <li className={beginClassName} onClick={this.mapUnderline.bind(this, 3)}>启动融资</li>
                                <li className={deleteClassName} onClick={this.mapUnderline.bind(this, 4)}>删除项目</li>

                            </ul>
                        </div>
                    </div>
                )
                }
                <div className="right-content">
                    {
                        this.props.project.menuNum === 1 && <CreateProject {...this.props} />
                    }
                    {
                        this.props.project.menuNum === 2 && <UpdateProject {...this.props} />
                    }
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
    private mapUnderline = (num: number) =>
    {
        if (num === 2 && (this.props.createproject.createContent.projState === ProjectState.Readying || this.props.createproject.createContent.projSubState === ProjSubState.Auditing))
        {
            return false;
        }
        if (num === 3)
        {
            return false;
        }
        if(num===4&&this.props.createproject.createContent.role!=='admin'){
            return false
        }else if (num === 4)
        {
            this.handleShowDeleteProject();
            return true;
        }
        this.props.project.menuNum = num
        return true;
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
        // todo
        this.handleShowDeleteProject();
    }
    // 跳到我的项目-管理中页面
    private handleGoBackPersonMenager = () =>
    {
        this.props.history.push('/personalcenter')
    }
}

export default injectIntl(Project);
