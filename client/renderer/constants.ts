import { TagType } from "./types";

export const PATH = {
  MAIN: "/",
  LOGIN: "/login",
  FIND_PASSWORD: "/find-password",
  CREATE_PAGE: "/create-page",
  SIGNUP: "/signup",
  ACCOUNT_OPTIONS: "/account-options",
  CREATE_TEAM: "/create-team",
  VIEW_PAGE: "/view-page",
};

export const TAG_LIST: TagType[] = [
  {
    type: "text",
    tagProps: {
      header: "내용",
      style: {
        width: "",
        height: "",
        fontSize: "30px",
        fontWeight: "600",
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
  {
    type: "date picker",
    tagProps: {
      type: "date",
      header: "날짜 제목",
      style: {
        width: "200px",
        height: "",
        fontSize: "13px",
        fontWeight: "600",
      },
    },
  },
  {
    type: "input",

    tagProps: {
      header: "인풋 제목",
      placeholder: "내용을 입력하세요",
      style: {
        width: "250px",
        height: "40px",
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
  {
    type: "check box",
    tagProps: {
      type: "checkbox",
      header: "체크박스 버튼 제목",
      label: ["one", "two", "three"],
      style: { width: "", height: "" },
    },
  },
  {
    type: "radio button",
    tagProps: {
      type: "radio",
      header: "라디오 버튼 제목",
      name: "",
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

export const INPUT_LIST = ["input", "date picker", "check box", "radio button"];

export const layoutInfo = {
  onlyPage: new Set<string>(),
  withOnlyNavBar: new Set<string>(),
};

layoutInfo.onlyPage.add(PATH.LOGIN);
layoutInfo.onlyPage.add(PATH.FIND_PASSWORD);
layoutInfo.onlyPage.add(PATH.SIGNUP);
layoutInfo.withOnlyNavBar.add(PATH.CREATE_PAGE);
layoutInfo.withOnlyNavBar.add(PATH.CREATE_TEAM);
layoutInfo.withOnlyNavBar.add(PATH.ACCOUNT_OPTIONS);

export const BASIC_PHOTO_URL: string =
  "https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/TeamDefaultImg.png";

// API
const API = "/api";
const USERS = "/users";
const TEAM_USER = "/team-user";
const TEAM = "/team";
const TEAMS = "/teams";
const PAGE_USER = "/page-user";
const PAGE = "/pages";

export const USERS_API = {
  DOMAIN: API + USERS + "/domain",
  VERIFICATION: API + USERS + "/verification",
  SIGNUP: API + USERS + "/signup",
  LOGIN: API + USERS + "/signin",
  MYPAGE: API + USERS + "/mypage",
  LIST: API + USERS + "/list",
};
export const TEAM_USER_API = {
  LIST: API + TEAM_USER + TEAMS + "/list",
};

export const TEAM_API = {
  CREATE: API + TEAM,
};

export const PAGE_USER_API = {
  ALL: API + PAGE_USER + "/list/p",
};

export const PAGE_API = {
  ADD: API + PAGE,
  DETAIL: API + PAGE + "/detail/",
};
