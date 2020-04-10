import { observable, action } from 'mobx';
import * as Api from '../api/future.api';
import { CodeType } from '@/store/interface/common.interface';
import { AbiItem } from 'web3-utils';
import { Web3Contract } from '@/utils/web3Contract';
import { toMyNumber } from '@/utils/numberTool';
// import metamaskwallet from '@/store/metamaskwallet';
import { IFContractInfo } from '@/containers/manager/interface/financing.interface';
import { IFutureProposalStore, IFContractList } from '../interface/future.interface';
import metamaskwallet from '@/store/metamaskwallet';

class FutureProposal implements IFutureProposalStore
{
    // @observable public currentProjId: string = ''; // 项目ID
    @observable public assetSymble: string = ''; // 融资资金的简称
    @observable public assetHash: string = ''; // 融资资金的hash
    @observable public assetDecimals: number = 0; // 融资资金的精度
    @observable public fContractInfo: IFContractInfo | null = null; // 融资详情信息
    @observable public fContractList: IFContractList[] = [];

    /**
     * 查询所有合约hash
     */
    @action public getAllContractData = async (projId: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.getProjectContractHash(projId);
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
            this.fContractList = [];
            return false
        }
        this.fContractList = result[0].data.hashArr || []
        return true;
    }
    /**
     * 获取多资产列表
     */
    @action public getFContractInfoData = async (projId: string) =>
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
        } else
        {
            this.fContractInfo = result[0].data;
            this.assetDecimals = result[0].data.fundDecimals;
            this.assetHash = result[0].data.fundHash;
        }
        return true;
    }
    /**
     * 发起提案修改月供
     * @param contractHash 合约的hash
     */
    @action public applyProposalToChangeMonth = async (monthRatio: string, min: string, max: string, explain: string) =>
    {
        let contractHash = '';
        this.fContractList.map((item: IFContractList) =>
        {
            if (item.name === 'Vote_ChangeMonthlyAllocation')
            {
                contractHash = item.hash
            }
        })
        if (!contractHash)
        {
            return false
        }
        try
        {
            const ratio = parseInt(monthRatio, 10) * 10;
            const decimals = Math.pow(10, (this.assetDecimals));  // 单位 
            const minPrice = toMyNumber(min).mul(decimals).value;
            const maxPrice = toMyNumber(max).mul(decimals).value;
            // 调用合约      
            const abi = require("utils/contractFiles/ERC20.json") as AbiItem[];
            const erc20Contract = new Web3Contract(abi, this.assetHash);
            const assetRes = erc20Contract.contractSend("approve", [contractHash, 0], { from: metamaskwallet.metamaskAddress });
            const assetTxid = await assetRes.onTransactionHash();
            console.log('assetTxid:',assetTxid)

            const voteChangeAbi = require('@/utils/contractFiles/Vote_ChangeMonthlyAllocation.json').abi as AbiItem[];
            const voteChangeContract = new Web3Contract(voteChangeAbi, contractHash);
            const submitRes = voteChangeContract.contractSend("applyProposal", [ratio, minPrice, maxPrice, explain], { from: metamaskwallet.metamaskAddress });
            const subtxid = await submitRes.onTransactionHash();
            console.log(subtxid)
            return true
        } catch (e)
        {
            console.log(e);
            return false;
        }
    }
    /**
     * 发起清退提案
     */
    @action public applyProposalToClearing = async (explain: string) =>
    {
        let contractHash = '';
        this.fContractList.map((item: IFContractList) =>
        {
            if (item.name === 'Vote_Clearing')
            {
                contractHash = item.hash
            }
        })
        if (!contractHash)
        {
            return false
        }
        try
        {
            // 调用合约      
            const voteChangeAbi = require('@/utils/contractFiles/Vote_Clearing.json').abi as AbiItem[];
            const voteChangeContract = new Web3Contract(voteChangeAbi, contractHash);
            const submitRes = voteChangeContract.contractSend("applyClearingProposal", [explain], { from: metamaskwallet.metamaskAddress });
            const subtxid = await submitRes.onTransactionHash();
            console.log(subtxid)
            return true
        } catch (e)
        {
            console.log(e);
            return false;
        }
    }
}

export default new FutureProposal();