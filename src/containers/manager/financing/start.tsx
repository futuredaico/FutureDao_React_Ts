/**
 * 启动融资
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
// import Button from '@/components/Button';
import { Input } from 'antd';
import Select from '@/components/select';
import { IProjectProps } from '../interface/project.interface';
import Hint from '@/components/hint';


interface IState
{
    selectAddress: string, // 选择融资接收地址
    receiveAddress: string,// 融资地址的输入
    reAddressFlag: boolean, // 融资地址的检查
    tokenAddress: string, // 代币hash
    tokenFlag:boolean, // 代币的验证
    tokenName:string,// 代币名称
    tokenSimpleName:string, // 代币简称
    reserveRatio: string // 储存比例
}

@observer
class StartFinancing extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        selectAddress: '',
        receiveAddress: '',
        reAddressFlag: true,
        tokenAddress: '',
        tokenFlag:true,
        tokenName:'',
        tokenSimpleName:'',
        reserveRatio: ''
    }
    // private assetOption = [
    //     {
    //         id: '1',
    //         name: '其他',
    //     }
    // ]
    public async componentDidMount()
    {
        await this.props.financing.getContractList();
        // if(this.props.financing.contractList.length>0){

        //     const arrList = this.props.financing.contractList.map((item:IContractAddress)=>{
        //         return {
        //             id:item.molochHash,
        //             name:item.projName+" "+item.molochHash
        //         }
        //     })
        //     console.log(arrList)
        //     this.assetOption=[...this.assetOption,...arrList]
        //     console.log(this.assetOption)
        // }
    }
    public render()
    {

        return (
            <>
                <div className="title-cut">
                    <strong>融资设置</strong>
                </div>
                {/* 融资代币接收地址 */}
                <div className="inline-title first-title">
                    <strong>融资代币接收地址</strong>
                </div>
                <div className="inline-enter">
                    <Select
                        options={this.props.financing.contractList}
                        text=''
                        onCallback={this.onSelletCallback}
                    />
                    {
                        this.state.selectAddress === '1' && <Input maxLength={30} value={this.state.receiveAddress} onChange={this.handleChangeReceiveAddress} />
                    }
                    {
                        (this.state.receiveAddress && !this.state.reAddressFlag) && <span className="err-span">请输入正确的代币接收地址</span>
                    }
                </div>
                <div className="inline-title">
                    <strong>融资代币</strong>
                </div>
                <div className="inline-enter">
                    <Input maxLength={30} />
                </div>
                <div className="title-cut">
                    <strong>项目代币</strong>
                </div>
                <div className="inline-title">
                    <strong>代币名称</strong>&nbsp;&nbsp;
                    <span className="tips-text">（ 为您的项目代币起个名称，例如 Bitcoin ）</span>
                </div>
                <div className="inline-enter">
                    <Input maxLength={20} />
                </div>
                <div className="inline-title">
                    <strong>代币符号</strong>&nbsp;&nbsp;
                    <span className="tips-text">（ 您的项目代币的单位符号，尽量使用大写字母，例如BTC ）</span>
                </div>
                <div className="inline-enter">
                    <Input maxLength={20} />
                </div>
                <div className="title-cut">
                    <strong>投资设置</strong>
                    <Hint
                        text="投资者的投资资金一部分会作为发行项目代币的储备金进入储备资金池中，一部分会作为支持项目的资金进入已募集资金池中。已募集资金池中的代币会按月转给项目组。"
                        hintType="right-hint"
                    />
                </div>
                <div className="inline-title">
                    <strong>储备比例</strong>&nbsp;&nbsp;
                    <span className="tips-text">（ 投资资金进入储备池的比例。储备比例越高，代币买入、卖出价差越小，对投资者吸引力变大，但项目组可调用的资金将变少。 ）</span>
                </div>
                <div className="inline-enter">
                    <Input maxLength={30} suffix="%" className="ss-input" />
                </div>
                <div className="inline-title">
                    <strong>水龙头设置</strong>
                </div>
                <div className="inline-enter">
                    <div className="financinggray-box">
                        <div className="inline-title">
                            <strong>每月转入比例</strong>&nbsp;&nbsp;
                        <span className="tips-text">（ 每月从募集资金池中转入当前资金池余额百分比的资金到项目组 ）</span>
                        </div>
                        <div className="inline-enter">
                            <Input maxLength={30} suffix="%" className="ss-input" />
                        </div>
                        <div className="inline-title">
                            <strong>最少转入金额</strong>&nbsp;&nbsp;
                        <span className="tips-text">（ 每月最少从募集资金池中转入多少资金。每月转入量小于最少转入量时，按最小转入量计算。 ）</span>
                        </div>
                        <div className="inline-enter">
                            <Input maxLength={30} suffix="ETH" />
                        </div>
                        <div className="inline-title">
                            <strong>最大转入金额</strong>&nbsp;&nbsp;
                        <span className="tips-text">（ 每月最多从募集资金池中转入多少资金。每月转入量大于最大转入量时，按最大转入量计算。 ）</span>
                        </div>
                        <div className="inline-enter">
                            <Input maxLength={30} suffix="ETH" />
                        </div>
                    </div>
                </div>
                <div className="inline-title" />
            </>
        );
    }
    // 选择接收地址
    private onSelletCallback = (item) =>
    {
        console.log(item);
        // console.log(opt)
        // todo
        this.setState({
            selectAddress: item.id,
            receiveAddress: item.id === '1' ? '' : item.id
        })
        if(item.id!=='1'){
            this.props.financing.molochId = item.projId;
            this.props.financing.getMolochAsset(item.projId)
        }
    }
    // 接收地址的输入
    private handleChangeReceiveAddress = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        //
        const inputStr = ev.target.value.trim();
        this.setState({
            receiveAddress: inputStr,
            reAddressFlag: true
        })
    }
    // 校验地址的输入
}

export default injectIntl(StartFinancing);
