/**
 * 资产模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps } from '../../interface/molochinfo.interface';
import Quit from './quit';
import { saveDecimal } from '@/utils/numberTool';
// import ManagerRight from './rigthsize';
// import { toMyNumber } from '@/utils/numberTool';

@observer
class MolochAsset extends React.Component<IMolochInfoProps> {
  public intrl = this.props.intl.messages;
  
  public render() {
    if(!this.props.molochinfo.projInfo){
      return null
    }
    return (
      <div className="asset-wrapper">
        <div className="asset-left">
          <div className="asset-title-line">
            <strong className="title-left">股份</strong>
            <strong className="title-right">每股价值</strong>
          </div><div className="asset-normal-line">
            <span className="normal-left">{this.props.molochinfo.projInfo.shares}</span>
            <span className="normal-right">≈ {parseFloat(saveDecimal(this.props.molochinfo.projInfo.valuePerShare, 2))}</span>
          </div>
          <div className="asset-title-line">
            <strong className="title-left">代币余额</strong>
          </div>
          <div className="asset-normal-line">
            <span className="normal-left">{this.props.molochinfo.projInfo.fundSymbol.toLocaleUpperCase()}</span>
            <span className="normal-right">{parseFloat(saveDecimal(this.props.molochinfo.projInfo.fundTotal, 6))}</span>
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
