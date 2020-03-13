/**
 * 隐私政策
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
                    <h1 className="file-title">隐私政策</h1>
                    <hr className="dev-hr" />
                    <h2>概述</h2>
                    <p>FutureDao开发团队（以下简称“我们”）深知个人信息对用户（以下简称“您”）而言的重要性，也感谢您对我们的信任。我们将通过本政策向您说明FutureDao如何收集、存储、保护、使用及对外提供您的信息，并说明您享有的权利， 为了便于您了解您在使用我们的服务时，我们需要收集的信息类型与用途，我们将结合具体服务向您逐一说明。</p>
                    <p>您可以通过本政策介绍的方式访问和管理您的信息、设置隐私功能。我们尊重并保护您的隐私。您使用我们的服务时，我们将按照FutureDao隐私权政策（以下简称“本政策”）收集、存储、使用及对外提供您的信息。同时，我们会通过本政策向您说明，我们如何为您提供访问、更新、管理和保护您的信息的服务。</p>
                    <h2>我们收集了哪些信息</h2>
                    <p>在您使用FutureDao各项功能的过程中，您可以选择性地提供一些信息以增加自己身份辨识度，这些信息并非必要且是未经验证的：</p>
                    <p>1、个人信息</p>
                    <p className="other-p2">需要注意的是，一旦您使用区块链钱包登陆了FutureDao，将默认以当前钱包地址在FutureDao上进行账户注册。</p>
                    <p className="other-p2">在您使用区块链钱包登陆后，可以在个人信息处设置您的昵称，并上传头像。这些信息将和您的钱包地址绑定，但您随时可以更改。如果您未设置，则会显示默认头像以及神秘人称号。</p>
                    <p>2、项目信息</p>
                    <p className="other-p2">在您创建项目时，可以选择提供项目描述、项目封面以及项目官方网站，以增加项目可信度。由于Dao的去中心化性质，这些信息一旦上传将不可进行修改。</p>
                    <p>除此之外，某些功能需要您提供一些信息才得以继续，这些信息仅会保存在您的个人电脑中 需要注意的是，由于区块链的公开性，所有的交易信息都是公开的，您发出的每一笔交易信息都会暴露给所有人：</p>
                    <p>1、创建项目</p>
                    <p className="other-p2">在您创建新的Dao时，您需提供Dao标题、简介，以及其他Dao设置信息。由于Dao的去中心化性质，这些信息一旦上传将不可进行修改。</p>
                    <p>2、参与融资、治理</p>
                    <p className="other-p2">当您参与融资、治理时，您将会发起一笔区块链上的交易。</p>
                    <p className="other-p2">您应该了解，所有发送到区块链上的交易都是公开的，包括交易方地址、交易金额以及交易中包含的其他信息。</p>
                    <p>3、身份验证</p>
                    <p className="other-p2">区块链钱包是您的唯一身份标识。FutureDao将从区块链钱包获取您的钱包地址，以识别您的身份。因为FutureDao不会也无法获取您的钱包内的私钥信息，所以您的账户安全由您自己及区块链钱包进行负责。</p>
                    <h2>我们如何使用Cookie等技术</h2>
                    <p>FutureDao使用Cookie记录您的登陆状态，以便在您使用FutureDao时验证您的身份。这些cookie将在您关闭浏览器后失效。</p>
                    <h2>我们如何存储和保护信息</h2>
                    <p>您应当理解，所有由FutureDao所提供的功能服务，所有信息都是可公开的。其中账户资产信息均保存在区块链上，任何人都可以查看下载；说明性的信息保存在FutureDao服务器中，由服务器的安全措施进行保护。</p>
                    <h2>我们如何对外提供信息</h2>
                    <p>FutureDao不会对外提供保存在服务器中的信息，但保存在服务器中的信息在FutureDao平台中是对所有人都可见的。</p>
                    <h2>您如何访问和管理自己的信息</h2>
                    <p>在您使用FutureDao期间，为了您可以更加便捷地访问和管理您的信息，同时保障您清除个人信息的权利，我们在钱包中为您提供了相应的操作设置。</p>
                    <p>1、当您希望清除自己的个人信息时，请更改昵称和头像，使这些信息与您的个人信息没有任何关系。</p>
                    <p>2、如果您希望清除项目信息时，需要与FutureDao开发团队进行联系。我们将根据实际情况决定是否清除该项目信息。</p>
                    <p>您应当理解，当Dao项目被创建后，它属于一个Dao组织，而不属于任何人，即使它的创建者也没有Dao的所有权。因此当您在创建Dao时请不要写入自己的个人信息。只有当我们确认您能完全代表该组织时，我们能够清除该组织保留在我们网站上的信息。</p>
                    <p>您应当理解，所有已经被记录在区块链上的信息都是永久保存且无法清除的。</p>
                    <h2>本政策的更新</h2>
                    <p>我们保留在我们认为必要时或法律要求的情况下更改本隐私政策的权利。所有更改将立即发布在我们的网站上，并且当您在此类更改后首次使用本网站时，您被视为已接受隐私政策的新条款。</p>
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
