import WalletConnect from "@trustwallet/walletconnect";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
// 存储全局变量
import { observable, action } from 'mobx';
import { ITrustWalletStore } from "./interface/trustwallet.interface";
import * as Api from './api/common.api';
import { sanitizeHex, recoverPersonalSignature } from "@/utils/utilities";
import { convertStringToHex, convertAmountToRawNumber } from "@/utils/bignumber";
import { convertUtf8ToHex } from "@walletconnect/utils";

class TrustWallet implements ITrustWalletStore {
    @observable public walletConnector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org" // Required
    });
    @observable public chainId: number = 0;
    @observable public trustAddress: string = '';// 链接地址

    // 获取Teemo钱包上登录的地址
    @action public loginTrust = async () => {

        // check if already connected
        if (!this.walletConnector.connected) {
            // create new session
            await this.walletConnector.createSession();

            // get uri for QR Code modal
            const uri = this.walletConnector.uri;

            // console log the uri for development
            console.log(uri);

            // display QR Code modal
            WalletConnectQRCodeModal.open(uri, () => {
                console.log("QR Code Modal closed");
            });
        }
        // subscribe to events
        await this.subscribeToEvents();
    }

    @action public subscribeToEvents = () => {
        this.walletConnector.on("session_update", async (error, payload) => {
            console.log(`connector.on("session_update")`);

            if (error) {
                throw error;
            }

            const { chainId, accounts } = payload.params[0];
            this.onSessionUpdate(accounts, chainId);
        });

        this.walletConnector.on("connect", (error, payload) => {
            console.log(`connector.on("connect")`);

            if (error) {
                throw error;
            }
            console.log(payload.params[0])
            this.onConnect(payload);
        });

        this.walletConnector.on("disconnect", (error, payload) => {
            console.log(`connector.on("disconnect")`);

            if (error) {
                throw error;
            }
            WalletConnectQRCodeModal.close();
            this.chainId = 0;
            this.trustAddress = '';
        });
    }
    @action public onConnect = async (payload: any) => {
        this.chainId = payload.params[0].chainId;
        this.trustAddress = payload.params[0].accounts[0];
        WalletConnectQRCodeModal.close();
        // this.walletConnector
        // .getAccounts()
        // .then(result => {
        //     // Returns the accounts
        //     console.log(result);
        // })
        this.testSignPersonalMessage();
    };

    @action public onSessionUpdate = async (accounts: string[], chainId: number) => {
        this.chainId = chainId;
        this.trustAddress = accounts[0];
        await this.getAccountAssets();
    };
    @action public getAccountAssets = async () => {
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
    @action public testSendTransaction = async () => {
        

        // from
        const from = this.trustAddress;

        // to
        const to = this.trustAddress;

        // nonce
        const _nonce = await Api.apiGetAccountNonce(this.trustAddress, this.chainId);
        const nonce = sanitizeHex(convertStringToHex(_nonce));

        // gasPrice
        const gasPrices = await Api.apiGetGasPrices();
        const _gasPrice = gasPrices.slow.price;
        const gasPrice = sanitizeHex(convertStringToHex(convertAmountToRawNumber(_gasPrice, 9)));

        // gasLimit
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        // value
        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        // data
        const data = "0x";

        // test transaction
        const tx = {
            from,
            to,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        };

        try {
            // open modal
            // this.toggleModal();

            // toggle pending request indicator
            // this.setState({ pendingRequest: true });

            // send transaction
            const result = await this.walletConnector.sendTransaction(tx);

            // format displayed result
            const formattedResult = {
                method: "eth_sendTransaction",
                txHash: result,
                from: from,
                to: to,
                value: "0 ETH",
            };
            console.log(formattedResult)
            // display result
            // this.setState({
            //     connector,
            //     pendingRequest: false,
            //     result: formattedResult || null,
            // });
        } catch (error) {
            console.error(error);
            // this.setState({ connector, pendingRequest: false, result: null });
        }
    };

    @action public testSignPersonalMessage = async () => {
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

        try {
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
            // display result
            // this.setState({
            //     connector,
            //     pendingRequest: false,
            //     result: formattedResult || null,
            // });
        } catch (error) {
            console.error(error);
            // this.setState({ connector, pendingRequest: false, result: null });
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

