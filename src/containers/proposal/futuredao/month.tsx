/**
 * 发布提案
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
// import classnames from 'classnames';
// import { getQueryString } from '@/utils/function';
import { IFutureProposalProps } from './interface/future.interface';
import { saveDecimal } from '@/utils/numberTool';
export interface IState
{
    projId: string,
    ratio: string,
    minPrice: string,
    maxPrice: string,
    explain: string,
    isOkSend: boolean
}
@inject('future')
@observer
class MonthProposal extends React.Component<IFutureProposalProps, IState> {
    public state: IState = {
        projId: '',
        ratio: '',
        minPrice: '',
        maxPrice: '',
        explain: '',
        isOkSend: false
    }
    public async componentDidMount()
    {

        const projectId = this.props.match.params['projectId'];
        console.log(projectId)
        await this.props.future.getFContractInfoData(projectId);
        this.setState({
            projId: projectId || '',
            ratio: this.props.future.fContractInfo ? this.props.future.fContractInfo.faucetJA[0].percent : '',
            minPrice:  this.props.future.fContractInfo ? this.props.future.fContractInfo.faucetJA[0].min.toString() : '',
            maxPrice:  this.props.future.fContractInfo ? this.props.future.fContractInfo.faucetJA[0].max.toString() : ''
        })
    }
    public render()
    {
        if (!this.props.future.fContractInfo)
        {
            return null
        }
        return (
            <>
                <div className="proposal-top">
                    <h2>修改项目月供额度</h2>
                </div>
                <div className="proposal-content">
                    <div className="inline-title">
                        <strong>项目月供比例</strong>
                    </div>
                    <div className="inline-enter">
                        <Input
                            className="month-input"
                            value={this.state.ratio}
                            suffix="%"
                            onChange={this.handleToChangeEveryMonthRatio}
                        />
                    </div>
                    <div className="inline-title">
                        <strong>最小发放金额</strong>
                    </div>
                    <div className="inline-enter">
                        <Input
                            className="month-input"
                            value={this.state.minPrice}
                            suffix={this.props.future.fContractInfo.fundSymbol.toLocaleUpperCase()}
                            onChange={this.handleToChangeMonthMixPrice}
                        />
                    </div>
                    <div className="inline-title">
                        <strong>最大发放金额</strong>
                    </div>
                    <div className="inline-enter">
                        <Input
                            className="month-input"
                            value={this.state.maxPrice}
                            suffix={this.props.future.fContractInfo.fundSymbol.toLocaleUpperCase()}
                            onChange={this.handleToChangeMonthMaxPrice}
                        />
                    </div>
                    <div className="inline-title">
                        <strong>补充说明</strong>
                    </div>
                    <div className="inline-enter">
                        <textarea
                            className="future-textarea"
                            value={this.state.explain}
                            maxLength={400}
                            onChange={this.handleChangeExplain}
                        />
                    </div>
                    <div className="inline-btn">
                        <Button
                            text="发起提案"
                            btnSize="bg-btn"
                            btnColor="gray-btn"
                            onClick={this.handleToSendMonthProposal}
                        />
                    </div>
                </div>

            </>
        );
    }
    private handleToSendMonthProposal = ()=>{
        //
    }
    // 每月转入比例
    private handleToChangeEveryMonthRatio = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        // 只能输入数字，整数
        const value = ev.target.value as unknown as number;
        const reg = /^[0-9]*[1-9][0-9]*$/;
        if (value.toString().length > 0)
        {
            if (isNaN(value))
            {
                return false;
            }
            if (!reg.test(ev.target.value))
            {
                return false;
            }
            if (value < 0 || value > 100)
            {
                return false
            }
        }

        this.setState({
            ratio: value.toString()
        }, () =>
        {
            this.handleToCheckChangeInput();
        })
        return true
    }
    // 最少转入金额
    private handleToChangeMonthMixPrice = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        // 只能输入数字,小数点后2位
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        this.setState({
            minPrice: saveDecimal(value.toString(), 2)
        }, () =>
        {
            this.handleToCheckChangeInput();
        })
        return true
    }
    // 最大转入金额
    private handleToChangeMonthMaxPrice = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        // 只能输入数字,小数点后2位
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        this.setState({
            maxPrice: saveDecimal(value.toString(), 2)
        }, () =>
        {
            this.handleToCheckChangeInput();
        })
        return true
    }
    // 补充说明
    private handleChangeExplain = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        this.setState({
            explain: ev.target.value
        }, () =>
        {
            this.handleToCheckChangeInput();
        })
    }
    // 校验所有输入
    private handleToCheckChangeInput = () =>
    {
        let isOk = true;
        if (!this.state.ratio)
        {
            isOk = false;
        }
        if (!this.state.minPrice)
        {
            isOk = false;
        }
        if (!this.state.maxPrice)
        {
            isOk = false;
        }
        if (parseFloat(this.state.maxPrice) < parseFloat(this.state.minPrice))
        {
            isOk = false;
        }
        this.setState({
            isOkSend: isOk
        })
    }
}

export default injectIntl(MonthProposal);
