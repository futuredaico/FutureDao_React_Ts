/**
 * 部署合约
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input, Spin, Icon } from 'antd';
import Select from '@/components/select';
import Button from '@/components/Button';
// import Web3 from 'web3';
// import commonStore from '@/store/common';
import { IFinancingProps, IInfo } from '../interface/financing.interface';
// import { ProjSubState } from '@/store/interface/common.interface';

interface IState
{
  financingType: string, // 融资类型
  platform: string, // 选择区块链
  fundName: string, // 融资的代币
  isBindAddress: boolean,// 是否绑定了地址, 绑了就为true，没绑就是false
  adminAddress: string, // 管理员钱包地址
  tokenName: string, // 项目代币名称
  tokenSymbol: string, // 项目代币简称
  reserveTokenFlag: string, // 是否团队预留代币
  isDoingContract: boolean, // 是否正在部署合于
  nameEnter: boolean,// 确认是否输入了项目代币名称，false为输入了，反之
  simpleNameEnter: boolean,  // 确认是否输入了项目代币简称，false为输入了，反之
  addrEnter: boolean, // 团队预留代币地址输入确认,true为格式错误
  addrInputErrMsg: string, // 代币地址输入错误提示
  isCanGoing: boolean, // 是否可以提交
  hasShowAsset: boolean,
  isDoingSave: boolean, // 是否正在修改储备金比例
}

@observer
class StepOne extends React.Component<IFinancingProps, IState> {
  public intrl = this.props.intl.messages;
  public state: IState = {
    financingType: '', // 融资类型
    platform: '', // 选择区块链
    fundName: '', // 融资的代币
    isBindAddress: false,
    adminAddress: '', // 管理员钱包地址
    tokenName: '', // 项目代币名称
    tokenSymbol: '', // 项目代币简称
    reserveTokenFlag: '', // 是否团队预留代币
    isDoingContract: false,
    nameEnter: false,
    simpleNameEnter: false,
    addrEnter: false,
    addrInputErrMsg: "",
    isCanGoing: false,
    hasShowAsset: true,
    isDoingSave: false
  };
  // 融资类型
  private financingOptions = [
    {
      id: "daico",
      name: "DAICO众筹融资",
    },
    {
      id: "gen",
      name: "普通代币发行众筹融资",
    }
  ]
  // 选择区块链
  private blockOptions = [
    {
      id: "eth",
      name: "以太坊链",
    },
    {
      id: "neo",
      name: "NEO",
    }
  ]
  // 融资代币
  private assetOption =
    [
      {
        id: "eth",
        name: "ETH"
      },
      {
        id: "dai",
        name: "DAI"
      },

    ]
  // 融资代币
  private neoOption = [
    {
      id: "neo",
      name: "NEO"
    },
    {
      id: "gas",
      name: "GAS"
    }
  ]
  // 是否团队预留代币
  private saveOptions = [
    {
      id: "1",
      name: "是",
    },
    {
      id: "0",
      name: "否",
    }
  ]
  public async componentDidMount()
  {
    if (!this.props.financing.financingContent)
    {
      return false;
    }
    this.setState({
      financingType: this.props.financing.financingContent.type, // 融资类型
      platform: this.props.financing.financingContent.platform, // 选择区块链
      fundName: this.props.financing.financingContent.fundName, // 融资的代币
      adminAddress: this.props.financing.financingContent.adminAddress, // 管理员钱包地址
      tokenName: this.props.financing.financingContent.tokenName, // 项目代币名称
      tokenSymbol: this.props.financing.financingContent.tokenSymbol, // 项目代币简称
      reserveTokenFlag: this.props.financing.financingContent.reserveTokenFlag, // 是否团队预留代币
    })

    if (this.props.financing.financingContent.deployContractFlag === '4' || this.props.financing.financingContent.deployContractFlag === '6')
    {
      this.setState({
        isDoingContract: true
      })
    } else if (this.props.financing.financingContent.ratioSetFlag === '4' || this.props.financing.financingContent.ratioSetFlag === '6')
    {
      this.setState({
        isDoingSave: true
      })
    }
    return true;
  }
  public render()
  {
    if (!this.props.financing.financingContent)
    {
      return null;
    }
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} />;
    return (
      <div className="stepone-page" id="projectname">
        {
          !this.state.isDoingContract && (
            <>
              <div className="inline-title">
                <strong>融资类型</strong>&nbsp;
                <span className="red-type">*</span>
              </div>
              <div className="inline-enter">
                <Select options={this.financingOptions} text='' onCallback={this.handleSelectFinancing} defaultValue={this.state.financingType} />
                {
                  this.state.financingType === 'daico' && (
                    <div className="gray-box">
                      DAICO（去中心化自治代币发行）智能合约会自动发行代币，用户通过购买代币的方式参与DAICO融资。融资获得的资金暂存在DAICO合约中，由全体用户管理。项目方支取资金需要经过发起提案、投票表决的过程。为了吸引更多人投资，您可以在启动融资后设置一些不同档位的回报，以回馈项目的支持者们。
                    </div>
                  )
                }
                {
                  this.state.financingType === 'gen' && (
                    <div className="gray-box">
                      由智能合约自动发行代币，用户通过购买代币的方式参与融资。项目方可以随时从合约中提取已融到的资金。为了吸引更多人投资，您可以在启动融资后设置一些不同档位的回报，以回馈项目的支持者们。
                    </div>
                  )
                }
              </div>
              <div className="inline-title">
                <strong>选择区块链</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 融资合约将部署在选择的链上 ）</span>
              </div>
              <div className="inline-enter">
                <Select
                  options={this.blockOptions}
                  text=''
                  onCallback={this.handleSelectBlock}
                  defaultValue={this.state.platform}
                />
              </div>
              <div className="inline-title">
                <strong>融资代币</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 接受使用融资的代币 ）</span>
              </div>
              <div className="inline-enter">
                {
                  this.state.platform && this.state.hasShowAsset &&
                  <Select
                    options={this.state.platform === "eth" ? this.assetOption : this.neoOption}
                    text=''
                    onCallback={this.handleSelectAsset}
                    defaultValue={this.state.fundName ? this.state.fundName : undefined}
                  />
                }
              </div>
              <div className="inline-title">
                <strong>管理员钱包地址</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 该地址将成为智能合约的管理员，仅限您本人的钱包地址 ）</span>
              </div>
              <div className="inline-enter">
                <Input value={this.state.adminAddress ? this.state.adminAddress : "无法获取钱包地址"} readOnly={true} className={this.state.adminAddress ? "" : "err-active"} />
              </div>
              <div className="inline-title">
                <strong>项目代币名称</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 为您的项目代币起个名称，例如 Bitcoin ）</span>
              </div>
              <div className="inline-enter">
                <Input value={this.state.tokenName} maxLength={20} onChange={this.handleChangeName} className={this.state.nameEnter ? "err-active" : ''} />
                {
                  this.state.nameEnter && <span className="err-span">{this.intrl.edit.error}</span>
                }
              </div>
              <div className="inline-title">
                <strong>项目代币简称</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 您的项目代币的简称及单位，尽量使用大写字母，例如BTC ）</span>
              </div>
              <div className="inline-enter">
                <Input value={this.state.tokenSymbol} maxLength={10} onChange={this.handleChangeSimpleName} className={this.state.simpleNameEnter ? "err-active" : ''} />
                {
                  this.state.simpleNameEnter && <span className="err-span">{this.intrl.edit.error}</span>
                }
              </div>
              <div className="inline-title">
                <strong>团队预留代币</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 在开始融资前生成一部分代币。预留代币在锁仓期间可以进行提案投票，但不可以卖出 ）</span>
              </div>
              <div className="inline-enter">
                <Select options={this.saveOptions} text='' onCallback={this.handleSelectSave} defaultValue={this.state.reserveTokenFlag} />
                {
                  this.state.reserveTokenFlag === '1' && (
                    <div className="gray-box newgray-box">
                      <div className="inline-title">
                        <strong>预留代币接收地址</strong>&nbsp;
                        <span className="red-type">*</span>&nbsp;&nbsp;
                        <span className="tips-text">（ 预留代币发放的目标钱包地址，默认为你本人的钱包地址 ）</span>
                      </div>
                      <div className="inline-enter">
                        <Input
                          placeholder={this.state.adminAddress ? "" : "未绑定钱包地址，请手动填写"}
                          value={this.props.financing.financingContent.reserveTokenInfo[0].address}
                          onChange={this.handleChangeReceiveAddr}
                          onBlur={this.handleBlurInpurAddr}
                          className={this.state.addrEnter ? "err-active" : ''}
                        />
                        {
                          this.state.addrEnter && <span className="err-span">地址格式错误</span>
                        }
                      </div>
                      {
                        Object.keys(this.props.financing.financingContent.reserveTokenInfo).length !== 0 && this.props.financing.financingContent.reserveTokenInfo[0].info.map((item: IInfo, index: number) =>
                        {
                          return (
                            <div className="tworow-line" key={index}>
                              <div className="firstrow">
                                <div className="inline-title">
                                  <strong>解锁数量{index + 1}</strong>&nbsp;
                                  <span className="red-type">*</span>&nbsp;&nbsp;
                                </div>
                                <div className="inline-enter">
                                  <Input value={item.amt} onChange={this.handleChangeAmt.bind(this, index)} maxLength={9} />
                                </div>
                              </div>
                              <div className="secondrow">
                                <div className="inline-title">
                                  <strong>锁定时长</strong>&nbsp;
                                  <span className="red-type">*</span>&nbsp;&nbsp;
                                </div>
                                <div className="inline-enter">
                                  <Input value={item.days} suffix="天" onChange={this.handleChangeDays.bind(this, index)} maxLength={4} />
                                </div>
                              </div>
                              {
                                index > 0 && (
                                  <div className="delete-line" onClick={this.handleRemoveAsset.bind(this, index)}>
                                    <img src={require("@/img/delete.png")} alt="delete.png" className="delete-icon" />
                                  </div>
                                )
                              }
                            </div>
                          )
                        })
                      }
                      <div className="add-wrapper">
                        <Button text="+ 增加批次" btnSize="bg-btn" btnColor="white-btn" onClick={this.handleAddAsset} />
                        <span className="purple-text">（ 总预留数量{this.props.financing.totalAmt}，在合约发布{this.props.financing.totalDays}天后全部解锁。 ）</span>
                      </div>
                    </div>
                  )
                }
              </div>
              <div className="inline-btn">
                <div className="gray-box">启动融资后将由后台发布智能合约，智能合约发布后将无法撤销，无法更改。</div>
                <Button
                  text={this.props.financing.financingContent.deployContractFlag === "5" ? "已提交" : "提交并继续"}
                  btnSize="bg-btn"
                  btnColor={(!this.state.adminAddress || !this.state.tokenName || !this.state.tokenSymbol || this.props.financing.financingContent.deployContractFlag === "5") ? 'gray-btn' : ''}
                  onClick={this.handleComfirmFinancing}
                />
              </div>
            </>
          )
        }
        {
          this.state.isDoingContract && (
            <div className="going-on-wrapper">
              <div className={this.state.financingType === 'daico' ? "going-on-content" : "going-on-content going-on-edit"}>
                {
                  (this.props.financing.financingContent.deployContractFlag === '4' || this.props.financing.financingContent.deployContractFlag === '6' || this.props.financing.financingContent.reserveTokenSetFlag === '4') && (
                    <>
                      <strong className="going-bigtext">正在部署融资合约</strong>
                      <div className="loading-going">
                        <Spin indicator={antIcon} size="small" />
                        <span>请等待...</span>
                      </div>
                      {
                        this.state.financingType === 'daico' && (
                          <>
                            <strong className="going-bigtext">正在部署治理合约</strong>
                            <div className="loading-going">
                              <Spin indicator={antIcon} size="small" />
                              <span>请等待...</span>
                            </div>
                          </>
                        )
                      }
                      <p className="going-p">处理这些事物可能需要较长时间，取决于网络状态处理期间请勿关闭本页</p>
                    </>
                  )
                }
                {
                  this.props.financing.financingContent.deployContractFlag === '5' && this.props.financing.financingContent.reserveTokenSetFlag === '5' && (
                    <>
                      <strong className="going-bigtext">正在部署融资合约</strong>
                      <div className="done-going">
                        <img src={require("@/img/done.png")} alt="" />
                        <span>成功！</span>
                      </div>
                      {
                        this.state.financingType === 'daico' && (
                          <>
                            <strong className="going-bigtext">正在部署治理合约</strong>
                            <div className="done-going">
                              <img src={require("@/img/done.png")} alt="" />
                              <span>成功！</span>
                            </div>
                          </>
                        )
                      }
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
        {
          this.state.isDoingSave && (
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
                        <Button text="继续" btnSize="md-bg-btn" onClick={this.handleDoneOn} />
                      </div>
                    </>
                  )
                }
              </div>
            </div>
          )
        }
      </div >
    );
  }

  // 融资类型的选择
  private handleSelectFinancing = (item) =>
  {
    this.setState({
      financingType: item.id,
    })
  }
  // 区块链的选择
  private handleSelectBlock = async (item) =>
  {
    console.log(item)
    this.setState({
      platform: item.id,
      adminAddress: "",
      fundName: '',
      hasShowAsset: false,
    }, () =>
      {
        this.setState({
          hasShowAsset: true,
        })
      })
    if (this.props.financing.financingContent)
    {
      this.props.financing.financingContent.reserveTokenInfo[0].address = "";
    }
    // 选择了区块之后获取绑定地址
    if (this.props.common.userInfo)
    {
      if (item.id === "eth")
      {
        if (this.props.common.userInfo.address === "")
        {
          this.props.common.openNotificationWithIcon('info', "绑定地址", "您尚未绑定ETH或NEO钱包，正在获取钱包地址。");
          await this.props.metamaskwallet.inintWeb3();
          if (!!this.props.metamaskwallet.metamaskAddress)
          {
            await this.props.personedit.bindWalletAddress('eth', this.props.metamaskwallet.metamaskAddress)
          }
          await this.props.common.getUserInfo();
        }
        this.setState({
          adminAddress: this.props.common.userInfo.address
        })
        if (this.props.financing.financingContent)
        {
          this.props.financing.financingContent.reserveTokenInfo[0].address = this.props.common.userInfo.address
        }
      } else
      {
        if (this.props.common.userInfo.address === "")
        {
          this.props.common.openNotificationWithIcon('info', "绑定地址", "您尚未绑定ETH或NEO钱包，正在获取钱包地址。");
          await this.props.teemowallet.loginTeemo();
          if (!!this.props.teemowallet.teemoAddress)
          {
            await this.props.personedit.bindWalletAddress('neo', this.props.teemowallet.teemoAddress)
          }
          await this.props.common.getUserInfo();
        }
        this.setState({
          adminAddress: this.props.common.userInfo.address,
          addrEnter: false
        })
        if (this.props.financing.financingContent)
        {
          this.props.financing.financingContent.reserveTokenInfo[0].address = this.props.common.userInfo.address
        }
      }
    }
  }
  // 融资代币的选择
  private handleSelectAsset = (item) =>
  {
    this.setState({
      fundName: item.id
    })
  }
  // 项目代币名称
  private handleChangeName = (ev: React.ChangeEvent<HTMLInputElement>) =>
  {
    const reg = /^[a-zA-Z0-9 ]*$/;
    if (ev.target.value)
    {
      if (!reg.test(ev.target.value))
      {
        return false
      }
    }
    this.setState({
      tokenName: ev.target.value,
      nameEnter: false
    })
    return true
  }
  // 项目代币简称
  private handleChangeSimpleName = (ev: React.ChangeEvent<HTMLInputElement>) =>
  {
    const reg = /^[a-zA-Z0-9 ]*$/;
    if (ev.target.value)
    {
      if (!reg.test(ev.target.value))
      {
        return false
      }
    }
    this.setState({
      tokenSymbol: ev.target.value,
      simpleNameEnter: false
    })
    return true
  }
  // 团队预留币的选择
  private handleSelectSave = (item) =>
  {
    this.setState({
      reserveTokenFlag: item.id
    })
  }
  // 团队预留代币接收地址
  private handleChangeReceiveAddr = (ev: React.ChangeEvent<HTMLInputElement>) =>
  {
    //
    const addr = ev.target.value.trim();
    if (this.props.financing.financingContent)
    {
      this.props.financing.financingContent.reserveTokenInfo[0].address = addr;
    }
    this.setState({
      addrEnter: false
    })
    // this.handleCheckAddr(ev.target.value);
  }
  // 团队预留地址失去焦点时的校验
  private handleBlurInpurAddr = (ev: React.ChangeEvent<HTMLInputElement>) =>
  {
    const res = this.handleCheckAddr(ev.target.value);
    if (!res)
    {
      this.setState({
        addrEnter: true
      })
    }
  }
  // 校验地址输入
  private handleCheckAddr = (addr: string) =>
  {
    if (this.state.platform === 'neo')
    {
      return Teemo.NEO.TOOLS.validateAddress(addr).then(res => res).catch(err => console.log(err))
    } else
    {
      return web3.isAddress(addr)
    }
  }
  // 提交部署合约
  private handleComfirmFinancing = async () =>
  {
    // todo
    // this.props.project.isEdit = false;
    const res = this.handleCheckFinancingInput();
    if (!res)
    {
      return false
    }
    if (!this.props.financing.financingContent)
    {
      return false;
    }
    if (this.props.financing.financingContent.deployContractFlag === "5")
    {
      return false
    }
    this.props.financing.financingContent.type = this.state.financingType;
    this.props.financing.financingContent.platform = this.state.platform;
    this.props.financing.financingContent.fundName = this.state.fundName;
    this.props.financing.financingContent.adminAddress = this.state.adminAddress;
    this.props.financing.financingContent.tokenName = this.state.tokenName;
    this.props.financing.financingContent.tokenSymbol = this.state.tokenSymbol;
    this.props.financing.financingContent.reserveTokenFlag = this.state.reserveTokenFlag;

    this.setState({
      isDoingContract: true
    })
    const publishRes = await this.props.financing.financingProject();
    if (publishRes)
    {
      this.props.financing.financingContent.deployContractFlag = '4';
      this.props.financing.timer = setInterval(async () =>
      {
        await this.props.financing.getContractData();
        if (this.props.financing.financingContent && this.props.financing.financingContent.deployContractFlag === '5' && this.props.financing.financingContent.reserveTokenSetFlag === '5')
        {
          if (this.props.financing.timer)
          {
            clearInterval(this.props.financing.timer);
          }
          this.props.financing.timer = null;
        }
      }, 5000)
    }
    return true
  }
  // 部署合约成功后继续
  private handleGoOn = () =>
  {
    this.setState({
      isDoingContract: false
    })
    this.props.financing.step = 2;
    this.props.financing.stepOneStatus = 2
  }
  // 修改储备金比例成功后继续
  private handleDoneOn = () =>
  {
    this.setState({
      isDoingSave: false
    })
    this.props.financing.stepThreeStatus = 2;
  }
  // 新增批次
  private handleAddAsset = () =>
  {
    if (!this.props.financing.financingContent)
    {
      return false;
    }
    this.props.financing.financingContent.reserveTokenInfo[0].info.push({
      amt: undefined,
      days: undefined
    })

    return true;
  }
  // 删除批次
  private handleRemoveAsset = (index: number) =>
  {
    if (!this.props.financing.financingContent)
    {
      return false;
    }
    this.props.financing.financingContent.reserveTokenInfo[0].info.splice(index, 1);
    return true;
  }
  // 输入解锁数量
  private handleChangeAmt = (index: number, ev: React.ChangeEvent<HTMLInputElement>) =>
  {
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
    if (this.props.financing.financingContent)
    {
      this.props.financing.financingContent.reserveTokenInfo[0].info[index].amt = parseInt(value.toString(), 10) > 0 ? parseInt(value.toString(), 10) : undefined;
    }
    return true;
  }
  // 输入锁定时长
  private handleChangeDays = (index: number, ev: React.ChangeEvent<HTMLInputElement>) =>
  {
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
    if (this.props.financing.financingContent)
    {
      this.props.financing.financingContent.reserveTokenInfo[0].info[index].days = parseInt(value.toString(), 10) > 0 ? parseInt(value.toString(), 10) : undefined;
    }
    return true;
  }
  // 校验所有输入选项
  private handleCheckFinancingInput = () =>
  {
    if (!this.state.platform)
    {
      window.scrollTo(0, 0);
      return false
    }
    if (!this.state.fundName)
    {
      window.scrollTo(0, 0);
      return false
    }
    if (!this.state.adminAddress)
    {
      window.scrollTo(0, 0);
      return false
    }
    if (!this.state.tokenName)
    {
      window.scrollTo(0, 500);
      this.setState({
        nameEnter: true
      })
      return false
    }
    if (!this.state.tokenSymbol)
    {
      window.scrollTo(0, 600);
      this.setState({
        simpleNameEnter: true
      })
      return false
    }
    if (this.state.reserveTokenFlag === "1")
    {
      if (this.props.financing.financingContent && !this.props.financing.financingContent.reserveTokenInfo[0].address)
      {
        this.props.common.openNotificationWithIcon('error', "操作失败", "请完成团队预留模块的填写");
        return false
      }
      if (this.state.addrEnter)
      {
        return false
      }
      let isEnter = true
      if (this.props.financing.financingContent)
      {
        this.props.financing.financingContent.reserveTokenInfo[0].info.forEach((item: IInfo) =>
        {
          if (!item.amt)
          {
            isEnter = false;
          }
          if (!item.days)
          {
            isEnter = false;
          }
        })
      }
      if (!isEnter)
      {
        this.props.common.openNotificationWithIcon('error', "操作失败", "请完成团队预留模块的填写");
        return false;
      }
    }
    this.setState({
      isCanGoing: true
    })
    return true
  }
}

export default injectIntl(StepOne);
