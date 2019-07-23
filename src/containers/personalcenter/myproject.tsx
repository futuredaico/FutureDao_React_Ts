/**
 * 个人中心
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Card from '@/components/card';

@observer
class MyProject extends React.Component<any, any> {
    public myprojectMenu = [
        {
            id: 1,
            name: '关注中 3'
        },
        {
            id: 2,
            name: '管理中 5'
        }
    ]
    public state = {
        projectMenuNum: 1
    }
    public render()
    {
        return (
            <div className="myproject-page">
                <h2>我的项目</h2>
                <div className="myproject-menu">
                    <ul className="title-ul">
                        {
                            this.myprojectMenu.map((item, index) =>
                            {
                                return (
                                    <li className={this.state.projectMenuNum === item.id ? "title-li active" : "title-li"} key={index} onClick={this.mapUnderline.bind(this, item)}>
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    this.state.projectMenuNum === 1 && (
                        <div className="attention-list">
                            <div className="attention-line">
                                <img src={require('@/img/tu1.png')} alt="" className="attention-img" />
                                <div className="attention-content">
                                    <strong className="attention-title">BIG GAME！《 V fight white warrior》来到区块链社区！</strong>
                                    <div className="project-card">
                                        <Card text="以太坊" colortype="c-qpurple" />
                                        <Card text="游戏" colortype="c-green" />
                                    </div>
                                    <div className="project-status">
                                        <span>众筹中</span>
                                        <span className="time-text">5天前更新</span>
                                    </div>
                                </div>
                            </div>
                            <div className="attention-line">
                                <img src={require('@/img/tu1.png')} alt="" className="attention-img" />
                                <div className="attention-content">
                                    <strong className="attention-title">BIG GAME！《 V fight white warrior》来到区块链社区！</strong>
                                    <div className="project-card">
                                        <Card text="以太坊" colortype="c-qpurple" />
                                        <Card text="游戏" colortype="c-green" />
                                    </div>
                                    <div className="project-status">
                                        <span>众筹中</span>
                                        <span className="time-text">5天前更新</span>
                                    </div>
                                </div>
                            </div>
                            <div className="attention-line">
                                <img src={require('@/img/tu1.png')} alt="" className="attention-img" />
                                <div className="attention-content">
                                    <strong className="attention-title">BIG GAME！《 V fight white warrior》来到区块链社区！</strong>
                                    <div className="project-card">
                                        <Card text="以太坊" colortype="c-qpurple" />
                                        <Card text="游戏" colortype="c-green" />
                                    </div>
                                    <div className="project-status">
                                        <span>众筹中</span>
                                        <span className="time-text">5天前更新</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    this.state.projectMenuNum === 2 && (
                        <div className="manager-list">
                            <div className="manager-line">
                                <img src={require('@/img/tu1.png')} alt="" className="manager-img" />
                                <div className="manager-right">
                                    <strong className="project-title">BIG GAME！《 V fight white warrior》来到区块链社区！</strong>
                                    <div className="project-card">
                                        <Card text="以太坊" colortype="c-qpurple" />
                                        <Card text="游戏" colortype="c-green" />
                                    </div>
                                    <div className="project-status">
                                        <span>众筹中</span>
                                        <span className="green-text">审核中</span>
                                        <span className="purple-text">众筹预热</span>
                                        <span className="red-text">审核失败</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
    // 菜单选择
    private mapUnderline = (item) =>
    {
        this.setState({
            projectMenuNum: item.id
        })
    }
}

export default injectIntl(MyProject);
