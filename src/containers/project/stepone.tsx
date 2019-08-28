/**
 * 基础信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input, Upload, Icon } from 'antd';
import Select from '@/components/select';
import Button from '@/components/Button';
import { RcFile } from 'antd/lib/upload';
import commonStore from '@/store/common';
import { ICreateProjectProps } from './interface/createproject.interface';
import { ProjSubState } from '@/store/interface/common.interface';


@observer
class StepOne extends React.Component<ICreateProjectProps, any> {

  public state = {
    nameValue: this.props.createproject.createContent.projName, // 项目名称
    titleValue: this.props.createproject.createContent.projTitle, // 项目标题
    typeValue: this.props.createproject.createContent.projType, // 项目类型
    imageUrl: this.props.createproject.createContent.projConverUrl,  // 封面
    loading: false,
    textareaValue: this.props.createproject.createContent.projBrief, // 项目简介
    textareaNum: 0, // 项目简介统计
    nameEnter: false,
    titleEnter: false,
    imgEnter: false,
    textareaEnter: false,
  };
  // 下拉筛选
  private mydeityOptions = [
    {
      id: 'game',
      name: '游戏',
    },
    {
      id: 'comic',
      name: '电影',
    },
    {
      id: 'movie',
      name: '动漫',
    },
    {
      id: 'other',
      name: '其他',
    }
  ]

  public render()
  {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        {
          !this.state.loading && (
            <>
              <div className="ant-upload-text">上传封面图</div>
              <span className="small-text">尺寸 750*480，格式 jpg，png，分辨率72像素/英寸，不大于3MB</span>
            </>
          )
        }
      </div>
    );
    return (
      <div className="stepone-page" id="projectname">
        <div className="inline-title">
          <strong>项目名称</strong>&nbsp;
          <span className="red-type">*</span>&nbsp;&nbsp;
          <span className="tips-text">（ 一个简短的名称，会在发送邮件、通知消息或对别人提起时用到，30字以内 ）</span>
        </div>
        <div className="inline-enter">
          <Input maxLength={30} value={this.state.nameValue} onChange={this.handleToChangeName} className={this.state.nameEnter ? "err-active" : ''} />
          {
            this.state.nameEnter && <span className="err-span">填写本栏信息</span>
          }
        </div>
        <div className="inline-title">
          <strong>项目标题</strong>&nbsp;
          <span className="red-type">*</span>&nbsp;&nbsp;
          <span className="tips-text">（ 用于展示在首页的标题，60字以内 ）</span>
        </div>
        <div className="inline-enter">
          <Input maxLength={60} value={this.state.titleValue} onChange={this.handleToChangeTitle} className={this.state.titleEnter ? "err-active" : ''} />
          {
            this.state.titleEnter && <span className="err-span">填写本栏信息</span>
          }
        </div>
        <div className="inline-title">
          <strong>项目类型</strong>&nbsp;
          <span className="red-type">*</span>&nbsp;&nbsp;
          <span className="tips-text">（ 为你的项目进行归类 ）</span>
        </div>
        <div className="inline-enter">
          <Select options={this.mydeityOptions} text='' onCallback={this.onSelletCallback} defaultValue={this.state.typeValue} />
        </div>
        <div className="inline-title">
          <strong>项目封面</strong>&nbsp;
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
            this.state.imgEnter && <span className="err-span">填写本栏信息</span>
          }
        </div>
        <div className="inline-title">
          <strong>项目简介</strong>&nbsp;
          <span className="red-type">*</span>
        </div>
        <div className="inline-enter">
          <span className="text-numb">{this.state.textareaNum}/400</span>
          <textarea className={this.state.textareaEnter ? "textarea-wrapper err-active" : "textarea-wrapper"} maxLength={400} style={{ resize: 'none' }} onChange={this.handleGetLength} value={this.state.textareaValue} />
          {
            this.state.textareaEnter && <span className="err-span">填写本栏信息</span>
          }
        </div>
        <div className="inline-btn">
          <Button
            text="创建项目并继续"
            btnSize="bg-btn"
            onClick={this.handleToCreateProject}
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
  // 下拉框选择
  private onSelletCallback = (item) =>
  {
    // todo
    this.setState({
      typeValue: item.id
    })
  }
  // 限制图片上传大小与格式
  private beforeUpload = (file: RcFile) =>
  {
    // 限制大小3M以下
    if (file.size / 1024 / 1024 > 3)
    {
      this.props.common.openNotificationWithIcon('error', '操作失败', '图片太大了');
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
      this.setState({
        imageUrl: null,
        imgEnter: true,
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
  // 创建项目
  private handleToCreateProject = async () =>
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
      this.props.createproject.createContent = {
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
      const crestResult = await this.props.createproject.createProject();
      if (crestResult)
      {
        this.props.createproject.step = 2;
        this.props.createproject.stepOneStatus = 2;
        this.props.createproject.stepTwoStatus = 3;
        this.props.createproject.stepThreeStatus = 3;
        this.props.project.isEdit = true;
        window.scrollTo(0, 0);
        this.props.history.push('/project/' + this.props.createproject.createContent.projId);
      } else
      {
        this.props.common.openNotificationWithIcon('error', '操作失败', '项目创建失败，已有该项目名称或项目标题');
      }
    } else
    {
      if (this.props.createproject.createContent.projSubState === ProjSubState.Auditing)
      {
        this.props.common.openNotificationWithIcon('error', '操作失败', '项目正在审核中不可以修改哦');
        return false;
      }
      const content: string[] = [
        this.props.common.userId,
        this.props.common.token,
        this.props.createproject.createContent.projId,
        this.state.nameValue,
        this.state.titleValue,
        this.state.typeValue,
        this.state.imageUrl,
        this.state.textareaValue
      ]
      const creatResult = await this.props.createproject.modifyStepOne(content);
      console.log(creatResult)
      if (creatResult)
      {
        this.props.createproject.step = 2;
        window.scrollTo(0, 0)
      }
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
