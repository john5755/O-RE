import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "../utils/axios";
import { H4, Button } from "../styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { USERS_API } from "../constants";

const AddUserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DownLoadIconSpan = styled.span`
  vertical-align: middle;
`;

const DownLoadLink = styled.a`
  color: black;
  font-weight: bold;
  text-decoration: none;
`;

const ExplainContainer = styled.ul`
  list-style-type: decimal;
  padding: 0px;
  > li::before {
    display: inline-block;
    vertical-align: middle;
  }
`;

const ExplainItem = styled.li`
  padding: 10px 0px 5px 5px;
  height: 30px;
  margin-left: 20px;
  margin-bottom: 5px;
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  width: 40%;
  height: 40px;
  margin: 20px auto;
`;

const excelUrl =
  "https://ore-s3.s3.ap-northeast-2.amazonaws.com/application/ORE.xlsx";

export default function ServerInvite() {
  const [userExcel, setUserExcel] = useState<File | null>(null);
  const excelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files.length !== 0) {
      setUserExcel(event.target.files[0]);
    } else {
      return;
    }
  };
  const sendUserExcel = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();
    if (userExcel !== null) {
      formData.append("file", userExcel);
    }
    try {
      const res = await axios.post(USERS_API.LIST, formData, {
        headers: {
          ContentType: "multipart/formdata",
          Authorization: accessToken,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AddUserContainer>
      <H4 style={{ fontWeight: "bold" }}>회원 초대 가이드</H4>
      <ExplainContainer>
        <ExplainItem>
          엑셀을&nbsp;
          <DownLoadLink href={excelUrl}>
            다운로드(
            <DownLoadIconSpan>
              <FileDownloadIcon />
            </DownLoadIconSpan>
            )
          </DownLoadLink>
          &nbsp;해주세요.
        </ExplainItem>
        <ExplainItem>
          엑셀에 추가할 이메일을 입력하신 후 <strong>파일선택</strong>을 눌러
          업로드 해주세요.
        </ExplainItem>
        <ExplainItem>
          <strong>전송</strong>버튼을 누르시면 회원이 추가 됩니다.
        </ExplainItem>
        <ExplainItem>
          첫 비밀번호는 <strong>이메일ID + 123!</strong> 입니다.
        </ExplainItem>
        <ExplainItem>
          최초 사용자 추가 시 권한은 모두 <strong>사용자</strong>입니다.
        </ExplainItem>
      </ExplainContainer>
      <input type="file" accept=".xlsx" onChange={excelChange}></input>
      <ButtonContainer>
        <Button borderRadius="10px" onClick={sendUserExcel}>
          전송
        </Button>
      </ButtonContainer>
    </AddUserContainer>
  );
}
