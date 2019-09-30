export interface IMetaMastWalletStore
{
    metamaskAddress: string,
    isLoadMetaMask: boolean,
    isLoginMetaMaskFlag: number,
    inintWeb3: () => Promise<boolean>,
    initAccount: () => Promise<string>
}
export interface IMetaMastWalletProps
{
    metamask: IMetaMastWalletStore
}