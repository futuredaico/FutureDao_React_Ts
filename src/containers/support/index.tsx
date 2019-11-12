/**
 * 支持众筹、产品预售页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IProjReward, IProjectInfoProps } from '../projectinfo/interface/projectinfo.interface';
// import * as formatTime from '@/utils/formatTime';
interface IState
{
    isShowVideo: boolean
}
@inject( 'common', 'projectinfo')
@observer
class Support extends React.Component<IProjectInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isShowVideo: false
    }
    public async componentDidMount()
    {
        const projectId = this.props.match.params.projectId;
        this.props.projectinfo.projId = projectId;
        if (projectId)
        {
            await this.props.projectinfo.getProjInfo(projectId);
            this.props.projectinfo.getRewardData();
        }
    }
    public render()
    {
        if (!this.props.projectinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="support-wrapper">
                <h1 className="support-project-title">{this.props.projectinfo.projInfo.projTitle}</h1>
                <strong className="support-project-name">{this.props.projectinfo.projInfo.projName}</strong>
                <div className="support-list">
                    {
                        this.props.projectinfo.rewardList.length > 0 && this.props.projectinfo.rewardList.map((item: IProjReward, index: number) =>
                        {
                            return (
                                <div className={(item.limitFlag === '1' && parseInt(item.limitMax, 10) - parseInt(item.hasSellCount.toString(), 10)===0)?"support-gift-smallbox gray-smallbox":"support-gift-smallbox"} key={index} onClick={this.handleToOrderPage.bind(this, item)}>
                                    <strong className="b-block">{item.price} {item.fundName.toLocaleUpperCase()}</strong>
                                    <span className="s-gray">获得约{item.rewardPrice}代币</span>
                                    <strong className="m-block">{item.rewardName}</strong>
                                    <p className="m-gray">{item.rewardDesc}</p>
                                    <strong className="m-block">{item.distributeTimeFlag === "1" ? item.distributeTimeFixYes : item.distributeTimeFixNot + "天内"}</strong>
                                    {
                                        item.limitFlag === '1' && <strong className="m-block">限量{item.limitMax}（剩余{parseInt(item.limitMax, 10) - parseInt(item.hasSellCount.toString(), 10)}）</strong>
                                    }                                    
                                    <div className="right-top">
                                        <span className="s-gray">{item.hasSellCount}支持</span>
                                        {
                                            item.limitFlag === '1' && parseInt(item.limitMax, 10) - parseInt(item.hasSellCount.toString(), 10)===0 && <Button text="已抢光" btnColor="gray-btn" />
                                        }
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
    // 订单信息页
    private handleToOrderPage = (item: IProjReward) =>
    {
        if(item.limitFlag === '1' && parseInt(item.limitMax, 10) - parseInt(item.hasSellCount.toString(), 10)===0){
            return false;
        }
        this.props.history.push('/giftorder/' + this.props.projectinfo.projId +"?rewardid="+item.rewardId);
        return true;
    }
}
export default injectIntl(Support)