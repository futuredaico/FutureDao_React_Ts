import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import './index.less';
import Button from '@/components/Button';
import { IProjectInfoProps, IProjectTeam } from './interface/projectinfo.interface';
import Hint from '@/components/hint';
@observer
class RightTeam extends React.Component<IProjectInfoProps, any> {
    public intrl = this.props.intl.messages;
    public componentDidMount()
    {
        this.props.projectinfo.getTeamData();
    }
    public render()
    {
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
                <div className="gift-wrapper">
                    <h3 className="title-h3">
                        购买代币礼包
                        <Hint
                            text="购买代币礼包会得到对应代币以及项目方为投资者准备的额外回报，该回报由项目方负责发放。直接购买代币无法获得额外回报。"
                            hintType="bottom-hint"
                        />
                    </h3>
                    <div className="gift-smallbox">
                        <strong className="b-block">10 DAI</strong>
                        <span className="s-gray">获得约14代币</span>
                        <strong className="m-block">ZHE SHI YI GE HUI BAO BIAO TI</strong>
                        <p className="m-gray">回报说明Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.</p>
                        <p className="m-gray">产品1X1</p>
                        <p className="m-gray">产品2X2</p>
                        <strong className="m-block">预计交货  2019年9月</strong>
                        {/* <strong className="m-block">预计交货  3天内</strong> */}
                        <strong className="m-block">限量100（剩余33）</strong>
                        <Button text="购买" />
                        {/* <Button text="已抢光" btnColor="gray-btn" /> */}
                        <span className="s-gray">67支持</span>
                    </div>
                </div>
                <div className="team-price-wrapper">
                    <h3 className="title-h3">团队预留代币信息</h3>
                    <div className="team-price-line">
                        <div className="left-t">总预留代币数</div>
                        <div className="right-t">1500</div>
                    </div>
                    <div className="team-price-line">
                        <div className="left-t">第一批解锁</div>
                        <div className="right-t">500 <span className="g-tips">（已解锁）</span></div>
                    </div>
                    <div className="team-price-line">
                        <div className="left-t">第二批解锁</div>
                        <div className="right-t">500 <span className="c-tips">（200天后）</span></div>
                    </div>
                    <div className="team-price-line">
                        <div className="left-t">第三批解锁</div>
                        <div className="right-t">00 <span className="c-tips">（500天后）</span></div>
                    </div>
                </div>
            </>
        )
    }
}

export default injectIntl(RightTeam);
