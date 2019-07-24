/**
 * Layout页面
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import { renderRoutes } from 'react-router-config';
import './index.less';
import { injectIntl } from 'react-intl';
import { History } from 'history'
// import Button from '@/components/Button';
interface IProps
{
  route: {
    [key: string]: any
  };
  history:History,
  intl:any
}
@observer
class Load extends React.Component<IProps, any> {
    public render()
    {
        return (
            <div className="load-page">
                <div className="load-box">
                    <div className="load-img">
                        <img src={require('@/img/left.png')} alt="" />
                    </div>
                    <div className="load-content">
                        <div className="future-logo">
                            <img src={require('@/img/logo.png')} alt="" />
                        </div>
                        <div className="content-input-wrapper">
                            {
                                renderRoutes(this.props.route.children)
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-img bg1" />
                <div className="bg-img bg2" />
                <div className="bg-img bg3" />
            </div>
        );
    }
}

export default injectIntl(Load);
