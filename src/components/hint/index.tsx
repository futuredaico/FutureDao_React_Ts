// 图标提示隐藏显示组件
import * as React from 'react';
import q1 from '@/img/explain.png';
import q2 from '@/img/attention2.png';
// import q3 from '@/img/explain3.png';
import { injectIntl } from 'react-intl';
import classnames from 'classnames';
import './index.less';
interface IProps
{
  type?: string,
  text: string,
  hintType: 'right-hint' | 'bottom-hint'|'top-hint'
  intl: any
}
class Hint extends React.Component<IProps>
{
  public prop = this.props.intl.messages;
  public render()
  {
    const hintClassName = classnames("hint-content", this.props.hintType)
    return (
      <div className="hint-box">
        <div className="hint-msg">
          <div className="hint-img">
            {(this.props.type&&this.props.type === '2' )? <img src={q2} alt="" />:<img src={q1} alt="" />}
            {/* {this.props.type === '2' && <img src={q2} alt="" />}
            {this.props.type === '3' && <img src={q3} className="type3" alt="" />} */}
          </div>
          <div className={hintClassName} >
            <p>{this.props.text}</p>
            {/* {
              this.props.type !== '3' && (
                <>
                  <p>{this.props.intl.messages.hint.type1}</p>
                  <p>{this.props.intl.messages.hint.type2}</p>
                </>
              )
            } */}
            {/* <p>{this.prop.myauction.tip1}</p>
                        <p>{this.prop.myauction.tip2}</p> */}
            {/* {this.props.type === '3' && <p>{this.props.intl.messages.hint.type3}</p>} */}
            <div className="hint-wrapper">
              <div className="arrow" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(Hint);

