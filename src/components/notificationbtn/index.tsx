import * as React from 'react';
import { Button } from 'antd';
import './index.less'
export default (text: string, callback: () => void) => {
  return <Button
    className="comp-notificationbtn-class"
    type="primary"
    onClick={callback}>{text}</Button>
}
