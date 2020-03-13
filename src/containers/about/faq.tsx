/**
 * 常见问题
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

@inject('home')
@observer
class IndexHome extends React.Component<any>{
    //   public intrl = this.props.intl.messages;

    public render() {
        return (
            <div className="file-continar">
                <div className="file-wrapper">
                    <h1 className="file-title">常见问题</h1>
                    <hr className="dev-hr" />
                    <h2>1.什么是FutureDao？</h2>
                    <p>FutureDao是一个去中心化的项目融资管理平台，平台上有多个项目，每个项目都是一个去中心化自治组织DAO。任何平台用户都可以对这些项目进行投资，持有项目股份并成为项目成员。项目成员可以参与项目的治理，决定项目资金的用途。项目如果有盈利或受到投资，所有持股人将共同受益。</p>
                    <h2>2.什么是MolochDao？</h2>
                    <p>MolochDao是FutureDao平台种支持的一种DAO形式。MolochDao的资金管理采用按股分配的方式，项目成员可以根据所退出股份数量得到对应比例的项目资金。Dao成员可以通过发起提案，申请增发股份，也可以通过向项目贡献资金或转账来给项目注资。MolochDao使用提案/投票的方式进行组织管理，持股成员都可以参与管理，一股一票。投票结果采用少数服从多数的方式。</p>
                    <h2>3.怎样才能成为项目成员？</h2>
                    <p>持有Dao股份的钱包地址都是DAO成员。由于DAO股份不能转让，所以必须由现有Dao成员发起提案（或批准预发布提案），为新地址增发股份，等待提案通过后，新地址就能成为项目成员。</p>
                    <h2>4.怎样才能使用FutureDao？</h2>
                    <p>首先需要安装一个metamask钱包，创建一个新钱包。然后还需要在交易所购买一些ETH（用作发交易手续费）和投资DAO需要的代币，并转移到这个钱包中。</p>
                    <h2>5.我有一笔钱，想要投资一个项目，该如何操作？</h2>
                    <p>你需要和DAO组织进行联系，确定他们接受你的投资以及投资细节。之后可以让他们委托你发送一个提案，或者你发布一个预发布提案后由他们进行批准。在提案填写你将获得多少股份，将贡献多少资金（注意提前在钱包中准备好足够的资金），然后由DAO成员投票。提案通过后，你的钱包将会被扣除贡献资金并且获得对应的股份。</p>
                    <h2>6.为什么我进行了发布提案/投票/退出操作后没有效果？</h2>
                    <p>这些操作都需要发送交易，并在区块链上进行确认。交易发送后，你可以在钱包中查看这笔交易的状态，网站上的状态比区块链上的稍微滞后一点。如果这笔交易还没有被确认，请不要重复发送，否则可能会带来资金损失。</p>
                    <div className="date-text">
                        <h1>FutureDAO开发团队</h1>
                        <h1>2020年1月</h1>
                    </div>
                </div>
                <div className="goback-btn">
                <Link to="/" className="goback-a">返回首页</Link>
                </div>
            </div>
        );
    }
}

export default injectIntl(IndexHome);
