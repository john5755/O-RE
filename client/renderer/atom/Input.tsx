import React, { Dispatch, PropsWithChildren, SetStateAction } from "react";

type InputProps = PropsWithChildren<{
  style?: React.CSSProperties;
  header?: string;
  children?: string;
  userInput?: any;
  setUserInput?: Dispatch<SetStateAction<any>>;
}>;

const Input = ({
  children,
  header,
  userInput,
  setUserInput,
  ...props
}: InputProps) => {
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
      <input {...props} onChange={(e) => handleChange(e)}></input>
    </div>
  );
};

export default Input;
