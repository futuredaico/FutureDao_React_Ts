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
}

@observer
class StepOne extends React.Component<ICreateProjectProps, IState> {
  public intrl = this.props.intl.messages;
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
      name: this.intrl.card.game,
    },
    {
      id: 'comic',
      name: this.intrl.card.movies,
    },
    {
      id: 'movie',
      name: this.intrl.card.animation,
    },
    {
      id: 'other',
      name: this.intrl.card.other,
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
              <div className="ant-upload-text">{this.intrl.edit.uploadcover}</div>
              <span className="small-text">{this.intrl.edit.covertips}</span>
            </>
          )
        }
      </div>
    );
    return (
      <div className="stepone-page" id="projectname">
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
        <div className="inline-title">
          <strong>{this.intrl.edit.type}</strong>&nbsp;
          <span className="red-type">*</span>&nbsp;&nbsp;
          <span className="tips-text">{this.intrl.edit.typetips}</span>
        </div>
        <div className="inline-enter">
          <Select options={this.mydeityOptions} text='' onCallback={this.onSelletCallback} defaultValue={this.state.typeValue} />
        </div>
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
        <div className="inline-title">
          <strong>{this.intrl.edit.intro}</strong>&nbsp;
          <span className="red-type">*</span>
        </div>
        <div className="inline-enter">
          <span className="text-numb">{this.state.textareaNum}/400</span>
          <textarea className={this.state.textareaEnter ? "textarea-wrapper err-active" : "textarea-wrapper"} maxLength={400} style={{ resize: 'none' }} onChange={this.handleGetLength} value={this.state.textareaValue} />
          {
            this.state.textareaEnter && <span className="err-span">{this.intrl.edit.error}</span>
          }
        </div>
        <div className="inline-btn">
          <Button
            text={this.intrl.btn.editstep1}
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
        this.props.history.push('/project/' + this.props.createproject.createContent.projId + '?type=create');
      } else
      {
        this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.createerr);
      }
    } else
    {
      if (this.props.createproject.createContent.projSubState === ProjSubState.Auditing)
      {
        this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.editerr2);
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
