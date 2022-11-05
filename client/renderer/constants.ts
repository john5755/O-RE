import { TagType } from "./types";

export const PATH = {
  MAIN: "/",
  LOGIN: "/login",
  FIND_PASSWORD: "/find-password",
  CREATE_PAGE: "/create-page",
  SIGNUP: "/signup",
  ACCOUNT_OPTIONS: "/account-options",
  CREATE_GROUP: "/create-group",
};

export const TAG_LIST: TagType[] = [
  {
    type: "text",
    tagProps: {
      children: "내용",
      style: {
        width: "",
        height: "",
        color: "black",
        fontSize: "30px",
        fontWeight: "500",
      },
    },
  },
  // {
  //   type: "list",
  //   tagProps: {
  //     header: "리스트 제목",
  //     count: 2,
  //     children: ["내용", "입력"],
  //     style: { width: "100px", height: "" },
  //   },
  // },
  // {
  //   type: "date picker",
  //   tagProps: {
  //     type: "date",
  //     header: "날짜 제목",
  //     style: { width: "", height: "" },
  //   },
  // },
  {
    type: "input",

    tagProps: {
      header: "인풋 제목",
      placeholder: "내용을 입력하세요",
      style: {
        width: "200px",
        height: "30px",
      },
    },
  },
  // {
  //   type: "file upload",
  //   tagProps: {
  //     header: "파일 업로드 제목",
  //     type: "file",
  //     style: {
  //       width: "",
  //       height: "",
  //     },
  //   },
  // },
  {
    type: "table",
    tagProps: {
      header: "테이블 제목",
      row: 3,
      column: 3,
      style: {
        width: "100px",
        height: "100px",
        borderCollapse: "collapse",
      },
    },
  },
  // {
  //   type: "check box",
  //   tagProps: {
  //     type: "checkbox",
  //     header: "체크박스 버튼 제목",
  //     label: ["one", "two", "three"],
  //     style: { width: "", height: "" },
  //   },
  // },
  {
    type: "radio button",
    tagProps: {
      type: "radio",
      header: "라디오 버튼 제목",
      label: ["one", "two", "three"],
      style: { width: "", height: "" },
    },
  },
  // {
  //   type: "drop down",
  //   tagProps: {
  //     header: "드롭다운 제목",
  //     option: ["one", "two", "three"],
  //     style: { width: "", height: "" },
  //   },
  // },
  // {
  //   type: "text area",
  //   tagProps: {
  //     header: "텍스트 제목",
  //     style: { width: "300px", height: "100px" },
  //   },
  // },
  // {
  //   type: "hyperlink",
  //   tagProps: {
  //     href: "https://www.ssafy.com",
  //     children: "SSAFY",
  //     target: "_blank",
  //     header: "링크 제목",
  //     style: { width: "", height: "" },
  //   },
  // },
  // {
  //   type: "button",
  //   tagProps: {
  //     header: "버튼 제목",
  //     children: "버튼",
  //     style: {
  //       width: "100px",
  //       height: "40px",
  //       textAlign: "center",
  //     },
  //   },
  // },
];

export const layoutInfo = {
  onlyPage: new Set<string>(),
  withOnlyNavBar: new Set<string>(),
};

layoutInfo.onlyPage.add(PATH.LOGIN);
layoutInfo.onlyPage.add(PATH.FIND_PASSWORD);
layoutInfo.onlyPage.add(PATH.SIGNUP);
layoutInfo.withOnlyNavBar.add(PATH.CREATE_PAGE);
layoutInfo.withOnlyNavBar.add(PATH.CREATE_GROUP);

export const BASIC_PHOTO_URL: string =
  "https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/TeamDefaultImg.png";

// API
const API = "api/";
const USERS = "users/";
const TEAMS = "teams/";
export const USERS_API = {
  VERIFICATION: API + USERS + "verification",
  SIGNUP: API + USERS + "signup",
  LOGIN: API + USERS + "signin",
  MYPAGE: API + USERS + "mypage",
};
const TEAM_USER = "team-user/";
export const TEAM_USER_API = {
  LIST: API + TEAM_USER + TEAMS + "list",
};
