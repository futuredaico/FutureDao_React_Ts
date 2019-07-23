import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import './index.less';
@observer
class RightTeam extends React.Component<any, any> {
    public render()
    {
        return (
            <div className="team-wrapper">
                <h3>团队介绍</h3>
                <div className="team-smallbox">
                    <div className="team-people">
                        <img src={require('@/img/h5.png')} alt="" />
                        <span>XXXXX</span>
                    </div>
                    <p className="team-des">
                        当然知道，我以前养过一条中华田园犬，特别聪明。有一次我放学我爸来接我，来的很早，让她在车里待着，她就一直不出声的坐在地上，后来我爸把她放出来，她自己跑到树坑尿尿，憋了一下午都没上厕所。我放学之后抱着她想让她坐在椅子上。
                    </p>
                </div>
                <div className="team-smallbox">
                    <div className="team-people">
                        <img src={require('@/img/h5.png')} alt="" />
                        <span>XXXXX</span>
                    </div>
                    <p className="team-des">暂无简介</p>
                </div>
                <div className="team-smallbox">
                    <div className="team-people">
                        <img src={require('@/img/h5.png')} alt="" />
                        <span>XXXXX</span>
                    </div>
                    <p className="team-des">
                        当然知道，我以前养过一条中华田园犬，特别聪明。有一次我放学我爸来接我，来的很早，让她在车里待着，她就一直不出声的坐在地上，后来我爸把她放出来，她自己跑到树坑尿尿，憋了一下午都没上厕所。我放学之后抱着她想让她坐在椅子上。
                    </p>
                </div>
            </div>
        )
    }
}

export default injectIntl(RightTeam);
