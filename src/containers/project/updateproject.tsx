/**
 * 发布更新
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import Editor from '@/components/braftEditor';
import BraftEditor from 'braft-editor';
import Button from '@/components/Button';
import { IUpdateProjectProps } from './interface/updateproject.interface';
interface IState {
  updateTitle: string, // 标题
  detailString: string, // 文本编辑内容
  detailStr: string,  // 传给接口的参数
  isHasEdit: boolean // 判断详情是否输入了内容
}
@observer
class UpdateProject extends React.Component<IUpdateProjectProps, IState> {
  public state = {
    updateTitle: '',
    detailString: '',
    detailStr: '',
    isHasEdit: false
  };

  public render() {
    return (
      <>
        <h3 className="right-title">发布更新</h3>
        <div className="inline-title">
          <strong>标题</strong>
        </div>
        <div className="inline-enter">
          <Input maxLength={80} value={this.state.updateTitle} onChange={this.handleChangeTitle} />
        </div>
        <div className="inline-title">
          <strong>详情</strong>
        </div>
        <div className="inline-enter">
          <div style={{ width: 750, height: 374 }}>
            <Editor
              onChange={this.onChangeEditorValue}
              value={this.state.detailString}
            />
          </div>
        </div>
        <div className="inline-btn">
          <Button
            text="发布"
            btnSize="bg-btn"
            btnColor={(!this.state.isHasEdit || !this.state.updateTitle) ? 'gray-btn' : ''}
            onClick={this.handleSendUpdate}
          />
        </div>
      </ >
    );
  }
  private handleChangeTitle = (ev: React.ChangeEvent<HTMLInputElement>) => {
    //
    this.setState({
      updateTitle: ev.target.value
    })
  }
  // 文本框的输入
  private onChangeEditorValue = (value: any) => {
    // todo
    const text = value.toText()
    if (text !== "") {
      this.setState({
        detailString: BraftEditor.createEditorState(value),
        detailStr: BraftEditor.createEditorState(value).toHTML(),
        isHasEdit: true
      })
    } else {
      this.setState({
        detailString: '',
        detailStr: '',
        isHasEdit: false
      })
    }
  }
  // 发布更新
  private handleSendUpdate = async () => {
    if (!this.state.updateTitle || !this.state.isHasEdit) {
      return false;
    }
    const params = this.props.match.params;
    const projectId = params["projectId"];
    if (!projectId) {
      return false;
    }
    const res = await this.props.updateproject.sendUpdate(projectId, this.state.updateTitle, this.state.detailStr);
    if (res) {
      this.setState({
        updateTitle: '',
        detailString: BraftEditor.createEditorState(''),
        detailStr: '',
        isHasEdit: false
      })
    }
    return true
  }
}

export default injectIntl(UpdateProject);
