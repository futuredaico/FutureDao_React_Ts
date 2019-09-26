/**
 * 详细信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input, Radio, DatePicker  } from 'antd';
import Button from '@/components/Button';
import { IFinancingProps } from '../interface/financing.interface';
import moment from 'moment';

@observer
class StepTwo extends React.Component<IFinancingProps, any> {
  public intrl = this.props.intl.messages;
  public state = {
    limitType:0
  }

  public render()
  {
    const { MonthPicker } = DatePicker;
    return (
      <div className="steptwo-page">
        <div className="noback-type">
          <strong>当前无融资回报</strong>
        </div>
        <div className="inline-title">
          <strong>回报发放联系人</strong>
        </div>
        <div className="inline-enter">
          <div className="gray-box normalgray-box">
            <div className="inline-title">
              <strong>联系人姓名</strong>
            </div>
            <div className="inline-enter">
              <Input />
            </div>
            <div className="inline-title">
              <strong>联系方式</strong>
            </div>
            <div className="inline-enter">
              <Input />
            </div>
          </div>
        </div>
        <div className="inline-title">
          <strong>回报1</strong>
          <span className="tips-text">&nbsp;&nbsp;已售22</span>
        </div>
        <div className="inline-enter">
          <div className="gray-box normalgray-box">
            <div className="inline-title">
              <strong>回报名称</strong>
            </div>
            <div className="inline-enter">
              <Input />
            </div>
            <div className="inline-title">
              <strong>回报描述</strong>
            </div>
            <div className="inline-enter">
              <textarea className="gift-textarea" />
            </div>
            <div className="inline-title">
              <strong>价格</strong>
            </div>
            <div className="inline-enter">
              <Input  suffix="ETH" />
            </div>
            <div className="inline-title">
              <strong>是否限量</strong>
            </div>
            <div className="inline-enter">
              <Radio.Group onChange={this.handleRadioLimit}>
                <Radio value={1}>不限量</Radio>
                <Radio value={2}>
                  限量
                  <Input className="small-input" />
                </Radio>
              </Radio.Group>
            </div>
            <div className="inline-title">
              <strong>预计发放时间</strong>
            </div>
            <div className="inline-enter">
              <Radio.Group onChange={this.handleRadioLimit}>
                <Radio value={1}>
                  定期
                  <MonthPicker
                    disabledDate={this.disabledDate} 
                    placeholder="Select month" 
                    locale={this.props.intl.locale} 
                    format="YYYY/MM"
                  />
                </Radio>
                <Radio value={2}>
                  不定期
                  <Input className="small-input" suffix="天内" />
                </Radio>
              </Radio.Group>
            </div>
            <div className="inline-title">
              <strong>发放方式</strong>
            </div>
            <div className="inline-enter">
              <Radio.Group onChange={this.handleRadioLimit}>
                <Radio value={1}>虚拟发放</Radio>
                <Radio value={2}>实物</Radio>
              </Radio.Group>
            </div>
            <div className="inline-title">
              <strong>特殊说明</strong>
              <span className="tips-text">&nbsp;&nbsp;（ 需要提示购买者的注意事项，例如海外无法发货、产品可能存在的风险等。 ）</span>
            </div>
            <div className="inline-enter">
              <Input />
            </div>
          </div>
          <div className="delete-back">
            <Button text="删除" btnColor="red-btn" btnSize="vsm-btn" />
          </div>
        </div>
        <div className="inline-enter-btn">
          <Button text="+ 增加回报" btnSize="bg-btn" btnColor="white-btn" />
        </div>
        <div className="inline-btn">
          <Button text="提交" btnSize="bg-btn" btnColor="gray-btn" />
        </div>
      </div >
    );
  }
  private handleRadioLimit = (ev) => {
    this.setState({
      limitType:ev.target.value
    })
  }
  // 定期两年内
  private disabledDate=(current)=> {
    // Can not select days before today and today
    return current && (current < moment().endOf('day') || current > moment().add(2,'years').endOf('day'));
  }
}

export default injectIntl(StepTwo);
