import WalletConnect from "@trustwallet/walletconnect";

export interface ITrustWalletStore
{
    walletConnector: WalletConnect,
    // isLoadTeemo: boolean,
    // isLoginFlag: number,
    loginTrust: () => void,
}
export interface ITrustWalletProps
{
    teemo: ITrustWalletStore
}