export const PATH = {
  MAIN: "/",
  LOGIN: "/login",
  FIND_PASSWORD: "/find-password",
  CREATE_PAGE: "/create-page",
  SIGNUP: "/signup",
  ACCOUNT_OPTIONS: "/account-options",
  CREATE_GROUP: "/create-group",
};

export const TAG_LIST = [
  { type: "text" },
  { type: "list" },
  { type: "calendar" },
  { type: "date picker" },
  { type: "input" },
  { type: "file upload" },
  { type: "table" },
  { type: "check box" },
  { type: "radio button" },
  { type: "drop down" },
  { type: "text area" },
  { type: "hyperlink" },
];

export const layoutInfo = {
  onlyPage: new Set<string>(),
  WithOnlyNavBar: new Set<string>(),
};

layoutInfo.onlyPage.add(PATH.LOGIN);
layoutInfo.onlyPage.add(PATH.FIND_PASSWORD);
layoutInfo.onlyPage.add(PATH.SIGNUP);
layoutInfo.WithOnlyNavBar.add(PATH.CREATE_PAGE);
layoutInfo.WithOnlyNavBar.add(PATH.CREATE_GROUP);
layoutInfo.WithOnlyNavBar.add(PATH.ACCOUNT_OPTIONS);

// API
const API = "api/";
const USERS = "users/";
export const USERS_API = {
  VERIFICATION: API + USERS + "verification",
  SIGNUP: API + USERS + "signup",
};
