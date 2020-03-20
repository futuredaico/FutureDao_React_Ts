import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import '../../index.less';
import { IProjectInfoProps, IProjectTeam } from '../../interface/projectinfo.interface';

interface IState
{
    priceType: number
}
@observer
class RightTeam extends React.Component<IProjectInfoProps, IState> {
    public intrl = this.props.intl.messages;
    public state: IState = {
        priceType: 1
    }
    public componentDidMount()
    {
        this.props.projectinfo.getTeamData();

    }
    public render()
    {
        if (!this.props.projectinfo.projInfo)
        {
            return null
        }
        return (
            <>
                {/* 团队模块 */}
                <div className="team-wrapper">
                    <h3 className="title-h3">{this.intrl.projinfo.team}</h3>
                    {
                        this.props.projectinfo.projTeamList.length > 0 && this.props.projectinfo.projTeamList.map((item: IProjectTeam, index: number) =>
                        {
                            return (
                                <div className="team-smallbox" key={index}>
                                    <div className="team-people">
                                        <img src={item.headIconUrl ? item.headIconUrl : require('@/img/default.png')} alt="" />
                                        <div className="team-name">
                                            <span>{item.username}</span><br />
                                            <span>{item.address.replace(/^(.{5})(.*)(.{5})$/, '$1...$3')}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default injectIntl(RightTeam);
