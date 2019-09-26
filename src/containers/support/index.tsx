/**
 * 支持众筹、产品预售页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { ISupportProps } from './interface/support.interface';
import Button from '@/components/Button';
// import * as formatTime from '@/utils/formatTime';
interface IState {
    isShowVideo: boolean
}
@inject('support', 'common')
@observer
class Support extends React.Component<ISupportProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        isShowVideo: false
    }
    public componentDidMount() {
        const projectId = this.props.match.params.projectId;
        this.props.support.projId = projectId;
    }
    public render() {
        return (
            <div className="support-wrapper">
                <h1 className="support-project-title">SS历险记</h1>
                <strong className="support-project-name">SS项目名称</strong>
                <div className="support-list">
                    <div className="support-gift-smallbox" onClick={this.handleToOrderPage}>
                        <strong className="b-block">10 DAI</strong>
                        <span className="s-gray">获得约14代币</span>
                        <strong className="m-block">ZHE SHI YI GE HUI BAO BIAO TI</strong>
                        <p className="m-gray">回报说明Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.</p>
                        <p className="m-gray">产品1X1</p>
                        <p className="m-gray">产品2X2</p>
                        <strong className="m-block">预计交货  2019年9月</strong>
                        {/* <strong className="m-block">预计交货  3天内</strong> */}
                        <strong className="m-block">限量100（剩余33）</strong>
                        {/* <Button text="购买" /> */}
                        <div className="right-top">                            
                            <span className="s-gray">67支持</span>
                            <Button text="已抢光" btnColor="gray-btn" />
                        </div>
                    </div>
                    <div className="support-gift-smallbox">
                        <strong className="b-block">10 DAI</strong>
                        <span className="s-gray">获得约14代币</span>
                        <strong className="m-block">ZHE SHI YI GE HUI BAO BIAO TI</strong>
                        <p className="m-gray">回报说明Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.</p>
                        <p className="m-gray">产品1X1</p>
                        <p className="m-gray">产品2X2</p>
                        <strong className="m-block">预计交货  2019年9月</strong>
                        {/* <strong className="m-block">预计交货  3天内</strong> */}
                        <strong className="m-block">限量100（剩余33）</strong>
                        <div className="right-top">                            
                            <span className="s-gray">67支持</span>
                            <Button text="已抢光" btnColor="gray-btn" />
                        </div>
                    </div>
                    <div className="support-gift-smallbox gray-smallbox">
                        <strong className="b-block">10 DAI</strong>
                        <span className="s-gray">获得约14代币</span>
                        <strong className="m-block">ZHE SHI YI GE HUI BAO BIAO TI</strong>
                        <p className="m-gray">回报说明Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.</p>
                        <p className="m-gray">产品1X1</p>
                        <p className="m-gray">产品2X2</p>
                        <strong className="m-block">预计交货  2019年9月</strong>
                        {/* <strong className="m-block">预计交货  3天内</strong> */}
                        <strong className="m-block">限量100（剩余33）</strong>
                        <div className="right-top">                            
                            <span className="s-gray">67支持</span>
                            <Button text="已抢光" btnColor="gray-btn" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // 订单信息页
    private handleToOrderPage = () => {
        this.props.history.push('/giftorder/'+this.props.support.projId)
    }
}
export default injectIntl(Support)