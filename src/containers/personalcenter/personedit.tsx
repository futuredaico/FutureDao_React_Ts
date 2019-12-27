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
import { RcFile } from 'antd/lib/upload';
interface IState
{
    isEditName: boolean, // 名称
    isEditStatus: boolean, // 编辑时态，若是有一个在编辑，其他都得置灰，true为置灰
    nameInput: string, // 个人简介内容
    isEditNeo:boolean, // neo钱包
    isEditEth:boolean, // eth钱包
}
@inject('personedit', 'common','teemowallet','metamaskwallet')
@observer
class PersonalEidt extends React.Component<IPersonProps, IState> {
    public intrl = this.props.intl.messages;
    public state:IState = {
        isEditName: false,
        isEditStatus: false,
        nameInput: '',
        isEditNeo:false,
        isEditEth:false,
    }

    public render()
    {
        const infoClassName = classnames('person-info', this.state.isEditStatus ? 'gray-status' : '');
        const nameClassName = classnames('info-line', this.state.isEditName ? 'active-eidt' : '');
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
                        {/* <strong className="person-name">{this.props.common.userInfo.username}</strong> */}
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
                    {/* 编辑名称 */}
                    <div className={nameClassName}>
                        <div className="edit-title">
                            <strong>{this.intrl.user.name}</strong>
                            {
                                !this.state.isEditName && <div className="edit-img" onClick={this.handleEditPerson.bind(this, 1)} />
                            }
                            {/* <div className="edit-img" onClick={this.handleEditPerson.bind(this, 1)} /> */}
                        </div>
                        {
                            this.state.isEditName
                                ? (
                                    <>
                                        <Input
                                            // placeholder={this.intrl.user.newemail}
                                            className="edit-input"
                                            value={this.state.nameInput}
                                            onChange={this.handleToChangeName}
                                            // onBlur={this.handleTocheckName}
                                        />
                                        <div className="personedit-btn">
                                            <Button text={this.intrl.btn.cancel} btnColor="red-btn" onClick={this.handleCancelEdit} />
                                            <Button text={this.intrl.btn.checkupdate} onClick={this.handleToSaveUsername} />
                                        </div>
                                    </>
                                )
                                : <span>
                                    {
                                        this.props.common.userInfo.username !== '' ? this.props.common.userInfo.username : this.intrl.user.shen
                                    }
                                </span>
                        }
                    </div>  
                    {/* 编辑钱包 */}
                    <div className={nameClassName}>
                        <div className="edit-title">
                            <strong>{this.intrl.user.address}</strong>                            
                        </div>
                        {
                            this.props.common.userInfo.address!==""
                                ? <span>{this.props.common.userInfo.address}</span>                                
                                : <span className="nobind-text">-</span>
                        }
                    </div>  
                    
                </div>
            </div>
        );
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
    // 输入用户名称
    private handleToChangeName = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        //
        this.setState({
            nameInput: ev.target.value.trim()
        })
    }
    // 确认修改用户名称
    private handleToSaveUsername = async () =>
    {
        const res = await this.props.personedit.updateName(this.state.nameInput);
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
    // 点击进行编辑
    private handleEditPerson = (num: number) =>
    {
        if (this.state.isEditStatus)
        {
            return
        }
        this.setState({
            isEditName: num === 1 ? true : false,
            isEditStatus: true
        })
    }
    // 取消编辑
    private handleCancelEdit = () =>
    {
        this.setState({
            isEditName: false,
            isEditStatus: false
        })
        this.props.personedit.newEmailCode = '';
        this.props.personedit.newPwdCode = '';
    }
}

export default injectIntl(PersonalEidt);
