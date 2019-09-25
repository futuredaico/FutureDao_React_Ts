/**
 * 详细信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
import { IFinancingProps } from '../interface/financing.interface';

@observer
class StepTwo extends React.Component<IFinancingProps, any> {
  public intrl = this.props.intl.messages;

  public render()
  {

    return (
      <div className="steptwo-page">
        <div className="noback-type">
          <strong>当前无融资回报</strong>
        </div>
        <div className="inline-title">
          <strong>回报发放联系人</strong>
        </div>
        <div className="inline-enter">
          <div className="gray-box newgray-box">
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
          <span className="small-gray">已售22</span>
        </div>
        <div className="inline-enter">
          <div className="gray-box newgray-box">
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
              <textarea />
            </div>
            <div className="inline-title">
              <strong>价格</strong>
            </div>
            <div className="inline-enter">
              <Input />
            </div>
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
}

export default injectIntl(StepTwo);
