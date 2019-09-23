/**
 * 发布提案
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { Input } from 'antd';
import Editor from '@/components/braftEditor';
import BraftEditor from 'braft-editor';
import Button from '@/components/Button';
// import classnames from 'classnames';
import { History } from 'history';
// import { getQueryString } from '@/utils/function';
import Select from '@/components/select';
interface IProps extends RouteComponentProps<{ projectId: string }>
{
    route: {
        [key: string]: any
    };
    history: History,
    intl: any
}

@inject('project', 'createproject', 'common')
@observer
class ProjectProposal extends React.Component<IProps, any> {
    public state = {
        proposalType: "1", // 提案类型
        timeType: "1", // 发放方式
        proposalDetail: '', // 提案详情
    }
    private timeOption = [
        {
            id: "1",
            name: '按天发放'
        },
        {
            id: "2",
            name: '一次发放'
        }
    ]
    private proposalOption = [
        {
            id: "1",
            name: '申请资金'
        },
        {
            id: "2",
            name: '申请清退资金'
        }
    ]

    public componentDidMount()
    {
        // const projectId =this.props.match.params['projectId'];
    }
    public render()
    {
        return (
            <div className="proposal-page">
                <div className="proposal-wrapper">
                    <div className="proposal-top">
                        <h2>发布提案</h2>
                    </div>
                    <div className="proposal-content">
                        <div className="inline-title">
                            <strong>提案名称</strong>&nbsp;
                        <span className="red-type">*</span>
                        </div>
                        <div className="inline-enter">
                            {/* className={this.state.nameEnter ? "err-active" : ''} */}
                            <Input />
                            {/* {
                            this.state.nameEnter && <span className="err-span">{this.intrl.edit.error}</span>
                        } */}
                        </div>
                        <div className="inline-title">
                            <strong>提案类型</strong>&nbsp;
                            <span className="red-type">*</span>
                        </div>
                        <div className="inline-enter">
                            <Select options={this.proposalOption} text='' onCallback={this.handleChoiceProposalType} defaultValue={this.state.proposalType} />
                            {
                                this.state.proposalType === '1' && (
                                    <div className="enter-tips">
                                        向社区申请从治理资金池中拿出一部分资金交给资金接收人。需要详细说明资金用途，并与社区提前沟通，否则提案可能会被社区反对或被管理员直接否决。%时，提案通过，同意者可以拿回清退资金并销毁代币。
                                    </div>
                                )
                            }
                            {
                                this.state.proposalType === '2' && (
                                    <div className="enter-tips">
                                        当您认为项目存在重大风险时，可以申请按代币的持有比例从本项目的所有资金池中退还资金。同意清退提案的资金量超过总资金量的30%时，提案通过，同意者可以拿回清退资金并销毁代币。
                                    </div>
                                )
                            }
                        </div>
                        {
                            this.state.proposalType === '1' && (
                                <>
                                    <div className="inline-title">
                                        <strong>申请资金数量</strong>&nbsp;
                                        <span className="red-type">*</span>&nbsp;&nbsp;
                                        <span className="tips-text">（ 资金池余额1000 DAI ）</span>
                                    </div>
                                    <div className="inline-enter">
                                        <Input />
                                    </div>
                                    <div className="inline-title">
                                        <strong>资金接收人</strong>&nbsp;
                                        <span className="red-type">*</span>&nbsp;&nbsp;
                                        <span className="tips-text">（ 提案通过后，只有资金接收人本人才能领取资金 ）</span>
                                    </div>
                                    <div className="inline-enter">
                                        <div className="people-select">
                                            <Input />
                                        </div>
                                    </div>
                                    <div className="inline-title">
                                        <strong>发放方式</strong>&nbsp;
                                        <span className="red-type">*</span>&nbsp;&nbsp;
                                        <span className="tips-text">（ 发放方式会影响投票结果，有些投票人可能会因为不喜欢一次性发放全部资金而投反对票 ）</span>
                                    </div>
                                    <div className="inline-enter">
                                        <Select options={this.timeOption} text='' onCallback={this.handleChoiceTimeType} defaultValue={this.state.timeType} />
                                    </div>
                                    {
                                        this.state.timeType === '1' && (
                                            <>
                                                <div className="inline-title">
                                                    <strong>发放天数</strong>&nbsp;
                                                    <span className="red-type">*</span>&nbsp;&nbsp;
                                                    <span className="tips-text">（ 申请的资金将会平均分配到每一天进行发放 ）</span>
                                                </div>
                                                <div className="inline-enter">
                                                    <Input />
                                                </div>
                                            </>
                                        )
                                    }
                                    
                                </>
                            )
                        }

                        <div className="inline-title">
                            <strong>提案详情</strong>&nbsp;
                        <span className="red-type">*</span>
                        </div>
                        <div className="inline-enter">
                            <div style={{ width: 750, minHeight: 500, maxHeight: 1000 }}>
                                <Editor
                                    onChange={this.onChangeEditorValue}
                                    value={this.state.proposalDetail}
                                // className={this.state.detailEnter ? "err-active" : ''}
                                />
                                {/* {
                            this.state.detailEnter && <span className="err-span">{this.intrl.edit.error}</span>
                            } */}
                            </div>
                            <div className="enter-tips">
                                发起提案需要支付0.1ETH的结算费用和1ETH的押金。结算费用将支付给提案结算人，押金将在提案结束后返还。
                            </div>
                        </div>
                        <div className="inline-btn">
                            <Button
                                text="立即申请"
                                btnSize="bg-btn"
                                btnColor="gray-btn"
                            />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    private handleChoiceProposalType = (item) =>
    {
        console.log(item)
        // todo
        this.setState({
            proposalType: item.id
        })
    }
    private handleChoiceTimeType = (item) =>
    {
        // todo
        console.log(item)
        this.setState({
            timeType: item.id
        })
    }

    // 文本框的输入
    private onChangeEditorValue = (value: any) =>
    {

        // todo
        const text = value.toText();
        if (text !== "")
        {
            this.setState({
                // projDetail: BraftEditor.createEditorState(value).toHTML().replace(/\s\s/g, '&nbsp;&nbsp;'),
                proposalDetail: BraftEditor.createEditorState(value),
                // detailEnter: false
            })
        }
    }
}

export default injectIntl(ProjectProposal);
