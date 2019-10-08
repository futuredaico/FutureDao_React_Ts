/**
 * 基础信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import { IFinancingProps, ISaveAsset } from '../interface/financing.interface';
interface IState
{
    assetAddr: string, // 预留地址
    saveAsset: ISaveAsset[], // 团队预留代币模块
    isDoingContract: boolean, // 是否正在部署合于
}

@observer
class AssetSave extends React.Component<IFinancingProps, IState> {
    public intrl = this.props.intl.messages;
    public state = {
        assetAddr: '',
        saveAsset: [],
        isDoingContract: false
    };

    public render()
    {
        return (
            <div className="tworow-line">
                <div className="firstrow">
                    <div className="inline-title">
                        <strong>解锁数量2</strong>
                    </div>
                    <div className="inline-enter">
                        <Input value={1000} />
                    </div>
                </div>
                <div className="secondrow">
                    <div className="inline-title">
                        <strong>锁定时长</strong>
                    </div>
                    <div className="inline-enter">
                        <Input value={100} suffix="天" />
                    </div>
                </div>
                <div className="delete-line">
                    <img src={require("@/img/delete.png")} alt="delete.png" className="delete-icon" />
                </div>
            </div>
        )
    }
}

export default injectIntl(AssetSave);
