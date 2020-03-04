import WalletConnect from "@trustwallet/walletconnect";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
// 存储全局变量
import { observable, action } from 'mobx';
import { ITrustWalletStore } from "./interface/trustwallet.interface";
import * as Api from './api/common.api';
import { recoverPersonalSignature } from "@/utils/utilities";
import { convertStringToHex, convertAmountToRawNumber } from "@/utils/bignumber";
import { convertUtf8ToHex, sanitizeHex } from "@walletconnect/utils";
import { ITxData } from "@walletconnect/types";

class TrustWallet implements ITrustWalletStore
{
    @observable public walletConnector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org" // Required
    });
    @observable public networkId: number = 0;
    @observable public chainId: number = 0;
    @observable public trustAddress: string = '';// 链接地址

    // 获取Teemo钱包上登录的地址
    @action public loginTrust = async () =>
    {

        // check if already connected
        if (!this.walletConnector.connected)
        {
            // create new session
            await this.walletConnector.createSession();

            // get uri for QR Code modal
            const uri = this.walletConnector.uri;

            // console log the uri for development
            console.log(uri);

            // display QR Code modal
            WalletConnectQRCodeModal.open(uri, () =>
            {
                console.log("QR Code Modal closed");
            });
        }
        console.log(this.walletConnector)
        // subscribe to events
        await this.subscribeToEvents();
        this.testSendTransaction();
    }

    @action public subscribeToEvents = () =>
    {
        this.walletConnector.on("session_update", async (error, payload) =>
        {
            console.log(`connector.on("session_update")`);

            if (error)
            {
                throw error;
            }

            const { chainId, accounts } = payload.params[0];
            this.onSessionUpdate(accounts, chainId);
        });

        this.walletConnector.on("connect", (error, payload) =>
        {
            console.log(`connector.on("connect")`);

            if (error)
            {
                throw error;
            }
            console.log(payload.params[0])
            this.onConnect(payload);
        });

        this.walletConnector.on("disconnect", (error, payload) =>
        {
            console.log(`connector.on("disconnect")`);

            if (error)
            {
                throw error;
            }
            WalletConnectQRCodeModal.close();
            this.chainId = 0;
            this.trustAddress = '';
        });
    }
    @action public onConnect = async (payload: any) =>
    {
        this.chainId = payload.params[0].chainId;
        this.trustAddress = payload.params[0].accounts[0];
        console.log(this.trustAddress)
        WalletConnectQRCodeModal.close();
        this.networkId = this.walletConnector.networkId;
        console.log(this.networkId);
        // this.walletConnector
        // .getAccounts()
        // .then(result => {
        //     // Returns the accounts
        //     console.log(result);
        // })
        // this.testSendTransaction();
    };

    @action public onSessionUpdate = async (accounts: string[], chainId: number) =>
    {
        this.chainId = chainId;
        this.trustAddress = accounts[0];
        await this.getAccountAssets();
    };
    @action public getAccountAssets = async () =>
    {
        // const { address, chainId } = this.state;
        // this.setState({ fetching: true });
        // try {
        //   // get account balances
        //   const assets = await apiGetAccountAssets(address, chainId);

        //   await this.setState({ fetching: false, address, assets });
        // } catch (error) {
        //   console.error(error);
        //   await this.setState({ fetching: false });
        // }
    };
    // 0xdEDA8e9ba238179D1d0F1E96B8039239555E1e43
    // const tx = {
    //     data: "0x2582bf2a000000000000000000000000deda8e9ba238179d1d0f1e96b8039239555e1e43"
    // from: "0x2bfb7857ec7238aa84a830342fa53fe0fef7fef5"
    // gas: undefined
    // gasPrice: "0x5"
    // to: "0xda42eac604a5f7a77811dc45d5b5692855433319"
    // }

    // 发交易
    @action public testSendTransaction = async () =>
    {
        // const { connector, address, chainId } = this.state;
        console.log("开始了.....")
        // if (!connector) {
        //   return;
        // }
        const address = '0x2bfb7857ec7238aa84a830342fa53fe0fef7fef5';
        const chainId = this.walletConnector.chainId;
        const connector = this.walletConnector;
        // from
        const from = address;

        // to
        const to = "0xda42eac604a5f7a77811dc45d5b5692855433319";

        // nonce
        const _nonce = await Api.apiGetAccountNonce(address, chainId);
        const nonce = sanitizeHex(convertStringToHex(_nonce));
        console.log("nonce:",nonce)
        // gasPrice
        const gasPrices = await Api.apiGetGasPrices();
        const _gasPrice = gasPrices.slow.price;
        const gasPrice = sanitizeHex(convertStringToHex(convertAmountToRawNumber(_gasPrice, 9)));
        console.log("gasPrice:",gasPrice)
        // gasLimit
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));
        console.log("gasLimit:",gasLimit)
        // value
        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));
        console.log("value:",value)
        // data
        const data = "0x2582bf2a000000000000000000000000deda8e9ba238179d1d0f1e96b8039239555e1e43"
        // test transaction
        const tx:ITxData = {
            from,
            to,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        };

        console.log(tx)
        try
        {
            // open modal
            //   this.toggleModal();

            //   // toggle pending request indicator
            //   this.setState({ pendingRequest: true });

            // send transaction
            const result = await connector.sendTransaction(tx);

            // format displayed result
            const formattedResult = {
                method: "eth_sendTransaction",
                txHash: result,
                from: address,
                to: address,
                value: "0 ETH",
            };
            console.log(formattedResult)
            // display result
            //   this.setState({
            //     connector,
            //     pendingRequest: false,
            //     result: formattedResult || null,
            //   });
        } catch (error)
        {
            console.error(error);
            //   this.setState({ connector, pendingRequest: false, result: null });
        }
    };

    // 签名
    @action public testSignPersonalMessage = async () =>
    {
        // const { connector, address } = this.state;

        // if (!connector) {
        //     return;
        // }
        const address = this.trustAddress;
        // test message
        const message = "My email is 123@qq.com - 1537836206101";

        // encode message (hex)
        const hexMsg = convertUtf8ToHex(message);

        // personal_sign params
        const msgParams = [hexMsg, address];

        try
        {
            // open modal
            // this.toggleModal();

            // toggle pending request indicator
            // this.setState({ pendingRequest: true });

            // send message
            const result = await this.walletConnector.signPersonalMessage(msgParams);

            // verify signature
            const signer = recoverPersonalSignature(result, message);
            const verified = signer.toLowerCase() === address.toLowerCase();

            // format displayed result
            const formattedResult = {
                method: "personal_sign",
                address,
                signer,
                verified,
                result,
            };
            console.log(formattedResult)
        } catch (error)
        {
            console.error(error);
        }
    };

    // @action public testSignTypedData = async () => {
    //     const { connector, address } = this.state;

    //     if (!connector) {
    //         return;
    //     }

    //     // typed data
    //     const typedData = {
    //         types: {
    //             EIP712Domain: [
    //                 { name: "name", type: "string" },
    //                 { name: "version", type: "string" },
    //                 { name: "chainId", type: "uint256" },
    //                 { name: "verifyingContract", type: "address" },
    //             ],
    //             Person: [
    //                 { name: "name", type: "string" },
    //                 { name: "account", type: "address" },
    //             ],
    //             Mail: [
    //                 { name: "from", type: "Person" },
    //                 { name: "to", type: "Person" },
    //                 { name: "contents", type: "string" },
    //             ],
    //         },
    //         primaryType: "Mail",
    //         domain: {
    //             name: "Example Dapp",
    //             version: "0.7.0",
    //             chainId: 1,
    //             verifyingContract: "0x0000000000000000000000000000000000000000",
    //         },
    //         message: {
    //             from: {
    //                 name: "Alice",
    //                 account: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //             },
    //             to: {
    //                 name: "Bob",
    //                 account: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    //             },
    //             contents: "Hey, Bob!",
    //         },
    //     };

    //     // eth_signTypedData params
    //     const msgParams = [address, typedData];

    //     try {
    //         // open modal
    //         this.toggleModal();

    //         // toggle pending request indicator
    //         this.setState({ pendingRequest: true });

    //         // sign typed data
    //         const result = await connector.signTypedData(msgParams);

    //         // // verify signature
    //         // const signer = recoverPublicKey(result, typedData);
    //         // const verified = signer.toLowerCase() === address.toLowerCase();

    //         // format displayed result
    //         const formattedResult = {
    //             method: "eth_signTypedData",
    //             address,
    //             // signer,
    //             // verified,
    //             result,
    //         };

    //         // display result
    //         this.setState({
    //             connector,
    //             pendingRequest: false,
    //             result: formattedResult || null,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         this.setState({ connector, pendingRequest: false, result: null });
    //     }
    // };

}

// 外部使用require
export default new TrustWallet();

