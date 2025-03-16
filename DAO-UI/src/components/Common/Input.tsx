import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps } from 'antd';

export const Input: React.FC<InputProps> = (props) => {
  return <AntInput {...props} />;
};

export default Input;
