/**
 * 项目成员模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../../index.less';
import { injectIntl } from 'react-intl';
import { IMolochInfoProps, IProjectMember } from '../../interface/molochinfo.interface';
import { Pagination } from 'antd';

@observer
class MolochMember extends React.Component<IMolochInfoProps> {
    public intrl = this.props.intl.messages;
    public componentDidMount()
    {
        this.props.molochinfo.getMemberData('1')
    }
    public render()
    {
        if (!this.props.molochinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="member-wrapper">
                <div className="member-sbox-wrapper">
                    {
                        this.props.molochinfo.projMemberList.map((item: IProjectMember, index: number) =>
                        {
                            return (
                                <div className="member-list-box" key={index} onClick={this.handleToCopySomething.bind(this,item.address)} title="复制地址">
                                    <div className="member-img">
                                        {
                                            item.headIconUrl ? <img src={item.headIconUrl} alt="" /> : <img src={require('@/img/default.png')} alt="" />
                                        }
                                    </div>
                                    <div className="member-name-addr">
                                        <strong className="member-name">{item.username ? item.username : this.intrl.user.shen}</strong>
                                        <span>{item.address.replace(/^(.{7})(.*)(.{4})$/, '$1...$3')}</span>
                                    </div>
                                    <div className="member-count">
                                        <strong>{item.shares} {this.intrl.home.gu}</strong>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        this.props.molochinfo.projInfo.member > 15 && (
                            <div className="member-page-warpper">
                                <Pagination showQuickJumper={true} defaultCurrent={1} defaultPageSize={this.props.molochinfo.memberPageSize} total={this.props.molochinfo.projInfo.member} onChange={this.handleChangePage} />
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
    // 翻页
    private handleChangePage = (index: number) =>
    {
        this.props.molochinfo.memberPage = index;
        this.props.molochinfo.getMemberData('1');
    }
    private handleToCopySomething = (addr: string) =>
    {
        console.log(addr);
        const oInput = document.createElement('input');
        oInput.value = addr;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        this.props.common.openNotificationWithIcon("info","复制","复制成功");
    }
}

export default injectIntl(MolochMember);
