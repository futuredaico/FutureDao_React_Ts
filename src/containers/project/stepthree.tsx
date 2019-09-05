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
interface IState
{
  emailInput: string,
  webInput: string,
  communityInput: string,
  emailEnter: number,
}

@observer
class StepThree extends React.Component<ICreateProjectProps, IState> {
  public intrl = this.props.intl.messages;
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
          <strong>{this.intrl.edit.contact}</strong>
        </div>
        <div className="inline-enter">
          <div className="inline-form">
            <div className="form-left">
              {this.intrl.edit.email}&nbsp;<span className="red-type">*</span>
            </div>
            <div className="form-right">
              <Input className={this.state.emailEnter !== 0 ? 'err-active' : ''} maxLength={40} value={this.state.emailInput} onChange={this.handleToEmailChange} />
              {
                this.state.emailEnter === 1 && <span className="err-span">{this.intrl.inputerr.emailerr2}</span>
              }
              {
                this.state.emailEnter === 2 && <span className="err-span">{this.intrl.edit.error}</span>
              }
            </div>
          </div>
          <div className="inline-form">
            <div className="form-left">{this.intrl.edit.website}</div>
            <div className="form-right">
              <Input maxLength={40} value={this.state.webInput} onChange={this.handleToWebChange} />
            </div>
          </div>
          <div className="inline-form">
            <div className="form-left">{this.intrl.edit.community}</div>
            <div className="form-right">
              <Input maxLength={40} value={this.state.communityInput} onChange={this.handleToCommunChange} />
            </div>
          </div>
        </div>
        <div className="inline-btn">
          <Button text={this.intrl.btn.save} btnSize="bg-btn" onClick={this.handleToSaveStepThree} btnColor={!this.state.emailInput ? 'gray-btn' : ''} />
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
      this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.savesuccess);
    }
    else
    {
      this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.savefail);
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
