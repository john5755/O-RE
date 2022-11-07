import React from "react";

type TableProps = {
  style?: React.CSSProperties;
  header?: string;
  row?: number;
  column?: number;
};

const Table = ({ header, row, column, ...props }: TableProps) => {
  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}
      <table {...props}>
        {row !== undefined &&
          column !== undefined &&
          [...Array(row)].map((_) => (
            <tr style={{ border: "1px solid black" }}>
              {[...Array(column)].map((_) => (
                <td style={{ border: "1px solid black" }}></td>
              ))}
            </tr>
          ))}
      </table>
    </div>
  );
};

export default Table;
