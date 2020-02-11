/**
 * 资产模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps } from '../../interface/molochinfo.interface';
import Quit from './quit';
// import ManagerRight from './rigthsize';
// import { toMyNumber } from '@/utils/numberTool';

@observer
class MolochAsset extends React.Component<IMolochInfoProps> {
  public intrl = this.props.intl.messages;

  public render() {
    return (
      <div className="asset-wrapper">
        <div className="asset-left">
          <div className="asset-title-line">
            <strong className="title-left">股份</strong>
            <strong className="title-right">每股价值</strong>
          </div>
          <div className="asset-normal-line">
            <span className="normal-left">99999</span>
            <span className="normal-right">≈ $ 0.1</span>
          </div>
          <div className="asset-title-line">
            <strong className="title-left">股份</strong>
            <strong className="title-right">每股价值</strong>
          </div>
          <div className="asset-normal-line">
            <span className="normal-left">99999</span>
            <span className="normal-right">≈ $ 0.1</span>
          </div>
        </div>
        <div className="asset-right">
          <Quit {...this.props} />
        </div>
      </div>
    );
  }
}

export default injectIntl(MolochAsset);
