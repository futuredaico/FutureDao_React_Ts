import * as React from 'react';
import './index.less';
import { History } from 'history'
import Button from '@/components/Button';
import { injectIntl } from 'react-intl';
interface IProps {
  history: History,
  locale: any,
  notify: any
  intl:any
}
class NotFound extends React.Component<IProps> {
  public intrl = this.props.intl.messages;
  constructor(props:any) {
    super(props);
  }
  public render() {
    return (
      <div className="notfound-wrapper">
        <img src={require("../../img/notfound.png")} alt="notfound.png"/>
        <Button text={this.intrl.notfound.btn} btnColor="white-purple" btnSize="bg-bg-btn" onClick={this.handeToGoHome} />
      </div>
    );
  }
  private handeToGoHome = ()=>{
    //
    this.props.history.push('/')
  }
}
export default injectIntl(NotFound);
