/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import StepOne from './stepone';
import StepTwo from './steptwo';
import Button from '@/components/Button';
import StepThree from './stepthree';
import classnames from 'classnames';
import { ICreateProjectProps } from './interface/createproject.interface'

@inject('createproject','common')
@observer
class CreateProject extends React.Component<ICreateProjectProps, any> {
    // public state = {
    //     stepOneStatus: 1, // 基础信息完成状态，0不可编辑，1正在编辑，2已编辑完成
    //     stepTwoStatus: 0, // 详细信息完成状态，0不可编辑，1正在编辑，2已编辑完成
    //     stepThreeStatus: 0  // 详细信息完成状态，0不可编辑，1正在编辑，2已编辑完成
    // }
    public componentDidMount()
    {
        // 区分是新建项目还是管理项目
        const params = this.props.match.params;
        const projectId =params["projectId"];
        if(projectId!=='create'){
            this.props.createproject.getProject(projectId)
        }
    }
    public render()
    {
        const oneClassName = classnames('step-tab',
            { 'edit-tab': this.props.createproject.step === 1 },
            { 'success-tab': this.props.createproject.stepOneStatus === 2 }
        );
        const twoClassName = classnames('step-tab',
            { 'disable-tab': this.props.createproject.stepTwoStatus === 0 },
            { 'edit-tab': this.props.createproject.step === 2 },
            { 'success-tab': this.props.createproject.stepTwoStatus === 2 }
        );
        const threeClassName = classnames('step-tab',
            { 'disable-tab': this.props.createproject.stepTwoStatus === 0 },
            { 'edit-tab': this.props.createproject.step === 3 },
            { 'success-tab': this.props.createproject.stepThreeStatus === 2 }
        );

        return (
            <>
                <h3 className="right-title">编辑项目资料</h3>
                <div className="right-apply-btn">
                    <Button text="提交" />
                    <Button text="审核中" btnColor="gray-btn" />
                </div>
                <div className="right-tab">
                    <div className={oneClassName} onClick={this.handleEditStep.bind(this, 1)}>
                        <span className="step-span">基础信息</span>
                    </div>
                    <div className={twoClassName} onClick={this.handleEditStep.bind(this, 2)}>
                        <span className="step-span">详细信息</span>
                    </div>
                    {/* success-tab */}
                    <div className={threeClassName} onClick={this.handleEditStep.bind(this, 3)}>
                        <span className="step-span">团队信息</span>
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
        // if(number ===1){
        //     this.props.createproject.stepOneStatus = 1;
        //     if (this.props.createproject.stepTwoStatus !== 0)
        //     {
        //         this.props.createproject.stepTwoStatus = 3;
        //     }
            
        //     if (this.props.createproject.stepThreeStatus !== 0)
        //     {
        //         this.props.createproject.stepThreeStatus = 3;
        //     }
        // }
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
}

export default injectIntl(CreateProject);
