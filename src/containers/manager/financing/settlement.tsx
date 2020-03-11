/**
 * 结算月供
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
// import Button from '@/components/Button';
// import { Input } from 'antd';
// import Select from '@/components/select';
import { IProjectProps } from '../interface/project.interface';

type Identity = 'admin' | 'member';
interface IState
{
    identityValue: Identity,
}

@observer
class Settlement extends React.Component<IProjectProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        identityValue: 'admin',
    }
    public render()
    {

        return (
            <div className="financing-page">
                <div className="big-title"><strong>融资管理</strong></div>
                div.
               
            </div>
        );
    }
}

export default injectIntl(Settlement);
