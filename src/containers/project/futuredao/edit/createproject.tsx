/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import StepOne from './stepone';
import StepTwo from './steptwo';
import Button from '@/components/Button';
import StepThree from './stepthree';
import classnames from 'classnames';
import { ICreateProjectProps } from '../interface/createproject.interface'
import { ProjSubState } from '@/store/interface/common.interface';
import { getQueryString } from '@/utils/function'
interface IState{
    isEdit:boolean
}

@inject('createproject', 'common', 'project')
@observer
class CreateProject extends React.Component<ICreateProjectProps,IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isEdit: !!this.props.match.params.projectId
    }
    public componentDidMount()
    {
        // 区分是新建项目还是管理项目
        const projectId = this.props.match.params.projectId;
        if (projectId)
        {
            this.props.createproject.getProject(projectId);
            const type = getQueryString('type') || '';
            if (!!type)
            {
                this.props.createproject.step = 2;
                this.props.history.replace('/project/' + projectId);
            }
        }
    }
    public componentWillUnmount()
    {
        this.props.createproject.step = 1;
        this.props.createproject.stepOneStatus = 1;
        this.props.createproject.stepTwoStatus = 0;
        this.props.createproject.stepThreeStatus = 0;
    }
    public render()
    {
        if (this.state.isEdit && !this.props.createproject.createContent.projId)
        {
            return null;
        }
        const oneClassName = classnames('step-tab',
            { 'edit-tab': this.props.createproject.step === 1 ? true : false },
            { 'success-tab': this.props.createproject.stepOneStatus === 2 ? true : false }
        );
        const twoClassName = classnames('step-tab',
            { 'disable-tab': this.props.createproject.stepTwoStatus === 0 ? true : false },
            { 'edit-tab': this.props.createproject.step === 2 ? true : false },
            { 'success-tab': this.props.createproject.stepTwoStatus === 2 ? true : false }
        );
        const threeClassName = classnames('step-tab',
            { 'disable-tab': this.props.createproject.stepTwoStatus === 0 ? true : false },
            { 'edit-tab': this.props.createproject.step === 3 ? true : false },
            { 'success-tab': this.props.createproject.stepThreeStatus === 2 ? true : false }
        );
        const isCanApply = (this.props.createproject.stepOneStatus === 2 && this.props.createproject.stepTwoStatus === 2 && this.props.createproject.stepThreeStatus === 2) ? true : false
        return (
            <>
                <h3 className="right-title">{this.intrl.edit.editinfo}</h3>
                <div className="right-apply-btn">
                    {
                        (this.props.createproject.createContent.projSubState === ProjSubState.Init || this.props.createproject.createContent.projSubState === ProjSubState.Modify) && <Button text={this.intrl.btn.submit} btnColor={isCanApply ? '' : "gray-btn"} onClick={this.handleCommitProject} />
                    }
                    {
                        this.props.createproject.createContent.projSubState === ProjSubState.Auditing && <Button text={this.intrl.btn.review} btnColor="gray-btn" />
                    }
                </div>
                <div className="right-tab">
                    <div className={oneClassName} onClick={this.handleEditStep.bind(this, 1)}>
                        <span className="step-span">{this.intrl.edit.step1}</span>
                    </div>
                    <div className={twoClassName} onClick={this.handleEditStep.bind(this, 2)}>
                        <span className="step-span">{this.intrl.edit.step2}</span>
                    </div>
                    <div className={threeClassName} onClick={this.handleEditStep.bind(this, 3)}>
                        <span className="step-span">{this.intrl.edit.step3}</span>
                    </div>
                </div>

                {this.props.createproject.step === 1 && <StepOne {...this.props} />}
                {this.props.createproject.step === 2 && <StepTwo {...this.props} />}
                {this.props.createproject.step === 3 && <StepThree {...this.props} />}
            </>
        );
    }
    // 编辑步骤
    private handleEditStep = (number: number) =>
    {
        if (number === 2)
        {
            if (this.props.createproject.stepTwoStatus === 0)
            {
                return
            }
        }
        else if (number === 3)
        {
            if (this.props.createproject.stepThreeStatus === 0)
            {
                return
            }
        }
        this.props.createproject.step = number;
    }
    private handleCommitProject = async () =>
    {
        if ((this.props.createproject.stepOneStatus !== 2 || this.props.createproject.stepTwoStatus !== 2 || this.props.createproject.stepThreeStatus !== 2))
        {
            return false
        }
        await this.props.createproject.commitProjectAudit();
        const projectId = this.props.match.params.projectId;
        if (projectId)
        {
            this.props.createproject.getProject(projectId);
        }
        return true
    }
}

export default injectIntl(CreateProject);