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
import { ICreateProjectProps } from './interface/createproject.interface'

@inject('createproject')
@observer
class CreateProject extends React.Component<ICreateProjectProps, any> {
    
    public render()
    {
        return (
            <>
                <h3 className="right-title">编辑项目资料</h3>
                <div className="right-apply-btn">
                    <Button text="提交" />
                    <Button text="审核中" btnColor="gray-btn" />
                </div>
                <div className="right-tab">
                    <div className="step-tab edit-tab" onClick={this.handleEditStep.bind(this, 1)}>
                        <span className="step-span">基础信息</span>
                    </div>
                    <div className="step-tab disable-tab" onClick={this.handleEditStep.bind(this, 2)}>
                        <span className="step-span">详细信息</span>
                    </div>
                    {/* success-tab */}
                    <div className="step-tab disable-tab" onClick={this.handleEditStep.bind(this, 3)}>
                        <span className="step-span">团队信息</span>
                    </div>
                </div>
                {this.props.createproject.step === 1 && <StepOne />}
                {this.props.createproject.step === 2 && <StepTwo />}
                {this.props.createproject.step === 3 && <StepThree />}
            </>
        );
    }
    // 编辑步骤
    private handleEditStep = (number: number) =>
    {
        this.props.createproject.step = number
    }
}

export default injectIntl(CreateProject);
