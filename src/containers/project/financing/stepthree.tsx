/**
 * 团队信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
import { IFinancingProps } from '../interface/financing.interface';


@observer
class StepThree extends React.Component<IFinancingProps, any> {
  public intrl = this.props.intl.messages;
  public render()
  {
    return (
      <div className="stepthree-page">
        <div className="inline-title">
          <strong>已融资金</strong>
        </div>
        <div className="inline-enter">
          <div className="inline-form">
            <div className="form-left">
              {this.intrl.edit.email}&nbsp;<span className="red-type">*</span>
            </div>
          </div>
          <div className="inline-form">
            <div className="form-left">{this.intrl.edit.website}</div>
            <div className="form-right">
              <Input />
            </div>
          </div>
          <div className="inline-form">
            <div className="form-left">{this.intrl.edit.community}</div>
            <div className="form-right">
              <Input  />
            </div>
          </div>
        </div>
        <div className="inline-btn">
          <Button text="提交" btnSize="bg-btn"  />
        </div>
      </div>
    );
  }
}

export default injectIntl(StepThree);
