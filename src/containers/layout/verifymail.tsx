import * as React from 'react';
import { observer } from 'mobx-react'
import { ICommonStore } from '@/store/interface/common.interface';

interface IProps {
  common: ICommonStore
}

export default observer((props: IProps) => {
  if (!props.common.isVerifyEmail) {
    return null;
  }
  return (
    <div className="verify-wrapper">小提示：  我们需要验证你的电子邮件地址。请点击我们发送的邮件里的链接。  <strong className="send-email" >重新发送</strong></div>
  )
});