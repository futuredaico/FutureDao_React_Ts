/**
 * 基础信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input, Upload, Icon, message } from 'antd';
import Select from '@/components/select';
import Button from '@/components/Button';
function getBase64(img, callback)
{
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
// 限制图片上传大小与格式
function beforeUpload(file)
{
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG)
  {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M)
  {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

@observer
class StepOne extends React.Component<any, any> {

  public state = {
    imageUrl: null,
    loading: false,
    textareaValue: '', // 文本输入框
    selectValue: '0' // 下拉框
  };
  // 下拉筛选
  private mydeityOptions = [
    {
      id: '0',
      name: '游戏',
    },
    {
      id: '1',
      name: '电影',
    },
    {
      id: '2',
      name: '动漫',
    },
    {
      id: '3',
      name: '其他',
    }
  ]
  public render()
  {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传封面图</div>
        <span className="small-text">尺寸 750*480，格式 jpg，png，分辨率72像素/英寸，不大于3MB</span>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div className="stepone-page">
        <div className="inline-title">
          <strong>项目名称</strong>&nbsp;
          <span className="red-type">*</span>&nbsp;&nbsp;
          <span className="tips-text">（ 一个简短的名称，会在发送邮件、通知消息或对别人提起时用到 ）</span>
        </div>
        <div className="inline-enter">
          <Input placeholder="Basic usage" />
        </div>
        <div className="inline-title">
          <strong>项目名称</strong>&nbsp;
          <span className="red-type">*</span>&nbsp;&nbsp;
          <span className="tips-text">（ 用于展示在首页的标题 ）</span>
        </div>
        <div className="inline-enter">
          <Input placeholder="Basic usage" />
        </div>
        <div className="inline-title">
          <strong>项目名称</strong>&nbsp;
          <span className="red-type">*</span>&nbsp;&nbsp;
          <span className="tips-text">（ 为你的项目进行归类 ）</span>
        </div>
        <div className="inline-enter">
          <Select defaultValue='0' options={this.mydeityOptions} text='' onCallback={this.onSelletCallback} />
        </div>
        <div className="inline-title">
          <strong>项目封面</strong>&nbsp;
          <span className="red-type">*</span>
        </div>
        <div className="inline-enter">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChangeImg}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
        </div>
        <div className="inline-title">
          <strong>项目封面</strong>&nbsp;
          <span className="red-type">*</span>
        </div>
        <div className="inline-enter">
          <span className="text-numb">1/40</span>
          <textarea className="textarea-wrapper" rows={4} maxLength={40} style={{ resize: 'none' }} onChange={this.handleGetLength} value={this.state.textareaValue} />
        </div>
        <div className="inline-btn">
          <Button text="创建项目并继续" btnSize="bg-btn" />
        </div>
      </div >
    );
  }
  // 下拉框选择
  private onSelletCallback = (item) =>
  {
    // todo
    this.setState({
      selectValue: item.id
    })
  }
  // 更换图片上传
  private handleChangeImg = info =>
  {
    if (info.file.status === 'uploading')
    {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done')
    {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  private handleGetLength = (e) =>
  {
    console.log(e.target.value)
    const str = e.target.value;
    let myLen: number = 0;
    for (let i = 0; (i < str.length) && (myLen <= 40 * 2); i++)
    {
      if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
      {
        myLen++;
      }
      else
      {
        myLen += 2;
      }
    }
    console.log(myLen)
    if (myLen <= 40)
    {
      this.setState({
        textareaValue: str
      })
    }
  }
}

export default injectIntl(StepOne);
