import React from "react";
import { pageInfo } from "../hooks/pageHook";
import { useAppDispatch } from "../hooks/reduxHook";
import { setListStateTrue, setListStateFalse } from "../slices/listSlices";

export default function CreatePage() {
  const dispatch = useAppDispatch();

  return (
    <div>
      create-page
      <button
        onClick={() => {
          dispatch(setListStateFalse());
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          dispatch(setListStateTrue());
        }}
      >
        수정 완료
      </button>
    </div>
  );
}
