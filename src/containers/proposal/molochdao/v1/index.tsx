/**
 * 发布提案
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
// import classnames from 'classnames';
// import { getQueryString } from '@/utils/function';
// import Select from '@/components/select';
import TextArea from 'antd/lib/input/TextArea';
import { saveDecimal } from '@/utils/numberTool';
import { IContractHash } from '@/containers/projectinfo/molochdao/interface/molochmanager.interface';
import { when } from 'mobx';
import { IMolochProposalProps } from '../interface/index.interface';

interface IState
{
    isDoingSave: boolean,// 是否正在发布
    tianName: string,  // 提案名称
    tianDes: string,  // 提案详情
    tianAddress: string, // 提案股份申请人
    tianAddrBtn: boolean, // 地址的格式确认
    addErrMsg:string, // 地址错误提示
    tianRequire: string,   // 申请股份
    tianContribution: string // 贡献资金
    canSendFlag: boolean, // 是否可发起提案
}
@inject('index', 'common', 'metamaskwallet', 'molochmanager')
@observer
class MolochProposal extends React.Component<IMolochProposalProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isDoingSave: false,
        tianName: '',
        tianDes: '',
        tianAddress: '',
        tianAddrBtn: true,
        addErrMsg:"",
        tianRequire: '',
        tianContribution: '',
        canSendFlag: false,
    }
    public componentDidMount()
    {
        const projectId = this.props.match.params['projectId'];
        this.props.index.getDepositData(projectId);
        this.props.molochmanager.getContractInfo(projectId);
        when(
            () => !!this.props.common.userInfo,
            () => this.setState({
                tianAddress: this.props.common.userInfo ? this.props.common.userInfo.address : ''
            })
        )
    }
    public componentWillUnmount(){
        this.props.index.depositHash = ''; 
        this.props.index.depositSymbol = ''; 
        this.props.index.proposalFee = ''; 
        this.props.index.depositDecimals = 0; 
        this.props.index.fundList = []; 
        this.props.index.fundCount = 0; 
        this.props.index.fundOption=[];
    }
    public render()
    {
        return (
            <div className="proposal-page">
                <div className="proposal-wrapper">
                    <div className="proposal-top">
                        <h2>{this.intrl.proposal.title}</h2>
                    </div>
                    <div className="proposal-content">
                <div className="inline-title">
                    <strong>{this.intrl.proposal.name}</strong>&nbsp;
                        <span className="red-type">*</span>
                </div>
                <div className="inline-enter">
                    <Input maxLength={40} value={this.state.tianName} onChange={this.handleChangeTianName} />
                </div>
                <div className="inline-title">
                    <strong>{this.intrl.proposal.des}</strong>&nbsp;
                            <span className="red-type">*</span>
                    <span className="tips-text">{this.intrl.proposal.destips}</span>
                </div>
                <div className="inline-enter">
                    <TextArea maxLength={400} className="nosize-textarea" value={this.state.tianDes} onChange={this.handleChangeTianDes} />
                </div>
                <div className="inline-title">
                    <strong>{this.intrl.proposal.people}</strong>&nbsp;
                            <span className="red-type">*</span>
                    <span className="tips-text">{this.intrl.proposal.peopletips}</span>
                </div>
                <div className="inline-enter">
                    <Input value={this.state.tianAddress} onChange={this.handleChangeTianAddress} className={!this.state.tianAddrBtn ? "err-active" : ''} />
                    {
                        !this.state.tianAddrBtn && <span className="err-span">{this.state.addErrMsg}</span>
                    }
                </div>
                <div className="inline-title">
                    <strong>{this.intrl.proposal.require}</strong>&nbsp;
                            <span className="red-type">*</span>
                </div>
                <div className="inline-enter">
                    <Input className="sort-inputtext" value={this.state.tianRequire} onChange={this.handleChangeTianRequire} />
                </div>
                <div className="inline-title">
                    <strong>{this.intrl.proposal.gong}</strong>&nbsp;
                            <span className="red-type">*</span>
                    <span className="tips-text">{this.intrl.proposal.gongtips}</span>
                </div>
                <div className="inline-enter">
                    <Input className="sort-inputtext" suffix={this.props.index.depositSymbol.toLocaleUpperCase()} value={this.state.tianContribution} onChange={this.handleChangeTianContribution} />
                    {/* <div className="sort-select">
                                <Select options={this.assetOption} text='' onCallback={this.handleChoiceProposalType} defaultValue={this.state.assetType} />
                            </div> */}
                </div>
                <div className="inline-btn">
                    <Button
                        text={this.intrl.btn.proposal}
                        btnSize="bg-btn"
                        btnColor={this.state.canSendFlag ? "" : "gray-btn"}
                        onClick={this.handleSendProposal}
                    />
                </div>
            </div>
                </div>
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
            tianAddrBtn: res,
            addErrMsg:res?'':this.intrl.proposal.addrerr
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
            tianContribution: saveDecimal(value.toString(), 4)
        }, () =>
        {
            this.checkAllInput()
        })
        return true
    }
    // 发起提案
    private handleSendProposal = async () =>
    {
        if (!this.state.canSendFlag || !this.props.common.userInfo)
        {
            return false;
        }
        const res = await this.props.metamaskwallet.inintWeb3();
        if(!res){
            return false;
        }
        // 0x2BFb7857eC7238AA84a830342Fa53fE0FEF7FeF5
        const fiveNum = parseFloat(this.state.tianContribution);
        const requireNum = parseInt(this.state.tianRequire, 10);
        const tianStr = {
            title: this.state.tianName,
            description: this.state.tianDes
        }
        this.setState({
            isDoingSave: true
        })
        if (!this.props.molochmanager.contractInfo)
        {
            return false
        }
        let contractHash = '';
        this.props.molochmanager.contractInfo.contractHashs.map((item: IContractHash) =>
        {
            if (item.name === 'moloch')
            {
                contractHash = item.hash
            }
        })
        if (!contractHash)
        {
            return false
        }
        this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendchecktwo);
        const assetHash = this.props.index.depositHash;// "0x38e5ccf55d19e54e8c4fbf55ff81462727ccf4e7"
        await this.props.index.applyProposal(contractHash, assetHash,this.state.tianAddress, fiveNum, requireNum, JSON.stringify(tianStr), this.props.common.userInfo.address, () =>
        {            
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
            this.initData();
        }, () =>
        {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.senddone);
        });
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
    private initData = () =>
    {
        this.setState({
            tianName: '',
            tianDes: '',
            tianAddress: '',
            tianAddrBtn: false,
            tianRequire: '',
            tianContribution: '',
            canSendFlag: false,
            isDoingSave:false
        })
        const projectId = this.props.match.params['projectId'];
        this.props.history.push('/molochinfo/' + projectId);
    }
}

export default injectIntl(MolochProposal);
