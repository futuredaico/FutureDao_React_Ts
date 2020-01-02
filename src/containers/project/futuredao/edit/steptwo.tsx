/**
 * 详细信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Upload, Icon } from 'antd';
import Editor from '@/components/braftEditor';
import BraftEditor from 'braft-editor';
import Button from '@/components/Button';
import commonStore from '@/store/common';
import { RcFile } from 'antd/lib/upload';
import { ICreateProjectProps } from '../interface/createproject.interface';
import { ProjSubState } from '@/store/interface/common.interface';
interface IState
{
  videoUrl: string,
  loading: boolean,
  projDetail: string, // 文本编辑内容
  projectDetails: string,
  detailEnter: boolean,
}
@observer
class StepTwo extends React.Component<ICreateProjectProps, IState> {
  public intrl = this.props.intl.messages;
  public state = {
    videoUrl: this.props.createproject.createContent.projVideoUrl,
    loading: false,
    projDetail: this.props.createproject.createContent.projDetail, // 文本编辑内容
    projectDetails: BraftEditor.createEditorState(this.props.createproject.createContent.projDetail),
    detailEnter: false,
  };
  public render()
  {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        {
          !this.state.loading && (
            <>
              <div className="ant-upload-text">{this.intrl.edit.uploadvideo}</div>
              <span className="small-text">{this.intrl.edit.videotips}</span>
            </>
          )
        }
      </div>
    );
    return (
      <div className="steptwo-page">
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
                    beforeUpload={this.beforeUpload}
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
                beforeUpload={this.beforeUpload}
              // onChange={this.handleChangeImg}
              >
                {uploadButton}
              </Upload>
          }

        </div>
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
        <div className="inline-btn">
          <Button text={this.intrl.btn.editstep2} btnSize="bg-btn" onClick={this.handleToSaveDetail} btnColor={!this.state.projDetail ? 'gray-btn' : ''} />
        </div>
      </div >
    );
  }
  // 限制视频上传大小与格式
  private beforeUpload = (file: RcFile) =>
  {
    // 视频文件限制200M以内
    if (file.size / 1024 / 1024 > 200)
    {
      this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.videoerr);
      return false;
    }
    this.setState({
      videoUrl: '',
      loading: true
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
        loading: false
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
  private handleToDeleteVideo = () =>
  {
    this.setState({
      videoUrl: '',
      loading: false
    })
  }
  // 文本框的输入
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
  // 保存并提交
  private handleToSaveDetail = async () =>
  {
    //
    if (this.props.createproject.createContent.projSubState === ProjSubState.Auditing)
    {
      this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.editerr2);
      return false;
    }
    const res = this.checkInputStatus();
    if (!res)
    {
      return
    }
    const video = this.state.videoUrl ? this.state.videoUrl : '';
    const content: string[] = [
      this.props.common.userId,
      this.props.common.token,
      this.props.createproject.createContent.projId,
      video,
      this.state.projDetail,
    ]
    const creatResult = await this.props.createproject.modifyStepTwo(content);
    if (creatResult)
    {
      this.props.createproject.step = 3;
      this.props.createproject.stepOneStatus = 2;
      this.props.createproject.stepTwoStatus = 2;
      this.props.createproject.stepThreeStatus = 1;
      window.scrollTo(0, 0)
    } else
    {
      this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.savefail);
    }
    return true;
  }
  // 校验必填参数是否填写了
  private checkInputStatus = () =>
  {
    if (!this.state.projDetail)
    {
      return false
    }
    return true
  }
}

export default injectIntl(StepTwo);