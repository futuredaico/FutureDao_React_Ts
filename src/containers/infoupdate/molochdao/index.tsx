/**
 * 修改项目详情模块
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input, Upload, Icon } from 'antd';
import { RcFile } from 'antd/lib/upload';
import Editor from '@/components/braftEditor';
import BraftEditor from 'braft-editor';
import Button from '@/components/Button';
import TextArea from 'antd/lib/input/TextArea';
import { IMolochUpdateInfoProps } from './interface/updateinfo.interface';
import { when } from 'mobx';
// import metamaskwallet from '@/store/metamaskwallet';
interface IState {
    projName:string, // 项目名称
    updateDes:string, // 简介
    updateDetails:string, // 详情(显示)
    updateDetail:string, // 详情（传参）
    imgUrl:string, // 封面
    updateWebsite:string, // 官网
    updateWebsiteEnter:boolean, // 官网输入确认 false为格式错误
    loading:boolean, // 图片上传加载中的状态
    isOkSave:boolean, // 是否可以提交保存了
    showSaveBox:boolean, // 保存再次确认窗口
}


@inject('updateinfo', 'common','molochinfo','molochmanager')
@observer
class MolochUpdateInfo extends React.Component<IMolochUpdateInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        projName:'', // 项目名称
        updateDes:'', // 简介
        updateDetails:'', // 详情(显示)
        updateDetail:'', // 详情（传参）
        imgUrl:'', // 封面
        updateWebsite:'', // 官网
        updateWebsiteEnter:true,
        loading:false,
        isOkSave:false,
        showSaveBox:false
    }
    public async componentDidMount()
    {
        when(
            () => !!this.props.common.userInfo,
            () => this.initGetData()
        )
    }

    public componentWillUnmount()
    {
        this.props.updateinfo.projInfo = null;
        this.props.molochmanager.proposalBalance = 0
    }

    public render() {
        return (
            <div className="molochdao-update-wrapper">
                <div className="update-wrapper">
                    <div className="update-top">
                        <h2>{this.intrl.infoupdate.title}</h2>
                    </div>
                    <div className="update-content">
                        {/* 名称 */}
                        <div className="inline-title">
                            <strong>{this.intrl.create.name}</strong>
                            <span className="red-type"> *</span>
                        </div>
                        <div className="inline-enter">
                            <Input 
                                maxLength={40} 
                                value={this.state.projName} 
                                type="text" 
                                disabled={true}
                            />
                        </div>
                        {/* 简介 */}
                        <div className="inline-title">
                            <strong>{this.intrl.create.des}</strong>
                            <span className="red-type"> *</span>
                        </div>
                        <div className="inline-enter">
                            <TextArea
                                className="nosize-textarea"
                                maxLength={180}
                                onChange={this.handleChangeDes}
                                value={this.state.updateDes}
                            />
                        </div>
                        {/* 详情 */}
                        <div className="inline-title">
                            <strong>{this.intrl.create.detail}</strong>
                        </div>
                        <div className="inline-enter">
                            <Editor
                                onChange={this.onChangeEditorValue}
                                value={this.state.updateDetails}
                            />
                        </div>
                        {/* 封面 */}
                        <div className="inline-title">
                            <strong>{this.intrl.create.headimg}</strong>
                        </div>
                        <div className="inline-enter">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                accept="image/*,/pdf"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={this.beforeUpload}
                            // onChange={this.handleChangeImg}
                            >
                                {this.state.imgUrl ? <img src={this.state.imgUrl} alt="avatar" /> :
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
                            {/* {
                                this.state.imgEnter && <span className="err-span">{this.intrl.edit.error}</span>
                            } */}
                        </div>
                        {/* 官网 */}
                        <div className="inline-title">
                            <strong>{this.intrl.create.website}</strong>
                        </div>
                        <div className="inline-enter">
                            <Input value={this.state.updateWebsite} type="text" onChange={this.handleChangeUpdateWebsite} />
                            {
                                !this.state.updateWebsiteEnter && <span className="err-span">{this.intrl.create.urlerror}(http://xxx.xxx... | https://xxx.xxx...)</span>
                            }
                        </div>
                        {/* 按钮 */}
                        <div className="inline-btn" style={{ textAlign: "center" }}>
                            <Button
                                text={this.intrl.infoupdate.btn1}
                                btnSize="bg-btn"
                                btnColor="red-btn"
                                onClick={this.handleToCancelUpdate}
                            />
                            <Button
                                text={this.intrl.infoupdate.btn2}
                                btnSize="bg-btn"
                                btnColor={this.state.isOkSave ? "" : "gray-btn"}
                                onClick={this.handleToOpenSave}
                            />
                        </div>
                    </div>
                </div>
                {
                    this.state.showSaveBox && (
                        <div className="saveupdate-wrapper">
                            <div className="saveupdate-content">
                                <div className="saveupdate-title"><strong>{this.intrl.infoupdate.tip1}</strong></div>
                                <div className="saveupdate-text">{this.intrl.infoupdate.tip2}</div>
                                <div className="saveupdate-btn">
                                    <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleToCloseSave} />
                                    <Button text={this.intrl.btn.comfirm} onClick={this.handleToSaveUpdate} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
    private initGetData = async ()=>{
        const projectId = this.props.match.params.projectId;
        if (projectId)
        {
            if(this.props.common.userInfo){
                this.props.molochmanager.getTokenBalance(projectId, this.props.common.userInfo.address);
            }
            await this.props.updateinfo.getMolochProjInfo(projectId);
            this.initData();
        }
    }
    // 初始化
    private initData = ()=>{
        if(this.props.updateinfo.projInfo){
            this.setState({
                projName:this.props.updateinfo.projInfo.projName||'', 
                updateDes:this.props.updateinfo.projInfo.projBrief||'', 
                updateDetails:BraftEditor.createEditorState(this.props.updateinfo.projInfo.projDetail), 
                updateDetail:this.props.updateinfo.projInfo.projDetail,
                imgUrl:this.props.updateinfo.projInfo.projCoverUrl, 
                updateWebsite:this.props.updateinfo.projInfo.officailWeb, 
            })
        }
    }
    // 取消修改
    private handleToCancelUpdate = ()=> {
        const projectId = this.props.match.params['projectId'];
        this.props.history.push('/molochinfo/' + projectId);
    }

    // 官网修改
    private handleChangeUpdateWebsite = (event) => {
        // 验证官网是否是符合格式
        const re = new RegExp(/((https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/gi);
        const updateWebsite = event.target.value;
        // console.log((re.test(updateWebsite)))
        this.setState({
            updateWebsite,
            updateWebsiteEnter: re.test(updateWebsite)
        }, () => {
            console.log("updateWebsiteEnter",this.state.updateWebsiteEnter)
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
        return true;
    }
    // 上传封面
    private handleUploadCoverPicture = async (file: RcFile) => {
        const res = await this.props.common.uploadFile(file);
        if (res) {
            this.setState({
                imgUrl: res,
                loading: false
            })
        } else {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.imgerr);
            this.setState({
                imgUrl: '',
                loading: false
            })
        }
    }

    // 修改简介
    private handleChangeDes = (event) => {
        const str = event.target.value;
        this.setState({
            updateDes: str
        }, () => {
            this.checkInputStatus()
        })
    }

    // 修改详情
    private onChangeEditorValue = (value: any) => {
        // todo
        const text = value.toText();
        if (text !== "") {
            this.setState({
                updateDetail: BraftEditor.createEditorState(value).toHTML().replace(/\s\s/g, '&nbsp;&nbsp;'),
                updateDetails: BraftEditor.createEditorState(value)
            }, () => {
                this.checkInputStatus()
            })
        }
    }

    // 输入检测
    private checkInputStatus = () => {
        let isOk = true;
        if (!this.state.projName) {
            isOk = false;
        }
        if (!this.state.updateDes) {
            isOk = false;
        }
        if (!this.state.updateWebsiteEnter) {
            isOk = false;
        }
        this.setState({
            isOkSave: isOk
        })
    }

    // 保存修改
    private handleToOpenSave = () => {
        if(!this.state.isOkSave){
            return false;
        }
        // 验证是否登录
        if (!this.props.common.userInfo) {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false
        }
        else {
            if (this.props.molochmanager.proposalBalance <= 0) {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.membererr2);
                return false
            }
        }
        this.setState({
            showSaveBox:true
        })
        return true;
    }
    // 关闭确认修改弹窗
    private handleToCloseSave = () =>{
        this.setState({
            showSaveBox:false
        })
    }
    // 确认修改
    private handleToSaveUpdate = async ()=>{
        console.log("this.state.isOkSave:",this.state.isOkSave)
        
        const projectId = this.props.match.params.projectId;
        console.log(this.state.updateDetail)
        console.log(this.state.updateDetails)
        const res = await this.props.updateinfo.saveUpdateProject(projectId,this.state.updateDes,this.state.updateDetail,this.state.imgUrl,this.state.updateWebsite);
        if(res){
            this.props.history.push('/molochinfo/' + projectId);
        }
        this.handleToCloseSave();
    }
}

export default injectIntl(MolochUpdateInfo);
