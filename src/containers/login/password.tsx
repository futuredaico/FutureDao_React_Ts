/**
 * 邮箱修改密码页面
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Button from '@/components/Button';
// import Button from '@/components/Button';
@observer
class PwdUpdate extends React.Component<any, any> {
    public render()
    {
        return (
            <div className="normal-wrapper">
                <Input placeholder="邮箱" readOnly={true} />
                <Input.Password placeholder="新密码" />
                <Input.Password placeholder="确认密码" />
                <Button text="更改密码" />
            </div>
        );
    }
}

export default injectIntl(PwdUpdate);
