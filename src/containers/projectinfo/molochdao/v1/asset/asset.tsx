/**
 * 资产模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps, IFundInfo } from '../../interface/molochinfo.interface';
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
            <strong className="title-left">{this.intrl.asset.shares}</strong>
            <strong className="title-right">{this.intrl.asset.eachprice}</strong>
          </div><div className="asset-normal-line">
            <span className="normal-left">{this.props.molochinfo.projInfo.shares}</span>
            <span className="normal-right">≈ {parseFloat(saveDecimal(this.props.molochinfo.projInfo.valuePerShare, 2))}</span>
          </div>
          <div className="asset-title-line">
            <strong className="title-left">{this.intrl.asset.balance}</strong>
          </div>
          {/* <div className="asset-normal-line">
            <span className="normal-left">{this.props.molochinfo.projInfo.fundSymbol.toLocaleUpperCase()}</span>
            <span className="normal-right">{parseFloat(saveDecimal(this.props.molochinfo.projInfo.fundTotal, 6))}</span>
          </div> */}
          {
            this.props.molochinfo.fundTotalList && (
              <>
                {
                  this.props.molochinfo.fundTotalList.count > 0 && this.props.molochinfo.fundTotalList.list.map((item: IFundInfo, index: number) => {
                    return (
                      <div className="asset-normal-line" key={index}>
                        <span className="normal-left">{item.fundSymbol.toLocaleUpperCase()}</span>
                        <span className="normal-right">{item.fundTotal ? saveDecimal(item.fundTotal, 2) : '0'}</span>
                      </div>
                    )
                  })
                }
              </>
            )
          }
        </div>
        <div className="asset-right">
          <Quit {...this.props} />
        </div>
      </div>
    );
  }
}

export default injectIntl(MolochAsset);
