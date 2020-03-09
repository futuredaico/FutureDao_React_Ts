/**
 * 基础信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input, Upload, Icon } from 'antd';
// import Select from '@/components/select';
import Editor from '@/components/braftEditor';
import BraftEditor from 'braft-editor';
import Button from '@/components/Button';
import { RcFile } from 'antd/lib/upload';
import commonStore from '@/store/common';
import { ProjSubState } from '@/store/interface/common.interface';
import { IProjectProps } from '../interface/project.interface';
interface IState
{
    nameValue: string, // 项目名称
    titleValue: string, // 项目标题
    typeValue: string, // 项目类型
    imageUrl: string,  // 封面
    loading: boolean,  // 上传图片是否正在加载中
    textareaValue: string, // 项目简介
    textareaNum: number, // 项目简介统计
    nameEnter: boolean, // 是否输入了名称
    titleEnter: boolean,// 是否输入了标题
    imgEnter: boolean, // 是否上传了封面
    textareaEnter: boolean, // 是否输入了项目介绍
    webInput: string, // 官网
    videoUrl: string, // 视频
    loadingVideo: boolean // 视频加载
    projDetail: string, // 文本编辑内容
    projectDetails: string,// 文本编辑内容
    detailEnter: boolean,
}

@observer
class StepOne extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        nameValue: '', // 项目名称
        titleValue: '', // 项目标题
        typeValue: '', // 项目类型
        imageUrl: '',  // 封面
        loading: false,
        textareaValue: '', // 项目简介
        textareaNum: 0, // 项目简介统计
        nameEnter: false,
        titleEnter: false,
        imgEnter: false,
        textareaEnter: false,
        webInput: "",
        videoUrl: '',
        loadingVideo: false,
        projDetail: '', // 文本编辑内容
        projectDetails: '',
        detailEnter: false,
    };
    // 下拉筛选
    //   private mydeityOptions = [
    //     {
    //       id: 'game',
    //       name: this.intrl.card.game,
    //     },
    //     {
    //       id: 'comic',
    //       name: this.intrl.card.movies,
    //     },
    //     {
    //       id: 'movie',
    //       name: this.intrl.card.animation,
    //     },
    //     {
    //       id: 'other',
    //       name: this.intrl.card.other,
    //     }
    //   ]

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
                <div className="big-title"><strong>项目信息</strong></div>
                {/* 项目名称 */}
                <div className="inline-title">
                    <strong>{this.intrl.edit.name}</strong>&nbsp;
                    <span className="red-type">*</span>&nbsp;&nbsp;
                    <span className="tips-text">{this.intrl.edit.nametips}</span>
                </div>
                <div className="inline-enter">
                    <Input maxLength={30} value={this.state.nameValue} onChange={this.handleToChangeName} className={this.state.nameEnter ? "err-active" : ''} />
                    {
                        this.state.nameEnter && <span className="err-span">{this.intrl.edit.error}</span>
                    }
                </div>
                {/* 项目标题 */}
                <div className="inline-title">
                    <strong>{this.intrl.edit.title}</strong>&nbsp;
                    <span className="red-type">*</span>&nbsp;&nbsp;
                    <span className="tips-text">{this.intrl.edit.titletips}</span>
                </div>
                <div className="inline-enter">
                    <Input maxLength={60} value={this.state.titleValue} onChange={this.handleToChangeTitle} className={this.state.titleEnter ? "err-active" : ''} />
                    {
                        this.state.titleEnter && <span className="err-span">{this.intrl.edit.error}</span>
                    }
                </div>
                {/* 项目简介 */}
                <div className="inline-title">
                    <strong>{this.intrl.edit.intro}</strong>&nbsp;
                    <span className="red-type">*</span>
                </div>
                <div className="inline-enter">
                    {/* <span className="text-numb">{this.state.textareaNum}/400</span> */}
                    <textarea className={this.state.textareaEnter ? "textarea-wrapper err-active" : "textarea-wrapper"} maxLength={400} style={{ resize: 'none' }} onChange={this.handleGetLength} value={this.state.textareaValue} />
                    {
                        this.state.textareaEnter && <span className="err-span">{this.intrl.edit.error}</span>
                    }
                </div>
                {/* 官方网站 */}
                <div className="inline-title">
                    <strong>{this.intrl.edit.website}</strong>
                </div>
                <div className="inline-enter">
                    <Input maxLength={40} value={this.state.webInput} onChange={this.handleToWebChange} />
                </div>
                {/* 项目封面 */}
                <div className="inline-title">
                    <strong>{this.intrl.edit.cover}</strong>&nbsp;
                    <span className="red-type">*</span>
                </div>
                <div className="inline-enter">
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
                        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
                    </Upload>
                    {
                        this.state.imgEnter && <span className="err-span">{this.intrl.edit.error}</span>
                    }
                </div>
                {/* 视频介绍 */}
                <div className="inline-title">
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
                <div className="inline-title">
                    <strong>{this.intrl.edit.detail}</strong>&nbsp;
                    <span className="red-type">*</span>
                </div>
                <div className="inline-enter">
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
                {/* 项目类型 */}
                {/* <div className="inline-title">
                    <strong>{this.intrl.edit.type}</strong>&nbsp;
                    <span className="red-type">*</span>&nbsp;&nbsp;
                    <span className="tips-text">{this.intrl.edit.typetips}</span>
                    </div>
                    <div className="inline-enter">
                    <Select options={this.mydeityOptions} text='' onCallback={this.onSelletCallback} defaultValue={this.state.typeValue} />
                </div> */}
                <div className="inline-btn">
                    <Button
                        text={this.intrl.btn.save}
                        btnSize="bg-btn"
                        onClick={this.handleToEditproject}
                        btnColor={(!this.state.nameValue || !this.state.titleValue || !this.state.textareaValue || !this.state.imageUrl) ? 'gray-btn' : ''}
                    />
                </div>
            </div >
        );
    }
    // 项目名称
    private handleToChangeName = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        //
        this.setState({
            nameValue: ev.target.value,
            nameEnter: false
        })
    }
    // 项目标题
    private handleToChangeTitle = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        //
        this.setState({
            titleValue: ev.target.value,
            titleEnter: false
        })
    }
    // 官网的输入
    private handleToWebChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({
            webInput: ev.target.value.trim()
        })
    }
    // 删除视频
    private handleToDeleteVideo = () =>
    {
        this.setState({
            videoUrl: '',
            loading: false
        })
    }
    // 下拉框选择
    //   private onSelletCallback = (item) =>
    //   {
    //     // todo
    //     this.setState({
    //       typeValue: item.id
    //     })
    //   }
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
        })
        this.handleUploadCoverPicture(file);
        // todo commonStore
        return true;
    }
    // 上传封面
    private handleUploadCoverPicture = async (file: RcFile) =>
    {
        const res = await commonStore.uploadFile(file);
        if (res)
        {
            this.setState({
                imageUrl: res,
                imgEnter: false,
                loading: false
            })
        } else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.imgerr);
            this.setState({
                imageUrl: '',
                imgEnter: true,
                loading: false
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
            })
        } else
        {
            this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.videoerr2);
            this.setState({
                videoUrl: '',
                loading: false
            })
        }
    }
    // 获取项目简介的输入字数
    private handleGetLength = (e) =>
    {
        const str = e.target.value;
        this.setState({
            textareaValue: str,
            textareaNum: str.length,
            textareaEnter: false
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
            })
        }
    }
    // 创建项目
    private handleToEditproject = async () =>
    {

        const res = this.checkInputStatus();
        if (!res)
        {
            return
        }
        // 区分是新建项目还是管理项目
        const projectId = this.props.match.params.projectId;
        if (!projectId)
        {
            this.props.editproject.editContent = {
                projId: '',
                projName: this.state.nameValue,
                projTitle: this.state.titleValue,
                projType: this.state.typeValue,
                projConverUrl: this.state.imageUrl,
                projBrief: this.state.textareaValue,
                projVideoUrl: '',
                projDetail: '',
                connectEmail: '',
                officialWeb: '',
                community: '',
                projState: 'reading',
                projSubState: 'init',
                role: 'admin'
            }
            const crestResult = await this.props.editproject.modifyProject();
            if (crestResult)
            {
                // this.props.editproject.step = 2;
                // this.props.editproject.stepOneStatus = 2;
                // this.props.editproject.stepTwoStatus = 3;
                // this.props.editproject.stepThreeStatus = 3;
                this.props.project.isEdit = true;
                window.scrollTo(0, 0);
                this.props.history.push('/project/' + this.props.editproject.editContent.projId + '?type=create');
            } else
            {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.createerr);
            }
        } else
        {
            if (this.props.editproject.editContent.projSubState === ProjSubState.Auditing)
            {
                this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.editerr2);
                return false;
            }
            //   const content: string[] = [
            //     this.props.common.userId,
            //     this.props.common.token,
            //     this.props.editproject.editContent.projId,
            //     this.state.nameValue,
            //     this.state.titleValue,
            //     this.state.typeValue,
            //     this.state.imageUrl,
            //     this.state.textareaValue
            //   ]
            //   const creatResult = await this.props.editproject.modifyStepOne(content);
            //   if (creatResult)
            //   {
            //     window.scrollTo(0, 0)
            //   }
        }
        return true;
    }
    // 检查填写情况
    private checkInputStatus = () =>
    {
        if (!this.state.nameValue)
        {
            this.setState({
                nameEnter: true
            })
            // window.location.hash='#projectname'
            window.scrollTo(0, 0);
            return false
        }
        if (!this.state.titleValue)
        {
            this.setState({
                titleEnter: true
            })
            window.scrollTo(0, 0);
            return false
        }
        if (!this.state.imageUrl)
        {
            this.setState({
                imgEnter: true
            })
            return false
        }
        if (!this.state.textareaValue)
        {
            this.setState({
                textareaEnter: true
            })
            return false
        }
        return true
    }
}

export default injectIntl(StepOne);
