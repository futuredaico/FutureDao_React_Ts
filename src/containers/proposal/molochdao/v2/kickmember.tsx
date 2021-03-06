/**
 * 提出成员
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
import TextArea from 'antd/lib/input/TextArea';
import { IMolochProposalProps } from '../interface/index.interface';
import { IContractHash } from '@/containers/projectinfo/molochdao/interface/molochmanager.interface';

interface IState {
    isDoingSave: boolean,// 是否正在发布
    tianName: string,  // 提案名称
    tianDes: string,  // 提案详情
    tianKickAddr: string, // 踢出成员地址
    tianKickAddrBtn: boolean, // 地址的格式确认
    addErrMsg: string, // 地址错误提示
    canSendFlag: boolean, // 是否可发起提案
}

@inject('index', 'common', 'metamaskwallet', 'molochmanager')
@observer
class KickMember extends React.Component<IMolochProposalProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isDoingSave: false,
        tianName: '',
        tianDes: '',
        tianKickAddr: '',
        tianKickAddrBtn: true,
        addErrMsg: "",
        canSendFlag: false
    }

    public componentDidMount() {
        const projectId = this.props.match.params['projectId'];
        this.props.index.getDepositData(projectId);
        this.props.molochmanager.getContractInfo(projectId);
    }
    public componentWillUnmount() {
        this.props.molochmanager.proposalBalance = 0;
        this.props.molochmanager.proposalAddress = '';
        this.props.molochmanager.sharesBalance = 0;
        this.props.molochmanager.lootBalance = 0;
    }
    public render() {
        return (
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
                    <strong>{this.intrl.proposal.kickaddr}</strong>&nbsp;
                            <span className="red-type">*</span>
                    <span className="tips-text">{this.intrl.proposal.kicktips}</span>
                </div>
                <div className="inline-enter">
                    <Input value={this.state.tianKickAddr} onChange={this.handleChangeTianKickAddr} className={!this.state.tianKickAddrBtn ? "err-active" : ''} />
                    {
                        !this.state.tianKickAddrBtn && <span className="err-span">{this.state.addErrMsg}</span>
                    }
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
        );
    }
    // 提案名称的输入
    private handleChangeTianName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            tianName: ev.target.value
        }, () => {
            this.checkAllInput()
        })
    }
    // 提案详情的输入
    private handleChangeTianDes = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            tianDes: ev.target.value
        }, () => {
            this.checkAllInput()
        })
    }
    // 踢出成员地址的输入
    private handleChangeTianKickAddr = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            tianKickAddr: ev.target.value
        }, () => {
            this.handleChangeAddrByMetamask();
        })
    }
    // 地址格式验证
    private handleChangeAddrByMetamask = () => {
        const res = web3.isAddress(this.state.tianKickAddr);
        this.setState({
            tianKickAddrBtn: res,
            addErrMsg: res ? '' : this.intrl.proposal.addrerr
        }, () => {
            if (res) {
                this.handleCheckMember();
            } else {
                this.checkAllInput();
            }
        })
    }
    // 验证是否是成员
    private handleCheckMember = async () => {
        const projectId = this.props.match.params['projectId'];
        await this.props.molochmanager.getTokenBalance(projectId, this.state.tianKickAddr);
        this.setState({
            tianKickAddrBtn: this.props.molochmanager.proposalBalance <= 0 ? false : true,
            addErrMsg: this.props.molochmanager.proposalBalance <= 0 ? this.intrl.proposal.membererr : ''
        }, () => {
            this.checkAllInput()
        })
    }
    // 0x4876164b90e82617fDf71feDaFF317E3ED0194ad
    // 0x85ff9877d421e3004535221eae55f6b2df1468c5
    // 发起提案
    private handleSendProposal = async () => {
        if (!this.state.canSendFlag || !this.props.common.userInfo) {
            return false;
        }
        const res = await this.props.metamaskwallet.inintWeb3();
        if (!res) {
            return false;
        }
        const tianStr = {
            title: this.state.tianName,
            description: this.state.tianDes
        }
        this.setState({
            isDoingSave: true
        })
        if (!this.props.molochmanager.contractInfo) {
            return false
        }
        let contractHash = '';
        this.props.molochmanager.contractInfo.contractHashs.map((item: IContractHash) => {
            if (item.name === 'moloch') {
                contractHash = item.hash
            }
        })
        if (!contractHash) {
            return false
        }
        this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
        const res2 = await this.props.index.applyProposalToKick(contractHash, this.state.tianKickAddr, JSON.stringify(tianStr), this.props.common.userInfo.address);
        if (res2) {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
            this.initData();
        } else {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.sendfail);
        }
        return true;
    }
    private checkAllInput = () => {
        let isOk = true;
        if (!this.state.tianName) {
            isOk = false;
        }
        if (!this.state.tianDes) {
            isOk = false;
        }
        if (!this.state.tianKickAddr) {
            isOk = false;
        }
        if (!this.state.tianKickAddrBtn) {
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
            tianKickAddr: '',
            tianKickAddrBtn: false,
            canSendFlag: false,
            isDoingSave: false
        })
        const projectId = this.props.match.params['projectId'];
        this.props.history.push('/molochinfo/' + projectId);
    }
}

export default injectIntl(KickMember);
