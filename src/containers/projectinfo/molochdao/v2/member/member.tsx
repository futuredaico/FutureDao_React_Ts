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
    public componentDidMount (){
        this.props.molochinfo.getMemberData()
    }
    public render()
    {
        if (!this.props.molochinfo.projInfo)
        {
            return null;
        }
        return (
            <div className="member-wrapper">
                <h3 className="title-h3">管理者股份持有人</h3>
                {
                    this.props.molochinfo.projMemberList.map((item:IProjectMember,index:number)=>{
                        return (
                            <div className="member-list-box" key={index}>
                                <div className="member-img">
                                    {
                                        item.headIconUrl?<img src={item.headIconUrl} alt=""/>:<img src={require('@/img/default.png')} alt=""/>
                                    }
                                </div>
                                <div className="member-name-addr">
                                    <strong className="member-name">{item.username?item.username:this.intrl.user.shen}</strong>
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
                    this.props.molochinfo.projInfo.member>15 && (
                        <div className="member-page-warpper">
                            <Pagination showQuickJumper={true} defaultCurrent={1} defaultPageSize={this.props.molochinfo.memberPageSize} total={this.props.molochinfo.projInfo.member} onChange={this.handleChangePage} />
                        </div>
                    )
                }
                <h3 className="title-h3 other-bigtitle">普通股份持有人</h3>
            </div>
        );
    }
    // 翻页
    private handleChangePage = (index: number) =>
    {
        this.props.molochinfo.memberPage = index;
        this.props.molochinfo.getMemberData();
    }
}

export default injectIntl(MolochMember);
