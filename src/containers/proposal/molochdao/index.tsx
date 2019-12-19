/**
 * 发布提案
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input, Spin, Icon } from 'antd';
import Button from '@/components/Button';
// import classnames from 'classnames';
// import { getQueryString } from '@/utils/function';
// import Select from '@/components/select';
import TextArea from 'antd/lib/input/TextArea';
import { IMolochProposalProps } from './interface/index.interface';
import { saveDecimal } from '@/utils/numberTool';

interface IState
{
    isDoingSave: boolean,// 是否正在发布
    tianName: string,  // 提案名称
    tianDes: string,  // 提案详情
    tianAddress: string, // 提案股份申请人
    tianAddrBtn: boolean, // 地址的格式确认
    tianRequire: string,   // 申请股份
    tianContribution: string // 贡献资金
    canSendFlag: boolean, // 是否可发起提案
}

@inject('index','common','metamaskwallet')
@observer
class MolochProposal extends React.Component<IMolochProposalProps, IState> {
    public state = {
        isDoingSave: false,
        tianName: '',
        tianDes: '',
        tianAddress: '',
        tianAddrBtn: true,
        tianRequire: '',
        tianContribution: '',
        canSendFlag: false
    }
    // private assetOption = [
    //     {
    //         id: "1",
    //         name: 'ETH'
    //     },
    //     {
    //         id: "2",
    //         name: 'DAI'
    //     }
    // ]

    public componentDidMount()
    {
        const projectId =this.props.match.params['projectId'];
        this.props.index.getFundData(projectId);
    }
    public render()
    {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} />;
        return (
            <div className="proposal-page">
                <div className="proposal-wrapper">
                    <div className="proposal-top">
                        <h2>发起MolochoDao提案</h2>
                    </div>
                    <div className="proposal-content">
                        <div className="inline-title">
                            <strong>提案名称</strong>&nbsp;
                        <span className="red-type">*</span>
                        </div>
                        <div className="inline-enter">
                            <Input maxLength={40} value={this.state.tianName} onChange={this.handleChangeTianName} />
                        </div>
                        <div className="inline-title">
                            <strong>提案详情</strong>&nbsp;
                            <span className="red-type">*</span>
                            <span className="tips-text">（ 提案详情将上链。内容过多时建议您使用云文档，并将文档链接粘贴此处。 ）</span>
                        </div>
                        <div className="inline-enter">
                            <TextArea maxLength={400} className="nosize-textarea" value={this.state.tianDes} onChange={this.handleChangeTianDes} />
                        </div>
                        <div className="inline-title">
                            <strong>股份申请人</strong>&nbsp;
                            <span className="red-type">*</span>
                            <span className="tips-text">（ 申请到的股份将发到此地址。 ）</span>
                        </div>
                        <div className="inline-enter">
                            <Input value={this.state.tianAddress} onChange={this.handleChangeTianAddress} />
                        </div>
                        <div className="inline-title">
                            <strong>申请股份</strong>&nbsp;
                            <span className="red-type">*</span>
                        </div>
                        <div className="inline-enter">
                            <Input className="sort-inputtext" value={this.state.tianRequire} onChange={this.handleChangeTianRequire} />
                        </div>
                        <div className="inline-title">
                            <strong>贡献资金</strong>&nbsp;
                            <span className="red-type">*</span>
                            <span className="tips-text">（ 如果股份申请人非您本人，则需要提前发送授权交易，否则提案将失败。 ）</span>
                        </div>
                        <div className="inline-enter">
                            <Input className="sort-inputtext" suffix={this.props.index.fundSymbol.toLocaleUpperCase()} value={this.state.tianContribution} onChange={this.handleChangeTianContribution} />
                            {/* <div className="sort-select">
                                <Select options={this.assetOption} text='' onCallback={this.handleChoiceProposalType} defaultValue={this.state.assetType} />
                            </div> */}
                        </div>
                        <div className="inline-btn">
                            <Button
                                text="发起预发布提案"
                                btnSize="bg-btn"
                                btnColor={this.state.canSendFlag ? "" : "gray-btn"}
                                onClick={this.handleSendProposal}
                            />
                        </div>
                    </div>
                </div>
                {
                    this.state.isDoingSave && (
                        <div className="going-on-wrapper">
                            <div className="going-on-content going-on-edit">
                                <strong className="going-bigtext">正在发布molochoDAO合约</strong>
                                <div className="loading-going">
                                    <Spin indicator={antIcon} size="small" />
                                    <span>请等待...</span>
                                </div>
                                <p className="going-p">处理这些事物可能需要较长时间，取决于网络状态处理期间请勿关闭本页</p>

                                {/* <div className="done-going">
                        <img src={require("@/img/done.png")} alt="" />
                        <span>成功！</span>
                      </div> */}

                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
    // 提案名称的输入
    private handleChangeTianName = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            tianName: ev.target.value
        }, () =>
        {
            this.checkAllInput()
        })
    }
    // 提案详情的输入
    private handleChangeTianDes = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        this.setState({
            tianDes: ev.target.value
        }, () =>
        {
            this.checkAllInput()
        })
    }
    // 股份申请人的输入
    private handleChangeTianAddress = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            tianAddress: ev.target.value
        }, () =>
        {
            this.handleChangeAddrByMetamask()
        })
    }
    // 地址格式验证
    private handleChangeAddrByMetamask = () =>
    {
        const res = web3.isAddress(this.state.tianAddress);
        this.setState({
            tianAddrBtn: res
        }, () =>
        {
            this.checkAllInput()
        })
    }
    // 申请股份的输入，限正整数
    private handleChangeTianRequire = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        const reg = /^[0-9]*[1-9][0-9]*$/;
        if (value.toString().length > 0)
        {
            if (!reg.test(ev.target.value))
            {
                return false;
            }
        }
        this.setState({
            tianRequire: value.toString()
        }, () =>
        {
            this.checkAllInput()
        })
        return true
    }
    // 贡献资金的输入
    private handleChangeTianContribution = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        // 限制小数点后4位
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        this.setState({
            tianContribution: saveDecimal(value.toString(),4)
        }, () =>
        {
            this.checkAllInput()
        })
        return true
    }
    // 发起提案
    private handleSendProposal = async () =>
    {
        if(!this.state.canSendFlag||!this.props.common.userInfo){
            return false;
        }
        await this.props.metamaskwallet.inintWeb3();
        // 0x2BFb7857eC7238AA84a830342Fa53fE0FEF7FeF5
        const fiveNum = parseFloat(this.state.tianContribution);
        const requireNum = parseInt(this.state.tianRequire,10);
        const tianStr = {
            title:this.state.tianName,
            description:this.state.tianDes
        }
        this.setState({
            isDoingSave: true
        })
        console.log(JSON.stringify(tianStr))
        await this.props.index.applyProposal(this.state.tianAddress,fiveNum,requireNum,JSON.stringify(tianStr),this.props.common.userInfo.address,()=>{
            this.props.common.openNotificationWithIcon('success','操作','确认')
        });
        
        this.initData();
        return true;
    }
    private checkAllInput = () =>
    {
        let isOk = true;
        if (!this.state.tianName)
        {
            isOk = false;
        }
        if (!this.state.tianDes)
        {
            isOk = false;
        }
        if (!this.state.tianAddrBtn)
        {
            isOk = false;
        }
        if (!this.state.tianRequire)
        {
            isOk = false;
        }
        if (!this.state.tianContribution)
        {
            isOk = false;
        }
        this.setState({
            canSendFlag: isOk
        })
    }
    // 初始化输入框
    private initData = () => {
        this.setState({
            tianName: '',
            tianDes: '',
            tianAddress: '',
            tianAddrBtn: false,
            tianRequire: '',
            tianContribution: '',
            canSendFlag: false
        })
    }
}

export default injectIntl(MolochProposal);
