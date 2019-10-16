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
import { IFinancingProps } from '../interface/financing.interface'
// import { ProjSubState } from '@/store/interface/common.interface';
// import { getQueryString } from '@/utils/function'


@inject('financing', 'common', 'project', 'personedit', 'teemowallet', 'metamaskwallet')
@observer
class FinancingManager extends React.Component<IFinancingProps, any> {
    public intrl = this.props.intl.messages;
    public async componentDidMount()
    {
            const res = await this.props.financing.getContractData();
            if (!res)
            {
                //
            }
            console.log(res)
        
    }
    public render()
    {
        const oneClassName = classnames('step-tab',
            { 'edit-tab': this.props.financing.step === 1 ? true : false },
            { 'success-tab': this.props.financing.stepOneStatus === 2 ? true : false }
        );
        const twoClassName = classnames('step-tab',
            { 'disable-tab': this.props.financing.stepTwoStatus === 0 ? true : false },
            { 'edit-tab': this.props.financing.step === 2 ? true : false },
            { 'success-tab': this.props.financing.stepTwoStatus === 2 ? true : false }
        );
        const threeClassName = classnames('step-tab',
            { 'disable-tab': this.props.financing.stepTwoStatus === 0 ? true : false },
            { 'edit-tab': this.props.financing.step === 3 ? true : false },
            { 'success-tab': this.props.financing.stepThreeStatus === 2 ? true : false }
        );
        // const isCanApply = (this.props.financing.stepOneStatus === 2 && this.props.financing.stepTwoStatus === 2 && this.props.financing.stepThreeStatus === 2) ? true : false
        return (
            <>
                <h3 className="right-title">融资管理</h3>
                <div className="right-apply-btn">
                    <Button text="启动融资" btnColor="gray-btn" />
                </div>
                <div className="right-tab">
                    <div className={oneClassName} onClick={this.handleEditStep.bind(this, 1)}>
                        <span className="step-span">部署合约</span>
                    </div>
                    <div className={twoClassName} onClick={this.handleEditStep.bind(this, 2)}>
                        <span className="step-span">设置回报</span>
                    </div>
                    <div className={threeClassName} onClick={this.handleEditStep.bind(this, 3)}>
                        <span className="step-span">融资信息</span>
                    </div>
                </div>

                {this.props.financing.step === 1 && <StepOne {...this.props} />}
                {this.props.financing.step === 2 && <StepTwo {...this.props} />}
                {this.props.financing.step === 3 && <StepThree {...this.props} />}
            </>
        );
    }
    // 编辑步骤
    private handleEditStep = (number: number) =>
    {
        // if (number === 2)
        // {
        //     if (this.props.financing.stepTwoStatus === 0)
        //     {
        //         return
        //     }
        // }
        // else if (number === 3)
        // {
        //     if (this.props.financing.stepThreeStatus === 0)
        //     {
        //         return
        //     }
        // }
        this.props.financing.step = number;
    }

}

export default injectIntl(FinancingManager);
