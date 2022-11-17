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
  MANAGE_PAGE: "/manage-page",
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
layoutInfo.withOnlyNavBar.add(PATH.MAIN);

export const INPUT_LIST = ["input", "date picker", "check box", "radio button"];

export const BASIC_PHOTO_TEAM: string =
  "https://ore-s3.s3.ap-northeast-2.amazonaws.com/team/TeamDefaultImg.png";

export const BASIC_PHOTO_USER: string =
  "https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png";

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
  PAGELIST: API + TEAM_USER + "/page" + "/list",
  PAGENAME: API + TEAM_USER + "/page" + "/name" + "/list",
  PAGENICKNAME: API + TEAM_USER + "/page" + "/nickname" + "/list",
};

export const TEAM_API = {
  CREATE: API + TEAM,
  DELETE: API + TEAM,
  MODIFY: API + TEAM + "/edit",
};

export const PAGE_USER_API = {
  ALL: API + PAGE_USER + "/list/p",
  LEAVE: API + PAGE_USER + "/leave",
  LIST: API + PAGE_USER,
  SEARCH: API + PAGE_USER + "/list/u",
  NAME: API + PAGE_USER + "/name",
  NICKNAME: API + PAGE_USER + "/nickname",
  DELETE: API + PAGE_USER + "/delete",
  INVITE: API + PAGE_USER + "/invite",
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

export const EXCEL_API = {
  DOWNLOAD: API + "/excel" + "/download",
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
    name: "텍스트",
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
    name: "날짜",
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
    name: "입력",
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
    name: "테이블",
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
    name: "체크박스",
    tagProps: {
      type: "checkbox",
      header: "체크박스 버튼 제목",
      label: ["보기1", "보기2", "보기3"],
      style: { width: "", height: "" },
    },
  },
  {
    type: "radio button",
    name: "단일 선택",
    tagProps: {
      type: "radio",
      header: "라디오 버튼 제목",
      name: "",
      label: ["보기1", "보기2", "보기3"],
      style: { width: "", height: "" },
    },
  },
];
