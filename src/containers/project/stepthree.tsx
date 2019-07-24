/**
 * 团队信息
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { Input } from 'antd';
import Select from '@/components/select';

@observer
class StepThree extends React.Component<any, any> {
  public state = {
    identityValue: 0,
    showAdd: false, // 是否显示添加成员弹框
    showDelete: false // 是否显示删除成员弹框
  }
  // 下拉筛选
  private identityOptions = [
    {
      id: '0',
      name: '管理',
    },
    {
      id: '1',
      name: '成员',
    }
  ]
  public render()
  {
    return (
      <div className="stepthree-page">
        <div className="inline-title">
          <strong>团队成员</strong>&nbsp;&nbsp;
          <span className="tips-text">（ 暂未接受邀请的成员信息不会对外公示 ）</span>
        </div>
        <div className="inline-enter">
          <ul className="inline-table">
            <li className="table-li">
              <span className="table-th">头像/名称</span>
              <span className="table-th">认证状态</span>
              <span className="table-th">身份</span>
              <span className="table-th">管理</span>
            </li>
            <li className="table-li">
              <span className="table-td">
                <img src={require("@/img/h5.png")} alt="" className="people-img" />
                XXXXX
              </span>
              {/* <span className="table-td">个人认证</span> */}
              <span className="table-td gray-color">未认证</span>
              {/* <span className="table-td admin-color">管理</span> */}
              <span className="table-td">
                <Select
                  defaultValue='0'
                  options={this.identityOptions}
                  text=''
                  onCallback={this.onSelletCallback}
                />
              </span>
              <span className="table-td">
                <Button text="删除" btnSize="sm-btn" btnColor="red-btn" onClick={this.handleShowDelete} />
              </span>
            </li>
          </ul>
        </div>
        <div className="inline-enter-btn">
          <Button text="+ 邀请新成员" btnSize="bg-btn" btnColor="white-btn" onClick={this.handleShowAddBox} />
        </div>
        <div className="inline-title">
          <strong>联系方式</strong>
        </div>
        <div className="inline-enter">
          <div className="inline-form">
            <div className="form-left">
              邮箱&nbsp;<span className="red-type">*</span>
            </div>
            <div className="form-right">
              <Input placeholder="Basic usage" />
            </div>
          </div>
          <div className="inline-form">
            <div className="form-left">官网</div>
            <div className="form-right">
              <Input placeholder="Basic usage" />
            </div>
          </div>
          <div className="inline-form">
            <div className="form-left">社区</div>
            <div className="form-right">
              <Input placeholder="Basic usage" />
            </div>
          </div>
        </div>
        <div className="inline-btn">
          <Button text="保存" btnSize="bg-btn" />
        </div>
        {
          this.state.showAdd && (
            <div className="invite-people-wrapper">
              <div className="invite-content">
                <div className="close-icon" onClick={this.handleShowAddBox}>
                  <img src={require("@/img/close.png")} alt="" />
                </div>
                <div className="invite-title">邀请成员加入项目</div>
                <div className="invite-input">
                  {/* 补充邮箱 */}
                  <Input placeholder="Basic usage" />
                  <div className="invite-select-list">
                    <ul>
                      <li>
                        <img src={require('@/img/h5.png')} alt="" />
                        <span className="name-text">XXXXX</span>
                        <span>xxx@nel.group</span>
                      </li>
                      {/* <li>
                    <span className="nodata-text">未找到该用户</span>
                  </li> */}
                    </ul>
                  </div>
                </div>
                <Button text="邀请" btnSize="bg-btn" />
              </div>
            </div>
          )
        }
        {
          this.state.showDelete && (
            <div className="delete-people-wrapper">
              <div className="delete-content">
                <div className="delete-text">确认将 XXX 移除团队？</div>
                <div className="delete-btn">
                  <Button text="取消" btnColor="red-btn" onClick={this.handleShowDelete} />
                  <Button text="确认" onClick={this.handleCheckDelete} />
                </div>
              </div>
            </div>
          )
        }

      </div>
    );
  }
  // 下拉框选择
  private onSelletCallback = (item) =>
  {
    // todo
    this.setState({
      identityValue: item.id
    })
  }
  // 打开新增成员弹框
  private handleShowAddBox = () =>
  {
    this.setState({
      showAdd: !this.state.showAdd
    })
  }
  // 打开删除成员弹框
  private handleShowDelete = () =>
  {
    this.setState({
      showDelete: !this.state.showDelete
    })
  }
  // 确认删除
  private handleCheckDelete = () =>
  {
    this.handleShowDelete();
  }

}

export default injectIntl(StepThree);
