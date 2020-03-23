/**
 * 启动融资
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
// import Button from '@/components/Button';
import { Input } from 'antd';
import Select from '@/components/select';
import { IProjectProps } from '../interface/project.interface';
import Hint from '@/components/hint';

type Identity = 'admin' | 'member';
interface IState
{
    identityValue: Identity,
}

@observer
class StartFinancing extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        identityValue: 'admin',
    }
    private assetOption = [
        {
            id: '1',
            name: 'Moloch DAO',
            hash: "0x7D1a4fC6Df3B16eB894004A4586A29f39Ba6d205"
        },
        {
            id: '2',
            name: 'Moloch DAO',
            hash: "0x7D1a4fC6Df3B16eB894004A4586A29f39Ba6d205"
        },
        {
            id: '3',
            name: '其他',
            hash: ""
        }
    ]
    public render()
    {

        return (
            <>
                <div className="title-cut">
                    <strong>融资设置</strong>
                </div>
                {/* 融资代币接收地址 */}
                <div className="inline-title first-title">
                    <strong>融资代币接收地址</strong>
                </div>
                <div className="inline-enter">
                    <Select
                        options={this.assetOption}
                        text=''
                        onCallback={this.onSelletCallback}
                    />
                    <Input maxLength={30} />
                </div>
                <div className="inline-title">
                    <strong>融资代币</strong>
                </div>
                <div className="inline-enter">
                    <Input maxLength={30} />
                </div>
                <div className="title-cut">
                    <strong>融资设置</strong>
                </div>
                <div className="inline-title">
                    <strong>代币名称</strong>&nbsp;&nbsp;
                    <span className="tips-text">（ 为您的项目代币起个名称，例如 Bitcoin ）</span>
                </div>
                <div className="inline-enter">
                    <Input maxLength={30} />
                </div>
                <div className="title-cut">
                    <strong>投资设置</strong>
                    <Hint
                        text="投资者的投资资金一部分会作为发行项目代币的储备金进入储备资金池中，一部分会作为支持项目的资金进入已募集资金池中。已募集资金池中的代币会按月转给项目组。"
                        hintType="right-hint"
                    />
                </div>
                <div className="inline-title">
                    <strong>储备比例</strong>&nbsp;&nbsp;
                    <span className="tips-text">（ 投资资金进入储备池的比例。储备比例越高，代币买入、卖出价差越小，对投资者吸引力变大，但项目组可调用的资金将变少。 ）</span>
                </div>
                <div className="inline-enter">
                    <Input maxLength={30} suffix="%" />
                </div>
                <div className="inline-title">
                    <strong>水龙头设置</strong>
                </div>
                <div className="gray-box-wrapper">
                    <div className="inline-title">
                        <strong>每月转入比例</strong>&nbsp;&nbsp;
                        <span className="tips-text">（ 每月从募集资金池中转入当前资金池余额百分比的资金到项目组 ）</span>
                    </div>
                    <div className="inline-enter">
                        <Input maxLength={30} suffix="%" />
                    </div>
                    <div className="inline-title">
                        <strong>最少转入金额</strong>&nbsp;&nbsp;
                        <span className="tips-text">（ 每月最少从募集资金池中转入多少资金。每月转入量小于最少转入量时，按最小转入量计算。 ）</span>
                    </div>
                    <div className="inline-enter">
                        <Input maxLength={30} suffix="ETH" />
                    </div>
                    <div className="inline-title">
                        <strong>最大转入金额</strong>&nbsp;&nbsp;
                        <span className="tips-text">（ 每月最多从募集资金池中转入多少资金。每月转入量大于最大转入量时，按最大转入量计算。 ）</span>
                    </div>
                    <div className="inline-enter">
                        <Input maxLength={30} suffix="ETH" />
                    </div>
                </div>
                <div className="inline-title" />
            </>
        );
    }
    private onSelletCallback = () =>
    {
        // console.log(item);
        // console.log(opt)
        // todo
        // this.setState({
        //     identityValue: item.id
        // })
    }
}

export default injectIntl(StartFinancing);
