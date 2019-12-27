// 退出登录的一个弹筐
import * as React from 'react';
import { observer } from 'mobx-react'
import { ICommonStore } from '@/store/interface/common.interface';
import Button from '@/components/Button';

interface IProps
{
    locale: any,
    common: ICommonStore
}

export default observer((props: IProps) =>
{
    const handleComfrimLogout = () =>
    {
        props.common.isLoginoutFlag = false;
        props.common.logoutFutureDao();
    }
    if (!props.common.isLoginoutFlag)
    {
        return null;
    }
    return (
        <div className="logoutbox-wrapper">
            <div className="logoutbox-content">
                <p>{props.locale.logouttips}</p>                
                <Button text={props.locale.comfirm} btnSize="stop-btn" onClick={handleComfrimLogout} />
            </div>
        </div>
    )

});
