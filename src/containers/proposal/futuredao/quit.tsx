/**
 * 发布提案
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IFutureProposalProps } from './interface/future.interface';
export interface IState
{
    projId: string,
    explain:string
}
@inject('future')
@observer
class FQuitProposal extends React.Component<IFutureProposalProps, IState> {
    public state: IState = {
        projId: '',
        explain:""
    }
    public async componentDidMount()
    {
        const projectId = this.props.match.params['projectId'];
        console.log(projectId)
        this.setState({
            projId: projectId || '',
        })
    }
    public render()
    {
        return (
            <>
                <div className="proposal-top">
                    <h2>清退资金</h2>
                </div>
                <div className="proposal-content">
                    <div className="inline-title">
                        <strong>补充说明</strong>
                    </div>
                    <div className="inline-enter">
                        <textarea
                            className="future-textarea"
                            value={this.state.explain}
                            maxLength={400}
                            onChange={this.handleChangeExplain}
                        />
                    </div>
                    <div className="inline-btn">
                        <Button
                            text="发起提案"
                            btnSize="bg-btn"
                            btnColor="gray-btn"
                        />
                    </div>
                </div>

            </>
        );
    }
    // 补充说明
    private handleChangeExplain = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        this.setState({
            explain: ev.target.value
        })
    }
    
}

export default injectIntl(FQuitProposal);
