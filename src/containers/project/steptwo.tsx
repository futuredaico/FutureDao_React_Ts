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



@observer
class StepTwo extends React.Component<any, any> {
  public state = {
    imageUrl: null,
    loading: false,
    editorString: '', // 文本编辑内容
  };
  public render()
  {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传视频文件</div>
        <span className="small-text">介绍介绍介绍</span>
      </div>
    );
    const imageUrl = this.state.imageUrl;
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
              value={this.state.editorString}
            />
          </div>
        </div>
        <div className="inline-btn">
          <Button text="保存并继续" btnSize="bg-btn" />
        </div>
      </div >
    );
  }
  // 限制图片上传大小与格式
private beforeUpload(file:RcFile)
{
  if(file.size / 1024 / 1024 < 3) {
    return false;
  }
  const res = commonStore.uploadFile(file);
  if(res) {
    this.setState({
      imageUrl:res['url']
    })
  }
  return false;
}
  // 更换图片上传
  // private handleChangeImg = info =>
  // {
  //   if (info.file.status === 'uploading')
  //   {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done')
  //   {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl =>
  //       this.setState({
  //         imageUrl,
  //         loading: false,
  //       }),
  //     );
  //   }
  // };
  // 文本框的输入
  private onChangeEditorValue = (value: any) =>
  {
    
      // todo
      const text = value.toText()
      if (text !== "")
      {
          this.setState({
              editorString: BraftEditor.createEditorState(value),
              projectDetails: text
          },()=>{
            console.log(this.state.editorString)
          })
      }
  }
}

export default injectIntl(StepTwo);
