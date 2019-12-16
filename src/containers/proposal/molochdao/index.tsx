/**
 * 发布提案
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { Input } from 'antd';
import Button from '@/components/Button';
// import classnames from 'classnames';
import { History } from 'history';
// import { getQueryString } from '@/utils/function';
import Select from '@/components/select';
import TextArea from 'antd/lib/input/TextArea';
interface IProps extends RouteComponentProps<{ projectId: string }>
{
    route: {
        [key: string]: any
    };
    history: History,
    intl: any
}

@inject('project')
@observer
class ProjectProposal extends React.Component<IProps, any> {
    public state = {
        assetType: "1", // 贡献资金的单位
    }
    private assetOption = [
        {
            id: "1",
            name: 'ETH'
        },
        {
            id: "2",
            name: 'DAI'
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
                        <h2>发起MolochoDao提案</h2>
                    </div>
                    <div className="proposal-content">
                        <div className="inline-title">
                            <strong>提案名称</strong>&nbsp;
                        <span className="red-type">*</span>
                        </div>
                        <div className="inline-enter">
                            <Input maxLength={40} />
                        </div>
                        <div className="inline-title">
                            <strong>提案详情</strong>&nbsp;
                            <span className="red-type">*</span>
                            <span className="tips-text">（ 提案详情将上链。内容过多时建议您使用云文档，并将文档链接粘贴此处。 ）</span>
                        </div>
                        <div className="inline-enter">
                            <TextArea maxLength={400} className="nosize-textarea" />
                        </div>
                        <div className="inline-title">
                            <strong>股份申请人</strong>&nbsp;
                            <span className="red-type">*</span>
                            <span className="tips-text">（ 申请到的股份将发到此地址。 ）</span>
                        </div>
                        <div className="inline-enter">
                            <Input />
                        </div>
                        <div className="inline-title">
                            <strong>申请股份</strong>&nbsp;
                            <span className="red-type">*</span>
                        </div>
                        <div className="inline-enter">
                            <Input className="sort-inputtext" />
                        </div>
                        <div className="inline-title">
                            <strong>贡献资金</strong>&nbsp;
                            <span className="red-type">*</span>
                            <span className="tips-text">（ 如果股份申请人非您本人，则需要提前发送授权交易，否则提案将失败。 ）</span>
                        </div>
                        <div className="inline-enter">
                            <Input className="sort-inputtext" />
                            <div className="sort-select">
                                <Select options={this.assetOption} text='' onCallback={this.handleChoiceProposalType} defaultValue={this.state.assetType} />
                            </div>
                        </div>
                        <div className="inline-btn">
                            <Button
                                text="发起预发布提案"
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
            assetType: item.id
        })
    }
}

export default injectIntl(ProjectProposal);
