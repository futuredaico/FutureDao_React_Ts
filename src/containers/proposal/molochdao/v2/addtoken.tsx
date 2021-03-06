/**
 * 添加支持代币
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
    tianTokenHash: string, // 添加代币hash
    tianHashBtn: boolean, // Hash的格式确认
    canSendFlag: boolean, // 是否可发起提案
    hashErrMsg: string // hash地址错误提示
}

@inject('index', 'common', 'metamaskwallet', 'molochmanager')
@observer
class AddToken extends React.Component<IMolochProposalProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        isDoingSave: false,
        tianName: '',
        tianDes: '',
        tianTokenHash: '',
        tianHashBtn: true,
        canSendFlag: false,
        hashErrMsg: ''
    }

    public componentDidMount() {
        const projectId = this.props.match.params['projectId'];
        this.props.index.getDepositData(projectId);
        this.props.molochmanager.getContractInfo(projectId);
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
                    <strong>{this.intrl.proposal.token}</strong>&nbsp;
                    <span className="red-type">*</span>
                </div>
                <div className="inline-enter">
                    <Input value={this.state.tianTokenHash} onChange={this.handleChangeTianTokenHash} className={!this.state.tianHashBtn ? "err-active" : ''} />
                    {
                        !this.state.tianHashBtn && <span className="err-span">{this.state.hashErrMsg}</span>
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
    // 代币hash的输入
    private handleChangeTianTokenHash = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            tianTokenHash: ev.target.value
        }, () => {
            this.handleChangeHashByMetamask()
        })
    }
    // 代币hash格式验证
    private handleChangeHashByMetamask = () => {
        if (this.state.tianTokenHash === '0x0000000000000000000000000000000000000000') {
            this.setState({
                tianHashBtn: false,
                hashErrMsg: this.intrl.proposal.hasherr
            }, () => {
                this.checkAllInput()
            })
        } else {
            const res = web3.isAddress(this.state.tianTokenHash);
            this.setState({
                tianHashBtn: res,
                hashErrMsg: res ? '' : this.intrl.proposal.hasherr
            }, () => {
                this.checkAllInput()
            })
        }

    }
    // 发起提案
    private handleSendProposal = async () => {
        if (!this.state.canSendFlag || !this.props.common.userInfo) {
            return false;
        }
        const res = await this.props.metamaskwallet.inintWeb3();
        if (!res) {
            return false;
        }
        // 0x2BFb7857eC7238AA84a830342Fa53fE0FEF7FeF5
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
        const res2 = await this.props.index.applyProposalToAddToken(contractHash, this.state.tianTokenHash, JSON.stringify(tianStr), this.props.common.userInfo.address)

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
        if (!this.state.tianTokenHash) {
            isOk = false;
        }
        if (!this.state.tianHashBtn) {
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
            tianTokenHash: '',
            tianHashBtn: false,
            canSendFlag: false
        })
        const projectId = this.props.match.params['projectId'];
        this.props.history.push('/molochinfo/' + projectId);
    }
}

export default injectIntl(AddToken);
