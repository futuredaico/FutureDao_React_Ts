export interface IProjectInfoDocument {
  projId: string;
  type: string;
  platform: string;
  fundName: string;
  adminAddress: string;
  tokenName: string;
  tokenSymbol: string;
  reserveTokenFlag: string;
  reserveTokenSetFlag: string;
  reserveTokenInfo: IReserveTokenInfo[];
  deployContractFlag: string;
  rewardSetFlag: string;
  connectorName: string;
  connectTel: string;
  ratioSetFlag: string;
  reserveFundRatio: number;
  financeStartFlag: string;
  time: number;
  lastUpdateTime: number;
  contractAddresses: IContractAddressMgr;
}

export interface IReserveTokenInfo {
  address: string;
  info: [{ amt: number; days: number }];
}

export class IContractAddressMgr {
  public AppManagerAddress: string;
  public CoAddress: string;
  public FdTokenAddress: string;
  public GovernAddress: string;
  public TradeAddress: string;
  public DateTimeAddress: string = "0x628D1Cd08f0c7aaeF0Da0E16472546553beDa0B9";
}