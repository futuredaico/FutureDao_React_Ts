/**
 * 项目发起流程
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';

@inject('home')
@observer
class IndexHome extends React.Component<any>{
    //   public intrl = this.props.intl.messages;

    public render() {
        return (
            <div className="file-continar">
                <div className="file-wrapper">
                    <h1 className="file-title">项目发起流程</h1>
                    <hr className="dev-hr"/>
                    <h2>一、创建MolochDao项目。</h2>
                    <p>1.下载安装metamask钱包，在钱包中预留至少0.05ETH。</p>
                    <p>2.使用metamask登陆FutureDao网站，创新项目。</p>
                    <p>3.选择创建新的MolochDao。</p>
                    <p>4.填写DAO信息。其中DAO名称、简介、详情、封面、官网都将保存在FutureDao服务器中，不会记录在区块链上；其他信息都会记录在区块链上：</p>
                    <p className="otherline">a)DAO版本：分为V1,V2两个版本，V2相比于V1支持多种代币融资、允许踢出成员，允许所有人发起提案。</p>
                    <p className="otherline">b)DAO支持代币：指的是DAO合约允许接收的代币种类，仅支持ERC20代币。如果MolochDao版本选择V2，则可以添加多种支持的代币。</p>
                    <p className="otherline">c)投票期限：提案被发布或批准为正式提案后，允许DAO成员进行投票的期限。</p>
                    <p className="otherline">d)投票结果公示期：投票结束后对投票结果进行公示的期限。</p>
                    <p className="otherline">e)取消投票窗口期：提案被发布后允许提案人撤销该提案的期限。（V1版本功能）</p>
                    <p className="otherline">f)提案处理期限：提案通过公示期后，需要在期限内被处理，过期无法再处理，视同于提案失败。（V2版本功能）</p>
                    <p className="otherline">g)踢出成员执行宽限期：成员被提案投票踢出并且通过公示期后，被踢成员需要在宽限期内退出股份，否则股份将被转给项目创始人。</p>
                    <p className="otherline">h)发起提案押金：发起提案需要抵押部分代币作为提案押金。押金将在提案结束并被处理后，返还扣除处理奖励之外的部分。押金使用的代币种类为DAO支持代币，如果DAO支持多种代币，则使用填写的第一种代币。</p>
                    <p className="otherline">i)处理提案奖励：任何处理提案的人都可以获得一笔处理奖励，奖励来自于提案押金。</p>
                    <p>5.点击立即创建后，metamask会弹出交易确认页面，确认后会发出一笔交易，同时网页会提示：正在发布DAO合约。发布期间不要关闭网页，或者操作钱包。等待交易被确认后，网页会提示发布成功，则MolochDao创建成功。</p>
                    <h2>二、MolochDao治理规则</h2>
                    <p>1.拥有DAO股份的地址为DAO成员。DAO成员登陆metamask钱包后，进入DAO项目的治理页面，点击发布提案，可以发布提案。</p>
                    <p>2.非DAO成员想要发布提案，可以由DAO成员进行权限委托，委托成功后可以发布提案。委托发布的提案，提案发布人将显示为委托权限的DAO成员，而非提案发布人。</p>
                    <p>3.权限委托仅限于DAO成员委托给非DAO成员，不能委托给另一名DAO成员。权限委托可以随时取消。权限委托后，委托的DAO成员将无法发提案、投票。</p>
                    <p>4.V1版本的DAO，只能发布申请股份的提案。申请时可以同时贡献资金给DAO组织。V2版本的DAO，还能发布增加支持代币、踢出成员的提案。</p>
                    <p>5.V1版本的提案只允许DAO成员发布，每4.8小时可以发布一个，发布提案需要缴纳押金；V2版本的预发布提案任何人都可以发布，只允许DAO成员批准为正式提案，每4.8小时可以批准一个，批准提案需要缴纳押金。</p>
                    <p>6.未委托权限的DAO成员和被委托人都可以对提案进行投票。投票采用简单多数的规则，当投票期结束后，投同意或反对哪个总票数多，最终投票结果就为哪个。</p>
                    <p>7.投票通过的提案，会进入公示期，公示期结束后可以进行处理。V2版本需要在处理期内处理，否则提案状态将会变更为未通过。投票未通过的提案，会进入未通过状态。</p>
                    <p>8.无论提案是否通过，都需要被处理，处理时将会执行股份变更等事项，同时处理提案者将会获得一笔奖励。提案可以被任何人处理，旧的提案被处理后才能处理新的提案。</p>
                    <div className="date-text">
                        <h1>FutureDAO开发团队</h1>
                        <h1>2020年1月</h1>
                    </div>
                </div>
                <div className="goback-btn">
                    <a href="/" className="goback-a">返回首页</a>
                </div>
            </div>
        );
    }
}

export default injectIntl(IndexHome);
