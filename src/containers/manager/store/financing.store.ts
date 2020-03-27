import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import * as MolochApi from '@/containers/projectinfo/molochdao/api/moloch.api';
import { Web3Contract } from '@/utils/web3Contract';
import { CodeType } from '@/store/interface/common.interface';
import { IContractAddress, IFinancingOption } from '../interface/financing.interface';
import { IFundList } from '@/containers/projectinfo/molochdao/interface/molochinfo.interface';
import { AbiItem } from 'web3-utils';
import metamaskwallet from '@/store/metamaskwallet';

// import metamaskwallet from '@/store/metamaskwallet';
class FinancingManager
{
  @observable public isStartContract: boolean = false;
  @observable public contractList: IContractAddress[] = [
    {
      id: '1',
      name: '其他',
      projId: ''
    }
  ];
  @observable public molochId: string = '';
  @observable public assetList: IFundList | null = null;
  @observable public assetOption: IFinancingOption[] = [];

  /**
   * 项目融资时查询参与中的项目组织信息
   */
  @action public getContractList = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getReserverAddress(1, 100);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    const list = result[0].data.list;
    const arrList = list.map((item) =>
    {
      return {
        id: item.molochHash,
        name: item.projName + ' (' + item.molochHash + ')',
        projId: item.projId
      }
    })
    this.contractList = [...arrList, ...this.contractList];
    return true;
  }
  /**
   * 获取多资产
   */
  @action public getMolochAsset = async (projId: string) =>
  {
    let result: any = [];
    this.assetList = null;
    try
    {
      result = await MolochApi.getMolochFundTotal(projId, 1, 10);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.assetList = result[0].data || null;
    if (result[0].data.count > 0)
    {
      const list = result[0].data.list;
      const arrList = list.map((item) =>
      {
        return {
          id: item.fundHash,
          name: item.fundSymbol.toLocaleUpperCase() + ' (' + item.fundHash + ')',
          simplename: item.fundSymbol.toLocaleUpperCase()
        }
      })
      this.assetOption = [...arrList];
      console.log(JSON.stringify(this.assetOption))
    }
    return true;
  }
  // 启动融资
  // ratio为存储比例
  @action public startFanincingProject = async (ratio:number,tokenName:string,tokenSimpleName:string,everyRatio:number,mixPrice:number,maxPrice:number) =>
  {
    console.log(111)
    try
    {
      // 0xa86B705E7A2BF21845bCF8e0ee18a4E03532f7CE
      // const dai = require("utils/contractFiles/Dai.json") ;
      // const abi = dai.abi as AbiItem[];
      // const bytecode = dai.bytecode;
      // const daiResult = await Web3Contract.deployContractOthers(
      //   abi, bytecode, metamaskwallet.metamaskAddress,"DAI",8,"dai"
      // );
      const appManager = require("utils/contractFiles/AppManager.json");
      const appManagerAbi = appManager.abi as AbiItem[];
      const appManagerBytecode = appManager.bytecode;
      // console.log(222)
      const co = require("utils/contractFiles/Co.json");
      const coAbi = co.abi as AbiItem[];
      const coBytecode = co.bytecode;
      const sharesB = require("utils/contractFiles/sharesB.json");
      const sharesBAbi = sharesB.abi as AbiItem[];
      const sharesBBytecode = sharesB.bytecode;
      const tradeFundPool = require("utils/contractFiles/TradeFundPool.json");
      const tradeFundPoolAbi = tradeFundPool.abi as AbiItem[];
      const tradeFundPoolBytecode = tradeFundPool.bytecode;
      // usdf 0x38e5ccf55d19e54e8c4fbf55ff81462727ccf4e7
      const assetHash = '0x38e5ccf55d19e54e8c4fbf55ff81462727ccf4e7';
      // const from = '0x2BFb7857eC7238AA84a830342Fa53fE0FEF7FeF5';
      const res = await Web3Contract.deployContractOthers(
        appManagerAbi,
        appManagerBytecode,
        metamaskwallet.metamaskAddress,
        assetHash
      ).then(async (result) =>
      {
        console.log(result)
        const ins1 = await result.promise;  // 合约部署成功后获得新的合约对象
        const appManagerAddress = ins1.options.address;
        console.log(appManagerAddress)
        await Web3Contract.deployContract(
          coAbi, 
          coBytecode, 
          metamaskwallet.metamaskAddress,
          appManagerAddress,
          1000*Math.pow(10,4),
          ratio*10
        ).then(async () =>
        {
          const ins2 = await result.promise;  // 合约部署成功后获得新的合约对象
          const coAddress = ins2.options.address;
          await Web3Contract.deployContract(
            sharesBAbi, 
            sharesBBytecode, 
            metamaskwallet.metamaskAddress,
            appManagerAddress,
            tokenName,
            8,
            tokenSimpleName
          ).then(async () =>
          {
            const ins3 = await result.promise;  // 合约部署成功后获得新的合约对象
            const sharesAddress = ins3.options.address;
            await Web3Contract.deployContract(
              tradeFundPoolAbi, 
              tradeFundPoolBytecode, 
              metamaskwallet.metamaskAddress,
              appManagerAddress,
              sharesAddress,
              coAddress,
              everyRatio,
              maxPrice,
              mixPrice
            )
          })
        })
      });
      // const txid = await res.onTransactionHash();
      // console.log(txid)
      console.log(res)
      // const newContactInstance = await res.promise;  // 合约部署成功后获得新的合约对象
      //   const contractAddress = newContactInstance.options.address;
      //   console.log(contractAddress)
    } catch (e)
    {
      return false;
    }
    return true
  }
}

export default new FinancingManager();
