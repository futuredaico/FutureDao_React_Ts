export interface IMetaMastWalletStore
{
    metamaskAddress: string,
    isLoadMetaMask: boolean,
    isLoginMetaMaskFlag: number,
    inintWeb3: () => Promise<boolean>,
    initAccount: () => Promise<boolean>,
}
export interface IMetaMastWalletProps
{
    metamask: IMetaMastWalletStore
}