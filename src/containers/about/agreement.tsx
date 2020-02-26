/**
 * 用户协议
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
                    <h1 className="file-title">用户服务协议与免责声明</h1>
                    <hr className="dev-hr" />
                    <h2>概述</h2>
                    <p>本协议适用于FutureDao发布、链接或引用的网站，应用程序，以及由FutureDao运营人员提供的运营服务（在下文中统称为“ 服务”）。</p>
                    <p>如果您使用本服务，表示您接受我们的协议中所描述的内容。本协议包含限制我们对您的责任的条款，并要求您以个人身份解决与我们的任何争议，而不是作为任何集体或代表诉讼的一部分。如果您不同意本协议的任何部分，请不要使用任何服务。</p>
                    <p>请注意，本协议仅适用于您在使用FutureDao所提供的服务时的情况。对于超出FutureDao所提供的服务的情况，FutureDao概不负责。</p>
                    <h2>免责声明</h2>
                    <p>服务中所包含的信息不构成法律，金融或投资建议，也不作为购买，交易或出售加密资产的建议。建议在开始购买，交易或出售加密资产之前寻求法律和金融专家的建议。对于任何依赖本服务所包含信息进行的加密资产交易所产生的后果，FutureDao概不负责。</p>
                    <p>加密资产是不稳定的。您应该充分了解交易前涉及的风险程度。对于任何加密资产的操作，所产生的利润或造成的损失，都属于您个人的责任，与FutureDao无关。</p>
                    <p>FutureDao应尽可能努力使服务每周7天，每天24小时不间断访问。但是，由于技术维护，迁移或更新，或由于网络故障或区块链故障，部分服务可能会暂时中止。对于因FutureDao技术支持问题导致的服务中止，我们会尽快维护，在此期间您仍可以使用其他钱包进行交易；对于因第三方造成的任何故障，如网络故障、用户设备故障、区块故障等导致的无法访问服务，FutureDao概不负责。</p>
                    <p>请注意，FutureDao作为一款去中心化融资平台，仅保证平台里的Dao项目融资合约的真实性，不会也无法对Dao项目融资后所进行的业务进行审核。因此您在参与Dao融资时，应该充分了解Dao项目的业务、信誉以及可能涉及到的风险。任何因为您参与Dao项目融资导致的损失，FutureDao概不负责。</p>
                    <p>请注意，由于FutureDao无法控制您正在参与的加密资产项目的具体业务。FutureDao不作任何陈述或保证，以对这些加密资产的质量，可用性或适用性承担任何责任或对其持续支持。</p>
                    <p>请注意，FutureDao仅作为辅助发布、展示、参与项目的工具，并未保存您的资产数据。你的资产数据全部在区块链上进行保存，而您的区块链钱包是您唯一的身份凭证。您对使用、存储和备份加密资产相关的信息和数据的方式全权负责。</p>
                    <p>您自行负责维护您的区块链钱包机密性，保护您的个人账户只能您私人进行访问，限制其他人访问您的计算机设备。您必须采取所有必要步骤，以确保您的钱包账户保持机密和安全。</p>
                    <p>您应确保您使用FutureDao符合您所在国家/地区的法律和法规。</p>
                    <h2>知识产权</h2>
                    <p>NEL社区是与FutureDao服务相关的所有知识产权的唯一所有者。FutureDao钱包是开源的，遵从MIT开源协议。但FutureDao的品牌属于NEL社区。FutureDao目前显示或提供的任何内容，如文本，logo，图像，音乐，数字下载和数据汇编，均为NEL社区的财产，受中国和国际知识产权保护法保护。未经授权任何人不得使用FutureDao的名义发布产品，或以任何可能导致公众混淆的方式发布与FutureDao相似的产品。</p>
                    <p>因此，您同意不以任何方式复制，表示，提取和使用FutureDao的任何或所有logo、网站或产品。</p>
                    <h2>协议变更</h2>
                    <p>由于FutureDao产品会一直进行改进与新功能的开发，所以我们保留在我们认为必要时或法律要求的情况下更改本协议的权利。所有更改将立即发布在我们的网站上，并且当您在此类更改后首次使用本网站时，您被视为已接受新的协议。</p>
                    <div className="date-text">
                        <h1>FutureDAO开发团队</h1>
                        <h1>2020年1月</h1>
                    </div>
                </div>
                <div className="goback-btn">
                    <a href="/" className="goback-a">返回官网</a>
                </div>
            </div>
        );
    }
}

export default injectIntl(IndexHome);
