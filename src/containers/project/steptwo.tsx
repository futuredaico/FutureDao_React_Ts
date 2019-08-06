/**
 * 详细信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Upload, Icon } from 'antd';
import Editor from '@/components/braftEditor';
import BraftEditor from 'braft-editor';
import Button from '@/components/Button';
import commonStore from '@/store/common';
import { RcFile } from 'antd/lib/upload';
import { ICreateProjectProps } from './interface/createproject.interface';
import { ProjSubState } from '@/store/interface/common.interface';

@observer
class StepTwo extends React.Component<ICreateProjectProps, any> {
  public state = {
    imageUrl: this.props.createproject.createContent.videoBriefUrl,
    loading: false,
    projDetail: this.props.createproject.createContent.projDetail, // 文本编辑内容
    projectDetails: BraftEditor.createEditorState(this.props.createproject.createContent.projDetail),
    detailEnter: false,
  };
  public render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传视频文件</div>
        <span className="small-text">介绍介绍介绍</span>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    console.log(this.props.createproject.createContent.projDetail)
    return (
      <div className="steptwo-page">
        <div className="inline-title">
          <strong>视频介绍</strong>
        </div>
        <div className="inline-enter">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={this.beforeUpload}
          // onChange={this.handleChangeImg}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
        </div>
        <div className="inline-title">
          <strong>项目详情</strong>&nbsp;
          <span className="red-type">*</span>
        </div>
        <div className="inline-enter">
          <div style={{ width: 750, height: 374 }}>
            <Editor
              onChange={this.onChangeEditorValue}
              value={this.state.projectDetails}
              className={this.state.detailEnter ? "err-active" : ''}
            />
            {
              this.state.detailEnter && <span className="err-span">填写本栏信息</span>
            }
          </div>
        </div>
        <div className="inline-btn">
          <Button text="保存并继续" btnSize="bg-btn" onClick={this.handleToSaveDetail} />
        </div>
      </div >
    );
  }
  // 限制图片上传大小与格式
  private beforeUpload(file: RcFile) {
    if (file.size / 1024 / 1024 < 3) {
      return false;
    }
    // todo commonStore
    const res = commonStore.uploadFile(file);
    if (res) {
      this.setState({
        imageUrl: res['url']
      })
    }
    return false;
  }
  // 文本框的输入
  private onChangeEditorValue = (value: any) => {

    // todo
    const text = value.toText()
    if (text !== "") {
      this.setState({
        projDetail: BraftEditor.createEditorState(value).toHTML(),
        projectDetails: BraftEditor.createEditorState(value),
        detailEnter: false
      })
    }
  }
  // 保存并提交
  private handleToSaveDetail = async () => {
    //
    if(this.props.createproject.createContent.projSubState === ProjSubState.Auditing){
      this.props.common.openNotificationWithIcon('error', '操作失败', '项目正在审核中不可以修改哦');
      return false;
    }
    const res = this.checkInputStatus();
    if (!res) {
      return
    }

    const content: string[] = [
      this.props.common.userId,
      this.props.common.token,
      this.props.createproject.createContent.projId,
      '',
      '',
      '',
      '',
      '',
      '',// todo 暂时没有
      this.state.projDetail,
      '',
      '',
      ''
    ]
    const creatResult = await this.props.createproject.modifyProject(content);
    if (creatResult) {
      this.props.createproject.step = 3;
      this.props.createproject.stepOneStatus = 2;
      this.props.createproject.stepTwoStatus = 2;
      this.props.createproject.stepThreeStatus = 1;
      window.scrollTo(0, 0)
    }
    return true;
  }
  // 校验必填参数是否填写了
  private checkInputStatus = () => {
    if (!this.state.projDetail) {
      return false
    }
    return true
  }
}

export default injectIntl(StepTwo);
