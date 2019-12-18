import { AbiItem } from "web3-utils";
import Moloch from "./Moloch";
import MetaMask from "@/store/metamaskwallet";
import common from "@/store/common";
class MetamaskTool
{


    /**
     * 调用合约执行操作
     * @param abi 
     * @param addr 
     * @param methods 
     * @param args 
     * @param sendArgs 
     */
    public async contractSend( hash: string, methods: string, args?: any[], sendArgs?: any)
    {
        const abi = Moloch.abi;
        console.log(abi)
        const contract = new MetaMask.web3.eth.Contract(abi as AbiItem[], hash);
        return new Promise<string>((r, j) =>
        {

            if (Array.isArray(args))
            {
                contract.methods[methods](...args).send(sendArgs)
                    .on('transactionHash', (txid) =>
                    {
                        console.log(txid);
                        r(txid);
                    })
                    .on('error', err => { 
                        console.log(err) 
                        if(err['code']===4001){
                            
                            common.openNotificationWithIcon('error', "操作失败", "您拒绝了本次操作");
                            j(err);
                        }
                    }); // If a out of gas error, the second parameter is the receipt.
            }
            else
            {
                contract.methods[methods]().send(sendArgs)
                    .on('transactionHash', (txid) =>
                    {
                        console.log(txid);
                        r(txid);
                    })
                    .on('error', err => {
                        if(err['code']===4001){
                            common.openNotificationWithIcon('error', "操作失败", "您拒绝了本次操作");
                        }
                        j(err)
                    }); // If a out of gas error, the second parameter is the receipt.
            }
        })
    }

    
}
export default new MetamaskTool();