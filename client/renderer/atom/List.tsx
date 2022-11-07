import React, { PropsWithChildren } from "react";

type ListProps = PropsWithChildren<{
  count?: number;
  style?: React.CSSProperties;
  children?: string[];
  header?: string;
}>;

const List = ({ count, header, children, ...props }: ListProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      {count !== undefined &&
        children !== undefined &&
        [...Array(count)].map((v, index) => (
          <li {...props} key={`${index} - ${v}`}>
            {children[index]}
          </li>
        ))}
    </div>
  );
};

export default List;
