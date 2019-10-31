/**
 * 融资信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input, Spin, Icon } from 'antd';
import { IFinancingProps } from '../interface/financing.interface';

interface IState
{
  isDoingEdit: boolean,
  ratio: string,
}
@observer
class StepThree extends React.Component<IFinancingProps, IState> {
  public intrl = this.props.intl.messages;
  public state = {
    isDoingEdit: false,
    ratio: ''
  }
  public async componentDidMount()
  {
    // 普通融资的资金查询
    if (this.props.financing.financingContent && this.props.financing.financingContent.type === 'gen')
    {
      this.props.financing.getFinanceFund();
    }
    this.handleGetRatio();
  }
  public render()
  {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} />;
    if (!this.props.financing.financingContent)
    {
      return null;
    }
    return (
      <div className="stepthree-page">
        {
          this.props.financing.financingContent.type === 'gen' && (
            <>
              <div className="inline-title">
                <strong>已融资金</strong>
                <span className="tips-text">&nbsp;&nbsp;（ 只有部署合约时设置的融资代币接收地址持有者可以领取资金。如果您修改了绑定地址，请在个人中心重新绑定。 ）</span>
              </div>
              <div className="inline-enter">
                <strong className="show-price">{this.props.financing.poolTotal} {this.props.financing.financingContent.tokenName.toLocaleUpperCase()}</strong>
                <Button text="领取资金" btnColor={this.props.financing.poolTotal > 0 ? '' : 'gray-btn'} onClick={this.handleToGetMoney} />
              </div>
            </>
          )
        }
        <div className="inline-title">
          <strong>储备金比例</strong>
          <span className="tips-text-block">（ 将融资金额取一部分作为发行代币的储备金。储备金比例越高，代币买入、卖出价差越小，对投资者吸引力变大，但项目方可调用的资金将变少。 ）</span>
        </div>
        <div className="inline-enter">
          <Input
            className="percent-input"
            value={this.state.ratio}
            onChange={this.handleChangeRatio}
            maxLength={2}
          />%
          <span className="gray-text">（ 当前 {this.props.financing.ratio}% ）</span>
        </div>
        <div className="inline-btn">
          <Button text="提交" btnSize="bg-btn" onClick={this.handleSaveRatio} />
        </div>
        {
          this.state.isDoingEdit && (
            <div className="going-on-wrapper">
              <div className="going-on-content going-on-edit">
                <strong className="going-bigtext">正在修改储备金比例</strong>
                {
                  (this.props.financing.financingContent.ratioSetFlag === '4' || this.props.financing.financingContent.ratioSetFlag === '6') && (
                    <>
                      <div className="loading-going">
                        <Spin indicator={antIcon} size="small" />
                        <span>请等待...</span>
                      </div>
                      <p className="going-p">处理这些事物可能需要较长时间，取决于网络状态处理期间请勿关闭本页</p>
                    </>
                  )
                }
                {
                  this.props.financing.financingContent.ratioSetFlag === '5' && (
                    <>
                      <div className="done-going">
                        <img src={require("@/img/done.png")} alt="" />
                        <span>成功！</span>
                      </div>
                      <div className="goon-btn">
                        <Button text="继续" btnSize="md-bg-btn" onClick={this.handleGoOn} />
                      </div>
                    </>
                  )
                }

              </div>
            </div>
          )
        }
      </div>
    );
  }
  // 获取修改储备金比例数据
  private handleGetRatio = async ()=> {
    await this.props.financing.getReserveFund();
    this.setState({
      ratio: this.props.financing.ratio
    })
  }
  // 普通融资领取资金
  private handleToGetMoney = () =>
  {
    if (!this.props.financing.financingContent)
    {
      return false;
    }
    // 1.先检查绑定的地址是否是融资代币接收地址
    if (this.props.common.userInfo && this.props.financing.financingContent.tokenName === 'neo')
    {
      if (this.props.financing.financingContent.adminAddress !== this.props.common.userInfo.neoAddress)
      {
        this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, '只有融资代币接收地址可以领取资金')
        return false;
      }
    }
    else if (this.props.common.userInfo && this.props.financing.financingContent.tokenName === 'eth')
    {
      if (this.props.financing.financingContent.adminAddress !== this.props.common.userInfo.ethAddress)
      {
        this.props.common.openNotificationWithIcon('error', this.intrl.notify.error, '只有融资代币接收地址可以领取资金')
        return false;
      }
    }
    // 2.如果是，则检查钱包是否已连接
    if (this.props.financing.financingContent.tokenName === 'neo')
    {
      // todo
    } else
    {
      // todo
    }

    return true
  }
  // 修改储备金比例
  private handleChangeRatio = (ev: React.ChangeEvent<HTMLInputElement>) =>
  {
    // 可以被修改成0-99的整数
    const value = ev.target.value as unknown as number;    
    if (isNaN(value))
    {
      return false;
    }
    const reg = /^[0-9]*[1-9][0-9]*$/;
    if (value.toString().length > 0)
    {
      if (!reg.test(ev.target.value))
      {
        return false;
      }
    }
    this.setState({
      ratio: value.toString()
    })
    return true
  }
  // 提交储备金比例
  private handleSaveRatio = async () =>
  {
    // 
    if (!this.state.ratio)
    {
      return false;
    }
    if(parseFloat(this.state.ratio)<=0){
      return false
    }
    const res = await this.props.financing.saveReserveFundRatio(this.state.ratio);
    if (res)
    {
      this.setState({
        isDoingEdit: true
      })
      if (this.props.financing.financingContent)
      {
        this.props.financing.financingContent.ratioSetFlag = '4';
      }
      const timer = setInterval(async () =>
      {
        await this.props.financing.getContractData();
        if (this.props.financing.financingContent && this.props.financing.financingContent.ratioSetFlag === '5')
        {
          this.handleGetRatio();
          clearInterval(timer)
        }
      }, 5000)
    }

    return true;
  }
  // 继续按钮
  private handleGoOn = () =>
  {
    this.props.financing.step = 3;
    this.setState({
      isDoingEdit: false
    })
  }
}

export default injectIntl(StepThree);
