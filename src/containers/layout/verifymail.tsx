import * as React from 'react';
import { observer } from 'mobx-react'
import { ICommonStore } from '@/store/interface/common.interface';

interface IProps {
  locale:any,
  common: ICommonStore  
}

export default observer((props: IProps) => {
  const handleReSendEmail = ()=>{
    props.common.reSendEmail();
  }
  if (!props.common.isVerifyEmail) {
    return null;
  }
  return (
    <div className="verify-wrapper">{props.locale.sendtips}<strong className="send-email" onClick={handleReSendEmail} >{props.locale.send}</strong></div>
  )
  
});