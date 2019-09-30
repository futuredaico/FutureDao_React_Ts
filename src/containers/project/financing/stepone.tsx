/**
 * 基础信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input, Spin, Icon } from 'antd';
import Select from '@/components/select';
import Button from '@/components/Button';
// import commonStore from '@/store/common';
import { IFinancingProps, ISaveAsset} from '../interface/financing.interface';
// import { ProjSubState } from '@/store/interface/common.interface';
interface IState
{
  financingType: string, // 融资类型
  blockType: string, // 选择区块链
  assetType: string, // 融资的代币
  // neoAssetType: string, // 融资的代币
  managerAddr: string, // 管理员钱包地址
  assetName: string, // 项目代币名称
  assetSimpleName: string, // 项目代币简称
  teamAsset: string, // 是否团队预留代币
  saveAsset:ISaveAsset[], // 团队预留代币模块
  isDoingContract: boolean, // 是否正在部署合于
}

@observer
class StepOne extends React.Component<IFinancingProps, IState> {
  public intrl = this.props.intl.messages;
  public state = {
    financingType: this.props.financing.financingContent.financingType, // 融资类型
    blockType: this.props.financing.financingContent.blockType, // 选择区块链
    assetType: this.props.financing.financingContent.assetType, // 融资的代币
    // neoAssetType: this.props.financing.financingContent.assetType,
    managerAddr: this.props.financing.financingContent.managerAddr, // 管理员钱包地址
    assetName: this.props.financing.financingContent.assetName, // 项目代币名称
    assetSimpleName: this.props.financing.financingContent.assetSimpleName, // 项目代币简称
    teamAsset: this.props.financing.financingContent.isSaveAsset, // 是否团队预留代币
    saveAsset:[],
    isDoingContract: false
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
      id: "2",
      name: "否",
    }
  ]

  public render()
  {
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
                <Select options={this.blockOptions} text='' onCallback={this.handleSelectBlock} defaultValue={this.state.blockType} />
              </div>
              <div className="inline-title">
                <strong>融资代币</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 接受使用融资的代币 ）</span>
              </div>
              <div className="inline-enter">
                <Select options={this.state.assetType === "eth" ? this.assetOption : this.neoOption} text='' onCallback={this.handleSelectAsset} defaultValue={this.state.assetType} />
              </div>
              <div className="inline-title">
                <strong>管理员钱包地址</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 该地址将成为智能合约的管理员，仅限您本人的钱包地址 ）</span>
              </div>
              <div className="inline-enter">
                <Input value="无法获取钱包地址" readOnly={true} className="err-active" />
              </div>
              <div className="inline-title">
                <strong>项目代币名称</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 为您的项目代币起个名称，例如 Bitcoin ）</span>
              </div>
              <div className="inline-enter">
                <Input value={this.state.assetName} maxLength={20} />
              </div>
              <div className="inline-title">
                <strong>项目代币简称</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 您的项目代币的简称及单位，尽量使用大写字母，例如BTC ）</span>
              </div>
              <div className="inline-enter">
                <Input value={this.state.assetSimpleName} maxLength={10} />
              </div>
              <div className="inline-title">
                <strong>团队预留代币</strong>&nbsp;
                <span className="red-type">*</span>&nbsp;&nbsp;
                <span className="tips-text">（ 在开始融资前生成一部分代币。预留代币在锁仓期间可以进行提案投票，但不可以卖出 ）</span>
              </div>
              <div className="inline-enter">
                <Select options={this.saveOptions} text='' onCallback={this.handleSelectSave} defaultValue={this.state.teamAsset} />
                {
                  this.state.teamAsset === '1' && (
                    <div className="gray-box newgray-box">
                      <div className="inline-title">
                        <strong>预留代币接收地址</strong>&nbsp;&nbsp;
                  <span className="tips-text">（ 预留代币发放的目标钱包地址，默认为你本人的钱包地址 ）</span>
                      </div>
                      <div className="inline-enter">
                        <Input value={this.state.assetSimpleName} />
                      </div>
                      <div className="tworow-line">
                        <div className="firstrow">
                          <div className="inline-title">
                            <strong>解锁数量1</strong>
                          </div>
                          <div className="inline-enter">
                            <Input value={1000} />
                          </div>
                        </div>
                        <div className="secondrow">
                          <div className="inline-title">
                            <strong>锁定时长</strong>
                          </div>
                          <div className="inline-enter">
                            <Input value={50} suffix="天" />
                          </div>
                        </div>
                      </div>
                      <div className="tworow-line">
                        <div className="firstrow">
                          <div className="inline-title">
                            <strong>解锁数量2</strong>
                          </div>
                          <div className="inline-enter">
                            <Input value={1000} />
                          </div>
                        </div>
                        <div className="secondrow">
                          <div className="inline-title">
                            <strong>锁定时长</strong>
                          </div>
                          <div className="inline-enter">
                            <Input value={100} suffix="天" />
                          </div>
                        </div>
                        <div className="delete-line">
                          <img src={require("@/img/delete.png")} alt="delete.png" className="delete-icon" />
                        </div>
                      </div>
                      <div className="add-wrapper">
                        <Button text="+ 增加批次" btnSize="bg-btn" btnColor="white-btn" />
                        <span className="purple-text">（ 总预留数量2000，在合约发布100天后全部解锁。 ）</span>
                      </div>
                    </div>
                  )
                }
              </div>
              <div className="inline-btn">
                <div className="gray-box">启动融资后将由后台发布智能合约，智能合约发布后将无法撤销，无法更改。</div>
                <Button
                  text="提交并继续"
                  btnSize="bg-btn"
                  btnColor='gray-btn'
                  onClick={this.handleComfirmFinancing}
                />
              </div>
            </>
          )
        }
        {
          this.state.isDoingContract && (
            <div className="going-on-wrapper">
              <div className="going-on-content">
                <strong className="going-bigtext">正在部署融资合约</strong>
                <div className="loading-going">
                  <Spin indicator={antIcon} size="small" />
                  <span>请等待...</span>
                </div>
                <div className="done-going">
                  <img src={require("@/img/done.png")} alt="" />
                  <span>成功！</span>
                </div>
                <strong className="going-bigtext">正在部署治理合约</strong>
                <div className="loading-going">
                  <Spin indicator={antIcon} size="small" />
                  <span>请等待...</span>
                </div>
                <div className="done-going">
                  <img src={require("@/img/done.png")} alt="" />
                  <span>成功！</span>
                </div>
                <p className="going-p">处理这些事物可能需要较长时间，取决于网络状态处理期间请勿关闭本页</p>
                <div className="goon-btn">
                  <Button text="继续" btnSize="md-bg-btn" onClick={this.handleGoOn} />
                </div>
              </div>
            </div>
          )
        }

      </div >
    );
  }
  // 融资代币的选择
  private handleSelectAsset = (item) =>
  {
    // todo
    this.setState({
      assetType: item.id
    })
  }
  // 融资类型的选择
  private handleSelectFinancing = (item) =>
  {
    this.setState({
      financingType: item.id,
    })
  }
  // 区块链的选择
  private handleSelectBlock = (item) =>
  {
    this.setState({
      blockType: item.id,
    })
    this.handleSelectAsset({id:item.id === "eth"?"eth":"neo"})
  }
  // 团队预留币的选择
  private handleSelectSave = (item) =>
  {
    this.setState({
      teamAsset: item.id
    })
  }
  // 提交部署合约
  private handleComfirmFinancing = () =>
  {
    // todo
    // this.props.project.isEdit = false;
    this.setState({
      isDoingContract: true
    })
  }
  // 部署合约成功后继续
  private handleGoOn = () =>
  {
    this.setState({
      isDoingContract: false
    })
  }
}

export default injectIntl(StepOne);
