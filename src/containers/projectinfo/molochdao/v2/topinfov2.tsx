/**
 * 项目详情页，上半部分
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps, IFundInfo } from '../interface/molochinfo.interface';
import { saveDecimal } from '@/utils/numberTool';
import classnames from 'classnames';

interface IState
{
    showAllAsset: boolean
}

@observer
class TopInfoV2 extends React.Component<IMolochInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        showAllAsset: false
    }
    public render()
    {
        if (!this.props.molochinfo.projInfo)
        {
            return null;
        }
        const listClassName = classnames('going-purple', { 'show-list-asset': this.state.showAllAsset })
        return (
            <div className="ptop-right ptopv2-right">
                <div className="going-wrapper">
                    <div className="going-line">
                        <div className="going-gray">{this.intrl.projinfo.asset}</div>
                        <div className={listClassName}>
                            <div className="list-asset-num">
                                {
                                    this.props.molochinfo.fundTotalList && (
                                        <>
                                            {
                                                this.props.molochinfo.fundTotalList.count > 3 && this.props.molochinfo.fundTotalList.list.map((item: IFundInfo, index: number) =>
                                                {
                                                    return (
                                                        <>
                                                            {
                                                                index !== 2 ? (
                                                                    <>
                                                                        <strong className="purple-big" key={index}>
                                                                            {
                                                                                index === 1 ?saveDecimal(item.fundTotal, 4)+' ' + item.fundSymbol.toLocaleUpperCase()
                                                                                :saveDecimal(item.fundTotal, 2)+' ' + item.fundSymbol.toLocaleUpperCase()
                                                                            }
                                                                        </strong><br />
                                                                    </>
                                                                ) : (
                                                                        <>
                                                                            <strong className="purple-big" key={index}>
                                                                                {
                                                                                    saveDecimal(item.fundTotal, 2) +' ' + item.fundSymbol.toLocaleUpperCase()
                                                                                }
                                                                            </strong>
                                                                            {
                                                                                !this.state.showAllAsset && (
                                                                                    (
                                                                                        <div className="show-all" onClick={this.handleToShowList}>
                                                                                            <span>全部</span>
                                                                                            <span className="trage" />
                                                                                        </div>
                                                                                    )
                                                                                )
                                                                            }
                                                                            <br />
                                                                        </>
                                                                    )
                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                }
                                {/* <strong className="purple-big">
                                    {
                                        this.props.molochinfo.fundTotalList
                                            ? saveDecimal(this.props.molochinfo.fundTotalList.list[0].fundTotal, 4) + this.props.molochinfo.fundTotalList.list[0].fundSymbol.toLocaleUpperCase()
                                            : 0
                                    }
                                </strong><br />
                                <strong className="purple-big">12345678.1234 ETH</strong><br />
                                <strong className="purple-big">12345 ETH</strong>
                                {
                                    !this.state.showAllAsset && (
                                        (
                                            <div className="show-all" onClick={this.handleToShowList}>
                                                <span>全部</span>
                                                <span className="trage" />
                                            </div>
                                        )
                                    )
                                }
                                <br />
                                <strong className="purple-big">12345678.1234 ETH</strong><br />
                                <strong className="purple-big">12345 ETH</strong><br />
                                <strong className="purple-big">12345678.1234 ETH</strong><br />
                                <strong className="purple-big">12345 ETH</strong><br /> */}
                            </div>
                            {
                                this.state.showAllAsset && (
                                    <div className="list-asset-wrapper" onClick={this.handleToShowList}>
                                        <span className="take-up">收起<span className="trage-gray" /></span>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    <div className="going-line">
                        <div className="going-gray">{this.intrl.projinfo.total}</div>
                        <div className="going-normal">
                            <strong>{this.props.molochinfo.projInfo.shares}</strong>
                        </div>
                    </div>
                    <div className="going-line">
                        <div className="going-gray">{this.intrl.projinfo.every}</div>
                        <div className="going-normal">
                            <strong>≈ $ {parseFloat(saveDecimal(this.props.molochinfo.projInfo.valuePerShare, 6))}</strong>
                            <div className="everyshare-box">
                                <p>11.111 Eth</p>
                                <p>11.111 Eth</p>
                                <p>11.111 Eth</p>
                            </div>
                        </div>
                    </div>
                    {
                        this.props.molochinfo.projInfo.officailWeb && (
                            <div className="going-line">
                                <div className="going-gray">{this.intrl.projinfo.website}</div>
                                <a className="weblink-purple" target="_blank" href={this.props.molochinfo.projInfo.officailWeb}>{this.props.molochinfo.projInfo.officailWeb}</a>
                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
    // 展开与收起
    private handleToShowList = () =>
    {
        this.setState({
            showAllAsset: !this.state.showAllAsset
        })
    }
}
export default injectIntl(TopInfoV2)