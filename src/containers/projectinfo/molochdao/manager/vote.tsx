/**
 * 项目详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IMolochInfoProps } from '../interface/molochinfo.interface';

@observer
class MolochManagerInfo extends React.Component<IMolochInfoProps, any> {
    public intrl = this.props.intl.messages;
    public state = {
        managerDiscuss: '',
        managerReply: '',
        managerReplyOther: '',
        isOpenStopBox: false,
        showDeletBox: false
    }
    public render()
    {
        return (
                <>
                    <h3 className="title-h3">
                        投票
                    </h3>
                    <div className="vote-box">
                        <div className="vote-title">MGP 28.1: Moloch v2 Unit Testing (Additional shares)</div>
                        <div className="manager-votebox">
                            <div className="green-sai" style={{ "width": 60 + "%" }} />
                            <div className="red-sai" style={{ "width": 40 + "%" }} />
                            <span className="left-top">赞同：1135</span>
                            <span className="right-top">反对：447</span>
                        </div>
                        <div className="myvote">
                            <div className="myvote-title">
                                <strong>我的投票</strong>
                            </div>
                            <div className="myvote-btn">
                                <Button text="赞同" btnColor="bright-green" />
                                <Button text="反对" btnColor="bright-red" />                                
                            </div>
                        </div>
                    </div>
                    <div className="going-box">
                        <strong className="left-str">投票中</strong><br />
                        <span className="small-right-str">剩余时间：8d12h12m</span>
                    </div>
                </>
        );
    }
}

export default injectIntl(MolochManagerInfo);
