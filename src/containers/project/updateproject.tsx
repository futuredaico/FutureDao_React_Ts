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

@observer
class UpdateProject extends React.Component<any, any> {
  public state = {
    editorString: '', // 文本编辑内容
  };
  public render()
  {
    return (
      <>
        <h3 className="right-title">发布更新</h3>
        <div className="inline-title">
          <strong>标题</strong>
        </div>
        <div className="inline-enter">
          <Input placeholder="Basic usage" />
        </div>
        <div className="inline-title">
          <strong>详情</strong>
        </div>
        <div className="inline-enter">
          <div style={{ width: 750, height: 374 }}>
            <Editor
              onChange={this.onChangeEditorValue}
              value={this.state.editorString}
            />
          </div>
        </div>
        <div className="inline-btn">
          <Button text="发布" btnSize="bg-btn" />
        </div>
      </ >
    );
  }

  // 文本框的输入
  private onChangeEditorValue = (value: any) =>
  {
    // todo
    const text = value.toText()
    if (text !== "")
    {
      this.setState({
        editorString: BraftEditor.createEditorState(value),
        projectDetails: text
      }, () =>
        {
          console.log(this.state.editorString)
        })
    }
  }
}

export default injectIntl(UpdateProject);
