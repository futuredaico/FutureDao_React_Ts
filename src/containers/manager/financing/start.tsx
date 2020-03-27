/**
 * 启动融资
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
import Select from '@/components/select';
import { IProjectProps } from '../interface/project.interface';
import Hint from '@/components/hint';
import { saveDecimal } from '@/utils/numberTool';


interface IState
{
    selectAddress: string, // 选择融资接收地址
    receiveAddress: string,// 融资地址的输入
    reAddressFlag: boolean, // 融资地址的检查
    tokenType: number, // 默认没有为0，融资代币只有1种为1，不止一种为2，
    tokenShow: string, // 融资代币输入框显示
    tokenAddress: string, // 代币hash
    tokenFlag: boolean, // 代币的验证
    tokenName: string,// 代币名称    
    tokenSimpleName: string, // 代币简称
    reserveRatio: string // 储存比例
    everyMonthRatio: string // 每月转入比例
    mixPrice: string, // 最小转入金额
    maxPrice: string // 最大转入金额
    assetSimple:string, // 金额的单位
    isOkGoing:boolean, // 是否可启动融资
}

@observer
class StartFinancing extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        selectAddress: '',
        receiveAddress: '',
        reAddressFlag: true,
        tokenType: 0,
        tokenShow: '',
        tokenAddress: '',
        tokenFlag: true,
        tokenName: '',
        tokenSimpleName: '',
        reserveRatio: '',
        everyMonthRatio: '',
        mixPrice: '',
        maxPrice: '',
        assetSimple:'其他',
        isOkGoing:false
    }
    public async componentDidMount()
    {
        await this.props.financing.getContractList();
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
                        this.state.selectAddress === '1' && <Input value={this.state.receiveAddress} onChange={this.handleChangeReceiveAddress} className="margintop-input" />
                    }
                    {
                        (this.state.receiveAddress && !this.state.reAddressFlag) && <span className="err-span">请输入正确的代币接收地址</span>
                    }
                </div>
                <div className="inline-title">
                    <strong>融资代币</strong>
                </div>
                {
                    this.props.financing.assetList ? (
                        <>
                            {
                                this.props.financing.assetList.count > 1 ? (
                                    <>
                                        <Select
                                            options={this.props.financing.assetOption}
                                            text=''
                                            onCallback={this.onSelletFinanceAsset}
                                        />
                                    </>
                                )
                                    : (
                                        <div className="inline-enter">
                                            <Input value={this.state.tokenShow} readOnly={true} />
                                        </div>
                                    )
                            }
                        </>
                    )
                        : (
                            <div className="inline-enter">
                                <Input value={this.state.tokenShow} onChange={this.handleToChangeToken} />
                                {
                                    (this.state.tokenAddress && !this.state.tokenFlag) && <span className="err-span">输入正确的代币哈希</span>
                                }
                            </div>
                        )
                }
                {/* <div className="inline-enter">
                    <Input value={this.state.tokenShow} onChange={this.handleToChangeToken} />
                </div> */}

                <div className="title-cut">
                    <strong>项目代币</strong>
                </div>
                <div className="inline-title">
                    <strong>代币名称</strong>&nbsp;&nbsp;
                    <span className="tips-text">（ 为您的项目代币起个名称，例如 Bitcoin ）</span>
                </div>
                <div className="inline-enter">
                    <Input maxLength={20} value={this.state.tokenName} onChange={this.handleToChangeTokenName} />
                </div>
                <div className="inline-title">
                    <strong>代币符号</strong>&nbsp;&nbsp;
                    <span className="tips-text">（ 您的项目代币的单位符号，尽量使用大写字母，例如BTC ）</span>
                </div>
                <div className="inline-enter">
                    <Input maxLength={20} value={this.state.tokenSimpleName} onChange={this.handleToChangeTokenSimpleName} />
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
                    <Input maxLength={30} suffix="%" className="ss-input" value={this.state.reserveRatio} onChange={this.handleToChangeReserveRatio} />
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
                            <Input maxLength={30} suffix="%" className="ss-input" onChange={this.handleToChangeEveryRatio} />
                        </div>
                        <div className="inline-title">
                            <strong>最少转入金额</strong>&nbsp;&nbsp;
                        <span className="tips-text">（ 每月最少从募集资金池中转入多少资金。每月转入量小于最少转入量时，按最小转入量计算。 ）</span>
                        </div>
                        <div className="inline-enter">
                            <Input maxLength={30} suffix="ETH" onChange={this.handleToChangeMixPrice} />
                        </div>
                        <div className="inline-title">
                            <strong>最大转入金额</strong>&nbsp;&nbsp;
                        <span className="tips-text">（ 每月最多从募集资金池中转入多少资金。每月转入量大于最大转入量时，按最大转入量计算。 ）</span>
                        </div>
                        <div className="inline-enter">
                            <Input maxLength={30} suffix="ETH" onChange={this.handleToChangeMaxPrice} />
                        </div>
                    </div>
                </div>
                <div className="inline-btn">
                    <Button
                        text="启动融资"
                        btnSize="bg-btn"
                        btnColor={!this.state.isOkGoing ? 'gray-btn' : ''}
                        onClick={this.handelToStartFinancing}
                    />
                </div>
            </>
        );
    }
    // 选择接收地址
    private onSelletCallback = async (item) =>
    {
        console.log(item);
        // console.log(opt)
        // todo
        this.setState({
            selectAddress: item.id,
            receiveAddress: item.id === '1' ? '' : item.id
        })
        if (item.id !== '1')
        {
            this.setState({
                reAddressFlag: true
            })
            this.props.financing.molochId = item.projId;
            // 获取融资接收的代币
            await this.props.financing.getMolochAsset(item.projId);
            // 如果是单资产
            if (this.props.financing.assetList && this.props.financing.assetList.count === 1)
            {
                this.setState({
                    tokenShow: this.props.financing.assetOption[0].name,
                    tokenAddress: this.props.financing.assetOption[0].id,
                    assetSimple:this.props.financing.assetOption[0].simplename,
                    tokenFlag: true
                })
            }
        } else
        {
            this.props.financing.assetList = null;
            this.props.financing.assetOption = [];
            this.setState({
                tokenShow: '',
                tokenAddress: '',
                assetSimple:'其他',
                tokenFlag: true
            })
        }
    }
    // 接收地址的输入
    private handleChangeReceiveAddress = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        //
        const inputStr = ev.target.value.trim();
        this.setState({
            receiveAddress: inputStr,
        }, () =>
        {
            const res = this.handleChangeHashByMetamask(this.state.receiveAddress);
            this.setState({
                reAddressFlag: res
            })
        })
    }
    // 校验地址或hash的输入
    private handleChangeHashByMetamask = (addr: string) =>
    {
        return web3.isAddress(addr);
    }
    // 融资代币的输入
    private handleToChangeToken = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const inputStr = ev.target.value.trim();
        this.setState({
            tokenAddress: inputStr
        }, () =>
        {
            const res = this.handleChangeHashByMetamask(this.state.tokenAddress);
            this.setState({
                tokenFlag: res
            })
        })
    }
    // 融资代币的选择
    private onSelletFinanceAsset = (item) =>
    {
        console.log(item);
        // console.log(opt)
        // todo
        this.setState({
            tokenAddress: item.id
        })

    }
    // 代币名称的输入
    private handleToChangeTokenName = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const inputStr = ev.target.value.trim().replace(/[\u4e00-\u9fa5]/ig, '').replace(/[^\w\.\/]/ig, '');
        console.log(inputStr.length)
        this.setState({
            tokenName: inputStr.length > 21 ? inputStr.substring(0, 19) : inputStr
        })
    }
    // 代币简称的输入
    private handleToChangeTokenSimpleName = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const inputStr = ev.target.value.trim().replace(/[\u4e00-\u9fa5]/ig, '').replace(/[^\w\.\/]/ig, '');
        this.setState({
            tokenSimpleName: inputStr
        })
    }
    // 储备池比例的输入
    private handleToChangeReserveRatio = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = ev.target.value as unknown as number;
        if (isNaN(value)) {
            return false;
        }
        
        if (value <0 || value>99) {
            return false
        }
        this.setState({
            reserveRatio:parseInt(ev.target.value,10).toString()
        })
        return true
    }
    // 每月转入比例
    private handleToChangeEveryRatio = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = ev.target.value as unknown as number;
        if (isNaN(value)) {
            return false;
        }
        
        if (value <0 || value>100) {
            return false
        }
        this.setState({
            reserveRatio:parseInt(ev.target.value,10).toString()
        })
        return true
    }
    // 最少转入金额
    private handleToChangeMixPrice = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = ev.target.value as unknown as number;
        if (isNaN(value)) {
            return false;
        }
        this.setState({
            reserveRatio:saveDecimal(value.toString(), 2)
        })
        return true
    }
    // 最大转入金额
    private handleToChangeMaxPrice = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = ev.target.value as unknown as number;
        if (isNaN(value)) {
            return false;
        }        
        this.setState({
            reserveRatio:saveDecimal(value.toString(), 2)
        })
        return true
    }
    private handelToStartFinancing =async ()=>{
        // todo
        console.log("start")
        const res = await this.props.metamaskwallet.inintWeb3();
        if(res){
            this.props.financing.startFanincingProject();
        }
        
    }
}

export default injectIntl(StartFinancing);
