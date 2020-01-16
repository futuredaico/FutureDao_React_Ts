/**
 * 申请股份
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
// import classnames from 'classnames';
// import { getQueryString } from '@/utils/function';
import Select from '@/components/select';
import TextArea from 'antd/lib/input/TextArea';
import { IMolochProposalProps, IAssetOption } from '../interface/index.interface';
import { saveDecimal } from '@/utils/numberTool';
import { IContractHash } from '@/containers/projectinfo/molochdao/interface/molochmanager.interface';
import { when } from 'mobx';
import { HASH_CONFIG } from '@/config';

interface IState
{
    isDoingSave: boolean,// 是否正在发布
    tianName: string,  // 提案名称
    tianDes: string,  // 提案详情
    tianAddress: string, // 提案股份申请人
    tianAddrBtn: boolean, // 地址的格式确认
    addErrMsg: string, // 地址错误提示
    tianRequestShares: string,   // 申请股份
    tianLootRequire: string, // 无表决权的股份
    tianRequestNum: string,// 申请资金的数量
    tianRequestToken: string,// 申请资金的hash
    tianPayNum: string // 贡献资金数量
    tianPayToken: string, // 贡献资金hash
    canSendFlag: boolean, // 是否可发起提案
    // assetType: string, // 资金的选择
}

@inject('index', 'common', 'metamaskwallet', 'molochmanager')
@observer
class ApplyShares extends React.Component<IMolochProposalProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        isDoingSave: false,
        tianName: '',
        tianDes: '',
        tianAddress: '',
        tianAddrBtn: true,
        addErrMsg: "",
        tianRequestShares: '0',
        tianLootRequire: '0',
        tianRequestNum: '0',
        tianRequestToken: '',
        tianPayNum: '0',
        tianPayToken: '',
        canSendFlag: false,
        // assetType: '1'
    }

    public componentDidMount()
    {
        const projectId = this.props.match.params['projectId'];
        this.props.index.getDepositData(projectId);
        this.props.index.getFundList(projectId);
        this.props.molochmanager.getContractInfo(projectId);
        when(
            () => !!this.props.common.userInfo,
            () => this.setState({
                tianAddress: this.props.common.userInfo ? this.props.common.userInfo.address : ''
            })
        )
    }
    public render()
    {
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
                    <strong>申请资产</strong>&nbsp;
                    <span className="red-type">*</span>
                </div>
                <div className="inline-enter">
                    <div className="smline-box">
                        <span className="smline-span">申请股份数:</span>
                        <Input value={this.state.tianRequestShares} onChange={this.handleChangetianRequestShares} onFocus={this.handleOnFous} />
                    </div>
                    <div className="smline-box">
                        <span className="smline-span">申请无表决权股份数:</span>
                        <Input value={this.state.tianLootRequire} onChange={this.handleChangeTianLootRequire} onFocus={this.handleOnFous} />
                    </div>
                    <div className="smline-span">申请资产及其数量:</div>
                    <Input className="sort-inputtext" value={this.state.tianRequestNum} onChange={this.handleChangeTianRequestNum} onFocus={this.handleOnFous} />
                    <div className="sort-select">
                        {
                            this.props.index.fundOption.length > 0 && <Select options={this.props.index.fundOption} text='' onCallback={this.handleChoiceRequestToken} defaultValue={this.props.index.fundOption[0].id} />
                        }
                    </div>
                </div>
                <div className="inline-title">
                    <strong>{this.intrl.proposal.gong}</strong>&nbsp;
                            <span className="red-type">*</span>
                    <span className="tips-text">{this.intrl.proposal.gongtips}</span>
                </div>
                <div className="inline-enter">
                    <Input className="sort-inputtext" value={this.state.tianPayNum} onChange={this.handleChangetianPayNum} onFocus={this.handleOnFous} />
                    <div className="sort-select">
                        {
                            this.props.index.fundOption.length > 0 && <Select options={this.props.index.fundOption} text='' onCallback={this.handleChoicePayToken} defaultValue={this.props.index.fundOption[0].id} />
                        }
                    </div>
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
    private handleOnFous = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        //
        ev.target.select();
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
            addErrMsg: res ? '' : this.intrl.proposal.addrerr
        }, () =>
        {
            this.checkAllInput()
        })
    }
    // 申请股份的输入，限正整数
    private handleChangetianRequestShares = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        if (parseFloat(value.toString()) === 0)
        {
            this.setState({
                tianRequestShares: '0'
            }, () =>
            {
                this.checkAllInput()
            })
        } else
        {
            const reg = /^[0-9]*[1-9][0-9]*$/;
            if (value.toString().length > 0)
            {
                if (!reg.test(ev.target.value))
                {
                    return false;
                }
            }
            this.setState({
                tianRequestShares: value.toString()
            }, () =>
            {
                this.checkAllInput()
            })
        }
        return true
    }
    // 无表决权的股份的输入，限正整数
    private handleChangeTianLootRequire = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        if (parseFloat(value.toString()) === 0)
        {
            this.setState({
                tianRequestShares: '0'
            }, () =>
            {
                this.checkAllInput()
            })
        } else
        {
            const reg = /^[0-9]*[1-9][0-9]*$/;
            if (value.toString().length > 0)
            {
                if (!reg.test(ev.target.value))
                {
                    return false;
                }
            }
            this.setState({
                tianLootRequire: value.toString()
            }, () =>
            {
                this.checkAllInput()
            })
        }
        return true
    }
    // 申请资金的输入
    private handleChangeTianRequestNum = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        // 限制小数点后4位
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        let valueStr = '';
        if (this.state.tianRequestToken === HASH_CONFIG.ID_WETH)
        {
            valueStr = saveDecimal(value.toString(), 4);
        } else
        {
            valueStr = saveDecimal(value.toString(), 2);
        }
        this.setState({
            tianRequestNum: valueStr
        }, () =>
        {
            this.checkAllInput()
        })
        return true
    }
    // 贡献资金的输入
    private handleChangetianPayNum = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        // 限制小数点后4位
        const value = ev.target.value as unknown as number;
        if (isNaN(value))
        {
            return false;
        }
        let valueStr = '';
        if (this.state.tianRequestToken === HASH_CONFIG.ID_WETH)
        {
            valueStr = saveDecimal(value.toString(), 4);
        } else
        {
            valueStr = saveDecimal(value.toString(), 2);
        }
        this.setState({
            tianPayNum: valueStr
        }, () =>
        {
            this.checkAllInput()
        })
        return true
    }
    // 申请资金选择的资产
    private handleChoiceRequestToken = (item: IAssetOption) =>
    {
        this.setState({
            tianRequestToken: item.id
        })
    }
    // 贡献资金选择的资产
    private handleChoicePayToken = (item: IAssetOption) =>
    {
        this.setState({
            tianPayToken: item.id
        })
    }
    // 发起提案
    private handleSendProposal = async () =>
    {
        if (!this.state.canSendFlag || !this.props.common.userInfo)
        {
            return false;
        }
        const res = await this.props.metamaskwallet.inintWeb3();
        if (!res)
        {
            return false;
        }
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
        const requestShares = parseInt(this.state.tianRequestShares, 10);
        const lootRequest = parseInt(this.state.tianLootRequire, 10);
        const payNum = parseFloat(this.state.tianPayNum);
        const requestNum = parseFloat(this.state.tianRequestNum);
        await this.props.index.applyProposalToGetShares(contractHash, this.state.tianAddress, requestShares, lootRequest, payNum, this.state.tianPayToken, requestNum, this.state.tianRequestToken, JSON.stringify(tianStr), this.props.common.userInfo.address, () =>
        {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendok);
            this.initData();
        }, () =>
        {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.senddone, this.intrl.notify.detailbtn, () =>
            {
                const projectId = this.props.match.params['projectId'];
                this.props.history.push('/molochinfo/' + projectId);
            });
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
        if (!this.state.tianRequestShares)
        {
            isOk = false;
        }
        if (!this.state.tianLootRequire)
        {
            isOk = false;
        }
        if (!this.state.tianRequestNum)
        {
            isOk = false;
        }
        if (!this.state.tianPayNum)
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
            tianRequestShares: '',
            tianLootRequire: '',
            tianRequestNum: '',
            tianRequestToken: this.props.index.fundOption[0].id,
            tianPayNum: '',
            tianPayToken: this.props.index.fundOption[0].id,
            canSendFlag: false,
            isDoingSave: false
        })
        const projectId = this.props.match.params['projectId'];
        this.props.history.push('/molochinfo/' + projectId);
    }
}

export default injectIntl(ApplyShares);
