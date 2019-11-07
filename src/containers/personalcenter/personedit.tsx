/**
 * 个人中心
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input, Upload } from 'antd';
import classnames from 'classnames';
import { IPersonProps } from './interface/personedit.interface';
import { CodeType } from '@/store/interface/common.interface';
import { RcFile } from 'antd/lib/upload';
interface IState
{
    isEditDes: boolean, // 个人简介
    isEditEmail: boolean, // 邮箱
    isEditPwd: boolean, // 密码
    isEditStatus: boolean, // 编辑时态，若是有一个在编辑，其他都得置灰，true为置灰
    briefTextarea: string, // 个人简介内容
    emailInput: string, // 新的邮箱
    emailPwd: string,   // 修改邮箱输入的密码
    oldPwd: string,      // 旧密码
    newPwd: string,      // 新密码
    isSaveEmail: boolean,  // 确认邮箱修改
    isSavePwd: boolean, // 确认密码修改
    isEditNeo:boolean, // neo钱包
    isEditEth:boolean, // eth钱包
}
@inject('personedit', 'common','teemowallet','metamaskwallet')
@observer
class PersonalEidt extends React.Component<IPersonProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isEditDes: false,
        isEditEmail: false,
        isEditPwd: false,
        isEditStatus: false,
        briefTextarea: '',
        emailInput: '',
        emailPwd: '',
        oldPwd: '',
        newPwd: '',
        isSaveEmail: false,
        isSavePwd: false,
        isEditNeo:false,
        isEditEth:false,
    }

    public render()
    {
        const infoClassName = classnames('person-info', this.state.isEditStatus ? 'gray-status' : '');
        const desClassName = classnames('info-line', this.state.isEditDes ? 'active-eidt' : '');
        const emailClassName = classnames('info-line', this.state.isEditEmail ? 'active-eidt' : '');
        const pwdClassName = classnames('info-line', this.state.isEditPwd ? 'active-eidt' : '');
        if(!this.props.common.userInfo){
            return null
        }
        return (
            <div className="personedit-page">
                {/* 编辑个人信息 */}
                <h2>{this.intrl.user.info}</h2>
                <div className="person-picture">
                    {/* 编辑头像 */}
                    <div className="person-img">
                        {this.props.common.userInfo.headIconUrl ? <img src={this.props.common.userInfo.headIconUrl} alt="" /> : <img className="no-img" src={require('@/img/default.png')} alt="" />}
                    </div>
                    <div className="person-name-img">
                        <strong className="person-name">{this.props.common.userInfo.username}</strong>
                        {/* <Button text="修改头像" btnColor="white-purple" /> */}
                        <Upload
                            name="avatar"
                            // listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            accept="image/*,/pdf"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={this.beforeUpload}
                        >
                            {this.intrl.btn.repeople}
                        </Upload>
                    </div>
                </div>
                <div className={infoClassName}>
                    {/* 编辑个人简介 */}
                    <div className={desClassName}>
                        <div className="edit-title">
                            <strong>{this.intrl.user.profile}</strong>
                            {
                                !this.state.isEditDes && <div className="edit-img" onClick={this.handleEditPerson.bind(this, 1)} />
                            }
                            {/* <div className="edit-img" onClick={this.handleEditPerson.bind(this, 1)} /> */}
                        </div>
                        {
                            this.state.isEditDes
                                ? (
                                    <>
                                        <textarea
                                            name="person-des"
                                            rows={10}
                                            className="edit-textarea"
                                            value={this.state.briefTextarea}
                                            maxLength={400}
                                            onChange={this.handleToChangeDes}
                                        />
                                        <div className="personedit-btn">
                                            <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleCancelEdit} />
                                            <Button text={this.intrl.btn.checkupdate} onClick={this.handleToSaveDrief} />
                                        </div>
                                    </>
                                )
                                : <div className="person-p">
                                    {
                                        this.props.common.userInfo.brief !== '' ? this.props.common.userInfo.brief : this.intrl.user.noprofile
                                    }
                                </div>
                        }
                    </div>
                    {/* 编辑邮箱 */}
                    <div className={emailClassName}>
                        <div className="edit-title">
                            <strong>{this.intrl.user.email}</strong>
                            {
                                !this.state.isEditEmail && <div className="edit-img" onClick={this.handleEditPerson.bind(this, 2)} />
                            }
                        </div>
                        {
                            this.state.isEditEmail
                                ? (
                                    <>
                                        <Input
                                            placeholder={this.intrl.user.newemail}
                                            className="edit-input"
                                            value={this.state.emailInput}
                                            onChange={this.handleToChangeEmail}
                                            onBlur={this.handleTocheckEmail}
                                        />
                                        <Input.Password
                                            placeholder={this.intrl.user.checkpwd}
                                            className="edit-pwd"
                                            value={this.state.emailPwd}
                                            onChange={this.handleToEnterPwd}
                                        />
                                        {
                                            this.props.personedit.newEmailCode && (
                                                <span className="err-msg">
                                                    <img src={require('@/img/attention.png')} alt="" />
                                                    {this.props.personedit.newEmailCode === CodeType.invalidEmail && this.intrl.inputerr.eformaterr}
                                                    {this.props.personedit.newEmailCode === CodeType.emailHasRegisted && this.intrl.inputerr.emailerr}
                                                    {this.props.personedit.newEmailCode === CodeType.passwordError && this.intrl.inputerr.pwderr2}
                                                </span>
                                            )
                                        }
                                        <div className="personedit-btn">
                                            <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleCancelEdit} />
                                            <Button text={this.intrl.btn.checkupdate} onClick={this.handleToSaveNewEmail} btnColor={(this.state.isSaveEmail && this.state.emailPwd) ? '' : 'gray-btn'} />
                                        </div>
                                    </>
                                )
                                : <span>{this.props.common.userInfo.email}</span>
                        }
                    </div>
                    {/* 编辑密码 */}
                    <div className={pwdClassName}>
                        <div className="edit-title">
                            <strong>{this.intrl.user.password}</strong>
                            {
                                !this.state.isEditPwd && <div className="edit-img" onClick={this.handleEditPerson.bind(this, 3)} />
                            }

                        </div>
                        {
                            this.state.isEditPwd
                                ? (
                                    <>
                                        <Input.Password
                                            placeholder={this.intrl.user.oldpwd}
                                            className="edit-input"
                                            value={this.state.oldPwd}
                                            onChange={this.handleToChangeOldPwd}
                                        />
                                        <Input.Password
                                            placeholder={this.intrl.user.newpwd}
                                            className="edit-pwd"
                                            value={this.state.newPwd}
                                            onChange={this.handleToChangeNewPwd}
                                        />
                                        {
                                            this.props.personedit.newPwdCode && (
                                                <span className="err-msg">
                                                    <img src={require('@/img/attention.png')} alt="" />
                                                    {this.props.personedit.newPwdCode === CodeType.invalidPasswordLen && this.intrl.inputerr.pwderr}
                                                    {this.props.personedit.newPwdCode === CodeType.passwordError && this.intrl.inputerr.pwderr2}
                                                </span>
                                            )
                                        }
                                        <div className="personedit-btn">
                                            <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleCancelEdit} />
                                            <Button text={this.intrl.btn.checkupdate} onClick={this.handleToSaveNewPwd} btnColor={(this.state.oldPwd && this.state.newPwd) ? '' : 'gray-btn'} />
                                        </div>
                                    </>
                                )
                                : <span>******</span>
                        }
                    </div>
                </div>
                {/* 编辑钱包 */}
                <h2>钱包地址</h2>
                <div className={infoClassName}>
                    {/* 绑定neo钱包 */}
                    <div className="info-line">
                        <div className="edit-title">
                            <strong><img src={require('@/img/neo.png/')} alt="neo.png" className="asset-icon" />NEO</strong>
                            <div className="edit-btn-wrapper">
                                <Button 
                                    text={this.props.common.userInfo.neoAddress!==""?"更改":"绑定"} 
                                    onClick={this.handleToBindAddress.bind(this,'neo')} 
                                    btnColor={this.state.isEditStatus?'gray-btn':''}
                                />
                            </div>                               
                        </div>
                        {
                            this.props.common.userInfo.neoAddress!==""
                                ? <span>{this.props.common.userInfo.neoAddress}</span>                                
                                : <span className="nobind-text">未绑定</span>
                        }
                    </div>
                    {/* 绑定eth钱包 */}
                    <div className="info-line">
                        <div className="edit-title">
                            <strong><img src={require('@/img/eth.png/')} alt="eth.png" className="asset-icon" />Eth</strong>
                            <div className="edit-btn-wrapper">
                                <Button 
                                    text={this.props.common.userInfo.ethAddress!==""?"更改":"绑定"} 
                                    onClick={this.handleToBindAddress.bind(this,'eth')} 
                                    btnColor={this.state.isEditStatus?'gray-btn':''}
                                />
                            </div>
                        </div>
                        {
                            this.props.common.userInfo.ethAddress!==""
                                ? <span>{this.props.common.userInfo.ethAddress}</span>                                
                                : <span className="nobind-text">未绑定</span>
                        }
                    </div>
                </div>
            </div>
        );
    }
    // 钱包绑定
    private handleToBindAddress = async (type:string)=>{
        if(this.state.isEditStatus){
            return false;
        }
        if(!this.props.common.userInfo){
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.loginerr);
            return false;
        }
        if (this.props.common.isVerifyEmail)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.verifyerr);
            return false;
        }
        if(type === 'neo'){
            // 获取Teemo钱包上登陆的地址
            await this.props.teemowallet.loginTeemo();
            if(this.props.common.userInfo.neoAddress === this.props.teemowallet.teemoAddress){
                return false;
            }
            // 如果存在
            if(!!this.props.teemowallet.teemoAddress){
                this.props.personedit.bindWalletAddress(type,this.props.teemowallet.teemoAddress)
            }
        }
        else{ 
            // 获取MetaMask钱包上登陆的地址,并自动绑定地址
            await this.props.metamaskwallet.inintWeb3();  
            if(this.props.common.userInfo.ethAddress ===this.props.metamaskwallet.metamaskAddress.toLocaleLowerCase()){
                return false;
            }          
            // 如果存在
            if(!!this.props.metamaskwallet.metamaskAddress){
                this.props.personedit.bindWalletAddress(type,this.props.metamaskwallet.metamaskAddress)
            }
        }
        return true;
    }
    // 限制图片上传大小与格式
    private beforeUpload = (file: RcFile) =>
    {
        // 图片大小限制不超过1Mb
        if (file.size / 1024 / 1024 > 1)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.imgerr);
            return false;
        }
        // todo commonStore
        this.handleUploadPicture(file);
        return false;
    }
    // 上传头像，并提交
    private handleUploadPicture = async (file: RcFile) =>
    {
        const res = await this.props.common.uploadFile(file);
        if (res)
        {
            const imgRes = await this.props.personedit.updateUserImg(res);
            if (imgRes && this.props.common.userInfo)
            {
                this.props.common.userInfo.headIconUrl = res;
            }
        }
    }
    // 输入个人简介
    private handleToChangeDes = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        //
        this.setState({
            briefTextarea: ev.target.value.trim()
        })
    }
    // 确认修改个人简历
    private handleToSaveDrief = async () =>
    {
        const res = await this.props.personedit.updateUserBrief(this.state.briefTextarea);
        if (res)
        {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.drieftips);
        }
        else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.drieferr);
        }
        this.handleCancelEdit();
    }
    // 输入新的邮箱
    private handleToChangeEmail = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.props.personedit.newEmailCode = '';
        this.setState({
            emailInput: ev.target.value.trim()
        })
    }
    // 邮箱验证
    private handleTocheckEmail = async () =>
    {
        if (!this.state.emailInput)
        {
            return
        }
        const res = await this.props.personedit.checkEmail(this.state.emailInput);
        // const re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,10}$/;
        if (res)
        {
            this.setState({
                isSaveEmail: true
            })
        } else
        {
            this.setState({
                isSaveEmail: false
            })
        }
    }
    // 修改邮箱时的密码输入
    private handleToEnterPwd = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (this.props.personedit.newEmailCode === CodeType.passwordError)
        {
            this.props.personedit.newEmailCode = '';
        }
        this.setState({
            emailPwd: ev.target.value.trim()
        })
    }
    // 确认修改新的邮箱
    private handleToSaveNewEmail = async () =>
    {
        if (!this.state.emailInput || !this.state.emailPwd || !this.state.isSaveEmail)
        {
            return
        }
        const res = await this.props.personedit.updateUserEmail(this.state.emailInput, this.state.emailPwd);
        if (res)
        {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.emailtips);
            this.handleCancelEdit();
        }
        else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.emailerr);
        }
    }

    // 输入旧密码密码
    private handleToChangeOldPwd = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.props.personedit.newPwdCode = '';
        this.setState({
            oldPwd: ev.target.value.trim()
        })
    }
    // 输入新的密码
    private handleToChangeNewPwd = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            newPwd: ev.target.value.trim()
        })
    }
    // 确认修改密码
    private handleToSaveNewPwd = async () =>
    {
        if (!this.state.oldPwd || !this.state.newPwd)
        {
            return
        }
        const res = await this.props.personedit.updatePwd(this.state.oldPwd, this.state.newPwd);

        if (res)
        {
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.pwdtips);
            this.handleCancelEdit();
            // this.props.common.logoutFutureDao();
            // this.props.history.push('/load/login');
        }
        else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.pwderr);
        }

    }
    // 点击进行编辑
    private handleEditPerson = (num: number) =>
    {
        if (this.state.isEditStatus)
        {
            return
        }
        this.setState({
            isEditDes: num === 1 ? true : false,
            isEditEmail: num === 2 ? true : false,
            isEditPwd: num === 3 ? true : false,
            isEditStatus: true
        })
    }
    // 取消编辑
    private handleCancelEdit = () =>
    {
        this.setState({
            isEditDes: false,
            isEditEmail: false,
            isEditPwd: false,
            isEditStatus: false,
            emailInput: '',
            emailPwd: '',
            oldPwd: '',
            newPwd: '',
            isSaveEmail: false,
            isSavePwd: false,
        })
        this.props.personedit.newEmailCode = '';
        this.props.personedit.newPwdCode = '';
    }
}

export default injectIntl(PersonalEidt);
