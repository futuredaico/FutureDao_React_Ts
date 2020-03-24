/**
 * 创建futuredao
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input, Upload, Icon } from 'antd';
// import Select from '@/components/select';
import Editor from '@/components/braftEditor';
import BraftEditor from 'braft-editor';
import Button from '@/components/Button';
import { RcFile } from 'antd/lib/upload';
import commonStore from '@/store/common';
import { IProjectProps } from '../interface/project.interface';

interface IState
{
    desValue: string, // 项目简介
    textareaEnter: boolean, // 是否输入了项目介绍
    webInput: string, // 官网
    webInputEnter: boolean, // 官网格式验证
    imageUrl: string,  // 封面
    loading: boolean,  // 上传图片是否正在加载中
    videoUrl: string, // 视频
    loadingVideo: boolean // 视频加载
    projDetail: string, // 文本编辑内容(传给后端的)
    projectDetails: string,// 文本编辑内容（显示用的）
    detailEnter: boolean, // 是否输入了详情
    isOkSave: boolean // 是否能提交创建
}
@inject('project', 'editproject','common')
@observer
class EditInfo extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        desValue: "",
        textareaEnter: false,
        webInput: "",
        webInputEnter: true,
        imageUrl: "",
        loading: false,
        videoUrl: "",
        loadingVideo: false,
        projDetail: "",
        projectDetails: "",
        detailEnter: false,
        isOkSave: false
    };
    public componentDidMount()
    {
        const projectId = this.props.match.params.projectId;
        if (projectId)
        {
            this.initProjectData(projectId);
        }
    }
    public render()
    {
        const uploadButton = (
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
        );
        const uploadVideoButton = (
            <div>
                <Icon type={this.state.loadingVideo ? 'loading' : 'plus'} />
                {
                    !this.state.loadingVideo && (
                        <>
                            <div className="ant-upload-text">{this.intrl.edit.uploadvideo}</div>
                            <span className="small-text">{this.intrl.edit.videotips}</span>
                        </>
                    )
                }
            </div>
        );
        return (
            <div className="createfuture-page" id="projectname">
                {/* 项目名称 */}
                <div className="inline-title">
                    <strong>{this.intrl.edit.name}</strong>&nbsp;
                    <span className="red-type">*</span>&nbsp;&nbsp;
                    <span className="tips-text">{this.intrl.edit.nametips}</span>
                </div>
                <div className="inline-enter">
                    <Input
                        maxLength={30}
                        value={this.props.editproject.editContent.projName}
                        readOnly={true}
                    />
                </div>
                {/* 项目标题 */}
                <div className="inline-title">
                    <strong>{this.intrl.edit.title}</strong>&nbsp;
                    <span className="red-type">*</span>&nbsp;&nbsp;
                    <span className="tips-text">{this.intrl.edit.titletips}</span>
                </div>
                <div className="inline-enter">
                    <Input
                        maxLength={60}
                        value={this.props.editproject.editContent.projTitle}
                        readOnly={true}
                    />
                </div>
                {/* 项目简介 */}
                <div className="inline-title">
                    <strong>{this.intrl.edit.intro}</strong>&nbsp;
                    <span className="red-type">*</span>
                </div>
                <div className="inline-enter">
                    <textarea
                        className={(this.state.desValue && this.state.textareaEnter) ? "textarea-wrapper err-active" : "textarea-wrapper"}
                        maxLength={400}
                        style={{ resize: 'none' }}
                        onChange={this.handleChangeDes}
                        value={this.state.desValue}
                    />
                    {
                        this.state.desValue && this.state.textareaEnter && <span className="err-span">{this.intrl.edit.error}</span>
                    }
                </div>
                {/* 官方网站 */}
                <div className="inline-title">
                    <strong>{this.intrl.edit.website}</strong>
                </div>
                <div className="inline-enter">
                    <Input
                        maxLength={40}
                        value={this.state.webInput}
                        onChange={this.handleToWebChange}
                        className={(this.state.webInput && !this.state.webInputEnter) ? "err-active" : ''}
                    />
                    {
                        (this.state.webInput && !this.state.webInputEnter) && <span className="err-span">{this.intrl.edit.urlerror}</span>
                    }
                </div>
                {/* 项目封面 */}
                <div className="inline-title">
                    <strong>{this.intrl.edit.cover}</strong>
                </div>
                <div className="inline-enter">
                {
                        this.state.imageUrl
                            ? <div className="video-wrapper">
                                <div className="coverurl-icon">
                                    <img src={this.state.imageUrl} alt="avatar" /> 
                                </div>                                
                                <div className="video-btn-wrapper">
                                    <Button text={this.intrl.btn.delete} onClick={this.handleToDeleteCoverUrl} btnColor='gray-red' btnSize="video-btn" />
                                    <Upload
                                        name="avatar"
                                        // listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        accept="image/*,/pdf"
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={this.beforeUpload}
                                    >
                                        <Button text="更换图片" btnColor='gray-black' btnSize="video-btn" />
                                    </Upload>
                                </div>
                            </div>
                            : <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                accept="image/*,/pdf"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={this.beforeUpload}
                            >
                                {uploadButton}
                            </Upload>
                    }
                </div>
                {/* 视频介绍 */}
                <div className="inline-title big-htitle">
                    <strong>{this.intrl.edit.videotitle}</strong>
                </div>
                <div className="inline-enter">
                    {
                        this.state.videoUrl
                            ? <div className="video-wrapper">
                                <div className="video-icon">
                                    <video src={this.state.videoUrl} controls={true} />
                                </div>
                                <div className="video-btn-wrapper">
                                    <Button text={this.intrl.btn.delete} onClick={this.handleToDeleteVideo} btnColor='gray-red' btnSize="video-btn" />
                                    <Upload
                                        name="avatar"
                                        // listType="picture-card"
                                        className="avatar-uploader"
                                        accept="video/*"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={this.beforeUploadVideo}
                                    // onChange={this.handleChangeImg}
                                    >
                                        <Button text={this.intrl.btn.updatevideo} btnColor='gray-black' btnSize="video-btn" />
                                    </Upload>
                                </div>
                            </div>
                            : <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                accept="video/*"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={this.beforeUploadVideo}
                            // onChange={this.handleChangeImg}
                            >
                                {uploadVideoButton}
                            </Upload>
                    }

                </div>
                {/* 项目详情 */}
                <div className="inline-title big-htitle">
                    <strong>{this.intrl.edit.detail}</strong>&nbsp;
                    <span className="red-type">*</span>
                </div>
                <div className="inline-enter">
                    <div style={{ width: 750, minHeight: 500, maxHeight: 1000 }}>
                        <Editor
                            onChange={this.onChangeEditorValue}
                            value={this.state.projectDetails}
                            className={(this.state.projectDetails && this.state.detailEnter) ? "err-active" : ''}
                        />
                        {
                            this.state.projectDetails && this.state.detailEnter && <span className="err-span">{this.intrl.edit.error}</span>
                        }
                    </div>
                </div>
                <div className="inline-btn">
                    <Button
                        text={this.intrl.btn.save}
                        btnSize="bg-btn"
                        onClick={this.handleToSaveFutureProject}
                        btnColor={!this.state.isOkSave ? 'gray-btn' : ''}
                    />
                </div>
            </div >
        );
    }
    private initProjectData = async (projectId:string)=>{
        await this.props.editproject.getProject(projectId);
        this.setState({
            desValue: this.props.editproject.editContent.projBrief,
            webInput: this.props.editproject.editContent.officialWeb,
            imageUrl: this.props.editproject.editContent.projCoverUrl,
            videoUrl: this.props.editproject.editContent.projVideoUrl,
            projDetail: this.props.editproject.editContent.projDetail,
            projectDetails: BraftEditor.createEditorState(this.props.editproject.editContent.projDetail),
        })
    }
    // 官网的输入
    private handleToWebChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        const re = new RegExp(/((https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/gi);
        const inputStr = ev.target.value.trim();
        this.setState({
            webInput: inputStr,
            webInputEnter: re.test(inputStr)
        }, () =>
        {
            this.checkInputStatus();
        })
    }
    // 删除视频
    private handleToDeleteVideo = () =>
    {
        this.setState({
            videoUrl: '',
            loading: false
        }, () =>
        {
            this.checkInputStatus();
        })
    }
    // 限制图片上传大小与格式
    private beforeUpload = (file: RcFile) =>
    {
        // 限制大小3M以下
        if (file.size / 1024 / 1024 > 3)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.imgerr);
            return false;
        }
        this.setState({
            loading: true
        }, () =>
        {
            this.checkInputStatus();
        })
        this.handleUploadCoverPicture(file);
        // todo commonStore
        return true;
    }
    // 删除封面
    private handleToDeleteCoverUrl = () =>
    {
        this.setState({
            imageUrl: '',
            loading: false
        }, () =>
        {
            this.checkInputStatus();
        })
    }
    // 上传封面
    private handleUploadCoverPicture = async (file: RcFile) =>
    {
        const res = await commonStore.uploadFile(file);
        if (res)
        {
            this.setState({
                imageUrl: res,
                loading: false
            }, () =>
            {
                this.checkInputStatus();
            })
        } else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.imgerr);
            this.setState({
                imageUrl: '',
                loading: false
            }, () =>
            {
                this.checkInputStatus();
            })
        }
    }
    // 限制视频上传大小与格式
    private beforeUploadVideo = (file: RcFile) =>
    {
        // 视频文件限制200M以内
        if (file.size / 1024 / 1024 > 200)
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.videoerr);
            return false;
        }
        this.setState({
            videoUrl: '',
            loadingVideo: true
        }, () =>
        {
            this.checkInputStatus();
        })
        this.handleUploadVedio(file);
        // todo commonStore
        return true;
    }
    // 上传视频
    private handleUploadVedio = async (file: RcFile) =>
    {
        const res = await commonStore.uploadVideo(file);
        if (res)
        {
            this.setState({
                videoUrl: res,
                loadingVideo: false
            }, () =>
            {
                this.checkInputStatus();
            })
        } else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.videoerr2);
            this.setState({
                videoUrl: '',
                loading: false
            }, () =>
            {
                this.checkInputStatus();
            })
        }
    }
    // 获取项目简介的输入字数
    private handleChangeDes = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        const str = ev.target.value;
        this.setState({
            desValue: str,
            textareaEnter: false
        }, () =>
        {
            this.checkInputStatus();
        })
    }
    // 项目详情文本框的输入
    private onChangeEditorValue = (value: any) =>
    {

        // todo
        const text = value.toText();
        if (text !== "")
        {
            this.setState({
                projDetail: BraftEditor.createEditorState(value).toHTML().replace(/\s\s/g, '&nbsp;&nbsp;'),
                projectDetails: BraftEditor.createEditorState(value),
                detailEnter: false
            }, () =>
            {
                this.checkInputStatus();
            })
        }
    }
    // 创建项目
    private handleToSaveFutureProject = async () =>
    {
        if (!this.state.isOkSave)
        {
            return false
        }
        this.props.editproject.editContent.projBrief = this.state.desValue;
        this.props.editproject.editContent.officialWeb =this.state.webInput;
        this.props.editproject.editContent.projCoverUrl =this.state.imageUrl;
        this.props.editproject.editContent.projVideoUrl = this.state.videoUrl;
        this.props.editproject.editContent.projDetail=this.state.projDetail;
        
        console.log(this.props.editproject.editContent)
        const saveResult = await this.props.editproject.modifyProject();
        if (saveResult)
        {
            this.initProjectData(this.props.editproject.editContent.projId)
            this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, "保存成功");
            
        } else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, "保存失败");
        }

        return true;
    }
    // 检查填写情况
    private checkInputStatus = () =>
    {
        let isOk = true;
        if (!this.state.desValue)
        {
            this.setState({
                textareaEnter: true
            })
            window.scrollTo(0, 0);
            isOk = false;
        }
        if (this.state.webInput && !this.state.webInputEnter)
        {
            isOk = false;
        }
        if (!this.state.projectDetails)
        {
            this.setState({
                detailEnter: true
            })
            isOk = false;
        }
        this.setState({
            isOkSave: isOk
        })
    }
}

export default injectIntl(EditInfo);