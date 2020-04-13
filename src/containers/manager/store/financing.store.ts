import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import * as MolochApi from '@/containers/projectinfo/molochdao/api/moloch.api';
import { Web3Contract } from '@/utils/web3Contract';
import { CodeType } from '@/store/interface/common.interface';
import { IContractAddress, IFinancingOption, IFContractInfo } from '../interface/financing.interface';
import { IFundList } from '@/containers/projectinfo/molochdao/interface/molochinfo.interface';
import { AbiItem } from 'web3-utils';
import metamaskwallet from '@/store/metamaskwallet';
import { toMyNumber } from '@/utils/numberTool';

// import metamaskwallet from '@/store/metamaskwallet';
class FinancingManager
{
  @observable public currentProjId: string = '';// 当前项目ID
  @observable public tradeTotal: number = 13; // 一共需要发几次交易
  @observable public tradeStep: number = 0; // 正在发送第几个合约
  @observable public startStatus: number = 0; // 融资状态，默认0，未启动融资，1正在启动融资，2启动融资成功状态，3启动融资失败
  @observable public isStartContract: boolean = true; // 是否启动融资了
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
  @observable public fContractInfo: IFContractInfo | null = null;
  @observable public deposit:number = 0; // 押金
  @observable public proposalFee:number = 0; // 手续费
  /**
   * 项目融资时查询参与中的项目组织信息
   */
  @action public getContractList = async () =>
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
  /**
   * 融资后存储融资合约信息
   */
  @action public setDataToSave = async (projId: string, receiveAddress: string, assetHash: string, assetSimple: string,decimals:number, tokenName: string, tokenSimple: string, ratio: string, arrList: string, startAddr: string, contractList: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.saveFContractInfo(projId, receiveAddress, assetHash, assetSimple,decimals, tokenName, tokenSimple, ratio, arrList, startAddr, contractList);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    console.log("存数据了")
    return true;
  }
  /**
   * 查询融资合约信息
   */
  @action public getFContractData = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getFContractInfo(projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    if (Object.keys(result[0].data).length === 0)
    {
      this.fContractInfo = null;
      this.isStartContract = false;
    } else
    {
      this.fContractInfo = result[0].data;
      this.isStartContract = true;
    }
    return true;
  }
  // 获取代币简称
  @action public getTokenInfo = async (token: string): Promise<{ symbol: string, decimals: string }> =>
  {
    await metamaskwallet.inintWeb3(); // 初始化 web3
    const abi = require("utils/contractFiles/ERC20.json") as AbiItem[];
    const contract = new Web3Contract(abi, token);
    const symbol = await contract.contractCall("symbol");
    const decimals = await contract.contractCall("decimals");
    return { symbol, decimals }
  }
  // 启动融资
  // ratio为存储比例
  @action public startFanincingProject = async (receiveAddress: string, assetHash: string, assetSimple: string, reserveRatio: string, tokenName: string, tokenSimpleName: string, everyMonthRatio: string, mixPrice1: string, maxPrice1: string, priceDecimals: number) =>
  {
    const ratio = parseInt(reserveRatio, 10);
    const everyRatio = parseInt(everyMonthRatio, 10);
    const decimals = Math.pow(10, (priceDecimals));  // 单位 
    const mixPrice = toMyNumber(mixPrice1).mul(decimals).value;
    const maxPrice = toMyNumber(maxPrice1).mul(decimals).value;
    const slope = toMyNumber(priceDecimals).div(2).value;
    try
    {
      // 0xa86B705E7A2BF21845bCF8e0ee18a4E03532f7CE
      // const dai = require("utils/contractFiles/Dai.json") ;
      // const abi = dai.abi as AbiItem[];
      // const bytecode = dai.bytecode;
      // const daiResult = await Web3Contract.deployContractOthers(
      //   abi, bytecode, metamaskwallet.metamaskAddress,"DAI",8,"dai"
      // );
//       const appManagerAddress = "0x5fD8b883F5ce824E35FF263E277182ab097546C4";
// const appManagerTxid = "0xf6c19d6ea9cdc9cf6e9f48a49b5f0732a8fcb01cdbd300ca601a42c431203365";
// const coAddress = "0xFAA95A622F463C638eb74fB46dA6a417ac06e9fD";
// const coTxid = "0xfe3b56f1c08f013077b518f62c8b7bea5fc6d7db44ad5f5b8ff508f3bea5c5d2";
// const sharesAddress ="0x8bD16ab2E9Fc3e9902ECF0Df543bb6463277304f";
// const sharesBTxid= "0xbbcec6e6aff2d991a252ae0ee3372f9935458e7cad637825f79c09b477d10e84";
// const tradeAddress="0xaa4437c46e18a2b5ef3cdE4AB93E08797570d676";
// const tradeTxid ="0xe475e55455f0b0b1c6dce40da7b7d568b4fc715764633ddcbf42b8f522a50bd8";
// const voteMonthAddress="0x1F1223bA52f9Ab17F80550479c6F3A77E147D44c";
// const voteMonthTxid ="0xf08939ce5c787b3ec3601de24d4db1129a264021b7090d17857a3777a732338d";
      console.log("metamaskwallet.metamaskAddress:",metamaskwallet.metamaskAddress)
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

      const voteChangeMonth = require("utils/contractFiles/Vote_ChangeMonthlyAllocation.json");
      const voteChangeMonthAbi = voteChangeMonth.abi as AbiItem[];
      const voteChangeMonthBytecode = voteChangeMonth.bytecode;
      // 30%
      const voteClear = require("utils/contractFiles/Vote_Clearing.json");
      const voteClearAbi = voteClear.abi as AbiItem[];
      const voteClearBytecode = voteClear.bytecode;
      this.tradeStep = 1;
      console.log("发送第一个合约appManager")
      const appManagerResult = await Web3Contract.deployContractOthers(
        appManagerAbi,
        appManagerBytecode,
        metamaskwallet.metamaskAddress,
        assetHash
      )
      const appManagerTxid = await appManagerResult.onTransactionHash();
      const ins1 = await appManagerResult.promise;  // 合约部署成功后获得新的合约对象
      const appManagerAddress = ins1.options.address;   
      console.log("appManagerTxid", appManagerTxid)  
      console.log("appManagerAddress", appManagerAddress)
      console.log("发送第二个合约co")
      this.tradeStep = 2;
      const coResult = await Web3Contract.deployContractOthers(
        coAbi,
        coBytecode,
        metamaskwallet.metamaskAddress,
        appManagerAddress,
        1000 * Math.pow(10, slope),
        ratio * 10
      )
      const coTxid = await coResult.onTransactionHash();
      const ins2 = await coResult.promise;  // 合约部署成功后获得新的合约对象
      const coAddress = ins2.options.address;
      this.tradeStep = 3;
      console.log("coTxid", coTxid)  
      console.log("coAddress", coAddress)
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
      const sharesBTxid = await shareResult.onTransactionHash();
      const ins3 = await shareResult.promise;  // 合约部署成功后获得新的合约对象
      const sharesAddress = ins3.options.address;
      this.tradeStep = 4;
      console.log("sharesBTxid", sharesBTxid)  
      console.log("sharesAddress", sharesAddress)
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
      const tradeTxid = await tradeResult.onTransactionHash();
      const ins4 = await tradeResult.promise;
      const tradeAddress = ins4.options.address;
      this.tradeStep = 5;
      console.log("tradeTxid", tradeTxid)  
      console.log("tradeAddress", tradeAddress)
      console.log("发送第五个合约voteChangeMonth");
      const voteMonthResult = await Web3Contract.deployContractOthers(
        voteChangeMonthAbi,
        voteChangeMonthBytecode,
        metamaskwallet.metamaskAddress,
        appManagerAddress,
        sharesAddress,
        tradeAddress,
        5*24*3600,
        9*24*3600,
        this.deposit,
        this.proposalFee
      )
      const voteMonthTxid = await voteMonthResult.onTransactionHash();
      const ins5 = await voteMonthResult.promise;
      const voteMonthAddress = ins5.options.address;
      this.tradeStep = 6;
      console.log("voteMonthTxid", voteMonthTxid)  
      console.log("voteMonthAddress", voteMonthAddress)
      
      console.log("发送第六个合约Vote_Clearing");
      const voteClearResult = await Web3Contract.deployContractOthers(
        voteClearAbi,
        voteClearBytecode,
        metamaskwallet.metamaskAddress,
        appManagerAddress,
        sharesAddress,
        tradeAddress,
        300,
        5*24*3600,
        0,
        this.deposit,
        this.proposalFee
      )
      const voteClearTxid = await voteClearResult.onTransactionHash();
      const ins6 = await voteClearResult.promise;
      const voteClearAddress = ins6.options.address;    
      console.log("voteClearTxid", voteClearTxid)    
      console.log("voteClearAddress", voteClearAddress)

      // 以下配置数据
      const tradeContract = new Web3Contract(tradeFundPoolAbi, tradeAddress);
      const bytes32_EMPTY_PARAM_HASH = await tradeContract.contractCall("EMPTY_PARAM_HASH");
      const bytes32_FundPool_Start = await tradeContract.contractCall("FundPool_Start");
      const bytes32_FundPool_ChangeRatio = await tradeContract.contractCall("FundPool_ChangeRatio");
      const bytes32_FundPool_Clearing = await tradeContract.contractCall("FundPool_Clearing");

      const sharesContract = new Web3Contract(sharesBAbi, sharesAddress);
      const byte32_SharesB_Burn = await sharesContract.contractCall("SharesB_Burn");
      const byte32_SharesB_Mint = await sharesContract.contractCall("SharesB_Mint");
      console.log("bytes32_EMPTY_PARAM_HASH", bytes32_EMPTY_PARAM_HASH)
      console.log("bytes32_FundPool_Start", bytes32_FundPool_Start)
      console.log("bytes32_FundPool_ChangeRatio", bytes32_FundPool_ChangeRatio)
      console.log("byte32_SharesB_Burn", byte32_SharesB_Burn)
      console.log("byte32_SharesB_Mint", byte32_SharesB_Mint);
      const appManagerContract = new Web3Contract(appManagerAbi, appManagerAddress);
      const dateTime = '0xdD47A2A48774bdf1a1809163b0bf291326338619';

      this.tradeStep = 7;
      const submitRes1 = appManagerContract.contractSend("initialize", [tradeAddress, receiveAddress, dateTime], { from: metamaskwallet.metamaskAddress });
      const subtxid1 = await submitRes1.onConfrim();
      console.log(" 第一笔交易")
      console.log(subtxid1);
      this.tradeStep = 8;
      const submitRes2 = appManagerContract.contractSend("addPermission", [metamaskwallet.metamaskAddress, tradeAddress, bytes32_FundPool_Start], { from: metamaskwallet.metamaskAddress });
      const subtxid2 = await submitRes2.onConfrim();
      console.log(" 第2笔交易")
      console.log(subtxid2);
      this.tradeStep = 9;
      const submitRes3 = appManagerContract.contractSend("addPermission", [tradeAddress, sharesAddress, byte32_SharesB_Burn], { from: metamaskwallet.metamaskAddress });
      const subtxid3 = await submitRes3.onConfrim();
      console.log(" 第3笔交易")
      console.log(subtxid3);
      this.tradeStep = 10;
      const submitRes4 = appManagerContract.contractSend("addPermission", [tradeAddress, sharesAddress, byte32_SharesB_Mint], { from: metamaskwallet.metamaskAddress });
      const subtxid4 = await submitRes4.onConfrim();
      console.log(" 第4笔交易")
      console.log(subtxid4);
      this.tradeStep = 11;
      const submitRes5 = appManagerContract.contractSend("addPermission", [voteMonthAddress, tradeAddress, bytes32_FundPool_ChangeRatio], { from: metamaskwallet.metamaskAddress });
      const subtxid5 = await submitRes5.onConfrim();
      console.log(" 第5笔交易")
      console.log(subtxid5);
      this.tradeStep = 12;
      const submitRes6 = appManagerContract.contractSend("addPermission", [voteClearAddress, tradeAddress, bytes32_FundPool_Clearing], { from: metamaskwallet.metamaskAddress });
      const subtxid6 = await submitRes6.onConfrim();
      console.log(" 第6笔交易")
      console.log(subtxid6);
      this.tradeStep = 13;
      const submitRes7 = tradeContract.contractSend("start",[], { from: metamaskwallet.metamaskAddress });      
      const subtxid7 = await submitRes7.onConfrim();
      console.log(" 第7笔交易")
      console.log(subtxid7)
      
      
      const arrList = [{
        percent: everyMonthRatio,
        max: maxPrice1,
        min: mixPrice1
      }]
      const fcontractList = [
        {
          hash: appManagerAddress,
          name: "AppManager",
          txid: appManagerTxid
        },
        {
          hash: coAddress,
          name: "Co",
          txid: coTxid
        },
        {
          hash: sharesAddress,
          name: "sharesB",
          txid: sharesBTxid
        },
        {
          hash: tradeAddress,
          name: "TradeFundPool",
          txid: tradeTxid
        },
        {
          hash: voteMonthAddress,
          name: "Vote_ChangeMonthlyAllocation",
          txid: voteMonthTxid
        },
        {
          hash:voteClearAddress,
          name:"Vote_Clearing",
          txid:voteClearTxid
        }
      ]
      await this.setDataToSave(this.currentProjId, receiveAddress, assetHash, assetSimple,priceDecimals, tokenName, tokenSimpleName, reserveRatio, JSON.stringify(arrList), metamaskwallet.metamaskAddress, JSON.stringify(fcontractList))

    } catch (e)
    {
      console.log(e)
      return false;
    }
    return true
  }

  // 只是发一下
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
      console.log("datetimeAddress", datetimeAddress)
    } catch (e)
    {
      return false;
    }
    return true
  }

}

export default new FinancingManager();
