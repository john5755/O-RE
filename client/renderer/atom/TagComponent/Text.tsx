import React, { PropsWithChildren } from "react";

type TextProps = PropsWithChildren<{
  style?: React.CSSProperties;
  header?: string;
}>;
const Text = ({ header, ...props }: TextProps) => {
  return <div {...props}>{header}</div>;
};

export default Text;
