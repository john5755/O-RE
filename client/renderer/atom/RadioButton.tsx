import React, { Dispatch, SetStateAction } from "react";

type RadioButtonProps = {
  header?: string;
  label?: string[];
  style?: React.CSSProperties;
  userInput?: any;
  setUserInput?: Dispatch<SetStateAction<any>>;
};

const RadioButton = ({
  header,
  label,
  userInput,
  setUserInput,
  ...props
}: RadioButtonProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userInput[header!]) {
      setUserInput!((pre: any) => {
        return { ...pre, [header!]: "" };
      });
    }
    setUserInput!((pre: any) => {
      return { ...pre, [header!]: e.target.value };
    });
  };

  return (
    <div style={{ display: "grid" }}>
      {header !== "" && <div>{header}</div>}

      {label?.map((v, i) => (
        <div key={v} style={{ display: "flex", textAlign: "center" }}>
          <input value={v} {...props} onChange={(e) => handleChange(e)} />
          <label>{v}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
