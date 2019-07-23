/**
 * 个人中心
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';

@observer
class PersonalEidt extends React.Component<any, any> {
    
    public render()
    {
        return (
            <div className="personedit-page">
                个人资料
            </div>
        );
    }
}

export default injectIntl(PersonalEidt);
