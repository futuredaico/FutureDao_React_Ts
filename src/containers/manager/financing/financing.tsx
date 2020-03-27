/**
 * 融资管理
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { IProjectProps } from '../interface/project.interface';
import StartFinancing from './start';
// import Settlement from './settlement';

@inject('project', 'financing', 'common','metamaskwallet')
@observer
class FinancingManager extends React.Component<IProjectProps> {
    public intrl = this.props.intl.messages;
    public render()
    {

        return (
            <div className="financing-page">
                <div className="big-title"><strong>融资管理</strong></div>
                <StartFinancing {...this.props} />
                {/* <Settlement {...this.props} /> */}
            </div>
        );
    }
}

export default injectIntl(FinancingManager);
