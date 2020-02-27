import WalletConnect from "@trustwallet/walletconnect";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
// 存储全局变量
import { observable, action } from 'mobx';
import { ITrustWalletStore } from "./interface/trustwallet.interface";

class TrustWallet implements ITrustWalletStore
{
    @observable public walletConnector = new WalletConnect({
        bridge: "https://futuredaotest.nel.group/test/" // Required
      });
    // @observable public isLoadTeemo: boolean = false; // 检测是否有Teemo钱包
    // @observable public isLoginFlag: number = 0;// 默认不显示,1表示未检查到teemo钱包,2为未登录钱包

    // 获取Teemo钱包上登录的地址
    @action public loginTrust = async () =>
    {
        if (!this.walletConnector.connected) {
            // create new session
            this.walletConnector.createSession().then(() => {
              // get uri for QR Code modal
              const uri = this.walletConnector.uri;
              console.log(uri)
              // display QR Code modal
              WalletConnectQRCodeModal.open(uri, () => {
                console.log("QR Code Modal closed");
              });
            });
          }
          
          // Subscribe to connection events
          this.walletConnector.on("connect", (error, payload) => {
            if (error) {
              throw error;
            }
          
            // Close QR Code Modal
            WalletConnectQRCodeModal.close();
          
            // Get provided accounts and chainId
            console.log(payload.params[0])
          //   const { accounts, chainId } = payload.params[0];
          });
          
          this.walletConnector.on("session_update", (error, payload) => {
            if (error) {
              throw error;
            }
          
            // Get updated accounts and chainId
          //   const { accounts, chainId } = payload.params[0];
          console.log(payload.params[0])
          });
          
          this.walletConnector.on("disconnect", (error, payload) => {
            if (error) {
              throw error;
            }
          
            // Delete walletConnector
          });
          // this.walletConnector
          //   .getAccounts()
          //   .then(result => {
          //     // Returns the accounts
          //     console.log(result);
          //   })
          //   .catch(error => {
          //     // Error returned when rejected
          //     console.error(error);
          //   });
    }
   

}

// 外部使用require
export default new TrustWallet();

