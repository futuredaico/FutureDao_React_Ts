/**
 * 设置回报
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input, Radio, DatePicker } from 'antd';
import Button from '@/components/Button';
import moment from 'moment';
import { IRewardProps, IRewardInfo } from '../interface/reward.interface';
interface IState {
  connectName: string,
  connectorTel: string,
  isCanSave: boolean,
}
@inject('project', 'reward', 'common', 'metamaskwallet')
@observer
class StepTwo extends React.Component<IRewardProps, IState> {
  public intrl = this.props.intl.messages;
  public state = {
    connectName: this.props.reward.rewardContent.connectorName,
    connectorTel: this.props.reward.rewardContent.connectorTel,
    isCanSave: false
  }
//   public componentDidMount() {
//     if (this.props.reward.rewardContent && this.props.reward.rewardContent.rewardSetFlag !== '3') {
//       this.props.reward.getRewardData();
//     }
//   }

  public render() {
    if (!this.props.reward.rewardContent) {
      return null;
    }
    const { MonthPicker } = DatePicker;
    return (
      <div className="steptwo-page">
        {
          this.props.reward.rewardContent.info.length === 0
            ? (
              <div className="noback-type">
                <strong>当前无融资回报</strong>
              </div>
            )
            : (
              <>
                <div className="inline-title">
                  <strong>回报发放联系人</strong>
                </div>
                <div className="inline-enter">
                  <div className="gray-box normalgray-box">
                    <div className="inline-title">
                      <strong>联系人姓名</strong>&nbsp;
                      <span className="red-type">*</span>&nbsp;&nbsp;
                    </div>
                    <div className="inline-enter">
                      <Input
                        value={this.props.reward.rewardContent.connectorName}
                        onChange={this.handleChangeContractName}
                        maxLength={40}
                      />
                    </div>
                    <div className="inline-title">
                      <strong>联系方式</strong>&nbsp;
                      <span className="red-type">*</span>&nbsp;&nbsp;
                    </div>
                    <div className="inline-enter">
                      <Input
                        value={this.props.reward.rewardContent.connectorTel}
                        onChange={this.handleChangeContractTel}
                        maxLength={40}
                      />
                    </div>
                  </div>
                </div>
                {
                  this.props.reward.rewardContent.info.map((item: IRewardInfo, index: number) => {
                    if (!this.props.reward.rewardContent) {
                      return null;
                    }
                    return (
                      <React.Fragment key={index}>
                        <div className="inline-title">
                          <strong>回报{index + 1}</strong>
                          {/* <span className="tips-text">&nbsp;&nbsp;已售{item.hasSellCount}</span> */}
                        </div>
                        <div className="inline-enter">
                          <div className="gray-box normalgray-box">
                            <div className="inline-title">
                              <strong>回报名称</strong>&nbsp;
                              <span className="red-type">*</span>&nbsp;&nbsp;
                            </div>
                            <div className="inline-enter">
                              <Input
                                value={item.rewardName}
                                onChange={this.handleChangeName.bind(this, index)}
                                maxLength={40}
                              />
                            </div>
                            <div className="inline-title">
                              <strong>回报描述</strong>&nbsp;
                              <span className="red-type">*</span>&nbsp;&nbsp;
                            </div>
                            <div className="inline-enter">
                              <textarea
                                className="gift-textarea"
                                value={item.rewardDesc}
                                onChange={this.handleChangeDesc.bind(this, index)}
                                maxLength={500}
                              />
                            </div>
                            <div className="inline-title">
                              <strong>价格</strong>&nbsp;
                              <span className="red-type">*</span>&nbsp;&nbsp;
                            </div>
                            <div className="inline-enter">
                              <Input
                                suffix={this.props.reward.rewardContent.info[0].tokenSymbol.toLocaleUpperCase()}
                                value={item.price}
                                onChange={this.handleChangePrice.bind(this, index)}
                              />
                            </div>
                            <div className="inline-title">
                              <strong>是否限量</strong>&nbsp;
                              <span className="red-type">*</span>&nbsp;&nbsp;
                            </div>
                            <div className="inline-enter">
                              <Radio.Group onChange={this.handleChangeLimitType.bind(this, index)} value={item.limitFlag} >
                                <Radio value={"0"}>不限量</Radio>
                                <Radio value={"1"}>
                                  限量
                                  <Input
                                    className="small-input"
                                    value={item.limitMax}
                                    onChange={this.handleChangeLimitNum.bind(this, index)}
                                    maxLength={9}
                                  />
                                </Radio>
                              </Radio.Group>
                            </div>
                            <div className="inline-title">
                              <strong>预计发放时间</strong>&nbsp;
                              <span className="red-type">*</span>&nbsp;&nbsp;
                            </div>
                            <div className="inline-enter">
                              <Radio.Group onChange={this.handleChangeTimeType.bind(this, index)} value={item.distributeTimeFlag}>
                                <Radio value={"1"}>
                                  定期
                                  <MonthPicker
                                    disabledDate={this.disabledDate}
                                    placeholder="Select month"
                                    locale={this.props.intl.locale}
                                    format="YYYY/MM"
                                    onChange={this.handleChangeMonth.bind(this, index)}
                                    value={item.distributeTimeFixYes ? moment(item.distributeTimeFixYes, "YYYY/MM") : undefined}
                                  />
                                </Radio>
                                <Radio value={"0"}>
                                  不定期
                                  <Input
                                    className="small-input"
                                    suffix="天内"
                                    value={item.distributeTimeFixNot}
                                    onChange={this.handleChangeDays.bind(this, index)}
                                    maxLength={2}
                                  />
                                </Radio>
                              </Radio.Group>
                            </div>
                            <div className="inline-title">
                              <strong>发放方式</strong>&nbsp;
                              <span className="red-type">*</span>&nbsp;&nbsp;
                            </div>
                            <div className="inline-enter">
                              <Radio.Group onChange={this.handleChangeSendType.bind(this, index)} value={item.distributeWay}>
                                <Radio value={"0"}>虚拟发放</Radio>
                                <Radio value={"1"}>实物</Radio>
                              </Radio.Group>
                            </div>
                            <div className="inline-title">
                              <strong>特殊说明</strong>
                              <span className="tips-text">&nbsp;&nbsp;（ 需要提示购买者的注意事项，例如海外无法发货、产品可能存在的风险等。 ）</span>
                            </div>
                            <div className="inline-enter">
                              <Input value={item.note} onChange={this.handleChangeNote.bind(this, index)} maxLength={100} />
                            </div>
                          </div>
                          <div className="delete-back">
                            <Button text="删除" btnColor="red-btn" btnSize="vsm-btn" onClick={this.handleRemoveRewardForm.bind(this, index)} />
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  })
                }
              </>
            )
        }
        <div className="inline-enter-btn">
          <Button text="+ 增加回报" btnSize="bg-btn" btnColor="white-btn" onClick={this.handleAddRewardForm} />
        </div>
        <div className="inline-btn">
          <Button
            text="提交"
            btnSize="bg-btn"
            btnColor={(this.props.reward.rewardContent.info.length === 0 || this.state.isCanSave) ? "" : "gray-btn"}
            onClick={this.handleSetReward}
          />
        </div>
      </div >
    );
  }
  // 输入联系人姓名
  private handleChangeContractName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    this.props.reward.rewardContent.connectorName = value;
    this.handleCheckSetRewardInput();
  }
  // 输入联系人方式
  private handleChangeContractTel = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    this.props.reward.rewardContent.connectorTel = value;
    this.handleCheckSetRewardInput();
  }
  // 输入回报名称
  private handleChangeName = (index: number, ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    this.props.reward.rewardContent.info[index].rewardName = value;
    this.handleCheckSetRewardInput();
  }
  // 输入回报描述
  private handleChangeDesc = (index: number, ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    this.props.reward.rewardContent.info[index].rewardDesc = value;
    this.handleCheckSetRewardInput();
  }
  // 输入价格
  private handleChangePrice = (index: number, ev: React.ChangeEvent<HTMLInputElement>) => {
    // 价格限制小数点后4位，小数点前9位 todo
    const str = ev.target.value;
    if (str[str.length - 1] !== '.' && isNaN(str as unknown as number)) {
      console.log(1)
      return false;
    }
    const num1 = Number(str);
    const num2 = parseInt((num1 * 10000).toString(), 10) / 10000;
    if (num2 > 999999999.9999 || num1 !== num2) {
      console.log(2)
      return false;
    }
    this.props.reward.rewardContent.info[index].price = str.toString();
    this.handleCheckSetRewardInput();
    return true;
  }
  // 选择是否限量
  private handleChangeLimitType = (index: number, ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    this.props.reward.rewardContent.info[index].limitFlag = value;
    this.props.reward.rewardContent.info[index].limitMax = '';
    this.handleCheckSetRewardInput();
  }
  // 输入限量数量
  private handleChangeLimitNum = (index: number, ev: React.ChangeEvent<HTMLInputElement>) => {
    // 限量数量，只能填写整数，限制9位 todo
    const value = ev.target.value as unknown as number;
    if (isNaN(value)) {
      return false;
    }
    const reg = /^[0-9]*[1-9][0-9]*$/;
    if (value.toString().length > 0) {
      if (!reg.test(ev.target.value)) {
        return false;
      }
    }
    this.props.reward.rewardContent.info[index].limitMax = value.toString().replace(/\./g, '');
    this.handleCheckSetRewardInput();
    return true;
  }
  // 选择预计发放时间
  private handleChangeTimeType = (index: number, ev) => {
    const value = ev.target.value;
    this.props.reward.rewardContent.info[index].distributeTimeFlag = value;
    this.props.reward.rewardContent.info[index].distributeTimeFixYes = '';
    this.props.reward.rewardContent.info[index].distributeTimeFixNot = '';
    this.handleCheckSetRewardInput();
  }
  // 输入定期发放时间
  private handleChangeMonth = (index: number, date, dateString) => {
    console.log(date, dateString);
    const value = dateString;
    console.log(dateString)
    this.props.reward.rewardContent.info[index].distributeTimeFixYes = value;
    this.handleCheckSetRewardInput();
  }
  // 输入不定期发放时间
  private handleChangeDays = (index: number, ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value as unknown as number;
    console.log(value)
    if (isNaN(value)) {
      return false;
    }
    const reg = /^[0-9]*[1-9][0-9]*$/;
    if (value.toString().length > 0) {
      if (!reg.test(ev.target.value)) {
        return false;
      }
    }
    this.props.reward.rewardContent.info[index].distributeTimeFixNot = value.toString().replace(/\./g, '');
    console.log(value.toString())
    this.handleCheckSetRewardInput();
    return true;
  }
  // 选择发放方式
  private handleChangeSendType = (index: number, ev) => {
    const value = ev.target.value;
    this.props.reward.rewardContent.info[index].distributeWay = value;
    this.handleCheckSetRewardInput();
  }
  // 输入特殊说明
  private handleChangeNote = (index: number, ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    this.props.reward.rewardContent.info[index].note = value;
  }
  // 定期两年内限制
  private disabledDate = (current) => {
    // Can not select days before today and today
    return current && (current < moment().endOf('day') || current > moment().add(2, 'years').endOf('day'));
  }
  // 新增回报
  private handleAddRewardForm = () => {
    if(this.props.reward.rewardContent){
      this.props.reward.rewardContent.info.push({
        rewardId: '',
        rewardName: '',
        rewardDesc: '',
        price: '',
        priceUnits:'',
        limitFlag: '',
        limitMax: '',
        distributeTimeFlag: '',
        distributeTimeFixYes: '',
        distributeTimeFixNot: '',
        distributeWay: '',
        note: '',
        tokenSymbol: this.props.reward.rewardContent.info[0].tokenSymbol
      })
    }    
    this.setState({
      isCanSave: false
    })
  }
  // 删除回报
  private handleRemoveRewardForm = (index: number) => {
    this.props.reward.rewardContent.info.splice(index, 1);
    if (this.props.reward.rewardContent.info.length === 0) {
      this.props.reward.rewardContent.connectorName = "";
      this.props.reward.rewardContent.connectorTel = "";
    }
  }
  // 提交回报信息
  private handleSetReward = async () => {
    // 有回报填写时注意填写
    if (this.props.reward.rewardContent.info.length !== 0 && !this.state.isCanSave) {
      return false
    }
    // const res = await this.props.reward.setReward();
    // if (res && this.props.reward.rewardContent && this.props.reward.rewardContent.rewardSetFlag === '5') {
    //   this.props.common.openNotificationWithIcon('success', this.intrl.notify.success, this.intrl.notify.updatetips);
    // } else if (res && this.props.reward.rewardContent && this.props.reward.rewardContent.rewardSetFlag === '3') {
    //   this.props.reward.step = 3;
    //   this.props.reward.stepTwoStatus = 2;
    //   this.props.reward.rewardContent.rewardSetFlag = '5';
    // }
    // else if (!res) {
    //   this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, this.intrl.notify.updateerr);
    // }
    this.props.reward.getRewardData();
    return true;
  }
  // 校验必填项
  private handleCheckSetRewardInput = () => {
    let isOk = true;
    if (this.props.reward.rewardContent.info.length > 0) {
      if (!this.props.reward.rewardContent.connectorName) {
        isOk = false;
      }
      if (!this.props.reward.rewardContent.connectorTel) {
        isOk = false;
      }
      this.props.reward.rewardContent.info.forEach((item: IRewardInfo) => {
        if (!item.rewardName) {
          isOk = false;
        }
        if (!item.rewardDesc) {
          isOk = false;
        }
        if (!item.limitFlag) {
          isOk = false;
        }
        else if (item.limitFlag === '1' && !item.limitMax) {
          isOk = false;
        }
        if (!item.distributeTimeFlag) {
          isOk = false;
        } else if (item.distributeTimeFlag === '1' && !item.distributeTimeFixYes) {
          isOk = false;
        } else if (item.distributeTimeFlag === '0' && !item.distributeTimeFixNot) {
          isOk = false;
        }
        if (!item.distributeWay) {
          isOk = false;
        }
      })
    }
    if (isOk) {
      this.setState({
        isCanSave: true
      })
    }else{
      this.setState({
        isCanSave: false
      })
    }
  }
}

export default injectIntl(StepTwo);
