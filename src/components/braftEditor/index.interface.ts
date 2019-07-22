import { BraftEditorProps } from 'braft-editor';
export interface IBraftEditProps extends BraftEditorProps {
  // bucket: string,
  // prefix: string,
  value: any,
  onChange: (content: any) => void;
}