import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import '../index.less';
import Button from '@/components/Button';
import { IProjectInfoProps, IProjectTeam, IProjReward, IProjReserveList } from '../interface/projectinfo.interface';
import Hint from '@/components/hint';
import { ProjectState } from '@/store/interface/common.interface';
import * as formatTime from '@/utils/formatTime';
@observer
class RightTeam extends React.Component<IProjectInfoProps, any> {
    public intrl = this.props.intl.messages;
    public componentDidMount()
    {
        this.props.projectinfo.getTeamData();
        this.props.projectinfo.getRewardData();
        this.props.projectinfo.getReserveTokenData();
    }
    public render()
    {
        if (!this.props.projectinfo.projInfo)
        {
            return null
        }
        return (
            <>
                <div className="team-wrapper">
                    <h3 className="title-h3">{this.intrl.projinfo.team}</h3>
                    {
                        this.props.projectinfo.projTeamList.length > 0 && this.props.projectinfo.projTeamList.map((item: IProjectTeam, index: number) =>
                        {
                            return (
                                <div className="team-smallbox" key={index}>
                                    <div className="team-people">
                                        <img src={item.headIconUrl ? item.headIconUrl : require('@/img/default.png')} alt="" />
                                        <span>{item.username}</span>
                                    </div>
                                    <p className="team-des">{!!item.brief ? item.brief : this.intrl.projinfo.noprofile}</p>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    this.props.projectinfo.projInfo.projState === ProjectState.CrowdFunding && (
                        <>
                            <div className="price-wrapper">
                                <h3 className="title-h3">项目代币价格</h3>
                                <div className="price-btn">
                                    <Button text="购买价格" btnSize="md-btn" btnColor="white-btn" />
                                    <Button text="出售价格" btnSize="md-btn" btnColor="gray-black2" />
                                </div>
                                <div className="line-picture">
                                    线性图表
                                </div>
                                <p className="price-tips">项目代币由智能合约管理，会在投资者买入时增发，卖出时销毁。代币价格由智能合约自动计算给出，会随着代币发行数量的增加不断变高。因此购买越早，买入价格越低，后期涨的越多。</p>
                            </div>
                            {
                                this.props.projectinfo.rewardList.length > 0 && (
                                    <div className="gift-wrapper">
                                        <h3 className="title-h3">
                                            购买代币礼包
                                            <Hint
                                                text="购买代币礼包会得到对应代币以及项目方为投资者准备的额外回报，该回报由项目方负责发放。直接购买代币无法获得额外回报。"
                                                hintType="bottom-hint"
                                            />
                                        </h3>
                                        {
                                            this.props.projectinfo.rewardList.map((item: IProjReward, index: number) =>
                                            {
                                                return (
                                                    <div className="gift-smallbox" key={index}>
                                                        <strong className="b-block">{item.price} {item.giftTokenName.toLocaleUpperCase()}</strong>
                                                        <span className="s-gray">获得约14代币</span>
                                                        <strong className="m-block">{item.rewardName}</strong>
                                                        <p className="m-gray">{item.rewardDesc}</p>
                                                        <p className="m-gray">产品1X1</p>
                                                        <p className="m-gray">产品2X2</p>
                                                        <strong className="m-block">预计交货  {item.distributeTimeFlag === "1" ? item.distributeTimeFixYes : item.distributeTimeFixNot + "天内"}</strong>
                                                        {/* <strong className="m-block">预计交货  3天内</strong> */}
                                                        {
                                                            item.limitFlag === '1' && <strong className="m-block">限量{item.limitMax}（剩余{parseInt(item.limitMax, 10) - parseInt(item.hasSellCount.toString(), 10)}）</strong>
                                                        }

                                                        <Button text="购买" />
                                                        {/* <Button text="已抢光" btnColor="gray-btn" /> */}
                                                        {
                                                            parseInt(item.hasSellCount.toString(), 10) > 0 && <span className="s-gray">67支持</span>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                )
                            }
                            {
                                this.props.projectinfo.reserveData && (
                                    <div className="team-price-wrapper">
                                        <h3 className="title-h3">团队预留代币信息</h3>
                                        <div className="team-price-line">
                                            <div className="left-t">总预留代币数</div>
                                            <div className="right-t">{this.props.projectinfo.reserveData.lockTotal}</div>
                                        </div>
                                        {
                                            this.props.projectinfo.reserveData.list.map((item: IProjReserveList, index: number) =>
                                            {
                                                return (
                                                    <div className="team-price-line" key={index}>
                                                        <div className="left-t">第{index + 1}批解锁</div>
                                                        <div className="right-t">
                                                            {item.tokenAmt}
                                                            {
                                                                item.unlockFlag ? <span className="g-tips">（已解锁）</span> : <span className="c-tips">{formatTime.computeDay(item.timestamp, this.props.intl.locale)}</span>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }

                        </>
                    )
                }
            </>
        )
    }
}

export default injectIntl(RightTeam);