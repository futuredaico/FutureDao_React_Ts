/**
 * 团队信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
import EditTeam from './editteam';
import { ICreateProjectProps } from './interface/createproject.interface';
import { ProjSubState } from '@/store/interface/common.interface';

@observer
class StepThree extends React.Component<ICreateProjectProps, any> {
  public state = {
    emailInput: this.props.createproject.createContent.connectEmail,
    webInput: this.props.createproject.createContent.officialWeb,
    communityInput: this.props.createproject.createContent.community,
    emailEnter: 0,
  }
  public render()
  {
    return (
      <div className="stepthree-page">
        <EditTeam {...this.props} />
        <div className="inline-title">
          <strong>联系方式</strong>
        </div>
        <div className="inline-enter">
          <div className="inline-form">
            <div className="form-left">
              邮箱&nbsp;<span className="red-type">*</span>
            </div>
            <div className="form-right">
              <Input className={this.state.emailEnter !== 0 ? 'err-active' : ''} maxLength={40} value={this.state.emailInput} onChange={this.handleToEmailChange} />
              {
                this.state.emailEnter === 1 && <span className="err-span">请输入正确的格式</span>
              }
              {
                this.state.emailEnter === 2 && <span className="err-span">填写本栏信息</span>
              }
            </div>
          </div>
          <div className="inline-form">
            <div className="form-left">官网</div>
            <div className="form-right">
              <Input maxLength={40} value={this.state.webInput} onChange={this.handleToWebChange} />
            </div>
          </div>
          <div className="inline-form">
            <div className="form-left">社区</div>
            <div className="form-right">
              <Input maxLength={40} value={this.state.communityInput} onChange={this.handleToCommunChange} />
            </div>
          </div>
        </div>
        <div className="inline-btn">
          <Button text="保存" btnSize="bg-btn" onClick={this.handleToSaveStepThree} btnColor={!this.state.emailInput?'gray-btn':''} />
        </div>
      </div>
    );
  }
  // 邮箱输入
  private handleToEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
  {
    this.setState({
      emailInput: ev.target.value.trim(),
      emailEnter: 0
    })
    this.checkEmail(ev.target.value.trim())
  }
  // 官网的输入
  private handleToWebChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
  {
    this.setState({
      webInput: ev.target.value.trim()
    })
  }
  // 论坛的输入
  private handleToCommunChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
  {
    this.setState({
      communityInput: ev.target.value.trim()
    })
  }
  // 保存并提交
  private handleToSaveStepThree = async () =>
  {
    if(this.props.createproject.createContent.projSubState === ProjSubState.Auditing){
      this.props.common.openNotificationWithIcon('error', '操作失败', '项目正在审核中不可以修改哦');
      return false;
    }
    const res = this.checkInputStatus();
    if (!res)
    {
      return
    }

    const content: string[] = [
      this.props.common.userId,
      this.props.common.token,
      this.props.createproject.createContent.projId,
      this.state.emailInput,
      this.state.webInput,
      this.state.communityInput
    ]
    const creatResult = await this.props.createproject.modifyStepThree(content);
    if (creatResult)
    {
      this.props.common.openNotificationWithIcon('success', '操作成功', '保存成功');
    }
    else
    {
      this.props.common.openNotificationWithIcon('error', '操作失败', '保存失败');
    }
    return true
  }
  // 校验必填参数是否填写了
  private checkInputStatus = () =>
  {
    if (!this.state.emailInput)
    {
      this.setState({
        emailEnter: 2
      })
      return false
    }
    return true
  }
  // 邮箱验证
  private checkEmail = (str: string) =>
  {
    const re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,10}$/;
    if (re.test(str))
    {
      this.setState({
        emailEnter: 0
      })
    } else
    {
      this.setState({
        emailEnter: 1
      })
    }
  }
}

export default injectIntl(StepThree);
