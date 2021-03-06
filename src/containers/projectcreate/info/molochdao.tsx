/**
 * 创建项目
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { ICreateProjectProps } from '../interface/createproject.interface';
import Select from '@/components/select';
import { Input, Upload, Icon } from 'antd';
import { RcFile } from 'antd/lib/upload';
import Editor from '@/components/braftEditor';
import BraftEditor from 'braft-editor';
import Button from '@/components/Button';
import { asNumber } from '@/utils/numberTool';
// import metamaskwallet from '@/store/metamaskwallet';
interface IState {
    version: string;                // 版本
    projectName: string;            // 项目名称
    officialWebsite: string;         // 官网
    info: string;                   // 简介
    projDetail: string,             // 文本编辑内容 详情
    projectDetails: string,         // 文本编辑内容
    imageUrl: string;               // 上传的封面的URL
    approvedToken: string;          // 允许交易的token
    approvedTokens: Array<{ value: string, enter: boolean, other: boolean }>;        // 交易Token列表 
    approvedTokenSymbol: string;    // Token的单位
    periodDuration: number;         // 区间段的时间 测试网默认一个区间时段是120秒 2分钟
    infoLength: number;             // 简介字数
    votingPeriodLength: number;     // 投票有多少个区间段
    gracePeriodLength: number;      // 公示有多少个区间段
    abortWindow: number;            // 撤回投票的窗口期
    proposalDeposit: string;        // 提议的押金
    dilutionBound: number;          // 如果出现大规模混乱，投赞成票的选民将有义务支付最高乘数
    emergencyExitWait: number;       // 如果在此之后仍未处理提案，则直接跳过
    bailoutWait: number              // 返还资产等待区间段
    processingReward: string;       // 处理提案的人所得到的奖励
    loading: boolean;               // 图片上传加载中的状态
    otherToken: boolean;
    // 非空验证
    nameEnter: boolean,
    infoEnter: boolean,             // 内容确认
    imgEnter: boolean,              // 
    detailEnter: boolean,
    officialWebsiteEnter: boolean;         // 验证
    approvedTokenEnter: boolean,
    votingPeriodLengthEnter: boolean,
    gracePeriodLengthEnter: boolean,
    abortWindowEnter: boolean,
    abortWindowError: boolean,
    proposalDepositEnter: boolean,
    processingRewardEnter: boolean,
    processingRewardError: boolean,
    createButtonState: boolean,
    emergencyExitWaitEnter: boolean,
    bailoutWaitEnter: boolean,
    checkStatus:boolean,
}

interface IOptions {
    id: string|number,
    name: string
}

@inject('createproject', 'common', 'metamaskwallet')
@observer
class CreateProject extends React.Component<ICreateProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        version: "",                // 版本
        projectName: "",            // 项目名称
        officialWebsite: "",
        info: "",                   // 简介
        projDetail: "",             // 文本编辑内容 详情
        projectDetails: "",         // 文本编辑内容
        imageUrl: "",               // 上传的封面的URL
        approvedToken: "",          // 允许交易的token
        approvedTokens: [ { value: "", enter: false, other: false } ],
        periodDuration: (process.env.REACT_APP_SERVER_ENV === 'DEV') ? 120 : 17280,         // 区间段的时间 测试网默认一个区间时段是120秒 2分钟
        infoLength: 0,             // 简介字数
        votingPeriodLength: 7,     // 投票有多少个区间段
        gracePeriodLength: 7,      // 公示有多少个区间段
        abortWindow: 5,            // 撤回投票的窗口期
        emergencyExitWait: 0,
        bailoutWait: 0,
        proposalDeposit: "10",        // 提议的押金
        dilutionBound: 3,          // 如果出现大规模混乱，投赞成票的选民将有义务支付最高乘数 默认3
        processingReward: "0.1",       // 处理提案的人所得到的奖励
        approvedTokenSymbol: "",
        otherToken: false,
        loading: false,               // 图片上传加载中的状态
        // 非空验证
        nameEnter: false,
        infoEnter: false,             // 内容确认
        imgEnter: false,              // 
        detailEnter: false,
        approvedTokenEnter: false,
        votingPeriodLengthEnter: false,
        gracePeriodLengthEnter: false,
        abortWindowEnter: false,
        proposalDepositEnter: false,
        processingRewardEnter: false,
        createButtonState: true,
        officialWebsiteEnter: false,
        abortWindowError: false,
        processingRewardError: false,
        emergencyExitWaitEnter: false,
        bailoutWaitEnter: false,
        checkStatus:false,
    }
    // DAO版本选择
    private versionOptions: IOptions[] = [
        { 'id': '1.0', 'name': 'molochdao1.0' },
        { 'id': '2.0', 'name': 'molochdao2.0' },
    ]
    // 期间选择项
    private dayOptions: IOptions[] = [
        { name: '1' + this.intrl.create.days, id: 1 },
        { name: '2' + this.intrl.create.days, id: 2 },
        { name: '3' + this.intrl.create.days, id: 3 },
        { name: '4' + this.intrl.create.days, id: 4 },
        { name: '5' + this.intrl.create.days, id: 5 },
        { name: '6' + this.intrl.create.days, id: 6 },
        { name: '7' + this.intrl.create.days, id: 7 },
    ]
    // 踢人宽限期选项 
    private bailoutWaitOptions: IOptions[] = [
        { name: '8天', id: 8 },
        { name: '9天', id: 9 },
        { name: '10天', id: 10 },
        { name: '11天', id: 11 },
        { name: '12天', id: 12 },
        { name: '13天', id: 13 },
        { name: '14天', id: 14 },
    ]
    // 代币选择项
    private tokenOptions: IOptions[] =
        (process.env.REACT_APP_SERVER_ENV === 'DEV') ?
            [
                { name: 'USDF', id: '0x38e5ccf55d19e54e8c4fbf55ff81462727ccf4e7' },
                { name: this.intrl.create.other, id: '' }
            ] :
            [
                { name: 'WETH', id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' },
                { name: 'SAI', id: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359' },
                { name: 'DAI', id: '0x6b175474e89094c44da98b954eedeac495271d0f' },
                { name: this.intrl.create.other, id: '' }
            ]

    public render() {
        return (
            <div className="molochdao-create">
                <div className="info-title"><b>{this.intrl.create.title1}</b></div>
                <div className="info-group">
                    <div className="group-name"><b>{this.intrl.create.version}</b></div>
                    <Select text="" defaultValue={this.versionOptions[ 0 ].id} options={this.versionOptions} onCallback={this.handleDaoVersionSelect} />
                </div>
                <div className="info-group">
                    <div className="group-name"><b>{this.intrl.create.name}</b><span className="red-type"> *</span></div>
                    <Input maxLength={40} value={this.state.projectName} type="text" onChange={this.handleChangeProjectName} className={this.state.nameEnter ? "err-active" : ''} />
                    {
                        this.state.nameEnter && <span className="err-span">{this.intrl.edit.error}</span>
                    }
                </div>
                <div className="info-group">
                    <div className="group-name"><b>{this.intrl.create.des}</b><span className="red-type"> *</span></div>
                    <textarea
                        className={this.state.infoEnter ? "textarea-wrapper err-active" : "textarea-wrapper"}
                        maxLength={180}
                        style={{ resize: 'none' }}
                        onChange={this.handleChangeInfo}
                        value={this.state.info}
                    />
                    {
                        this.state.infoEnter && <span className="err-span">{this.intrl.edit.error}</span>
                    }
                </div>
                <div className="info-group">
                    <div className="group-name"><b>{this.intrl.create.detail}</b></div>
                    <div style={{ width: 750, minHeight: 500, maxHeight: 1000 }}>
                        <Editor
                            onChange={this.onChangeEditorValue}
                            value={this.state.projectDetails}
                            className={this.state.detailEnter ? "err-active" : ''}
                        />
                        {
                            this.state.detailEnter && <span className="err-span">{this.intrl.edit.error}</span>
                        }
                    </div>
                </div>
                <div className="info-group">
                    <div className="group-name"><b>{this.intrl.create.headimg}</b></div>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className={this.state.imgEnter ? "avatar-uploader err-active" : "avatar-uploader"}
                        showUploadList={false}
                        accept="image/*,/pdf"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.beforeUpload}
                    // onChange={this.handleChangeImg}
                    >
                        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> :
                            <div>
                                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                                {
                                    !this.state.loading && (
                                        <>
                                            <div className="ant-upload-text">{this.intrl.edit.uploadcover}</div>
                                            <span className="small-text">{this.intrl.edit.covertips}</span>
                                        </>
                                    )
                                }
                            </div>
                        }
                    </Upload>
                    {
                        this.state.imgEnter && <span className="err-span">{this.intrl.edit.error}</span>
                    }
                </div>
                <div className="info-group">
                    <div className="group-name"><b>{this.intrl.create.website}</b></div>
                    <Input value={this.state.officialWebsite} type="text" onChange={this.handleChangeOfficialWebsite} />
                    {
                        this.state.officialWebsiteEnter && <span className="err-span">{this.intrl.create.urlerror}(http://xxx.xxx... | https://xxx.xxx...)</span>
                    }
                </div>
                <div className="info-group">
                    <div className="group-name"><b>{this.intrl.create.asset}</b><span className="red-type"> *</span></div>
                    {this.state.approvedTokens.map((item, index) => {
                        return (
                            <div className="inline-box group" key={index}>
                                <Select text="" options={this.tokenOptions} onCallback={this.hadleSelectApprovedToken.bind(this, index)} defaultValue={this.tokenOptions[ 0 ].id} />
                                {item.other &&
                                    <Input
                                        value={item.value}
                                        onChange={this.hadleChangeApprovedToken.bind(this, index)}
                                        className={item.enter ? "err-active" : ''}
                                        placeholder={this.intrl.create.approvedplaceholder}
                                    />
                                }
                                {!item.value ? <span className="err-span">{ this.intrl.edit.error}</span>:
                                 (item.enter&&item.other ?<span className="err-span">{this.intrl.create.error3}</span>:
                                 this.state.approvedTokens.findIndex(pre=>pre.value===item.value)<index && <span className="err-span">{this.intrl.create.err}</span>
                                 )}
                                {
                                    index > 0 && <img src={require("@/img/remove.png")} onClick={this.hadleRemoveApprovedToke.bind(this, index)} />
                                }
                            </div>
                        )
                    })
                    }
                    {
                        this.state.version === "2.0" &&
                        <Button
                            text={this.intrl.create.btn}
                            btnSize="md-bg-btn"
                            onClick={this.hadleAddApprovedToken}
                        />
                    }
                </div>
                <div className="info-group">
                    <div className="info-title"><b>{this.intrl.create.title2}</b></div>
                </div>
                <div className="info-group">
                    <div className="inline-box left">
                        <div className="group-name"><b>{this.intrl.create.votetime}</b><span className="red-type"> *</span></div>
                        <Select text="" options={this.dayOptions} onCallback={this.handleSelectVotingPeriodLength} defaultValue={7} />
                    </div>
                    <div className="inline-box">
                        <div className="group-name"><b>{this.intrl.create.notingtime}</b><span className="red-type"> *</span></div>
                        <Select text="" options={this.dayOptions} onCallback={this.handleSelectGracePeriodLength} defaultValue={7} />
                    </div>
                    {
                        (this.state.votingPeriodLengthEnter || this.state.gracePeriodLengthEnter) &&
                        <>
                            <div className="inline-box left">
                                {
                                    this.state.votingPeriodLengthEnter && <span className="err-span">{this.intrl.edit.error}</span>
                                }
                            </div>
                            <div className="inline-box">
                                {
                                    this.state.gracePeriodLengthEnter && <span className="err-span">{this.intrl.edit.error}</span>
                                }
                            </div>
                        </>
                    }
                </div>
                {
                    this.state.version === "1.0" &&
                    <div className="info-group">
                        <div className="group-name"><b>{this.intrl.create.canceltime}</b><span className="red-type"> *</span></div>
                        <div className="inline-box left">
                            <Select text="" options={this.dayOptions} onCallback={this.handleSelectAbortWindow} defaultValue={5} />
                            {
                                this.state.abortWindowEnter && <span className="err-span">{this.state.abortWindowError ? this.intrl.create.error1 : this.intrl.edit.error}</span>
                            }
                        </div>
                    </div>
                }
                {
                    this.state.version === "2.0" &&
                    <div className="info-group">
                        <div className="inline-box left">
                            <div className="group-name"><b>{this.intrl.create.tip1}</b><span className="red-type"> *</span></div>
                            <Select text="" defaultValue={7} options={this.dayOptions} onCallback={this.handleSelectEmergencyExitWait} />
                        </div>
                        <div className="inline-box">
                            <div className="group-name"><b>{this.intrl.create.tip2}</b><span className="red-type"> *</span></div>
                            <Select text="" defaultValue={this.bailoutWaitOptions[0].id} options={this.bailoutWaitOptions} onCallback={this.handleSelectBailoutWait} />
                        </div>
                        {
                            (this.state.emergencyExitWaitEnter || this.state.bailoutWaitEnter) &&
                            <>
                                <div className="inline-box left">
                                    {
                                        this.state.emergencyExitWaitEnter && <span className="err-span">{this.intrl.edit.error}</span>
                                    }
                                </div>
                                <div className="inline-box">
                                    {
                                        this.state.bailoutWaitEnter && <span className="err-span">{this.intrl.edit.error}</span>
                                    }
                                </div>
                            </>
                        }
                    </div>
                }

                <div className="info-group">
                    <div className="inline-box left">
                        <div className="group-name"><b>{this.intrl.create.cash}</b><span className="red-type"> *</span></div>
                        <Input
                            value={this.state.proposalDeposit}
                            onChange={this.handleChangeProposalDeposit}
                            className={this.state.proposalDepositEnter ? "err-active" : ''}
                            suffix={this.state.approvedTokenSymbol}
                        />
                    </div>
                    <div className="inline-box">
                        <div className="group-name"><b>{this.intrl.create.voteresult}</b><span className="red-type"> *</span></div>
                        <Input
                            value={this.state.processingReward}
                            onChange={this.handleChangeProcessingReward}
                            className={this.state.processingRewardEnter ? "err-active" : ''}
                            suffix={this.state.approvedTokenSymbol}
                        />
                    </div>
                    {
                        (this.state.proposalDepositEnter || this.state.processingRewardEnter) &&
                        <>
                            <div className="inline-box left">
                                {
                                    this.state.proposalDepositEnter && <span className="err-span">{this.intrl.edit.error}</span>
                                }
                            </div>
                            <div className="inline-box">
                                {
                                    this.state.processingRewardEnter && <span className="err-span">{this.state.processingRewardError ? this.intrl.create.error2 : this.intrl.edit.error}</span>
                                }
                            </div>
                        </>
                    }
                </div>
                <div className="info-group" style={{ textAlign: "center" }}>
                    {
                        this.state.createButtonState ?
                            <Button
                                text={this.intrl.btn.editstep1}
                                btnSize="bg-btn"
                                onClick={this.handleToCreateProject}
                                // disabled={(!this.state.projectName || !this.state.info || !this.state.approvedToken || !this.state.votingPeriodLength || !this.state.gracePeriodLength || !this.state.abortWindow || !this.state.proposalDeposit || !this.state.processingReward)}
                                btnColor=
                                {!this.state.checkStatus ? 'gray-btn' : ''}
                            /> :
                            <Button
                                text={this.intrl.btn.editstep1}
                                btnSize="bg-btn"
                                disabled={true}
                            />
                    }
                </div>
            </div>
        );
    }

    // 监听版本变更
    private handleDaoVersionSelect = (event) => {
        let tokens = this.state.approvedTokens;
        tokens = event.id==="1.0"?[tokens[0]]:tokens;
        this.setState({
            version: event.id,
            approvedTokens:tokens
        },()=>{
            this.checkInputStatus()
        })
    }

    // 监听项目名称变更
    private handleChangeProjectName = (event) => {
        
        // 项目名不可为空且字数不能超过40
        
        this.setState({
            projectName: event.target.value,
            nameEnter:!event.target.value || event.target.value.length > 40
        },()=>{
            console.log(this.state.projectName);
            
            this.checkInputStatus()
        })
    }

    // 官网修改
    private handleChangeOfficialWebsite = (event) => {
        // 验证官网是否是符合格式
        const re = new RegExp(/((https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/gi);
        const officialWebsite=event.target.value;
        this.setState({
            officialWebsite,
            officialWebsiteEnter:officialWebsite?(!re.test(officialWebsite)):false
        },()=>{
            this.checkInputStatus()
        })
    }

    // 限制图片上传大小与格式
    private beforeUpload = (file: RcFile) => {
        // 限制大小3M以下
        if (file.size / 1024 / 1024 > 3) {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.imgerr);
            return false;
        }
        this.setState({
            loading: true
        })
        this.handleUploadCoverPicture(file);
        // todo commonStore
        return true;
    }
    // 上传封面
    private handleUploadCoverPicture = async (file: RcFile) => {
        const res = await this.props.common.uploadFile(file);
        if (res) {
            this.setState({
                imageUrl: res,
                imgEnter: false,
                loading: false
            })
        } else {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.imgerr);
            this.setState({
                imageUrl: '',
                imgEnter: true,
                loading: false
            })
        }
    }

    // 当textarea内容改变时，改变项目简介的值
    private handleChangeInfo = (event) => {
        const str = event.target.value;
        this.setState({
            info: str,
            infoLength: str.length,
            // 项目简介不可为空且字数不能超过180
            infoEnter:!str || str.length > 180
        },()=>{
            this.checkInputStatus()
        })

    }

    // 文本框的输入
    private onChangeEditorValue = (value: any) => {
        // todo
        const text = value.toText();
        if (text !== "") {
            this.setState({
                projDetail: BraftEditor.createEditorState(value).toHTML().replace(/\s\s/g, '&nbsp;&nbsp;'),
                projectDetails: BraftEditor.createEditorState(value),
                detailEnter: false
            },()=>{
                this.checkInputStatus()
            })
        }
    }

    /**
     * 添加代币至列表中
     */
    private hadleAddApprovedToken = () => {
        this.setState({
            approvedTokens: this.state.approvedTokens.concat([ { value: "", enter: false, other: false } ])
        },()=>{
            this.checkInputStatus()
        })
    }

    // 当Token的输入框内容发生改变的时候
    private hadleChangeApprovedToken = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const str = event.target.value;
        const isToken = web3.isAddress(str);
        const tokenarr = this.state.approvedTokens
        const token = tokenarr[ index ];
        token.enter = !isToken;
        token.value = str;
        // token.state = !str?1:(this.state.approvedTokens.findIndex(item=>item.value===token.value)<index)?2:0;
        tokenarr[ index ] = token;
        this.setState({
            approvedToken: str,
            approvedTokens: tokenarr,
            // approvedTokenEnter: !isToken,
        },()=>{
            this.checkInputStatus()
        })
        if (isToken && index === 0) {
            this.props.createproject.getTokenInfo(str).then(asset => {
                this.setState({
                    approvedTokenSymbol: asset.symbol.toLocaleUpperCase()
                })
            }).catch(err => {
                console.log(err);
            })
        }
    }

    // 允许交易的Token
    private hadleSelectApprovedToken = (index: number, event) => {
        const tokens = this.state.approvedTokens;
        const token = this.state.approvedTokens[ index ];
        token.value = event.id;
        token.other = !event.id;
        token.enter = !!!event.id;
        // token.state = !event.id?1:(this.state.approvedTokens.findIndex(item=>item.value===token.value)<index)?3:0;
        tokens[ index ] = token;
        this.setState({
            approvedTokens: tokens,
            approvedTokenSymbol: index === 0 ? event.name : this.state.approvedTokenSymbol
        },()=>{
            this.checkInputStatus()
        })
    }

    /**
     * 删除Token
     */
    private hadleRemoveApprovedToke = (index: number) => {
        const tokenarr = this.state.approvedTokens.filter((token, n) => n !== index);
        this.setState({
            approvedTokens: tokenarr
        },()=>{
            this.checkInputStatus()
        })
    }

    // 选择投票期时长
    private handleSelectVotingPeriodLength = (event) => {
        // 判断投票期限不可小于等于0
        this.setState({
            votingPeriodLength: event.id,
            votingPeriodLengthEnter:event.id<=0,
            abortWindowEnter:this.state.abortWindow > event.id,
            abortWindowError:this.state.abortWindow > event.id
        },()=>{
            this.checkInputStatus()
        })
    }

    // 选择公示期期时长
    private handleSelectGracePeriodLength = (event) => {
        // 公示期不可为小于等于0
        this.setState({
            gracePeriodLength: event.id,
            gracePeriodLengthEnter:event.id<=0
        },()=>{
            this.checkInputStatus()
        })
    }

    // 取消窗口期投票市场
    private handleSelectAbortWindow = (event) => {
        // 窗口期不可小于等于0
        const abortWindow=event.id;
        let abortWindowEnter=false;
        let abortWindowError=false;
        if (abortWindow <= 0) {
            abortWindowEnter=true;
        }
        // 窗口期不可大于投票期
        else if (abortWindow > this.state.votingPeriodLength) {
            abortWindowEnter=abortWindowError=true;
        }
        this.setState({
            abortWindow,
            abortWindowEnter,
            abortWindowError
        },()=>{
            this.checkInputStatus()
        })
    }

    // 如果在此之后仍未处理提案，则直接跳过(应该是提案处理期限)
    private handleSelectEmergencyExitWait = (event) => {
        this.setState({
            emergencyExitWait: event.id,
            emergencyExitWaitEnter:event.id<=0
        },()=>{
            this.checkInputStatus()
        })
    }

    // 返还资产等待区间段（应该是踢出成员执行宽限期 ）
    private handleSelectBailoutWait = (event) => {
        this.setState({
            bailoutWait: event.id,
            bailoutWaitEnter:event.id<=0&&event.id>this.state.bailoutWait
        },()=>{
            this.checkInputStatus()
        })
    }


    // 提议押金
    private handleChangeProposalDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const str = event.target.value;
        const number = asNumber(str);
        // tslint:disable-next-line:one-variable-per-declaration
        const processingRewardEnter = !(!number || parseFloat(number) <= 0) && parseFloat(this.state.processingReward) > parseFloat(number);
        const processingRewardError=processingRewardEnter;
        this.setState({ 
            proposalDeposit: number,
            proposalDepositEnter:!number || parseFloat(number) <= 0,
            processingRewardEnter,processingRewardError
        },()=>{
            this.checkInputStatus()
        })
    }

    // 处理人奖励
    private handleChangeProcessingReward = (event: React.ChangeEvent<HTMLInputElement>) => {
        const str = event.target.value;
        const number = asNumber(str);
        // 投票结果奖励不能为空且不能为0
        const processingReward=number;
        // tslint:disable-next-line:one-variable-per-declaration
        let processingRewardEnter,processingRewardError=false;
        if (!processingReward || parseFloat(processingReward) <= 0) {
            processingRewardEnter=true
        }
        // 处理投票奖励不可超过押金数量
        else if (parseFloat(processingReward) > parseFloat(this.state.proposalDeposit)) {
            processingRewardEnter=processingRewardError=true;
        }
        this.setState({
            processingReward,
            processingRewardEnter,
            processingRewardError
        },()=>{
            this.checkInputStatus()
        })
    }

    // 输入检测
    private checkInputStatus = () => {

        let enter=this.state.nameEnter||
        this.state.officialWebsiteEnter||
        this.state.infoEnter||
        // this.state.approvedTokenEnter||
        this.state.votingPeriodLengthEnter||
        this.state.gracePeriodLengthEnter||
        this.state.proposalDepositEnter||
        this.state.processingRewardEnter||
        !this.state.projectName||
        !this.state.info||
        this.state.infoLength<=0;
        if(this.state.version==="1.0"){
            enter=enter|| this.state.abortWindowEnter;
        }
        if(this.state.version==="2.0"){
            enter= enter|| this.state.emergencyExitWaitEnter || this.state.bailoutWaitEnter;
        }
        this.state.approvedTokens.forEach((item,index) => {
            if(item.enter){
                enter=true;
                return;
            }
            if(item.value===""){
                enter=true;
                return;
            }
            if(this.state.approvedTokens.findIndex(pre=>pre.value===item.value)<index){
                enter=true;
                return;
            }
        });
        this.setState({
            checkStatus:!enter
        })
        // // 支持代币不可为空
        // if (this.state.approvedTokens.length<1) {
        //     this.setState({ approvedTokenEnter: true });
        //     window.scrollTo(0, 1500)
        //     return false;
        // }
        // // 支持代币不是正确的格式
        // if (!web3.isAddress(this.state.approvedToken)) {
        //     this.setState({ approvedTokenEnter: true });
        //     window.scrollTo(0, 1500)
        //     return false;
        // }
        // 投票押金数量不能为空且不能为0
        
    }

    // 创建项目
    private handleToCreateProject = async () => {
        if (this.state.checkStatus) {
            const res = await this.props.metamaskwallet.inintWeb3();
            if (res) {
                this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.sendcheck);
                this.props.createproject.createContent = {
                    version: this.state.version,                                // 版本
                    projectName: this.state.projectName,                        // 项目名称
                    projectBrief: this.state.info,                              // 项目简介
                    projectDetail: this.state.projDetail,                       // 文本编辑内容 详情
                    projectConverUrl: this.state.imageUrl,                         // 项目封面URL
                    officialWebUrl: this.state.officialWebsite,
                    approvedToken: this.state.approvedToken,                    // 允许交易的token
                    periodDuration: this.state.periodDuration,                  // 区间段的时间 测试网默认一个区间时段是120秒 2分钟
                    votingPeriodLength: this.state.votingPeriodLength,          // 投票有多少个区间段
                    gracePeriodLength: this.state.gracePeriodLength,            // 公示有多少个区间段
                    abortWindow: this.state.abortWindow,                        // 撤回投票的窗口期
                    proposalDeposit: parseFloat(this.state.proposalDeposit),    // 提议的押金
                    dilutionBound: this.state.dilutionBound,                    // 如果出现大规模混乱，投赞成票的选民将有义务支付最高乘数 默认是3
                    processingReward: parseFloat(this.state.processingReward),   // 处理提案的人所得到的奖励
                    emergencyExitWait: this.state.emergencyExitWait,
                    bailoutWait: this.state.bailoutWait,
                    approvedTokens: [],
                    approvedTokensHash: this.state.approvedTokens.map(item => item.value),
                }
                this.setState({ createButtonState: false })
                try {
                    const result = await this.props.createproject.createProject();
                    if (result) {
                        this.setState({ createButtonState: true })
                    }
                    this.setState({ createButtonState: true })
                } catch (error) {
                    this.setState({ createButtonState: true })
                }
            }
        }
    }

}

export default injectIntl(CreateProject);
