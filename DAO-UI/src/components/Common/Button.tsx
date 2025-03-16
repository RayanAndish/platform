import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps } from 'antd';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <AntButton {...props}>{children}</AntButton>;
};

export default Button;
