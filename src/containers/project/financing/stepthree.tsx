/**
 * 团队信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input, Spin, Icon } from 'antd';
import { IFinancingProps } from '../interface/financing.interface';


@observer
class StepThree extends React.Component<IFinancingProps, any> {
  public intrl = this.props.intl.messages;
  public state = {
    isDoingEdit:false
  }
  public render()
  {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} />;
    return (
      <div className="stepthree-page">
        <div className="inline-title">
          <strong>已融资金</strong>
          <span className="tips-text">&nbsp;&nbsp;（ 只有部署合约时设置的融资代币接收地址持有者可以领取资金。如果您修改了绑定地址，请在个人中心重新绑定。 ）</span>
        </div>
        <div className="inline-enter">
          <strong className="show-price">0 DAI</strong>
          <Button text="领取资金" btnColor="gray-btn" />
        </div>
        <div className="inline-title">
          <strong>储备金比例</strong>
          <span className="tips-text-block">（ 将融资金额取一部分作为发行代币的储备金。储备金比例越高，代币买入、卖出价差越小，对投资者吸引力变大，但项目方可调用的资金将变少。 ）</span>
        </div>
        <div className="inline-enter">
          <Input className="percent-input" />%
          <span className="gray-text">（ 当前 0% ）</span>
        </div>
        <div className="inline-btn">
          <Button text="提交" btnSize="bg-btn"  />
        </div>
        {
          this.state.isDoingEdit && (
            <div className="going-on-wrapper">
              <div className="going-on-content going-on-edit">
                <strong className="going-bigtext">正在修改储备金比例</strong>
                <div className="loading-going">
                  <Spin indicator={antIcon} size="small" />
                  <span>请等待...</span>
                </div>
                <div className="done-going">
                  <img src={require("@/img/done.png")} alt=""/>
                  <span>成功！</span>
                </div>
                <p className="going-p">处理这些事物可能需要较长时间，取决于网络状态处理期间请勿关闭本页</p>
                <div className="goon-btn">
                  <Button text="继续" btnSize="md-bg-btn" />
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default injectIntl(StepThree);
