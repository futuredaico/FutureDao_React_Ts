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
  @observable public tradeTotal:number = 5; // 一共需要发几次合约
  @observable public tradeStep:number = 0; // 正在发送第几个合约
  @observable public startStatus:number = 0; // 融资状态，默认0，未启动融资，1正在启动融资，2启动融资成功状态，3启动融资失败
  @observable public isStartContract: boolean = false; // 是否启动融资了
  @observable public contractList: IContractAddress[] = [   // 可融资代币接收地址列表
    {
      id: '1',
      name: '其他',
      projId: ''
    }
  ];
  @observable public molochId: string = ''; // 选择融资地址的项目Id
  @observable public assetList: IFundList | null = null; // 融资代币的选择
  @observable public assetOption: IFinancingOption[] = []; // 融资代币的选择（下拉框）

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
  // 获取代币简称
  @action public getTokenInfo = async (token: string): Promise<{ symbol: string, decimals: string }> => {
    await metamaskwallet.inintWeb3(); // 初始化 web3
    const abi = require("utils/contractFiles/ERC20.json") as AbiItem[];
    const contract = new Web3Contract(abi, token);
    const symbol = await contract.contractCall("symbol");
    const decimals = await contract.contractCall("decimals");
    return { symbol, decimals }
  }
  // 启动融资
  // ratio为存储比例
  @action public startFanincingProject = async (assetHash:string,ratio: number, tokenName: string, tokenSimpleName: string, everyRatio: number, mixPrice: number, maxPrice: number) =>
  {
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

      const co = require("utils/contractFiles/Co.json");
      const coAbi = co.abi as AbiItem[];
      const coBytecode = co.bytecode;

      const sharesB = require("utils/contractFiles/sharesB.json");
      const sharesBAbi = sharesB.abi as AbiItem[];
      const sharesBBytecode = sharesB.bytecode;

      const tradeFundPool = require("utils/contractFiles/TradeFundPool.json");
      const tradeFundPoolAbi = tradeFundPool.abi as AbiItem[];
      const tradeFundPoolBytecode = tradeFundPool.bytecode;
      console.log("发送第一个合约appManager")
      const appManagerResult = await Web3Contract.deployContractOthers(
        appManagerAbi,
        appManagerBytecode,
        metamaskwallet.metamaskAddress,
        assetHash
      )
      const ins1 = await appManagerResult.promise;  // 合约部署成功后获得新的合约对象
      const appManagerAddress = ins1.options.address;
      this.tradeStep = 1;
      console.log("appManagerAddress",appManagerAddress)
      console.log("发送第二个合约co")
      const coResult = await Web3Contract.deployContractOthers(
        coAbi,
        coBytecode,
        metamaskwallet.metamaskAddress,
        appManagerAddress,
        1000 * Math.pow(10, 4),
        ratio * 10
      )
      const ins2 = await coResult.promise;  // 合约部署成功后获得新的合约对象
      const coAddress = ins2.options.address;
      this.tradeStep = 2;
      console.log("coAddress",coAddress)
      console.log("发送第三个合约share")
      const shareResult = await Web3Contract.deployContractOthers(
        sharesBAbi,
        sharesBBytecode,
        metamaskwallet.metamaskAddress,
        appManagerAddress,
        tokenName,
        8,
        tokenSimpleName
      )
      const ins3 = await shareResult.promise;  // 合约部署成功后获得新的合约对象
      const sharesAddress = ins3.options.address;
      this.tradeStep = 3;
      console.log("sharesAddress",sharesAddress)
      console.log("发送第四个合约tradeFund")
      const tradeResult = await Web3Contract.deployContractOthers(
        tradeFundPoolAbi,
        tradeFundPoolBytecode,
        metamaskwallet.metamaskAddress,
        appManagerAddress,
        sharesAddress,
        coAddress,
        everyRatio * 10,
        maxPrice,
        mixPrice
      )
      const ins4 = await tradeResult.promise;
      const tradeAddress = ins4.options.address;
      this.tradeStep = 4;
      
      console.log("tradeAddress",tradeAddress)
    } catch (e)
    {
      return false;
    }
    return true
  }
  @action public sendDateTime = async () =>
  {
    try
    {
      const dateTime = require("utils/contractFiles/DateTime.json");
      const dateTimeAbi = dateTime.abi as AbiItem[];
      const dateTimeBytecode = dateTime.bytecode;
      console.log("发送一个合约datetime")
      const appManagerResult = await Web3Contract.deployContractOthers(
        dateTimeAbi,
        dateTimeBytecode,
        metamaskwallet.metamaskAddress
      )
      const ins1 = await appManagerResult.promise;  // 合约部署成功后获得新的合约对象
      const datetimeAddress = ins1.options.address;
      
      // datetimeAddress 0xdD47A2A48774bdf1a1809163b0bf291326338619
      console.log("datetimeAddress",datetimeAddress)
    } catch (e)
    {
      return false;
    }
    return true
  }
  
}

export default new FinancingManager();
