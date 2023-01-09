import React, {useState} from 'react';

import Editor from '@monaco-editor/react';

const CodeEditorWindow = ({onChange, code}) => {
  const [value, setValue] = useState(code || '');

  const handleEditorChange = (value) => {
    setValue(value);
    onChange('code', value);
  };

  return (
    <Editor
      defaultLanguage='python'
      value={value}
      onChange={handleEditorChange}
      options={{minimap: {enabled: false}}}
      sx={{height: '78%'}}
    />
  );
};
export default CodeEditorWindow;
