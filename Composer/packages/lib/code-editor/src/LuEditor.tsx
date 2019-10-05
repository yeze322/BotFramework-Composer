import React from 'react';

import { RichEditor, RichEditorProps } from './RichEditor';

const LU_HELP = 'https://github.com/microsoft/botframework-cli/blob/master/packages/luis/docs/lu-file-format.md';
const placeholder = `>To learn more about the LU file format, read the documentation at
> ${LU_HELP}`;

export function LuEditor(props: RichEditorProps) {
  return <RichEditor placeholder={placeholder} helpURL={LU_HELP} {...props} />;
}
