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
  MANAGE_TEAM: "/manage-team",
};

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
layoutInfo.withOnlyNavBar.add(PATH.MANAGE_TEAM);

export const INPUT_LIST = ["input", "date picker", "check box", "radio button"];

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
const USER_INPUT = "/user-input";

export const USERS_API = {
  DOMAIN: API + USERS + "/domain",
  VERIFICATION: API + USERS + "/verification",
  SIGNUP: API + USERS + "/signup",
  LOGIN: API + USERS + "/signin",
  LOGOUT: API + USERS + "/logout",
  MYPAGE: API + USERS + "/mypage",
  LIST: API + USERS + "/list",
  NAME: API + USERS + "/name",
  NICKNAME: API + USERS + "/nickname",
  AUTH: API + USERS + "/auth",
};
export const TEAM_USER_API = {
  LIST: API + TEAM_USER + TEAMS + "/list",
  USERLIST: API + TEAM_USER + TEAM + USERS + "/list",
  NAME: API + TEAM_USER + USERS + "/name" + "/list",
  NICKNAME: API + TEAM_USER + USERS + "/nickname" + "/list",
  INVITE: API + TEAM_USER,
  REMOVE: API + TEAM_USER + "/removal",
};

export const TEAM_API = {
  CREATE: API + TEAM,
  DELETE: API + TEAM,
};

export const PAGE_USER_API = {
  ALL: API + PAGE_USER + "/list/p",
};

export const PAGE_API = {
  ADD: API + PAGE,
  DETAIL: API + PAGE + "/detail/",
  ALL: API + PAGE + "/status/",
};

export const USER_INPUT_API = {
  ALL: API + USER_INPUT,
  GET: API + USER_INPUT + "/list",
};

export const SERVER_ROLE = {
  OWNER: ["OWNER"],
  ADMIN: ["OWNER", "ADMIN"],
};

export const TEAM_ROLE = {
  OWNER: ["OWNER"],
  LEADER: ["OWNER", "LEADER"],
  MANAGER: ["OWNER", "LEADER", "MANAGER"],
};

export const PAGE_ROLE = {
  OWNER: ["OWNER"],
  MAINTAINER: ["OWNER", "MAINTAINER"],
  EDITOR: ["OWNER", "MAINTAINER", "EDITOR"],
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
  {
    type: "table",
    tagProps: {
      header: "테이블 제목",
      title: [],
      data: [],
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
];
