import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import './index.less';
import { IProjectInfoProps, IProjectTeam } from './interface/projectinfo.interface';
@observer
class RightTeam extends React.Component<IProjectInfoProps, any> {
    public componentDidMount()
    {
        this.props.projectinfo.getTeamData();
    }
    public render()
    {
        return (
            <div className="team-wrapper">
                <h3>团队介绍</h3>
                {
                    this.props.projectinfo.projTeamList.length > 0 && this.props.projectinfo.projTeamList.map((item: IProjectTeam, index: number) =>
                    {
                        return (
                            <div className="team-smallbox" key={index}>
                                <div className="team-people">
                                    <img src={item.headIconUrl.replace('temp_','')} alt="" />
                                    <span>{item.username}</span>
                                </div>
                                <p className="team-des">{!!item.brief?item.brief:'暂无简介'}</p>
                            </div>
                        )
                    })
                }                
            </div>
        )
    }
}

export default injectIntl(RightTeam);
