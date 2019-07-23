/**
 * 项目详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Pbottom from './pbottom';
import Button from '@/components/Button';
import { IProjectInfoProps } from './interface/projectinfo.interface';

@inject('projectinfo')
@observer
class ProjectInfo extends React.Component<IProjectInfoProps, any> {
    public render()
    {
        return (
            <div className="projectinfo-page">
                <div className="project-top">
                    <h2>恐怖游戏！《 DO SOME THING GREAT》发起众筹！</h2>
                    <p className="title-p">好巧，真有这么个黑客朋友，不过，这人名字有点。。。颓。。。他叫残废。看看，这迷人的自拍。。不知道，先上图会不会影响大家听故事啊？</p>
                    <div className="ptop-left">
                        <div className="ptop-img">
                            <img src={require('@/img/tu2.png')} alt="" />
                        </div>
                    </div>
                    <div className="ptop-right">
                        <div className="right-big-text">
                            <span className="big-gray-text">4321</span> 人看好
                        </div>
                        <p className="gray-text">
                            这个项目只是发布了创意，还没有启动融资，如果你看好这个创意，点击下面的”看好“，给作者一点鼓励吧。
                        </p>
                        <div className="do-like">
                            <Button text="看好" />
                            <div className="dolike-wrapper">
                                <img src={require("@/img/like.png")} alt="" />
                                <span>关注</span>
                            </div>
                        </div>
                        <div className="ptop-share">
                            <span>分享项目到</span>
                            <div className="share-icon">
                                <div className="img-div twitter-icon" />
                                <div className="img-div qq-icon" />
                                <div className="img-div webchat-icon" />
                                <div className="img-div fb-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <Pbottom {...this.props} />
            </div>
        );
    }
}
export default injectIntl(ProjectInfo)