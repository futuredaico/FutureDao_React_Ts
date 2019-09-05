import * as React from 'react';
import { observer } from 'mobx-react';
import commonStore from '@/store/common'
import { IBraftEditProps } from './index.interface';
// 引入编辑器组件
import BraftEditor, { ControlType, MediaType } from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

const editorControls: ControlType[] = [
  'undo', 'redo', 'separator', 'bold', 'italic', 'underline', 'separator',
  'headings','text-align', 'list-ul', 'list-ol', 'separator',
  // 'link', 'separator',
  'hr', 'separator',
  'media', 
  // 'clear'
];

@observer
export default class BraftEditorCustom extends React.Component<IBraftEditProps> {
  public render() {
    return (
      <BraftEditor
        style={{
          border: "1px solid #cbcbcb"
        }}
        controls={editorControls}
        media={{
          accepts: {
            image: "image/*",
            video: false,
            audio: false,
          },
          externals: {
            image: true,
            video: false,
            audio: false,
            embed: false,
          },
          uploadFn: this.uploadFn
        }}
        imageControls={['remove']}
        stripPastedStyles={true}
        {...this.props}
      />
    );
  }

  private uploadFn: MediaType["uploadFn"] = async (param: any) => {
    const res = await commonStore.uploadFile(param.file);
    if (res) {
      param.success({
        url: res,
        meta: {
          id: Math.random().toString(),
          title: '',
          alt: '',
          loop: false,
          autoPlay: false,
          controls: false,
          poster: '',
        },
      });
    } else {
      param.error({
        msg: '上传失败'
      })
    }
  }
}